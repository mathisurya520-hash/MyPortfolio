import React, { useState, useEffect } from 'react';
import { ArrowDown, FileText, ArrowRight, Code, Database, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import heroImg from '../assets/hero.jpg';

const roles = [
  'Full Stack Developer',
  'Data Analyst',
  'UI Designer',
  'MERN Stack Developer',
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typing effect loop
  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentRole) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      const navbarHeight = 80;
      window.scrollTo({
        top: projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-20">
        
        {/* Left Side: Text and CTAs */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center space-x-2 border border-pink-200 bg-pink-500/5 px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs text-pink-700 font-semibold tracking-wide uppercase">Open to Opportunities</span>
          </div>

          {/* Main Titles */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-space font-bold tracking-tight text-[#2d2722] leading-none">
              Hi, I’m <span className="text-gradient-purple-teal">Mathi</span>
            </h1>
            
            {/* Dynamic Typing Subtitle */}
            <div className="h-10 md:h-12 flex items-center">
              <p className="text-2xl md:text-3xl font-space font-medium text-stone-800">
                I am a <span className="text-teal-600 font-bold border-r-2 border-teal-600 animate-pulse pr-1">{displayText}</span>
              </p>
            </div>
            
            <p className="text-[#5c544d] text-lg md:text-xl font-poppins max-w-xl leading-relaxed font-light">
              Turning ideas into futuristic digital experiences. Specializing in high-end MERN applications, database design, and premium user experiences.
            </p>
          </div>

          {/* CTA Buttons & Social Integrations */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1c1917] text-white font-semibold hover:bg-stone-800 transition-all duration-300 shadow-md group"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Bomathi S Resume...");
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-medium transition-all duration-300 shadow-sm"
            >
              <FileText size={16} />
              Download Resume
            </a>

            <div className="flex items-center space-x-3 ml-2">
              <a
                href="https://github.com/mathisurya520-hash"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full border border-stone-200 bg-white text-stone-500 hover:text-pink-600 hover:border-pink-500/30 transition-all duration-300"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/bomathi-suryaprakasam-2514b9347"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full border border-stone-200 bg-white text-stone-500 hover:text-pink-600 hover:border-pink-500/30 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Futuristic Portrait Frame & Floating Cards */}
        <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
          
          {/* Ambient Grayscale Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-400/5 blur-[80px] pointer-events-none z-0" />
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-400/5 blur-[80px] pointer-events-none z-0" />

          {/* Container Card */}
          <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white to-transparent border border-stone-200/50 z-10 flex flex-col justify-end shadow-xl animate-float overflow-hidden">
            
            {/* Original Portrait Image (No Grayscale, fully vibrant!) */}
            <img 
              src={heroImg} 
              alt="Bomathi S (Mathi)" 
              className="absolute inset-0 w-full h-full object-cover rounded-[22px] hover:scale-102 transition-all duration-700"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10 pointer-events-none" />

            {/* Header window controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-200/40">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
              </div>
              <span className="text-[9px] font-space tracking-widest text-stone-600 uppercase font-semibold">profile.sys</span>
            </div>

            {/* Overlaid glass info footer */}
            <div className="relative z-20 p-4 bg-white/90 backdrop-blur-md border border-stone-200/50 rounded-2xl m-4 flex flex-col space-y-1 text-left shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-pink-700 font-mono tracking-wider font-bold">BOMATHI S (MATHI)</span>
                <span className="text-[8px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-mono uppercase tracking-wider font-semibold">CSE_ENG</span>
              </div>
              <p className="text-[11px] text-stone-600 font-poppins font-medium">
                Sri Shakthi Institute of Engineering and Technology
              </p>
            </div>

            {/* Floating Mini cards */}
            <div className="absolute -left-6 top-1/4 glass-panel border border-pink-100 p-3 rounded-2xl flex items-center gap-3 shadow-md max-w-[150px] transform -rotate-3 hover:rotate-0 transition-transform z-20">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-600">
                <Sparkles size={16} />
              </div>
              <div className="text-left">
                <span className="text-[9px] text-pink-800 uppercase tracking-widest block font-bold">MERN stack</span>
                <span className="text-xs text-stone-800 font-bold">Specialist</span>
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/3 glass-panel border border-teal-100 p-3 rounded-2xl flex items-center gap-3 shadow-md max-w-[150px] transform rotate-3 hover:rotate-0 transition-transform z-20">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                <Database size={16} />
              </div>
              <div className="text-left">
                <span className="text-[9px] text-teal-800 uppercase tracking-widest block font-bold">Database</span>
                <span className="text-xs text-stone-800 font-bold">Management</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-space font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border border-stone-200 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-2 bg-pink-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
