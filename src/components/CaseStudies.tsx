import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame, 
  Gauge, 
  Cpu, 
  ArrowRight,
  BarChart3,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
  sub: string;
}

interface ClientCaseStudy {
  id: string;
  projectSlug: string;
  client: string;
  badge: string;
  sector: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headlineRoi: string;
  headlineLabel: string;
  paybackPeriod: string;
  summary: string;
  challenge: string;
  solution: string;
  beforeMetric: string;
  afterMetric: string;
  metrics: MetricItem[];
  capabilities: string[];
  quote: string;
  quoteAuthor: string;
}

const AGGREGATE_SUCCESS_METRICS = [
  {
    value: '4.2x',
    label: 'Average First-Year ROI',
    detail: 'Verified commercial return across production AI, GTM, and automation deployments'
  },
  {
    value: '10M+',
    label: 'Daily Transactions Scored',
    detail: 'High-concurrency production pipelines operating at sub-12ms p99 inference latency'
  },
  {
    value: '79%',
    label: 'Manual Labor Eliminated',
    detail: 'Average reduction in repetitive data entry, quoting, compliance, and reconciliation'
  },
  {
    value: '< 60 Days',
    label: 'Time to Production ROI',
    detail: 'From initial systems audit to live software generating measurable financial return'
  }
];

