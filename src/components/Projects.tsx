import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

export default function Projects() {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = useMemo(() => {
    const cats = new Set(PROJECTS.map(p => p.category.split(' /')[0]));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'ALL') return PROJECTS;
    return PROJECTS.filter(p => p.category.startsWith(filter));
  }, [filter]);

  return (
    <section id="rites" className="py-20 sm:py-32 lg:py-40 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-12 sm:mb-20">
          <span className="text-accent font-bold text-[10px] uppercase tracking-[0.5em] mb-4 sm:mb-8 block">
            Selected Work
          </span>
          <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85]">
            CASE <br /> <span className="text-white/20">STUDIES</span>
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2 sm:gap-4 mb-12 sm:mb-16 relative z-10 overflow-x-auto pb-4 pt-1 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest px-4 sm:px-6 py-2.5 sm:py-3 border-2 whitespace-nowrap transition-all flex-shrink-0 ${
                filter === cat 
                  ? 'bg-accent border-accent text-white shadow-[3px_3px_0px_rgba(255,255,255,1)]' 
                  : 'bg-transparent border-white/20 text-white/50 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group relative pb-3 pr-3"
              >
                <Link to={`/project/${project.id}`}>
                  {/* Neo-brutalist card shadow/base */}
                  <div 
                    className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 border-2 sm:border-4 border-black z-0 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"
                    style={{ backgroundColor: project.color }}
                  />
                  
                  {/* Main Card Content */}
                  <div className="relative bg-white text-black p-5 sm:p-8 border-2 sm:border-4 border-black z-10 h-full flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 sm:hover:-translate-x-2 sm:hover:-translate-y-2 transition-transform duration-300 overflow-hidden">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-widest bg-black text-white px-2.5 py-1">
                          {project.category}
                        </span>
                        <ExternalLink size={18} className="text-black/30 group-hover:text-black transition-colors" />
                      </div>
                      
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] mb-6 overflow-hidden border-2 sm:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] group-hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all bg-[#0a0a0a]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {project.headlineMetric && (
                          <div className="absolute bottom-3 left-3 bg-black text-white border-2 border-white px-3 py-1.5 shadow-[3px_3px_0px_#ff3200]">
                            <div className="font-mono text-[8px] uppercase tracking-widest text-accent font-bold">
                              VERIFIED ROI
                            </div>
                            <div className="font-sans font-black text-lg sm:text-xl leading-none tracking-tight">
                              {project.headlineMetric}
                            </div>
                          </div>
                        )}
                      </div>

                      <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter mb-3 leading-none">
                        {project.title}
                      </h3>
                      
                      <div className="mb-3">
                        <p className="font-mono text-[9px] sm:text-[10px] uppercase text-black/50 font-bold tracking-widest mb-0.5">Client</p>
                        <p className="font-sans font-bold text-xs sm:text-sm">{project.clientName || 'Confidential'}</p>
                      </div>

                      {project.roiMetrics && project.roiMetrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {project.roiMetrics.slice(0, 2).map((m, i) => (
                            <div key={i} className="bg-black text-white p-2.5 border border-black">
                              <div className="font-sans font-black text-base sm:text-lg leading-none text-accent mb-0.5">
                                {m.value}
                              </div>
                              <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/80">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mb-4">
                        <p className="font-mono text-[9px] sm:text-[10px] uppercase text-black/50 font-bold tracking-widest mb-1.5">Services</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.servicesProvided?.map(service => (
                            <span key={service} className="text-[9px] sm:text-[10px] font-bold uppercase bg-black/5 px-2 py-0.5 sm:py-1 border border-black/10">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed text-black/70 mb-6 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 sm:border-t-4 border-black flex justify-between items-center mt-auto">
                      <span className="font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors">
                        VIEW CASE STUDY
                      </span>
                      <button
                        type="button"
                        className="font-sans font-black text-[11px] sm:text-xs uppercase tracking-widest text-[#0066cc] hover:text-accent transition-colors z-20 relative p-1"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.liveUrl, '_blank'); }}
                      >
                        LIVE SITE <ExternalLink size={12} className="inline mb-1 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
