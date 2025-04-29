'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Initial styles
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // Mouse move handler
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
        scale: 1.2,
      });
    };

    // Mouse down handler
    const mouseDown = () => {
      gsap.to(follower, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Mouse up handler
    const mouseUp = () => {
      gsap.to(follower, {
        scale: 1.2,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Mouse leave handler (hide cursor when leaving window)
    const mouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Mouse enter handler (show cursor when entering window)
    const mouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3,
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseenter', mouseEnter);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseenter', mouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-[#004CD2] rounded-full pointer-events-none mix-blend-difference z-50"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none opacity-80 z-50"
      />
    </>
  );
}