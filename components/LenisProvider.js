'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export const Featured = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      title: "Tech Innovators",
      category: "Web Development",
      image: "/api/placeholder/600/400",
      description: "A sleek, high-performance website for a tech startup.",
    },
    {
      title: "EcoSolutions",
      category: "UI/UX Design",
      image: "/api/placeholder/600/400",
      description: "Intuitive and visually stunning interface for a green tech platform.",
    },
    {
      title: "GrowthBridge",
      category: "Digital Marketing",
      image: "/api/placeholder/600/400",
      description: "Strategic campaign driving 50% increase in conversions.",
    },
    {
      title: "Artisan Collective",
      category: "E-Commerce",
      image: "/api/placeholder/600/400",
      description: "A vibrant online store showcasing handcrafted goods.",
    },
    {
      title: "Metropolitan Finance",
      category: "Branding",
      image: "/api/placeholder/600/400",
      description: "Modernized brand identity for a financial institution.",
    },
  ];

  useEffect(() => {
    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Animate header
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

      // Animate cards
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Initialize Draggable
      Draggable.create(carouselRef.current, {
        type: "x",
        bounds: {
          minX: -carouselRef.current.scrollWidth + window.innerWidth - 48, // Account for padding
          maxX: 0,
        },
        inertia: true,
        edgeResistance: 0.65,
        onDrag: function () {
          // Add subtle tilt effect during drag
          cardRefs.current.forEach((card, index) => {
            gsap.to(card, {
              rotation: this.x / 100 + index * 2,
              duration: 0.2,
              ease: "power1.out",
            });
          });
        },
        onDragEnd: function () {
          // Reset rotation
          cardRefs.current.forEach((card) => {
            gsap.to(card, {
              rotation: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup animations and Draggable on unmount
  }, []);

  return (
    <section
      className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className="flex items-center justify-between mb-12 px-6 lg:px-12"
          ref={headerRef}
        >
          <h1 className="text-4xl md:text-6xl font-medium text-[#161616]">
            Featured Work
          </h1>
          <button className="text-sm font-semibold bg-[#004CD2] px-6 py-4 rounded-2xl hover:bg-[#A3E635] transition-colors">
            View More
          </button>
        </div>

        <div className="overflow-hidden px-6 lg:px-12">
          <div
            className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
            ref={carouselRef}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="w-[300px] sm:w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="h-[200px] sm:h-[250px] w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#161616] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase mb-2">
                    {project.category}
                  </p>
                  <p className="text-base text-gray-700">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};