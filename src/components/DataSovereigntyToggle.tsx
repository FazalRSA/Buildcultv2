import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Server,
  Cloud,
  Lock,
  Check,
  FileCheck2,
  Database,
  ArrowRight
} from 'lucide-react';

interface DeploymentMode {
  id: 'private-vpc' | 'on-prem' | 'hybrid-mesh';
  index: string;
  name: string;
  subtitle: string;
  idealFor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  residencyLabel: string;
  modelHosting: string;
  egressPolicy: string;
  complianceStandards: string[];
  auditTrail: string;
  ipOwnership: string;
  rolloutWindow: string;
  topologySteps: { zone: string; title: string; detail: string; sovereign: boolean }[];
}

const DEPLOYMENT_MODES: DeploymentMode[] = [
  {
    id: 'private-vpc',
    index: '01',
    name: 'Private Cloud VPC',
    subtitle: 'Dedicated tenant isolation inside regional cloud boundaries.',
    idealFor: 'Mid-market & Enterprise SaaS, Fintech, Retail, Automotive & Gaming',
    icon: Cloud,
    residencyLabel: 'South Africa North (Johannesburg) / Cape Town / EU-West VPC',
    modelHosting: 'Private Azure OpenAI / AWS Bedrock / Dedicated vLLM GPU Nodes inside your VPC',
    egressPolicy: 'Zero public model training retention · PrivateLink / VPN peering only',
    complianceStandards: ['POPIA Compliant', 'GDPR Ready', 'ISO 27001 Controls', 'SOC 2 Type II Architecture'],
    auditTrail: 'Immutable prompt/response ledger, RBAC token scoping, and PII redaction proxy before inference.',
    ipOwnership: '100% client-owned code, infrastructure-as-code (Terraform), and fine-tuned weights.',
    rolloutWindow: '2 – 4 Weeks to Production',
    topologySteps: [
      { zone: 'Your ERP / CRM', title: 'Encrypted Connectors', detail: 'Read/write via scoped OAuth & PrivateLink', sovereign: true },
      { zone: 'PII Guardrail Layer', title: 'Redaction & Policy Proxy', detail: 'Strips ID numbers, card PANs & secrets', sovereign: true },
      { zone: 'Dedicated VPC Inference', title: 'Private Model Endpoint', detail: 'Zero data logging, zero external training', sovereign: true }
    ]
  },
  {
    id: 'on-prem',
    index: '02',
    name: 'On-Premise Air-Gapped',
    subtitle: '100% local hardware execution with zero external internet egress.',
    idealFor: 'Government Departments, National Treasury, Defense, Courts & Tier-1 Banks',
    icon: Server,
    residencyLabel: 'Strict Sovereign On-Premise Data Center (Zero Cloud Egress)',
    modelHosting: 'Self-hosted open-weight models (Llama / Mistral / Qwen / Custom OCR) on local GPU clusters',
    egressPolicy: 'Physically air-gapped · Zero packets leave your national or institutional perimeter',
    complianceStandards: ['POPIA Strict Local', 'State Security & SITA Aligned', 'Zero-Trust Air-Gap', 'Full Forensic Audit'],
    auditTrail: 'Hardware-backed encryption keys (HSM), local SIEM log streaming, and deterministic human-in-the-loop sign-off.',
    ipOwnership: '100% sovereign ownership of container images, model checkpoints, and source repositories.',
    rolloutWindow: '4 – 8 Weeks On-Site Deployment',
    topologySteps: [
      { zone: 'Internal Registry / DB', title: 'Local LAN Pipeline', detail: 'Direct internal network access only', sovereign: true },
      { zone: 'Air-Gapped Firewall', title: 'Zero-Egress Enforcement', detail: 'No external APIs or cloud dependencies', sovereign: true },
      { zone: 'On-Prem GPU Cluster', title: 'Sovereign Local Weights', detail: 'Full local inference + SIEM audit logs', sovereign: true }
    ]
  },
  {
    id: 'hybrid-mesh',
    index: '03',
    name: 'Hybrid Sovereign Mesh',
    subtitle: 'Sensitive citizen or financial PII stays on-premise; general orchestration scales in VPC.',
    idealFor: 'Multi-Branch Hospitals, Municipalities, Insurance Groups & Telecom Operators',
    icon: Lock,
    residencyLabel: 'Split-Boundary: Regulated PII On-Prem · Anonymized Orchestration in Regional VPC',
    modelHosting: 'Local edge/on-prem extractors for PII + private regional cloud reasoning for anonymized payloads',
    egressPolicy: 'Automatic PII tokenization before leaving local premises · Re-hydration inside local boundary',
    complianceStandards: ['POPIA Cross-Border Safe', 'HIPAA / Health Data Controls', 'PCI-DSS Isolation', 'Role-Based Access'],
    auditTrail: 'Dual-boundary cryptographic correlation IDs verifying every masked payload and re-hydrated output.',
    ipOwnership: '100% client-owned orchestration layer, routing rules, and audit tooling.',
    rolloutWindow: '3 – 6 Weeks Phased Rollout',
    topologySteps: [
      { zone: 'Local Vault', title: 'PII Tokenization Node', detail: 'Replaces sensitive identities with local tokens', sovereign: true },
      { zone: 'Regional Private VPC', title: 'Anonymized AI Reasoning', detail: 'High-throughput processing on scrubbed data', sovereign: true },
      { zone: 'Local Re-Hydration', title: 'Verified Write-Back', detail: 'Re-attaches identities inside your firewall', sovereign: true }
    ]
  }
];

