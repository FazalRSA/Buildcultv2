import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  FileText,
  ShieldCheck,
  Layers,
  Cpu,
  TrendingUp,
  RotateCcw,
  Copy,
  Sliders,
  Building2
} from 'lucide-react';
import ExecutiveRoiBriefModal from './ExecutiveRoiBriefModal';

export interface AuditState {
  industrySector: string;
  primaryLane: string;
  secondaryChallenges: string[];
  coreSystems: string[];
  dataMaturity: string;
  sovereigntyPosture: string;
  impactedStaffCount: number;
  weeklyManualHoursPerPerson: number;
  avgAnnualSalaryUsd: number;
  internalTalent: string;
  budgetTier: string;
  timeline: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  decisionRole: string;
  projectNotes: string;
}

const INDUSTRY_SECTORS = [
  {
    id: 'fintech-gaming',
    label: 'Financial Services, Banking, Insurance & Gaming',
    benchmark: 'Hollywoodbets: 4.6x first-year ROI scoring 10M+ daily transactions with -42% fraud loss.',
    defaultSovereignty: 'popia-vpc'
  },
  {
    id: 'auto-manufacturing',
    label: 'Automotive, Manufacturing, Industrial & Supply Chain',
    benchmark: 'BMW / Forged: 3.8x ROI and +285% high-ticket build conversions via 60fps 3D configurator & automated BOM quoting.',
    defaultSovereignty: 'popia-vpc'
  },
  {
    id: 'proptech-enterprise',
    label: 'Real Estate, PropTech, Legal & Asset Management',
    benchmark: 'Nova Havens: 81% reduction in manual document administration and 3.4x faster portfolio closing.',
    defaultSovereignty: 'popia-vpc'
  },
  {
    id: 'public-sector',
    label: 'Government Department, Municipality & Public Infrastructure',
    benchmark: 'Public Sector Benchmark: 89% faster citizen case triage with 100% air-gapped POPIA data residency.',
    defaultSovereignty: 'air-gapped'
  },
  {
    id: 'healthcare-energy',
    label: 'Healthcare, Biotech, Telecommunications & Energy Utilities',
    benchmark: 'Enterprise Benchmark: 76% reduction in compliance reconciliation cycles across legacy ERP systems.',
    defaultSovereignty: 'hybrid-sovereign'
  },
  {
    id: 'b2b-commercial',
    label: 'B2B Commerce, Logistics, Retail & Multi-Brand Groups',
    benchmark: 'Commercial Benchmark: 3.4x pipeline velocity and automated quoting in under 10 seconds.',
    defaultSovereignty: 'popia-vpc'
  }
];

const MODERNIZATION_LANES = [
  {
    id: 'core-ai-ops',
    title: 'Core AI & Operational Automations',
    tag: 'BACK-OFFICE AUTOMATION',
    impactScore: 28,
    recoveryRate: 0.78,
    desc: 'Eliminate manual document triage, KYC/fraud queues, spreadsheet reconciliations, and multi-day back-office bottlenecks.',
    wedge30Day: '30-Day High-ROI Workflow Automation Pilot connected to 1 live operational queue.',
    architectureLayers: [
      'Ingestion: Non-invasive CDC & OCR document pipeline',
      'Guardrails: Deterministic schema validation & PII redaction',
      'Inference: Sovereign multi-agent reasoning & exception routing',
      'Output: Bi-directional ERP/CRM write-back with audit ledger'
    ]
  },
  {
    id: 'gtm-revenue',
    title: 'GTM Systems & Revenue Automation',
    tag: 'COMMERCIAL MODERNIZATION',
    impactScore: 26,
    recoveryRate: 0.74,
    desc: 'Replace slow manual quoting, leaky CRM handoffs, and disconnected sales pipelines with instant BOM pricing and signal-driven routing.',
    wedge30Day: '30-Day Revenue Pipeline & Instant Quoting Overhaul integrated with your existing CRM.',
    architectureLayers: [
      'Capture: High-intent buyer telemetry & CPQ rules engine',
      'Enrichment: Automated account scoring & margin verification',
      'Automation: Instant PDF/BOM quote generation in <10 seconds',
      'Attribution: Closed-loop Salesforce / HubSpot revenue sync'
    ]
  },
  {
    id: 'user-apps-3d',
    title: 'User-Facing Apps & 3D Digital Flagships',
    tag: 'CUSTOMER EXPERIENCE & 3D',
    impactScore: 25,
    recoveryRate: 0.72,
    desc: 'Re-architect dated customer portals, mobile apps, and static catalogs into 60fps interactive 3D configurators and self-serve digital products.',
    wedge30Day: '30-Day Flagship App / 3D Configurator Prototype wired to real SKU & pricing logic.',
    architectureLayers: [
      'Experience: 60fps React / Next.js & Three.js WebGL viewport',
      'State Engine: Real-time constraint solver & live fitment validation',
      'API Bridge: Low-latency GraphQL / REST gateway to core inventory',
      'Conversion: Direct checkout & instant sales desk handoff'
    ]
  },
  {
    id: 'embedded-talent',
    title: 'Embedded Squads & Senior Tech Talent',
    tag: 'ENGINEERING VELOCITY',
    impactScore: 30,
    recoveryRate: 0.80,
    desc: 'Bypass 6-month hiring stalls by embedding vetted principal AI architects, full-stack product engineers, and 3D specialists directly into your team.',
    wedge30Day: '14-Day Embedded Principal Squad Sprint shipping production code inside your repo.',
    architectureLayers: [
      'Squad Topology: Principal AI Architect + Senior Full-Stack / 3D Engineers',
      'Delivery Cadence: Weekly production releases with CI/CD & automated tests',
      'Governance: 100% client IP ownership & zero black-box dependencies',
      'Handover: Internal team upskilling, runbooks, and architecture ADRs'
    ]
  }
];

