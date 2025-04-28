'use client'
import { Services } from '@/sections/contact/services'
import { FAQ } from '@/sections/landing/faq'
import { Footer } from '@/sections/landing/footer'
import { Navbar } from '@/sections/landing/navbar'
import React, { useEffect } from 'react'

const Landing = () => {
  useEffect(() => {
    // Select all anchor links with a hash (e.g., #services)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = e.currentTarget.getAttribute('href').substring(1); // Get the target ID (e.g., "services")
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // Add click event listeners to all anchor links
    anchorLinks.forEach((link) => {
      link.addEventListener('click', handleClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Services/>
      <FAQ id="faq" />
      <Footer id="footer" />
    </div>
  );
};

export default Landing;