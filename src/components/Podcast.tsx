import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navigation from './Navigation';
import Footer from './Footer';
import { ArrowLeft, Check, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  'Tech',
  'Media',
  'Enterprise',
  'Sport',
  'Government',
  'Education',
  'Humanitarian'
];

export default function Podcast() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    socialHandles: '',
    website: '',
    email: '',
    phone: '',
    category: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        surname: '',
        socialHandles: '',
        website: '',
        email: '',
        phone: '',
        category: '',
        date: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-black min-h-screen text-white/80 selection:bg-[#00D4FF] selection:text-black font-sans pb-16">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 lg:pt-44 pb-16 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-xs uppercase tracking-[0.2em] hover:text-white transition-colors mb-10 sm:mb-14 text-white/50"
        >
          <ArrowLeft size={14} className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-1 mb-6">
            <Radio size={12} className="text-[#00D4FF]" />
            <span className="text-[#00D4FF] font-mono font-bold text-[10px] uppercase tracking-[0.25em]">
              THE BUILD CULT PODCAST
            </span>
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight uppercase tracking-tight">
            The Build Cult <br />
            <span className="text-[#00D4FF] relative z-10 font-black">Podcast</span>
          </h1>
          
          <p className="text-base sm:text-lg font-sans font-light text-white/75 mb-10 sm:mb-14 leading-relaxed max-w-2xl">
            We speak with founders, builders, and operators doing meaningful work across Tech, Media, Enterprise, Sport, Government, Education, and Humanitarian initiatives. Apply below if you'd like to be featured on an upcoming episode.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-white/5 border-2 border-white/10 p-5 sm:p-10 shadow-[8px_8px_0px_rgba(0,212,255,0.15)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">First Name *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="surname" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Last Name *</label>
                <input 
                  type="text" 
                  id="surname"
                  name="surname"
                  required
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="socialHandles" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Social Handles (X, LinkedIn, etc.) *</label>
              <input 
                type="text" 
                id="socialHandles"
                name="socialHandles"
                required
                value={formData.socialHandles}
                onChange={handleChange}
                className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                placeholder="@username / linkedin.com/in/jane"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Website or Company URL</label>
              <input 
                type="url" 
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full bg-black/60 border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors placeholder:text-white/20 rounded-none font-mono text-sm"
                placeholder="https://"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Category *</label>
                <select 
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-black border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors rounded-none font-mono appearance-none uppercase text-sm"
                >
                  <option value="" disabled className="text-white/50">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">Preferred Recording Date</label>
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-black border-b border-white/20 px-0 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] transition-colors rounded-none font-mono uppercase text-sm [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-[#00D4FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#00D4FF]"
              >
                {isSubmitting ? 'Submitting...' : 'Apply to Join an Episode'}
              </button>
              
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-[#00D4FF]/10 border border-[#00D4FF] text-[#00D4FF] font-mono text-xs flex items-center gap-2"
                >
                  <Check size={16} />
                  <span>Thanks for applying! Our production team will review your submission and reach out soon.</span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
