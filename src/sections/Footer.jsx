import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-stone-200/30 py-12 px-6 bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Logo and Credits */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
          <p className="text-sm font-space font-semibold text-[#2d2722] tracking-widest uppercase">
            Designed & Developed by Mathi
          </p>
          <p className="text-[10px] text-stone-500 font-mono flex items-center gap-1.5 justify-center sm:justify-start font-semibold">
            Built with React & Tailwind <Heart size={10} className="text-pink-500 fill-pink-500 animate-pulse" /> © {new Date().getFullYear()}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/mathisurya520-hash"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-pink-600 hover:border-pink-500/20 hover:bg-stone-50 transition-all duration-300 shadow-sm"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/bomathi-suryaprakasam-2514b9347"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-pink-600 hover:border-pink-500/20 hover:bg-stone-50 transition-all duration-300 shadow-sm"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 p-3 rounded-full border border-pink-500/20 text-pink-600 bg-white shadow-sm shadow-pink-100/20 hover:bg-pink-50/50 hover:border-pink-500/50 transition-all duration-300 transform cursor-pointer ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-75 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
