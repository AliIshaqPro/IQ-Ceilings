import { Calculator } from "lucide-react";

interface StickyCalculationProps {
  totalArea: number;
  essentialCost: number;
  premiumCost: number;
  luxuryCost: number;
}

const StickyCalculation = ({ totalArea, essentialCost, premiumCost, luxuryCost }: StickyCalculationProps) => {
  if (totalArea === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-40 animate-fade-in">
      <div className="bg-card/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-4 w-64">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Calculator className="text-background" size={16} />
          </div>
          <h3 className="font-semibold text-foreground text-sm">Live Estimate</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
            <span className="text-xs text-muted-foreground">Total Area</span>
            <span className="text-sm font-bold text-foreground">{totalArea.toFixed(2)} sq ft</span>
          </div>
          
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Essential</span>
              <span className="text-sm font-semibold text-foreground">₨{essentialCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Premium</span>
              <span className="text-sm font-semibold text-foreground">₨{premiumCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Luxury</span>
              <span className="text-sm font-semibold text-foreground">₨{luxuryCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCalculation;
