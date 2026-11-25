import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Gauge, BookOpen, Terminal, Sparkles, Flame } from 'lucide-react';

interface Partner {
  name: string;
  code: string;
  sector: string;
  metric: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  monogram: string;
}

const PARTNERS: Partner[] = [
  {
    name: "HOLLYWOODBETS",
    code: "GAMING // 01",
    sector: "Online Gaming & AI Risk",
    metric: "4.6x ROI • 10M+ Daily Tx",
    description: "Africa's largest online casino & sportsbook. Led AI engineering, real-time fraud detection (<12ms), and predictive player analytics.",
    icon: Flame,
    monogram: "HWB"
  },
  {
    name: "BMW / FORGED",
    code: "AUTOMOTIVE // 02",
    sector: "Performance Motoring",
    metric: "3.8x ROI • +285% Builds",
    description: "Technology partner for performance motoring. Built interactive 3D build configurators, real-time vehicle telemetry, and automated GTM pipelines.",
    icon: Gauge,
    monogram: "BMW"
  },
  {
    name: "NOVA HAVENS",
    code: "ENTERPRISE // 03",
    sector: "Portfolio & Ops Automation",
    metric: "81% Admin Saved • $420k/yr",
    description: "Engineered end-to-end multi-agent document automation, CRM/ERP synchronization, and automated client onboarding.",
    icon: Cpu,
    monogram: "NVH"
  },
  {
    name: "ED-AI CONSORTIUM",
    code: "EDUCATION // 04",
    sector: "AI in Education",
    metric: "Published Research",
    description: "Contributed to practical and academic research on adaptive learning models and AI tooling in education.",
    icon: BookOpen,
    monogram: "ED"
  },
  {
    name: "CYBERSHELL",
    code: "SECURITY // 05",
    sector: "Cybersecurity",
    metric: "+140% Enterprise Pipeline",
    description: "Engineered high-reliability infrastructure and real-time 3D threat monitoring interfaces.",
    icon: ShieldCheck,
    monogram: "CS"
  },
  {
    name: "ASTRONET",
    code: "TELECOM // 06",
    sector: "Orbital Mesh Networks",
    metric: "$75M Series B Control Plane",
    description: "Designed and engineered low-latency 3D satellite mesh routing analytics for 5,000+ active nodes.",
    icon: Terminal,
    monogram: "AST"
  }
];

export default function IndustryPartners() {
  const [activePartner, setActivePartner] = useState<Partner | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#080808] border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 custom-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.3em] mb-3">
              <Sparkles size={14} className="text-accent" />
              <span>INDUSTRY EXPERIENCE & PARTNERS</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter">
              PROVEN IN <span className="text-white/30">PRODUCTION</span>
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-white/60 max-w-md">
            We partner with industry leaders and established enterprises to ship reliable systems at scale.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            const isHovered = activePartner?.code === partner.code;

            return (
              <motion.div
                key={partner.code}
                onMouseEnter={() => setActivePartner(partner)}
                onMouseLeave={() => setActivePartner(null)}
                className={`p-5 sm:p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isHovered 
                    ? 'border-accent bg-white/10 shadow-[6px_6px_0px_#ff3200]' 
                    : 'border-white/10 bg-white/[0.02] hover:border-white/40'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors font-bold">
                    {partner.code.split(' //')[0]}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent transition-all" />
                </div>

                {/* Stylized Logo Monogram & Name */}
                <div className="my-2">
                  <div className="flex items-center gap-2 mb-2 text-white/40 group-hover:text-accent transition-colors">
                    <Icon size={20} />
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-tighter text-white group-hover:text-accent transition-colors">
                      {partner.monogram}
                    </span>
                  </div>
                  <div className="font-sans font-black text-xs sm:text-sm uppercase tracking-wider text-white/90 leading-tight">
                    {partner.name}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 truncate group-hover:text-white/80">
                  {partner.sector}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Detail Strip */}
        <div className="bg-white/5 border border-white/10 p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-accent rounded-full" />
            <div className="font-mono text-xs text-white/80">
              {activePartner ? (
                <span>
                  <strong className="text-white">{activePartner.name}</strong> — {activePartner.description}
                </span>
              ) : (
                <span>
                  Select or hover over a partner above to view project scope and outcomes.
                </span>
              )}
            </div>
          </div>
          
          <div className="font-mono text-[10px] sm:text-xs text-accent uppercase font-bold tracking-widest whitespace-nowrap bg-accent/10 px-3 py-1.5 border border-accent/20">
            {activePartner ? activePartner.metric : "ENTERPRISE TRACK RECORD"}
          </div>
        </div>

      </div>
    </section>
  );
}