const SECONDARY_CHALLENGES = [
  { id: 'legacy-erp-sync', label: 'Legacy ERP / SQL databases lack clean modern APIs' },
  { id: 'manual-quoting', label: 'Complex custom quotes take 24–72 hours to prepare manually' },
  { id: 'popia-security', label: 'Strict POPIA / data residency blocks public cloud AI tools' },
  { id: 'support-triage', label: 'High-volume customer or citizen tickets overwhelm staff' },
  { id: 'stalled-poc', label: 'Previous AI proofs-of-concept failed to reach production' },
  { id: 'dated-frontend', label: 'Customer-facing web/mobile interface feels dated vs. competitors' }
];

const CORE_SYSTEMS = [
  { id: 'sap-oracle-sql', label: 'SAP / Oracle / Microsoft Dynamics / Legacy SQL' },
  { id: 'salesforce-hubspot', label: 'Salesforce / HubSpot / Custom CRM' },
  { id: 'unstructured-docs', label: 'PDFs, Contracts, KYC Packets & Scanned Forms' },
  { id: 'event-streams', label: 'High-Volume Transactional / Telemetry Streams' },
  { id: 'cad-3d-catalog', label: '3D CAD Assets / Complex Multi-SKU Product Catalogs' },
  { id: 'custom-microservices', label: 'Cloud Microservices (AWS / Azure / GCP)' }
];

const DATA_MATURITY_OPTIONS = [
  {
    id: 'siloed',
    title: 'Siloed Files, PDFs & Spreadsheets',
    desc: 'Critical records sit across disconnected spreadsheets, email attachments, and departmental silos.',
    score: 14,
    dataReadinessPct: 54,
    friction: 'Phase 1 includes automated ingestion & structured schema normalization'
  },
  {
    id: 'warehouse',
    title: 'Centralized ERP, CRM or SQL Warehouse',
    desc: 'Core data resides in structured databases or cloud warehouses ready for secure API/CDC integration.',
    score: 26,
    dataReadinessPct: 82,
    friction: 'Ready for direct non-invasive CDC connectors & production automation'
  },
  {
    id: 'realtime',
    title: 'Real-Time APIs & Event Streams',
    desc: 'Live transactional or operational data already flows through modern REST/GraphQL APIs or message queues.',
    score: 34,
    dataReadinessPct: 96,
    friction: 'Prime for sub-15ms streaming inference & real-time spatial telemetry'
  }
];

const SOVEREIGNTY_POSTURES = [
  {
    id: 'popia-vpc',
    title: 'Private Cloud VPC (Single-Tenant)',
    desc: 'Dedicated AWS, Azure, or GCP Virtual Private Cloud in your local region with zero third-party model training.',
    badge: 'Enterprise Standard · POPIA / GDPR',
    complianceScore: 92
  },
  {
    id: 'air-gapped',
    title: 'On-Premise / Air-Gapped Sovereign Stack',
    desc: 'Self-hosted open-weight models and vector databases running 100% inside your own hardware perimeter with zero external egress.',
    badge: 'Government & Banking Grade',
    complianceScore: 99
  },
  {
    id: 'hybrid-sovereign',
    title: 'Hybrid Sovereign Mesh',
    desc: 'PII redaction and sensitive ledger state stay on-premise while anonymized compute bursts to private cloud endpoints.',
    badge: 'Balanced Regulated Architecture',
    complianceScore: 95
  }
];

const TALENT_STATE_OPTIONS = [
  {
    id: 'none',
    title: 'No Dedicated AI / Modernization Engineers',
    desc: 'Teams use off-the-shelf tools manually; require an end-to-end partner to architect, build, and operationalize.',
    score: 12,
    executionPct: 68,
    risk: 'End-to-end turnkey delivery squad + full operational handover'
  },
  {
    id: 'junior',
    title: 'Capable Generalist Software Team',
    desc: 'Strong internal web/IT developers who need senior AI, RevOps, or 3D specialists to lead architecture and avoid costly dead-ends.',
    score: 22,
    executionPct: 84,
    risk: 'Co-delivery with embedded principal architects & codebase pairing'
  },
  {
    id: 'veteran',
    title: 'Senior Engineering Organization',
    desc: 'Experienced technical leadership seeking high-velocity specialized squads to accelerate roadmap execution.',
    score: 30,
    executionPct: 95,
    risk: 'High-velocity embedded engineering pod integrated into your CI/CD'
  }
];

const BUDGET_TIERS = [
  {
    id: 'pilot',
    label: '$15k – $30k · 30-Day Diagnostic & Production Pilot',
    tier: '30-DAY PRODUCTION PILOT',
    investmentMidpoint: 22500,
    weight: 1
  },
  {
    id: 'modernize',
    label: '$30k – $75k · Core System Rollout & Integration',
    tier: 'CORE SYSTEM IMPLEMENTATION',
    investmentMidpoint: 52500,
    weight: 2
  },
  {
    id: 'enterprise',
    label: '$75k – $200k+ · Enterprise Transformation / Dedicated Squad',
    tier: 'ENTERPRISE TRANSFORMATION',
    investmentMidpoint: 125000,
    weight: 3
  }
];

const TIMELINES = [
  { id: 'immediate', label: 'Immediate · Kickoff Within 30 Days', urgent: true, velocityBonus: 8 },
  { id: 'quarter', label: 'This Quarter · 60 to 90 Day Window', urgent: false, velocityBonus: 4 },
  { id: 'exploring', label: 'Next Fiscal Cycle · Architecture & Budget Planning', urgent: false, velocityBonus: 0 }
];

