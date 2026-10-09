import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AlsLogo } from './AlsLogo';

interface NavbarProps {
  onTalkClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTalkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT', href: '#about' },
    { label: 'INSIGHTS', href: '#capabilities' }
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#E50914] border-b border-black/15 py-3.5 shadow-sm'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Top left: Geometric Logo Mark & Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3.5 group shrink-0"
          aria-label="ALS Infonet Home"
        >
          <div className="relative flex items-center justify-center p-1 rounded transition-transform duration-300 group-hover:scale-105">
            <AlsLogo size={34} variant="hero-red" className="transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-black uppercase whitespace-nowrap group-hover:opacity-85 transition-opacity">
            ALS INFONET
          </span>
        </a>

        {/* Top center: WORK / SERVICES / ABOUT / INSIGHTS */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-mono-tech tracking-[0.2em] uppercase font-bold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-black/85 hover:text-black transition-colors relative py-1 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Top right: CHENNAI · BANGALORE & pill button LET'S TALK */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="hidden lg:flex items-center text-[10px] font-mono-tech tracking-[0.2em] font-bold text-black uppercase whitespace-nowrap">
            CHENNAI · BANGALORE
          </div>

          <button
            type="button"
            onClick={onTalkClick}
            className="px-5 py-2 text-[11px] font-mono-tech font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            LET'S TALK
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-black hover:bg-black/10 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#E50914] border-b border-black/20 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-xs font-mono-tech font-bold tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-black hover:text-white py-2 border-b border-black/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 text-[10px] font-mono-tech text-black/70">
              OFFICES: CHENNAI · BANGALORE
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
