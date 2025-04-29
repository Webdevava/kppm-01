import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LinkedinLogo, Envelope } from "@phosphor-icons/react/dist/ssr";

const TeamCard = ({ name, position, description, image, linkedin, email }) => {
  const cardRef = useRef(null);
  const descRef = useRef(null);
  const socialsRef = useRef(null);
  const namePositionRef = useRef(null);

  useEffect(() => {
    // GSAP context for animations
    const ctx = gsap.context(() => {
      // Hover animations for non-touch devices
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (!isTouchDevice && cardRef.current) {
        const card = cardRef.current;
        const desc = descRef.current;
        const socials = socialsRef.current.querySelectorAll(".social-link");
        const namePosition = namePositionRef.current;

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
          gsap.to(socials, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
          });
          gsap.to(namePosition, {
            opacity: 0,
            y: 10,
            duration: 0.4,
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
          gsap.to(socials, {
            opacity: 0,
            y: 10,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.in",
          });
          gsap.to(namePosition, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        });
      }
    }, cardRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={cardRef}
        className="relative w-full max-w-xl h-[400px] rounded-2xl overflow-hidden shadow-md group"
      >
        {/* Image Container */}
        <div className="image w-full h-full relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
          />

          {/* Social Links (styled like blog tags, shown on hover) */}
          <div
            ref={socialsRef}
            className="absolute top-4 left-4 flex gap-2 sm:group-hover:flex sm:opacity-0 sm:group-hover:opacity-100"
          >
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link bg-white text-[#161616] text-xs font-semibold px-3 py-1 rounded-full sm:opacity-0 sm:translate-y-10 flex items-center gap-1"
              >
                <LinkedinLogo size={16} weight="fill" />
                LinkedIn
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="social-link bg-white text-[#161616] text-xs font-semibold px-3 py-1 rounded-full sm:opacity-0 sm:translate-y-10 flex items-center gap-1"
              >
                <Envelope size={16} weight="fill" />
                Email
              </a>
            )}
          </div>

          {/* Description (shown on hover) */}
          <div
            ref={descRef}
            className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-sm p-6 translate-y-full opacity-0 group-hover:opacity-100"
          >
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Name and Position (below the card, hidden on hover) */}
      <div  className="mt-4 text-center">
        <h3 className="text-lg font-medium text-[#161616]">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
  );
};

export default TeamCard;