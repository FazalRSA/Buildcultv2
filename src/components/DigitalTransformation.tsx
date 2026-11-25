import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Users2, 
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import ManualLaborCalculator from './ManualLaborCalculator';
import IndustriesServed from './IndustriesServed';

const PILLARS = [
  {
    id: 'ai-audit',
    number: '01',
    title: 'AI & Automation Audit for Enterprise',
    tagline: 'A practical assessment of where AI and automation will deliver the highest return in your business.',
    icon: Cpu,
    color: '#ff3200',
    overview: 'Most enterprise AI projects stall because they start with hype instead of a clear understanding of existing systems and bottlenecks. We examine your current workflows, data pipelines, and software stack to identify high-ROI automation opportunities.',
    deliverables: [
      'System Architecture & Data Readiness Review',
      'Cost, Latency & Model Feasibility Analysis',
      'Prioritized Automation Roadmap Ranked by Business ROI',
      'Security, Data Privacy & Governance Assessment',
      'Clear 90-Day Implementation Plan'
    ],
    diagnosticSteps: [
      { step: '01', title: 'Systems & Data Review', desc: 'Mapping your existing databases, tools, APIs, and data silos.' },
      { step: '02', title: 'Bottleneck Analysis', desc: 'Identifying repetitive, high-cost manual tasks across teams.' },
      { step: '03', title: 'Technical Feasibility', desc: 'Selecting the right models and integrations for accuracy and cost efficiency.' },
      { step: '04', title: 'ROI & Rollout Plan', desc: 'Delivering a step-by-step build plan tied to measurable cost and time savings.' }
    ]
  },
  {
    id: 'change-management',
    number: '02',
    title: 'Change Management',
    tagline: 'Helping your teams adopt new tools confidently and integrate AI into their daily work.',
    icon: Users2,
    color: '#00D4FF',
    overview: 'Even the best technology fails if your staff doesn’t trust it or know how to use it. We work directly with your teams—providing hands-on training, clear operating procedures, and practical guidance so new tools actually stick.',
    deliverables: [
      'Team Alignment & Practical Onboarding Sessions',
      'Hands-On AI Tooling & Workflow Workshops',
      'Updated Standard Operating Procedures (SOPs)',
      'Internal Champion Training & Documentation',
      'Post-Launch Support & Feedback Loops'
    ],
    diagnosticSteps: [
      { step: '01', title: 'Team Assessment', desc: 'Understanding how your staff currently works and where friction exists.' },
      { step: '02', title: 'Workflow Co-Design', desc: 'Designing tools alongside the people who will use them every day.' },
      { step: '03', title: 'Guided Training', desc: 'Practical workshops using real company tasks and data—not generic slides.' },
      { step: '04', title: 'Long-Term Adoption', desc: 'Equipping internal leads to maintain and expand workflows independently.' }
    ]
  },
  {
    id: 'embedded-software',
    number: '03',
    title: 'Embedded Software Engineering',
    tagline: 'Senior engineers working directly inside your team and codebase to ship critical software.',
    icon: Terminal,
    color: '#00FF66',
    overview: 'We don’t just hand over a recommendation deck and walk away. Our senior engineers join your repositories, sprint cycles, and engineering channels to build production software alongside your internal team.',
    deliverables: [
      'Scalable Backend & Microservices Architecture',
      'Legacy System Modernization (TypeScript, Python, Go, Rust)',
      'Real-Time Telemetry & High-Volume Data Pipelines',
      'Embedded Hardware & Edge Sensor Integrations',
      'Code Reviews, Pair Programming & Technical Mentorship'
    ],
    diagnosticSteps: [
      { step: '01', title: 'Codebase Onboarding', desc: 'Reviewing your current architecture, repositories, and deployment pipelines.' },
      { step: '02', title: 'Team Integration', desc: 'Joining your sprint cadence and working directly with your product and tech leads.' },
      { step: '03', title: 'Production Delivery', desc: 'Shipping clean, well-tested features and modernizing bottlenecks without downtime.' },
      { step: '04', title: 'Handover & Upskilling', desc: 'Documenting systems thoroughly and elevating internal engineering standards.' }
    ]
  },
  {
    id: 'automations',
    number: '04',
    title: 'Automations',
    tagline: 'Reliable automated workflows that eliminate repetitive manual tasks across your organization.',
    icon: Zap,
    color: '#FF00FF',
    overview: 'Replace error-prone spreadsheets, manual data entry, and disconnected tools with dependable automated pipelines. From customer onboarding to financial reconciliation, we build systems that run smoothly in the background.',
    deliverables: [
      'Custom AI Agent & Workflow Orchestration',
      'Two-Way ERP, CRM & Accounting System Integrations',
      'Automated Document Extraction & Validation',
      'Real-Time Anomaly & Error Alerting',
      'Human-in-the-Loop Review Interfaces for Edge Cases'
    ],
    diagnosticSteps: [
      { step: '01', title: 'Process Mapping', desc: 'Documenting every trigger, rule, and exception in your current manual process.' },
      { step: '02', title: 'Pipeline Engineering', desc: 'Building reliable integrations with automatic retries and error handling.' },
      { step: '03', title: 'Validation & Guardrails', desc: 'Ensuring data accuracy with strict validation rules and human review checkpoints.' },
      { step: '04', title: 'Go-Live & Monitoring', desc: 'Deploying into production with clear dashboards to track time and cost savings.' }
    ]
  }
];

