import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const AllArticles = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const blogRefs = useRef([]);
  const descRefs = useRef([]);
  const tagsRefs = useRef([]);
  const [filter, setFilter] = useState("All");

  const blogPosts = [
    {
      title: "Empowering Leaders to Do Good Every Day",
      description:
        "Discover how our latest project with Givebacks streamlined their operations and boosted community engagement through innovative digital solutions.",
      image: "/placeholder.svg",
      tags: ["Tax", "Compliance", "Finance"],
      category: "Technology",
      link: "/blogs",
    },
    {
      title: "Navigating Tax Compliance in 2025",
      description:
        "A comprehensive guide to understanding the latest tax regulations and ensuring compliance for businesses and individuals.",
      image: "/placeholder.svg",
      tags: ["Tax", "Compliance", "Finance"],
      category: "Tax",
      link: "/blogs",
    },
    {
      title: "How Audits Strengthen Business Trust",
      description:
        "Learn how our audit services help businesses maintain transparency and build stakeholder confidence.",
      image: "/placeholder.svg",
      tags: ["Audit", "Finance", "Transparency"],
      category: "Audit",
      link: "/blogs",
    },
    {
      title: "Financial Planning for a Secure Future",
      description:
        "Explore strategies for effective financial planning to achieve long-term goals for individuals and businesses.",
      image: "/placeholder.svg",
      tags: ["Financial Planning", "Finance", "Strategy"],
      category: "Financial Planning",
      link: "/blogs",
    },
    {
      title: "GST Updates: What Businesses Need to Know",
      description:
        "Stay updated on the latest GST changes and how they impact your business operations and compliance.",
      image: "/placeholder.svg",
      tags: ["GST", "Tax", "Business"],
      category: "Tax",
      link: "/blogs",
    },
    {
      title: "The Role of Forensic Audits in Fraud Prevention",
      description:
        "A deep dive into how forensic audits can protect your business from financial fraud and misconduct.",
      image: "/placeholder.svg",
      tags: ["Audit", "Fraud Prevention", "Finance"],
      category: "Audit",
      link: "/blogs",
    },
    {
      title: "Maximizing Wealth with Tax-Efficient Investments",
      description:
        "Discover tax-efficient investment strategies to grow your wealth while minimizing tax liabilities.",
      image: "/placeholder.svg",
      tags: ["Financial Planning", "Tax", "Investments"],
      category: "Financial Planning",
      link: "/blogs",
    },
  ];

  // Filter blog posts based on the selected category
  const filteredPosts = filter === "All" ? blogPosts : blogPosts.filter(post => post.category === filter);

  useEffect(() => {
    // Initialize refs for description divs and tags
    descRefs.current = descRefs.current.slice(0, filteredPosts.length);
    tagsRefs.current = tagsRefs.current.slice(0, filteredPosts.length);
    blogRefs.current = blogRefs.current.slice(0, filteredPosts.length);

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
  }, [filteredPosts]);

  return (
    <section
      className="min-h-screen  flex items-center justify-center lg:p-12"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-7xl p-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8"
          ref={headerRef}
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-medium max-w-2xl">
              Check out all articles
            </h2>
            {/* Filter Buttons */}
            <div className="flex gap-4 mt-4">
              {["All", "Tax", "Audit", "Financial Planning"].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                    filter === category
                      ? "bg-[#C7FB54] text-[#161616]"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="container mx-auto flex flex-col sm:flex-row gap-6 items-center justify-evenly flex-wrap">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              ref={(el) => (blogRefs.current[index] = el)}
              className="relative w-full sm:w-[45%] h-[400px] rounded-2xl overflow-hidden shadow-md group"
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