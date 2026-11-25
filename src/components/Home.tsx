import Navigation from './Navigation';
import Hero from './Hero';
import ClientLogoMarquee from './ClientLogoMarquee';
import FrontToBackModernization from './FrontToBackModernization';
import CaseStudies from './CaseStudies';
import InteractiveIsometric3D from './InteractiveIsometric3D';
import WorkflowSimulator from './WorkflowSimulator';
import CrossingTheChasm from './CrossingTheChasm';
import DataSovereigntyToggle from './DataSovereigntyToggle';
import ManualLaborCalculator from './ManualLaborCalculator';
import AiReadinessAudit from './AiReadinessAudit';
import IndustriesServed from './IndustriesServed';
import Contact from './Contact';
import Footer from './Footer';
import IsometricBackground from './IsometricBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-brutal-black overflow-x-hidden relative">
      <div className="atmosphere" />
      <IsometricBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        
        {/* High-Contrast Client Logo Marquee (Immediate Social Proof) */}
        <ClientLogoMarquee />

        {/* Dual-Engine Positioning: Front-Office GTM & User Apps + Back-Office AI & Talent */}
        <FrontToBackModernization />

        {/* Featured Customer Case Studies & Verified ROI Metrics */}
        <CaseStudies />

        {/* Live Interactive 3D WebGL Isometric Enterprise Architecture */}
        <InteractiveIsometric3D />

        {/* Side-by-Side Legacy vs. Automated Workflow Simulator */}
        <WorkflowSimulator />

        {/* Crossing the Chasm: 4-Pillar Full-Stack Operating Partner */}
        <CrossingTheChasm />

        {/* Enterprise & Government Data Sovereignty & Compliance Selector */}
        <DataSovereigntyToggle />

        {/* Manual Labor Calculator (with 1-Page Executive ROI Brief PDF Export) */}
        <ManualLaborCalculator />

        {/* Interactive AI Readiness Audit (with 1-Page Executive ROI Brief PDF Export) */}
        <AiReadinessAudit />

        {/* 28+ Industries Served across Mid-Market, Enterprise & Government */}
        <IndustriesServed compact={true} />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
