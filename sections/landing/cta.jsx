import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calculator, ChartPie, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const CTA = () => {
  // Refs for animation elements
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const benefitsRef = useRef(null);

  // Benefits list for CA firm
  const benefits = [
    {
      icon: <CheckCircle size={24} weight="fill" className="text-[#004CD2]" />,
      text: "Personalized tax planning strategies"
    },
    {
      icon: <CheckCircle size={24} weight="fill" className="text-[#004CD2]" />,
      text: "Expert financial compliance guidance"
    },
    {
      icon: <CheckCircle size={24} weight="fill" className="text-[#004CD2]" />,
      text: "Comprehensive business accounting services"
    },
    {
      icon: <CheckCircle size={24} weight="fill" className="text-[#004CD2]" />,
      text: "Dedicated support from certified professionals"
    }
  ];

  useEffect(() => {
    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Content animations
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
        }
      );

      // Benefits items staggered animation
      const benefitItems = benefitsRef.current.querySelectorAll('.benefit-item');
      gsap.fromTo(
        benefitItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // Floating icons animation
      const icons = document.querySelectorAll('.floating-icon');
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: "random(-10, 10)",
          duration: "random(2, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });

      // Button hover effect
      const ctaButton = document.querySelector('.cta-button');
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to('.cta-button', {
          scale: 1.05,
          backgroundColor: "#D1FF6A",
          duration: 0.3,
          ease: "power1.out"
        });
      });
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to('.cta-button', {
          scale: 1,
          backgroundColor: "#004CD2",
          duration: 0.3,
          ease: "power1.in"
        });
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section 
      className=" w-full bg-[#F5F5F5] flex items-center justify-cente lg:p-6"
      ref={sectionRef}
    >
      <div className="container mx-auto  bg-[#161616] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-12 relative overflow-hidden">
        {/* Floating icons for visual interest */}
        <div className="absolute top-12 left-16 floating-icon opacity-10">
          <Calculator size={64} color="#004CD2" />
        </div>
        <div className="absolute bottom-20 right-24 floating-icon opacity-10">
          <ChartPie size={80} color="#004CD2" />
        </div>
        <div className="absolute top-1/3 right-1/4 floating-icon opacity-10">
          <CheckCircle size={48} color="#004CD2" />
        </div>

        {/* CTA Content Grid */}
        <div className="grid grid-cols-1 gap-12 relative z-10">
          {/* Left Content */}
          <div ref={contentRef} className="text-white space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit">
              <Calculator weight="fill" color="#004CD2" />
              <p className="text-xs text-white uppercase font-semibold">
                FINANCIAL EXPERTISE
              </p>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-medium">
              Let's Optimize Your Financial Future
            </h2>
            
            <p className="text-xl text-white/80">
              Our team of certified accountants is ready to help you achieve financial clarity 
              and maximize your tax efficiency with tailored solutions.
            </p>
            
            {/* Benefits List */}
            <div ref={benefitsRef} className="space-y-4 mt-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex items-center gap-3">
                  {benefit.icon}
                  <p className="text-lg text-white/90">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
                type="submit" 
                className="cta-button bg-[#004CD2] text-[#161616] w-full py-4 rounded-xl font-bold text-lg hover:bg-[#C7FB78] transition-all duration-300"
              >
                Schedule Consultation
              </button>

          {/* Right Form */}
          {/* <div 
            ref={formRef} 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-medium text-white mb-6">
              Schedule a Free Consultation
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">First Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2]"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2]"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Services Needed</label>
                <select 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2] appearance-none"
                >
                  <option className="bg-[#161616]" value="">Select a service</option>
                  <option className="bg-[#161616]" value="tax-planning">Tax Planning & Preparation</option>
                  <option className="bg-[#161616]" value="accounting">Business Accounting</option>
                  <option className="bg-[#161616]" value="audit">Audit & Assurance</option>
                  <option className="bg-[#161616]" value="consulting">Financial Consulting</option>
                  <option className="bg-[#161616]" value="other">Other Services</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Message (Optional)</label>
                <textarea 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#004CD2] h-24 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cta-button bg-[#004CD2] text-[#161616] w-full py-4 rounded-xl font-bold text-lg hover:bg-[#C7FB78] transition-all duration-300"
              >
                Schedule Consultation
              </button>
              
              <p className="text-xs text-white/60 text-center">
                Your information is secure. We never share your data with third parties.
              </p>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};