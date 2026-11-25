import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import AiReadinessAudit from './AiReadinessAudit';
import DataSovereigntyToggle from './DataSovereigntyToggle';
import { ShieldCheck, FileText, Cpu, TrendingUp } from 'lucide-react';

const AUDIT_DELIVERABLES = [
  {
    index: '01',
    title: 'Quantified Payroll & Revenue Case',
    desc: 'Exact annual cost bleed, recoverable engineering/ops hours, and payback horizon calculated for ExCo and CFO sign-off.',
    icon: TrendingUp
  },
  {
    index: '02',
    title: '4-Layer Target Architecture Stack',
    desc: 'Non-invasive integration blueprint covering legacy ERPs/CRMs, deterministic guardrails, AI agents, and user-facing/GTM outputs.',
    icon: Cpu
  },
  {
    index: '03',
    title: 'POPIA & Sovereignty Verification',
    desc: 'Deployment boundary recommendation across Private Cloud VPC, On-Premise Air-Gapped, or Hybrid Sovereign Mesh.',
    icon: ShieldCheck
  },
  {
    index: '04',
    title: '1-Page Boardroom PDF Brief',
    desc: 'Instant print-ready executive dossier with a 30-day entry wedge and 90-day pilot roadmap ready to forward to procurement.',
    icon: FileText
  }
];

export default function AuditPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white text-white relative overflow-hidden">
      <div className="atmosphere" />
      <div className="fixed inset-0 custom-grid opacity-20 pointer-events-none z-0" />

      <Navigation />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* Executive Framing Strip */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <div className="border-2 border-white/20 bg-[#09090c] p-6 sm:p-8">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">
              What You Receive From This Diagnostic
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AUDIT_DELIVERABLES.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.index} className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-accent text-white flex items-center justify-center shrink-0">
                        <Icon size={15} />
                      </div>
                      <span className="font-mono text-xs font-black text-white/50">
                        {item.index}
                      </span>
                    </div>
                    <h3 className="font-sans font-black text-sm sm:text-base uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-Stage Interactive Technical & Commercial Audit Flow */}
        <AiReadinessAudit />

        {/* Data Sovereignty & Compliance Selector for Enterprise & Government Review */}
        <DataSovereigntyToggle />
      </main>

      <Footer />
    </div>
  );
}
