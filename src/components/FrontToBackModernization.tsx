import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Smartphone,
  Cpu,
  Users,
  ArrowRight,
  Check,
  AlertCircle,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

type TrackId = 'gtm-systems' | 'user-apps' | 'core-ai' | 'embedded-talent';

interface ModernizationTrack {
  id: TrackId;
  index: string;
  zone: 'Front Office' | 'Back Office';
  title: string;
  shortTitle: string;
  buyerRole: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  whatsBroken: string;
  whatWeShip: string[];
  first30Days: string;
  proofClient: string;
  proofMetric: string;
  ctaLabel: string;
  ctaTo: string;
}

const MODERNIZATION_TRACKS: ModernizationTrack[] = [
  {
    id: 'gtm-systems',
    index: '01',
    zone: 'Front Office',
    title: 'Modernizing GTM & Revenue Systems',
    shortTitle: 'GTM Systems',
    buyerRole: 'For CROs, Sales Leads & Founders',
    icon: TrendingUp,
    headline: 'Turn fragmented sales operations into an automated commercial engine.',
    whatsBroken:
      'Sales teams lose deals to 48-hour manual quoting, disconnected CRM and ERP records, manual lead research, and static marketing funnels that fail to qualify enterprise buyers.',
    whatWeShip: [
      'Signal-driven lead enrichment & automated outbound/inbound qualification',
      'Interactive self-service quoting, BOM pricing & ROI calculators wired to CRM',
      'Bi-directional HubSpot, Salesforce, and ERP revenue pipeline orchestration',
      'Conversion-engineered product launches & full-funnel attribution dashboards'
    ],
    first30Days:
      'Audit revenue leakage points and deploy an automated quoting, enrichment, or CRM routing pipeline live within 30 days.',
    proofClient: 'BMW / Forged',
    proofMetric: '3.4x GTM pipeline velocity · +285% build conversion lift',
    ctaLabel: 'Scope GTM Modernization',
    ctaTo: '/audit'
  },
  {
    id: 'user-apps',
    index: '02',
    zone: 'Front Office',
    title: 'User-Facing Apps & Digital Flagships',
    shortTitle: 'User-Facing Apps',
    buyerRole: 'For CMOs, Product & Digital Heads',
    icon: Smartphone,
    headline: 'Replace sluggish legacy portals with flagship web, mobile, and 3D applications.',
    whatsBroken:
      'Dated customer portals, clunky citizen platforms, and template websites erode executive trust, create high drop-off rates, and force users back onto phone calls and emails.',
    whatWeShip: [
      'High-speed React & TypeScript customer, partner, and citizen web/mobile apps',
      '60fps browser-native 3D spatial product configurators & digital twins (WebGL)',
      'Self-service client onboarding, live status tracking & AI-assisted support interfaces',
      'Cohesive design systems built for accessibility, mobile velocity, and conversion'
    ],
    first30Days:
      'Complete UX & frontend architecture teardown and ship a production-grade interactive application module connected to live APIs.',
    proofClient: 'BMW / Forged & Cyber-Shell',
    proofMetric: '60fps spatial commerce · +140% qualified enterprise pipeline',
    ctaLabel: 'Explore Digital Studio',
    ctaTo: '/services'
  },
  {
    id: 'core-ai',
    index: '03',
    zone: 'Back Office',
    title: 'Core AI & Operational Automations',
    shortTitle: 'AI & Operations',
    buyerRole: 'For COOs, CFOs & Dept Heads',
    icon: Cpu,
    headline: 'Eliminate manual back-office queues without ripping out legacy ERPs.',
    whatsBroken:
      'Skilled staff spend 20–30 hours per week copying data between PDFs, spreadsheets, legacy databases, KYC queues, and compliance registers—inflating payroll and error rates.',
    whatWeShip: [
      'Deterministic AI document extraction, contract review & compliance auditing',
      'Sub-12ms real-time risk, fraud, and vehicle/industrial telemetry pipelines',
      'Two-way legacy ERP, accounting ledger, and government database integrations',
      'POPIA-compliant Private VPC or On-Premise Air-Gapped sovereign deployments'
    ],
    first30Days:
      'Identify the single highest-bleed manual workflow and deploy a zero-touch automated pipeline with audited time & cost recovery.',
    proofClient: 'Hollywoodbets & Nova Havens',
    proofMetric: '4.6x AI ROI · 81% manual administration eliminated',
    ctaLabel: 'Run ROI Audit',
    ctaTo: '/audit'
  },
  {
    id: 'embedded-talent',
    index: '04',
    zone: 'Back Office',
    title: 'Embedded Squads & Tech Talent',
    shortTitle: 'Tech Talent',
    buyerRole: 'For CTOs & VPs of Engineering',
    icon: Users,
    headline: 'Close the senior AI and product engineering gap in 14 days—not 6 months.',
    whatsBroken:
      'Most organizations do not know how to vet senior AI, 3D, or distributed systems talent—leading to costly mis-hires, stalled roadmaps, and dependence on slow body-shops.',
    whatWeShip: [
      'Practitioner-vetted senior AI, full-stack, and WebGL engineers in 14 days',
      'Dedicated delivery squads embedded directly into your repos & sprint rituals',
      'Fractional CTO & principal systems architecture leadership',
      'Hands-on internal team upskilling, code reviews, and 100% IP handover'
    ],
    first30Days:
      'Technical architecture review and senior engineers shipping production pull requests inside your repositories by week two.',
    proofClient: 'Enterprise & High-Scale Platforms',
    proofMetric: '14-day deployment · 100% client IP & codebase ownership',
    ctaLabel: 'Request Engineering Squad',
    ctaTo: '/tech-talent'
  }
];

