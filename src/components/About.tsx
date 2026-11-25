import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Gauge, 
  BookOpen, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  tags: string[];
  image: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "TARIQ VANCE",
    role: "Founding Partner & AI Systems Lead",
    specialty: "Production ML & High-Volume Systems",
    bio: "Former AI Lead at Africa's largest online casino. Built and scaled real-time risk models, player analytics, and automated decision systems handling millions of daily transactions.",
    tags: ["Distributed Systems", "Machine Learning", "Risk Engines"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "DR. ELENA KAHARI",
    role: "Head of Applied AI & Research",
    specialty: "Generative AI & Educational Systems",
    bio: "Published researcher in AI for education. Leads model evaluation, retrieval architectures, and practical AI tooling that solves real learning and knowledge-management challenges.",
    tags: ["Applied AI", "EdTech Research", "LLM Architecture"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "MALIK ADEN",
    role: "Principal Automation Architect",
    specialty: "Enterprise Systems & Workflow Automation",
    bio: "Specializes in modernizing operations inside established corporate incumbents—replacing slow manual processes and disconnected legacy software with reliable automated workflows.",
    tags: ["Enterprise Automation", "System Integration", "Backend Architecture"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "DEVON KAGE",
    role: "Partner, Embedded & Telemetry Systems",
    specialty: "Real-Time Data & Performance Engineering",
    bio: "Lead technology partner for a market leader in performance motoring. Designs low-latency telemetry pipelines and edge software that process live vehicle and sensor data.",
    tags: ["Telemetry", "Embedded Software", "Performance Motoring"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
  }
];

const PROVEN_TRACK_RECORD = [
  {
    icon: Flame,
    title: "AFRICA'S LARGEST ONLINE CASINO",
    subtitle: "AI LEADERSHIP & HIGH-VOLUME INFRASTRUCTURE",
    description: "We led AI engineering at Africa's largest online gaming platform—building predictive analytics, automated fraud detection, and real-time decision systems operating across millions of daily transactions.",
    badge: "Online Gaming",
    metric: "10M+ Daily Events"
  },
  {
    icon: BookOpen,
    title: "AI IN EDUCATION RESEARCH",
    subtitle: "APPLIED RESEARCH & ADAPTIVE LEARNING",
    description: "We contributed to academic and practical research on AI in education, developing adaptive learning tools and evaluating how modern models improve student outcomes at scale.",
    badge: "Published Research",
    metric: "Peer-Reviewed Work"
  },
  {
    icon: Cpu,
    title: "INTERNAL AUTOMATIONS AT INCUMBENTS",
    subtitle: "ENTERPRISE WORKFLOW MODERNIZATION",
    description: "We built internal automations for established industry incumbents—connecting legacy databases, automating repetitive back-office tasks, and saving thousands of manual work hours.",
    badge: "Enterprise Operations",
    metric: "80% Time Saved"
  },
  {
    icon: Gauge,
    title: "PERFORMANCE MOTORING TECH PARTNER",
    subtitle: "TELEMETRY & HIGH-PERFORMANCE SOFTWARE",
    description: "We serve as the core technology partner for a market leader in performance motoring, engineering real-time telemetry, live sensor data pipelines, and custom engineering software.",
    badge: "Performance Motoring",
    metric: "<5ms Data Latency"
  }
];

const VALUES = [
  {
    number: "01",
    title: "DEPTH OVER HYPE",
    subtitle: "Practical engineering that delivers commercial value.",
    description: "Anyone can put together a slide deck or a basic ChatGPT wrapper. We focus on deep systems engineering, reliable data pipelines, and AI deployments that actually improve your bottom line."
  },
  {
    number: "02",
    title: "CLOSING THE KNOWLEDGE GAP",
    subtitle: "Solving the talent and hiring bottleneck.",
    description: "Most businesses struggle with AI because they don't know how to evaluate technical depth or hire the right engineers. We bring senior, hands-on experience so you avoid costly missteps."
  },
  {
    number: "03",
    title: "PROVEN IN PRODUCTION",
    subtitle: "Tested in demanding, high-stakes environments.",
    description: "From high-frequency gaming platforms and performance motoring telemetry to enterprise back-office automation, our work is built to run reliably under real-world pressure."
  },
  {
    number: "04",
    title: "DIRECT, HONEST EXECUTION",
    subtitle: "No agency bloat or unnecessary complexity.",
    description: "You work directly with the senior engineers building your systems. If a simpler automation solves your problem better than a complex AI model, we'll tell you straight."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-brutal-black relative selection:bg-accent selection:text-white pb-0 text-white overflow-hidden">
      <div className="atmosphere" />
      <div className="fixed inset-0 custom-grid opacity-20 pointer-events-none z-0" />

      <Navigation />

      <main className="pt-28 sm:pt-36 lg:pt-44 relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1.5 mb-6 sm:mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                ABOUT BUILD CULT
              </span>
            </div>

            <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.88] mb-8 sm:mb-10">
              WHO WE <br />
              <span className="text-white/20">ARE & WHAT</span> <span className="text-accent">WE DO</span>
            </h1>

            <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed font-light">
              Build Cult is an AI and software engineering company. We help ambitious businesses cut through the noise, modernize their operations, and ship software that drives real commercial results.
            </p>
          </motion.div>
        </section>

        {/* THE REALITY: WHY AFRICA IS FALLING BEHIND IN AI */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-2 sm:border-4 border-accent bg-black p-6 sm:p-10 lg:p-14 relative shadow-[8px_8px_0px_rgba(255,50,0,0.3)] sm:shadow-[16px_16px_0px_rgba(255,50,0,0.2)] overflow-hidden"
          >
            <div className="max-w-4xl">
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4 block">
                THE MARKET REALITY
              </span>
              
              <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-tight mb-6 sm:mb-8">
                AI is moving faster than anything we've seen before. <br className="hidden md:block"/>
                <span className="text-white/40">And across Africa, most businesses are being left behind.</span>
              </h2>

              <div className="space-y-4 sm:space-y-6 text-white/80 font-sans text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                <p>
                  The gap isn't caused by a lack of ambition—it's caused by a shortage of talent with genuine depth of experience. Very few teams have hands-on experience using the latest AI tooling in ways that drive <strong className="text-white font-semibold">actual business value</strong>.
                </p>
                <p>
                  Compounding the problem is an inability to hire correctly. When companies don't have deep technical leadership in-house, they struggle to separate surface-level buzzwords from real engineering capability.
                </p>
              </div>

              {/* The Punchline */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center">
                <div className="bg-white/5 border border-white/10 p-5 sm:p-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-1 sm:mb-2">The Core Problem</span>
                  <p className="font-sans text-xl sm:text-2xl font-bold text-white/80 tracking-tight">
                    "They don't know what they don't know."
                  </p>
                </div>
                
                <div className="bg-accent text-white p-5 sm:p-6 shadow-[6px_6px_0px_#ffffff]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black/80 font-bold block mb-1 sm:mb-2">Our Advantage</span>
                  <p className="font-sans text-2xl sm:text-4xl font-black uppercase tracking-tight">
                    WE DO.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROVEN TRACK RECORD */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
            <div>
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4 block">
                EXPERIENCE THAT MATTERS
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter">
                OUR TRACK RECORD
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/60 max-w-md mt-4 md:mt-0">
              We've led AI and engineering initiatives across demanding industries where performance and reliability are non-negotiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROVEN_TRACK_RECORD.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="border-2 border-white/10 hover:border-accent bg-white/[0.02] p-6 sm:p-8 lg:p-10 transition-all duration-300 group relative flex flex-col justify-between"
                >
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-[10px] sm:text-xs font-bold text-accent px-2.5 py-1 bg-accent/10 border border-accent/30">
                    {item.metric}
                  </div>

                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 border border-white/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors text-white">
                      <Icon size={24} />
                    </div>

                    <span className="text-accent font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] block mb-2">
                      {item.badge}
                    </span>

                    <h3 className="font-sans font-black text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="font-mono text-[11px] sm:text-xs text-white/50 uppercase tracking-widest mb-4 sm:mb-6">
                      {item.subtitle}
                    </p>

                    <p className="font-sans text-white/75 text-sm sm:text-base leading-relaxed mb-6 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/40 uppercase tracking-widest">
                    <span>PRODUCTION PROVEN</span>
                    <CheckCircle2 size={16} className="text-accent" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-l-4 border-accent bg-white/[0.02] p-6 sm:p-10 lg:p-12 border border-white/5"
            >
              <div className="font-mono text-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3">
                01 // OUR MISSION
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-wider mb-4 sm:mb-6">
                MISSION
              </h2>
              <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-white/80 mb-6">
                To help ambitious organizations turn modern AI and software engineering into measurable competitive advantage—by building reliable systems, automating manual work, and raising internal technical standards.
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-white/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" /> Focus on clear, measurable business ROI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" /> Upskill internal teams on modern AI workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" /> Ship clean, maintainable production code
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-l-4 border-white/30 bg-white/[0.02] p-6 sm:p-10 lg:p-12 border border-white/5"
            >
              <div className="font-mono text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3">
                02 // OUR VISION
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-wider mb-4 sm:mb-6 text-white/90">
                VISION
              </h2>
              <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-white/70 mb-6">
                To close the AI and engineering capability gap across Africa and emerging markets—proving that world-class technical talent and execution can solve the hardest operational challenges here and globally.
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-white/40">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/40 flex-shrink-0" /> Bridge the gap between research and real-world operations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/40 flex-shrink-0" /> Replace slow legacy processes with intelligent automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/40 flex-shrink-0" /> Set a higher bar for technical consulting and hiring
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* COMPANY HISTORY */}
        <section className="bg-white text-black py-16 sm:py-28 lg:py-36 mb-20 sm:mb-28 lg:mb-36 relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent block mb-3">
                  OUR STORY
                </span>
                <h2 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] mb-6 sm:mb-8">
                  BUILT BY <br />
                  <span className="text-black/40">PRACTITIONERS</span>
                </h2>
                
                <p className="font-sans text-lg sm:text-xl font-medium leading-relaxed mb-4 sm:mb-6">
                  Build Cult started because we saw too many businesses getting burned by agencies and consultants who talked about AI without ever having built production systems.
                </p>
                
                <div className="space-y-4 font-sans text-sm sm:text-base lg:text-lg text-black/80 font-normal leading-relaxed">
                  <p>
                    Before forming Build Cult, our team spent years in the trenches: leading AI at Africa's largest online casino, contributing to research on AI in education, building internal workflow automations inside large corporate incumbents, and acting as the technology partner for a market leader in performance motoring.
                  </p>
                  <p>
                    We saw firsthand how hard it is for companies to find engineers who genuinely understand modern tooling and how to apply it for commercial return. We brought our team together to offer businesses a partner that actually knows how to build, ship, and scale.
                  </p>
                </div>

                <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-black/10">
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-black text-black">100%</div>
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-black/60">Senior Engineers</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl sm:text-3xl font-black text-accent">ZERO</div>
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-black/60">Outsourcing or Fluff</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="font-mono text-2xl sm:text-3xl font-black text-black">4+</div>
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-black/60">Core Industries</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative border-4 sm:border-8 border-black shadow-[10px_10px_0px_#000] sm:shadow-[20px_20px_0px_#000] bg-black overflow-hidden group">
                  <img 
                    src="/src/assets/images/iso_hero_roi_1795560789183.jpg" 
                    alt="Abstract isometric architectural monolith representing Build Cult systems engineering" 
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/90 backdrop-blur-md border-t border-white/10 text-white">
                    <div className="font-mono text-[9px] sm:text-[10px] text-accent font-bold uppercase tracking-widest mb-1">
                      ENGINEERING & AI
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider">
                      PRODUCTION SYSTEMS TEAM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3 sm:mb-4 block">
              WHAT DRIVES US
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter mb-4 sm:mb-6">
              CORE VALUES
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/60">
              The principles that guide how we partner with clients and build software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {VALUES.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="border-2 border-white/10 p-6 sm:p-8 lg:p-10 hover:border-accent transition-colors bg-white/[0.015] relative group"
              >
                <div className="font-mono text-accent text-3xl sm:text-4xl mb-3 sm:mb-4 font-black">
                  {value.number}
                </div>
                <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-widest mb-1.5 sm:mb-2 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/40 mb-3 sm:mb-4">
                  {value.subtitle}
                </div>
                <p className="font-sans text-white/75 leading-relaxed font-light text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CORE TEAM */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-20 sm:mb-28 lg:mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
            <div>
              <span className="text-accent font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3 sm:mb-4 block">
                LEADERSHIP
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tighter">
                CORE TEAM
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/60 max-w-md mt-4 md:mt-0">
              Engineers, researchers, and architects with hands-on production experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM.map((member, idx) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group border border-white/10 hover:border-accent p-4 sm:p-5 bg-white/[0.02] flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="relative aspect-[4/5] mb-4 sm:mb-5 overflow-hidden border border-white/10 bg-black">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  <span className="text-accent font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">
                    {member.role}
                  </span>
                  <h3 className="font-sans font-black text-lg sm:text-xl uppercase tracking-wider mb-2 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className="font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-tight mb-3 sm:mb-4">
                    {member.specialty}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4 sm:mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap gap-1 sm:gap-1.5">
                  {member.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="font-mono text-[8px] sm:text-[9px] uppercase px-1.5 sm:px-2 py-0.5 bg-white/5 border border-white/10 text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24 sm:pb-36">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border-2 sm:border-4 border-white bg-accent text-white p-6 sm:p-12 lg:p-16 shadow-[8px_8px_0px_#ffffff] sm:shadow-[16px_16px_0px_#ffffff] relative overflow-hidden"
          >
            <div className="max-w-3xl relative z-10">
              <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/80 block mb-3 sm:mb-4">
                READY TO BUILD?
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-4 sm:mb-6 text-white">
                CUT THROUGH THE NOISE. <br />
                SHIP REAL AI VALUE.
              </h2>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-white/95 mb-8 sm:mb-10 leading-relaxed max-w-2xl">
                Whether you need to automate internal workflows, audit your AI readiness, or bring senior engineering talent onto a key project, let's talk.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                <a
                  href="/#contact"
                  className="bg-black text-white hover:bg-white hover:text-black font-sans font-bold uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={16} />
                </a>
                <Link
                  to="/digital-transformation"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-sans font-bold uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-3 text-center"
                >
                  <span>Explore Digital Transformation</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