const QUICK_PRESETS = [
  {
    id: 'preset-fintech',
    label: 'Load Preset: Banking / KYC & Fraud Triage',
    patch: {
      industrySector: 'fintech-gaming',
      primaryLane: 'core-ai-ops',
      secondaryChallenges: ['popia-security', 'support-triage', 'legacy-erp-sync'],
      coreSystems: ['sap-oracle-sql', 'event-streams', 'unstructured-docs'],
      dataMaturity: 'warehouse',
      sovereigntyPosture: 'popia-vpc',
      impactedStaffCount: 35,
      weeklyManualHoursPerPerson: 18,
      avgAnnualSalaryUsd: 68000,
      internalTalent: 'junior',
      budgetTier: 'enterprise',
      timeline: 'immediate'
    }
  },
  {
    id: 'preset-auto',
    label: 'Load Preset: Automotive / 3D Configurator & GTM Quoting',
    patch: {
      industrySector: 'auto-manufacturing',
      primaryLane: 'user-apps-3d',
      secondaryChallenges: ['manual-quoting', 'dated-frontend', 'legacy-erp-sync'],
      coreSystems: ['cad-3d-catalog', 'salesforce-hubspot', 'sap-oracle-sql'],
      dataMaturity: 'warehouse',
      sovereigntyPosture: 'popia-vpc',
      impactedStaffCount: 18,
      weeklyManualHoursPerPerson: 16,
      avgAnnualSalaryUsd: 75000,
      internalTalent: 'junior',
      budgetTier: 'modernize',
      timeline: 'immediate'
    }
  },
  {
    id: 'preset-gov',
    label: 'Load Preset: Public Sector / Air-Gapped Document Ops',
    patch: {
      industrySector: 'public-sector',
      primaryLane: 'core-ai-ops',
      secondaryChallenges: ['popia-security', 'legacy-erp-sync', 'support-triage'],
      coreSystems: ['unstructured-docs', 'sap-oracle-sql'],
      dataMaturity: 'siloed',
      sovereigntyPosture: 'air-gapped',
      impactedStaffCount: 60,
      weeklyManualHoursPerPerson: 20,
      avgAnnualSalaryUsd: 48000,
      internalTalent: 'none',
      budgetTier: 'enterprise',
      timeline: 'quarter'
    }
  }
];

const STEP_LABELS = [
  { num: 1, title: 'Sector & Scope' },
  { num: 2, title: 'Stack & Sovereignty' },
  { num: 3, title: 'ROI Calibration' },
  { num: 4, title: 'Team & Horizon' },
  { num: 5, title: 'Executive Blueprint' }
];

