import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export const Services = () => {
  // Services data
  const services = [
    {
      href: '/services/audit-and-assurance',
      label: 'Audit and Assurance',
      description: 'Comprehensive audit services for businesses of all sizes',
    },
    {
      href: '/services/direct-tax-consultancy',
      label: 'Direct Tax Consultancy',
      description: 'Strategic tax planning and compliance solutions',
    },
    {
      href: '/services/indirect-tax-consultancy',
      label: 'Indirect Tax Consultancy',
      description: 'GST, customs, and other indirect tax advisory services',
    },
    {
      href: '/services/management-advisory-services',
      label: 'Management Advisory Services',
      description: 'Business improvement and strategic consulting',
    },
    {
      href: '/services/corporate-project-financing',
      label: 'Corporate Project Financing',
      description: 'Funding solutions and company secretarial work',
    },
    {
      href: '/services/rbi-and-fema-compliances',
      label: 'RBI & FEMA Compliances',
      description: 'Regulatory compliance and specific support services',
    },
    {
      href: '/services/new-business-incubation',
      label: 'New Business Incubation',
      description: 'Supporting startups and new ventures',
    },
    {
      href: '/services/statutory-and-concurrent',
      label: 'Statutory and Concurrent',
      description: 'Ongoing compliance and regulatory services',
    },
  ];

  // Refs for elements to animate
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

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

      // Animate service cards
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.service-card'),
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
    }, heroRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section className="flex lg:p-12" ref={heroRef}>
      <div className="mt-32 container mx-auto bg-gradient-to-b from-[#004CD2] via-background to-background rounded-2xl flex flex-col justify-center overflow-hidden relative">
        <div className="p-12 space-y-6 flex flex-col items-center justify-center">
          {/* Trust badge */}
          <div className="bg-[#161616] rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit">
            <ShieldCheck weight="fill" color="#004CD2" />
            <p className="text-xs text-white uppercase font-semibold">
              Expert CA Services Since 1995
            </p>
          </div>

          {/* Heading and subheading */}
          <div className="mb-28 mt-6 text-center" ref={textRef}>
            <h1 className="text-5xl md:text-6xl font-medium leading-tight">
              Comprehensive Financial Solutions
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">
              Explore our tailored services to address your accounting, tax, compliance, and business growth needs.
            </p>
          </div>

          {/* Services Grid */}
          <div ref={cardsRef} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="service-card bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#004CD2] border border-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#161616] mb-2">
                  {service.label}
                </h3>
                <p className="text-[#161616]/80 text-sm">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};