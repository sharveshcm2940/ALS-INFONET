import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/companyData';
import { ProjectItem } from '../types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

interface WorkSectionProps {
  onContactClick: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onContactClick }) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="relative bg-[#F4F2EB] text-[#111111] py-20 sm:py-28 px-6 sm:px-8 border-t border-neutral-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-neutral-500 block mb-3 font-semibold">
            03 / Selected work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-3">
            Selected work
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl">
            A closer look at the systems and applications we develop.
          </p>
        </div>

        {/* Curated Project Index with Thin Horizontal Lines */}
        <div className="border-t border-neutral-300 divide-y divide-neutral-300">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group py-8 sm:py-10 transition-colors duration-150 cursor-pointer hover:bg-black/[0.02]"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 sm:gap-8">
                {/* Number & Title */}
                <div className="flex items-baseline gap-6 sm:gap-10 md:w-5/12 shrink-0">
                  <span className="font-mono-tech text-xs text-neutral-500 font-semibold">
                    {project.number}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#111111] group-hover:text-[#E50914] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono-tech text-neutral-500 block mt-1">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Summary Description */}
                <div className="md:w-6/12 pl-12 md:pl-0">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Restrained Arrow Interaction */}
                <div className="md:w-1/12 flex justify-end pl-12 md:pl-0">
                  <div className="w-8 h-8 flex items-center justify-center text-neutral-400 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Conversion Link */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-neutral-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-lg text-[#111111]">
              Have a project in mind?
            </h4>
            <p className="text-sm text-neutral-600 mt-1">
              Tell us what you're planning. We'll help you explore the right technical approach.
            </p>
          </div>

          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center gap-2 text-xs font-mono-tech font-bold tracking-wider text-[#111111] hover:text-[#E50914] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Discuss a Project</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onContactClick={onContactClick}
      />
    </section>
  );
};
