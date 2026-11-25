import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-10 sm:py-12 bg-brutal-black border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 text-center md:text-left">
        <div className="font-sans font-black text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/40">
          © {new Date().getFullYear()} BUILD CULT — AI & SOFTWARE ENGINEERING
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/industries" className="hover:text-accent transition-colors">Industries</Link>
          <Link to="/audit" className="hover:text-accent transition-colors">AI Audit</Link>
          <Link to="/digital-transformation" className="hover:text-accent transition-colors">Transformation</Link>
          <Link to="/tech-talent" className="hover:text-accent transition-colors">Tech Talent</Link>
          <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
          <Link to="/podcast" className="hover:text-accent transition-colors">Podcast</Link>
          <a href="/#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>

        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </footer>
  );
}
