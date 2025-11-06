import { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Calculator = () => {
  const [wall1, setWall1] = useState("");
  const [wall2, setWall2] = useState("");
  const [wall3, setWall3] = useState("");
  const [wall4, setWall4] = useState("");

  // Calculate area using the Shoelace formula for irregular quadrilaterals
  const calculateArea = () => {
    const w1 = parseFloat(wall1) || 0;
    const w2 = parseFloat(wall2) || 0;
    const w3 = parseFloat(wall3) || 0;
    const w4 = parseFloat(wall4) || 0;
    
    // For a room with walls w1, w2, w3, w4
    // We treat it as a quadrilateral and use the formula for area
    // This assumes the room forms a closed shape
    // Simple approximation: we'll use opposite walls
    const length = (w1 + w3) / 2;
    const width = (w2 + w4) / 2;
    return length * width;
  };

  const area = calculateArea();
  const essentialCost = area * 90;
  const premiumCost = area * 100;
  const luxuryCost = area * 110;

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <div className="relative py-24 px-6 pt-32">
        <div className="max-w-4xl mx-auto">
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <CalcIcon className="text-background" size={16} />
                  </div>
                  Room Dimensions
                </CardTitle>
                <CardDescription>Enter the length of each wall in feet (walls should connect in order)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wall1" className="text-sm font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">1</span>
                      North Wall
                    </Label>
                    <Input
                      id="wall1"
                      type="number"
                      placeholder="12"
                      value={wall1}
                      onChange={(e) => setWall1(e.target.value)}
                      min="0"
                      step="0.1"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wall2" className="text-sm font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">2</span>
                      East Wall
                    </Label>
                    <Input
                      id="wall2"
                      type="number"
                      placeholder="10"
                      value={wall2}
                      onChange={(e) => setWall2(e.target.value)}
                      min="0"
                      step="0.1"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wall3" className="text-sm font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">3</span>
                      South Wall
                    </Label>
                    <Input
                      id="wall3"
                      type="number"
                      placeholder="9"
                      value={wall3}
                      onChange={(e) => setWall3(e.target.value)}
                      min="0"
                      step="0.1"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wall4" className="text-sm font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">4</span>
                      West Wall
                    </Label>
                    <Input
                      id="wall4"
                      type="number"
                      placeholder="15"
                      value={wall4}
                      onChange={(e) => setWall4(e.target.value)}
                      min="0"
                      step="0.1"
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Total Ceiling Area:</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {area.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">sq ft</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Measure each wall carefully. For irregular rooms, the calculator uses the average of opposite walls to estimate the ceiling area.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">Instant Estimates</h3>
                <p className="text-sm text-muted-foreground">Live calculation based on your room dimensions</p>
              </div>

              <Card className="border-primary/50 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Essential Plan</h4>
                      <p className="text-xs text-muted-foreground">Basic false ceiling design</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-xs font-medium text-primary">90 Rs/sq ft</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {essentialCost.toFixed(0)}
                    </span>
                    <span className="text-lg text-muted-foreground">Rs</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/50 bg-gradient-to-br from-card via-card to-accent/5 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Premium Plan</h4>
                      <p className="text-xs text-muted-foreground">Enhanced ceiling solutions</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                      <span className="text-xs font-medium text-accent">100 Rs/sq ft</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {premiumCost.toFixed(0)}
                    </span>
                    <span className="text-lg text-muted-foreground">Rs</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/50 bg-gradient-to-br from-card via-card to-primary/10 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Luxury Plan</h4>
                      <p className="text-xs text-muted-foreground">Premium ceiling designs</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-xs font-medium text-primary">110 Rs/sq ft</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {luxuryCost.toFixed(0)}
                    </span>
                    <span className="text-lg text-muted-foreground">Rs</span>
                  </div>
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
    </div>
  );
};

export default Calculator;
