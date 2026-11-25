import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Building2, Landmark, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import IndustriesServed, { INDUSTRIES_LIST } from './IndustriesServed';

const ENGAGEMENT_TIERS = [
  {
    title: 'Mid-Market Growth Companies',
    scale: '50 – 500 Employees',
    icon: Cpu,
    focus: 'Rapid workflow automation, AI-powered GTM engines, 3D digital flagships, and embedded product engineering squads that accelerate revenue without bloating headcount.',
    deliverables: '2–6 Week Production Sprints · Turnkey GTM & RevOps · Embedded Engineers'
  },
  {
    title: 'Enterprise & Industry Incumbents',
    scale: '500 – 10,000+ Employees',
    icon: Building2,
    focus: 'Legacy ERP and core database integration, multi-department automation audits, staff change management, and high-concurrency production AI infrastructure.',
    deliverables: 'Enterprise AI Audits · Legacy Modernization · Internal Team Training'
  },
  {
    title: 'Government Departments & Public Sector',
    scale: 'Ministries, Agencies & Parastatals',
    icon: Landmark,
    focus: 'Secure, sovereign, and air-gapped AI deployments, citizen service digitization, automated document and tax compliance, and national infrastructure telemetry.',
    deliverables: 'On-Premise Sovereign AI · Citizen Portals · High-Security Data Pipelines'
  }
];

export default function IndustriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white text-white relative overflow-hidden">
      <div className="atmosphere" />
      <div className="fixed inset-0 custom-grid opacity-20 pointer-events-none z-0" />

      <Navigation />

      <main className="pt-28 sm:pt-36 lg:pt-44 relative z-10">
        
        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.3em] block mb-4">
              SECTOR SPECIALIZATION // {INDUSTRIES_LIST.length} VERTICALS
            </span>
            <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter leading-[0.88] mb-8">
              INDUSTRIES & <br />
              <span className="text-white/20">PUBLIC</span> <span className="text-accent">SECTOR</span>
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/80 max-w-4xl leading-relaxed font-light mb-12">
              Every industry has its own regulatory constraints, legacy software bottlenecks, and commercial realities. We bring hands-on production experience across mid-market challengers, multinational enterprises, and national government departments.
            </p>

            {/* 3 Tier Cards: Mid-Market, Enterprise, Government */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ENGAGEMENT_TIERS.map((tier, idx) => {
                const Icon = tier.icon;
                return (
                  <div key={idx} className="border-2 border-white/15 bg-white/[0.02] p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                          {tier.scale}
                        </span>
                        <Icon size={22} className="text-white/60" />
                      </div>
                      <h2 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-3">
                        {tier.title}
                      </h2>
                      <p className="font-sans text-sm text-white/70 font-light leading-relaxed mb-6">
                        {tier.focus}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/80">
                      {tier.deliverables}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Full Searchable & Filterable Directory of 28 Industries */}
        <IndustriesServed compact={false} />

        {/* Security, Sovereign AI & Enterprise Compliance Section */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 sm:py-28">
          <div className="border-2 sm:border-4 border-white bg-black p-6 sm:p-12 lg:p-16 shadow-[12px_12px_0px_#ff3200]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 font-mono text-xs text-accent font-bold uppercase tracking-widest mb-3">
                  <ShieldCheck size={16} />
                  <span>ENTERPRISE & GOVERNMENT GRADE SECURITY</span>
                </div>
                <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
                  SOVEREIGN DATA, ON-PREMISE AI & FULL COMPLIANCE
                </h2>
                <p className="font-sans text-base sm:text-lg text-white/75 font-light leading-relaxed mb-6">
                  For regulated financial institutions, healthcare providers, and government departments, sending sensitive citizen or corporate data to public third-party APIs is not an option. We deploy private, self-hosted open-weights models inside your own VPC or on-premise data centers with complete audit trails and zero data leakage.
                </p>
                <div className="font-mono text-xs text-white/60">
                  Private VPC & Air-Gapped Deployments · Role-Based Access Control · Full Code & IP Ownership
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-4">
                <Link
                  to="/audit"
                  className="w-full bg-accent text-white py-4 px-6 font-sans font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff]"
                >
                  <span>Start Readiness Assessment</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="/#contact"
                  className="w-full border-2 border-white text-white py-4 px-6 font-sans font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-white hover:text-black transition-all text-center"
                >
                  Speak With an Architect
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
