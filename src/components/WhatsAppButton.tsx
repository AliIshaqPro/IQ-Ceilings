import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "923458783923";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-6 bottom-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-glow hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
          <MessageCircle className="text-white" size={24} />
        </div>
      </div>
    </button>
  );
};

export default WhatsAppButton;
