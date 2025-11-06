import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProjects } from "@/utils/api";
import { Project } from "@/types/project";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      
      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our portfolio of stunning ceiling designs across Islamabad and Rawalpindi
            </p>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden bg-card border border-border rounded-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-glow animate-scale-in h-full">
                    <div className="relative h-64 overflow-hidden bg-muted">
                      {project.acf?.project_images?.[0]?.url ? (
                        <img 
                          src={project.acf.project_images[0].url} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="relative p-6 space-y-4">
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {project.acf?.description || project.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-3 text-xs">
                        {project.acf?.location && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin size={14} className="text-primary" />
                            <span>{project.acf.location}</span>
                          </div>
                        )}
                        {project.acf?.year_completed && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar size={14} className="text-primary" />
                            <span>{project.acf.year_completed}</span>
                          </div>
                        )}
                      </div>

                      {project.acf?.category && (
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {project.acf.category}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
