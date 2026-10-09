import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Lock, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  Sparkles,
  Database,
  Server,
  FileCode2,
  Check
} from 'lucide-react';
import { AlsLogo } from './AlsLogo';
import { COMPANY_INFO } from '../data/companyData';

type EngagementTier = 'pilot' | 'enterprise' | 'corp';

interface SolutionItem {
  id: string;
  number: string;
  label: string;
  category: string;
  headline: string;
  description: string;
  idealFor: string;
  businessImpact: string;
  serviceInterest: string;
  coreDeliverables: string[];
  techStack: string[];
  roadmap: {
    week: string;
    phase: string;
    deliverable: string;
  }[];
  tierSpecs: {
    pilot: { timeline: string; team: string; investmentModel: string; scopeFocus: string };
    enterprise: { timeline: string; team: string; investmentModel: string; scopeFocus: string };
    corp: { timeline: string; team: string; investmentModel: string; scopeFocus: string };
  };
}

interface SuccessStory {
  id: string;
  number: string;
  industryTag: string;
  clientTitle: string;
  location: string;
  challenge: string;
  deliveredSolution: string;
  businessImpact: string;
  technicalOutcome: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  solutionIndex: number;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'manufacturing-erp',
    number: '01',
    industryTag: 'INDUSTRIAL FABRICATION & SPARES',
    clientTitle: 'Multi-Plant Industrial Components Manufacturer',
    location: 'Chennai & Coimbatore Hubs',
    challenge: '4 disconnected manufacturing plants relied on manual spreadsheets and delayed weekly tally reconciliation, causing regular inventory blind spots and ₹18L/yr in recurring SaaS seat fees.',
    deliveredSolution: 'Proprietary Multi-Branch ERP & Inventory Ledger with real-time branch sync, double-entry accounting ledger, and role-based operator dashboards.',
    businessImpact: '84% reduction in order processing turnaround, zero inventory discrepancies across 4 facilities, and 100% elimination of recurring SaaS user license taxes.',
    technicalOutcome: 'PostgreSQL ACID ledger with row-level security, sub-60ms cross-plant query latency, automated nightly snapshot replication, deployed on dedicated private VPS.',
    metrics: [
      { label: 'Order Processing', value: '84% Faster' },
      { label: 'Inventory Drift', value: '0% Discrepancy' },
      { label: 'Software Licensing', value: '₹18L / Yr Saved' },
      { label: 'Query Latency', value: '< 60ms Average' }
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    solutionIndex: 0
  },
  {
    id: 'logistics-iot',
    number: '02',
    industryTag: 'COLD-CHAIN FLEET LOGISTICS',
    clientTitle: 'Inter-State Temperature-Controlled Logistics Fleet',
    location: 'Bangalore Hub (120+ Trucks)',
    challenge: 'Manual driver phone check-ins caused visibility gaps in transit across remote state highways, with 15% missed temperature SLA windows risking expensive cargo spoilage.',
    deliveredSolution: 'Sub-Second WebSocket Telemetry Streaming Daemon & Driver Mobile App with offline encrypted GPS caching and automated deviation alerts.',
    businessImpact: '100% cargo SLA compliance maintained continuously for 14 straight months, zero perishable spoilage claims, and 90+ manual dispatcher hours saved every week.',
    technicalOutcome: 'Go (Golang) streaming daemon handling 1,500 telemetry events/sec, Redis Pub/Sub bus, on-device encrypted SQLite app with automated delta sync upon network restore.',
    metrics: [
      { label: 'SLA Compliance', value: '100% Maintained' },
      { label: 'Cargo Spoilage', value: '₹0 Claims (14 Mos)' },
      { label: 'Dispatcher Time', value: '90+ Hrs / Wk Saved' },
      { label: 'Stream Latency', value: '< 45ms Packets' }
    ],
    techStack: ['Go (Golang)', 'Redis Pub/Sub', 'React Native', 'SQLite', 'TimescaleDB'],
    solutionIndex: 5
  },
  {
    id: 'fintech-automation',
    number: '03',
    industryTag: 'COMMERCIAL FINTECH & CREDIT',
    clientTitle: 'B2B Trade Credit & Invoice Factoring Platform',
    location: 'Chennai Financial District',
    challenge: 'Credit underwriters spent 25–40 minutes per batch manually transcribing PDF invoices and cross-referencing GSTIN registration portals before approving supplier advances.',
    deliveredSolution: 'Intelligent Event-Driven Document Processing Pipeline with OCR extraction, automated tax API verification, and human-in-the-loop exception routing HUD.',
    businessImpact: 'Batch verification time plummeted from 35 minutes down to 18 seconds with 99.4% OCR accuracy, freeing 6 full-time financial analysts for borrower underwriting.',
    technicalOutcome: 'Python FastAPI asynchronous task worker with Celery/Redis queue, automated GSTIN validation microservice, and banking-grade immutable audit trails.',
    metrics: [
      { label: 'Batch Intake Time', value: '35m → 18 Sec' },
      { label: 'Extraction Accuracy', value: '99.4% Verified' },
      { label: 'Analyst Capacity', value: '6 Full-Time Freed' },
      { label: 'Data Retention', value: 'SOC2 Compliant' }
    ],
    techStack: ['Python', 'FastAPI', 'Redis Queue', 'React', 'PostgreSQL', 'Docker'],
    solutionIndex: 1
  },
  {
    id: 'healthcare-modernization',
    number: '04',
    industryTag: 'DIAGNOSTIC HEALTHCARE NETWORK',
    clientTitle: 'Regional Pathology & Medical Scan Network',
    location: '18 Centers Across South India',
    challenge: 'Aging 12-year-old on-premise monolithic database froze during peak morning registration surges, leaving hundreds of fasting patients waiting at physical diagnostic desks.',
    deliveredSolution: 'Strangler-Fig Zero-Downtime Modernization with reverse proxy traffic facade, dual-write data validation, and patient self-service web portal.',
    businessImpact: 'Zero morning desk registration downtime, 4.8x faster diagnostic report generation, and 62% of patients adopted instant web/WhatsApp report downloads.',
    technicalOutcome: 'Zero-downtime live cutover of 2.4M historical patient records with continuous shadow verification; encrypted patient data storage meeting healthcare privacy standards.',
    metrics: [
      { label: 'Morning Downtime', value: '0 Freeze Events' },
      { label: 'Report Generation', value: '4.8x Faster' },
      { label: 'Self-Service Adoption', value: '62% Patients' },
      { label: 'Migrated Records', value: '2.4M Safe Cutover' }
    ],
    techStack: ['TypeScript', 'Reverse Proxy', 'PostgreSQL', 'Next.js', 'Cloudflare'],
    solutionIndex: 4
  },
  {
    id: 'retail-web-portal',
    number: '05',
    industryTag: 'OMNICHANNEL RETAIL & D2C',
    clientTitle: 'Multi-Store Fashion Retailer & Online Store',
    location: 'Bangalore (14 Stores + D2C)',
    challenge: 'Disconnected physical store POS and online inventory caused frequent stockouts and overselling during festival discount seasons, frustrating high-value shoppers.',
    deliveredSolution: 'Unified Cloud Order Orchestration Engine with sub-80ms client web portal and store manager PWA with instant barcode inventory lookup.',
    businessImpact: 'Zero inventory overselling during peak festival flash sales, 38% increase in omnichannel repeat customer retention, and seamless return-to-store across all 14 branches.',
    technicalOutcome: 'Next.js edge-rendered client web application with atomic PostgreSQL inventory reservations, sub-80ms edge TTFB, and PWA offline store manager POS.',
    metrics: [
      { label: 'Festival Stockouts', value: '0 Oversell Errors' },
      { label: 'Repeat Retention', value: '+38% Omnichannel' },
      { label: 'Web Page Speed', value: '< 80ms TTFB' },
      { label: 'Store Sync', value: 'Instant Real-Time' }
    ],
    techStack: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS', 'Edge CDN'],
    solutionIndex: 2
  }
];

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'erp',
    number: '01',
    label: 'Custom ERP & Operations',
    category: 'ENTERPRISE RESOURCE PLATFORMS',
    headline: 'Unified Operations, Inventory & Multi-Branch Accounting',
    description: 'Replaces fractured spreadsheets and expensive recurring SaaS seat licenses with a proprietary, 100% client-owned operational system connecting inventory, accounting, branch billing, and role permissions.',
    idealFor: 'Growing manufacturers, retail chains, distribution hubs, and multi-branch service enterprises.',
    businessImpact: 'Eliminates up to 80% of manual data entry, cuts billing reconciliation from 4 days to real-time, and frees your company from recurring per-user software licensing fees.',
    serviceInterest: 'Custom Software Development',
    coreDeliverables: [
      'Centralized multi-branch inventory & order management',
      'Double-entry accounting ledger with automated invoicing',
      'Granular role-based access control (RBAC) & audit logs',
      '100% Client-Owned Source Code & database schema'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    roadmap: [
      { week: 'Week 1', phase: 'Blueprint & Schema', deliverable: 'Entity-relationship diagrams, workflows, and fixed milestone contract' },
      { week: 'Weeks 2–4', phase: 'Core Engine Build', deliverable: 'Live staging environment with inventory, billing, and auth modules' },
      { week: 'Weeks 5–6', phase: 'UAT & Staff Training', deliverable: 'Branch user testing, legacy data migration, and operator manuals' },
      { week: 'Week 7+', phase: 'Production Cutover', deliverable: 'Zero-downtime launch, DNS switch, and 90-day warranty activation' }
    ],
    tierSpecs: {
      pilot: { timeline: '3–5 Weeks', team: '1 Lead Architect + 1 Senior Engineer', investmentModel: 'Fixed-Price Pilot', scopeFocus: 'Core inventory & daily billing ledger for 1–2 main branches' },
      enterprise: { timeline: '6–10 Weeks', team: '1 Lead Architect + 2 Full-Stack + 1 QA', investmentModel: 'Milestone Delivery Contract', scopeFocus: 'Complete multi-department ERP with branch sync, accounting & custom roles' },
      corp: { timeline: '12+ Weeks', team: 'Dedicated 5-Engineer Squad + DevOps', investmentModel: 'Dedicated Pod Partnership', scopeFocus: 'Multi-region distributed ERP with ERP/SAP legacy bridges & high SLA' }
    }
  },
  {
    id: 'automation',
    number: '02',
    label: 'Workflow Automation',
    category: 'INTELLIGENT PROCESS AUTOMATION',
    headline: 'Event-Driven Document & Approval Automation Engines',
    description: 'Eliminates repetitive back-office bottlenecks by automating vendor invoice intake, multi-tier purchase approvals, compliance verification, and third-party API sync without human delays.',
    idealFor: 'Finance teams, healthcare providers, logistics brokers, and B2B services processing 500+ documents weekly.',
    businessImpact: 'Reduces document processing turnaround from 48 hours to under 30 seconds; saves an estimated 150+ operational staff hours every month.',
    serviceInterest: 'AI Integration & Automation',
    coreDeliverables: [
      'Automated document intake & structured OCR parsing',
      'Asynchronous task queues with automated error retry',
      'Interactive Human-in-the-Loop review & approval UI',
      'Bi-directional sync with existing accounting / CRM tools'
    ],
    techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Celery / Redis', 'Docker'],
    roadmap: [
      { week: 'Week 1', phase: 'Process Mapping', deliverable: 'Document format mapping, exception taxonomy, and test corpus' },
      { week: 'Weeks 2–3', phase: 'Automation Engine', deliverable: 'Ingest worker, extraction logic, and staging approval dashboard' },
      { week: 'Weeks 4–5', phase: 'Integration & Trial', deliverable: 'Live shadow run with existing email / drive folders, accuracy review' },
      { week: 'Week 6+', phase: 'Live Automation', deliverable: 'Full production activation with proactive telemetry & alerting' }
    ],
    tierSpecs: {
      pilot: { timeline: '3–4 Weeks', team: '1 Automation Architect + 1 Engineer', investmentModel: 'Turnkey Sprint', scopeFocus: 'Automating high-volume invoice/PO intake for 1 core department' },
      enterprise: { timeline: '5–8 Weeks', team: '1 Lead Architect + 2 Engineers + 1 QA', investmentModel: 'Milestone Agreement', scopeFocus: 'Multi-channel document pipelines, CRM/ERP sync, and approval hierarchies' },
      corp: { timeline: '10+ Weeks', team: 'Specialized Automation Engineering Pod', investmentModel: 'Custom Enterprise Scope', scopeFocus: 'High-throughput enterprise document engine with SOC2 compliant retention' }
    }
  },
  {
    id: 'web',
    number: '03',
    label: 'Web Portals & Platforms',
    category: 'CUSTOMER & CLIENT DIGITAL HUBS',
    headline: 'High-Conversion Customer & Partner Portals',
    description: 'Purpose-built, sub-second web platforms and authenticated client portals designed to convert visitors, streamline self-service orders, and securely manage client engagements 24/7.',
    idealFor: 'B2B service providers, fintech companies, e-commerce brands, and professional client firms.',
    businessImpact: 'Sub-100ms TTFB page load speed, 99.95% availability, and eliminates support ticket volume by 45% via automated self-service account dashboards.',
    serviceInterest: 'Web Application Development',
    coreDeliverables: [
      'Modern responsive web application with zero layout shifts',
      'Secure user authentication & self-service account management',
      'Custom checkout / payment gateway & invoicing integration',
      'Administrative analytics and customer management console'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Cloudflare'],
    roadmap: [
      { week: 'Week 1', phase: 'UX & Contract Specs', deliverable: 'Wireframes, API contract specs, and brand identity sign-off' },
      { week: 'Weeks 2–4', phase: 'Front & Back Engine', deliverable: 'Interactive staging portal with live authentication and checkout' },
      { week: 'Weeks 5–6', phase: 'Speed & Security Audit', deliverable: 'Lighthouse 95+ score optimization, penetration test, and UAT' },
      { week: 'Week 7+', phase: 'Global Deployment', deliverable: 'Production deployment with CDN caching, SSL, and analytics' }
    ],
    tierSpecs: {
      pilot: { timeline: '3–5 Weeks', team: '1 Senior Full-Stack + 1 UI Engineer', investmentModel: 'Rapid Launch Fixed-Scope', scopeFocus: 'Customer onboarding portal with secure account access and payments' },
      enterprise: { timeline: '6–9 Weeks', team: '1 Architect + 2 Full-Stack + 1 QA', investmentModel: 'Turnkey Milestone Delivery', scopeFocus: 'Complete multi-tenant client portal with custom reports and CRM integration' },
      corp: { timeline: '10+ Weeks', team: 'Dedicated Web Platform Pod', investmentModel: 'Enterprise Retainer / Sprints', scopeFocus: 'Multi-region portal with global CDN edge rendering and high concurrency' }
    }
  },
  {
    id: 'mobile',
    number: '04',
    label: 'Field Mobile Suites',
    category: 'OFFLINE-FIRST MOBILE SUITES',
    headline: 'Resilient Mobile Apps for Field Teams & Dispatch',
    description: 'Native and cross-platform mobile apps for field technicians, delivery drivers, and on-ground staff with bulletproof offline data caching and seamless background synchronization.',
    idealFor: 'Field service technicians, delivery fleets, facility inspection teams, and on-ground sales agents.',
    businessImpact: 'Guarantees zero operational downtime even in remote zero-network zones; enables instant digital proof-of-work, e-signatures, and supervisor tracking.',
    serviceInterest: 'Mobile Application Development',
    coreDeliverables: [
      'Cross-platform iOS and Android production apps',
      'Encrypted on-device SQLite database with offline-first support',
      'Automated background delta sync & conflict resolution',
      'Dispatcher web portal with live field status and route mapping'
    ],
    techStack: ['React Native', 'Flutter', 'SQLite', 'TypeScript', 'Node.js', 'PostgreSQL'],
    roadmap: [
      { week: 'Week 1', phase: 'Field UX & Workflow', deliverable: 'Screen flows for low-light & one-handed field usability' },
      { week: 'Weeks 2–4', phase: 'Offline App & Sync', deliverable: 'Working APK/TestFlight build with offline caching and camera capture' },
      { week: 'Weeks 5–6', phase: 'Field Pilot & QA', deliverable: 'Real-world field test with staff in disconnected warehouse/rural zones' },
      { week: 'Week 7+', phase: 'App Store & Rollout', deliverable: 'Store submissions, MDM enterprise distribution, and operator onboarding' }
    ],
    tierSpecs: {
      pilot: { timeline: '4–6 Weeks', team: '1 Mobile Lead + 1 Backend Engineer', investmentModel: 'Pilot Rollout', scopeFocus: 'Core field task checklist app with offline photo upload and signatures' },
      enterprise: { timeline: '7–10 Weeks', team: '1 Architect + 2 Mobile Devs + 1 QA', investmentModel: 'Milestone Contract', scopeFocus: 'Full dispatch suite with GPS route tracking, inventory sync, and push alerts' },
      corp: { timeline: '12+ Weeks', team: 'Dedicated Mobile Operations Pod', investmentModel: 'Enterprise SLA Partnership', scopeFocus: 'Fleet-wide mobile system integrated with enterprise ERP and MDM security' }
    }
  },
  {
    id: 'modernization',
    number: '05',
    label: 'Legacy Modernization',
    category: 'LEGACY REFACTORING & MIGRATION',
    headline: 'Zero-Downtime Legacy Overhaul & Cloud Migration',
    description: 'Safely refactor aging 10+ year monoliths, outdated PHP/Visual Basic codebases, and slow legacy databases into modular cloud architectures without interrupting ongoing business operations.',
    idealFor: 'Established companies with decades of valuable historical data seeking modern cloud speed without business disruption.',
    businessImpact: 'Protects decades of historical customer records, cuts query wait times by 4x, eliminates security compliance vulnerabilities, and modernizes your core tech assets.',
    serviceInterest: 'Software Integration',
    coreDeliverables: [
      'Non-invasive reverse proxy facade (strangler-fig pattern)',
      'Dual-write data replication & automated integrity verification',
      'Modern React / TypeScript user interface replacing legacy screens',
      'Automated rollback safety nets and zero-downtime cutover'
    ],
    techStack: ['PostgreSQL', 'Docker', 'TypeScript', 'Reverse Proxy', 'Go', 'Python'],
    roadmap: [
      { week: 'Week 1', phase: 'Architecture Audit', deliverable: 'Monolith dependency map, data dictionary, and risk containment plan' },
      { week: 'Weeks 2–4', phase: 'Proxy & Dual-Write', deliverable: 'Proxy layer intercepting traffic with real-time shadow verification' },
      { week: 'Weeks 5–7', phase: 'Modern Modules', deliverable: 'Modern modular services replacing heaviest legacy bottlenecks' },
      { week: 'Week 8+', phase: 'Zero-Downtime Cutover', deliverable: 'Clean migration of historical records and decommissioning legacy servers' }
    ],
    tierSpecs: {
      pilot: { timeline: '4–6 Weeks', team: '1 Principal Architect + 1 Senior Engineer', investmentModel: 'Fixed-Phase Modernization', scopeFocus: 'Modernizing the single slowest legacy bottleneck/query with proxy facade' },
      enterprise: { timeline: '8–12 Weeks', team: '1 Lead Architect + 2 Engineers + 1 DBA', investmentModel: 'Milestone Modernization', scopeFocus: 'Full database migration and front-end replacement with zero business stoppage' },
      corp: { timeline: '14+ Weeks', team: 'Dedicated Legacy Transformation Squad', investmentModel: 'Phased Multi-Quarter Contract', scopeFocus: 'Complete multi-system migration across multiple legacy databases and branches' }
    }
  },
  {
    id: 'realtime',
    number: '06',
    label: 'Real-Time IoT & Telemetry',
    category: 'TELEMETRY & LIVE EVENT STREAMING',
    headline: 'Live Telemetry, Fleet Tracking & Sensor Dashboards',
    description: 'High-throughput WebSocket pipelines and time-series streaming engines that power live vehicle fleet tracking, industrial equipment telemetry, and sub-second operations dashboards.',
    idealFor: 'Logistics fleets, smart factory operators, IoT device manufacturers, and financial monitors.',
    businessImpact: 'Provides instant operational situational awareness with sub-50ms message delivery; replaces manual driver check-in calls and stale end-of-day spreadsheets.',
    serviceInterest: 'Digital Product Development',
    coreDeliverables: [
      'High-throughput Go pub/sub streaming microservice',
      'Live reactive operations HUD with real-time map/sensor telemetry',
      'Automated threshold alerts & instant mobile push notifications',
      'Time-series historical data storage for predictive maintenance'
    ],
    techStack: ['Go (Golang)', 'Redis Pub/Sub', 'TimescaleDB', 'React', 'WebSockets', 'Docker'],
    roadmap: [
      { week: 'Week 1', phase: 'Protocol & Ingestion', deliverable: 'Socket/MQTT protocol specs, payload schemas, and ingest benchmarks' },
      { week: 'Weeks 2–4', phase: 'Streaming Daemon', deliverable: 'High-concurrency streaming service handling live staging sensor feeds' },
      { week: 'Weeks 5–6', phase: 'Live HUD & Alerts', deliverable: 'Reactive control room dashboard with live mapping and threshold triggers' },
      { week: 'Week 7+', phase: 'Production Fleet Rollout', deliverable: 'Deployment on clustered nodes with failover and 99.9% uptime SLA' }
    ],
    tierSpecs: {
      pilot: { timeline: '3–5 Weeks', team: '1 Systems Architect + 1 Full-Stack', investmentModel: 'Pilot Prototype', scopeFocus: 'Live telemetry ingestion and reactive dashboard for up to 100 devices' },
      enterprise: { timeline: '6–9 Weeks', team: '1 Architect + 2 Backend Engineers + 1 QA', investmentModel: 'Turnkey Contract', scopeFocus: 'Clustered streaming pipeline with map tracking, SMS/push alerts, and reports' },
      corp: { timeline: '12+ Weeks', team: 'Specialized Real-Time Systems Pod', investmentModel: 'Enterprise Partnership', scopeFocus: 'High-scale multi-region telemetry mesh for 10,000+ live devices with SLA' }
    }
  }
];

