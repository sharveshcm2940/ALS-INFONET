import React, { useState } from 'react';
import { APPROACH_PHASES } from '../data/companyData';
import { soundEngine } from '../utils/sound';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Layers, 
  Code2, 
  Send,
  Calendar,
  FileCheck2,
  GitCommit,
  LayoutGrid,
  ListFilter
} from 'lucide-react';

interface StageMeta {
  number: string;
  name: string;
  icon: React.ElementType;
  timeframe: string;
  summary: string;
  focus: string;
  gate: string;
  deliverables: string[];
  activities: string[];
}

const STAGES: StageMeta[] = [
  {
    number: '01',
    name: 'Discover',
    icon: Search,
    timeframe: 'Weeks 1 — 2',
    summary: 'Analyze business workflows, audit constraints, and align on clear project scope before building.',
    focus: 'Requirements & Technical Feasibility',
    gate: 'Scope Specification & Architecture Sign-Off',
    deliverables: [
      'Technical Feasibility Assessment',
      'System Boundary & Data Entity Map',
      'Integration Risk & Third-Party Audit',
      'Sprint Roadmap & Milestone Budget'
    ],
    activities: [
      'Stakeholder interviews and workflow mapping',
      'Auditing existing databases and legacy software',
      'Defining edge cases, latency, and security needs',
      'Establishing clear acceptance criteria for each feature'
    ]
  },
  {
    number: '02',
    name: 'Design',
    icon: Layers,
    timeframe: 'Weeks 3 — 4',
    summary: 'Formulate database schemas, API contracts, and intuitive interfaces to remove all ambiguity.',
    focus: 'Architecture & System Blueprints',
    gate: 'API Contract Freeze & Prototype Approval',
    deliverables: [
      'Interactive UI/UX Clickable Wireframes',
      'REST & gRPC OpenAPI Contract Specifications',
      'Relational Database Schema & Indexing Plan',
      'Staging & Production Infrastructure Topology'
    ],
    activities: [
      'User journey mapping for field & office workflows',
      'Drafting typed API interfaces between services',
      'Designing accessible, high-contrast user interfaces',
      'Reviewing security, authentication, and role hierarchies'
    ]
  },
  {
    number: '03',
    name: 'Develop',
    icon: Code2,
    timeframe: 'Weeks 5 — 10+',
    summary: 'Engineer maintainable, type-safe code with automated testing and frequent milestone previews.',
    focus: 'Implementation & Automated Testing',
    gate: 'Automated CI/CD Pass & User Acceptance Testing',
    deliverables: [
      'Clean, Documented Source Code Repository',
      'Automated Unit, Integration & Security Tests',
      'Live Staging Environment for Weekly Demos',
      'Optimized Backend Services & Fast Database Queries'
    ],
    activities: [
      'Two-week agile sprints with direct client visibility',
      'Continuous integration pipelines on every pull request',
      'Automated regression testing and vulnerability scanning',
      'Weekly working software demonstrations'
    ]
  },
  {
    number: '04',
    name: 'Deliver',
    icon: Send,
    timeframe: 'Launch & Ongoing',
    summary: 'Deploy production software into your environment, verify uptime, and provide training.',
    focus: 'Deployment, Training & Telemetry',
    gate: 'Production Cutover & Sign-Off Checklist',
    deliverables: [
      'Zero-Downtime Production Deployment',
      'Operational Runbooks & API Documentation',
      'Team Onboarding & Administrative Walkthrough',
      'Post-Launch Telemetry & Monitoring Setup'
    ],
    activities: [
      'Carefully planned data migration and blue-green cutover',
      'End-to-end smoke testing under real-world load',
      'Comprehensive handoff documentation and code access',
      'Proactive monitoring, bug fixes, and continuous support'
    ]
  }
];

