import React from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Terminal, Globe, Mic, Users } from 'lucide-react';
import { SERVICES } from '../constants';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={28} />,
  Layers: <Layers size={28} />,
  Zap: <Zap size={28} />,
  Globe: <Globe size={28} />,
  Mic: <Mic size={28} />,
  Users: <Users size={28} />,
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-32 lg:py-40 bg-brutal-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-6 sm:gap-8">
          <div>
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.25em] block mb-4">
              MULTI-DISCIPLINARY CAPABILITIES
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.88] tracking-tighter">
              BUILT FOR THE <br /> <span className="text-accent underline decoration-white/10 underline-offset-8">NEW AGE</span>
            </h2>
          </div>
          <div className="max-w-sm text-white/60 font-sans text-sm leading-relaxed">
            One integrated partner for AI consulting, Go-To-Market execution, 3D digital experiences, workflow automation, and senior engineering talent.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.title}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              className="bg-brutal-black p-6 sm:p-8 lg:p-12 transition-colors cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-10 sm:mb-14">
                <div className="text-white/40 group-hover:text-accent transition-colors">
                  {ICON_MAP[service.icon]}
                </div>
                <span className="font-mono text-xs font-bold text-white/30 group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-sans font-black text-xs sm:text-sm uppercase tracking-[0.25em] mb-3 sm:mb-4 text-white/95">{service.title}</h3>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed font-sans font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
