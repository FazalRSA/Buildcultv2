import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { useEffect } from 'react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-brutal-black text-white flex items-center justify-center p-6 sm:p-10">
        <div className="text-center">
          <h1 className="font-sans font-black text-4xl sm:text-6xl mb-6 sm:mb-8 uppercase tracking-tighter">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="border-2 border-white px-6 sm:px-8 py-3 sm:py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white">
      <div className="atmosphere opacity-30" />
      <Navigation />
      
      <main className="relative z-10 pt-28 sm:pt-36 lg:pt-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 sm:mb-12 uppercase font-mono text-[10px] sm:text-xs tracking-[0.25em]"
            >
              <ArrowLeft size={16} /> BACK TO CASE STUDIES
            </button>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10">
              <div>
                <span className="text-accent font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
                  {project.category}
                </span>
                <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-9xl leading-[0.88] uppercase tracking-tighter">
                  {project.title}
                </h1>
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-white text-black px-6 sm:px-10 py-3.5 sm:py-4 font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all shadow-[6px_6px_0px_#ff3200]"
                >
                  <span>LIVE PROJECT</span> <Globe size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Section */}
          <div className="relative mb-12 sm:mb-16 group pb-3 pr-3">
            <div 
              className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 border-2 sm:border-4 border-black z-0"
              style={{ backgroundColor: project.color }}
            />
            <div className="relative border-2 sm:border-4 border-black aspect-[16/10] sm:aspect-[21/9] z-10 overflow-hidden bg-black">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {project.headlineMetric && (
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-black/90 border-2 border-white px-5 py-3 sm:px-8 sm:py-5 shadow-[6px_6px_0px_#ff3200]">
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-1">
                    VERIFIED COMMERCIAL OUTCOME
                  </div>
                  <div className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tighter">
                    {project.headlineMetric}
                  </div>
                  {project.headlineMetricLabel && (
                    <div className="font-mono text-[10px] sm:text-xs text-white/70 mt-1">
                      {project.headlineMetricLabel}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Verified ROI Metrics Grid */}
          {project.roiMetrics && project.roiMetrics.length > 0 && (
            <div className="mb-16 sm:mb-24">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-bold mb-4">
                VERIFIED SUCCESS METRICS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {project.roiMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-black border-2 sm:border-4 border-black p-6 shadow-[6px_6px_0px_#ff3200]"
                  >
                    <div className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-black mb-2">
                      {metric.value}
                    </div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-1">
                      {metric.label}
                    </div>
                    {metric.detail && (
                      <div className="font-sans text-xs text-black/70 leading-relaxed">
                        {metric.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Study Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 mb-20 sm:mb-32 lg:mb-40">
            <div className="lg:col-span-8">
              <h2 className="font-sans font-black text-xs uppercase tracking-[0.4em] mb-6 sm:mb-10 text-white/40 border-b border-white/10 pb-4">Case Study Overview</h2>
              <p className="text-lg sm:text-2xl lg:text-3xl leading-relaxed sm:leading-snug font-light text-white/90 mb-12 sm:mb-16">
                {project.caseStudy}
              </p>

              {project.beforeState && project.afterState && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
                  <div className="border-2 border-white/15 bg-white/[0.02] p-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                      BEFORE BUILD CULT
                    </div>
                    <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed">
                      {project.beforeState}
                    </p>
                  </div>
                  <div className="border-2 border-accent bg-accent/10 p-6 shadow-[6px_6px_0px_#ff3200]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">
                      AFTER PRODUCTION DEPLOYMENT
                    </div>
                    <p className="font-sans text-sm sm:text-base text-white leading-relaxed font-medium">
                      {project.afterState}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                {project.gallery.map((img, i) => (
                  <div key={i} className="border-2 sm:border-4 border-black shadow-[6px_6px_0px_rgba(255,255,255,0.05)] overflow-hidden aspect-video sm:aspect-square bg-[#0a0a0a]">
                    <img src={img} alt={`${project.title} isometric detail ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 bg-white/[0.03] border-2 border-white/10 p-6 sm:p-8 backdrop-blur-xl">
                <h3 className="font-sans font-black text-[10px] uppercase tracking-[0.4em] mb-6 sm:mb-8 text-accent">Project Summary</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-mono">CLIENT</div>
                    <div className="text-sm sm:text-base uppercase font-bold text-white">{project.clientName || 'Enterprise Partner'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-mono">STATUS</div>
                    <div className="text-sm sm:text-base uppercase font-bold text-accent">IN PRODUCTION</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-white/40 tracking-widest mb-1 font-mono">SCOPE</div>
                    <div className="text-sm sm:text-base uppercase font-bold text-white">{project.servicesProvided?.join(' • ') || 'Full-Stack Engineering'}</div>
                  </div>
                  <button 
                     onClick={() => window.open(project.liveUrl, '_blank')}
                     className="w-full mt-6 border border-white/30 py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 text-white"
                  >
                    <span>VISIT LIVE PROJECT</span> <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
