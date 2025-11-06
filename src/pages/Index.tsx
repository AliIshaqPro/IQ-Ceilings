import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Users, MapPin, Calculator, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import { fetchPricingPlans, fetchProjects } from "@/utils/api";
import { PricingPlan } from "@/types/pricing";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import team1 from "@/assets/advanced-1.jpg";
import team2 from "@/assets/advanced-2.jpg";
import team3 from "@/assets/advanced-3.jpg";
import team4 from "@/assets/medium-4.jpg";
import luxuryHero from "@/assets/luxury-hero.jpg";
import premiumHero from "@/assets/premium-hero.jpg";
import essentialHero from "@/assets/essential-hero.jpg";

const Index = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const loadPricingPlans = async () => {
      try {
        const response = await fetchPricingPlans();
        setPricingPlans(response.data);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPricingPlans();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const getPriceForPlan = (title: string) => {
    const prices: Record<string, string> = {
      "Essential": "90",
      "Premium": "100",
      "Luxury": "110",
    };
    return prices[title] || "90";
  };

  const getPathForPlan = (title: string) => {
    const paths: Record<string, string> = {
      "Essential": "/basic",
      "Premium": "/medium",
      "Luxury": "/advanced",
    };
    return paths[title] || "/basic";
  };

  const getImageForPlan = (plan: PricingPlan) => {
    // Use the new hero images
    const defaults: Record<string, string> = {
      "Essential": essentialHero,
      "Premium": premiumHero,
      "Luxury": luxuryHero,
    };
    return defaults[plan.title] || essentialHero;
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <Header />
      
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4 pt-20 md:pt-24">
        <div className="w-full max-w-7xl flex flex-col justify-center py-8 md:py-12">
          <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
            {/* Experience Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 backdrop-blur-sm mb-6 sm:mb-8 animate-scale-in shadow-glow">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent tracking-wide">
                27 YEARS OF EXCELLENCE
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight">
              IQ Ceiling <span className="bg-gradient-primary bg-clip-text text-transparent">Designs</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light">
              Explore our premium collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto w-full px-2 sm:px-4">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground py-8">
                Loading...
              </div>
            ) : (
              pricingPlans.map((plan, index) => (
                <Link
                  key={plan.id}
                  to={getPathForPlan(plan.title)}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden bg-card border border-border rounded-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-glow animate-scale-in h-full flex flex-col" style={{ maxHeight: '90vh' }}>
                    {/* Plan Name at Top */}
                    <div className="relative p-4 sm:p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border z-10">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {plan.title}
                      </h2>
                    </div>

                    {/* Image Section - Full visibility, no overlay */}
                    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden flex-shrink-0">
                      <img 
                        src={getImageForPlan(plan)} 
                        alt={`${plan.title} ceiling designs`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Shine effect on hover only */}
                      <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4 flex-grow flex flex-col justify-between">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                      
                      <div className="flex items-baseline justify-between">
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                              {getPriceForPlan(plan.title)}
                            </span>
                            <span className="text-lg text-muted-foreground font-light">Rs</span>
                          </div>
                          <p className="text-sm text-muted-foreground font-light">
                            per sq ft
                          </p>
                        </div>
                        
                        <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-primary text-background font-medium text-sm flex items-center gap-2 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-105">
                          <span>View</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Calculator CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <Link to="/calculator">
              <Button size="lg" className="group px-8 py-6 text-lg">
                <Calculator className="mr-2 h-5 w-5" />
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Calculate your ceiling project cost instantly
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="relative py-24 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our latest ceiling transformations across Islamabad and Rawalpindi
            </p>
          </div>

          {projectsLoading ? (
            <div className="text-center text-muted-foreground py-8">Loading projects...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden bg-card border border-border rounded-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-glow animate-scale-in h-full">
                      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-muted">
                        {project.acf?.project_images?.[0]?.url ? (
                          <img 
                            src={project.acf.project_images[0].url} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="relative p-6 space-y-3">
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
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="group">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Client <span className="bg-gradient-primary bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              What our satisfied clients say about our work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Raza",
                location: "DHA Phase 2, Islamabad",
                rating: 5,
                review: "Outstanding work on our living room ceiling! The team was professional and completed the project on time. Highly recommend their premium package.",
              },
              {
                name: "Sara Khan",
                location: "Bahria Town, Islamabad",
                rating: 5,
                review: "Beautiful ceiling design for our new home. The quality is excellent and the installation was seamless. Very happy with the results!",
              },
              {
                name: "Usman Ali",
                location: "F-10, Islamabad",
                rating: 5,
                review: "Professional service from start to finish. They understood our vision and delivered exactly what we wanted. Great attention to detail!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.review}"
                </p>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin size={14} className="text-primary" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={team1}
                  alt="IQ Ceiling Designs showcase"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Crafting Excellence in Every Detail
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At IQ Ceiling Designs, we transform ordinary spaces into extraordinary experiences. With years of expertise and a passion for innovation, we deliver ceiling solutions that blend aesthetics with functionality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-background" size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Premium Quality Materials</h4>
                    <p className="text-muted-foreground text-sm">Crafted with precision using the finest materials for lasting beauty and durability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="text-background" size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Expert Team</h4>
                    <p className="text-muted-foreground text-sm">Experienced professionals dedicated to bringing your vision to life with excellence.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="text-background" size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Competitive Pricing</h4>
                    <p className="text-muted-foreground text-sm">Premium designs that fit your budget without compromising on quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="relative py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the creative minds behind our stunning designs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: team1, name: "Ahmad Khan", role: "Lead Designer" },
              { img: team2, name: "Fatima Ali", role: "Senior Architect" },
              { img: team3, name: "Hassan Shah", role: "Project Manager" },
              { img: team4, name: "Ayesha Malik", role: "Design Specialist" },
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-1">{member.name}</h4>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas We Serve Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Areas We <span className="bg-gradient-primary bg-clip-text text-transparent">Serve</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Providing premium ceiling designs across Islamabad and Rawalpindi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="text-background" size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Islamabad</h3>
                <p className="text-muted-foreground">
                  Complete coverage across all sectors and zones of Islamabad, delivering exceptional ceiling solutions to homes and businesses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="text-background" size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Rawalpindi</h3>
                <p className="text-muted-foreground">
                  Serving all areas of Rawalpindi with our premium ceiling design and installation services for residential and commercial projects.
                </p>
              </div>
            </div>
          </div>

          <GoogleMap />
        </div>
      </div>

      <Footer />
      
      {/* Floating Calculator Button */}
      <Link 
        to="/calculator"
        className="fixed left-6 bottom-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
          <button className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
            <Calculator className="text-background" size={24} />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Index;
