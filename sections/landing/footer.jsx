import React, { useEffect, useRef } from "react";
import { Envelope, Phone, InstagramLogo, TwitterLogo, LinkedinLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CTA } from "./cta";
import gsap from "gsap";

export const Footer = () => {
  const socialIconsRef = useRef([]);
  const buttonRef = useRef(null);
  const newsletterRef = useRef(null);
  
  // Add to the refs array
  const addToRefs = (el) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Reset refs array on mount
    socialIconsRef.current = [];
    
    // Magnetic effect for social icons
    socialIconsRef.current.forEach((icon) => {
      const xTo = gsap.quickTo(icon, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(icon, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
      
      icon.addEventListener("mousemove", (e) => {
        const { top, left, width, height } = icon.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        xTo(x * 0.35);
        yTo(y * 0.35);
      });
      
      icon.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
    
    // Button hover animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current.querySelector("svg"), {
        scale: 1.2,
        duration: 0.3,
        paused: true,
      }).reverse();
      
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
        });
      });
      
      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
        });
      });
    }
    
    // Newsletter animation
    if (newsletterRef.current) {
      gsap.from(newsletterRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    }
    
    // Cleanup
    return () => {
      socialIconsRef.current.forEach((icon) => {
        icon.removeEventListener("mousemove", () => {});
        icon.removeEventListener("mouseleave", () => {});
      });
      
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", () => {});
        buttonRef.current.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#F5F5F5] flex items-end justify-center flex-col gap-6 lg:p-12">
      <CTA/>

      <div className="bg-[#004CD2] rounded-2xl container mx-auto h-full">
        <div className="p-8 lg:p-12 flex flex-col gap-8">
          {/* Top Section with Logo and Tagline */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl text-black font-bold">KPPM<span className="text-foreground">ca</span></h2>
              <p className="text-white text-sm md:text-base">Financial excellence through expert accounting</p>
            </div>
            <button 
              ref={buttonRef}
              className="mt-4 md:mt-0 group flex items-center gap-2 text-sm font-medium bg-foreground text-white hover:bg-gray-800 px-5 py-3 rounded-xl transition-all duration-300"
            >
              Contact Us
              <ArrowUpRight size={16} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-800">
            {/* Column 1 - Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
              <div className="flex items-center gap-3 text-white">
                <Envelope size={18} />
                <a href="mailto:info@kppmca.com" className="hover:text-foreground transition-colors">info@kppmca.com</a>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Phone size={18} />
                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">+1 (234) 567-890</a>
              </div>
            </div>
            
            {/* Column 2 - Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <a href="#" className="text-white hover:text-black transition-colors">About Our Firm</a>
              <a href="#" className="text-white hover:text-black transition-colors">Accounting Services</a>
              <a href="#" className="text-white hover:text-black transition-colors">Tax Planning</a>
              <a href="#" className="text-white hover:text-black transition-colors">Careers at KPPMca</a>
            </div>
            
            {/* Column 3 - Services */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">Services</h3>
              <a href="#" className="text-white hover:text-black transition-colors">Tax Preparation</a>
              <a href="#" className="text-white hover:text-black transition-colors">Financial Auditing</a>
              <a href="#" className="text-white hover:text-black transition-colors">Business Consulting</a>
              <a href="#" className="text-white hover:text-black transition-colors">Wealth Management</a>
            </div>
            
            {/* Column 4 - Newsletter */}
            <div ref={newsletterRef} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-foreground">Newsletter</h3>
              <p className="text-white text-sm">Stay updated with our latest tax tips and financial insights</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white text-gray-800 border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-foreground"
                />
                <button className="bg-foreground text-white px-4 rounded-r-lg hover:bg-gray-800 transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section with Social and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 mt-4 border-t border-white">
            <div className="flex gap-6 mb-4 md:mb-0">
              <a 
                href="#" 
                ref={addToRefs}
                className="text-[#004CD2] hover:text-foreground transition-colors bg-white p-2 rounded-full"
              >
                <InstagramLogo size={20} />
              </a>
              <a 
                href="#" 
                ref={addToRefs}
                className="text-[#004CD2] hover:text-foreground transition-colors bg-white p-2 rounded-full"
              >
                <TwitterLogo size={20} />
              </a>
              <a 
                href="#" 
                ref={addToRefs}
                className="text-[#004CD2] hover:text-foreground transition-colors bg-white p-2 rounded-full"
              >
                <LinkedinLogo size={20} />
              </a>
            </div>
            <p className="text-[#004CD2] text-sm">© {new Date().getFullYear()} KPPMca. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};