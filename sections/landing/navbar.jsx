'use client';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X, CaretDown } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navLinksRef = useRef([]);
  const dropdownRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const serviceItemsRef = useRef([]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '#', label: 'Services', hasDropdown: true },
    { href: '/our-clients', label: 'Our Clients' },
    { href: '/grow-with-us', label: 'Grow With Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const serviceLinks = [
    { 
      href: '/services/audit-and-assurance', 
      label: 'Audit and Assurance',
      description: 'Comprehensive audit services for businesses of all sizes'
    },
    { 
      href: '/services/direct-tax-consultancy', 
      label: 'Direct Tax Consultancy',
      description: 'Strategic tax planning and compliance solutions'
    },
    { 
      href: '/services/indirect-tax-consultancy', 
      label: 'Indirect Tax Consultancy',
      description: 'GST, customs and other indirect tax advisory services'
    },
    { 
      href: '/services/management-advisory-services', 
      label: 'Management Advisory Services',
      description: 'Business improvement and strategic consulting'
    },
    { 
      href: '/services/corporate-project-financing', 
      label: 'Corporate Project Financing',
      description: 'Funding solutions and company secretarial work'
    },
    { 
      href: '/services/rbi-and-fema-compliances', 
      label: 'RBI & FEMA Compliances',
      description: 'Regulatory compliance and specific support services'
    },
    { 
      href: '/services/new-business-incubation', 
      label: 'New Business Incubation',
      description: 'Supporting startups and new ventures'
    },
    { 
      href: '/services/statutory-and-concurrent', 
      label: 'Statutory and Concurrent',
      description: 'Ongoing compliance and regulatory services'
    },
  ];

  // GSAP Animations
  useEffect(() => {
    // Reset refs
    navLinksRef.current = navLinksRef.current.slice(0, navLinks.length);
    mobileLinksRef.current = mobileLinksRef.current.slice(0, navLinks.length);
    serviceItemsRef.current = serviceItemsRef.current.slice(0, serviceLinks.length);

    // Magnetic hover effect for nav links
    navLinksRef.current.forEach((link, index) => {
      if (!link) return;
      
      const underline = link.querySelector('.underline');

      // Create a 'follow' animation for magnetic effect
      const xTo = gsap.quickTo(link, "x", {duration: 0.8, ease: "elastic.out(1, 0.3)"});
      const yTo = gsap.quickTo(link, "y", {duration: 0.8, ease: "elastic.out(1, 0.3)"});

      const handleMouseMove = (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        xTo(x * 0.3);
        yTo(y * 0.3);
        
        if (underline) {
          gsap.to(underline, {
            width: '100%',
            duration: 0.2
          });
        }
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
        
        if (underline) {
          gsap.to(underline, {
            width: '0%',
            duration: 0.2,
            ease: 'power3.out',
          });
        }
      };

      link.addEventListener('mousemove', handleMouseMove);
      link.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (link) {
          link.removeEventListener('mousemove', handleMouseMove);
          link.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    });

    // Services dropdown animation
    if (dropdownRef.current && activeDropdown === 'services') {
      // Show animation
      gsap.fromTo(dropdownRef.current, 
        { 
          opacity: 0, 
          y: 10,
          pointerEvents: 'none'
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3,
          pointerEvents: 'auto',
          ease: 'power2.out'
        }
      );

      // Stagger animation for service items
      gsap.fromTo(serviceItemsRef.current,
        { 
          opacity: 0, 
          y: 10 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.03,
          duration: 0.3,
          ease: 'power2.out'
        }
      );
    }

    // 3D tilt and pulse for button
    if (buttonRef.current) {
      const handleMouseMove = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rotateX = (centerY - mouseY) / centerY * 10; // Max 10deg tilt
        const rotateY = (mouseX - centerX) / centerX * 10;

        gsap.to(buttonRef.current, {
          rotateX,
          rotateY,
          scale: 1.05,
          backgroundColor: '#A3E635',
          boxShadow: '0 4px 15px rgba(163, 230, 53, 0.5)',
          duration: 0.2,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          backgroundColor: '#C7FB54',
          boxShadow: 'none',
          duration: 0.2,
          ease: 'power3.out',
        });
      };

      buttonRef.current.addEventListener('mousemove', handleMouseMove);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mousemove', handleMouseMove);
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }

    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: '0%',
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
        // Stagger mobile links
        gsap.from(mobileLinksRef.current, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.3,
          ease: 'power3.out',
          delay: 0.2,
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power3.in',
        });
      }
    }

    // Cleanup
    return () => {
      // Cleanup is handled in individual event listeners
    };
  }, [isMenuOpen, activeDropdown]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (type) => {
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className='w-full fixed flex items-center justify-center lg:p-12 z-50'>
      <nav className="w-full bg-white z-50 max-w-7xl mx-auto rounded-2xl ">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              KPPM<span className="text-[#C7FB54]">ca</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => link.hasDropdown ? handleMouseEnter('services') : null}
                onMouseLeave={handleMouseLeave}
              >
                {link.hasDropdown ? (
                  <div
                    ref={(el) => {
                      navLinksRef.current[index] = el;
                      servicesButtonRef.current = el;
                    }}
                    className="font-medium relative text-sm flex items-center gap-1 cursor-pointer"
                  >
                    {link.label}
                    {/* <CaretDown 
                      size={16} 
                      weight="bold" 
                      className={`transform transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} 
                    /> */}
                    <span className="underline absolute bottom-0 left-0 h-[2px] bg-[#C7FB54] w-0"></span>
                  </div>
                ) : (
                  <Link 
                    href={link.href}
                    ref={(el) => (navLinksRef.current[index] = el)}
                    className="font-medium relative text-sm"
                  >
                    {link.label}
                    <span className="underline absolute bottom-0 left-0 h-[2px] bg-[#C7FB54] w-0"></span>
                  </Link>
                )}

                {/* Services Dropdown */}
                {link.hasDropdown && activeDropdown === 'services' && (
                  <div 
                    ref={dropdownRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[700px] bg-white shadow-2xl rounded-xl overflow-hidden z-50"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Our Services</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {serviceLinks.map((service, serviceIndex) => (
                          <Link 
                            key={serviceIndex}
                            href={service.href}
                            ref={(el) => (serviceItemsRef.current[serviceIndex] = el)}
                            className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div>
                              <div className="font-medium text-gray-800 group-hover:text-[#161616] mb-1 group-hover:underline">{service.label}</div>
                              <p className="text-sm text-gray-500">{service.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              ref={buttonRef}
              className="bg-[#C7FB54] text-[#161616] font-semibold px-6 py-3 rounded-2xl transform perspective-800"
            >
              Get Started
            </button>
          </div>

          {/* Hamburger Icon (Visible on lg and below) */}
          <div className="lg:hidden">
            <button
              ref={hamburgerRef}
              onClick={toggleMenu}
              className="focus:outline-none z-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <List size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-screen w-4/5 bg-[#161616] p-6 z-50 shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="focus:outline-none bg-[#C7FB54] p-3 rounded-full z-[100] mb-6"
            >
              <X size={24} color="#161616" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <div key={index} className="py-2">
                {link.hasDropdown ? (
                  <>
                    <button
                      ref={(el) => (mobileLinksRef.current[index] = el)}
                      onClick={(e) => {
                        e.preventDefault();
                        const subMenu = e.currentTarget.nextElementSibling;
                        if (subMenu.style.maxHeight) {
                          subMenu.style.maxHeight = null;
                        } else {
                          subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                        }
                      }}
                      className="text-white text-xl font-medium flex items-center justify-between w-full"
                    >
                      {link.label}
                      <CaretDown size={16} weight="bold" />
                    </button>
                    <div className="max-h-0 overflow-hidden transition-all duration-300 pl-4 mt-2">
                      {serviceLinks.map((service, serviceIndex) => (
                        <Link
                          key={serviceIndex}
                          href={service.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-3 text-gray-300 hover:text-white transition-colors"
                        >
                          <div className="font-medium">{service.label}</div>
                          <div className="text-sm text-gray-400">{service.description}</div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    ref={(el) => (mobileLinksRef.current[index] = el)}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-xl font-medium block"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              className="bg-[#C7FB54] text-[#161616] font-semibold px-6 py-3 rounded-2xl w-fit mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};