export default function DataSovereigntyToggle() {
  const [selectedModeId, setSelectedModeId] = useState<'private-vpc' | 'on-prem' | 'hybrid-mesh'>('on-prem');
  const activeMode = DEPLOYMENT_MODES.find((m) => m.id === selectedModeId) || DEPLOYMENT_MODES[1];
  const ActiveIcon = activeMode.icon;

  return (
    <section
      id="security-sovereignty"
      className="py-20 sm:py-28 bg-[#080808] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">
              <ShieldCheck size={14} className="text-accent" />
              <span>Enterprise &amp; Government Procurement Readiness</span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] text-white">
              DATA SOVEREIGNTY <br />
              <span className="text-white/25">&amp; ZERO-LEAK</span>{' '}
              <span className="text-accent">SECURITY</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light">
              Banks, insurers, and government departments do not stall on AI capability—they stall on POPIA compliance, data residency, and air-gapped security. Select your required deployment boundary below to inspect how we protect your data.
            </p>
          </div>
        </div>

        {/* Interactive 3-Mode Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8" role="tablist" aria-label="Deployment Architecture Selector">
          {DEPLOYMENT_MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = mode.id === selectedModeId;
            return (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedModeId(mode.id)}
                className={`text-left p-5 sm:p-6 border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[6px_6px_0px_#ff3200]'
                    : 'bg-white/[0.02] text-white border-white/15 hover:border-white/45'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono text-xs font-black ${isSelected ? 'text-accent' : 'text-white/40'}`}>
                      {mode.index}
                    </span>
                    <Icon size={20} className={isSelected ? 'text-black' : 'text-white/60'} />
                  </div>
                  <div className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight mb-1.5">
                    {mode.name}
                  </div>
                  <p className={`font-sans text-xs leading-relaxed ${isSelected ? 'text-black/75' : 'text-white/60'}`}>
                    {mode.subtitle}
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t font-mono text-[10px] uppercase tracking-wider ${
                  isSelected ? 'border-black/15 text-black font-bold' : 'border-white/10 text-white/45'
                }`}>
                  {mode.rolloutWindow}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Architecture Specification Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="border-2 sm:border-4 border-white bg-black p-6 sm:p-10 shadow-[10px_10px_0px_rgba(255,50,0,0.22)]"
          >
            {/* Top Row: Mode Summary & Compliance Standards */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-8 border-b border-white/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center shrink-0 border-2 border-white">
                  <ActiveIcon size={24} />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
                    Active Architecture · {activeMode.rolloutWindow}
                  </div>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                    {activeMode.name}
                  </h3>
                  <p className="font-mono text-xs text-white/60 mt-1">
                    Ideal for: {activeMode.idealFor}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-white/85">
                {activeMode.complianceStandards.map((std, i) => (
                  <span key={std} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Check size={13} className="text-accent shrink-0" />
                    <span>{std}</span>
                    {i < activeMode.complianceStandards.length - 1 && (
                      <span className="text-white/20 ml-2 hidden sm:inline" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Flow Boundary Diagram */}
            <div className="mb-8">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2">
                <Database size={13} className="text-accent" />
                <span>Verified Data Residency &amp; Execution Path</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeMode.topologySteps.map((node, idx) => (
                  <div
                    key={idx}
                    className="relative border border-white/20 bg-white/[0.03] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                          Stage 0{idx + 1} · {node.zone}
                        </span>
                        <Lock size={13} className="text-white/40" />
                      </div>
                      <div className="font-sans font-black text-base uppercase tracking-tight text-white mb-1">
                        {node.title}
                      </div>
                      <p className="font-sans text-xs text-white/70 leading-relaxed">
                        {node.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Security Specification Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="border border-white/10 bg-[#0b0b0b] p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1.5">
                  Data Residency Boundary
                </div>
                <p className="font-sans text-sm text-white font-medium leading-relaxed">
                  {activeMode.residencyLabel}
                </p>
              </div>

              <div className="border border-white/10 bg-[#0b0b0b] p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1.5">
                  Model Inference Hosting
                </div>
                <p className="font-sans text-sm text-white font-medium leading-relaxed">
                  {activeMode.modelHosting}
                </p>
              </div>

              <div className="border border-white/10 bg-[#0b0b0b] p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1.5">
                  Network Egress &amp; Training Policy
                </div>
                <p className="font-sans text-sm text-white/90 leading-relaxed">
                  {activeMode.egressPolicy}
                </p>
              </div>

              <div className="border border-white/10 bg-[#0b0b0b] p-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/45 mb-1.5">
                  Audit Trails &amp; IP Ownership
                </div>
                <p className="font-sans text-sm text-white/90 leading-relaxed">
                  {activeMode.auditTrail} {activeMode.ipOwnership}
                </p>
              </div>
            </div>

            {/* Bottom Procurement CTA Strip */}
            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-mono text-xs text-white/75">
                <FileCheck2 size={18} className="text-accent shrink-0" />
                <span>Need an architecture security pack for InfoSec, ExCo, or public-sector tender compliance?</span>
              </div>
              <a
                href="#contact"
                className="bg-white text-black px-6 py-3 font-sans font-black text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-[4px_4px_0px_#ff3200]"
              >
                <span>Request Security Pack</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
