import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageLightbox } from "@/components/ImageLightbox";
import { fetchPricingPlans } from "@/utils/api";

const Advanced = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Luxury");

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetchPricingPlans();
        const luxuryPlan = response.data.find(plan => plan.title === "Luxury");
        if (luxuryPlan && luxuryPlan.gallery) {
          setImages(luxuryPlan.gallery.map(img => img.url));
          setTitle(luxuryPlan.title);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark relative">
      {/* Ambient effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <Link
        to="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </Link>

      <div className="relative container mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-display text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-primary" />
            <p className="text-muted-foreground text-sm tracking-widest uppercase">110 Rs per sq. ft.</p>
            <div className="h-px w-16 bg-gradient-primary" />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-glow animate-scale-in aspect-[4/3] cursor-pointer"
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => {
                setSelectedImageIndex(index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={image}
                alt={`${title} ceiling design ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
                  Click to view
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default Advanced;
