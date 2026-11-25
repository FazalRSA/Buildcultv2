import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  TrendingUp, 
  Box, 
  Users, 
  ArrowRight, 
  Check,
  Minus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Discipline {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  problemSolved: string;
  howWeExecute: string;
  capabilities: string[];
  outcomeMetric: string;
  outcomeLabel: string;
  linkTo: string;
  linkText: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'ai-consulting',
    index: '01',
    title: 'AI Consulting & Production Systems',
    subtitle: 'Moving from isolated proofs-of-concept to reliable enterprise infrastructure.',
    icon: Cpu,
    problemSolved: 'Most companies are stuck in pilot purgatory—testing disconnected chat tools that never touch core databases or reduce actual operating costs.',
    howWeExecute: 'We audit your architecture, wire AI models directly into your ERP, CRM, and data warehouses, and build automated workflows with strict accuracy guardrails.',
    capabilities: [
      'Enterprise AI & Workflow Audits',
      'Custom Agentic Pipelines & RAG Architectures',
      'Legacy ERP & Database Integration',
      'Low-Latency Telemetry & Decision Engines'
    ],
    outcomeMetric: '75%',
    outcomeLabel: 'Average reduction in manual processing hours within 90 days',
    linkTo: '/digital-transformation',
    linkText: 'Explore AI Transformation'
  },
  {
    id: 'gtm-engine',
    index: '02',
    title: 'Go-To-Market (GTM) & Revenue Engineering',
    subtitle: 'Turning technical innovation into immediate commercial pipeline and sales velocity.',
    icon: TrendingUp,
    problemSolved: 'Great technology fails when the market doesn’t understand it or when sales and marketing operations rely on slow, manual outreach.',
    howWeExecute: 'We align product positioning with automated GTM systems—building programmatic lead enrichment, conversion-engineered digital flagships, and AI-assisted sales workflows.',
    capabilities: [
      'Technical Positioning & Beachhead Market Strategy',
      'Automated Outbound & Inbound Lead Enrichment',
      'RevOps & CRM Pipeline Automation',
      'Conversion-Engineered Product Launches'
    ],
    outcomeMetric: '3.2x',
    outcomeLabel: 'Faster pipeline velocity from product launch to qualified enterprise deals',
    linkTo: '/services',
    linkText: 'Explore GTM & Digital Services'
  },
  {
    id: 'spatial-3d',
    index: '03',
    title: '3D Web & Multi-Discipline Digital Studio',
    subtitle: 'Interactive spatial web experiences and product interfaces that set category leaders apart.',
    icon: Box,
    problemSolved: 'In a crowded market, flat templates and generic B2B websites fail to communicate the sophistication of your product.',
    howWeExecute: 'Our designers, 3D artists, and frontend engineers build real-time WebGL and Three.js product configurators, interactive data visualizers, and cohesive brand systems.',
    capabilities: [
      'Real-Time 3D WebGL & Three.js Experiences',
      'Interactive Product Configurators & Digital Twins',
      'Design Systems & High-Contrast UI/UX',
      'Full-Stack Web & Application Development'
    ],
    outcomeMetric: '60fps',
    outcomeLabel: 'Browser-native 3D performance engineered for desktop and mobile conversion',
    linkTo: '/#case-studies',
    linkText: 'View Case Studies'
  },
  {
    id: 'talent-sourcing',
    index: '04',
    title: 'Tech Talent Sourcing & Embedded Squads',
    subtitle: 'Practitioner-vetted engineers and technical leaders embedded directly into your team.',
    icon: Users,
    problemSolved: 'Traditional recruiters match resume keywords without knowing how to test whether an engineer can actually ship production AI or distributed systems.',
    howWeExecute: 'Because we build complex systems ourselves, we vet every engineer through real code audits and architecture reviews—deploying individual specialists or full squads in 14 days.',
    capabilities: [
      'Embedded AI & Full-Stack Engineering Squads',
      'Practitioner-Led Technical Vetting & Sourcing',
      'Fractional CTO & Architecture Leadership',
      'Internal Team Upskilling & Change Management'
    ],
    outcomeMetric: '14 Days',
    outcomeLabel: 'From initial role brief to senior engineers shipping code in your repository',
    linkTo: '/tech-talent',
    linkText: 'Explore Tech Talent'
  }
];

