import React from 'react';
import { ArrowUp } from 'lucide-react';
import { AlsLogo } from './AlsLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] text-white pt-20 pb-12 px-6 sm:px-8 border-t border-neutral-800">
      <div className="max-w-5xl mx-auto">
        {/* Wordmark & Back to Top */}
        <div className="border-b border-neutral-800 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <AlsLogo size={42} variant="light" />
              <span className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white block">
                ALS INFONET
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-400 font-mono-tech">
              Engineering what's next.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 hover:text-white transition-colors cursor-pointer self-start md:self-end border border-neutral-800 px-4 py-2 hover:border-neutral-600"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-xs font-mono-tech">
          <div>
            <span className="text-neutral-400 font-semibold block mb-3 uppercase tracking-wider text-[11px]">
              Index
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-[#E50914] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#E50914] transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-[#E50914] transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-[#E50914] transition-colors">Selected Work</a></li>
              <li><a href="#capabilities" className="hover:text-[#E50914] transition-colors">Insights</a></li>
              <li><a href="#contact" className="hover:text-[#E50914] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-400 font-semibold block mb-3 uppercase tracking-wider text-[11px]">
              Locations
            </span>
            <div className="space-y-3 text-neutral-300">
              <div>
                <strong className="text-white block font-sans">Chennai</strong>
                <a href="tel:+919894051733" className="text-neutral-400 hover:text-white transition-colors block mt-0.5">
                  +91 98940 51733
                </a>
              </div>
              <div className="pt-1">
                <strong className="text-white block font-sans">Bangalore</strong>
                <a href="tel:+918073888324" className="text-neutral-400 hover:text-white transition-colors block mt-0.5">
                  +91 80738 88324
                </a>
              </div>
            </div>
          </div>

          <div>
            <span className="text-neutral-400 font-semibold block mb-3 uppercase tracking-wider text-[11px]">
              Communications
            </span>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href="tel:+919894051733" className="hover:text-[#E50914] transition-colors">
                  +91 98940 51733
                </a>
              </li>
              <li>
                <a href="tel:+918073888324" className="hover:text-[#E50914] transition-colors">
                  +91 80738 88324
                </a>
              </li>
              <li className="pt-1">
                <a href="mailto:contact@alsinfonet.com" className="hover:text-[#E50914] transition-colors">
                  contact@alsinfonet.com
                </a>
              </li>
              <li>
                <a href="mailto:careers@alsinfonet.com" className="hover:text-[#E50914] transition-colors">
                  careers@alsinfonet.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-400 font-semibold block mb-3 uppercase tracking-wider text-[11px]">
              Focus
            </span>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Custom software development and AI-enabled solutions for businesses ready to move forward.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
          <div>
            &copy; {currentYear} ALS Infonet Private Limited. All rights reserved.
          </div>
          <div>
            Chennai · Bangalore, India
          </div>
        </div>
      </div>
    </footer>
  );
};
