import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const scrollToAudit = () => {
    const auditElem = document.getElementById('ai-audit');
    if (auditElem) {
      auditElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-24 pb-16 lg:pb-0 overflow-hidden custom-grid">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 mb-4 sm:mb-6">
              <Sparkles size={13} className="text-accent" />
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                MODERNIZING GTM SYSTEMS, USER-FACING APPS &amp; CORE AI
              </span>
            </div>

            <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[135px] leading-[0.88] tracking-[-0.05em] uppercase mb-8 sm:mb-10">
              ROI <br />
              <span className="text-white/20">WITH</span> <span className="text-accent">AI</span>
            </h1>

            <p className="max-w-[540px] text-white/75 mb-8 font-sans text-base sm:text-lg font-light leading-relaxed">
              We modernize the complete operating engine of mid-market companies, enterprise leaders, and government departments—uniting <span className="text-white font-medium">GTM &amp; revenue systems</span>, <span className="text-white font-medium">user-facing web, mobile &amp; 3D apps</span>, <span className="text-white font-medium">production AI automations</span>, and <span className="text-white font-medium">embedded senior engineering squads</span>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 sm:mb-10 max-w-[560px]">
              {[
                { label: '01. GTM Systems', href: '#modernization-engine', isAnchor: true },
                { label: '02. User Apps & 3D', href: '#modernization-engine', isAnchor: true },
                { label: '03. Core AI Ops', href: '/digital-transformation', isAnchor: false },
                { label: '04. Tech Talent', href: '/tech-talent', isAnchor: false }
              ].map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="border border-white/15 bg-white/[0.03] hover:border-accent hover:bg-accent/10 px-2.5 py-2 font-mono text-[10px] uppercase tracking-wider text-white/80 hover:text-white transition-colors text-center whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="border border-white/15 bg-white/[0.03] hover:border-accent hover:bg-accent/10 px-2.5 py-2 font-mono text-[10px] uppercase tracking-wider text-white/80 hover:text-white transition-colors text-center whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
              <button 
                onClick={scrollToAudit}
                className="w-full sm:w-auto min-w-[190px] bg-white text-black px-8 sm:px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center shadow-[4px_4px_0px_#ff3200]"
              >
                Run Readiness Audit
              </button>
              
              <Link 
                to="/industries"
                className="w-full sm:w-auto min-w-[180px] border border-white/20 px-8 sm:px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-colors flex items-center justify-center gap-3 text-white text-center"
              >
                <span>28+ Industries Served</span>
                <ArrowDownRight size={16} className="text-accent" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[16/11] sm:aspect-[4/5] bg-neutral-900/50 border border-white/10 group mt-4 lg:mt-0"
        >
          {/* Isometric Accent */}
          <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-accent border-4 border-black z-20 shadow-[8px_8px_0px_#000] rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          
          <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
            <img 
              src="/src/assets/images/iso_hero_roi_1795560789183.jpg" 
              alt="Abstract isometric monolith sculpture representing exponential ROI with AI"
              className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/35 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 lg:bottom-12 lg:left-12 lg:right-12">
            <div className="flex justify-between items-end border-t border-white/15 pt-4 sm:pt-6">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 mb-1 sm:mb-2">PRODUCTION SYSTEMS</div>
                <div className="font-sans font-bold text-sm sm:text-lg uppercase tracking-wider text-white">ENTERPRISE AI &amp; AUTOMATION</div>
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-accent font-bold tracking-tighter flex items-center gap-1.5">
                <TrendingUp size={12} />
                <span>3.8x AVG ROI</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-5 sm:left-10 bottom-0 w-px h-1/4 bg-white/10 hidden sm:block" />
    </section>
  );
}
