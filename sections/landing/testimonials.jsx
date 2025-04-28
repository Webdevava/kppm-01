import React, { useState, useRef, useEffect } from "react";
import { Star, User, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Tech Innovators Inc.",
      position: "CEO",
      content: "Working with KPPMca transformed our digital presence. Their team understood our vision perfectly and delivered a website that exceeded our expectations. The increase in user engagement and conversions has been remarkable.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Michael Chen",
      company: "GrowthBridge Ventures",
      position: "Marketing Director",
      content: "KPPMca's approach to digital marketing is refreshingly strategic. They created a comprehensive digital ecosystem that drives real business results. Their team is responsive, creative, and technically brilliant.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Olivia Thompson",
      company: "EcoSolutions",
      position: "Founder",
      content: "As a startup, we needed a partner who could handle everything digital. KPPMca's holistic approach to branding, website development, and marketing helped us establish a strong market presence quickly.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "James Wilson",
      company: "Metropolitan Finance",
      position: "Head of Digital",
      content: "KPPMca brought fresh perspectives to our dated financial services website, balancing professional aesthetics with modern functionality, resulting in a 40% increase in lead generation.",
      rating: 4,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Elena Rodriguez",
      company: "Artisan Collective",
      position: "Creative Director",
      content: "KPPMca understood our aesthetic requirements and enhanced them with technical expertise. Our online store has become our most valuable asset thanks to their expertise.",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  const totalCards = testimonials.length + 1; // Including CTA card

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, totalCards);

    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Initial animations for header
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Initial animations for cards
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, scale: 0.8, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, [totalCards]);

  const handleDragStart = (e) => {
    e.preventDefault();
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const newOffsetX = clientX - startX;
    setOffsetX(newOffsetX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (offsetX < -100) {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    } else if (offsetX > 100) {
      setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
    }

    setOffsetX(0);
  };

  const getCardStyle = (index) => {
    const normalizedIndex = ((index - activeIndex + totalCards) % totalCards);
    const isActive = normalizedIndex === 0;

    let transform = "";
    let zIndex = totalCards - normalizedIndex;
    let opacity = 1;
    let rotate = 0;

    if (isActive && isDragging) {
      transform = `translateX(${offsetX}px) translateY(0) scale(1.1)`;
      zIndex = totalCards + 1; // Keep on top while dragging
      rotate = offsetX / 50;
      opacity = 1;
    } else if (isActive) {
      transform = `translateX(0) translateY(0) scale(1)`;
      zIndex = totalCards;
      rotate = 0;
    } else {
      // Stack cards like a deck
      const offset = normalizedIndex * 8; // Closer stacking
      transform = `translateX(${offset}px) translateY(${offset}px) scale(${1 - normalizedIndex * 0.02})`;
      rotate = normalizedIndex * 2; // Subtle rotation for deck effect
      opacity = 1 - normalizedIndex * 0.15;
    }

    return {
      transform: `${transform} rotate(${rotate}deg)`,
      zIndex,
      opacity,
      transition: isDragging ? "none" : "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
    };
  };

  return (
    <section
      className="min-h-screen bg-[#F5F5F5] lg:p-12 relative overflow-hidden flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        <div className="text-center flex items-center flex-col gap-3" ref={headerRef}>
          <p className="text-sm font-semibold rounded-2xl px-5 py-2 w-fit bg-[#C7FB54]">
            You won’t believe this
          </p>
          <h2 className="text-5xl md:text-6xl font-medium mb-4 max-w-2xl">
            Our Clients Can’t Say Anything Bad About Us
          </h2>
        </div>

        <div
          className="relative w-[32rem] h-[36rem] flex items-center justify-center"
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute w-[30rem] h-[30rem] p-10 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing border border-gray-100 backdrop-blur-sm bg-opacity-100"
              style={getCardStyle(index)}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
            >
              <div className="flex flex-col h-full">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      weight={i < testimonial.rating ? "fill" : "regular"}
                      className="text-[#C7FB54]"
                      size={28}
                    />
                  ))}
                </div>

                <p className="text-lg font-medium text-gray-700 flex-grow line-clamp-6">
                  {testimonial.content}
                </p>

                <div className="mt-8 flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mr-4 overflow-hidden ring-2 ring-gray-200">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900">{testimonial.name}</h4>
                    <p className="text-base text-gray-500">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            ref={(el) => (cardRefs.current[testimonials.length] = el)}
            className="absolute w-[30rem] h-[30rem] p-10 bg-white rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing backdrop-blur-sm"
            style={getCardStyle(testimonials.length)}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="bg-[#C7FB54] rounded-2xl w-fit px-5 py-3 font-semibold text-xs text-foreground flex items-center mb-6">
                BE OUR NEXT CLIENT IN THIS SECTION
              </span>
              <h3 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h3>
              <p className="text-lg mb-8 px-4">
                Join our successful clients and transform your digital presence today.
              </p>
              <button className="bg-gray-900 text-white rounded-xl px-8 py-4 font-bold hover:bg-[#A3E635] transition-colors flex items-center shadow-lg">
                Book a free Call
                <ArrowRight size={24} className="ml-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};