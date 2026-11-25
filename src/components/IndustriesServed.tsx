import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  Building2, 
  Gauge, 
  Flame, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  HeartPulse, 
  Scale, 
  BookOpen, 
  Factory, 
  Radio, 
  ShoppingBag, 
  HardHat, 
  Sprout, 
  Plane, 
  Zap, 
  Search,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface IndustryItem {
  id: string;
  name: string;
  segment: 'Government & Public Sector' | 'Financial & Enterprise' | 'Industrial, Motoring & Energy' | 'Tech, Commerce & Healthcare';
  tier: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  summary: string;
  specializations: string[];
}

export const INDUSTRIES_LIST: IndustryItem[] = [
  // GOVERNMENT & PUBLIC SECTOR DEPARTMENTS
  {
    id: 'gov-revenue-tax',
    name: 'Revenue, Treasury & Tax Authorities',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: Landmark,
    summary: 'Automated tax compliance, anomaly and fraud detection across millions of filings, and citizen-facing digital tax portals.',
    specializations: ['Automated Audit Scoring', 'Legacy Mainframe Modernization', 'High-Volume Filing Portals']
  },
  {
    id: 'gov-home-affairs',
    name: 'Home Affairs, Civil Registration & Digital ID',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: ShieldCheck,
    summary: 'Document verification pipelines, identity deduplication, automated application triage, and queue-reduction workflows.',
    specializations: ['Document OCR & Verification', 'Biometric Pipeline Integration', 'Citizen Status Portals']
  },
  {
    id: 'gov-health-ministry',
    name: 'Departments of Health & Public Hospital Networks',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: HeartPulse,
    summary: 'National pharmaceutical supply chain tracking, patient intake automation, and health record digitization.',
    specializations: ['Medicine Supply Telemetry', 'Clinical Record Digitization', 'Resource Allocation Models']
  },
  {
    id: 'gov-education-ministry',
    name: 'Departments of Education & Higher Learning',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: BookOpen,
    summary: 'Backed by our published research in AI for education: adaptive learning platforms, automated assessment, and student analytics.',
    specializations: ['Adaptive Learning Systems', 'Automated Grading & Curriculum Tools', 'National Education Analytics']
  },
  {
    id: 'gov-utilities-energy',
    name: 'Municipal Utilities, Water & National Power Grids',
    segment: 'Government & Public Sector',
    tier: 'Government & Parastatal',
    icon: Zap,
    summary: 'Smart grid load forecasting, automated meter reconciliation, outage prediction, and infrastructure maintenance workflows.',
    specializations: ['Grid Load Forecasting', 'Automated Billing Reconciliation', 'IoT Infrastructure Telemetry']
  },
  {
    id: 'gov-transport-ports',
    name: 'Transport Ministries, Rail & Port Authorities',
    segment: 'Government & Public Sector',
    tier: 'Government & Parastatal',
    icon: Truck,
    summary: 'Port container orchestration, automated customs documentation clearance, and national road and rail fleet telemetry.',
    specializations: ['Customs Manifest Automation', 'Port & Rail Logistics Telemetry', '3D Infrastructure Digital Twins']
  },
  {
    id: 'gov-justice-regulatory',
    name: 'Justice Departments, Courts & Regulatory Bodies',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: Scale,
    summary: 'Court docket digitization, intelligent legal archive search with exact source citations, and regulatory compliance tracking.',
    specializations: ['Legal Archive RAG Search', 'Case Docket Automation', 'Compliance Reporting Engines']
  },
  {
    id: 'gov-defense-security',
    name: 'Defense, Public Safety & Cyber Command',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: ShieldCheck,
    summary: 'Air-gapped on-premise AI deployments, real-time threat telemetry visualizers, and secure operational dashboards.',
    specializations: ['On-Premise Air-Gapped LLMs', 'Real-Time Threat Visualization', 'Secure Communications Systems']
  },
  {
    id: 'gov-procurement-trade',
    name: 'Public Works, Trade & Procurement Agencies',
    segment: 'Government & Public Sector',
    tier: 'Government Department',
    icon: Building2,
    summary: 'Automated tender specification auditing, vendor compliance verification, and infrastructure project tracking.',
    specializations: ['Automated Tender Vetting', 'Supplier Compliance Checks', 'Grant & Budget Tracking']
  },

  // FINANCIAL & ENTERPRISE
  {
    id: 'fin-commercial-banking',
    name: 'Commercial, Retail & Investment Banking',
    segment: 'Financial & Enterprise',
    tier: 'Enterprise & Mid-Market',
    icon: Landmark,
    summary: 'Automated loan underwriting, KYC/AML document processing, core banking integrations, and customer operations.',
    specializations: ['Automated Credit Underwriting', 'Core Banking API Integration', 'Real-Time Fraud Prevention']
  },
  {
    id: 'fin-insurance',
    name: 'Insurance, Reinsurance & Underwriting',
    segment: 'Financial & Enterprise',
    tier: 'Enterprise & Mid-Market',
    icon: ShieldCheck,
    summary: 'End-to-end claims document extraction, policy comparison, automated payout triage, and actuarial data pipelines.',
    specializations: ['Automated Claims Triage', 'Policy Document Extraction', 'Fraud & Risk Scoring']
  },
  {
    id: 'fin-payments-fintech',
    name: 'Fintech, Payments & Remittance Platforms',
    segment: 'Financial & Enterprise',
    tier: 'Mid-Market & Enterprise',
    icon: Cpu,
    summary: 'High-concurrency transaction reconciliation across multiple payment gateways with sub-second anomaly detection.',
    specializations: ['Multi-Gateway Reconciliation', 'High-Throughput Rust/Go Backend', 'Automated Dispute Resolution']
  },
  {
    id: 'fin-wealth-pe',
    name: 'Private Equity, Venture & Asset Management',
    segment: 'Financial & Enterprise',
    tier: 'Mid-Market & Enterprise',
    icon: Building2,
    summary: 'Automated due-diligence data room analysis, portfolio company KPI telemetry, and technical leadership across portfolio firms.',
    specializations: ['Data Room AI Due Diligence', 'Portfolio Company AI Audits', 'Fractional CTO Advisory']
  },
  {
    id: 'ent-legal-accounting',
    name: 'Corporate Law Firms & Accounting Practices',
    segment: 'Financial & Enterprise',
    tier: 'Mid-Market & Enterprise',
    icon: Scale,
    summary: 'Contract redlining, multi-document audit verification, and private knowledge retrieval across decades of firm precedents.',
    specializations: ['Contract Redlining & Review', 'Citation-Backed Legal Search', 'Automated Financial Auditing']
  },
  {
    id: 'ent-telecom-isp',
    name: 'Telecommunications, ISPs & Cloud Providers',
    segment: 'Financial & Enterprise',
    tier: 'Enterprise',
    icon: Radio,
    summary: '3D network mesh visualization, predictive tower maintenance, churn prevention, and automated technical support triage.',
    specializations: ['3D Network Topology Visualizers', 'Automated Tier-1/2 Support', 'Predictive Churn Analytics']
  },

  // INDUSTRIAL, MOTORING & ENERGY
  {
    id: 'ind-performance-motoring',
    name: 'Performance Motoring & Automotive OEMs',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Enterprise & Mid-Market',
    icon: Gauge,
    summary: 'Real-time vehicle CAN-bus telemetry, trackside analytics, in-vehicle HMI interfaces, and interactive 3D car configurators.',
    specializations: ['Sub-5ms Vehicle Telemetry', '3D WebGL Vehicle Configurators', 'Embedded HMI Software']
  },
  {
    id: 'ind-fleet-mobility',
    name: 'Commercial Fleet, Leasing & Connected Mobility',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Mid-Market & Enterprise',
    icon: Truck,
    summary: 'Live GPS and sensor telemetry across thousands of vehicles, predictive maintenance scheduling, and fuel optimization.',
    specializations: ['Connected Fleet Telemetry', 'Predictive Maintenance Alerts', 'Driver & Route Analytics']
  },
  {
    id: 'ind-mining-resources',
    name: 'Mining, Minerals & Heavy Extraction',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Enterprise',
    icon: HardHat,
    summary: 'Heavy equipment sensor monitoring, geological data processing, safety compliance automation, and supply chain tracking.',
    specializations: ['Equipment Failure Prediction', 'Safety & Compliance Automation', '3D Site Digital Twins']
  },
  {
    id: 'ind-energy-oil-gas',
    name: 'Energy, Renewables, Oil & Gas',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Enterprise & Mid-Market',
    icon: Zap,
    summary: 'Solar and wind yield forecasting, pipeline telemetry, automated environmental compliance, and field workforce apps.',
    specializations: ['SCADA & IoT Data Pipelines', 'Yield & Load Forecasting', 'Automated ESG Reporting']
  },
  {
    id: 'ind-manufacturing',
    name: 'Industrial Manufacturing & Precision Engineering',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Mid-Market & Enterprise',
    icon: Factory,
    summary: 'Production line quality vision systems, ERP inventory synchronization, and interactive 3D industrial product catalogs.',
    specializations: ['ERP & Supply Chain Sync', '3D Industrial Product Catalogs', 'Automated Quality Inspection']
  },
  {
    id: 'ind-logistics-freight',
    name: 'Global Freight, 3PL & Supply Chain Operations',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Mid-Market & Enterprise',
    icon: Plane,
    summary: 'Automated bill-of-lading and waybill extraction, multi-carrier dispatch automation, and warehouse ERP integration.',
    specializations: ['Waybill & Invoice OCR', 'Automated Carrier Dispatch', 'Real-Time Shipment Portals']
  },
  {
    id: 'ind-construction-realestate',
    name: 'Commercial Real Estate, AEC & Mega-Projects',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Mid-Market & Enterprise',
    icon: Building2,
    summary: 'Interactive 3D architectural walkthroughs, automated lease abstraction, and subcontractor procurement workflows.',
    specializations: ['3D Spatial Property Showrooms', 'Automated Lease Abstraction', 'BIM & Project Cost Telemetry']
  },
  {
    id: 'ind-agriculture',
    name: 'Commercial Agriculture, AgTech & Food Supply',
    segment: 'Industrial, Motoring & Energy',
    tier: 'Mid-Market & Enterprise',
    icon: Sprout,
    summary: 'Satellite and sensor crop monitoring, yield modeling, cold-chain telemetry, and automated commodity trading workflows.',
    specializations: ['Agronomic Sensor Telemetry', 'Supply Chain Traceability', 'Yield & Weather Modeling']
  },

  // TECH, COMMERCE & HEALTHCARE
  {
    id: 'tech-gaming-casino',
    name: 'Online Gaming, Casinos & Sportsbooks',
    segment: 'Tech, Commerce & Healthcare',
    tier: 'Enterprise & Mid-Market',
    icon: Flame,
    summary: 'Led AI at Africa’s largest online casino: real-time player risk scoring, bonus abuse prevention, and high-concurrency backends.',
    specializations: ['Real-Time Player Risk Engines', '10M+ Event Telemetry', 'Automated KYC & Payout Checks']
  },
  {
    id: 'tech-saas-b2b',
    name: 'B2B SaaS & High-Growth Technology Companies',
    segment: 'Tech, Commerce & Healthcare',
    tier: 'Mid-Market & Enterprise',
    icon: Cpu,
    summary: 'Embedding senior AI and full-stack engineers to ship core product roadmap features, 3D web flagships, and automated GTM engines.',
    specializations: ['Embedded Engineering Squads', 'GTM & RevOps Automation', 'Interactive 3D Marketing Sites']
  },
  {
    id: 'tech-retail-ecommerce',
    name: 'Enterprise Retail, Luxury & E-Commerce',
    segment: 'Tech, Commerce & Healthcare',
    tier: 'Mid-Market & Enterprise',
    icon: ShoppingBag,
    summary: 'Browser-based 3D product configurators, automated catalog enrichment, dynamic pricing, and omnichannel inventory sync.',
    specializations: ['3D WebGL Product Configurators', 'Automated Catalog Enrichment', 'Demand & Inventory Forecasting']
  },
  {
    id: 'tech-healthcare-pharma',
    name: 'Private Hospital Groups, Pharma & Biotech',
    segment: 'Tech, Commerce & Healthcare',
    tier: 'Enterprise & Mid-Market',
    icon: HeartPulse,
    summary: 'Automated medical coding and claims reconciliation, clinical documentation tools, and laboratory data pipelines.',
    specializations: ['Medical Claims Automation', 'Clinical Data Structuring', 'Secure Patient Portals']
  },
  {
    id: 'tech-media-entertainment',
    name: 'Media Networks, Broadcasters & Sports Leagues',
    segment: 'Tech, Commerce & Healthcare',
    tier: 'Mid-Market & Enterprise',
    icon: Radio,
    summary: 'Automated video/audio transcription and indexing, interactive 3D fan experiences, and programmatic audience GTM.',
    specializations: ['Automated Media Indexing', '3D Interactive Fan Platforms', 'Audience Analytics Pipelines']
  }
];

