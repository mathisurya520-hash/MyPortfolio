import React from 'react';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

const experiencesData = [
  {
    company: 'Prodigy Infotech',
    role: 'Web Development Intern',
    duration: '1 Month',
    tasks: [
      'Developed 5 active full-fledged web applications.',
      'Constructed highly responsive layouts using HTML5, CSS3, and JavaScript.',
      'Refined code efficiency to meet quick loading performance targets.'
    ],
    skillsLearned: ['Web Dev', 'Responsive UI', 'Performance Optimization'],
    color: 'border-stone-200/40'
  },
  {
    company: 'Macvel Software Solution Pvt Ltd',
    role: 'MERN Stack Intern',
    duration: '15 Days',
    tasks: [
      'Integrated MongoDB schemas, Node.js controllers, and React UI components.',
      'Configured secure Express.js routes for data transfer mechanisms.',
      'Acquired experience in scalable MERN application lifecycles.'
    ],
    skillsLearned: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    color: 'border-stone-200/40'
  },
  {
    company: 'Deloitte',
    role: 'Data Analytics Job Simulation',
    duration: 'Simulation Task',
    tasks: [
      'Completed virtual analytics tasks matching real-world consulting scenarios.',
      'Processed databases using advanced query methods.',
      'Built dashboards and data visualization systems using reporting standards.'
    ],
    skillsLearned: ['Data Analytics', 'Visualization', 'Tableau', 'Reporting'],
    color: 'border-stone-200/40'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative border-t border-stone-200/30 bg-[#faf7f2]">
      
      {/* Background ambient pink glow */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-pink-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:text-center md:items-center md:flex md:flex-col">
          <span className="text-xs font-space uppercase tracking-widest text-teal-600 font-bold">04 / Journey</span>
          <h2 className="text-3xl md:text-5xl font-space font-bold text-[#2d2722] mt-2">Work Experience</h2>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-stone-200 ml-4 md:ml-32 py-4 space-y-12">
          
          {experiencesData.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              
              {/* Timeline Glowing Node */}
              <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.25)] transition-all duration-300 group-hover:scale-125 group-hover:bg-pink-500" />

              {/* Side Date Tag (Desktop Only) */}
              <div className="absolute right-full mr-8 top-1 hidden md:flex flex-col items-end w-24">
                <span className="text-xs font-bold font-space text-stone-800">{exp.duration}</span>
                <span className="text-[10px] text-stone-400 font-mono mt-1 uppercase font-semibold">Duration</span>
              </div>

              {/* Experience Card */}
              <div className={`glass-card p-6 md:p-8 rounded-3xl border transition-all duration-300 text-left shadow-sm ${exp.color}`}>
                
                {/* Mobile Duration label (Tablet/Mobile Only) */}
                <div className="flex items-center space-x-2 text-xs text-stone-500 font-semibold mb-3 md:hidden">
                  <Calendar size={12} className="text-pink-500" />
                  <span>{exp.duration}</span>
                </div>

                {/* Company & Role */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-space font-bold text-[#2d2722] tracking-wide">{exp.role}</h3>
                    <span className="text-sm font-bold text-pink-600 mt-1 block">{exp.company}</span>
                  </div>
                  
                  <div className="p-2 bg-white rounded-lg border border-stone-200/50 text-stone-400 shadow-sm">
                    <Briefcase size={16} />
                  </div>
                </div>

                {/* Tasks Bullet List */}
                <ul className="space-y-3 mb-6">
                  {exp.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start text-xs text-stone-600 leading-relaxed font-poppins font-light">
                      <ChevronRight size={14} className="text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills learned tags */}
                <div className="border-t border-stone-100 pt-4 flex flex-wrap gap-2">
                  {exp.skillsLearned.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="text-[9px] font-mono font-bold text-teal-700 px-2 py-0.5 rounded-md bg-teal-50 border border-teal-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;
