import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { 
  Calculator, 
  ChartPie, 
  Briefcase, 
  ChartBar, 
  FileText,
  Scales,
  Building,
  Gear
} from "@phosphor-icons/react/dist/ssr";

export const Services = () => {
  // Refs for animation elements
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // Services data with pastel, poppy, smooth colors for bento grid
  const services = [
    {
      title: "Audit & Assurance Services",
      description: "Thorough audit and assurance services to ensure financial accuracy, compliance, and stakeholder confidence.",
      icon: <FileText size={36} weight="fill" />,
      color: "#2E2E2E", // Dark gray for contrast
      bgColor: "#A7C7E7", // Soft pastel blue
      shape: "/assets/shape-1.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
    {
      title: "Direct Tax Consultancy",
      description: "Expert advice on direct tax planning and compliance to optimize tax liabilities and ensure regulatory adherence.",
      icon: <Calculator size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#F4C7C3", // Warm pastel peach
      shape: "/assets/shape-2.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
    {
      title: "Indirect Tax Consultancy",
      description: "Specialized guidance on indirect tax strategies, including GST and VAT, to streamline compliance and reduce costs.",
      icon: <Scales size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#B5EAD7", // Mint green
      shape: "/assets/shape-3.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
    {
      title: "Accounting Solutions",
      description: "Comprehensive accounting services for accurate financial reporting and streamlined bookkeeping processes.",
      icon: <ChartBar size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#FFDAC1", // Soft coral
      shape: "/assets/shape-4.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-6 row-span-1",
    },
    {
      title: "Consulting",
      description: "Strategic consulting to drive business growth, improve efficiency, and navigate complex financial landscapes.",
      icon: <Briefcase size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#C1A7E7", // Light lavender
      shape: "/assets/3d-1.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-6 row-span-1",
    },
    {
      title: "Due Diligence Review",
      description: "In-depth due diligence to assess financial risks and opportunities for mergers, acquisitions, or investments.",
      icon: <ChartPie size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#FFE4E1", // Pale rose
      shape: "/assets/3d-2.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
    {
      title: "Valuation",
      description: "Accurate business and asset valuations to support strategic decisions, mergers, or financial reporting.",
      icon: <Building size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#D4F1F4", // Light aqua
      shape: "/assets/3d-3.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
    {
      title: "Business Process Outsourcing",
      description: "Efficient outsourcing solutions for finance, accounting, and administrative tasks to enhance operational scalability.",
      icon: <Gear size={36} weight="fill" />,
      color: "#2E2E2E",
      bgColor: "#FFF5BA", // Soft yellow
      shape: "/assets/3d-4.png",
      className: "col-span-12 sm:col-span-6 lg:col-span-4 row-span-2",
    },
  ];

  useEffect(() => {
    // Initialize cards refs array
    cardsRef.current = cardsRef.current.slice(0, services.length);

    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          delay: 0.3,
        }
      );

      // Shape animations - subtle floating
      const shapes = document.querySelectorAll('.shape-element');
      shapes.forEach((shape) => {
        gsap.to(shape, {
          rotation: "random(-10, 10)",
          x: "random(-5, 5)",
          y: "random(-5, 5)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
        });
      });

      // Icons subtle pulse/rotation
      const icons = document.querySelectorAll('.service-icon');
      icons.forEach((icon) => {
        gsap.to(icon, {
          rotation: "random(-5, 5)",
          duration: "random(2, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section
      className="min-h-screen bg-[#F5F5F5] flex items-center justify-center lg:p-12"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16" ref={headerRef}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-4">Our Services</h2>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl">
            Tailored financial and business solutions to empower your success with precision and expertise.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 auto-rows-[minmax(200px,auto)] gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg ${service.className}`}
              style={{ backgroundColor: service.bgColor }}
            >
              {/* Background Shape */}
              <img 
                src={service.shape} 
                alt="" 
                className="shape-element absolute right-0 bottom-0 w-2/5 opacity-20 z-0 pointer-events-none"
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div 
                  className="service-icon rounded-full p-3 mb-6 w-fit"
                  style={{ backgroundColor: `${service.color}30` }}
                >
                  <div style={{ color: service.color }}>
                    {service.icon}
                  </div>
                </div>

                <h3 
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-3" 
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                
                <p className="text-gray-800 text-shadow-gray-200 text-shadow-2xs text-sm sm:text-base flex-grow">
                  {service.description}
                </p>
                
                <a 
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium flex items-center mt-4"
                  style={{ color: service.color }}
                >
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};