const SEGMENTS = [
  'All Sectors',
  'Government & Public Sector',
  'Financial & Enterprise',
  'Industrial, Motoring & Energy',
  'Tech, Commerce & Healthcare'
] as const;

interface IndustriesServedProps {
  compact?: boolean;
}

export default function IndustriesServed({ compact = false }: IndustriesServedProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>('All Sectors');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIndustries = useMemo(() => {
    return INDUSTRIES_LIST.filter((item) => {
      const matchesSegment = selectedSegment === 'All Sectors' || item.segment === selectedSegment;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSegment && matchesSearch;
    });
  }, [selectedSegment, searchQuery]);

  const displayedIndustries = compact && selectedSegment === 'All Sectors' && !searchQuery
    ? filteredIndustries.slice(0, 12)
    : filteredIndustries;

  return (
    <section id="industries" className="py-20 sm:py-32 bg-[#050505] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8 border-b border-white/10 pb-10">
          <div className="max-w-3xl">
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.25em] block mb-4">
              SECTORS & VERTICAL SPECIALIZATION
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-white mb-6">
              MID-MARKET, ENTERPRISE <br />
              & <span className="text-accent">GOVERNMENT</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/75 font-light leading-relaxed">
              We build production AI systems, automate mission-critical workflows, deploy 3D digital experiences, and embed senior engineering squads across <strong className="text-white font-semibold">{INDUSTRIES_LIST.length} specialized industries and public sector departments</strong>.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="relative border-2 border-white/20 bg-black focus-within:border-accent transition-colors">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search industry or department..."
                className="w-full bg-transparent pl-10 pr-4 py-3 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Interactive Segment Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-10 overflow-x-auto pb-3 scrollbar-none">
          {SEGMENTS.map((segment) => {
            const count = segment === 'All Sectors'
              ? INDUSTRIES_LIST.length
              : INDUSTRIES_LIST.filter((i) => i.segment === segment).length;
            const isActive = selectedSegment === segment;

            return (
              <button
                key={segment}
                type="button"
                onClick={() => setSelectedSegment(segment)}
                className={`px-4 sm:px-5 py-2.5 border-2 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-accent border-accent text-white shadow-[3px_3px_0px_#ffffff]'
                    : 'bg-white/[0.02] border-white/15 text-white/60 hover:border-white/40 hover:text-white'
                }`}
              >
                {segment} ({count})
              </button>
            );
          })}
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedIndustries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="border border-white/15 bg-white/[0.02] hover:border-accent p-6 sm:p-7 flex flex-col justify-between transition-colors group"
              >
                <div>
                  {/* Quiet unboxed metadata line */}
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-white/45 mb-4 pb-3 border-b border-white/10">
                    <span>{item.tier}</span>
                    <span>·</span>
                    <span className="text-accent font-semibold truncate">{item.segment}</span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2.5 bg-white/5 border border-white/10 text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight text-white group-hover:text-accent transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
                    Core Focus Areas:
                  </div>
                  <div className="text-xs font-mono text-white/85 leading-relaxed">
                    {item.specializations.join(' · ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedIndustries.length === 0 && (
          <div className="border border-white/15 bg-white/[0.02] p-12 text-center">
            <p className="font-sans text-lg text-white/70 mb-4">
              No matching industry found for "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedSegment('All Sectors');
              }}
              className="bg-white text-black px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Show All Link when in compact mode on Homepage */}
        {compact && selectedSegment === 'All Sectors' && !searchQuery && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-white/15 bg-white/[0.02] p-6 sm:p-8">
            <div>
              <div className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-1">
                Explore All {INDUSTRIES_LIST.length} Specialized Industries & Government Departments
              </div>
              <p className="font-sans text-sm text-white/65 font-light">
                View our full directory of mid-market, enterprise, and public sector capabilities.
              </p>
            </div>
            <Link
              to="/industries"
              className="w-full sm:w-auto bg-accent text-white px-8 py-4 font-sans font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff] whitespace-nowrap shrink-0"
            >
              <span>View All {INDUSTRIES_LIST.length} Industries</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
