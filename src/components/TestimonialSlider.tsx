import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, MapPin, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    location: "DHA Phase 2, Islamabad",
    rating: 5,
    review: "Outstanding work on our living room ceiling! The team was professional and completed the project on time. Highly recommend their premium package.",
    company: "IQ Ceilings"
  },
  {
    name: "Sara Khan",
    location: "Bahria Town, Islamabad",
    rating: 5,
    review: "Beautiful ceiling design for our new home. The quality is excellent and the installation was seamless. Very happy with the results!",
    company: "IQ Ceilings"
  },
  {
    name: "Usman Ali",
    location: "F-10, Islamabad",
    rating: 5,
    review: "Professional service from start to finish. They understood our vision and delivered exactly what we wanted. Great attention to detail!",
    company: "IQ Ceilings"
  },
  {
    name: "Fatima Hassan",
    location: "Bahria Enclave, Islamabad",
    rating: 5,
    review: "Transformed our bedroom with an elegant ceiling design. IQ Ceilings exceeded all expectations with their craftsmanship and attention to detail.",
    company: "IQ Ceilings"
  },
  {
    name: "Bilal Ahmed",
    location: "PWD, Islamabad",
    rating: 5,
    review: "Exceptional quality and timely delivery. The false ceiling has completely changed the ambiance of our living space. Highly satisfied!",
    company: "IQ Ceilings"
  },
  {
    name: "Aisha Malik",
    location: "Satellite Town, Rawalpindi",
    rating: 5,
    review: "Amazing experience from consultation to installation. The team was courteous and the final result is simply stunning. Worth every penny!",
    company: "IQ Ceilings"
  },
];

const TestimonialSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <div className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Client <span className="bg-gradient-primary bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            What our satisfied clients say about IQ Ceilings
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full">
                  <Quote className="absolute top-4 right-4 text-primary/20" size={32} />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin size={12} className="text-primary" />
                      <span>{testimonial.location}</span>
                    </div>
                    <p className="text-xs text-primary mt-2 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-muted hover:bg-primary transition-colors duration-300"
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
