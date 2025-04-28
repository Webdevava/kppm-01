import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";

export const About = () => {
  // Refs for animation elements
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const teamRefs = useRef([]);

  // Team member data
  const teamMembers = [
    {
      name: "Kevin Patterson",
      role: "Managing Partner",
      image: "/placeholder.svg",
      description: "20+ years of experience in tax strategy and financial leadership."
    },
    {
      name: "Patricia Morgan",
      role: "Audit Director",
      image: "/placeholder.svg",
      description: "Expert in corporate auditing and regulatory compliance."
    },
    {
      name: "Paul Chen",
      role: "Tax Specialist",
      image: "/placeholder.svg",
      description: "Creates innovative tax planning solutions for businesses of all sizes."
    },
    {
      name: "Maria Rodriguez",
      role: "Financial Advisor",
      image: "/placeholder.svg",
      description: "Specializes in wealth management and retirement planning."
    }
  ];

  // Stats data
  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "1500+", label: "Clients Served" },
    { value: "99%", label: "Client Retention" },
    { value: "12", label: "Industry Awards" }
  ];

  useEffect(() => {
    // Initialize team refs
    teamRefs.current = teamRefs.current.slice(0, teamMembers.length);

    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Header animations
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

      // Content animation with split text effect
      const contentElements = contentRef.current.children;
      gsap.fromTo(
        contentElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      // Stats counter animation
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(
        statItems,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );

      // Team members staggered reveal
      gsap.fromTo(
        teamRefs.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.7,
        }
      );

      // Hover animations for team cards
      teamRefs.current.forEach((card) => {
        const overlay = card.querySelector('.overlay');
        const image = card.querySelector('.image');
        
        card.addEventListener("mouseenter", () => {
          gsap.to(overlay, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(overlay, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.in",
          });
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
      <div className="container mx-auto max-w-7xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-12">
        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8"
          ref={headerRef}
        >
          <div>
            <div className="bg-[#161616] rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit mb-6">
              <Star weight="fill" color="#C7FB54" />
              <p className="text-xs text-white uppercase font-semibold">
                WHO WE ARE
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium max-w-xl">
              Financial Expertise Meets Strategic Vision
            </h2>
          </div>
          <div>
            <p className="text-xl md:text-2xl max-w-md mb-2">
              Delivering comprehensive financial solutions that drive growth and stability for forward-thinking businesses.
            </p>
            <a
              href="/services"
              className="inline-block bg-[#C7FB54]  text-sm rounded-2xl px-8 py-3 font-bold hover:bg-[#C7FB75] transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Content and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* About Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg">
              Founded in 2000, KPPMca is a team of chartered accountants, tax specialists, and financial advisors 
              dedicated to helping businesses and individuals achieve financial excellence and compliance.
            </p>
            <p className="text-lg">
              We combine strategic thinking with technical expertise to deliver accounting, tax planning, 
              audit, and advisory services that not only ensure compliance but also optimize your financial position.
            </p>
            <p className="text-lg">
              Our approach is collaborative, transparent, and focused on delivering measurable results
              that align with your long-term financial objectives and business goals.
            </p>
            <a
              href="/story"
              className="inline-flex items-center text-lg font-semibold hover:text-[#C7FB54] transition-colors pt-4"
            >
              Read Our Full Story
              <ArrowRight size={24} className="ml-2" />
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-5xl font-bold text-[#161616] mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-6">
          <h3 className="text-3xl font-medium mb-12">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={(el) => (teamRefs.current[index] = el)}
                className="h-[320px] rounded-2xl overflow-hidden relative cursor-pointer shadow-md"
              >
                {/* Image */}
                <div className="image w-full h-full transition-transform duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="overlay absolute inset-0 bg-gradient-to-t from-[#161616]/90 via-[#161616]/50 to-transparent p-6 flex flex-col justify-end opacity-0 transform translate-y-20">
                  <h4 className="text-2xl font-medium text-white">{member.name}</h4>
                  <p className="text-[#C7FB54] font-medium mb-2">{member.role}</p>
                  <p className="text-white/80">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};