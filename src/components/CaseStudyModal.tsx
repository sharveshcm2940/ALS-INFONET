import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, ArrowRight, Check } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onContactClick
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E0E0E] text-white border border-neutral-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-[#080808] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech tracking-wider text-[#E50914] font-bold uppercase">
              SOLUTION CATEGORY // {project.number}
            </span>
            <span className="text-neutral-600 font-mono-tech text-xs">·</span>
            <span className="text-xs font-mono-tech text-neutral-400">
              {project.industry}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          <div>
            <h2 id="case-study-title" className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 text-base text-neutral-300 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Business Challenge vs Solution Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-neutral-800 p-6 bg-[#141414]">
              <span className="text-xs font-mono-tech font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                TYPICAL BUSINESS CHALLENGE
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.businessChallenge}
              </p>
            </div>

            <div className="border border-neutral-800 p-6 bg-[#141414]">
              <span className="text-xs font-mono-tech font-bold text-[#E50914] uppercase tracking-wider block mb-2">
                SOLUTION OVERVIEW
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solutionOverview}
              </p>
            </div>
          </div>

          {/* Key Functionality */}
          <div>
            <h4 className="text-xs font-mono-tech font-bold text-neutral-300 uppercase tracking-wider mb-4">
              KEY SYSTEM CAPABILITIES &amp; FUNCTIONALITY
            </h4>
            <ul className="space-y-3">
              {project.keyFunctionality.map((fn, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                  <Check size={16} className="text-[#E50914] shrink-0 mt-0.5" />
                  <span>{fn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono-tech font-bold text-neutral-400 uppercase tracking-wider mb-3">
              VERIFIED ARCHITECTURE STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono-tech bg-neutral-900 text-neutral-200 border border-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-[#080808] flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-tech uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            CLOSE SPEC
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#C40810] text-white text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>DISCUSS THIS SOLUTION TYPE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
