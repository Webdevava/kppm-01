import { Calculator, ChartPie, ShieldCheck, Dot } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Hero = () => {
  // Client logos
  const logos = [
    "Veritas Software Technologies India",
    "Infrabeat Technologies",
    "Ennovata Sales & Services",
    "Ognibene India",
    "KSPG Automotive India",
    "Accord Engineering Works",
    "Ferrero India",
    "Savvy Pure Aqua",
    "Weikifield India",
    "Abhijeet Engineers",
    "Pune Carbons",
    "Techexpert Engineering",
    "Cordstrap India",
    "Anacle India",
    "Bank of Maharashtra",
    "Bny Mellon International Operations",
    "Kallapana Avade Ichalkaranji Janata Coop Bank",
    "Aflah Textile",
    "Irfana Fabrics",
    "Shabnam Fabrics",
    "Sahyadri Farmes Producers Company",
    "Sahyadri Agro Retails Limited",
    "Anacle India",
    "Anacle PTE",
    "Zumata India",
    "Global Talent Track",
    "Pune City Center",
    "Cordstrap USA",
    "Zumata PTE",
    "DSI INC - USA",
    "Kingdom Turf Inc",
    "Scarecrow M & C Saatchi"
  ];

  // Refs for elements to animate
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    // GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Floating background icons animation
      gsap.to('.floating-icon', {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(-8, 8)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2
      });

      // Rotating star animation
      gsap.to('.rotating-star', {
        rotation: 360,
        duration: 4,
        ease: "linear",
        repeat: -1,
      });

      // Initial text animations
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        buttonRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.8,
          ease: "power2.out"
        }
      );

      // Marquee animation
      const marquee = marqueeRef.current;
      const marqueeWidth = marquee.scrollWidth / 2; // Width of one set of logos
      gsap.set(marquee, { x: 0 });

      gsap.to(marquee, {
        x: -marqueeWidth,
        duration: 25,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % marqueeWidth),
        },
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section className="flex lg:p-12 min-h-screen bg-gradient-to-b from-white via-background to-background" ref={heroRef}>
      <div className="mt-32 container mx-auto bg-gradient-to-b from-[#004CD2] via-background to-background rounded-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Decorative background icons */}
        <div ref={iconsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <Calculator size={64} className="text-[#161616]/10 absolute top-20 left-36 floating-icon" />
          <ChartPie size={80} className="text-[#161616]/10 absolute bottom-48 right-24 floating-icon" />
          <ShieldCheck size={72} className="text-[#161616]/10 absolute top-48 right-96 floating-icon" />
          <Calculator size={56} className="text-[#161616]/10 absolute bottom-32 left-48 floating-icon" />
        </div>

        <div className="p-12 space-y-4 flex flex-col items-center justify-center">
          <div className="bg-[#161616] rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit">
            <ShieldCheck weight="fill" color="#004CD2" />
            <p className="text-xs text-white uppercase font-semibold">
              Trusted financial advisory since 1995
            </p>
          </div>
          <div className="mb-8 mt-6" ref={textRef}>
            <h1 className="text-6xl text-center font-medium leading-none">
              Strategic Financial <br />
              Solutions for Your Success
            </h1>
            <p className="text-center text-xl mt-3">
              Expert accounting, tax optimization, and business advisory services <br />
              tailored to help you achieve financial clarity and growth.
            </p>
          </div>
          <div className="flex items-center gap-4 justify-center" ref={buttonRef}>
            <button className="bg-[#161616] text-white rounded-2xl px-12 py-4 flex items-center justify-center gap-4 w-fit hover:bg-[#252525] transition-colors">
              Schedule Consultation
            </button>
            <button className="text-[#161616] font-medium hover:underline">Our Services</button>
          </div>
          
          {/* Stats section */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#161616]">25+</h3>
              <p className="text-[#161616]/70">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#161616]">2,500+</h3>
              <p className="text-[#161616]/70">Clients Served</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#161616]">98%</h3>
              <p className="text-[#161616]/70">Client Retention</p>
            </div>
          </div>
        </div>

        {/* Client Logos Marquee with edge blur */}
        <div className="marquee-container overflow-hidden bg-transparent py-8 relative">
          {/* Left blur gradient */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background/85 to-transparent z-10"></div>

          <div className="logo-marquee flex whitespace-nowrap" ref={marqueeRef}>
            {/* First set of logos with rotating stars */}
            {logos.map((logo, index) => (
              <div key={`logo-${index}`} className="flex items-center">
                <div className="mx-6 flex items-center justify-center">
                  <div className="h-12 flex items-center justify-center rounded bg-white/10 backdrop-blur-sm px-4 py-2">
                    <h1 className="font-bold text-3xl text-[#3e3e3e]">{logo}</h1>
                  </div>
                </div>
                {index < logos.length - 1 && (
                  <Dot
                    size={24}
                    weight="fill"
                    className="rotating-star text-[#004CD2] mx-4"
                  />
                )}
              </div>
            ))}
            {/* Duplicate logos for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`logo-duplicate-${index}`} className="flex items-center">
                <div className="mx-6 flex items-center justify-center">
                  <div className="h-12 flex items-center justify-center rounded bg-white/10 backdrop-blur-sm px-4 py-2">
                    <span className="font-medium text-[#161616]">{logo}</span>
                  </div>
                </div>
                {index < logos.length - 1 && (
                  <Dot
                    size={24}
                    weight="fill"
                    className="rotating-star text-[#004CD2] mx-4"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right blur gradient */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background/85 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};