export const ApproachSection: React.FC = () => {
  // Timeline mode: 'horizontal' (stepper rail) or 'vertical' (detailed timeline)
  const [timelineMode, setTimelineMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  const handleStageSelect = (index: number) => {
    soundEngine.playMechanicalClick();
    setSelectedStageIndex(index);
  };

  const handleModeChange = (mode: 'horizontal' | 'vertical') => {
    soundEngine.playMechanicalClick();
    setTimelineMode(mode);
  };

  const scrollToContact = () => {
    soundEngine.playMechanicalClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentStage = STAGES[selectedStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <section 
      id="approach" 
      className="relative bg-[#F4F2EB] text-[#111111] py-20 sm:py-28 px-6 sm:px-8 border-t border-neutral-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-neutral-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#E50914]" />
              <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase text-neutral-600 font-semibold">
                Development Process &amp; Methodology
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight">
              Discover. Design. Develop. Deliver.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm sm:text-base text-neutral-600 max-w-sm leading-relaxed font-sans">
              A transparent, four-stage engineering timeline designed to remove guesswork and deliver working software on schedule.
            </p>

            {/* Mode switch */}
            <div className="inline-flex items-center bg-white border border-neutral-300 p-1 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleModeChange('horizontal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech transition-colors cursor-pointer ${
                  timelineMode === 'horizontal'
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
                title="View horizontal timeline stepper"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Horizontal</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('vertical')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech transition-colors cursor-pointer ${
                  timelineMode === 'vertical'
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-neutral-600 hover:text-black'
                }`}
                title="View vertical sequential timeline"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Vertical</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL TIMELINE VIEW                                 */}
        {/* ======================================================== */}
        {timelineMode === 'horizontal' && (
          <div className="space-y-8">
            {/* Timeline Bar (Track with numbered nodes) */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-8">
              <div className="relative">
                {/* Horizontal Connecting Rail */}
                <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-neutral-200 z-0" />

                {/* 4 Stage Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
                  {STAGES.map((stage, idx) => {
                    const Icon = stage.icon;
                    const isSelected = selectedStageIndex === idx;

                    return (
                      <button
                        key={stage.number}
                        type="button"
                        onClick={() => handleStageSelect(idx)}
                        className={`text-left p-4 sm:p-5 border transition-all cursor-pointer relative group ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111] shadow-md -translate-y-1'
                            : 'bg-[#FAF9F5] text-neutral-800 border-neutral-300 hover:border-neutral-500 hover:bg-white'
                        }`}
                      >
                        {/* Top Step Number & Icon */}
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 flex items-center justify-center font-mono-tech text-xs font-bold border ${
                            isSelected
                              ? 'bg-[#E50914] text-white border-[#E50914]'
                              : 'bg-white text-neutral-800 border-neutral-300 group-hover:border-black'
                          }`}>
                            <span>{stage.number}</span>
                          </div>

                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#E50914]' : 'text-neutral-500'}`} />
                        </div>

                        {/* Stage Name */}
                        <div className="font-display font-bold text-xl tracking-tight mb-1">
                          {stage.name}
                        </div>

                        {/* Timeframe Tag */}
                        <div className={`text-[11px] font-mono-tech mb-2 ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-500'
                        }`}>
                          {stage.timeframe}
                        </div>

                        {/* Brief summary */}
                        <p className={`text-xs line-clamp-2 leading-relaxed ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-600'
                        }`}>
                          {stage.focus}
                        </p>

                        {/* Active Indicator Arrow */}
                        {isSelected && (
                          <div className="hidden md:block absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111111] rotate-45 border-r border-b border-[#111111]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Stage Workspace Card */}
            <div className="bg-white border border-neutral-300 p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 mb-8 border-b border-neutral-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-[#111111] text-white text-xs font-mono-tech font-bold">
                      STAGE {currentStage.number}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono-tech text-neutral-600">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {currentStage.timeframe}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight flex items-center gap-3">
                    <span>{currentStage.name}</span>
                    <span className="text-neutral-400 font-normal text-lg sm:text-xl font-sans">— {currentStage.focus}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
                    {currentStage.summary}
                  </p>
                </div>

                <div className="shrink-0 p-3 bg-[#F4F2EB] border border-neutral-300 flex items-center gap-2">
                  <CurrentIcon className="w-6 h-6 text-[#E50914]" />
                  <div className="text-left font-mono-tech text-[11px]">
                    <span className="block text-neutral-500 uppercase">Current Step</span>
                    <span className="font-bold text-[#111111]">{currentStage.name}</span>
                  </div>
                </div>
              </div>

              {/* Grid: Deliverables vs Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Deliverables */}
                <div className="bg-[#FAF9F5] border border-neutral-200 p-6">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-neutral-200">
                    <FileCheck2 className="w-4 h-4 text-[#E50914]" />
                    <h4 className="font-mono-tech text-xs uppercase tracking-wider font-bold text-[#111111]">
                      Tangible Deliverables
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {currentStage.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                        <span className="font-mono-tech text-[11px] text-[#E50914] font-bold mt-0.5">
                          0{idx + 1}
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hands-on Activities */}
                <div className="bg-[#FAF9F5] border border-neutral-200 p-6">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-neutral-200">
                    <GitCommit className="w-4 h-4 text-[#E50914]" />
                    <h4 className="font-mono-tech text-xs uppercase tracking-wider font-bold text-[#111111]">
                      Engineering Activities
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {currentStage.activities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Milestone Quality Gate */}
              <div className="bg-[#111111] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#E50914] shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 block">
                      Stage Verification Checkpoint
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-semibold text-white">
                      {currentStage.gate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStageSelect((selectedStageIndex + 1) % STAGES.length)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono-tech text-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VERTICAL TIMELINE VIEW                                   */}
        {/* ======================================================== */}
        {timelineMode === 'vertical' && (
          <div className="relative">
            {/* Continuous vertical timeline track spine */}
            <div className="absolute left-6 sm:left-10 top-8 bottom-12 w-0.5 bg-neutral-300 z-0" />

            <div className="space-y-10 sm:space-y-12">
              {STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isSelected = selectedStageIndex === idx;

                return (
                  <div 
                    key={stage.number}
                    className="relative flex items-start group"
                  >
                    {/* Numbered node / pin */}
                    <div className="relative z-10 flex-shrink-0 mr-6 sm:mr-8">
                      <button
                        type="button"
                        onClick={() => handleStageSelect(idx)}
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center font-mono-tech font-bold border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E50914] text-white border-[#E50914] scale-105 shadow-md'
                            : 'bg-white text-[#111111] border-neutral-400 hover:border-black'
                        }`}
                        title={`Select Stage ${stage.number}`}
                      >
                        <span className="text-xs sm:text-sm leading-none">{stage.number}</span>
                        <Icon className="w-3.5 h-3.5 mt-0.5 opacity-90" />
                      </button>
                    </div>

                    {/* Stage Card */}
                    <div 
                      onClick={() => handleStageSelect(idx)}
                      className={`flex-1 bg-white border p-6 sm:p-8 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#111111] shadow-md ring-1 ring-black/5'
                          : 'border-neutral-300 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      {/* Top Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[11px] font-mono-tech font-bold border border-neutral-200">
                            STAGE {stage.number}
                          </span>
                          <span className="text-xs font-mono-tech text-neutral-500">
                            {stage.timeframe}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono-tech text-neutral-500 uppercase tracking-wide">
                          Gate: {stage.gate}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display font-bold text-2xl text-[#111111] tracking-tight mb-2">
                        {stage.name} <span className="font-normal text-neutral-400 text-lg font-sans">— {stage.focus}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                        {stage.summary}
                      </p>

                      {/* 2-Column deliverables & activities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-neutral-100">
                        <div>
                          <span className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                            Primary Deliverables
                          </span>
                          <ul className="space-y-2">
                            {stage.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs text-neutral-800 font-medium">
                                <span className="font-mono-tech text-[10px] text-[#E50914] font-bold mt-0.5">
                                  0{dIdx + 1}
                                </span>
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                            Key Activities
                          </span>
                          <ul className="space-y-2">
                            {stage.activities.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 text-xs text-neutral-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Timeline Bottom CTA Banner */}
        <div className="mt-16 sm:mt-20 bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono-tech tracking-widest uppercase text-neutral-400 block mb-2 font-semibold">
              Predictable Engineering Delivery
            </span>
            <h4 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white mb-2">
              Have a project with a fixed deadline or defined requirements?
            </h4>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              We provide upfront scope estimates, architectural feasibility assessments, and dedicated sprint planning for businesses across Chennai and Bangalore.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#E50914] text-white font-mono-tech font-bold text-xs uppercase tracking-wider hover:bg-[#c40811] transition-colors cursor-pointer shrink-0"
          >
            <span>Plan Your Project Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
