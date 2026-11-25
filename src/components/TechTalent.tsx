import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Fingerprint
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface TalentRole {
  title: string;
  category: string;
  badge: string;
  experience: string;
  summary: string;
  stack: string[];
  sampleProject: string;
}

const TALENT_ROLES: TalentRole[] = [
  {
    title: 'Senior AI & Machine Learning Engineer',
    category: 'ARTIFICIAL INTELLIGENCE',
    badge: 'Production AI',
    experience: '7+ Years Experience',
    summary: 'Engineers who go far beyond basic API wrappers. Experienced in deploying open-weights models, fine-tuning, vector retrieval (RAG), and building reliable AI systems that run cost-effectively at scale.',
    stack: ['PyTorch', 'vLLM', 'Python', 'LangGraph', 'Qdrant', 'OpenAI / Anthropic'],
    sampleProject: 'Built real-time risk and player analytics models processing 10M+ daily events.'
  },
  {
    title: 'Senior Backend & Distributed Systems Engineer',
    category: 'BACKEND & INFRASTRUCTURE',
    badge: 'High Concurrency',
    experience: '8+ Years Experience',
    summary: 'Backend specialists experienced in designing high-throughput APIs, event-driven microservices, reliable payment integrations, and zero-downtime database migrations.',
    stack: ['Node.js', 'Go', 'Rust', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    sampleProject: 'Architected automated transaction reconciliation across high-volume financial pipelines.'
  },
  {
    title: 'Embedded & Telemetry Software Engineer',
    category: 'EMBEDDED & IOT',
    badge: 'Low-Latency Data',
    experience: '6+ Years Experience',
    summary: 'Engineers who connect hardware to the cloud. Experienced in vehicle CAN-bus telemetry, edge devices, sensor data streaming, and real-time analytics dashboards.',
    stack: ['C / C++', 'Rust', 'MQTT', 'TimescaleDB', 'Embedded Linux'],
    sampleProject: 'Built live vehicle telemetry and trackside data tools for a performance motoring leader.'
  },
  {
    title: 'Senior Full-Stack & Frontend Engineer',
    category: 'FRONTEND & PRODUCT',
    badge: 'Product Engineering',
    experience: '5+ Years Experience',
    summary: 'Product-minded engineers who build fast, responsive web applications, interactive data dashboards, and 3D browser experiences.',
    stack: ['TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS'],
    sampleProject: 'Engineered an interactive 3D product platform serving 500,000+ visitors in its launch week.'
  },
  {
    title: 'Fractional CTO & Technical Advisor',
    category: 'TECHNICAL LEADERSHIP',
    badge: 'Leadership',
    experience: '12+ Years Experience',
    summary: 'Experienced technical leaders who help you set architecture standards, evaluate vendors, hire the right internal developers, and deliver complex roadmaps on time.',
    stack: ['System Architecture', 'Technical Hiring', 'Team Mentorship', 'Cloud Cost Optimization'],
    sampleProject: 'Restructured an enterprise engineering team, cutting cloud spend by 40% while doubling release speed.'
  }
];

const VETTING_STEPS = [
  {
    step: '01',
    title: 'REAL PRODUCTION CODE REVIEW',
    desc: 'We don’t rely on generic puzzle tests. We review real systems candidates have built, looking at code quality, architecture choices, and how they handle edge cases.'
  },
  {
    step: '02',
    title: 'SYSTEM DESIGN & DEBUGGING',
    desc: 'Candidates walk through real-world production scenarios: diagnosing performance bottlenecks, handling API failures, and designing scalable data pipelines.'
  },
  {
    step: '03',
    title: 'MODERN AI TOOLING MASTERY',
    desc: 'We test hands-on fluency with current AI tooling—evaluating how they manage latency, model accuracy, security, and inference costs.'
  },
  {
    step: '04',
    title: 'COMMUNICATION & OWNERSHIP',
    desc: 'Technical skill means little without reliability. We vet for clear communication, proactive problem-solving, and a focus on business outcomes.'
  }
];

export default function TechTalent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [squadConfig, setSquadConfig] = useState({
    engagementType: 'Embedded Engineering Squad (3-5 Engineers)',
    duration: '6 Months (Full Project Delivery)',
    primaryDiscipline: 'AI & Machine Learning Systems'
  });
  const [talentRequested, setTalentRequested] = useState(false);

  const categories = ['ALL', 'ARTIFICIAL INTELLIGENCE', 'BACKEND & INFRASTRUCTURE', 'EMBEDDED & IOT', 'FRONTEND & PRODUCT', 'TECHNICAL LEADERSHIP'];

  const filteredRoles = selectedCategory === 'ALL'
    ? TALENT_ROLES
    : TALENT_ROLES.filter(r => r.category === selectedCategory);

  const handleSquadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTalentRequested(true);
    setTimeout(() => setTalentRequested(false), 4000);
  };

  return (
    <div className="min-h-screen bg-brutal-black selection:bg-accent selection:text-white text-white relative overflow-hidden">
      <div className="atmosphere" />
      <div className="fixed inset-0 custom-grid opacity-20 pointer-events-none z-0" />

      <Navigation />

      <main className="pt-28 sm:pt-36 lg:pt-44 relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 mb-6 sm:mb-8">
              <Fingerprint size={14} className="text-accent" />
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                EMBEDDED TEAMS & TECHNICAL HIRING
              </span>
            </div>

            <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.88] mb-8 sm:mb-10">
              TECH <br />
              <span className="text-white/20">TAL</span>
              <span className="text-accent">ENT</span>
            </h1>

            <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed font-light mb-10">
              Most companies struggle with AI and software modernization because they can't find or vet the right people. We embed proven senior engineers directly into your team—or help you hire technical talent with confidence.
            </p>

            {/* Core Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-white/10 py-8">
              <div className="border-l-2 border-accent pl-4 sm:pl-6">
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">Top 1%</div>
                <div className="font-mono text-[10px] sm:text-xs text-white/90 font-bold uppercase tracking-wider">Vetted Engineers</div>
                <div className="font-mono text-[9px] text-white/40 uppercase">Tested by practitioners</div>
              </div>
              <div className="border-l-2 border-accent pl-4 sm:pl-6">
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">14 Days</div>
                <div className="font-mono text-[10px] sm:text-xs text-white/90 font-bold uppercase tracking-wider">Time to Onboarding</div>
                <div className="font-mono text-[9px] text-white/40 uppercase">Ready to ship code</div>
              </div>
              <div className="border-l-2 border-accent pl-4 sm:pl-6">
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">Zero</div>
                <div className="font-mono text-[10px] sm:text-xs text-white/90 font-bold uppercase tracking-wider">Recruiter Guesswork</div>
                <div className="font-mono text-[9px] text-white/40 uppercase">Screened for real depth</div>
              </div>
              <div className="border-l-2 border-accent pl-4 sm:pl-6">
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight mb-1">100%</div>
                <div className="font-mono text-[10px] sm:text-xs text-white/90 font-bold uppercase tracking-wider">Code Ownership</div>
                <div className="font-mono text-[9px] text-white/40 uppercase">Your IP, your repositories</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* THE HIRING CHALLENGE SECTION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <div className="border-2 sm:border-4 border-white bg-black p-6 sm:p-10 lg:p-14 relative shadow-[10px_10px_0px_#ff3200]">
            <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              THE HIRING PROBLEM
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight mb-6">
              WHY TRADITIONAL RECRUITING FAILS <br className="hidden md:block"/>
              <span className="text-white/40">FOR AI & SENIOR ENGINEERING</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80 font-sans text-base sm:text-lg font-light leading-relaxed">
              <p>
                With the surge in AI hype, almost every resume now lists "AI engineering" skills. In reality, most candidates have only built simple tutorials or basic chatbot wrappers that break down under real production traffic and security requirements.
              </p>
              <p>
                Non-technical recruiters and generalist HR teams simply match keywords—they can't evaluate whether an engineer actually knows how to architect reliable systems. 
                <strong> Because we build production systems ourselves, we know exactly how to test for real engineering depth.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ROLES / SQUAD CAPABILITIES */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-32 lg:mb-40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
            <div>
              <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.4em] mb-3 block">
                CAPABILITIES
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter">
                ENGINEERING ROLES
              </h2>
            </div>
            <p className="font-sans text-sm text-white/60 max-w-md mt-4 md:mt-0">
              Available as embedded individual specialists, fractional technical leads, or full project teams.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 sm:gap-4 mb-10 overflow-x-auto pb-4 pt-1 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2.5 border-2 whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-accent border-accent text-white shadow-[3px_3px_0px_rgba(255,255,255,1)]'
                    : 'bg-transparent border-white/20 text-white/50 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredRoles.map((role, idx) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-2 border-white/15 bg-white/[0.02] p-6 sm:p-8 hover:border-accent transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent px-2.5 py-1 bg-accent/10 border border-accent/30">
                      {role.badge}
                    </span>
                    <span className="font-mono text-[11px] text-white/40 uppercase">
                      {role.experience}
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {role.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed mb-6">
                    {role.summary}
                  </p>

                  <div className="mb-6 p-4 bg-white/5 border border-white/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                      Example Experience:
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-white/90">
                      {role.sampleProject}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Core Technologies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <span key={tech} className="font-mono text-[10px] uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW WE VET */}
        <section className="bg-white text-black py-16 sm:py-28 lg:py-36 mb-20 sm:mb-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl mb-16">
              <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] text-accent block mb-3">
                OUR VETTING PROCESS
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-tight mb-4">
                HOW WE EVALUATE <br />
                <span className="text-black/40">ENGINEERING TALENT</span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-black/80 font-normal">
                Every engineer in our network is vetted by senior architects who have built and scaled production systems themselves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VETTING_STEPS.map((item) => (
                <div key={item.step} className="border-2 border-black p-6 sm:p-8 bg-black/[0.02] flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-3xl font-black text-accent mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-sans font-black text-lg uppercase tracking-wider mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-black/75 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/10 font-mono text-[9px] uppercase tracking-widest text-black/50">
                    PRACTITIONER VETTED
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TALENT REQUEST FORM */}
        <section id="squad-configurator" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-28 sm:pb-36">
          <div className="border-2 sm:border-4 border-accent bg-black p-6 sm:p-12 lg:p-16 shadow-[12px_12px_0px_rgba(255,50,0,0.2)]">
            <div className="max-w-3xl mb-10">
              <span className="text-accent font-mono font-bold text-xs uppercase tracking-[0.4em] block mb-3">
                WORK WITH OUR TEAM
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight mb-4">
                REQUEST ENGINEERING TALENT
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
                Tell us what skills and capacity you need. Whether you're looking for an embedded squad, a specialist engineer, or technical hiring support, we'll get back to you within 48 hours.
              </p>
            </div>

            <form onSubmit={handleSquadSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Engagement Model */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Engagement Type</label>
                  <select
                    value={squadConfig.engagementType}
                    onChange={(e) => setSquadConfig({ ...squadConfig, engagementType: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="Embedded Engineering Squad (3-5 Engineers)">Embedded Team (3–5 Engineers)</option>
                    <option value="Solo Principal Specialist (1 Specialist)">Individual Senior Engineer</option>
                    <option value="Fractional CTO & Architecture Lead">Fractional CTO / Technical Lead</option>
                    <option value="Technical Hiring & Vetting Support">Technical Hiring & Vetting Support</option>
                  </select>
                </div>

                {/* Primary Discipline */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Primary Focus</label>
                  <select
                    value={squadConfig.primaryDiscipline}
                    onChange={(e) => setSquadConfig({ ...squadConfig, primaryDiscipline: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="AI & Machine Learning Systems">AI & Machine Learning</option>
                    <option value="Distributed Backend & Rust/Go">Backend & Distributed Systems</option>
                    <option value="Embedded IoT & Telemetry">Embedded Software & Telemetry</option>
                    <option value="High-Performance Frontend & WebGL">Full-Stack & Frontend Product</option>
                    <option value="Enterprise Automation & Cloud">Workflow Automation & Cloud</option>
                  </select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Expected Duration</label>
                  <select
                    value={squadConfig.duration}
                    onChange={(e) => setSquadConfig({ ...squadConfig, duration: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono text-xs uppercase focus:outline-none focus:border-accent [color-scheme:dark]"
                  >
                    <option value="3 Months (Project Delivery)">3 Months</option>
                    <option value="6 Months (Full Project Delivery)">6 Months</option>
                    <option value="12+ Months (Long-Term Partnership)">12+ Months / Ongoing</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2">Your Name & Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith — VP of Engineering"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  CANDIDATE PROFILES SHARED WITHIN 48 HOURS
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-accent text-white px-10 py-4 font-sans font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#ffffff]"
                >
                  <span>Request Talent Profiles</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {talentRequested && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/10 border border-accent text-accent font-mono text-xs flex items-center gap-3"
                >
                  <Check size={16} />
                  <span>Request received. Our engineering directors will review your requirements and follow up within 48 hours.</span>
                </motion.div>
              )}
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
