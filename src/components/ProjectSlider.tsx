import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Project } from "@/types/project";

interface ProjectSliderProps {
  projects: Project[];
}

const ProjectSlider = ({ projects }: ProjectSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <div className="lg:hidden overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] min-w-0"
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="relative overflow-hidden bg-card border border-border rounded-xl transition-all duration-500 hover:border-primary/50 hover:shadow-glow h-full">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
                  {project.acf?.project_images?.[0]?.url ? (
                    <img 
                      src={project.acf.project_images[0].url} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="relative p-4 space-y-2">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {project.acf?.description || project.excerpt}
                  </p>

                  {project.acf?.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={12} className="text-primary" />
                      <span>{project.acf.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