const COMPARISON_ROWS = [
  {
    capability: 'Production AI & Legacy System Integration',
    buildCult: 'Built & deployed by senior engineers',
    legacyConsultancies: 'Slide decks & high-level theory',
    creativeAgencies: 'Limited to basic API wrappers',
    recruiters: 'No architecture ownership'
  },
  {
    capability: 'Go-To-Market (GTM) & Revenue Automation',
    buildCult: 'End-to-end RevOps & GTM engineering',
    legacyConsultancies: 'Static market research PDFs',
    creativeAgencies: 'Brand campaigns without RevOps',
    recruiters: 'Not offered'
  },
  {
    capability: 'Interactive 3D Web (WebGL / Three.js) & UI/UX',
    buildCult: 'In-house 3D & product design studio',
    legacyConsultancies: 'Outsourced or generic templates',
    creativeAgencies: 'Visuals often disconnected from backend',
    recruiters: 'Not offered'
  },
  {
    capability: 'Practitioner-Vetted Tech Talent & Hiring',
    buildCult: 'Tested on real production codebases',
    legacyConsultancies: 'Billed out as junior analysts',
    creativeAgencies: 'No talent sourcing capability',
    recruiters: 'Keyword matching without code audits'
  },
  {
    capability: 'Speed to Measurable Commercial Value',
    buildCult: 'Working systems in 2–6 weeks',
    legacyConsultancies: '6+ months of discovery meetings',
    creativeAgencies: '3–4 months for static deliverables',
    recruiters: '3–6 months hiring & ramp-up lag'
  }
];

