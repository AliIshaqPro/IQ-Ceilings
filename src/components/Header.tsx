import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
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
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group py-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300 rounded-full" />
                {/* Hover glow */}
                <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-lg" />
              </Link>
            ))}
            
            {/* Futuristic WhatsApp Button */}
            <a
              href="https://wa.me/923458783923"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-5 py-2.5 rounded-full overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#20bd5a] transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-white/20 to-[#25D366]/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              {/* Button content */}
              <span className="relative z-10 text-white font-medium text-sm flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                WhatsApp Us
              </span>
            </a>
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
                  className="block py-2.5 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-primary/5 relative group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300" />
                </Link>
              ))}
              
              <a
                href="https://wa.me/923458783923"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="relative group block w-full px-5 py-3 rounded-xl overflow-hidden mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#20bd5a]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-white/20 to-[#25D366]/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10 text-white font-medium text-sm text-center flex items-center justify-center gap-2">
                  <Sparkles size={16} className="animate-pulse" />
                  WhatsApp Us
                </span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