export default function FrontToBackModernization() {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('gtm-systems');
  const activeTrack = MODERNIZATION_TRACKS.find((t) => t.id === activeTrackId) || MODERNIZATION_TRACKS[0];
  const ActiveIcon = activeTrack.icon;

  return (
    <section
      id="modernization-engine"
      className="py-20 sm:py-28 bg-[#050505] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Strategic Framing Header: Solving "Niche vs. Broad Market" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">
              <Layers size={14} className="text-accent" />
              <span>Narrow Mechanism · Broad Commercial Impact</span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] text-white">
              DIFFERENT INDUSTRIES. <br />
              <span className="text-white/25">SAME</span>{' '}
              <span className="text-accent">BOTTLENECK.</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light">
              Whether you run a 10M-transaction gaming platform, an automotive brand, a mid-market portfolio, or a national government department, growth stalls in the exact same two places: <strong className="text-white font-semibold">outdated GTM &amp; user-facing apps</strong> in the front office, and <strong className="text-white font-semibold">manual legacy operations</strong> in the back office. Pick where you need leverage first.
            </p>
          </div>
        </div>

        {/* Dual-Engine Visual Banner (Front Office vs. Back Office) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border border-white/15 bg-white/[0.02] p-5 sm:p-6 flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
                Front-Office Modernization
              </div>
              <div className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight text-white">
                How You Win, Convert &amp; Serve Users
              </div>
              <p className="font-sans text-xs text-white/60 mt-1">
                GTM &amp; RevOps automation · Customer &amp; citizen apps · 3D configurators · Digital flagships
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 shrink-0 hidden sm:block">
              Tracks 01–02
            </div>
          </div>

          <div className="border border-white/15 bg-white/[0.02] p-5 sm:p-6 flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1">
                Back-Office &amp; Core Modernization
              </div>
              <div className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight text-white">
                How You Operate, Automate &amp; Scale
              </div>
              <p className="font-sans text-xs text-white/60 mt-1">
                Production AI agents · Legacy ERP integrations · Real-time telemetry · Embedded senior squads
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 shrink-0 hidden sm:block">
              Tracks 03–04
            </div>
          </div>
        </div>

        {/* Interactive 4-Track Entry-Point Selector */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
          role="tablist"
          aria-label="Modernization Entry Points"
        >
          {MODERNIZATION_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTrackId(track.id)}
                className={`text-left p-5 border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[6px_6px_0px_#ff3200]'
                    : 'bg-white/[0.02] text-white border-white/15 hover:border-white/45'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                      isSelected ? 'text-accent' : 'text-white/45'
                    }`}>
                      {track.index} · {track.zone}
                    </span>
                    <Icon size={18} className={isSelected ? 'text-black' : 'text-white/55'} />
                  </div>
                  <div className="font-sans font-black text-base sm:text-lg uppercase tracking-tight leading-snug mb-1">
                    {track.shortTitle}
                  </div>
                  <div className={`font-mono text-[10px] ${isSelected ? 'text-black/65' : 'text-white/45'}`}>
                    {track.buyerRole}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Modernization Track Deep Dive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-2 sm:border-4 border-white bg-[#0a0a0c] p-6 sm:p-10 shadow-[10px_10px_0px_#ff3200]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left 7 Cols: Problem, Architecture & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-accent text-white flex items-center justify-center shrink-0">
                    <ActiveIcon size={22} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
                      Track {activeTrack.index} · {activeTrack.zone} · {activeTrack.buyerRole}
                    </div>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                      {activeTrack.title}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-lg sm:text-xl text-white font-medium leading-snug">
                  {activeTrack.headline}
                </p>

                <div className="border border-white/10 bg-black p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 font-bold mb-1.5 flex items-center gap-1.5">
                    <AlertCircle size={12} className="text-accent" />
                    <span>Where Organizations Stall Today</span>
                  </div>
                  <p className="font-sans text-sm text-white/75 leading-relaxed font-light">
                    {activeTrack.whatsBroken}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 font-bold mb-3">
                    What Build Cult Modernizes &amp; Ships
                  </div>
                  <ul className="space-y-2.5">
                    {activeTrack.whatWeShip.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-white/90 font-sans">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right 5 Cols: 30-Day Wedge & Commercial Proof */}
              <div className="lg:col-span-5 space-y-5 bg-black border border-white/15 p-6 sm:p-7">
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
                    Your 30-Day Entry Wedge
                  </div>
                  <p className="font-sans text-sm text-white/85 leading-relaxed">
                    {activeTrack.first30Days}
                  </p>
                </div>

                <div className="border-t border-white/15 pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 font-bold mb-1">
                    Verified Production Outcome
                  </div>
                  <div className="font-sans font-black text-lg uppercase tracking-tight text-white mb-1">
                    {activeTrack.proofClient}
                  </div>
                  <div className="font-mono text-xs text-accent font-bold">
                    {activeTrack.proofMetric}
                  </div>
                </div>

                <div className="border-t border-white/15 pt-5 space-y-3">
                  <Link
                    to={activeTrack.ctaTo}
                    className="w-full bg-white text-black py-3.5 px-6 font-sans font-black text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors inline-flex items-center justify-center gap-2 shadow-[4px_4px_0px_#ff3200]"
                  >
                    <span>{activeTrack.ctaLabel}</span>
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href="#contact"
                    className="w-full border border-white/25 text-white py-3 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white hover:bg-white/5 transition-colors inline-flex items-center justify-center"
                  >
                    Book Direct Scoping Call
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
