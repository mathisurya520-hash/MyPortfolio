import React from 'react';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import CursorGlow from './components/CursorGlow';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-[#faf7f2] text-[#2d2722] overflow-x-hidden selection:bg-pink-100 selection:text-pink-800">
      {/* Background Interactive Particles */}
      <ParticleCanvas />
      
      {/* Radial Hover Spotlight Gradient */}
      <CursorGlow />

      {/* Header Sticky Navigation */}
      <Navbar />

      {/* Main Content wrapper */}
      <main className="relative w-full z-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer copyright and actions */}
      <Footer />
    </div>
  );
}

export default App;
