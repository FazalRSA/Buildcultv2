import React from 'react';
import {
  Cpu,
  Database,
  ShieldCheck,
  Gauge,
  TrendingUp
} from 'lucide-react';

export type NodeId =
  | 'legacy-erp'
  | 'security-gate'
  | 'ai-agent-layer'
  | 'telemetry-3d'
  | 'gtm-pipeline';

export type CameraPreset = 'isometric' | 'top' | 'profile' | 'focus';

export interface ArchitectureNodeSpec {
  id: NodeId;
  index: string;
  name: string;
  shortLabel: string;
  category: string;
  position: [number, number, number];
  labelHeight: number;
  focusCamera: {
    pos: [number, number, number];
    target: [number, number, number];
  };
  latency: string;
  throughput: string;
  deploymentPattern: string;
  summary: string;
  stack: string[];
  upstream: NodeId[];
  downstream: NodeId[];
  clientProof: string;
  contractTitle: string;
  contractPayload: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const ARCH_NODES: ArchitectureNodeSpec[] = [
  {
    id: 'legacy-erp',
    index: '01',
    name: 'Legacy ERP & Core Databases',
    shortLabel: 'Legacy ERP',
    category: 'Data Foundation',
    position: [-4.5, 0, 2.3],
    labelHeight: 2.55,
    focusCamera: {
      pos: [-0.8, 4.8, 6.8],
      target: [-4.5, 1.0, 2.3]
    },
    latency: 'Zero Downtime',
    throughput: 'SAP · Oracle · SQL · REST',
    deploymentPattern: 'Non-Invasive CDC Strangler',
    summary:
      'Streams real-time state from legacy ERPs, on-premise SQL ledgers, and document repositories into modern event queues without risking a disruptive rip-and-replace migration.',
    stack: ['Change Data Capture (CDC)', 'Idempotent API Wrappers', 'Structured OCR Ingestion'],
    upstream: [],
    downstream: ['security-gate', 'ai-agent-layer'],
    clientProof:
      'Nova Havens: Bi-directional legacy CRM & financial ledger synchronization operating at 99.4% reconciliation accuracy.',
    contractTitle: 'CDC Event Envelope (erp.order.updated)',
    contractPayload: `{
  "event": "erp.ledger.reconcile",
  "source": "sap_s4_prod_eu_south",
  "mode": "read_through_cdc",
  "schema_version": "2.4",
  "records_batched": 1480,
  "checksum": "sha256:9f84a2c...11e"
}`,
    icon: Database
  },
  {
    id: 'security-gate',
    index: '02',
    name: 'POPIA & Sovereign Security Gate',
    shortLabel: 'Security Gate',
    category: 'Governance & Compliance',
    position: [-2.0, 0, -2.0],
    labelHeight: 2.95,
    focusCamera: {
      pos: [2.2, 4.9, 2.4],
      target: [-2.0, 1.2, -2.0]
    },
    latency: '< 3ms Policy Check',
    throughput: 'Zero 3rd-Party Retention',
    deploymentPattern: 'VPC / Air-Gapped Proxy',
    summary:
      'Inspects every inbound and outbound payload to tokenize PII, enforce role-based access controls, and write tamper-evident forensic audit logs inside your own sovereign boundary.',
    stack: ['Deterministic PII Tokenization', 'Air-Gapped On-Premise Ready', 'SIEM Audit Ledger'],
    upstream: ['legacy-erp'],
    downstream: ['ai-agent-layer'],
    clientProof:
      'Enterprise & Public Sector: Strict POPIA local data residency and zero-egress firewall verification for regulated workloads.',
    contractTitle: 'Policy Gate Decision (sec.policy.allow)',
    contractPayload: `{
  "policy_id": "popia_strict_v3",
  "residency": "za-johannesburg-vpc",
  "pii_fields_tokenized": ["id_number", "iban"],
  "egress_blocked": true,
  "audit_hash": "0x7c4e...d891"
}`,
    icon: ShieldCheck
  },
  {
    id: 'ai-agent-layer',
    index: '03',
    name: 'AI Agent Layer',
    shortLabel: 'AI Agent Layer',
    category: 'Production Inference Core',
    position: [0.3, 0, 0.2],
    labelHeight: 3.75,
    focusCamera: {
      pos: [5.4, 5.4, 5.8],
      target: [0.3, 1.5, 0.2]
    },
    latency: '< 12ms p99 Inference',
    throughput: '10M+ Events / Day',
    deploymentPattern: 'Multi-Agent Orchestration Mesh',
    summary:
      'Coordinates specialized reasoning agents, private vector retrieval, and deterministic business-rule validators with strict schema enforcement and human-in-the-loop escalation.',
    stack: ['Streaming Inference Mesh', 'Private Hybrid RAG', 'Deterministic Output Guardrails'],
    upstream: ['legacy-erp', 'security-gate'],
    downstream: ['telemetry-3d', 'gtm-pipeline'],
    clientProof:
      'Hollywoodbets: 4.6x first-year ROI scoring 10M+ daily transactions with a 42% reduction in automated fraud leakage.',
    contractTitle: 'Agent Execution Trace (agent.triage.resolved)',
    contractPayload: `{
  "agent": "risk_triage_orchestrator",
  "confidence": 0.984,
  "tools_invoked": ["ledger_lookup", "kyc_verify"],
  "guardrail_pass": true,
  "latency_ms": 11.4,
  "action": "auto_approve_tier_1"
}`,
    icon: Cpu
  },
  {
    id: 'telemetry-3d',
    index: '04',
    name: 'User-Facing Apps & 3D Studio',
    shortLabel: 'User Apps & 3D',
    category: 'Spatial & Digital Flagship',
    position: [3.6, 0, -2.3],
    labelHeight: 2.85,
    focusCamera: {
      pos: [7.8, 4.9, 2.2],
      target: [3.6, 1.1, -2.3]
    },
    latency: '60fps Native WebGL',
    throughput: '< 5ms Telemetry Stream',
    deploymentPattern: 'Edge-Rendered Web & Spatial',
    summary:
      'High-conversion web and mobile products, interactive 3D configurators, and industrial digital twins that surface live AI intelligence directly to customers and operators.',
    stack: ['Three.js & WebGL PBR', 'Real-Time Telemetry Streams', 'Interactive BOM Configurators'],
    upstream: ['ai-agent-layer'],
    downstream: ['gtm-pipeline'],
    clientProof:
      'BMW / Forged: 3.8x ROI and +285% high-ticket build conversions via real-time 60fps browser-native 3D configurator.',
    contractTitle: 'Spatial Configurator State (app.build.configured)',
    contractPayload: `{
  "surface": "web_3d_configurator",
  "sku_assembly": "bmw_g82_forged_track",
  "fitment_validated": true,
  "frame_budget_ms": 14.2,
  "quote_handoff": "gtm_pipeline_instant"
}`,
    icon: Gauge
  },
  {
    id: 'gtm-pipeline',
    index: '05',
    name: 'GTM Pipeline & Revenue Engine',
    shortLabel: 'GTM Pipeline',
    category: 'Commercial Modernization',
    position: [4.2, 0, 2.5],
    labelHeight: 2.95,
    focusCamera: {
      pos: [8.4, 5.1, 7.1],
      target: [4.2, 1.1, 2.5]
    },
    latency: 'Instant Routing',
    throughput: '3.4x Pipeline Velocity',
    deploymentPattern: 'Event-Driven RevOps Stack',
    summary:
      'Connects product intent, automated BOM quoting, CRM enrichment, and attribution pipelines so engineering velocity converts directly into measurable commercial pipeline.',
    stack: ['Automated BOM Quoting', 'Signal-Based Enrichment', 'Closed-Loop Attribution'],
    upstream: ['ai-agent-layer', 'telemetry-3d'],
    downstream: [],
    clientProof:
      'Cross-Sector: Eliminates 48-hour manual quoting lags and lifts enterprise close rates across automotive and B2B.',
    contractTitle: 'Revenue Pipeline Dispatch (gtm.quote.issued)',
    contractPayload: `{
  "pipeline": "enterprise_high_intent",
  "quote_generated_sec": 1.8,
  "crm_synced": "hubspot_salesforce_dual",
  "margin_guardrail": "verified",
  "owner_routed": "regional_exec_desk"
}`,
    icon: TrendingUp
  }
];

export const CONDUIT_ROUTES: { id: string; from: NodeId; to: NodeId; archHeight: number }[] = [
  { id: 'erp-sec', from: 'legacy-erp', to: 'security-gate', archHeight: 0.42 },
  { id: 'sec-ai', from: 'security-gate', to: 'ai-agent-layer', archHeight: 0.56 },
  { id: 'erp-ai', from: 'legacy-erp', to: 'ai-agent-layer', archHeight: 0.34 },
  { id: 'ai-3d', from: 'ai-agent-layer', to: 'telemetry-3d', archHeight: 0.54 },
  { id: 'ai-gtm', from: 'ai-agent-layer', to: 'gtm-pipeline', archHeight: 0.44 },
  { id: '3d-gtm', from: 'telemetry-3d', to: 'gtm-pipeline', archHeight: 0.36 }
];

export const CAMERA_PRESETS: Record<
  Exclude<CameraPreset, 'focus'>,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  isometric: { pos: [10.8, 9.4, 11.2], target: [0.2, 0.75, 0.25] },
  top: { pos: [0.2, 16.8, 2.4], target: [0.2, 0.2, 0.2] },
  profile: { pos: [13.4, 4.4, 3.6], target: [0.2, 0.95, 0.2] }
};
