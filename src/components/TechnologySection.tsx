import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TechnologySectionProps {
  onContactClick?: () => void;
}

const APPROACH_AREAS = [
  {
    number: '01',
    area: 'Engineering',
    statement: 'Building software with maintainability, usability, and performance in mind.',
    elaboration: 'We choose established technical foundations over transient trends. Every architecture is designed for clear maintenance, type safety, and predictable long-term operation.'
  },
  {
    number: '02',
    area: 'Automation',
    statement: 'Identifying repetitive work that can be simplified through software and system integrations.',
    elaboration: 'Rather than introducing complexity, we look for high-friction manual data tasks, repetitive workflows, and integration gaps that can be solved with clean automation.'
  },
  {
    number: '03',
    area: 'Product Thinking',
    statement: 'Prioritizing useful functionality and clear requirements before adding complexity.',
    elaboration: 'We build what teams and customers actually use. Keeping scope disciplined accelerates delivery and ensures the final software solves genuine operational needs.'
  }
];

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onContactClick }) => {
  const handleContactAction = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="capabilities" className="relative bg-[#F4F2EB] text-[#111111] py-20 sm:py-28 px-6 sm:px-8 border-t border-neutral-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-neutral-500 block mb-3 font-semibold">
            04 / Insights
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-3">
            How we approach technology
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl">
            Perspectives from the way we design, build, and support software.
          </p>
        </div>

        {/* Editorial Text Blocks Separated by Thin Rules */}
        <div className="border-t border-neutral-300 divide-y divide-neutral-300">
          {APPROACH_AREAS.map((item) => (
            <div key={item.number} className="py-10 sm:py-14">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-baseline">
                {/* Area Title */}
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono-tech text-xs text-neutral-500 font-semibold shrink-0">
                    {item.number}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111111]">
                    {item.area}
                  </h3>
                </div>

                {/* Perspective Statements */}
                <div className="md:col-span-8 space-y-3">
                  <p className="font-display text-lg sm:text-xl font-medium text-[#111111] leading-snug">
                    "{item.statement}"
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {item.elaboration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Action Link */}
        <div className="mt-16 pt-8 border-t border-neutral-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <p className="text-sm text-neutral-600">
            Have a technical challenge or requirement to explore?
          </p>
          <button
            type="button"
            onClick={handleContactAction}
            className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold tracking-wider text-[#111111] hover:text-[#E50914] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Discuss your project</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