export default function AiReadinessAudit() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AuditState>({
    industrySector: 'fintech-gaming',
    primaryLane: 'core-ai-ops',
    secondaryChallenges: ['legacy-erp-sync', 'popia-security'],
    coreSystems: ['sap-oracle-sql', 'unstructured-docs'],
    dataMaturity: 'warehouse',
    sovereigntyPosture: 'popia-vpc',
    impactedStaffCount: 24,
    weeklyManualHoursPerPerson: 15,
    avgAnnualSalaryUsd: 65000,
    internalTalent: 'junior',
    budgetTier: 'modernize',
    timeline: 'immediate',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    decisionRole: 'CTO / VP Engineering',
    projectNotes: ''
  });

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const selectedSector =
    INDUSTRY_SECTORS.find((s) => s.id === formData.industrySector) || INDUSTRY_SECTORS[0];
  const selectedLane =
    MODERNIZATION_LANES.find((l) => l.id === formData.primaryLane) || MODERNIZATION_LANES[0];
  const selectedData =
    DATA_MATURITY_OPTIONS.find((d) => d.id === formData.dataMaturity) || DATA_MATURITY_OPTIONS[1];
  const selectedSovereignty =
    SOVEREIGNTY_POSTURES.find((s) => s.id === formData.sovereigntyPosture) || SOVEREIGNTY_POSTURES[0];
  const selectedTalent =
    TALENT_STATE_OPTIONS.find((t) => t.id === formData.internalTalent) || TALENT_STATE_OPTIONS[1];
  const selectedBudget =
    BUDGET_TIERS.find((b) => b.id === formData.budgetTier) || BUDGET_TIERS[1];
  const selectedTimeline =
    TIMELINES.find((t) => t.id === formData.timeline) || TIMELINES[0];

  // Quantitative ROI & Operational Recovery Calculations
  const hourlyRate = formData.avgAnnualSalaryUsd / 2080;
  const totalAnnualManualHours = Math.round(
    formData.impactedStaffCount * formData.weeklyManualHoursPerPerson * 52
  );
  const annualCurrentBleedUsd = Math.round(totalAnnualManualHours * hourlyRate);
  const reclaimableHoursNum = Math.round(totalAnnualManualHours * selectedLane.recoveryRate);
  const projectedAnnualSavingsUsd = Math.round(annualCurrentBleedUsd * selectedLane.recoveryRate);

  const monthlySavingsUsd = Math.max(1, projectedAnnualSavingsUsd / 12);
  const paybackWeeks = Math.max(
    4,
    Math.min(28, Math.round((selectedBudget.investmentMidpoint / monthlySavingsUsd) * 4.33))
  );
  const firstYearRoiMultiple = (
    projectedAnnualSavingsUsd / Math.max(1, selectedBudget.investmentMidpoint)
  ).toFixed(1);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);

  const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(val);

  // Multi-Dimensional Readiness Sub-Scores
  const dataSystemsScore = Math.min(
    98,
    selectedData.dataReadinessPct + Math.min(10, formData.coreSystems.length * 3)
  );
  const complianceFitScore = selectedSovereignty.complianceScore;
  const roiVelocityScore = Math.min(
    98,
    Math.round(62 + Math.min(30, Number(firstYearRoiMultiple) * 6) + selectedTimeline.velocityBonus)
  );
  const executionScore = selectedTalent.executionPct;

  const readinessScore = Math.round(
    dataSystemsScore * 0.28 +
      complianceFitScore * 0.22 +
      roiVelocityScore * 0.28 +
      executionScore * 0.22
  );

  let qualificationTier = 'CORE PRODUCTION FIT';
  let qualificationColor = 'text-white border-white bg-white/10';
  let qualificationReason =
    'Strong operational ROI and clear technical scope for a 30-to-90 day production deployment.';

  if (selectedBudget.weight === 3 || projectedAnnualSavingsUsd >= 250000) {
    qualificationTier = 'PRIORITY ENTERPRISE FIT';
    qualificationColor = 'text-accent border-accent bg-accent/15';
    qualificationReason =
      'High-impact financial recovery and enterprise scope. Recommended for a dedicated senior architecture squad.';
  } else if (selectedBudget.weight === 1) {
    qualificationTier = '30-DAY DIAGNOSTIC & PILOT';
    qualificationColor = 'text-white border-white/40 bg-white/5';
    qualificationReason =
      'Best initiated via a focused 30-day production wedge to prove live ROI before broader rollout.';
  }

  const toggleArrayItem = (list: string[], item: string): string[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const applyPreset = (patch: Partial<AuditState>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const handleCopySummary = () => {
    const text = [
      `BUILD CULT — EXECUTIVE AI & MODERNIZATION AUDIT`,
      `Sector: ${selectedSector.label}`,
      `Primary Focus: ${selectedLane.title} (${selectedLane.tag})`,
      `Readiness Index: ${readinessScore}/100 (${qualificationTier})`,
      `Current Annual Manual Cost: ${formatCurrency(annualCurrentBleedUsd)}/yr (${formatNumber(totalAnnualManualHours)} hrs/yr)`,
      `Projected Annual Recovery: ${formatCurrency(projectedAnnualSavingsUsd)}/yr (${formatNumber(reclaimableHoursNum)} hrs reclaimed)`,
      `Estimated Payback Window: ${paybackWeeks} Weeks (${firstYearRoiMultiple}x Year-1 ROI Multiple)`,
      `Sovereignty & Security Posture: ${selectedSovereignty.title}`,
      `30-Day Entry Wedge: ${selectedLane.wedge30Day}`
    ].join('\n');

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setIsTransmitted(true);
    }, 600);
  };

  return (
    <section
      id="ai-audit"
      className="py-20 sm:py-28 bg-black border-y-4 border-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header + Quick Industry Presets */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.28em] mb-4">
              <Terminal size={14} className="text-accent" />
              <span>5-Stage Technical &amp; Commercial Diagnostic</span>
            </div>

            <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.88] mb-5 text-balance">
              ARCHITECT YOUR <br />
              <span className="text-accent">MODERNIZATION AUDIT</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light">
              Configure your sector, legacy stack, data sovereignty requirements, and team workload to generate a quantified engineering roadmap and exportable 1-Page Boardroom ROI Brief.
            </p>
          </div>

          {/* 1-Click Scenario Presets */}
          <div className="lg:max-w-sm w-full space-y-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
              Benchmark Scenario Presets
            </div>
            <div className="flex flex-col gap-1.5">
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.patch)}
                  className="text-left px-3.5 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-accent font-mono text-[10px] uppercase tracking-wider text-white/80 hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{preset.label}</span>
                  <ArrowRight size={12} className="text-accent shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive 5-Step Clickable Stepper Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {STEP_LABELS.map((item) => {
            const isCurrent = step === item.num;
            const isCompleted = step > item.num;
            return (
              <button
                key={item.num}
                type="button"
                onClick={() => setStep(item.num)}
                className={`text-left p-3 border-2 transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-accent text-white border-white shadow-[4px_4px_0px_#ffffff]'
                    : isCompleted
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0a0a0d] text-white/60 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] font-black uppercase tracking-widest mb-0.5">
                  <span>Step 0{item.num}</span>
                  {isCompleted && <Check size={12} />}
                </div>
                <div className="font-sans font-black text-xs sm:text-sm uppercase tracking-tight truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 12-Column Interactive Audit Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Active Diagnostic Step */}
          <div className="lg:col-span-8 border-4 border-white bg-[#070709] shadow-[12px_12px_0px_#ff3200]">
            {/* Console Titlebar */}
            <div className="bg-white text-black px-6 py-3.5 flex items-center justify-between font-mono text-xs font-black tracking-widest uppercase">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 bg-black text-white text-[10px]">
                  0{step}/05
                </span>
                <span>{STEP_LABELS[step - 1].title}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="text-[10px] text-accent hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Jump to Blueprint →
              </button>
            </div>

            <div className="p-6 sm:p-10">
              {/* ========================================================= */}
              {/* STEP 1: INDUSTRY SECTOR & PRIMARY MODERNIZATION LANE      */}
              {/* ========================================================= */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      01. Industry Vertical &amp; Operating Environment
                    </span>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mb-5">
                      Which sector best describes your organization?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INDUSTRY_SECTORS.map((sec) => {
                        const active = formData.industrySector === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                industrySector: sec.id,
                                sovereigntyPosture: sec.defaultSovereignty
                              })
                            }
                            className={`text-left p-4 border-2 transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                              active
                                ? 'bg-white text-black border-white shadow-[4px_4px_0px_#ff3200]'
                                : 'bg-white/[0.02] text-white/85 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <div className="font-sans font-bold text-sm leading-snug">
                              {sec.label}
                            </div>
                            {active && <Check size={16} className="text-accent shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      02. Primary Modernization Pillar
                    </span>
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-5">
                      Where do you need the fastest measurable impact?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MODERNIZATION_LANES.map((lane) => {
                        const active = formData.primaryLane === lane.id;
                        return (
                          <button
                            key={lane.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, primaryLane: lane.id })}
                            className={`text-left p-5 border-2 transition-colors flex flex-col justify-between cursor-pointer ${
                              active
                                ? 'bg-accent text-white border-white shadow-[4px_4px_0px_#ffffff]'
                                : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <span className="font-sans font-black text-base sm:text-lg uppercase tracking-tight">
                                  {lane.title}
                                </span>
                                {active && <Check size={18} className="text-white shrink-0" />}
                              </div>
                              <p
                                className={`text-xs leading-relaxed font-light ${
                                  active ? 'text-white/95' : 'text-white/65'
                                }`}
                              >
                                {lane.desc}
                              </p>
                            </div>
                            <div className="mt-4 pt-2.5 border-t border-current/15 font-mono text-[10px] uppercase tracking-widest opacity-85">
                              {lane.tag} · Target {Math.round(lane.recoveryRate * 100)}% Efficiency Gain
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Secondary Operational Bottlenecks (Multi-Select) */}
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      03. Compounding Operational Friction (Select All That Apply)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {SECONDARY_CHALLENGES.map((ch) => {
                        const checked = formData.secondaryChallenges.includes(ch.id);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                secondaryChallenges: toggleArrayItem(
                                  formData.secondaryChallenges,
                                  ch.id
                                )
                              })
                            }
                            className={`text-left px-3.5 py-2.5 border font-mono text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                              checked
                                ? 'bg-white/15 border-accent text-white font-semibold'
                                : 'bg-white/[0.02] border-white/15 text-white/65 hover:text-white'
                            }`}
                          >
                            <span>{ch.label}</span>
                            <span
                              className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                                checked ? 'bg-accent border-accent text-white' : 'border-white/30'
                              }`}
                            >
                              {checked && <Check size={11} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto bg-white text-black px-8 py-4 font-sans font-black text-xs uppercase tracking-[0.22em] flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-colors shadow-[4px_4px_0px_#ff3200] cursor-pointer"
                    >
                      <span>Next: Stack &amp; Sovereignty</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2: SYSTEMS TOPOLOGY, DATA & SOVEREIGNTY              */}
              {/* ========================================================= */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      04. Existing Systems &amp; Data Sources
                    </span>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mb-4">
                      Which systems need to connect to the modernized workflow?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CORE_SYSTEMS.map((sys) => {
                        const checked = formData.coreSystems.includes(sys.id);
                        return (
                          <button
                            key={sys.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                coreSystems: toggleArrayItem(formData.coreSystems, sys.id)
                              })
                            }
                            className={`text-left p-4 border-2 transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                              checked
                                ? 'bg-white text-black border-white font-bold'
                                : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <span className="font-sans text-xs sm:text-sm">{sys.label}</span>
                            <span
                              className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                                checked ? 'bg-accent border-accent text-white' : 'border-white/30'
                              }`}
                            >
                              {checked && <Check size={12} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      05. Data Architecture Maturity
                    </span>
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-4">
                      How structured and accessible is your operational data today?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {DATA_MATURITY_OPTIONS.map((item) => {
                        const active = formData.dataMaturity === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, dataMaturity: item.id })}
                            className={`text-left p-5 border-2 transition-colors flex flex-col justify-between cursor-pointer ${
                              active
                                ? 'bg-accent text-white border-white shadow-[4px_4px_0px_#ffffff]'
                                : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-sans font-black text-base uppercase tracking-tight">
                                  {item.title}
                                </span>
                                {active && <Check size={16} className="text-white shrink-0" />}
                              </div>
                              <p
                                className={`text-xs leading-relaxed font-light ${
                                  active ? 'text-white/90' : 'text-white/60'
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                            <div className="mt-4 pt-2 border-t border-current/15 font-mono text-[10px] uppercase tracking-wider opacity-85">
                              {item.friction}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      06. Data Sovereignty, POPIA &amp; Security Boundary
                    </span>
                    <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-4">
                      What is your required deployment and compliance model?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {SOVEREIGNTY_POSTURES.map((posture) => {
                        const active = formData.sovereigntyPosture === posture.id;
                        return (
                          <button
                            key={posture.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, sovereigntyPosture: posture.id })
                            }
                            className={`text-left p-5 border-2 transition-colors flex flex-col justify-between cursor-pointer ${
                              active
                                ? 'bg-white text-black border-white shadow-[4px_4px_0px_#ff3200]'
                                : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <div>
                              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
                                {posture.badge}
                              </div>
                              <div className="font-sans font-black text-base uppercase tracking-tight mb-2">
                                {posture.title}
                              </div>
                              <p
                                className={`text-xs leading-relaxed font-light ${
                                  active ? 'text-black/80' : 'text-white/60'
                                }`}
                              >
                                {posture.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-white/30 text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-white text-black px-8 py-4 font-sans font-black text-xs uppercase tracking-[0.22em] inline-flex items-center gap-3 hover:bg-accent hover:text-white transition-colors shadow-[4px_4px_0px_#ff3200] cursor-pointer"
                    >
                      <span>Next: Calibrate Financial ROI</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 3: QUANTITATIVE WORKLOAD & ROI CALIBRATION           */}
              {/* ========================================================= */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      07. Quantitative Workload Calibration
                    </span>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mb-2">
                      Size the manual workload or revenue bottleneck
                    </h3>
                    <p className="font-sans text-sm text-white/65 font-light">
                      Adjust the sliders below to match your department or operating unit. These figures feed directly into your 1-Page Executive ROI Brief.
                    </p>
                  </div>

                  <div className="space-y-6 bg-white/[0.02] border-2 border-white/15 p-6">
                    {/* Slider 1: Staff Count */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider text-white/80 font-bold">
                          Impacted Team Size (Operations, Sales, Support, or Engineering)
                        </label>
                        <span className="font-sans font-black text-2xl text-accent tabular-nums">
                          {formData.impactedStaffCount} FTEs
                        </span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={250}
                        step={1}
                        value={formData.impactedStaffCount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            impactedStaffCount: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#ff3200] cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                        <span>3 Specialists</span>
                        <span>50 Mid-Market Dept</span>
                        <span>250+ Enterprise Unit</span>
                      </div>
                    </div>

                    {/* Slider 2: Weekly Hours per Person */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider text-white/80 font-bold">
                          Weekly Hours Spent Per Person on Repetitive / Manual Tasks
                        </label>
                        <span className="font-sans font-black text-2xl text-white tabular-nums">
                          {formData.weeklyManualHoursPerPerson} hrs / week
                        </span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={35}
                        step={1}
                        value={formData.weeklyManualHoursPerPerson}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            weeklyManualHoursPerPerson: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#ff3200] cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                        <span>4 hrs/wk (10% load)</span>
                        <span>16 hrs/wk (40% load)</span>
                        <span>35 hrs/wk (Full-time manual)</span>
                      </div>
                    </div>

                    {/* Slider 3: Average Annual Loaded Cost */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="font-mono text-xs uppercase tracking-wider text-white/80 font-bold">
                          Average Fully-Loaded Annual Compensation Per FTE (USD Equivalent)
                        </label>
                        <span className="font-sans font-black text-2xl text-white tabular-nums">
                          {formatCurrency(formData.avgAnnualSalaryUsd)} / yr
                        </span>
                      </div>
                      <input
                        type="range"
                        min={25000}
                        max={160000}
                        step={5000}
                        value={formData.avgAnnualSalaryUsd}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            avgAnnualSalaryUsd: Number(e.target.value)
                          })
                        }
                        className="w-full accent-[#ff3200] cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[10px] text-white/40 mt-1">
                        <span>$25k / yr</span>
                        <span>$75k / yr</span>
                        <span>$160k / yr</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Calculated Financial Recovery Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border-2 border-white/20 bg-black p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">
                        Current Annual Cost Bleed
                      </div>
                      <div className="font-sans font-black text-2xl text-white tabular-nums">
                        {formatCurrency(annualCurrentBleedUsd)}
                      </div>
                      <div className="font-mono text-[10px] text-white/50 mt-1 tabular-nums">
                        {formatNumber(totalAnnualManualHours)} manual hrs / yr
                      </div>
                    </div>

                    <div className="border-2 border-accent bg-accent/10 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-1">
                        Projected Annual Recovery
                      </div>
                      <div className="font-sans font-black text-2xl text-accent tabular-nums">
                        {formatCurrency(projectedAnnualSavingsUsd)}
                      </div>
                      <div className="font-mono text-[10px] text-white/75 mt-1 tabular-nums">
                        {formatNumber(reclaimableHoursNum)} hrs reclaimed ({Math.round(selectedLane.recoveryRate * 100)}%)
                      </div>
                    </div>

                    <div className="border-2 border-white/20 bg-black p-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">
                        Estimated Payback Window
                      </div>
                      <div className="font-sans font-black text-2xl text-white tabular-nums">
                        {paybackWeeks} Weeks
                      </div>
                      <div className="font-mono text-[10px] text-accent font-bold mt-1 tabular-nums">
                        {firstYearRoiMultiple}x Year-1 Return Multiple
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-white/30 text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="bg-white text-black px-8 py-4 font-sans font-black text-xs uppercase tracking-[0.22em] inline-flex items-center gap-3 hover:bg-accent hover:text-white transition-colors shadow-[4px_4px_0px_#ff3200] cursor-pointer"
                    >
                      <span>Next: Team &amp; Delivery Horizon</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 4: INTERNAL TALENT, BUDGET TIER & TIMELINE           */}
              {/* ========================================================= */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                      08. Internal Engineering Posture
                    </span>
                    <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mb-5">
                      What level of AI and modernization capability do you have in-house?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {TALENT_STATE_OPTIONS.map((item) => {
                        const active = formData.internalTalent === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, internalTalent: item.id })}
                            className={`text-left p-5 border-2 transition-colors flex flex-col justify-between cursor-pointer ${
                              active
                                ? 'bg-accent text-white border-white shadow-[4px_4px_0px_#ffffff]'
                                : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-sans font-black text-base uppercase tracking-tight">
                                  {item.title}
                                </span>
                                {active && <Check size={16} className="text-white shrink-0" />}
                              </div>
                              <p
                                className={`text-xs leading-relaxed font-light ${
                                  active ? 'text-white/90' : 'text-white/60'
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                            <div className="mt-4 pt-2 border-t border-current/15 font-mono text-[10px] uppercase tracking-wider opacity-85">
                              {item.risk}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                        09. Capital Allocation Tier
                      </span>
                      <label className="font-sans font-black text-lg uppercase tracking-tight block mb-4">
                        Planned Engagement Scope
                      </label>

                      <div className="space-y-3">
                        {BUDGET_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetTier: tier.id })}
                            className={`w-full text-left p-4 border-2 font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                              formData.budgetTier === tier.id
                                ? 'bg-white text-black border-white font-bold'
                                : 'bg-white/[0.02] text-white/75 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <span>{tier.label}</span>
                            {formData.budgetTier === tier.id && (
                              <Check size={16} className="text-accent shrink-0 ml-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest block mb-2">
                        10. Target Deployment Window
                      </span>
                      <label className="font-sans font-black text-lg uppercase tracking-tight block mb-4">
                        When do you need production delivery?
                      </label>

                      <div className="space-y-3">
                        {TIMELINES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: t.id })}
                            className={`w-full text-left p-4 border-2 font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                              formData.timeline === t.id
                                ? 'bg-white text-black border-white font-bold'
                                : 'bg-white/[0.02] text-white/75 border-white/15 hover:border-white/45'
                            }`}
                          >
                            <span>{t.label}</span>
                            {formData.timeline === t.id && (
                              <Check size={16} className="text-accent shrink-0 ml-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="border border-white/30 text-white px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="bg-accent text-white px-8 py-4 font-sans font-black text-xs uppercase tracking-[0.22em] inline-flex items-center gap-3 hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_#ffffff] cursor-pointer"
                    >
                      <span>Generate Executive Blueprint</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 5: EXECUTIVE BLUEPRINT, 4-PILLAR SCORECARD & BOOKING */}
              {/* ========================================================= */}
              {step === 5 && (
                <div className="space-y-8">
                  {/* Top Readiness & Action Banner */}
                  <div className="border-4 border-accent bg-black p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
                      <div>
                        <div className="font-mono text-[10px] text-accent font-bold uppercase tracking-[0.28em] mb-1">
                          DIAGNOSTIC COMPLETE · {selectedSector.label}
                        </div>
                        <div className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white tabular-nums">
                          READINESS INDEX: <span className="text-accent">{readinessScore}/100</span>
                        </div>
                      </div>

                      <div
                        className={`px-4 py-2 border font-mono text-xs font-bold uppercase tracking-widest self-start md:self-auto ${qualificationColor}`}
                      >
                        {qualificationTier}
                      </div>
                    </div>

                    {/* 4-Dimension Readiness Breakdown Bars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-white/15">
                      {[
                        { label: 'Data & Systems Readiness', val: dataSystemsScore },
                        { label: 'Sovereignty & Compliance Fit', val: complianceFitScore },
                        { label: 'Commercial ROI Velocity', val: roiVelocityScore },
                        { label: 'Execution & Talent Posture', val: executionScore }
                      ].map((dim) => (
                        <div key={dim.label} className="bg-white/[0.03] border border-white/10 p-3.5">
                          <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider mb-2">
                            <span className="text-white/75">{dim.label}</span>
                            <span className="text-accent font-bold tabular-nums">{dim.val}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-accent transition-all duration-300"
                              style={{ width: `${dim.val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommended 4-Layer Target Architecture */}
                    <div className="py-6 border-b border-white/15 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                          Recommended 4-Layer Production Stack
                        </div>
                        <div className="space-y-2">
                          {selectedLane.architectureLayers.map((layer, idx) => (
                            <div
                              key={layer}
                              className="p-2.5 bg-white/[0.03] border border-white/10 font-mono text-xs text-white/85 flex items-start gap-2.5"
                            >
                              <span className="text-accent font-bold">0{idx + 1}</span>
                              <span>{layer}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-white/[0.04] border border-white/15">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                            Recommended 30-Day Entry Wedge
                          </div>
                          <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed">
                            {selectedLane.wedge30Day}
                          </p>
                        </div>

                        <div className="p-4 bg-white/[0.03] border border-white/10">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                            Matched Client Benchmark
                          </div>
                          <p className="font-sans text-xs text-white/80 leading-relaxed">
                            {selectedSector.benchmark}
                          </p>
                        </div>

                        <div className="p-4 bg-white/[0.03] border border-white/10">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                            Deployment &amp; Delivery Model
                          </div>
                          <p className="font-sans text-xs text-white/80 leading-relaxed">
                            {selectedSovereignty.title} · {selectedTalent.risk}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Boardroom Export & Clipboard Toolbar */}
                    <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setBriefModalOpen(true)}
                          className="bg-white text-black px-6 py-3.5 font-sans font-black text-xs uppercase tracking-[0.18em] hover:bg-accent hover:text-white transition-colors inline-flex items-center gap-2.5 shadow-[4px_4px_0px_#ff3200] cursor-pointer"
                        >
                          <FileText size={15} />
                          <span>Export 1-Page Executive Brief (PDF)</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="px-4 py-3.5 border border-white/25 text-white/85 hover:text-white hover:border-white font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Copy size={14} />
                          <span>{copiedSummary ? 'Copied to Clipboard' : 'Copy Brief Summary'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="font-mono text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                      >
                        <RotateCcw size={13} />
                        <span>Recalibrate Inputs</span>
                      </button>
                    </div>
                  </div>

                  {/* Technical Architecture Review Booking Form */}
                  <form
                    onSubmit={handleTransmit}
                    className="space-y-6 bg-white/[0.02] border-2 border-white/15 p-6 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                          Schedule Your Architecture &amp; Commercial Review
                        </div>
                        <p className="text-xs sm:text-sm font-light text-white/70 mt-1">
                          Lock in a 45-minute working session with a Build Cult Principal Architect to review this blueprint against your live environment.
                        </p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 shrink-0">
                        NDA &amp; POPIA Protected
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/55 block mb-1.5">
                          Organization / Department *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="e.g. Apex Financial / Dept of Trade"
                          className="w-full bg-black border border-white/25 px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/55 block mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) =>
                            setFormData({ ...formData, contactName: e.target.value })
                          }
                          placeholder="Full Name"
                          className="w-full bg-black border border-white/25 px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/55 block mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={(e) =>
                            setFormData({ ...formData, contactEmail: e.target.value })
                          }
                          placeholder="name@organization.com"
                          className="w-full bg-black border border-white/25 px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/55 block mb-1.5">
                          Executive Role *
                        </label>
                        <select
                          value={formData.decisionRole}
                          onChange={(e) =>
                            setFormData({ ...formData, decisionRole: e.target.value })
                          }
                          className="w-full bg-black border border-white/25 px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-accent uppercase [color-scheme:dark]"
                        >
                          <option value="CTO / VP Engineering">CTO / CIO / VP Engineering</option>
                          <option value="CEO / Managing Director">CEO / Managing Director</option>
                          <option value="CFO / Head of Procurement">CFO / Head of Procurement</option>
                          <option value="COO / Head of Operations">COO / Head of Operations</option>
                          <option value="CRO / CMO / Commercial Lead">CRO / CMO / Commercial Lead</option>
                          <option value="Director-General / Public Sector Lead">
                            Director-General / Public Sector Lead
                          </option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/55 block mb-1.5">
                          Specific Systems or Target Outcome (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.projectNotes}
                          onChange={(e) =>
                            setFormData({ ...formData, projectNotes: e.target.value })
                          }
                          placeholder="e.g. Integrating SAP S/4HANA with automated quoting or air-gapped document triage"
                          className="w-full bg-black border border-white/25 px-3 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="border border-white/30 text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        ← Edit Diagnostic Inputs
                      </button>

                      <button
                        type="submit"
                        disabled={isTransmitting}
                        className="w-full sm:w-auto bg-accent text-white px-10 py-4 font-sans font-black text-xs uppercase tracking-[0.22em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_#ffffff] disabled:opacity-50 cursor-pointer"
                      >
                        {isTransmitting ? (
                          <span>Registering Diagnostic Brief...</span>
                        ) : (
                          <>
                            <span>Book Principal Architecture Review</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    {isTransmitted && (
                      <div className="p-5 bg-accent/15 border-2 border-accent text-white space-y-2">
                        <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                          <CheckCircle2 size={18} />
                          <span>Diagnostic Dossier Registered · Priority Review Assigned</span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed">
                          We have logged your <strong>{selectedLane.title}</strong> blueprint ({formatCurrency(projectedAnnualSavingsUsd)}/yr projected recovery, {selectedSovereignty.title}) for <strong>{formData.companyName || 'your organization'}</strong>. A Principal Architect will send calendar times and a pre-read architecture pack to <strong>{formData.contactEmail}</strong> within one business day.
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: Live Sticky Diagnostic Telemetry & Instant Brief Trigger */}
          <div className="lg:col-span-4 border-2 border-white/25 bg-[#09090c] p-6 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  Live Diagnostic Dossier
                </div>
                <div className="font-sans font-black text-lg uppercase tracking-tight text-white">
                  Real-Time ROI &amp; Readiness
                </div>
              </div>
              <div className="px-2.5 py-1 bg-accent text-white font-mono text-xs font-black tabular-nums">
                {readinessScore}/100
              </div>
            </div>

            {/* Live Financial Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black border border-white/10 p-3.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/45 mb-1">
                  Annual Recovery
                </div>
                <div className="font-sans font-black text-lg text-accent tabular-nums">
                  {formatCurrency(projectedAnnualSavingsUsd)}
                </div>
                <div className="font-mono text-[9px] text-white/50 mt-0.5 tabular-nums">
                  {formatNumber(reclaimableHoursNum)} hrs/yr saved
                </div>
              </div>

              <div className="bg-black border border-white/10 p-3.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/45 mb-1">
                  Payback Horizon
                </div>
                <div className="font-sans font-black text-lg text-white tabular-nums">
                  {paybackWeeks} Weeks
                </div>
                <div className="font-mono text-[9px] text-accent font-bold mt-0.5 tabular-nums">
                  {firstYearRoiMultiple}x Year-1 ROI
                </div>
              </div>
            </div>

            {/* Selected Configuration Summary */}
            <div className="space-y-3 text-xs font-mono border-t border-b border-white/10 py-4">
              <div className="flex justify-between gap-2">
                <span className="text-white/45">MODERNIZATION LANE</span>
                <span className="text-white font-bold text-right">{selectedLane.tag}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/45">SOVEREIGNTY MODEL</span>
                <span className="text-white text-right">{selectedSovereignty.title}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/45">WORKLOAD SCOPE</span>
                <span className="text-white text-right tabular-nums">
                  {formData.impactedStaffCount} FTEs · {formData.weeklyManualHoursPerPerson}h/wk
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/45">ENGAGEMENT TIER</span>
                <span className="text-accent font-bold text-right">{selectedBudget.tier}</span>
              </div>
            </div>

            {/* 30-Day Entry Wedge Callout */}
            <div className="bg-white/[0.03] border border-white/10 p-4">
              <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent mb-1">
                Recommended 30-Day Entry Wedge
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed">
                {selectedLane.wedge30Day}
              </p>
            </div>

            {/* Always-Available Boardroom PDF Export Button */}
            <button
              type="button"
              onClick={() => setBriefModalOpen(true)}
              className="w-full py-3.5 px-4 bg-white hover:bg-accent text-black hover:text-white font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_#ff3200] cursor-pointer"
            >
              <FileText size={15} />
              <span>Export 1-Page Executive Brief (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      <ExecutiveRoiBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        data={{
          sourceLabel: '5-Stage AI & Modernization Diagnostic Audit',
          defaultOrgName: formData.companyName,
          sectorOrFocus: `${selectedSector.label} · ${selectedLane.title}`,
          teamOrScopeSummary: `${formData.impactedStaffCount} FTEs (${formData.weeklyManualHoursPerPerson}h/wk manual load) · ${selectedBudget.tier}`,
          annualCurrentCost: `${formatCurrency(annualCurrentBleedUsd)}/yr`,
          annualProjectedSavings: `${formatCurrency(projectedAnnualSavingsUsd)}/yr`,
          reclaimableHours: `${formatNumber(reclaimableHoursNum)} hrs/yr`,
          estimatedPayback: `${paybackWeeks} Weeks (${firstYearRoiMultiple}x ROI)`,
          readinessHeadline: `Index ${readinessScore}/100 · ${qualificationTier}`,
          bottleneckSummary: `${selectedLane.desc} Data Posture: ${selectedData.title}. Connected Systems: ${formData.coreSystems.length} core layers.`,
          recommendedArchitecture: `${selectedLane.wedge30Day} ${selectedTalent.risk}.`,
          provenBenchmark: selectedSector.benchmark,
          deploymentRecommendation: `${selectedSovereignty.title} (${selectedSovereignty.badge})`
        }}
      />
    </section>
  );
}
