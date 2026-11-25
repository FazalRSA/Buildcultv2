import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Clock, DollarSign, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

interface WorkflowStep {
  title: string;
  durationLabel: string;
  detail: string;
}

interface ScenarioConfig {
  id: 'kyc-fraud' | 'auto-quoting' | 'public-sector';
  label: string;
  benchmarkClient: string;
  headlineDelta: string;
  legacyTotalHours: number;
  legacyCostPerCase: number;
  automatedTotalSeconds: number;
  automatedCostPerCase: number;
  legacySteps: WorkflowStep[];
  automatedSteps: WorkflowStep[];
}

const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'kyc-fraud',
    label: '01. KYC & Fraud Triage',
    benchmarkClient: 'Hollywoodbets & Banking Scale (10M+ daily events)',
    headlineDelta: '99.8% Faster · 96% Lower Cost Per Verification',
    legacyTotalHours: 6.5,
    legacyCostPerCase: 18.5,
    automatedTotalSeconds: 1.4,
    automatedCostPerCase: 0.35,
    legacySteps: [
      { title: 'Document Queue Backlog', durationLabel: '2.5 hrs', detail: 'Player/customer uploads ID & proof of address into manual review queue.' },
      { title: 'Manual OCR & Cross-Check', durationLabel: '1.5 hrs', detail: 'Analyst visually compares ID fields against core database records.' },
      { title: 'Rule-Based Fraud Lookup', durationLabel: '1.0 hr', detail: 'Separate spreadsheet checks for duplicate accounts and bonus syndicates.' },
      { title: 'Supervisor Escalation', durationLabel: '1.5 hrs', detail: 'Manual sign-off before payouts or onboarding are approved.' }
    ],
    automatedSteps: [
      { title: 'Instant Vision Extraction', durationLabel: '0.3s', detail: 'Deterministic OCR + tamper detection extracts & validates ID fields.' },
      { title: 'Sub-12ms Graph Risk Scoring', durationLabel: '0.2s', detail: 'Streaming AI model checks device fingerprints and syndicate links live.' },
      { title: 'Automated Core API Sync', durationLabel: '0.5s', detail: 'Writes verified KYC token directly into ledger and compliance log.' },
      { title: 'Zero-Touch Clearance', durationLabel: '0.4s', detail: 'Approved instantly; only edge-case anomalies route to human review.' }
    ]
  },
  {
    id: 'auto-quoting',
    label: '02. Custom Automotive Quoting',
    benchmarkClient: 'BMW / Forged Performance Scale (+285% build conversion)',
    headlineDelta: '48 Hours → 4.2 Seconds · Zero Fitment Errors',
    legacyTotalHours: 48,
    legacyCostPerCase: 145,
    automatedTotalSeconds: 4.2,
    automatedCostPerCase: 0.8,
    legacySteps: [
      { title: 'Static PDF Spec Request', durationLabel: '12.0 hrs', detail: 'Buyer emails desired wheel, aero & ECU upgrades from a static brochure.' },
      { title: 'Manual BOM Compatibility Check', durationLabel: '14.0 hrs', detail: 'Sales engineer cross-references fitment charts and chassis clearances manually.' },
      { title: 'Warehouse & Supplier Pricing', durationLabel: '16.0 hrs', detail: 'Manual phone/email checks for forged stock availability and lead times.' },
      { title: 'Manual Quote & Workshop Slot', durationLabel: '6.0 hrs', detail: 'Typed invoice sent days later after buyer momentum has cooled.' }
    ],
    automatedSteps: [
      { title: '3D Spatial Build Selection', durationLabel: '1.2s', detail: 'Buyer configures custom forged package interactively at 60fps in browser.' },
      { title: 'Deterministic Fitment Engine', durationLabel: '0.6s', detail: 'Automated engineering rules validate chassis clearances and ECU compatibility.' },
      { title: 'Live ERP Stock & BOM Pricing', durationLabel: '1.1s', detail: 'Real-time API pulls exact parts availability, shipping, and margin pricing.' },
      { title: 'Instant CRM & Bay Booking', durationLabel: '1.3s', detail: 'Pre-qualified build sheet routes straight to sales with locked quote.' }
    ]
  },
  {
    id: 'public-sector',
    label: '03. Public Sector Document Ops',
    benchmarkClient: 'Government Departments & Municipal Agencies (POPIA Air-Gapped)',
    headlineDelta: '5 Days → 2.6 Seconds · Full Forensic Audit Trail',
    legacyTotalHours: 36,
    legacyCostPerCase: 92,
    automatedTotalSeconds: 2.6,
    automatedCostPerCase: 0.5,
    legacySteps: [
      { title: 'Physical & PDF Intake', durationLabel: '8.0 hrs', detail: 'Applications, tax clearances, and tender annexures stacked across inboxes.' },
      { title: 'Manual Data Re-Keying', durationLabel: '10.0 hrs', detail: 'Clerks re-type applicant fields into legacy departmental databases.' },
      { title: 'Compliance & Cross-Dept Check', durationLabel: '12.0 hrs', detail: 'Manual verification of ID registries, tax standing, and regulatory rules.' },
      { title: 'Committee File Assembly', durationLabel: '6.0 hrs', detail: 'Manual summary report prepared with high risk of transcription error.' }
    ],
    automatedSteps: [
      { title: 'On-Premise Sovereign Ingestion', durationLabel: '0.6s', detail: 'Air-gapped OCR parses multi-page PDFs & scanned forms inside local firewall.' },
      { title: 'Deterministic Policy Verification', durationLabel: '0.7s', detail: 'Automated cross-check against compliance rules with exact source citations.' },
      { title: 'Direct Departmental DB Sync', durationLabel: '0.7s', detail: 'Structured payload written cleanly with immutable forensic audit trail.' },
      { title: 'Exception-Only Officer Review', durationLabel: '0.6s', detail: 'Complete files fast-tracked; discrepancies flagged with exact page citations.' }
    ]
  }
];

