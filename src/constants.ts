import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: "hollywoodbets",
    title: "HOLLYWOODBETS",
    category: "GAMING & AI / 001",
    description: "Enterprise AI architecture, real-time risk & fraud scoring, and automated player intelligence for Africa's largest online gaming and sportsbook operator.",
    clientName: "Hollywoodbets",
    industry: "Online Gaming, Casino & High-Frequency Sportsbook",
    headlineMetric: "4.6x ROI",
    headlineMetricLabel: "First-Year Return on AI & Automation Investment",
    roiMetrics: [
      { value: "10M+", label: "Daily Transactions", detail: "Scored in real time under 12ms latency" },
      { value: "-42%", label: "Fraud & Bonus Abuse", detail: "Automated anomaly & syndicate detection" },
      { value: "78%", label: "Support Automated", detail: "Instant AI triage & KYC document verification" },
      { value: "+24%", label: "Player Retention Lift", detail: "Predictive churn & personalized odds feeds" }
    ],
    beforeState: "Manual risk reviews, fragmented player data pipelines across high-concurrency peaks, and multi-hour KYC verification bottlenecks.",
    afterState: "Sub-12ms streaming AI inference engine handling 10M+ daily transactions, automated KYC/AML document validation, and real-time churn prevention.",
    servicesProvided: ["AI Systems Engineering", "Real-Time Data Pipelines", "Fraud & Risk Models", "Embedded AI Squad"],
    caseStudy: "THE CHALLENGE: Operating Africa's largest online sportsbook and casino requires processing millions of concurrent bets, payouts, and KYC verifications every day. Legacy rule-based systems struggled to catch sophisticated bonus abuse in real time, while manual compliance checks slowed down player onboarding during peak matchday traffic. THE SOLUTION: Build Cult led AI architecture and embedded senior systems engineers directly into the core platform team. We engineered a low-latency streaming inference pipeline (<12ms p99) for real-time fraud and syndicate detection, automated KYC document extraction, and deployed predictive player lifecycle models. THE OUTCOME: Delivered a 4.6x first-year ROI, reduced bonus abuse and fraud losses by 42%, automated 78% of tier-1 KYC and support verifications, and scaled effortlessly across 10M+ daily transactions.",
    color: "#FF3200",
    image: "/src/assets/images/iso_hollywoodbets_ai_1795560789822.jpg",
    gallery: [
      "/src/assets/images/iso_hero_roi_1795560789183.jpg",
      "/src/assets/images/iso_crossing_chasm_1795560790001.jpg"
    ],
    liveUrl: "https://www.hollywoodbets.net"
  },
  {
    id: "bmw-forged",
    title: "BMW / FORGED",
    category: "AUTOMOTIVE / 002",
    description: "Interactive 3D vehicle & performance parts architecture, live telemetry analytics, and automated GTM conversion systems for performance motoring.",
    clientName: "BMW / Forged Performance",
    industry: "Performance Motoring & Automotive Engineering",
    headlineMetric: "3.8x ROI",
    headlineMetricLabel: "Increase in Qualified High-Ticket Build Conversions",
    roiMetrics: [
      { value: "+285%", label: "Build Conversion Lift", detail: "From interactive 3D spatial configurator" },
      { value: "<5ms", label: "Telemetry Latency", detail: "Real-time ECU & dyno performance ingestion" },
      { value: "68%", label: "Admin Hours Saved", detail: "Automated parts BOM & workshop scheduling" },
      { value: "3.4x", label: "GTM Pipeline Velocity", detail: "Automated enthusiast & dealer lead qualification" }
    ],
    beforeState: "Static PDF catalogs, manual spec-sheet quoting taking 48+ hours per custom vehicle build, and disconnected dyno/telemetry logs.",
    afterState: "60fps browser-based 3D build configurator tied directly to live inventory, automated BOM pricing, and unified vehicle performance telemetry.",
    servicesProvided: ["3D WebGL Configurator", "Telemetry & IoT Pipelines", "GTM & Revenue Automation", "Custom ERP Integration"],
    caseStudy: "THE CHALLENGE: High-performance automotive buyers and tuning specialists expect precision both on the track and online. Quoting custom forged builds, matching compatible performance components, and analyzing vehicle telemetry required hours of manual engineering consultation and spreadsheet reconciliation. THE SOLUTION: Serving as technology partner, Build Cult engineered a real-time 3D spatial configurator and performance telemetry platform integrated directly with inventory, workshop scheduling, and CRM pipelines. Buyers configure bespoke packages in 3D with instant compatibility validation, while automated GTM workflows route pre-qualified build sheets directly to sales engineers. THE OUTCOME: Achieved a 3.8x commercial ROI, boosted high-ticket build conversions by 285%, and cut manual quoting and parts reconciliation time by 68%.",
    color: "#00D4FF",
    image: "/src/assets/images/iso_bmw_forged_1795560789998.jpg",
    gallery: [
      "/src/assets/images/iso_crossing_chasm_1795560790001.jpg",
      "/src/assets/images/iso_hero_roi_1795560789183.jpg"
    ],
    liveUrl: "https://example.com/bmw-forged"
  },
  {
    id: "nova-havens",
    title: "NOVA HAVENS",
    category: "ENTERPRISE OPS / 003",
    description: "End-to-end operational AI automation, multi-agent document processing, and GTM pipeline orchestration for Nova Havens.",
    clientName: "Nova Havens",
    industry: "Property, Portfolio Operations & Client Management",
    headlineMetric: "81% SAVED",
    headlineMetricLabel: "Reduction in Manual Operations & Processing Overhead",
    roiMetrics: [
      { value: "81%", label: "Manual Work Eliminated", detail: "Automated onboarding, contracts & billing" },
      { value: "$420k+", label: "Annual Cost Recovered", detail: "Reallocated staff from data entry to growth" },
      { value: "4.8x", label: "Faster Turnaround", detail: "Client onboarding reduced from 5 days to 2 hours" },
      { value: "99.4%", label: "Data Accuracy", detail: "Zero-touch ERP, CRM & ledger reconciliation" }
    ],
    beforeState: "Teams bogged down by repetitive document verification, manual CRM updates, spreadsheet reconciliation, and slow multi-day client onboarding.",
    afterState: "Fully automated multi-agent back office connecting intake forms, contract generation, compliance verification, and financial ledgers.",
    servicesProvided: ["Enterprise Workflow Automation", "AI Document Agents", "CRM & RevOps Engineering", "Change Management"],
    caseStudy: "THE CHALLENGE: Rapid growth at Nova Havens created a severe operational bottleneck. Staff were spending over 30 hours per week per department copying data between emails, PDFs, spreadsheets, and legacy management software—delaying client onboarding and inflating payroll costs. THE SOLUTION: Build Cult conducted a full AI & Automation Audit and deployed an end-to-end automated operating layer. We built intelligent document ingestion agents, two-way CRM and accounting synchronizations, automated client communications, and trained internal teams on the new workflows. THE OUTCOME: Eliminated 81% of repetitive manual administration, recovered over $420,000 in annual equivalent payroll capacity, and accelerated client onboarding speed by 4.8x within 60 days.",
    color: "#00FF66",
    image: "/src/assets/images/iso_nova_havens_1795560789183.jpg",
    gallery: [
      "/src/assets/images/iso_hollywoodbets_ai_1795560789822.jpg",
      "/src/assets/images/iso_crossing_chasm_1795560790001.jpg"
    ],
    liveUrl: "https://example.com/nova-havens"
  },
  {
    id: "cyber-shell",
    title: "CYBER-SHELL",
    category: "SECURITY / 004",
    description: "Enterprise security platform and real-time threat telemetry interface.",
    clientName: "CyberSec Global",
    industry: "Enterprise Cybersecurity & SOC Defense",
    headlineMetric: "+140% PIPELINE",
    headlineMetricLabel: "Enterprise Security Sales Pipeline Growth",
    roiMetrics: [
      { value: "+140%", label: "Qualified Pipeline", detail: "Enterprise demo-to-close acceleration" },
      { value: "3.1x", label: "Faster SOC Triage", detail: "Real-time 3D & WebGL threat telemetry" },
      { value: "99.99%", label: "Uptime SLA", detail: "High-availability mission-critical dashboard" },
      { value: "-55%", label: "Alert Fatigue", detail: "AI-clustered anomaly prioritization" }
    ],
    servicesProvided: ["Product Design", "Systems Engineering", "Brand Identity"],
    caseStudy: "THE CHALLENGE: A global security provider needed to make complex cryptographic and network defense telemetry immediately actionable for enterprise security teams. THE SOLUTION: Build Cult engineered a real-time threat visualization dashboard and high-throughput web platform using WebGL and low-latency data streams. THE OUTCOME: 140% increase in qualified enterprise pipeline and 3.1x faster incident triage across client SOC teams.",
    color: "#FF00FF",
    image: "/src/assets/images/iso_hero_roi_1795560789183.jpg",
    gallery: [
      "/src/assets/images/iso_hollywoodbets_ai_1795560789822.jpg",
      "/src/assets/images/iso_bmw_forged_1795560789998.jpg"
    ],
    liveUrl: "https://example.com/cyber-shell"
  },
  {
    id: "aether-link",
    title: "AETHER-LINK",
    category: "TELECOM / 005",
    description: "Real-time satellite mesh network analytics and 3D control plane.",
    clientName: "AstroNet",
    industry: "Telecommunications & Orbital Mesh Networks",
    headlineMetric: "$75M SERIES B",
    headlineMetricLabel: "Enterprise Control Plane Supporting Institutional Raise",
    roiMetrics: [
      { value: "5,000+", label: "Active Nodes", detail: "Rendered at 60fps in real-time 3D" },
      { value: "$75M", label: "Capital Raised", detail: "Core technical demo for Series B round" },
      { value: "64%", label: "Faster Diagnostics", detail: "Automated orbital routing telemetry" },
      { value: "100%", label: "Enterprise Adoption", detail: "Deployed across all tier-1 telecom buyers" }
    ],
    servicesProvided: ["3D Data Visualization", "Frontend Architecture", "Cloud Systems"],
    caseStudy: "THE CHALLENGE: A satellite communications company needed an intuitive control plane to monitor orbital routing and demonstrate network resilience to enterprise buyers. THE SOLUTION: We built an interactive 3D network visualizer capable of rendering 5,000+ active nodes and live routing paths in real time. THE OUTCOME: Directly supported their $75M Series B raise and became their primary enterprise sales and monitoring tool.",
    color: "#0055FF",
    image: "/src/assets/images/iso_crossing_chasm_1795560790001.jpg",
    gallery: [
      "/src/assets/images/iso_bmw_forged_1795560789998.jpg",
      "/src/assets/images/iso_nova_havens_1795560789183.jpg"
    ],
    liveUrl: "https://example.com/aether-link"
  }
];

