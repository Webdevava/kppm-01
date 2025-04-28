import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export const ContactHero = () => {
  // Refs for elements to animate
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Animate text
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );

      // Animate form fields
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-field'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: 'power2.out',
        }
      );

      // Animate submit button
      gsap.fromTo(
        formRef.current.querySelector('.submit-button'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1,
        }
      );
    }, heroRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section className="flex lg:p-12 min-h-screen" ref={heroRef}>
      <div className="mt-32 container mx-auto bg-gradient-to-b from-[#C7FB54] via-background to-background rounded-2xl flex flex-col justify-center overflow-hidden relative">
        <div className="p-12 space-y-4 flex flex-col items-center justify-center">
          {/* Trust badge */}
          <div className="bg-[#161616] rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit">
            <ShieldCheck weight="fill" color="#C7FB54" />
            <p className="text-xs text-white uppercase font-semibold">
              Expert CA Services Since 1995
            </p>
          </div>

          {/* Heading and subheading */}
          <div className="mb-28 mt-6" ref={textRef}>
            <h1 className="text-6xl text-center font-medium leading-none">
              Say Hello !
            </h1>
            <p className="text-center text-xl mt-3">
              Reach out for personalized accounting, tax, and advisory solutions <br />
              tailored to your financial goals.
            </p>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef} 
            className="bg-foreground backdrop-blur-sm rounded-2xl p-8 shadow-lg w-full max-w-3xl"
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
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54]"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54]"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54]"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Services Needed</label>
                <select 
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54] appearance-none"
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
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#C7FB54] h-24 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cta-button bg-[#C7FB54] text-[#161616] w-full py-4 rounded-xl font-bold text-lg hover:bg-[#C7FB78] transition-all duration-300"
              >
                Schedule Consultation
              </button>
              
              <p className="text-xs text-white/60 text-center">
                Your information is secure. We never share your data with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};