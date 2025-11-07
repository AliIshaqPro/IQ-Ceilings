import { Link } from "react-router-dom";
import { Menu, X, Calculator } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Basic", path: "/basic" },
    { name: "Medium", path: "/medium" },
    { name: "Advanced", path: "/advanced" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphic backdrop with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/60 to-background/40 backdrop-blur-2xl border-b border-primary/20" />
      
      {/* Animated glow effect */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <nav className="relative container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo with futuristic glow */}
          <Link to="/" className="flex items-center group relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <img 
              src={logo} 
              alt="IQ Ceiling Designs" 
              className="h-10 sm:h-12 w-auto relative z-10 transform group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-500 group py-2 px-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 inline-block">{link.name}</span>
                {/* Animated underline with glow */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                {/* Hover glow effect */}
                <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 rounded-lg scale-0 group-hover:scale-100" />
                {/* Shine effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </span>
              </Link>
            ))}
            
            {/* Calculator Button */}
            <Link
              to="/calculator"
              className="relative group px-5 py-2.5 rounded-full overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              {/* Button content */}
              <span className="relative z-10 text-background font-medium text-sm flex items-center gap-2">
                <Calculator size={16} className="animate-pulse" />
                Calculator
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button with futuristic design */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative p-2.5 rounded-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative z-10 text-foreground group-hover:text-primary transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation with glassmorphic design */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <div className="rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 p-4 space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-500 rounded-xl hover:bg-primary/10 relative group overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300 inline-block">{link.name}</span>
                  <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-xl transition-all duration-500 scale-0 group-hover:scale-100" />
                  {/* Slide-in effect */}
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-r" />
                </Link>
              ))}
              
              <Link
                to="/calculator"
                onClick={() => setIsOpen(false)}
                className="relative group block w-full px-5 py-3 rounded-xl overflow-hidden mt-4"
              >
                <div className="absolute inset-0 bg-gradient-primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10 text-background font-medium text-sm text-center flex items-center justify-center gap-2">
                  <Calculator size={16} className="animate-pulse" />
                  Calculator
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