const FEATURED_CASE_STUDIES: ClientCaseStudy[] = [
  {
    id: '01',
    projectSlug: 'hollywoodbets',
    client: 'HOLLYWOODBETS',
    badge: 'AFRICA’S LARGEST ONLINE CASINO & SPORTSBOOK',
    sector: 'Online Gaming, High-Frequency Risk & AI Engineering',
    accentColor: '#FF3200',
    image: '/src/assets/images/iso_hollywoodbets_ai_1795560789822.jpg',
    imageAlt: 'Abstract isometric matrix representing real-time AI fraud scoring and 10M+ daily transactions',
    icon: Flame,
    headlineRoi: '4.6x ROI',
    headlineLabel: 'First-Year Return on AI & Real-Time Risk Systems',
    paybackPeriod: '11 Weeks to Full Payback',
    summary:
      'Led AI systems engineering and embedded senior specialists to build real-time fraud detection, automated KYC verification, and predictive player retention engines handling over 10 million daily transactions.',
    challenge:
      'Matchday traffic spikes generated millions of concurrent bets and payout requests. Legacy rule-based checks couldn’t catch coordinated bonus abuse in real time, and manual KYC document reviews created onboarding bottlenecks.',
    solution:
      'Engineered a streaming AI inference pipeline (<12ms latency) for real-time syndicate and anomaly scoring, deployed automated computer-vision KYC document extraction, and integrated predictive churn models directly into the core sportsbook.',
    beforeMetric: 'Multi-hour manual KYC queues & static rule-based fraud checks during peak traffic',
    afterMetric: 'Sub-12ms automated risk scoring across 10M+ daily transactions with 78% zero-touch KYC',
    metrics: [
      { value: '10M+', label: 'Daily Transactions', sub: 'Scored in real time (<12ms)' },
      { value: '-42%', label: 'Fraud & Bonus Abuse', sub: 'Syndicate anomaly reduction' },
      { value: '78%', label: 'KYC & Support Automated', sub: 'Zero-touch player verification' },
      { value: '+24%', label: 'Player Retention Lift', sub: 'Predictive lifecycle models' }
    ],
    capabilities: [
      'Production AI Architecture',
      'Sub-12ms Streaming Inference',
      'Automated KYC / AML Vision',
      'Embedded Senior AI Squad'
    ],
    quote:
      'Build Cult didn’t deliver theoretical slides—they embedded directly into our engineering stack and shipped production AI models that handle millions of daily transactions without flinching.',
    quoteAuthor: 'Enterprise Platform & AI Leadership — Gaming Operations'
  },
  {
    id: '02',
    projectSlug: 'bmw-forged',
    client: 'BMW / FORGED',
    badge: 'PERFORMANCE MOTORING & AUTOMOTIVE ENGINEERING',
    sector: 'Performance Automotive, 3D Commerce & Telemetry',
    accentColor: '#00D4FF',
    image: '/src/assets/images/iso_bmw_forged_1795560789998.jpg',
    imageAlt: 'Abstract isometric exploded automotive engineering and telemetry layers for BMW Forged',
    icon: Gauge,
    headlineRoi: '3.8x ROI',
    headlineLabel: 'Commercial Return via 3D Build Configurator & Telemetry',
    paybackPeriod: '8 Weeks to Full Payback',
    summary:
      'Technology partner for performance motoring—combining a 60fps 3D spatial vehicle and forged-parts configurator, real-time ECU/dyno telemetry ingestion, and automated GTM quoting pipelines.',
    challenge:
      'Quoting bespoke performance builds and verifying forged component compatibility required 48+ hours of manual engineering consultation, spreadsheet BOM lookups, and disconnected vehicle telemetry analysis.',
    solution:
      'Built an interactive browser-native 3D configurator connected to live warehouse inventory and compatibility rules, paired with a low-latency (<5ms) vehicle telemetry dashboard and automated CRM build-sheet routing.',
    beforeMetric: '48+ hour manual build quoting via PDFs & disconnected dyno telemetry logs',
    afterMetric: 'Instant 3D spatial configuration, automated BOM pricing & <5ms live telemetry streams',
    metrics: [
      { value: '+285%', label: 'Build Conversion Lift', sub: 'High-ticket custom orders' },
      { value: '<5ms', label: 'Telemetry Latency', sub: 'Real-time vehicle & dyno data' },
      { value: '68%', label: 'Quoting Hours Saved', sub: 'Automated BOM & fitment rules' },
      { value: '3.4x', label: 'GTM Pipeline Velocity', sub: 'Pre-qualified buyer routing' }
    ],
    capabilities: [
      '3D Spatial WebGL Studio',
      'Real-Time Vehicle Telemetry',
      'GTM & Quoting Automation',
      'ERP & Inventory Sync'
    ],
    quote:
      'Having one technical partner handle our 3D spatial vehicle configurator, live performance telemetry, and automated sales pipeline transformed how fast we close custom builds.',
    quoteAuthor: 'Technical & Commercial Operations — Performance Motoring'
  },
  {
    id: '03',
    projectSlug: 'nova-havens',
    client: 'NOVA HAVENS',
    badge: 'PORTFOLIO OPERATIONS & ENTERPRISE AUTOMATION',
    sector: 'Enterprise Operations, Multi-Agent Workflows & RevOps',
    accentColor: '#00FF66',
    image: '/src/assets/images/iso_nova_havens_1795560789183.jpg',
    imageAlt: 'Abstract isometric workflow gate turning chaotic blocks into aligned order for Nova Havens',
    icon: Cpu,
    headlineRoi: '81% SAVED',
    headlineLabel: 'Manual Administration Eliminated & $420k/yr Recovered',
    paybackPeriod: '6 Weeks to Full Payback',
    summary:
      'Conducted a comprehensive enterprise AI audit and engineered an autonomous multi-agent back office that eliminated 81% of repetitive document processing, reconciliation, and client onboarding labor.',
    challenge:
      'Operations and finance teams spent over 30 hours per week per department manually copying data across PDFs, emails, spreadsheets, CRM records, and accounting ledgers—slowing client onboarding to 5+ days.',
    solution:
      'Deployed deterministic AI document agents with human-in-the-loop guardrails, two-way CRM and ERP ledger synchronization, automated contract generation, and hands-on team change management.',
    beforeMetric: '5-day manual onboarding turnaround & 1,200+ monthly hours lost to spreadsheet entry',
    afterMetric: '2-hour automated onboarding & 99.4% zero-touch financial ledger reconciliation',
    metrics: [
      { value: '81%', label: 'Manual Admin Cut', sub: 'End-to-end workflow automation' },
      { value: '$420k+', label: 'Annual Cost Saved', sub: 'Recovered operational payroll' },
      { value: '4.8x', label: 'Faster Onboarding', sub: 'Cut from 5 days to under 2 hours' },
      { value: '99.4%', label: 'Reconciliation Accuracy', sub: 'Two-way CRM & ERP sync' }
    ],
    capabilities: [
      'AI & Automation Audit',
      'Multi-Agent Document Ops',
      'Two-Way CRM / ERP Sync',
      'Team Change Management'
    ],
    quote:
      'Within 60 days of the initial audit, Build Cult automated the repetitive administrative bottlenecks that had been holding our operations team hostage for years.',
    quoteAuthor: 'Operations & Executive Leadership — Nova Havens'
  }
];

