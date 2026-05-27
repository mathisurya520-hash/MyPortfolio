import React, { useEffect, useState } from 'react';
import { Award, Layers, Terminal, Cpu } from 'lucide-react';
import heroImg from '../assets/hero.jpg';

const statsData = [
  { label: 'Completed Projects', count: 6, suffix: '+', icon: Layers, color: 'text-pink-600' },
  { label: 'Internships Done', count: 3, suffix: '', icon: Award, color: 'text-teal-600' },
  { label: 'Multiple Deployments', count: 12, suffix: '+', icon: Terminal, color: 'text-pink-600' },
  { label: 'AI Integrated Projects', count: 4, suffix: '', icon: Cpu, color: 'text-teal-600' },
];

const StatCard = ({ label, count, suffix, icon: Icon, color }) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5s animation
    const increment = Math.ceil(count / (duration / 16)); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= count) {
        setCurrentCount(count);
        clearInterval(timer);
      } else {
        setCurrentCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="glass-card p-5 rounded-2xl border border-stone-200/40 flex flex-col items-start text-left relative overflow-hidden group">
      {/* Background flare */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-pink-100/20 group-hover:bg-pink-100/40 blur-xl transition-all duration-500" />
      
      <div className={`p-2.5 rounded-xl bg-white border border-stone-200/50 ${color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <Icon size={20} />
      </div>

      <span className="text-3xl font-space font-bold text-[#2d2722] tracking-tight">
        {currentCount}
        {suffix}
      </span>
      <span className="text-xs text-stone-500 font-poppins mt-2 tracking-wide font-medium">{label}</span>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden border-t border-stone-200/30">
      {/* Decorative Warm Accent Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="text-xs font-space uppercase tracking-widest text-pink-600 font-bold">01 / Profile</span>
          <h2 className="text-3xl md:text-5xl font-space font-bold text-[#2d2722] mt-2">About Myself</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Portrait Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] glass-card rounded-3xl p-2 border border-stone-200/50 flex items-center justify-center shadow-lg overflow-hidden group">
              {/* Vibrant Original photo */}
              <img 
                src={heroImg} 
                alt="Bomathi S (Mathi)" 
                className="w-full h-full object-cover rounded-[22px] group-hover:scale-102 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Technical details overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/5 shadow-sm">
                <span>SECURE_ID: MATHI_BOMATHI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Side: Text Bio and Stats Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-space font-bold text-[#2d2722] tracking-wide">
                Bomathi S, Computer Science Engineering Student
              </h3>
              <p className="text-stone-600 font-poppins leading-relaxed font-light">
                I’m Bomathi S, a Computer Science Engineering student at <strong className="text-teal-700 font-semibold">Sri Shakthi Institute of Engineering and Technology</strong> with strong interests in Full Stack Development, Data Analytics, UI/UX Design, and futuristic web technologies.
              </p>
              <p className="text-stone-600 font-poppins leading-relaxed font-light">
                I enjoy building scalable, interactive, and visually premium web applications with modern user experiences.
              </p>
              <p className="text-stone-600 font-poppins leading-relaxed font-light">
                My goal is to become a skilled Full Stack Developer specializing in scalable systems and database technologies.
              </p>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statsData.map((stat, index) => (
                <StatCard
                  key={index}
                  label={stat.label}
                  count={stat.count}
                  suffix={stat.suffix}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
