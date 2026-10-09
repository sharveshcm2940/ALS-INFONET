import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onTalkClick?: () => void;
}

const SERVICES_LIST = [
  {
    number: '01',
    title: 'Custom Software Development',
    description: 'Software designed for specific business processes, internal operations, and management requirements.'
  },
  {
    number: '02',
    title: 'Web Application Development',
    description: 'Web applications built for specific operational workflows, user roles, and internal administration.'
  },
  {
    number: '03',
    title: 'AI Integration & Automation',
    description: 'Applied intelligence to automate document workflows, information retrieval, and repetitive manual tasks.'
  },
  {
    number: '04',
    title: 'Mobile Application Development',
    description: 'Mobile software designed around field workflows, staff operations, and customer access.'
  },
  {
    number: '05',
    title: 'Software Integration',
    description: 'Connecting disparate tools, updating legacy applications, and establishing clean API boundaries.'
  },
  {
    number: '06',
    title: 'Digital Product Development',
    description: 'End-to-end planning, development, and deployment of early-stage and production digital products.'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onTalkClick }) => {
  const handleContactAction = () => {
    if (onTalkClick) {
      onTalkClick();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative bg-[#F4F2EB] text-[#111111] py-20 sm:py-28 px-6 sm:px-8 border-t border-neutral-300">
      <div className="max-w-5xl mx-auto">
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Introduction */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-neutral-500 block mb-3 font-semibold">
              02 / Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-4">
              Our services
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-6">
              From internal business systems to customer-facing applications, we design and develop software around specific requirements, practical workflows, and measurable business goals.
            </p>

            {/* In-column Closing CTA */}
            <div className="pt-6 border-t border-neutral-300">
              <p className="text-sm text-neutral-600 mb-2">
                Not sure what your project needs? Share your requirements with us.
              </p>
              <button
                type="button"
                onClick={handleContactAction}
                className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold tracking-wider text-[#111111] hover:text-[#E50914] transition-colors cursor-pointer"
              >
                <span>Talk to our team</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Right Column: Numbered Services List with Subtle Dividers */}
          <div className="lg:col-span-7 border-t border-neutral-300 lg:border-t-0 divide-y divide-neutral-300">
            {SERVICES_LIST.map((service) => (
              <div key={service.number} className="py-7 sm:py-9 first:pt-0">
                <div className="flex items-baseline gap-4 sm:gap-6 mb-2">
                  <span className="font-mono-tech text-xs text-neutral-500 font-semibold shrink-0">
                    {service.number}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#111111]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pl-8 sm:pl-10">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
