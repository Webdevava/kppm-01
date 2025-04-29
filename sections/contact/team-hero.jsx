import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import TeamCard from '@/components/team-card';

export const TeamHero = () => {
  // Refs for elements to animate
  const heroRef = useRef(null);
  const textRef = useRef(null);


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
    }, heroRef);

    return () => ctx.revert(); // Cleanup animations on unmount
  }, []);

  return (
    <section className="flex lg:p-12 min-h-screen" ref={heroRef}>
      <div className="mt-32 container mx-auto bg-gradient-to-b from-[#004CD2] via-background to-background rounded-2xl flex flex-col justify-center overflow-hidden relative">
        <div className="p-12 space-y-4 flex flex-col items-center justify-center">
          {/* Trust badge */}
          <div className="bg-[#161616] rounded-2xl px-5 py-3 flex items-center justify-center gap-3 w-fit">
            <ShieldCheck weight="fill" color="#004CD2" />
            <p className="text-xs text-white uppercase font-semibold">
              Expert CA Services Since 1995
            </p>
          </div>

          {/* Heading and subheading */}
          <div className="mb-12 mt-6" ref={textRef}>
            <h1 className="text-6xl text-center font-medium leading-none">
              Meet Our Expert Team
            </h1>
            <p className="text-center text-xl mt-3">
              Our dedicated professionals bring decades of experience in accounting, tax, and advisory <br />
              to deliver tailored solutions for your success.
            </p>
          </div>

          {/* Team Members */}
          {/* <div 
            ref={teamRef} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl mt-32"
          >
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card flex justify-center">
                <TeamCard
                  name={member.name}
                  position={member.position}
                  description={member.description}
                  image={member.image}
                  linkedin={member.linkedin}
                  email={member.email}
                />
              </div>
            ))}
          </div> */}

          <img src="/assets/team.jpeg" alt="team" className='w-full max-w-4xl h-96 rounded-4xl mix-blend-difference'/>
        </div>
      </div>
    </section>
  );
};