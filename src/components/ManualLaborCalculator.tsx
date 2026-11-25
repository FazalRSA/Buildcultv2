import React, { useState, useId } from 'react';
import { 
  Users, 
  Flame, 
  Gauge, 
  Cpu, 
  BookOpen, 
  Truck, 
  Scale, 
  Landmark,
  ArrowRight, 
  TrendingDown, 
  Zap,
  FileText
} from 'lucide-react';
import ExecutiveRoiBriefModal from './ExecutiveRoiBriefModal';

interface IndustryConfig {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  avgHourlyCost: number;
  weeklyRepetitiveHours: number;
  typicalFriction: string;
  solutionVector: string;
  provenMetric: string;
}

const INDUSTRIES: IndustryConfig[] = [
  {
    id: 'government-public',
    name: 'Government Departments & Public Sector Agencies',
    shortName: 'Government & Public Sector',
    icon: Landmark,
    avgHourlyCost: 42,
    weeklyRepetitiveHours: 26,
    typicalFriction: 'Manual citizen application processing, tax and tender compliance checks, paper-to-digital record entry, and inter-department reconciliation.',
    solutionVector: 'Sovereign on-premise document OCR, automated citizen intake triage, and real-time compliance auditing.',
    provenMetric: 'Built high-security automation and research-backed public education systems.'
  },
  {
    id: 'casino-gaming',
    name: 'Gaming, Casino & High-Volume Platforms',
    shortName: 'Gaming & Platforms',
    icon: Flame,
    avgHourlyCost: 38,
    weeklyRepetitiveHours: 24,
    typicalFriction: 'Manual KYC reviews, payment dispute checks, and reconciling transactions across multiple payment providers.',
    solutionVector: 'Automated risk scoring, real-time fraud detection, and instant transaction reconciliation.',
    provenMetric: 'Led AI engineering at Africa’s largest online casino handling 10M+ daily events.'
  },
  {
    id: 'motoring-telematics',
    name: 'Automotive, Fleet & Performance Motoring',
    shortName: 'Automotive & Fleet',
    icon: Gauge,
    avgHourlyCost: 48,
    weeklyRepetitiveHours: 20,
    typicalFriction: 'Manual sensor data review, maintenance scheduling, and delayed diagnostic reporting.',
    solutionVector: 'Real-time telemetry pipelines and automated fault detection across connected vehicles.',
    provenMetric: 'Technology partner for a market leader in performance motoring.'
  },
  {
    id: 'banking-fintech',
    name: 'Financial Services & Enterprise Operations',
    shortName: 'Finance & Enterprise',
    icon: Cpu,
    avgHourlyCost: 52,
    weeklyRepetitiveHours: 26,
    typicalFriction: 'Spreadsheet reconciliations, manual document review, and copying data between legacy systems.',
    solutionVector: 'Automated document extraction and direct API integrations with core ERP and financial systems.',
    provenMetric: 'Built internal workflow automations for established enterprise incumbents.'
  },
  {
    id: 'edtech-academia',
    name: 'Education, EdTech & Training Organizations',
    shortName: 'Education & EdTech',
    icon: BookOpen,
    avgHourlyCost: 35,
    weeklyRepetitiveHours: 22,
    typicalFriction: 'Manual grading, content tagging, student verification, and administrative data entry.',
    solutionVector: 'Adaptive learning tools, automated assessment workflows, and intelligent content indexing.',
    provenMetric: 'Contributed to published research on practical AI applications in education.'
  },
  {
    id: 'logistics-supply',
    name: 'Logistics, Freight & Supply Chain',
    shortName: 'Logistics & Supply',
    icon: Truck,
    avgHourlyCost: 40,
    weeklyRepetitiveHours: 25,
    typicalFriction: 'Manual waybill and invoice entry, customs documentation checks, and shipment tracking updates.',
    solutionVector: 'Automated document OCR, compliance validation, and real-time dispatch notifications.',
    provenMetric: 'Up to 80% reduction in manual document processing times.'
  },
  {
    id: 'legal-compliance',
    name: 'Legal, Insurance & Compliance',
    shortName: 'Legal & Insurance',
    icon: Scale,
    avgHourlyCost: 65,
    weeklyRepetitiveHours: 28,
    typicalFriction: 'Reviewing standard contracts, checking policy compliance, and extracting data from claims files.',
    solutionVector: 'Structured contract analysis and automated claims triage with clear source citations.',
    provenMetric: 'Fast, accurate document review with human-in-the-loop verification.'
  }
];

const PRESETS = [5, 15, 30, 75, 150, 300];