const AUDIT_METRICS = [
  { value: '3.8x', label: 'Efficiency Gain', sub: 'Average workflow speed increase' },
  { value: '75%', label: 'Manual Work Reduced', sub: 'Repetitive hours automated' },
  { value: '< 90', label: 'Days to Production', sub: 'From initial audit to live system' },
  { value: '100%', label: 'IP & Code Ownership', sub: 'Built in your repositories' }
];

export default function DigitalTransformation() {
  const [activePillar, setActivePillar] = useState<string>('ai-audit');
  const [auditScope, setAuditScope] = useState({
    companySize: '100-500 employees',
    primaryFriction: 'Manual Data & Reporting',
    timeline: 'Immediate (< 30 days)'
  });
  const [requestSent, setRequestSent] = useState(false);

  const currentPillar = PILLARS.find(p => p.id === activePillar) || PILLARS[0];

  const handleAuditRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white text-white relative overflow-hidden">
      <div className="atmosphere" />
      <div className="fixed inset-0 custom-grid opacity-20 pointer-events-none z-0" />
      
      <Navigation />

      <main className="pt-28 sm:pt-36 lg:pt-44 relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 mb-6 sm:mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                ENTERPRISE MODERNIZATION
              </span>
            </div>

            <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.88] mb-8 sm:mb-10">
              DIGITAL <br />
              <span className="text-white/20">TRANSFOR</span>
              <span className="text-accent">MATION</span>
            </h1>

            <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed font-light mb-10">
              We don't sell 150-page slide decks that sit on a shelf. We audit your systems, automate repetitive operations, embed senior engineers into your team, and help your staff adopt modern tools with confidence.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-white/10 py-8">
              {AUDIT_METRICS.map((metric, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-4 sm:pl-6">
                  <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">{metric.value}</div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/90 font-bold uppercase tracking-wider">{metric.label}</div>
                  <div className="font-mono text-[9px] text-white/40 uppercase">{metric.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE 4 PILLARS SECTION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-32 lg:mb-40">
          <div className="mb-12">
            <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] block mb-3">
              CORE CAPABILITIES
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter">
              HOW WE TRANSFORM OPERATIONS
            </h2>
          </div>

          {/* Pillar Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`text-left p-5 sm:p-6 border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white text-black border-white shadow-[6px_6px_0px_#ff3200]' 
                      : 'bg-white/[0.02] text-white border-white/10 hover:border-white/40'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`font-mono text-xs font-black tracking-widest ${isSelected ? 'text-accent' : 'text-white/40'}`}>
                        {pillar.number}
                      </span>
                      <Icon size={20} className={isSelected ? 'text-black' : 'text-white/50'} />
                    </div>
                    <div className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight leading-snug">
                      {pillar.title}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-current/10 font-mono text-[10px] uppercase tracking-widest opacity-60">
                    {isSelected ? 'SELECTED' : 'VIEW DETAILS'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep-Dive Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="border-2 sm:border-4 border-white bg-black p-6 sm:p-10 lg:p-12 shadow-[10px_10px_0px_rgba(255,255,255,0.1)] relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                
                {/* Left Column: Scope & Overview */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4 font-mono text-[10px] uppercase tracking-widest text-accent">
                    CAPABILITY // {currentPillar.number}
                  </div>
                  
                  <h3 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight mb-4">
                    {currentPillar.title}
                  </h3>
                  
                  <p className="font-sans text-sm sm:text-base text-accent font-medium mb-6">
                    {currentPillar.tagline}
                  </p>
                  
                  <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed font-light mb-8">
                    {currentPillar.overview}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                      Key Deliverables:
                    </div>
                    {currentPillar.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-sm sm:text-base text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: 4-Step Delivery Process */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-6 sm:p-8">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 mb-6 font-bold pb-3 border-b border-white/10">
                    HOW WE DELIVER IT
                  </div>
                  
                  <div className="space-y-6">
                    {currentPillar.diagnosticSteps.map((stepItem, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="font-mono text-sm font-black text-accent bg-accent/10 border border-accent/20 px-2 py-1 h-fit">
                          {stepItem.step}
                        </span>
                        <div>
                          <div className="font-sans font-bold text-sm uppercase tracking-wide text-white mb-1">
                            {stepItem.title}
                          </div>
                          <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                            {stepItem.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href="#audit-tool"
                      className="w-full bg-accent text-white py-3.5 px-4 font-sans font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors"
                    >
                      <span>Enquire About This Service</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* TRADITIONAL CONSULTING VS BUILD CULT */}
        <section className="bg-white text-black py-16 sm:py-24 lg:py-32 mb-20 sm:mb-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] text-accent block mb-3">
                WHY WORK WITH US
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-tight mb-4">
                TRADITIONAL CONSULTING <br />
                <span className="text-black/40">VS. BUILD CULT</span>
              </h2>
              <p className="font-sans text-lg text-black/80 font-normal">
                Traditional advisories bill you for months of discovery meetings and strategy decks. We focus on building working software and automating real bottlenecks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Legacy Way */}
              <div className="border-2 border-black/20 p-6 sm:p-10 bg-black/[0.02]">
                <div className="font-mono text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-red-600" />
                  <span>Traditional Consultancies</span>
                </div>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-6">
                  Theory Without Execution
                </h3>
                <ul className="space-y-4 font-sans text-sm text-black/75">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✕</span> Junior analysts following generic templates with no production code experience.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✕</span> Months spent in discovery workshops before a single line of code is written.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✕</span> High-level recommendations to "use AI" without solving data or integration hurdles.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✕</span> No hands-on support for internal team training or long-term adoption.
                  </li>
                </ul>
              </div>

              {/* Build Cult Way */}
              <div className="border-4 border-black p-6 sm:p-10 bg-accent text-white shadow-[10px_10px_0px_#000000]">
                <div className="font-mono text-xs uppercase tracking-widest text-black/80 font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-black" />
                  <span>The Build Cult Approach</span>
                </div>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-6 text-white">
                  Senior Engineers Shipping Systems
                </h3>
                <ul className="space-y-4 font-sans text-sm text-white/95">
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold">✓</span> Senior architects who have built and scaled high-volume enterprise platforms.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold">✓</span> Working prototypes and initial automations delivered within the first few weeks.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold">✓</span> Clear cost-benefit analysis and honest advice on where AI is—and isn't—needed.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold">✓</span> Practical change management and training so your team gets immediate value.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES & GOVERNMENT DEPARTMENTS SERVED */}
        <IndustriesServed compact={true} />

        {/* MANUAL LABOR & PAYROLL BLEED CALCULATOR */}
        <ManualLaborCalculator />

        {/* INTERACTIVE AUDIT SCOPING TOOL */}
        <section id="audit-tool" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-28 sm:pb-36">
          <div className="border-2 sm:border-4 border-accent bg-black p-6 sm:p-12 lg:p-16 shadow-[12px_12px_0px_rgba(255,50,0,0.2)]">
            <div className="max-w-3xl mb-10">
              <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.4em] block mb-3">
                BOOK A CONSULTATION
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight mb-4">
                SCHEDULE A TRANSFORMATION AUDIT
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
                Tell us a bit about your organization and current bottlenecks. Our engineering leads will review your details and get in touch to schedule an initial review.
              </p>
            </div>

            <form onSubmit={handleAuditRequest} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Size */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Company Size</label>
                  <select
                    value={auditScope.companySize}
                    onChange={(e) => setAuditScope({ ...auditScope, companySize: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="1-50 employees">1 – 50 Employees</option>
                    <option value="100-500 employees">Mid-Market (50 – 500 Employees)</option>
                    <option value="500-2000 employees">Enterprise (500 – 2,000 Employees)</option>
                    <option value="2000+ employees">Large Enterprise (2,000+ Employees)</option>
                    <option value="Government / Public Sector">Government Department / Public Sector Agency</option>
                  </select>
                </div>

                {/* Primary Friction */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Primary Focus Area</label>
                  <select
                    value={auditScope.primaryFriction}
                    onChange={(e) => setAuditScope({ ...auditScope, primaryFriction: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="Manual Data & Reporting">AI & Automation Audit</option>
                    <option value="Employee Resistance">Change Management & Team Training</option>
                    <option value="Legacy Monolith Bottlenecks">Embedded Software Engineering</option>
                    <option value="Customer Support Ops">Workflow & Back-Office Automations</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Target Timeline</label>
                  <select
                    value={auditScope.timeline}
                    onChange={(e) => setAuditScope({ ...auditScope, timeline: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="Immediate (< 30 days)">Immediately (&lt; 30 Days)</option>
                    <option value="Next Quarter (Q+1)">Next Quarter</option>
                    <option value="Discovery Phase Only">Exploring Options</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2">Your Name & Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe — Acme Corp"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  STRICT CONFIDENTIALITY // NDA AVAILABLE ON REQUEST
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-accent text-white px-10 py-4 font-sans font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff]"
                >
                  <span>Request Consultation</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {requestSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/10 border border-accent text-accent font-mono text-xs flex items-center gap-3"
                >
                  <Check size={16} />
                  <span>Thank you. Our engineering team has received your request and will be in touch within one business day.</span>
                </motion.div>
              )}
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
