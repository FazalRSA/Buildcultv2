import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    window.location.href = `mailto:agency@buildcult.com?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-40 bg-brutal-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 lg:gap-28">
          <div>
            <span className="text-accent font-bold text-[10px] uppercase tracking-[0.5em] mb-4 sm:mb-8 block">
              Get in Touch
            </span>
            <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.85] mb-6 sm:mb-10 tracking-tighter">
              START A <br /> <span className="text-accent">PROJECT</span>
            </h2>
            <p className="text-white/60 text-base sm:text-xl max-w-md mb-8 sm:mb-12 font-light leading-relaxed">
              Have an AI initiative, automation bottleneck, or software project in mind? Tell us what you're building and we'll get back to you within one business day.
            </p>
            
            <div className="flex gap-8 mb-12 sm:mb-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <a href="#" className="hover:text-accent transition-colors p-2 -ml-2" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors p-2" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors p-2" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>

            <div className="space-y-2 pt-8 border-t border-white/10">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Direct Contact</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white/80">agency@buildcult.com</div>
            </div>
          </div>

          <div className="bg-white/[0.02] p-6 sm:p-10 lg:p-12 border-2 border-white/10 backdrop-blur-3xl shadow-[8px_8px_0px_rgba(255,255,255,0.05)]">
            <form className="space-y-8 sm:space-y-10" onSubmit={handleSubmit}>
              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-[0.2em]">Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent transition-colors text-base sm:text-lg font-light placeholder:text-white/20 text-white rounded-none"
                  placeholder="Jane Doe / Company"
                />
              </div>
              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-[0.2em]">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent transition-colors text-base sm:text-lg font-light placeholder:text-white/20 text-white rounded-none"
                  placeholder="you@company.com"
                />
              </div>
              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-[0.2em]">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent transition-colors text-base sm:text-lg font-light placeholder:text-white/20 text-white rounded-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="group relative">
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-[0.2em]">Project Details *</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-accent transition-colors text-base sm:text-lg font-light placeholder:text-white/20 text-white resize-none rounded-none"
                  placeholder="Tell us about your project, timeline, and goals..."
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full bg-white text-black font-sans font-black text-xs uppercase tracking-[0.3em] py-5 sm:py-6 flex items-center justify-center gap-3 group hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#ff3200]"
              >
                {isSubmitting ? (
                  'SENDING...'
                ) : isSuccess ? (
                  <span className="flex items-center gap-2"><Check size={16} /> MESSAGE SENT</span>
                ) : (
                  <>Send Message <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
