import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleBookAudit = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/audit') {
      navigate('/audit');
    }
  };

  const menuItems = [
    { label: 'Capabilities', path: '/digital-transformation', type: 'link' },
    { label: 'Industries', path: '/industries', type: 'link' },
    { label: 'Case Studies', path: '#case-studies', type: 'anchor' },
    { label: 'Tech Talent', path: '/tech-talent', type: 'link' },
    { label: 'About', path: '/about', type: 'link' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="shrink-0 whitespace-nowrap">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-sm tracking-[0.4em] uppercase select-none whitespace-nowrap"
            >
              BUILD<span className="text-accent ml-1">CULT</span>
            </motion.div>
          </Link>
          
          {/* Zone 2: 5 Clean Single-Line Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center gap-8"
          >
            {menuItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname === item.path
                      ? 'text-accent font-bold underline underline-offset-8 decoration-2'
                      : 'text-white/70 hover:text-white hover:underline hover:underline-offset-8'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  key={item.label} 
                  href={isHome ? item.path : `/${item.path}`}
                  className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 hover:text-white hover:underline hover:underline-offset-8 transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </a>
              )
            ))}
          </motion.div>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <button 
              onClick={handleBookAudit}
              className="border border-white/30 bg-white text-black px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-black hover:bg-accent hover:text-white hover:border-accent transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Start AI Audit
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={handleBookAudit}
              className="border border-white/30 text-white px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium hover:bg-white hover:text-black transition-all"
            >
              AI Audit
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/20 text-white bg-white/5 hover:border-accent hover:text-accent transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-2xl border-b border-white/10 lg:hidden overflow-y-auto px-6 py-8 flex flex-col justify-between"
          >
            <div className="space-y-6 pt-4">
              <div className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] mb-4">
                NAVIGATION
              </div>

              <div className="flex flex-col space-y-3">
                {menuItems.map((item, idx) => (
                  item.type === 'link' ? (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xl sm:text-2xl font-black uppercase tracking-tight py-2 border-b border-white/10 flex items-center justify-between ${
                        location.pathname === item.path ? 'text-accent pl-2 border-accent' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span>0{idx + 1}. {item.label}</span>
                      <ArrowRight size={18} className="text-white/30" />
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={isHome ? item.path : `/${item.path}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl sm:text-2xl font-black uppercase tracking-tight py-2 border-b border-white/10 text-white/80 hover:text-white flex items-center justify-between"
                    >
                      <span>0{idx + 1}. {item.label}</span>
                      <ArrowRight size={18} className="text-white/30" />
                    </a>
                  )
                ))}
              </div>
            </div>

            <div className="pt-8 pb-16 border-t border-white/10 mt-6 space-y-4">
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                BUILD CULT // AI & SOFTWARE ENGINEERING
              </div>
              <a 
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-accent text-white py-4 font-sans font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[4px_4px_0px_#ffffff]"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
