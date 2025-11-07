import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, ArrowLeft, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCalculatorButton from "@/components/FloatingCalculatorButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ImageLightbox } from "@/components/ImageLightbox";
import { fetchProjectBySlug } from "@/utils/api";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      try {
        const data = await fetchProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <p className="text-muted-foreground text-lg mb-6">Project not found</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = project.acf?.project_images?.map(img => img.url) || [];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
              {project.acf?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>{project.acf.location}</span>
                </div>
              )}
              {project.acf?.year_completed && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span>Completed {project.acf.year_completed}</span>
                </div>
              )}
              {project.acf?.category && (
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-primary" />
                  <span className="capitalize">{project.acf.category}</span>
                </div>
              )}
            </div>

            <div className="w-24 h-1 bg-gradient-primary rounded-full mb-6" />

            {project.acf?.description && (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.acf.description}
              </p>
            )}
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={imageUrl}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12 border border-border rounded-2xl">
              No project images available
            </div>
          )}
        </div>
      </div>

      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />
      
      <FloatingCalculatorButton />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectDetail;
