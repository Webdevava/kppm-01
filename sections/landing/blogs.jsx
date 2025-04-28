import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const Blogs = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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
    {
      title: "Designing for Impact: UX/UI Case Study",
      description:
        "A deep dive into our UX/UI process for a nonprofit, resulting in a 40% increase in user engagement.",
      image: "/placeholder.svg",
      tags: ["UX/UI", "Nonprofit", "Case Study"],
      link: "/blogs",
    },
    {
      title: "Scaling Your Business with Digital Marketing",
      description:
        "Learn how strategic digital marketing can drive growth, with insights from our recent campaigns.",
      image: "/placeholder.svg",
      tags: ["Digital Marketing", "Growth", "Campaigns"],
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

  return (
    <section
      className="min-h-screen bg-[#F5F5F5] flex items-center justify-center lg:p-12"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-7xl bg-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8"
          ref={headerRef}
        >
          <h2 className="text-5xl md:text-6xl font-medium max-w-xl text-white">
            Latest Blog Posts
          </h2>
          <div>
            <p className="text-xl md:text-2xl max-w-md mb-2 text-white">
              Stay updated with our insights, tips, and success stories.
            </p>
            <a
              href="/blogs"
              className="inline-block bg-[#C7FB54] text-sm rounded-2xl px-8 py-3 font-bold hover:bg-[#C7FB78] transition-colors"
            >
              View All Blogs
            </a>
          </div>
        </div>

        {/* Blog Cards */}
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
    </section>
  );
};