import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative bg-[#F4F2EB] text-[#111111] py-20 sm:py-28 px-6 sm:px-8 border-t border-neutral-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <div className="mb-12 sm:mb-16">
          <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-neutral-500 block mb-3 font-semibold">
            01 / About
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight">
            Good software starts with understanding the problem.
          </h2>
        </div>

        {/* Asymmetrical Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-neutral-300">
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-xl sm:text-2xl text-[#111111] font-normal leading-relaxed text-balance">
              ALS Infonet is a software development company operating in Chennai and Bangalore. We develop custom applications, business systems, and AI-enabled solutions for organizations with specific technical and operational requirements.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Our approach is straightforward: understand the requirement, plan the solution, build it carefully, and keep communication clear throughout the project.
            </p>
          </div>

          {/* Simple Location Labels */}
          <div className="lg:col-span-4 pt-2 border-t lg:border-t-0 border-neutral-300">
            <span className="text-[10px] font-mono-tech tracking-widest uppercase text-neutral-500 block mb-4 font-semibold">
              Locations
            </span>
            <div className="space-y-4 font-mono-tech text-xs text-[#111111]">
              <div>
                <strong className="block text-sm font-sans font-semibold">Chennai</strong>
                <a href="tel:+919894051733" className="text-neutral-600 hover:text-[#E50914] transition-colors block mt-0.5">
                  +91 98940 51733
                </a>
              </div>
              <div className="pt-2 border-t border-neutral-300">
                <strong className="block text-sm font-sans font-semibold">Bangalore</strong>
                <a href="tel:+918073888324" className="text-neutral-600 hover:text-[#E50914] transition-colors block mt-0.5">
                  +91 80738 88324
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <p className="text-sm text-neutral-600">
            Built around your requirements. Let's explore what's possible.
          </p>
          <button
            type="button"
            onClick={handleContact}
            className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold tracking-wider text-[#111111] hover:text-[#E50914] transition-colors cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
