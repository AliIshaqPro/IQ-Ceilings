import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 group"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
              <ArrowUp className="text-background" size={20} />
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
