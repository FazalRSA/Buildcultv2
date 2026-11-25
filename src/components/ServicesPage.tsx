import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Terminal, Globe, Mic, Users, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import Navigation from './Navigation';
import Footer from './Footer';
import CrossingTheChasm from './CrossingTheChasm';
import FrontToBackModernization from './FrontToBackModernization';
import IndustriesServed from './IndustriesServed';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-8 h-8 sm:w-12 sm:h-12" />,
  Layers: <Layers className="w-8 h-8 sm:w-12 sm:h-12" />,
  Zap: <Zap className="w-8 h-8 sm:w-12 sm:h-12" />,
  Globe: <Globe className="w-8 h-8 sm:w-12 sm:h-12" />,
  Mic: <Mic className="w-8 h-8 sm:w-12 sm:h-12" />,
  Users: <Users className="w-8 h-8 sm:w-12 sm:h-12" />,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white">
      <Navigation />
      
      <main className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <header className="mb-16 sm:mb-24 lg:mb-32">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent font-mono font-bold text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6 block"
            >
              MULTI-DISCIPLINARY AGENCY & CONSULTANCY
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] uppercase leading-[0.88] tracking-tighter mb-8"
            >
              CORE <br /> <span className="text-white/20">SERVICES</span>
            </motion.h1>
            <p className="font-sans text-lg sm:text-xl text-white/75 max-w-3xl font-light leading-relaxed">
              Navigating the new age requires more than a single specialty. We combine AI systems engineering, Go-To-Market execution, 3D web experiences, workflow automation, and senior talent sourcing under one roof.
            </p>
          </header>

          {/* Services List */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32 mb-24">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 lg:gap-20 items-start border-t border-white/10 pt-10 sm:pt-16 lg:pt-20"
              >
                <div className="flex flex-col gap-5 sm:gap-8">
                  <div className="text-accent">
                    {ICON_MAP[service.icon]}
                  </div>
                  <div className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase">
                    0{index + 1}. CAPABILITY
                  </div>
                  <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-white">
                    {service.title}
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6 sm:gap-8">
                  <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-white/85">
                    {service.description}
                  </p>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed font-sans font-light">
                    We approach {service.title.toLowerCase()} with a focus on reliability, maintainability, and commercial return. Rather than handing off slide decks or isolated prototypes, our team works directly with your leadership and engineers to ship production systems that hold up under real-world traffic.
                  </p>
                  
                  <div className="text-xs font-mono text-white/50 pt-2">
                    Production Architecture · End-to-End Delivery · Measurable ROI
                  </div>
                  
                  <a 
                    href="/#contact" 
                    className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-xs sm:text-sm group mt-2 hover:text-white transition-colors"
                  >
                    <span>DISCUSS A PROJECT</span> 
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Front-Office & Back-Office Modernization Engine */}
        <FrontToBackModernization />

        {/* Crossing The Chasm Matrix */}
        <CrossingTheChasm />

        {/* Industries We Serve */}
        <IndustriesServed compact={true} />

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <section className="mt-20 sm:mt-28 bg-accent p-6 sm:p-12 lg:p-16 border-2 sm:border-4 border-black text-black shadow-[8px_8px_0px_#ffffff]">
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-[0.88] mb-6 sm:mb-8">
              HAVE A COMPLEX <br /> TECHNICAL CHALLENGE?
            </h2>
            <p className="max-w-xl text-base sm:text-lg lg:text-xl font-medium mb-8 sm:mb-10 text-black/90">
              Whether it's an enterprise AI rollout, a 3D product configurator, a government digitization project, or an embedded engineering team—let's scope it together.
            </p>
            <a 
              href="/#contact"
              className="inline-block bg-black text-white px-8 sm:px-12 py-4 sm:py-5 font-black text-xs sm:text-sm uppercase tracking-widest hover:translate-x-1 hover:-translate-y-1 transition-transform border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]"
            >
              GET IN TOUCH
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
