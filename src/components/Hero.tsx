import React from 'react';
import { RollingCounter } from './RollingCounter';
import { AlsLogo } from './AlsLogo';

interface HeroProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onStartProject }) => {
  return (
    <section className="relative min-h-screen bg-[#E50914] text-neutral-950 flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 lg:px-8 select-none">
      {/* Top kicker with geometric cube icon */}
      <div className="w-full flex flex-col items-center text-center mt-2 sm:mt-6 mb-6">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-black text-white text-[10px] sm:text-[11px] font-mono-tech tracking-[0.2em] uppercase font-bold shadow-md">
          <AlsLogo size={16} variant="light" />
          <span>EST. FOR WHAT'S NEXT</span>
        </div>
      </div>

      {/* Centerpiece: Mechanical Rolling Counter */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center my-auto">
        <RollingCounter />

        {/* Hero Editorial Typography */}
        <div className="mt-12 sm:mt-14 text-center max-w-2xl mx-auto px-4">
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-neutral-950 tracking-tight leading-[1.08] text-balance">
            Engineering ideas into digital reality.
          </h1>
          <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-950/85 max-w-lg mx-auto leading-relaxed">
            ALS Infonet builds intelligent software, scalable digital platforms, and AI-powered solutions for businesses ready to move forward.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onExploreWork}
              className="px-7 py-3.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              View Work
            </button>
            <button
              type="button"
              onClick={onStartProject}
              className="px-7 py-3.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-100 border border-black transition-colors cursor-pointer"
            >
              Discuss a Project
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Corners */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-black/20 text-[11px] font-mono-tech tracking-widest uppercase text-black font-semibold">
        <div>
          SOFTWARE / INTELLIGENCE / INNOVATION
        </div>

        <a
          href="#about"
          className="hover:opacity-75 transition-opacity"
        >
          Scroll to explore ↓
        </a>
      </div>
    </section>
  );
};
