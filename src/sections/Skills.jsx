import React from 'react';
import { Layout, Server, BarChart3, CheckCircle2 } from 'lucide-react';

const skillsData = [
  {
    category: 'Frontend Development',
    icon: Layout,
    iconColor: 'text-pink-600',
    barColor: 'bg-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 90 },
    ]
  },
  {
    category: 'Backend & Database',
    icon: Server,
    iconColor: 'text-teal-600',
    barColor: 'bg-teal-600',
    glowColor: 'rgba(13, 148, 136, 0.4)',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'SQL', level: 80 },
      { name: 'MySQL', level: 82 },
      { name: 'MERN Stack', level: 85 },
    ]
  },
  {
    category: 'Design & Analytics',
    icon: BarChart3,
    iconColor: 'text-pink-600',
    barColor: 'bg-stone-700',
    glowColor: 'rgba(45, 45, 45, 0.2)',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Tableau', level: 75 },
      { name: 'Power BI', level: 70 },
      { name: 'GitHub', level: 90 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative border-t border-stone-200/30 bg-[#faf7f2]">
      
      {/* Background soft pink/teal glows */}
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-teal-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-space uppercase tracking-widest text-teal-600 font-bold">02 / Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-space font-bold text-[#2d2722] mt-2">Technical Skillset</h2>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((categoryObj, idx) => {
            const Icon = categoryObj.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-8 rounded-3xl border border-stone-200/40 flex flex-col justify-between transition-all duration-300 glow-card-mint shadow-sm"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-8">
                    <div className={`p-3 rounded-2xl bg-[#faf7f2] ${categoryObj.iconColor} border border-stone-200/50 shadow-sm`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-space font-bold text-[#2d2722] tracking-wide">{categoryObj.category}</h3>
                  </div>

                  {/* Skills Progress Lines */}
                  <div className="space-y-6">
                    {categoryObj.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-2 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-poppins font-medium text-stone-600">{skill.name}</span>
                          <span className="font-space font-bold text-[#2d2722]">{skill.level}%</span>
                        </div>
                        {/* Progress Bar Track */}
                        <div className="w-full h-1.5 bg-stone-200/50 rounded-full overflow-hidden border border-stone-200/20">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${categoryObj.barColor}`}
                            style={{ 
                              width: `${skill.level}%`,
                              boxShadow: `0 0 6px ${categoryObj.glowColor}`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer details */}
                <div className="border-t border-stone-100 pt-6 mt-8 flex items-center space-x-2 text-[10px] text-stone-500 font-mono">
                  <CheckCircle2 size={12} className={categoryObj.iconColor} />
                  <span>SYSTEM_CHECK_VERIFIED_100%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
