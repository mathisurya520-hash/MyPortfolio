import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for sticky shadow/border adjustments
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to update active navigation item based on scroll position
  useEffect(() => {
    const observers = [];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section occupies the center
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-md border-b border-black/5 py-4 shadow-sm shadow-stone-200/20'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl font-space font-bold tracking-widest text-[#2d2722] hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          MATHI
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 glass-panel px-1.5 py-1 rounded-full border border-black/5 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-pink-600 bg-pink-500/5 border border-pink-500/10 shadow-[0_1px_2px_rgba(236,72,153,0.05)] font-semibold'
                    : 'text-stone-500 hover:text-stone-900 border border-transparent'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Connect Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-teal-500/20 hover:border-teal-500/40 text-sm font-medium bg-teal-500/5 hover:bg-teal-500/10 text-teal-700 transition-all duration-300 shadow-[0_0_15px_rgba(13,148,136,0.03)] font-semibold"
          >
            Connect
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-stone-600 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 w-full glass-panel border-b border-black/5 transition-all duration-300 md:hidden overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4 p-6 bg-white/95 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-lg font-medium py-1 border-b border-stone-100 transition-all ${
                  isActive ? 'text-pink-600 pl-2 border-pink-500/30 font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-700 font-medium text-center"
          >
            Connect
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
