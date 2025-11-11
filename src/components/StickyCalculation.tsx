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
    <div className="fixed top-16 left-0 right-0 z-50 animate-fade-in bg-card/95 backdrop-blur-lg border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Calculator className="text-background" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Live Estimate</h3>
              <p className="text-xs text-muted-foreground">Real-time calculation</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
              <span className="text-xs text-muted-foreground">Total Area:</span>
              <span className="text-sm font-bold text-foreground">{totalArea.toFixed(2)} sq ft</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Essential:</span>
              <span className="text-sm font-semibold text-foreground">₨{essentialCost.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Premium:</span>
              <span className="text-sm font-semibold text-foreground">₨{premiumCost.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Luxury:</span>
              <span className="text-sm font-semibold text-foreground">₨{luxuryCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCalculation;
