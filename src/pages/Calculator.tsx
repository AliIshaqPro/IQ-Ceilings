import { useState, useEffect, useRef } from "react";
import { Calculator as CalcIcon, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCalculation from "@/components/StickyCalculation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Canvas as FabricCanvas, Rect, Text } from "fabric";
import { toast } from "sonner";

const Calculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [drawMode, setDrawMode] = useState<"add" | "remove" | null>(null);
  const [additionalAreas, setAdditionalAreas] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const isDrawingRef = useRef(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const tempRectRef = useRef<Rect | null>(null);

  // Calculate total area
  const baseArea = (parseFloat(length) || 0) * (parseFloat(width) || 0);
  const additionalArea = additionalAreas.reduce((sum, area) => sum + area, 0);
  const totalArea = baseArea + additionalArea;
  const essentialCost = totalArea * 90;
  const premiumCost = totalArea * 100;
  const luxuryCost = totalArea * 110;

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 450,
      backgroundColor: "#f8f9fa",
      selection: true,
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Draw base room when dimensions change
  useEffect(() => {
    if (!fabricCanvas || !length || !width) return;

    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;

    if (l === 0 || w === 0) return;

    // Clear and redraw
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#f8f9fa";

    // Scale to fit canvas (with padding)
    const padding = 40;
    const maxWidth = 600 - padding * 2;
    const maxHeight = 450 - padding * 2;
    const scale = Math.min(maxWidth / l, maxHeight / w);

    const scaledLength = l * scale;
    const scaledWidth = w * scale;

    // Draw base room
    const baseRoom = new Rect({
      left: padding,
      top: padding,
      width: scaledLength,
      height: scaledWidth,
      fill: "rgba(59, 130, 246, 0.3)",
      stroke: "#3b82f6",
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    fabricCanvas.add(baseRoom);

    // Add dimensions text
    const lengthText = new Text(`${l} ft`, {
      left: padding + scaledLength / 2,
      top: padding - 20,
      fontSize: 14,
      fill: "#1f2937",
      selectable: false,
      evented: false,
      originX: "center",
    });

    const widthText = new Text(`${w} ft`, {
      left: padding - 20,
      top: padding + scaledWidth / 2,
      fontSize: 14,
      fill: "#1f2937",
      selectable: false,
      evented: false,
      originX: "center",
      angle: -90,
    });

    fabricCanvas.add(lengthText, widthText);
    fabricCanvas.renderAll();
  }, [fabricCanvas, length, width]);

  // Handle drawing
  useEffect(() => {
    if (!fabricCanvas || !drawMode) return;

    const handleMouseDown = (e: any) => {
      if (!e.pointer) return;
      isDrawingRef.current = true;
      startPointRef.current = { x: e.pointer.x, y: e.pointer.y };
    };

    const handleMouseMove = (e: any) => {
      if (!isDrawingRef.current || !startPointRef.current || !e.pointer) return;

      if (tempRectRef.current) {
        fabricCanvas.remove(tempRectRef.current);
      }

      const width = e.pointer.x - startPointRef.current.x;
      const height = e.pointer.y - startPointRef.current.y;

      tempRectRef.current = new Rect({
        left: startPointRef.current.x,
        top: startPointRef.current.y,
        width: Math.abs(width),
        height: Math.abs(height),
        fill: drawMode === "add" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)",
        stroke: drawMode === "add" ? "#22c55e" : "#ef4444",
        strokeWidth: 2,
        selectable: true,
      });

      if (width < 0) tempRectRef.current.left = e.pointer.x;
      if (height < 0) tempRectRef.current.top = e.pointer.y;

      fabricCanvas.add(tempRectRef.current);
      fabricCanvas.renderAll();
    };

    const handleMouseUp = (e: any) => {
      if (!isDrawingRef.current || !startPointRef.current || !e.pointer) return;

      const drawnWidth = Math.abs(e.pointer.x - startPointRef.current.x);
      const drawnHeight = Math.abs(e.pointer.y - startPointRef.current.y);

      // Convert canvas pixels back to feet
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      const padding = 40;
      const maxWidth = 600 - padding * 2;
      const maxHeight = 450 - padding * 2;
      const scale = Math.min(maxWidth / l, maxHeight / w);

      const areaInFeet = (drawnWidth / scale) * (drawnHeight / scale);

      if (areaInFeet > 1) {
        const newArea = drawMode === "add" ? areaInFeet : -areaInFeet;
        setAdditionalAreas(prev => [...prev, newArea]);
        toast.success(`${drawMode === "add" ? "Added" : "Removed"} ${areaInFeet.toFixed(2)} sq ft`);
      }

      isDrawingRef.current = false;
      startPointRef.current = null;
      tempRectRef.current = null;
      setDrawMode(null);
      fabricCanvas.defaultCursor = "default";
    };

    fabricCanvas.on("mouse:down", handleMouseDown);
    fabricCanvas.on("mouse:move", handleMouseMove);
    fabricCanvas.on("mouse:up", handleMouseUp);
    fabricCanvas.defaultCursor = "crosshair";

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
      fabricCanvas.off("mouse:move", handleMouseMove);
      fabricCanvas.off("mouse:up", handleMouseUp);
      fabricCanvas.defaultCursor = "default";
    };
  }, [fabricCanvas, drawMode, length, width]);

  return (
    <div className="min-h-screen bg-gradient-dark overflow-x-hidden">
      <Header />
      
      <StickyCalculation 
        totalArea={totalArea}
        essentialCost={essentialCost}
        premiumCost={premiumCost}
        luxuryCost={luxuryCost}
      />
      
      <div className="relative py-24 px-4 sm:px-6 pt-32">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CalcIcon className="text-background" size={32} />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Cost <span className="bg-gradient-primary bg-clip-text text-transparent">Calculator</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get instant estimates for your ceiling project
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <CalcIcon className="text-background" size={16} />
                    </div>
                    Room Dimensions
                  </CardTitle>
                  <CardDescription>Enter your room's length and width in feet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-sm font-medium">Length (ft)</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="12"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        min="0"
                        step="0.1"
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm font-medium">Width (ft)</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="10"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        min="0"
                        step="0.1"
                        className="text-lg"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Base Area:</span>
                        <span className="text-lg font-bold text-foreground">{baseArea.toFixed(2)} sq ft</span>
                      </div>
                      {additionalAreas.length > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Adjustments:</span>
                          <span className="text-lg font-bold text-foreground">
                            {additionalArea > 0 ? '+' : ''}{additionalArea.toFixed(2)} sq ft
                          </span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-border/50 flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Total Area:</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            {totalArea.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">sq ft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Canvas */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Visual Area Editor</CardTitle>
                  <CardDescription>Draw to add or remove areas from calculation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setDrawMode("add")}
                      variant={drawMode === "add" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Area
                    </Button>
                    <Button
                      onClick={() => setDrawMode("remove")}
                      variant={drawMode === "remove" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Remove Area
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden bg-muted/20 w-full flex justify-center">
                    <canvas ref={canvasRef} className="max-w-full h-auto touch-none" style={{ maxWidth: '100%' }} />
                  </div>

                  {drawMode && (
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-foreground">
                        <strong>Active:</strong> Click and drag on the canvas to {drawMode} area
                      </p>
                    </div>
                  )}

                  {additionalAreas.length > 0 && (
                    <Button
                      onClick={() => {
                        setAdditionalAreas([]);
                        toast.success("Adjustments cleared");
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Clear All Adjustments
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            
          </div>

          <div className="mt-8 p-6 bg-card/30 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground text-center">
              * These are estimated costs. Final pricing may vary based on design complexity, materials, and installation requirements. Contact us for a detailed quote.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Calculator;