export const SERVICES = [
  {
    icon: "Terminal",
    title: "AI CONSULTING & SYSTEMS ENGINEERING",
    description: "Production-grade AI architectures, custom model pipelines, and high-concurrency backend systems that bridge the gap from pilot experiments to enterprise scale."
  },
  {
    icon: "Globe",
    title: "GO-TO-MARKET (GTM) & REVENUE SYSTEMS",
    description: "Technical product positioning, automated lead enrichment, CRM/RevOps orchestration, and conversion-engineered launches that turn innovation into commercial pipeline."
  },
  {
    icon: "Layers",
    title: "3D WEB & MULTI-DISCIPLINE DIGITAL STUDIO",
    description: "Browser-native 3D product configurators (WebGL / Three.js), spatial storytelling, and high-contrast product UI/UX that make complex brands unforgettable."
  },
  {
    icon: "Zap",
    title: "ENTERPRISE WORKFLOW AUTOMATION",
    description: "End-to-end automation of repetitive operations across mid-market, enterprise, and government—connecting legacy ERPs, databases, and AI agents."
  },
  {
    icon: "Users",
    title: "TECH TALENT SOURCING & EMBEDDED SQUADS",
    description: "Practitioner-vetted AI engineers, full-stack squads, and fractional CTOs embedded directly into your team within 14 days—eliminating hiring guesswork."
  },
  {
    icon: "Mic",
    title: "MEDIA & INDUSTRY PODCAST",
    description: "Conversations and thought leadership featuring operators, founders, and public-sector leaders driving real transformation across technology and industry."
  }
];
