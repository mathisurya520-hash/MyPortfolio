import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 relative border-t border-stone-200/30 bg-[#faf7f2]">
      {/* Ambient backgrounds */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/2 w-80 h-80 rounded-full bg-teal-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-space uppercase tracking-widest text-pink-600 font-bold">05 / Connect</span>
          <h2 className="text-3xl md:text-5xl font-space font-bold text-[#2d2722] mt-2">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-space font-bold text-[#2d2722] tracking-wide">Let’s engineer something incredible.</h3>
              <p className="text-stone-500 font-poppins text-sm leading-relaxed max-w-sm font-light">
                Have an idea, project, or full-time development position? Send a message and let's start negotiating parameters.
              </p>
            </div>

            {/* Info list */}
            <div className="space-y-4">
              
              {/* Email */}
              <a 
                href="mailto:mathisurya520@gmail.com"
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-stone-200/40 hover:border-pink-500/30 text-left group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-600 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block font-semibold">Email Address</span>
                  <span className="text-sm font-bold text-stone-800">mathisurya520@gmail.com</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-stone-200/40 text-left shadow-sm">
                <div className="p-3 rounded-xl bg-stone-100 border border-stone-200/50 text-stone-700">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block font-semibold">Location</span>
                  <span className="text-sm font-bold text-stone-800">Sathyamangalam, Erode, TN</span>
                </div>
              </div>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/bomathi-suryaprakasam-2514b9347"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-stone-200/40 hover:border-teal-500/30 text-left group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 group-hover:scale-110 transition-transform">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block font-semibold">LinkedIn Channel</span>
                  <span className="text-sm font-bold text-stone-800">bomathi-suryaprakasam</span>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/mathisurya520-hash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-stone-200/40 hover:border-pink-500/30 text-left group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-600 group-hover:scale-110 transition-transform">
                  <Github size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block font-semibold">GitHub profile</span>
                  <span className="text-sm font-bold text-stone-800">mathisurya520-hash</span>
                </div>
              </a>

            </div>
          </div>

          {/* Right Side: Message Input Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-stone-200/40 relative overflow-hidden bg-white/60 shadow-sm">
              
              {submitSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-600 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-space font-bold text-[#2d2722] tracking-wide">Transmission Successful</h4>
                  <p className="text-xs text-stone-500 font-poppins max-w-xs">
                    Your message has been delivered. Mathi will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block font-semibold">Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:border-pink-500 focus:bg-white transition-all duration-300 font-poppins shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block font-semibold">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. jane@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:border-pink-500 focus:bg-white transition-all duration-300 font-poppins shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block font-semibold">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Collaboration Proposal"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:border-pink-500 focus:bg-white transition-all duration-300 font-poppins shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block font-semibold">Message Body</label>
                    <textarea 
                      name="message" 
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your requirements or request details..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder-stone-400 focus:border-pink-500 focus:bg-white transition-all duration-300 resize-none font-poppins shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#1c1917] text-white font-semibold hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
