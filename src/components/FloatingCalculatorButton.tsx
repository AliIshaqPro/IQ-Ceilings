import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";

const FloatingCalculatorButton = () => {
  const location = useLocation();
  
  // Don't show on calculator page
  if (location.pathname === "/calculator") {
    return null;
  }

  return (
    <Link 
      to="/calculator"
      className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
        <button className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
          <Calculator className="text-background" size={20} />
        </button>
      </div>
    </Link>
  );
};

export default FloatingCalculatorButton;
