import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ClientLogoItem {
  id: string;
  name: string;
  outcome: string;
  href: string;
  renderLogo: () => React.ReactNode;
}

const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'bmw',
    name: 'BMW',
    outcome: '3.8x Commercial ROI',
    href: '/project/bmw-forged',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="24" cy="24" r="22" fill="#050505" stroke="#050505" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="14.5" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M24 9.5A14.5 14.5 0 0 1 38.5 24H24V9.5Z" fill="#050505" />
          <path d="M24 38.5A14.5 14.5 0 0 1 9.5 24H24V38.5Z" fill="#050505" />
          <circle cx="24" cy="24" r="14.5" stroke="#050505" strokeWidth="2" />
          <line x1="24" y1="9.5" x2="24" y2="38.5" stroke="#050505" strokeWidth="1.75" />
          <line x1="9.5" y1="24" x2="38.5" y2="24" stroke="#050505" strokeWidth="1.75" />
          <text
            x="24"
            y="7.6"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="5.2"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.8"
          >
            BMW
          </text>
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-sans font-black text-2xl sm:text-3xl tracking-[-0.04em] text-black group-hover:text-accent transition-colors">
            BMW
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black/55 mt-1">
            Performance Motoring
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'forged',
    name: 'Forged',
    outcome: '+285% Build Conversions',
    href: '/project/bmw-forged',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <polygon
            points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
            fill="#050505"
          />
          <path
            d="M16 15H33L30.5 20.5H21.5V23.5H29L26.5 28.5H21.5V35H16V15Z"
            fill="#FFFFFF"
          />
          <rect x="29" y="30" width="5" height="5" fill="#FF3200" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-sans font-black text-2xl sm:text-3xl tracking-[0.06em] uppercase text-black group-hover:text-accent transition-colors">
            FORGED
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black/55 mt-1">
            3D Spatial &amp; Telemetry
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'nova-havens',
    name: 'Nova Havens',
    outcome: '81% Admin Automated',
    href: '/project/nova-havens',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="3" width="42" height="42" fill="#050505" />
          <path
            d="M11 35V16L24 9L37 16V35H31.5V19.5L24 15.5L16.5 19.5V35H11Z"
            fill="#FFFFFF"
          />
          <path d="M21 35V24H27V35H21Z" fill="#FF3200" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-sans font-black text-xl sm:text-2xl tracking-[0.08em] uppercase text-black group-hover:text-accent transition-colors whitespace-nowrap">
            NOVA HAVENS
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black/55 mt-1">
            Enterprise Ops Automation
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'hollywoodbets',
    name: 'Hollywoodbets',
    outcome: '4.6x First-Year ROI',
    href: '/project/hollywoodbets',
    renderLogo: () => (
      <div className="flex items-center gap-3.5">
        <svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="3" width="42" height="42" fill="#050505" />
          <polygon
            points="24,9 28.4,18.2 38.5,19.5 31.1,26.5 33,36.5 24,31.6 15,36.5 16.9,26.5 9.5,19.5 19.6,18.2"
            fill="#FFFFFF"
          />
          <circle cx="24" cy="24" r="3.5" fill="#FF3200" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-sans font-black text-xl sm:text-2xl tracking-[-0.03em] uppercase text-black group-hover:text-accent transition-colors whitespace-nowrap">
            HOLLYWOOD<span className="text-accent">BETS</span>
          </span>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-black/55 mt-1">
            10M+ Daily AI Risk Scoring
          </span>
        </div>
      </div>
    )
  }
];

export default function ClientLogoMarquee() {
  // Repeat sequence twice per half-track so wide viewports never show a gap
  const trackSequence = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      aria-label="Companies we have worked with"
      className="relative z-20 bg-white text-black border-y-4 border-black select-none"
    >
      {/* Top Stark Context Bar */}
      <div className="bg-[#050505] text-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em]">
            <span className="text-accent">Trusted By Industry Leaders</span>
            <span className="text-white/30" aria-hidden="true">·</span>
            <span className="text-white/70">Production AI, 3D &amp; Automation Deployments</span>
          </div>
          <a
            href="#case-studies"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 hover:text-accent transition-colors inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>Inspect Verified ROI</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* High-Contrast Scrolling Logo Marquee */}
      <div className="logo-marquee-wrapper relative overflow-hidden motion-reduce:overflow-x-auto scrollbar-none bg-white py-6 sm:py-8">
        {/* Crisp Edge Masks for Smooth Visual Entry/Exit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10"
        />

        <div className="logo-marquee-track">
          {[0, 1].map((duplicateIndex) => (
            <div
              key={duplicateIndex}
              aria-hidden={duplicateIndex === 1}
              className="flex shrink-0 items-center"
            >
              {trackSequence.map((client, itemIndex) => (
                <div
                  key={`${duplicateIndex}-${client.id}-${itemIndex}`}
                  className="flex items-center shrink-0"
                >
                  <Link
                    to={client.href}
                    tabIndex={duplicateIndex === 1 ? -1 : 0}
                    className="group flex items-center gap-4 px-7 sm:px-12 py-2 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {client.renderLogo()}
                    <span aria-hidden="true" className="hidden md:inline text-black/25 font-bold">
                      ·
                    </span>
                    <span className="hidden md:inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-black/65 group-hover:text-black transition-colors whitespace-nowrap">
                      {client.outcome}
                    </span>
                  </Link>

                  {/* Hard Geometric Neobrutalist Divider */}
                  <span
                    aria-hidden="true"
                    className="w-2.5 h-2.5 bg-black rotate-45 shrink-0 mx-1 sm:mx-2"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