export default function CrossingTheChasm() {
  const [activeId, setActiveId] = useState<string>('ai-consulting');
  const activeDiscipline = DISCIPLINES.find(d => d.id === activeId) || DISCIPLINES[0];

  return (
    <section className="py-20 sm:py-32 bg-[#070707] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Section Header: Crossing the Chasm */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.25em] block mb-4">
              01. CROSSING THE CHASM
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-white">
              FROM AI EXPERIMENTS <br />
              TO <span className="text-accent">COMMERCIAL SCALE</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-base sm:text-lg text-white/75 leading-relaxed font-light">
              Most businesses stall in the chasm between early AI curiosity and real-world adoption. Crossing that gap takes more than a strategy deck or an isolated tool—it requires an integrated partner that connects <strong className="text-white font-semibold">engineering, go-to-market execution, next-gen 3D digital experiences, and senior talent</strong>.
            </p>
          </div>
        </div>

        {/* Abstract Isometric Crossing the Chasm Visual */}
        <div className="mb-8 sm:mb-10 border-2 border-white/15 bg-black overflow-hidden relative group">
          <div className="relative aspect-[16/9] max-h-[480px] w-full overflow-hidden bg-[#0a0a0a]">
            <img
              src="/src/assets/images/iso_crossing_chasm_1795560790001.jpg"
              alt="Abstract isometric architectural bridge spanning a chasm from fragmented legacy blocks to an ordered enterprise structure"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-1">
                  Visual Architecture
                </span>
                <p className="font-sans font-bold text-base sm:text-xl text-white tracking-tight">
                  From fragmented legacy operations across the chasm to unified enterprise scale.
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/75 whitespace-nowrap">
                <span>Legacy Silos</span>
                <span className="text-accent font-bold">→</span>
                <span className="text-white font-bold">Build Cult Bridge</span>
                <span className="text-accent font-bold">→</span>
                <span>Compounding Scale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Chasm Bridge Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 sm:mb-24">
          <div className="border border-white/15 bg-white/[0.02] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
                Stage 01 · Where Most Stall
              </div>
              <h3 className="font-sans font-bold text-xl uppercase tracking-tight text-white mb-3">
                Isolated Pilots & Hype
              </h3>
              <p className="font-sans text-sm text-white/65 leading-relaxed font-light">
                Disconnected chat interfaces, manual spreadsheets, unvetted hires, and agency slide decks that never reach production or move revenue.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-white/40">
              Result: Sunk budget & organizational fatigue
            </div>
          </div>

          <div className="border-2 border-accent bg-accent/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-accent font-bold uppercase tracking-widest mb-2">
                Stage 02 · The Build Cult Bridge
              </div>
              <h3 className="font-sans font-black text-xl uppercase tracking-tight text-white mb-3">
                Full-Stack Execution
              </h3>
              <p className="font-sans text-sm text-white/85 leading-relaxed font-light">
                We wire AI directly into your core systems, automate GTM pipelines, build high-converting 3D and web interfaces, and embed senior engineers into your team.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-accent/30 font-mono text-xs text-accent font-bold">
              4 Integrated Disciplines Under One Roof
            </div>
          </div>

          <div className="border border-white/15 bg-white text-black p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-black/50 font-bold uppercase tracking-widest mb-2">
                Stage 03 · Mainstream Scale
              </div>
              <h3 className="font-sans font-black text-xl uppercase tracking-tight text-black mb-3">
                Measurable Enterprise ROI
              </h3>
              <p className="font-sans text-sm text-black/80 leading-relaxed">
                Automated operations running reliably 24/7, faster sales cycles, distinctive digital presence, and an internal engineering team equipped for the new age.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/15 font-mono text-xs text-black font-bold">
              Result: Compounding commercial advantage
            </div>
          </div>
        </div>

        {/* 4 Integrated Disciplines Interactive Selector */}
        <div className="mb-20 sm:mb-28">
          <div className="mb-8">
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              02. MULTI-DISCIPLINARY ARCHITECTURE
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              FOUR PILLARS BUILT FOR THE NEW AGE
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {DISCIPLINES.map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`text-left p-5 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[6px_6px_0px_#ff3200]'
                      : 'bg-white/[0.02] text-white border-white/15 hover:border-white/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-mono text-xs font-bold ${isSelected ? 'text-accent' : 'text-white/40'}`}>
                        {item.index}
                      </span>
                      <Icon size={20} className={isSelected ? 'text-black' : 'text-white/50'} />
                    </div>
                    <div className="font-sans font-black text-base sm:text-lg uppercase tracking-tight leading-snug">
                      {item.title}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-current/10 font-mono text-[10px] uppercase tracking-wider opacity-70">
                    {isSelected ? 'Active Pillar' : 'Inspect Capability'}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDiscipline.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="border-2 border-white bg-black p-6 sm:p-10 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="font-mono text-xs text-accent font-bold uppercase tracking-widest mb-2">
                      Pillar {activeDiscipline.index} · {activeDiscipline.title}
                    </div>
                    <h4 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mb-3">
                      {activeDiscipline.subtitle}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="bg-white/[0.03] border border-white/10 p-5">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-2">
                        The Common Bottleneck
                      </div>
                      <p className="font-sans text-sm text-white/80 leading-relaxed font-light">
                        {activeDiscipline.problemSolved}
                      </p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 p-5">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-2">
                        How Build Cult Executes
                      </div>
                      <p className="font-sans text-sm text-white/90 leading-relaxed font-light">
                        {activeDiscipline.howWeExecute}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4 pb-3 border-b border-white/10">
                      What We Deliver
                    </div>
                    <ul className="space-y-3 mb-8">
                      {activeDiscipline.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-sans text-white/85">
                          <Check size={16} className="text-accent shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-sans font-black text-3xl text-accent tabular-nums">
                        {activeDiscipline.outcomeMetric}
                      </div>
                      <div className="font-mono text-[10px] text-white/50 uppercase max-w-[200px]">
                        {activeDiscipline.outcomeLabel}
                      </div>
                    </div>

                    {activeDiscipline.linkTo.startsWith('/#') ? (
                      <a
                        href={activeDiscipline.linkTo}
                        className="bg-white text-black px-5 py-3 font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>{activeDiscipline.linkText}</span>
                        <ArrowRight size={14} />
                      </a>
                    ) : (
                      <Link
                        to={activeDiscipline.linkTo}
                        className="bg-white text-black px-5 py-3 font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>{activeDiscipline.linkText}</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Comparison Table: Why Build Cult vs Fragmented Vendors */}
        <div>
          <div className="max-w-3xl mb-10">
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              03. THE INTEGRATED ADVANTAGE
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mb-3">
              WHY COMPANIES CHOOSE BUILD CULT OVER FRAGMENTED VENDORS
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/70 font-light">
              Hiring separate strategy consultants, creative shops, and recruiting agencies creates handoff delays and finger-pointing. We bring strategy, engineering, 3D design, GTM, and talent together.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/15 bg-black">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.03] font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-4 sm:p-5 text-white/60">Capability / Requirement</th>
                  <th className="p-4 sm:p-5 bg-accent text-white font-bold">Build Cult (Integrated)</th>
                  <th className="p-4 sm:p-5 text-white/50">Big 4 / Consultancies</th>
                  <th className="p-4 sm:p-5 text-white/50">Traditional Web Agencies</th>
                  <th className="p-4 sm:p-5 text-white/50">Standard Recruiters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-sans text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">
                      {row.capability}
                    </td>
                    <td className="p-4 sm:p-5 bg-accent/10 border-x border-accent/30 text-white font-medium">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-accent shrink-0" />
                        <span>{row.buildCult}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-white/50">
                      <div className="flex items-center gap-2">
                        <Minus size={14} className="text-white/30 shrink-0" />
                        <span>{row.legacyConsultancies}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-white/50">
                      <div className="flex items-center gap-2">
                        <Minus size={14} className="text-white/30 shrink-0" />
                        <span>{row.creativeAgencies}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-white/50">
                      <div className="flex items-center gap-2">
                        <Minus size={14} className="text-white/30 shrink-0" />
                        <span>{row.recruiters}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