export const MechanicalConsole: React.FC = () => {
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(0);
  const [engagementTier, setEngagementTier] = useState<EngagementTier>('enterprise');
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);
  const [blueprintRequestedNotice, setBlueprintRequestedNotice] = useState<string | null>(null);

  // Success Stories Carousel State
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSolution = SOLUTIONS[selectedSolutionIndex];
  const currentTier = currentSolution.tierSpecs[engagementTier];
  const currentStory = SUCCESS_STORIES[storyIndex];

  // Carousel Auto-play effect
  useEffect(() => {
    if (isCarouselPaused) return;

    autoPlayTimerRef.current = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 6500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isCarouselPaused]);

  const handleNextStory = () => {
    setStoryIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const handlePrevStory = () => {
    setStoryIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  const handleSelectStoryIndex = (index: number) => {
    setStoryIndex(index);
  };

  const handleSelectSolution = (index: number) => {
    setSelectedSolutionIndex(index);
    setActiveRoadmapStep(0);
    setBlueprintRequestedNotice(null);
  };

  // Request Blueprint CTA
  const handleRequestBlueprint = (solutionItem = currentSolution) => {
    const requirements = `We are interested in exploring ${solutionItem.label} (${solutionItem.category}). Estimated scale: ${
      engagementTier === 'pilot' ? 'Rapid Pilot / MVP (3–5 Weeks)' : engagementTier === 'enterprise' ? 'Full Enterprise Suite (6–10 Weeks)' : 'Multi-Branch Corp Platform (12+ Weeks)'
    }. Key focus: ${solutionItem.tierSpecs[engagementTier].scopeFocus}. Please share the technical blueprint and scoping estimate.`;

    window.dispatchEvent(
      new CustomEvent('als_prefill_contact', {
        detail: {
          serviceInterest: solutionItem.serviceInterest,
          requirements: requirements
        }
      })
    );

    setBlueprintRequestedNotice(`Scoping blueprint prepared for ${solutionItem.label}! Directing you to inquiry details...`);

    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  // From story, switch to corresponding solution blueprint
  const handleScopeFromStory = (story: SuccessStory) => {
    setSelectedSolutionIndex(story.solutionIndex);
    handleRequestBlueprint(SOLUTIONS[story.solutionIndex]);
  };

  const handleCallConsultant = (phoneRaw: string) => {
    window.location.href = `tel:${phoneRaw}`;
  };

  return (
    <section 
      id="console"
      className="relative bg-[#0F0F0F] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-neutral-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#E50914] rounded-full inline-block" />
              <span className="text-[11px] font-mono-tech tracking-[0.2em] uppercase font-bold text-[#E50914]">
                ARCHITECTURE WORKBENCH
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              PROVEN ENTERPRISE ARCHITECTURES
            </h2>
          </div>

          <div className="text-xs font-mono-tech text-neutral-400 max-w-sm leading-relaxed">
            <p className="text-neutral-300 font-sans text-sm">
              Explore verified client deployments, core technical blueprints, and delivery timelines engineered by our teams in Chennai and Bangalore.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODULE 1: VERIFIED CLIENT SUCCESS STORIES CAROUSEL       */}
        {/* ======================================================== */}
        <div 
          className="mb-14 bg-[#141414] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-xl"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          {/* Header of Success Stories Carousel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded">
                <Award size={18} className="text-[#E50914]" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest block font-semibold">
                  VERIFIED CLIENT IMPACT // CASE STUDY {currentStory.number} OF 0{SUCCESS_STORIES.length}
                </span>
                <span className="text-xs font-mono-tech text-emerald-400 font-bold uppercase">
                  {currentStory.industryTag} · {currentStory.location}
                </span>
              </div>
            </div>

            {/* Carousel Navigation Buttons & Dots */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-1.5 mr-2">
                {SUCCESS_STORIES.map((st, sIndex) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStoryIndex(sIndex)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      storyIndex === sIndex
                        ? 'w-6 bg-[#E50914]'
                        : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to case study ${sIndex + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handlePrevStory}
                className="p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-neutral-500 hover:text-white text-neutral-300 rounded transition-colors cursor-pointer"
                title="Previous Case Study"
                aria-label="Previous Case Study"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleNextStory}
                className="p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-neutral-500 hover:text-white text-neutral-300 rounded transition-colors cursor-pointer"
                title="Next Case Study"
                aria-label="Next Case Study"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Current Story Content */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {currentStory.clientTitle}
              </h3>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
                <span className="block text-[11px] font-mono-tech uppercase text-neutral-400 font-semibold mb-1.5">
                  Business Challenge
                </span>
                <p className="text-sm font-sans text-neutral-300 leading-relaxed">
                  {currentStory.challenge}
                </p>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
                <span className="block text-[11px] font-mono-tech uppercase text-[#E50914] font-semibold mb-1.5">
                  Engineered Solution
                </span>
                <p className="text-sm font-sans text-neutral-200 leading-relaxed">
                  {currentStory.deliveredSolution}
                </p>
              </div>
            </div>

            {/* 4 Quantitative Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
              {currentStory.metrics.map((m, mIdx) => (
                <div key={mIdx}>
                  <span className="block text-[10px] font-mono-tech text-neutral-400 uppercase mb-0.5">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-xl font-bold font-mono-tech text-emerald-400">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Technical Outcome & Stack */}
            <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-sky-400 font-bold mb-1.5">
                <TrendingUp size={14} />
                <span>Technical Architecture &amp; Delivery Outcome</span>
              </div>
              <p className="text-sm font-mono-tech text-neutral-300 leading-relaxed mb-3">
                {currentStory.technicalOutcome}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-900 text-xs font-mono-tech">
                <span className="text-neutral-500 font-semibold">PRODUCTION STACK:</span>
                {currentStory.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-[#171717] border border-neutral-800 text-neutral-300 rounded text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar for Case Study */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleScopeFromStory(currentStory)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#c40811] transition-colors rounded cursor-pointer"
              >
                <span>Scope Similar Architecture For Your Company</span>
                <ArrowRight size={14} />
              </button>

              <span className="text-xs font-mono-tech text-neutral-500">
                VERIFIED PRODUCTION DEPLOYMENT ✓
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODULE 2: INTERACTIVE CORE SYSTEM ARCHITECTURES          */}
        {/* ======================================================== */}
        <div className="bg-[#141414] border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-8">
            <div>
              <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest block font-semibold mb-1">
                TAILORED SOLUTIONS // 6 CORE DOMAINS
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                SELECT A CORE ARCHITECTURE SPECIFICATION
              </h3>
            </div>

            {/* Notice Banner when Blueprint requested */}
            {blueprintRequestedNotice && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 text-xs font-mono-tech flex items-center gap-2 rounded">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{blueprintRequestedNotice}</span>
              </div>
            )}
          </div>

          {/* Solution Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {SOLUTIONS.map((sol, sIndex) => {
              const isSelected = selectedSolutionIndex === sIndex;

              return (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => handleSelectSolution(sIndex)}
                  className={`p-3 text-left border rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#E50914] border-[#E50914] text-white shadow-lg'
                      : 'bg-[#0A0A0A] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono-tech opacity-70 mb-1">
                    {sol.number}
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm tracking-tight leading-snug">
                    {sol.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Solution Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono-tech text-[#E50914] font-bold uppercase tracking-wider block mb-1">
                {currentSolution.category}
              </span>
              <h4 className="font-display font-extrabold text-2xl text-white tracking-tight">
                {currentSolution.headline}
              </h4>
              <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed max-w-3xl">
                {currentSolution.description}
              </p>
            </div>

            {/* Target Fit & Business ROI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 uppercase font-bold mb-1.5">
                  <Building2 size={14} className="text-[#E50914]" />
                  <span>Who This Is Built For</span>
                </div>
                <p className="text-sm font-sans text-neutral-200 leading-relaxed">
                  {currentSolution.idealFor}
                </p>
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 uppercase font-bold mb-1.5">
                  <Zap size={14} />
                  <span>Measurable Business ROI</span>
                </div>
                <p className="text-sm font-sans text-emerald-400 leading-relaxed font-semibold">
                  {currentSolution.businessImpact}
                </p>
              </div>
            </div>

            {/* Core Deliverables */}
            <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
              <span className="block text-xs font-mono-tech text-neutral-400 uppercase font-bold mb-3">
                Included Production Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-neutral-300">
                {currentSolution.coreDeliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guaranteed 4-Stage Project Roadmap */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-3">
                <span className="uppercase font-bold text-neutral-300">
                  Guaranteed Milestone Delivery Roadmap:
                </span>
                <span>STAGE 0{activeRoadmapStep + 1} OF 04</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {currentSolution.roadmap.map((step, sIdx) => {
                  const isActive = activeRoadmapStep === sIdx;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveRoadmapStep(sIdx)}
                      className={`p-3 text-left border rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E50914] text-white border-[#E50914] shadow'
                          : 'bg-[#0A0A0A] text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono-tech opacity-80 mb-0.5">
                        {step.week}
                      </div>
                      <div className="text-xs font-mono-tech font-bold truncate">
                        {step.phase}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-[#0A0A0A] border border-neutral-800 rounded text-xs font-mono-tech text-neutral-300 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold">Phase Deliverable: </span>
                  <span>{currentSolution.roadmap[activeRoadmapStep].deliverable}</span>
                </div>
              </div>
            </div>

            {/* Project Scale Selector */}
            <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono-tech">
                  <Layers size={14} className="text-[#E50914]" />
                  <span className="text-white font-bold uppercase tracking-wider">
                    Select Project Scope Tier:
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 border border-neutral-800 rounded">
                  <button
                    type="button"
                    onClick={() => setEngagementTier('pilot')}
                    className={`px-3 py-1.5 text-xs font-mono-tech font-bold rounded transition-colors cursor-pointer ${
                      engagementTier === 'pilot'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Rapid Pilot / MVP
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngagementTier('enterprise')}
                    className={`px-3 py-1.5 text-xs font-mono-tech font-bold rounded transition-colors cursor-pointer ${
                      engagementTier === 'enterprise'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Enterprise Suite
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngagementTier('corp')}
                    className={`px-3 py-1.5 text-xs font-mono-tech font-bold rounded transition-colors cursor-pointer ${
                      engagementTier === 'corp'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Corp Platform
                  </button>
                </div>
              </div>

              {/* Dynamic Tier Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-tech pt-3 border-t border-neutral-800">
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase mb-0.5">Target Timeline</span>
                  <span className="text-emerald-400 font-bold">{currentTier.timeline}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase mb-0.5">Dedicated Pod</span>
                  <span className="text-white font-bold truncate block">{currentTier.team}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase mb-0.5">Engagement Model</span>
                  <span className="text-neutral-300 truncate block">{currentTier.investmentModel}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase mb-0.5">Code Ownership</span>
                  <span className="text-white font-bold">100% Client Owned</span>
                </div>
              </div>
            </div>

            {/* 4 Client Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono-tech text-neutral-300">
              <div className="flex items-center gap-2 p-2 bg-[#0A0A0A] border border-neutral-800 rounded">
                <Lock size={13} className="text-[#E50914]" />
                <span>100% IP Code Ownership</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#0A0A0A] border border-neutral-800 rounded">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>90-Day Post-Launch SLA</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#0A0A0A] border border-neutral-800 rounded">
                <Clock size={13} className="text-amber-400" />
                <span>On-Time Milestone Cutover</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#0A0A0A] border border-neutral-800 rounded">
                <Users size={13} className="text-sky-400" />
                <span>Senior Engineers (CHN/BLR)</span>
              </div>
            </div>

            {/* Final Conversion CTAs */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRequestBlueprint()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono-tech font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#c40811] transition-colors rounded cursor-pointer shadow-lg"
                >
                  <span>Request Free Architecture Blueprint</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => handleCallConsultant(COMPANY_INFO.phoneChennaiRaw)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono-tech font-bold uppercase tracking-wider text-neutral-200 bg-[#1A1A1A] hover:bg-neutral-800 border border-neutral-700 transition-colors rounded cursor-pointer"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>Chennai: {COMPANY_INFO.phoneChennai}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCallConsultant(COMPANY_INFO.phoneBangaloreRaw)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono-tech font-bold uppercase tracking-wider text-neutral-200 bg-[#1A1A1A] hover:bg-neutral-800 border border-neutral-700 transition-colors rounded cursor-pointer"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>Bangalore: {COMPANY_INFO.phoneBangalore}</span>
                </button>
              </div>

              <span className="text-xs font-mono-tech text-neutral-500">
                48-HOUR SCOPE TURNAROUND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
