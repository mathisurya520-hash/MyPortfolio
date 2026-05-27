import React, { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update global CSS variables for card hover highlights
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Interactive mouse radial spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.05) 0%, rgba(13, 148, 136, 0.03) 50%, transparent 100%)`,
        }}
      />

      {/* Decorative persistent ambient gradient glows in background */}
      <div className="fixed -top-40 -left-40 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-pink-300/10 blur-[100px] md:blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="fixed top-1/2 -right-40 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-teal-300/8 blur-[100px] md:blur-[130px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-4s' }} />
      <div className="fixed -bottom-40 left-1/3 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-pink-200/8 blur-[100px] md:blur-[130px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-2s' }} />
    </>
  );
};

export default CursorGlow;