export default function ManualLaborCalculator() {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('government-public');
  const [employeeCount, setEmployeeCount] = useState<number>(50);
  const [briefModalOpen, setBriefModalOpen] = useState<boolean>(false);
  const sliderId = useId();

  const currentIndustry = INDUSTRIES.find(i => i.id === selectedIndustryId) || INDUSTRIES[0];

  const weeksPerYear = 48;
  const annualHoursWasted = employeeCount * currentIndustry.weeklyRepetitiveHours * weeksPerYear;
  const annualCapitalBleed = annualHoursWasted * currentIndustry.avgHourlyCost;
  
  const reclaimPercentage = 0.75;
  const annualCapitalReclaimed = Math.round(annualCapitalBleed * reclaimPercentage);
  const annualHoursReclaimed = Math.round(annualHoursWasted * reclaimPercentage);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  const handlePreset = (count: number) => {
    setEmployeeCount(count);
  };

  return (
    <section className="py-20 sm:py-32 bg-[#060606] border-b-4 border-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.3em] mb-4">
            <Zap size={14} className="text-accent" />
            <span>AUTOMATION ROI CALCULATOR</span>
          </div>

          <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.88] mb-6">
            THE COST OF <br />
            <span className="text-white/20">MANUAL</span> <span className="text-accent">WORK</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed">
            When skilled team members spend hours every week on repetitive data entry, reporting, and manual checks, it slows down your entire organization. Select your sector and team size below to estimate how much time and budget you can recover with automation.
          </p>
        </div>

        {/* Main 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: INPUT CONTROLS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: SELECT INDUSTRY */}
            <div className="border-2 sm:border-4 border-white bg-black p-6 sm:p-8 shadow-[8px_8px_0px_#ffffff]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  01. SELECT YOUR INDUSTRY OR DEPARTMENT
                </span>
                <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                  7 CORE SECTORS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INDUSTRIES.map((industry) => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustryId === industry.id;

                  return (
                    <button
                      key={industry.id}
                      type="button"
                      onClick={() => setSelectedIndustryId(industry.id)}
                      className={`text-left p-4 border-2 transition-all flex items-start gap-3.5 relative overflow-hidden ${
                        isSelected
                          ? 'bg-accent text-white border-accent shadow-[4px_4px_0px_#ffffff]'
                          : 'bg-white/[0.02] text-white/80 border-white/15 hover:border-white/50'
                      }`}
                    >
                      <div className={`p-2 border ${isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10'}`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-sans font-black text-xs sm:text-sm uppercase tracking-tight leading-snug">
                          {industry.shortName}
                        </div>
                        <div className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 truncate ${isSelected ? 'text-white/90' : 'text-white/40'}`}>
                          ~${industry.avgHourlyCost}/hr avg. cost
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Industry Diagnostic Detail */}
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-white/70 space-y-1">
                <div className="text-white/40 uppercase tracking-widest text-[9px]">Common Bottlenecks in {currentIndustry.shortName}:</div>
                <p className="text-white/90 font-sans text-xs sm:text-sm">{currentIndustry.typicalFriction}</p>
              </div>
            </div>

            {/* STEP 2: SELECT EMPLOYEES DOING REPETITIVE WORK */}
            <div className="border-2 sm:border-4 border-white bg-black p-6 sm:p-8 shadow-[8px_8px_0px_#ff3200]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  <Users size={16} />
                  <span>02. TEAM MEMBERS DOING REPETITIVE WORK</span>
                </span>
                <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                  TEAM SIZE
                </span>
              </div>

              {/* Large Current Number Counter */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                <div>
                  <div className="font-sans font-black text-5xl sm:text-6xl text-white tracking-tighter flex items-baseline gap-2 tabular-nums">
                    <span>{employeeCount}</span>
                    <span className="text-lg sm:text-xl font-mono text-accent uppercase font-bold tracking-widest">
                      {employeeCount === 1 ? 'EMPLOYEE' : 'EMPLOYEES'}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">
                    Averaging ~{currentIndustry.weeklyRepetitiveHours} hrs/week on manual tasks per person
                  </p>
                </div>

                <div className="font-mono text-xs text-accent font-bold bg-accent/10 border border-accent/30 px-3 py-1.5 h-fit w-fit tabular-nums">
                  {formatNumber(employeeCount * currentIndustry.weeklyRepetitiveHours)} hrs/week spent on manual tasks
                </div>
              </div>

              {/* Interactive Range Slider */}
              <div className="space-y-4 mb-8">
                <label htmlFor={sliderId} className="sr-only">
                  Number of employees doing manual and repetitive work
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min="1"
                  max="350"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#ff3200] [color-scheme:dark]"
                />
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
                  <span>1 Employee</span>
                  <span>50</span>
                  <span>150</span>
                  <span>250</span>
                  <span>350+ Employees</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
                  Quick Select Team Size:
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePreset(preset)}
                      className={`font-mono text-xs font-bold px-4 py-2 border-2 transition-all ${
                        employeeCount === preset
                          ? 'bg-white text-black border-white shadow-[2px_2px_0px_#ff3200]'
                          : 'bg-white/5 text-white/70 border-white/15 hover:border-white/50 hover:text-white'
                      }`}
                    >
                      {preset} People
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DYNAMIC REAL-TIME ROI & SAVINGS REPORT */}
          <div className="lg:col-span-5">
            <div className="border-4 border-accent bg-black p-6 sm:p-8 lg:p-10 shadow-[12px_12px_0px_#ffffff] lg:sticky lg:top-28">
              
              <div className="font-mono text-[10px] text-accent font-black uppercase tracking-[0.3em] mb-2 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>ESTIMATED ANNUAL IMPACT</span>
                <span>75% AUTOMATION TARGET</span>
              </div>

              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-1">
                  ESTIMATED COST OF MANUAL WORK:
                </span>
                <div className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tight leading-none tabular-nums">
                  {formatCurrency(annualCapitalBleed)} <span className="text-base font-normal text-white/50">/yr</span>
                </div>
                <p className="font-mono text-[11px] text-red-400 uppercase tracking-wider mt-2 flex items-center gap-1.5 tabular-nums">
                  <TrendingDown size={14} />
                  <span>{formatNumber(annualHoursWasted)} hours per year spent on repetitive tasks</span>
                </p>
              </div>

              {/* The Reclaimable AI Upside Box */}
              <div className="bg-accent text-white p-6 shadow-[6px_6px_0px_#000000] mb-8">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-black block mb-1">
                  POTENTIAL ANNUAL SAVINGS
                </span>
                <div className="font-sans font-black text-3xl sm:text-4xl tracking-tight leading-none mb-3 tabular-nums">
                  {formatCurrency(annualCapitalReclaimed)} <span className="text-base font-normal">/yr</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-white/95 leading-relaxed">
                  Reclaim roughly <strong>{formatNumber(annualHoursReclaimed)} hours per year</strong> so your staff can focus on high-value operations and service delivery.
                </p>
              </div>

              {/* Specific Solution Callout */}
              <div className="space-y-4 mb-8 text-xs font-mono">
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-accent uppercase tracking-widest font-bold mb-1">
                    HOW WE SOLVE THIS:
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {currentIndustry.solutionVector}
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-white/40 uppercase tracking-widest text-[9px] mb-1">
                    OUR EXPERIENCE:
                  </div>
                  <p className="font-sans text-xs text-white/90">
                    {currentIndustry.provenMetric}
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBriefModalOpen(true)}
                  className="w-full bg-white text-black py-4 px-6 font-sans font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 hover:bg-accent hover:text-white transition-all shadow-[4px_4px_0px_#ff3200] cursor-pointer"
                >
                  <FileText size={16} />
                  <span>Export 1-Page Executive Brief (PDF)</span>
                </button>
                <a
                  href="#ai-audit"
                  className="w-full border-2 border-white/25 text-white py-3.5 px-6 font-mono font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:border-white hover:bg-white/5 transition-all"
                >
                  <span>Run Full AI Readiness Audit</span>
                  <ArrowRight size={15} />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      <ExecutiveRoiBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        data={{
          sourceLabel: 'Automation ROI & Manual Labor Assessment',
          sectorOrFocus: currentIndustry.name,
          teamOrScopeSummary: `${employeeCount} staff · ~${currentIndustry.weeklyRepetitiveHours} hrs/wk manual`,
          annualCurrentCost: `${formatCurrency(annualCapitalBleed)}/yr`,
          annualProjectedSavings: `${formatCurrency(annualCapitalReclaimed)}/yr`,
          reclaimableHours: `${formatNumber(annualHoursReclaimed)} hrs/yr`,
          estimatedPayback: employeeCount >= 50 ? '6 – 9 Weeks' : '8 – 12 Weeks',
          readinessHeadline: `${currentIndustry.shortName} Pilot`,
          bottleneckSummary: currentIndustry.typicalFriction,
          recommendedArchitecture: currentIndustry.solutionVector,
          provenBenchmark: currentIndustry.provenMetric,
          deploymentRecommendation:
            currentIndustry.id === 'government-public'
              ? 'On-Premise Air-Gapped or Sovereign Private VPC'
              : 'Private Cloud VPC or Hybrid Sovereign Mesh'
        }}
      />
    </section>
  );
}
