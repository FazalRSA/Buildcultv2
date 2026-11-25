import React, { useEffect, useState } from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Calendar, TrendingUp, Building2 } from 'lucide-react';

export interface ExecutiveBriefData {
  sourceLabel: string;
  defaultOrgName?: string;
  sectorOrFocus: string;
  teamOrScopeSummary: string;
  annualCurrentCost: string;
  annualProjectedSavings: string;
  reclaimableHours: string;
  estimatedPayback: string;
  readinessHeadline?: string;
  bottleneckSummary: string;
  recommendedArchitecture: string;
  provenBenchmark: string;
  deploymentRecommendation?: string;
}

interface ExecutiveRoiBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExecutiveBriefData;
}

export default function ExecutiveRoiBriefModal({
  isOpen,
  onClose,
  data
}: ExecutiveRoiBriefModalProps) {
  const [organizationName, setOrganizationName] = useState(
    data.defaultOrgName?.trim() || 'Executive Committee / Procurement Review'
  );
  const [preparedBy, setPreparedBy] = useState('Office of the CTO / Operations');

  useEffect(() => {
    if (data.defaultOrgName?.trim()) {
      setOrganizationName(data.defaultOrgName.trim());
    }
  }, [data.defaultOrgName]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('printing-executive-brief');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrintPdf = () => {
    document.body.classList.add('printing-executive-brief');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-executive-brief');
      }, 300);
    }, 50);
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="1-Page Executive ROI Brief"
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="w-full max-w-4xl bg-white text-black border-4 border-black shadow-[12px_12px_0px_#ff3200] my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Top Interactive Toolbar (Hidden in Print/PDF) */}
        <div className="no-print sticky top-0 z-20 bg-[#050505] text-white px-5 sm:px-7 py-4 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              Boardroom Business Case Ready
            </div>
            <div className="font-sans text-xs sm:text-sm text-white/80">
              Customize organization details below, then print or save directly as a 1-page PDF.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="bg-accent text-white px-5 py-2.5 font-sans font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Executive Brief"
              className="p-2.5 border border-white/25 text-white hover:border-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Optional Quick Customization Strip (Hidden in Print/PDF) */}
        <div className="no-print bg-neutral-100 border-b border-black/15 px-5 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-black/60 block mb-1">
              Prepared For (Company or Government Department)
            </label>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full bg-white border border-black/25 px-3 py-2 font-sans text-sm text-black focus:outline-none focus:border-accent"
              placeholder="e.g. Acme Financial Group"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-black/60 block mb-1">
              Executive Sponsor / Department
            </label>
            <input
              type="text"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
              className="w-full bg-white border border-black/25 px-3 py-2 font-sans text-sm text-black focus:outline-none focus:border-accent"
              placeholder="e.g. Chief Financial Officer"
            />
          </div>
        </div>

        {/* PRINTABLE 1-PAGE EXECUTIVE BRIEF SHEET */}
        <div id="executive-roi-brief-sheet" className="bg-white text-black p-6 sm:p-10 space-y-6">
          
          {/* Document Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-4 border-black pb-5">
            <div>
              <div className="font-sans font-black text-xl tracking-[0.35em] uppercase text-black mb-1">
                BUILD<span className="text-accent ml-1">CULT</span>
              </div>
              <h1 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none">
                Executive AI &amp; Automation ROI Brief
              </h1>
              <div className="font-mono text-[10px] uppercase tracking-widest text-black/60 mt-1.5">
                {data.sourceLabel} · Generated {todayFormatted}
              </div>
            </div>
            <div className="sm:text-right font-mono text-[11px] space-y-0.5">
              <div className="font-bold text-black flex sm:justify-end items-center gap-1.5">
                <Building2 size={13} className="text-accent" />
                <span>{organizationName}</span>
              </div>
              <div className="text-black/60">{preparedBy}</div>
              <div className="text-accent font-bold uppercase tracking-wider">Confidential Boardroom Draft</div>
            </div>
          </div>

          {/* 4-Column Financial Impact Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="border-2 border-black p-4 bg-neutral-50">
              <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-black/55 mb-1">
                Current Manual Cost
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl tracking-tight tabular-nums text-black">
                {data.annualCurrentCost}
              </div>
              <div className="font-mono text-[9px] text-black/55 mt-1">{data.teamOrScopeSummary}</div>
            </div>

            <div className="border-2 border-black p-4 bg-[#ff3200] text-white">
              <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-black mb-1">
                Projected Annual Recovery
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl tracking-tight tabular-nums text-white">
                {data.annualProjectedSavings}
              </div>
              <div className="font-mono text-[9px] text-white/90 mt-1">Conservative 75% target</div>
            </div>

            <div className="border-2 border-black p-4 bg-neutral-50">
              <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-black/55 mb-1">
                Capacity Reclaimed
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl tracking-tight tabular-nums text-black">
                {data.reclaimableHours}
              </div>
              <div className="font-mono text-[9px] text-black/55 mt-1">Staff reallocated to growth</div>
            </div>

            <div className="border-2 border-black p-4 bg-black text-white">
              <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-accent mb-1">
                Estimated Payback
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl tracking-tight tabular-nums text-white">
                {data.estimatedPayback}
              </div>
              <div className="font-mono text-[9px] text-white/70 mt-1">
                {data.readinessHeadline || 'Production Pilot Scope'}
              </div>
            </div>
          </div>

          {/* Diagnostic & Architecture Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-black/20 p-4">
              <div className="font-mono text-[10px] font-black uppercase tracking-widest text-black/55 mb-1.5">
                01. Target Sector &amp; Operational Friction
              </div>
              <div className="font-sans font-bold text-sm text-black mb-1">{data.sectorOrFocus}</div>
              <p className="font-sans text-xs text-black/75 leading-relaxed">
                {data.bottleneckSummary}
              </p>
            </div>

            <div className="border border-black/20 p-4 bg-neutral-50">
              <div className="font-mono text-[10px] font-black uppercase tracking-widest text-accent mb-1.5">
                02. Proposed Build Cult Architecture
              </div>
              <p className="font-sans text-xs text-black/85 leading-relaxed mb-2">
                {data.recommendedArchitecture}
              </p>
              <div className="font-mono text-[10px] text-black/65 border-t border-black/10 pt-2">
                <strong className="text-black">Benchmark Proof:</strong> {data.provenBenchmark}
              </div>
            </div>
          </div>

          {/* 90-Day Pilot Implementation Roadmap */}
          <div className="border-2 border-black p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/15">
              <div className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-2">
                <Calendar size={14} className="text-accent" />
                <span>03. 90-Day Production Pilot Roadmap</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-black/60">
                100% Client IP &amp; Code Ownership
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="font-mono text-[10px] font-black text-accent uppercase tracking-widest mb-1">
                  Days 01–14 · Systems Audit
                </div>
                <div className="font-sans font-bold text-xs text-black mb-1">
                  Architecture &amp; Data Readiness
                </div>
                <p className="font-sans text-[11px] text-black/70 leading-relaxed">
                  Map core ERP/CRM/database bottlenecks, lock POPIA &amp; security boundaries, and finalize KPI targets.
                </p>
              </div>

              <div>
                <div className="font-mono text-[10px] font-black text-accent uppercase tracking-widest mb-1">
                  Days 15–45 · Production Build
                </div>
                <div className="font-sans font-bold text-xs text-black mb-1">
                  Automated Pipeline &amp; Integration
                </div>
                <p className="font-sans text-[11px] text-black/70 leading-relaxed">
                  Embed senior engineers to ship working AI agents, deterministic validation guardrails, and live API hooks.
                </p>
              </div>

              <div>
                <div className="font-mono text-[10px] font-black text-accent uppercase tracking-widest mb-1">
                  Days 46–90 · Scale &amp; Handover
                </div>
                <div className="font-sans font-bold text-xs text-black mb-1">
                  Team Adoption &amp; Verified ROI
                </div>
                <p className="font-sans text-[11px] text-black/70 leading-relaxed">
                  Hands-on staff workshops, SOP handover, live cost-recovery telemetry, and internal team upskilling.
                </p>
              </div>
            </div>
          </div>

          {/* Security, Sovereignty & Sign-Off Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t-2 border-black text-[11px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-black/75">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={13} className="text-accent" />
                <span>{data.deploymentRecommendation || 'Private VPC or On-Premise Air-Gapped Ready'}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 size={13} className="text-accent" />
                <span>POPIA / GDPR Compliant · Zero 3rd-Party Training</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <TrendingUp size={13} className="text-accent" />
                <span>Verified Track Record: Hollywoodbets · BMW / Forged · Nova Havens</span>
              </span>
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-black shrink-0">
              buildcult.co · Direct Engineering Advisory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