export default function CaseStudies() {
  const [activeTabByCard, setActiveTabByCard] = useState<Record<string, 'metrics' | 'breakdown'>>({
    '01': 'metrics',
    '02': 'metrics',
    '03': 'metrics'
  });

  const toggleCardTab = (id: string, tab: 'metrics' | 'breakdown') => {
    setActiveTabByCard((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="case-studies" className="py-20 sm:py-28 lg:py-36 bg-[#070707] border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 custom-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 mb-5">
              <TrendingUp size={14} className="text-accent" />
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                VERIFIED CLIENT OUTCOMES & COMMERCIAL ROI
              </span>
            </div>

            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.88]">
              CUSTOMER <br />
              <span className="text-white/25">CASE</span>{' '}
              <span className="text-accent">STUDIES</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light mb-4">
              We measure every engagement by production uptime, hours recovered, pipeline generated, and audited financial return. Here is how we delivered measurable ROI for industry leaders.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
              <ShieldCheck size={14} />
              <span>PRODUCTION SYSTEMS • AUDITED METRICS</span>
            </div>
          </div>
        </div>

        {/* AGGREGATE SUCCESS METRICS BAR */}
        <div className="mb-16 sm:mb-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={13} className="text-accent" />
            <span>BENCHMARK SUCCESS METRICS ACROSS CLIENT DEPLOYMENTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {AGGREGATE_SUCCESS_METRICS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white text-black border-2 sm:border-4 border-black p-6 shadow-[6px_6px_0px_#ff3200] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5">
                      METRIC 0{idx + 1}
                    </span>
                    <TrendingUp size={16} className="text-accent" />
                  </div>
                  <div className="font-sans font-black text-4xl sm:text-5xl tracking-tighter text-black leading-none mb-2">
                    {item.value}
                  </div>
                  <div className="font-sans font-black text-xs sm:text-sm uppercase tracking-tight text-accent mb-2">
                    {item.label}
                  </div>
                </div>
                <p className="font-sans text-xs text-black/70 leading-relaxed pt-3 border-t border-black/10">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FEATURED 3-COLUMN NEOBRUTALIST CASE STUDY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {FEATURED_CASE_STUDIES.map((study, index) => {
            const Icon = study.icon;
            const activeTab = activeTabByCard[study.id] || 'metrics';

            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group pb-3 pr-3 flex flex-col"
              >
                {/* Hard Neobrutalist Offset Shadow */}
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 border-2 sm:border-4 border-black z-0 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
                  style={{ backgroundColor: study.accentColor }}
                />

                {/* Card Surface */}
                <div className="relative z-10 bg-[#111111] border-2 sm:border-4 border-white text-white flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Top Bar: Client ID & Sector Badge */}
                  <div>
                    <div className="p-6 sm:p-7 border-b-2 border-white/15 bg-black">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className="font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 text-black"
                          style={{ backgroundColor: study.accentColor }}
                        >
                          CASE STUDY // {study.id}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 border border-white/15 px-2.5 py-1">
                          {study.paybackPeriod}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1">
                            {study.badge}
                          </div>
                          <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tighter text-white leading-none">
                            {study.client}
                          </h3>
                        </div>
                        <div
                          className="w-11 h-11 border-2 border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0"
                          style={{ color: study.accentColor }}
                        >
                          <Icon size={22} />
                        </div>
                      </div>

                      <p className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                        {study.sector}
                      </p>
                    </div>

                    {/* Abstract Isometric Concept Visual */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-white/15 bg-[#0a0a0a]">
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Primary Headline ROI Callout Box */}
                    <div
                      className="px-6 py-5 border-b-2 border-black text-black flex items-center justify-between"
                      style={{ backgroundColor: study.accentColor }}
                    >
                      <div>
                        <div className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-black/70">
                          PRIMARY AUDITED OUTCOME
                        </div>
                        <div className="font-sans font-black text-3xl sm:text-4xl tracking-tighter uppercase leading-none mt-0.5">
                          {study.headlineRoi}
                        </div>
                        <div className="font-sans text-xs font-bold text-black/85 mt-1">
                          {study.headlineLabel}
                        </div>
                      </div>
                      <TrendingUp size={28} className="text-black flex-shrink-0" />
                    </div>

                    {/* View Toggle Tabs (ROI Metrics vs Architecture & Challenge) */}
                    <div className="grid grid-cols-2 border-b border-white/15 bg-black/60 font-mono text-[10px] uppercase tracking-widest font-bold">
                      <button
                        type="button"
                        onClick={() => toggleCardTab(study.id, 'metrics')}
                        className={`py-3 px-4 text-center transition-colors border-r border-white/15 ${
                          activeTab === 'metrics'
                            ? 'bg-white text-black font-black'
                            : 'text-white/50 hover:text-white'
                        }`}
                      >
                        01. ROI Metrics
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCardTab(study.id, 'breakdown')}
                        className={`py-3 px-4 text-center transition-colors ${
                          activeTab === 'breakdown'
                            ? 'bg-white text-black font-black'
                            : 'text-white/50 hover:text-white'
                        }`}
                      >
                        02. System Breakdown
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      <AnimatePresence mode="wait">
                        {activeTab === 'metrics' ? (
                          <motion.div
                            key="metrics"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                              {study.summary}
                            </p>

                            {/* 2x2 Specific ROI Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                              {study.metrics.map((metric, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="bg-black border border-white/15 p-3.5 hover:border-white/40 transition-colors"
                                >
                                  <div
                                    className="font-sans font-black text-2xl sm:text-3xl tracking-tighter leading-none mb-1"
                                    style={{ color: study.accentColor }}
                                  >
                                    {metric.value}
                                  </div>
                                  <div className="font-sans font-bold text-[11px] uppercase tracking-tight text-white mb-0.5">
                                    {metric.label}
                                  </div>
                                  <div className="font-mono text-[9px] text-white/45 leading-tight">
                                    {metric.sub}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Before vs After Strip */}
                            <div className="space-y-2.5 bg-black/70 border border-white/10 p-4 mb-6">
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 font-bold block">
                                  BEFORE:
                                </span>
                                <span className="font-sans text-xs text-white/65 leading-snug">
                                  {study.beforeMetric}
                                </span>
                              </div>
                              <div className="pt-2 border-t border-white/10">
                                <span
                                  className="font-mono text-[9px] uppercase tracking-widest font-bold block"
                                  style={{ color: study.accentColor }}
                                >
                                  AFTER BUILD CULT:
                                </span>
                                <span className="font-sans text-xs text-white font-medium leading-snug">
                                  {study.afterMetric}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="breakdown"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4 mb-6"
                          >
                            <div className="bg-black border border-white/15 p-4">
                              <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">
                                THE BOTTLENECK
                              </div>
                              <p className="font-sans text-xs text-white/75 leading-relaxed">
                                {study.challenge}
                              </p>
                            </div>

                            <div className="bg-black border border-white/25 p-4">
                              <div
                                className="font-mono text-[9px] uppercase tracking-widest font-bold mb-1"
                                style={{ color: study.accentColor }}
                              >
                                PRODUCTION ARCHITECTURE DEPLOYED
                              </div>
                              <p className="font-sans text-xs text-white/90 leading-relaxed">
                                {study.solution}
                              </p>
                            </div>

                            <div className="border-l-2 pl-3.5 py-1" style={{ borderColor: study.accentColor }}>
                              <p className="font-sans text-xs italic text-white/80 leading-relaxed mb-1">
                                "{study.quote}"
                              </p>
                              <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                                — {study.quoteAuthor}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Capabilities Tags */}
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 font-bold mb-2 flex items-center gap-1.5">
                          <Layers size={11} />
                          <span>DELIVERED CAPABILITIES</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {study.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 bg-white/[0.04] border border-white/15 text-white/80 flex items-center gap-1"
                            >
                              <CheckCircle2 size={10} style={{ color: study.accentColor }} />
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 py-4 bg-black border-t-2 border-white/15 flex items-center justify-between gap-4">
                    <Link
                      to={`/project/${study.projectSlug}`}
                      className="font-sans font-black text-xs uppercase tracking-[0.2em] text-white hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <span>READ FULL CASE STUDY</span>
                      <ArrowUpRight size={15} className="text-accent" />
                    </Link>

                    <Link
                      to="/audit"
                      className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                    >
                      AUDIT SIMILAR →
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="mt-16 sm:mt-20 border-2 sm:border-4 border-white bg-black p-6 sm:p-10 shadow-[8px_8px_0px_#ff3200] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-2">
              READY FOR MEASURABLE COMMERCIAL RETURN?
            </div>
            <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              BENCHMARK YOUR POTENTIAL ROI BEFORE COMMITTING TO A BUILD
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/65 mt-1 max-w-2xl">
              Run our interactive 60-second AI & Automation Readiness Audit or calculate your current manual payroll overhead to see where we can deliver immediate impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-shrink-0">
            <Link
              to="/audit"
              className="bg-accent text-white px-7 py-4 font-sans font-black text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_#ffffff]"
            >
              <span>Start Readiness Audit</span>
              <ArrowRight size={15} />
            </Link>
            <a
              href="#contact"
              className="border-2 border-white/30 text-white px-7 py-4 font-sans font-black text-xs uppercase tracking-[0.25em] hover:border-white hover:bg-white/5 transition-all flex items-center justify-center"
            >
              Book Engineering Call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
