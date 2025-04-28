import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export const BlogsPage = () => {
  // Refs for elements to animate
  const heroRef = useRef(null);
  const textRef = useRef(null);
  // const formRef = useRef(null);
    const sectionRef = useRef(null);
    // const headerRef = useRef(null);
    const blogRefs = useRef([]);
    const descRefs = useRef([]);
    const tagsRefs = useRef([]);
  
    const blogPosts = [
      {
        title: "Empowering Leaders to Do Good Every Day",
        description:
          "Discover how our latest project with Givebacks streamlined their operations and boosted community engagement through innovative digital solutions.",
        image: "/placeholder.svg",
        tags: ["WebFlow", "Custom Code", "Givebacks"],
        link: "/blogs",
      },
      {
        title: "The Future of Web Development in 2025",
        description:
          "Explore the trends shaping web development this year, from AI-driven design to performance optimization and beyond.",
        image: "/placeholder.svg",
        tags: ["Trends", "Web Development", "AI"],
        link: "/blogs",
      },
    ];
  
    useEffect(() => {
      // Initialize refs for description divs and tags
      descRefs.current = descRefs.current.slice(0, blogPosts.length);
      tagsRefs.current = tagsRefs.current.slice(0, blogPosts.length);
  
      // GSAP context for animations
      const ctx = gsap.context(() => {
        // Animate header
        // gsap.fromTo(
        //   headerRef.current.children,
        //   { opacity: 0, y: 50 },
        //   {
        //     opacity: 1,
        //     y: 0,
        //     duration: 1,
        //     stagger: 0.2,
        //     ease: "power3.out",
        //   }
        // );
  
        // Animate blog cards
        gsap.fromTo(
          blogRefs.current,
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
  
        // Hover animations for larger screens (non-touch devices)
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
          blogRefs.current.forEach((card, index) => {
            const desc = descRefs.current[index];
            const tags = tagsRefs.current[index];
            card.addEventListener("mouseenter", () => {
              gsap.to(desc, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(card.querySelector(".image"), {
                scale: 1.05,
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(tags.querySelectorAll(".tag"), {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.out",
              });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(desc, {
                y: "100%",
                opacity: 0,
                duration: 0.5,
                ease: "power3.in",
              });
              gsap.to(card.querySelector(".image"), {
                scale: 1,
                duration: 0.5,
                ease: "power3.in",
              });
              gsap.to(tags.querySelectorAll(".tag"), {
                opacity: 0,
                y: 10,
                duration: 0.4,
                stagger: 0.1,
                ease: "power3.in",
              });
            });
          });
        }
      }, sectionRef);
  
      return () => ctx.revert(); // Cleanup animations on unmount
    }, []);

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
      // gsap.fromTo(
      //   formRef.current.querySelectorAll('.form-field'),
      //   { opacity: 0, y: 30 },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 0.8,
      //     stagger: 0.15,
      //     delay: 0.5,
      //     ease: 'power2.out',
      //   }
      // );

      // Animate submit button
      // gsap.fromTo(
      //   formRef.current.querySelector('.submit-button'),
      //   { opacity: 0, scale: 0.8 },
      //   {
      //     opacity: 1,
      //     scale: 1,
      //     duration: 0.8,
      //     ease: 'back.out(1.7)',
      //     delay: 1,
      //   }
      // );
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
            Blog & Insights
            </h1>
            <p className="text-center text-xl mt-3 max-w-2xl">
            Tips, ideas, and lessons on web design, development, and everything that goes into building better, more effective websites.
            </p>
          </div>

          <div className="container mx-auto flex flex-col sm:flex-row gap-6 items-center justify-evenly">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              ref={(el) => (blogRefs.current[index] = el)}
              className="relative w-full  h-[400px] rounded-2xl overflow-hidden shadow-md group"
            >
              {/* Image */}
              <div className="image w-full h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              {/* Tags */}
              <div
                ref={(el) => (tagsRefs.current[index] = el)}
                className="absolute top-4 left-4 flex gap-2 sm:group-hover:flex sm:opacity-0 sm:group-hover:opacity-100"
              >
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="tag bg-white text-[#161616] text-xs font-semibold px-3 py-1 rounded-full sm:opacity-0 sm:translate-y-10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description Div */}
              <div
                ref={(el) => (descRefs.current[index] = el)}
                className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-sm p-6 sm:translate-y-full sm:opacity-0 sm:group-hover:opacity-100"
              >
                <h3 className="text-xl font-medium text-[#161616] mb-2">
                  {post.title}
                </h3>
                <p className="text-base text-gray-600 line-clamp-2 mb-4">
                  {post.description}...
                </p>
                <a
                  href={post.link}
                  className="inline-flex items-center text-[#C7FB54] font-semibold hover:text-[#A3E635] transition-colors"
                >
                  Read Full Article
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};