export default function WorkflowSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<'kyc-fraud' | 'auto-quoting' | 'public-sector'>('kyc-fraud');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100); // Start completed so value is immediately visible on load
  const timerRef = useRef<number | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const runSimulation = (targetScenarioId?: ScenarioConfig['id']) => {
    stopTimer();
    if (targetScenarioId) {
      setActiveScenarioId(targetScenarioId);
    }
    setProgress(0);
    setIsRunning(true);

    let current = 0;
    timerRef.current = window.setInterval(() => {
      current += 2;
      if (current >= 100) {
        setProgress(100);
        setIsRunning(false);
        stopTimer();
      } else {
        setProgress(current);
      }
    }, 55);
  };

  const handleReset = () => {
    stopTimer();
    setIsRunning(false);
    setProgress(0);
  };

  // Automated track finishes in the first 24% of the visual replay while legacy grinds to 100%
  const automatedPct = Math.min(100, Math.round((progress / 24) * 100));
  const legacyPct = progress;

  const autoCompletedSteps = Math.floor((automatedPct / 100) * scenario.automatedSteps.length);
  const legacyCompletedSteps = Math.floor((legacyPct / 100) * scenario.legacySteps.length);

  const displayedAutoSeconds = ((automatedPct / 100) * scenario.automatedTotalSeconds).toFixed(1);
  const displayedAutoCost = ((automatedPct / 100) * scenario.automatedCostPerCase).toFixed(2);

  const displayedLegacyHours = ((legacyPct / 100) * scenario.legacyTotalHours).toFixed(1);
  const displayedLegacyCost = ((legacyPct / 100) * scenario.legacyCostPerCase).toFixed(2);

  return (
    <section
      id="workflow-simulator"
      className="py-20 sm:py-28 bg-[#050505] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">
              <Zap size={14} className="text-accent" />
              <span>Interactive Side-by-Side Comparison</span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] text-white">
              LEGACY MANUAL <br />
              <span className="text-white/25">VS.</span>{' '}
              <span className="text-accent">AUTOMATED</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => runSimulation()}
              className="bg-accent text-white px-6 py-3.5 font-sans font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 shadow-[4px_4px_0px_#ffffff] whitespace-nowrap cursor-pointer"
            >
              <Play size={14} fill="currentColor" />
              <span>{isRunning ? 'Simulating...' : 'Run Live Simulation'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border-2 border-white/25 text-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider hover:border-white hover:bg-white/5 transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {SCENARIOS.map((item) => {
            const isSelected = item.id === activeScenarioId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => runSimulation(item.id)}
                className={`text-left p-4 sm:p-5 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[5px_5px_0px_#ff3200]'
                    : 'bg-white/[0.02] text-white border-white/15 hover:border-white/45'
                }`}
              >
                <div className="font-sans font-black text-sm sm:text-base uppercase tracking-tight mb-1">
                  {item.label}
                </div>
                <div className={`font-mono text-[10px] ${isSelected ? 'text-black/65' : 'text-white/50'}`}>
                  {item.benchmarkClient}
                </div>
              </button>
            );
          })}
        </div>

        {/* Outcome Summary Banner */}
        <div className="border border-white/15 bg-white/[0.03] px-5 py-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <span className="text-white/70">Active Benchmark: <strong className="text-white">{scenario.benchmarkClient}</strong></span>
          <span className="text-accent font-bold uppercase tracking-wider">{scenario.headlineDelta}</span>
        </div>

        {/* Side-by-Side Execution Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* LEFT: LEGACY MANUAL WORKFLOW */}
          <div className="border-2 border-white/20 bg-[#0b0b0b] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 font-bold mb-1 flex items-center gap-1.5">
                    <AlertTriangle size={13} className="text-white/45" />
                    <span>Legacy Manual Workflow</span>
                  </div>
                  <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white/90">
                    Human Queues &amp; Spreadsheets
                  </h3>
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-white/50 tabular-nums">
                  {legacyPct}%
                </div>
              </div>

              {/* Legacy Counters */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-black border border-white/10 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1">
                    <Clock size={11} />
                    <span>Simulated Elapsed Time</span>
                  </div>
                  <div className="font-sans font-black text-2xl sm:text-3xl text-white/80 tabular-nums">
                    {displayedLegacyHours} <span className="text-sm font-mono text-white/40">hrs</span>
                  </div>
                </div>
                <div className="bg-black border border-white/10 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1">
                    <DollarSign size={11} />
                    <span>Processing Cost / Case</span>
                  </div>
                  <div className="font-sans font-black text-2xl sm:text-3xl text-white/80 tabular-nums">
                    ${displayedLegacyCost}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 mb-6 overflow-hidden">
                <div
                  className="h-full bg-white/45 transition-all duration-75"
                  style={{ width: `${legacyPct}%` }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {scenario.legacySteps.map((step, idx) => {
                  const done = idx < legacyCompletedSteps;
                  const active = idx === legacyCompletedSteps && isRunning && legacyPct < 100;
                  return (
                    <div
                      key={step.title}
                      className={`p-4 border transition-colors ${
                        done
                          ? 'border-white/25 bg-white/[0.04]'
                          : active
                          ? 'border-white/50 bg-white/[0.07]'
                          : 'border-white/10 bg-black/40 opacity-55'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-sans font-bold text-sm text-white">
                          0{idx + 1}. {step.title}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-white/60 tabular-nums whitespace-nowrap">
                          {step.durationLabel}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-white/60 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: BUILD CULT AUTOMATED PIPELINE */}
          <div className="border-2 sm:border-4 border-accent bg-black p-6 sm:p-8 shadow-[8px_8px_0px_#ff3200] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-white/15">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-1 flex items-center gap-1.5">
                    <Zap size={13} className="text-accent" />
                    <span>Build Cult Production Pipeline</span>
                  </div>
                  <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    Deterministic AI &amp; Direct APIs
                  </h3>
                </div>
                <div className="font-mono text-xs font-black uppercase tracking-wider text-accent tabular-nums">
                  {automatedPct === 100 ? 'COMPLETE' : `${automatedPct}%`}
                </div>
              </div>

              {/* Automated Counters */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white text-black border-2 border-black p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-black/55 font-bold mb-1 flex items-center gap-1">
                    <Clock size={11} className="text-accent" />
                    <span>Simulated Elapsed Time</span>
                  </div>
                  <div className="font-sans font-black text-2xl sm:text-3xl text-black tabular-nums">
                    {displayedAutoSeconds} <span className="text-sm font-mono text-accent">sec</span>
                  </div>
                </div>
                <div className="bg-accent text-white border-2 border-black p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-black font-bold mb-1 flex items-center gap-1">
                    <DollarSign size={11} className="text-black" />
                    <span>Processing Cost / Case</span>
                  </div>
                  <div className="font-sans font-black text-2xl sm:text-3xl text-white tabular-nums">
                    ${displayedAutoCost}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 mb-6 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${automatedPct}%` }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {scenario.automatedSteps.map((step, idx) => {
                  const done = idx < autoCompletedSteps;
                  return (
                    <div
                      key={step.title}
                      className={`p-4 border transition-colors ${
                        done
                          ? 'border-accent/60 bg-accent/10'
                          : 'border-white/10 bg-white/[0.02] opacity-55'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-sans font-bold text-sm text-white flex items-center gap-2">
                          <CheckCircle2
                            size={14}
                            className={done ? 'text-accent shrink-0' : 'text-white/25 shrink-0'}
                          />
                          <span>0{idx + 1}. {step.title}</span>
                        </span>
                        <span className="font-mono text-[11px] font-black text-accent tabular-nums whitespace-nowrap">
                          {step.durationLabel}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-white/80 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
