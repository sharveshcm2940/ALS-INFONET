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
  Database, 
  Server, 
  Cpu, 
  Workflow, 
  Globe, 
  Smartphone, 
  RefreshCw, 
  Radio, 
  Check, 
  Boxes, 
  Code2, 
  GitBranch, 
  ShieldAlert,
  Binary,
  Cloud,
  Terminal,
  Activity,
  Filter
} from 'lucide-react';
import { AlsLogo } from './AlsLogo';
import { COMPANY_INFO } from '../data/companyData';

type EngagementTier = 'pilot' | 'enterprise' | 'corp';
type ArchitectureLayer = 'presentation' | 'gateway' | 'services' | 'data';
type TechCategoryFilter = 'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'mobile';

interface TechItem {
  id: string;
  name: string;
  category: 'Frontend & UI' | 'Backend & APIs' | 'Databases & Storage' | 'DevOps & Cloud' | 'Mobile & Offline';
  categoryKey: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile';
  role: string;
  metric: string;
  iconName: 'code' | 'database' | 'server' | 'cloud' | 'mobile' | 'zap' | 'globe' | 'shield' | 'terminal';
  accentColor: string;
  borderAccent: string;
}

// Master Technology Catalog with concrete architectural roles and performance specs
const TECH_CATALOG: Record<string, TechItem> = {
  'React': {
    id: 'react',
    name: 'React 18+',
    category: 'Frontend & UI',
    categoryKey: 'frontend',
    role: 'Declarative Reactive UI with Component Isolation',
    metric: 'Zero-Jank Virtual DOM',
    iconName: 'code',
    accentColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60',
    borderAccent: 'group-hover:border-cyan-500/60'
  },
  'TypeScript': {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend & UI',
    categoryKey: 'frontend',
    role: 'End-to-End Strict Type Contracts & API Schema Safety',
    metric: '100% Zero-Type Drift',
    iconName: 'terminal',
    accentColor: 'text-blue-400 bg-blue-950/40 border-blue-800/60',
    borderAccent: 'group-hover:border-blue-500/60'
  },
  'Next.js': {
    id: 'nextjs',
    name: 'Next.js (App Router)',
    category: 'Frontend & UI',
    categoryKey: 'frontend',
    role: 'Server-Side Rendering & Edge Client Web Portals',
    metric: '< 80ms Edge TTFB',
    iconName: 'globe',
    accentColor: 'text-slate-200 bg-slate-900/60 border-slate-700/60',
    borderAccent: 'group-hover:border-slate-400/60'
  },
  'Tailwind CSS': {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend & UI',
    categoryKey: 'frontend',
    role: 'Zero-Runtime Utility Styles with Design Tokens',
    metric: '0KB Extra CSS Overhead',
    iconName: 'code',
    accentColor: 'text-teal-400 bg-teal-950/40 border-teal-800/60',
    borderAccent: 'group-hover:border-teal-500/60'
  },
  'Node.js': {
    id: 'nodejs',
    name: 'Node.js (LTS)',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Event-Driven Non-Blocking Microservices & Webhooks',
    metric: 'High Concurrency I/O',
    iconName: 'server',
    accentColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    borderAccent: 'group-hover:border-emerald-500/60'
  },
  'Python': {
    id: 'python',
    name: 'Python 3.11+',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Intelligent Document Parsing & OCR Pipeline Workers',
    metric: '99.4% Extraction Precision',
    iconName: 'terminal',
    accentColor: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
    borderAccent: 'group-hover:border-amber-500/60'
  },
  'FastAPI': {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'High-Performance Asynchronous Python REST Microservices',
    metric: 'Sub-15ms Route Execution',
    iconName: 'zap',
    accentColor: 'text-teal-400 bg-teal-950/40 border-teal-800/60',
    borderAccent: 'group-hover:border-teal-500/60'
  },
  'Go (Golang)': {
    id: 'golang',
    name: 'Go (Golang)',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Compiled Concurrent Streaming Daemons & Sockets',
    metric: '1,500+ ev/sec Throughput',
    iconName: 'zap',
    accentColor: 'text-sky-400 bg-sky-950/40 border-sky-800/60',
    borderAccent: 'group-hover:border-sky-500/60'
  },
  'PostgreSQL': {
    id: 'postgresql',
    name: 'PostgreSQL 16',
    category: 'Databases & Storage',
    categoryKey: 'database',
    role: 'ACID Relational Engine with Multi-Tenant Row-Level Security',
    metric: 'Sub-5ms Query Latency',
    iconName: 'database',
    accentColor: 'text-blue-400 bg-blue-950/40 border-blue-800/60',
    borderAccent: 'group-hover:border-blue-500/60'
  },
  'Redis': {
    id: 'redis',
    name: 'Redis',
    category: 'Databases & Storage',
    categoryKey: 'database',
    role: 'Sub-Millisecond In-Memory Caching & Session Store',
    metric: '< 1ms Response Time',
    iconName: 'zap',
    accentColor: 'text-red-400 bg-red-950/40 border-red-800/60',
    borderAccent: 'group-hover:border-red-500/60'
  },
  'Redis Pub/Sub': {
    id: 'redis-pubsub',
    name: 'Redis Pub/Sub',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Distributed Real-Time Message Bus & Event Distribution',
    metric: '10,000+ msgs/sec Fanout',
    iconName: 'zap',
    accentColor: 'text-red-400 bg-red-950/40 border-red-800/60',
    borderAccent: 'group-hover:border-red-500/60'
  },
  'TimescaleDB': {
    id: 'timescaledb',
    name: 'TimescaleDB',
    category: 'Databases & Storage',
    categoryKey: 'database',
    role: 'Hypertables for High-Frequency Fleet Sensor Telemetry',
    metric: 'Petabyte Time-Series Scale',
    iconName: 'database',
    accentColor: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
    borderAccent: 'group-hover:border-amber-500/60'
  },
  'SQLite': {
    id: 'sqlite',
    name: 'Encrypted SQLite',
    category: 'Databases & Storage',
    categoryKey: 'database',
    role: 'On-Device Zero-Network Database for Field Mobility',
    metric: '100% Offline Capability',
    iconName: 'database',
    accentColor: 'text-indigo-400 bg-indigo-950/40 border-indigo-800/60',
    borderAccent: 'group-hover:border-indigo-500/60'
  },
  'Docker': {
    id: 'docker',
    name: 'Docker Containers',
    category: 'DevOps & Cloud',
    categoryKey: 'devops',
    role: 'Isolated Reproducible Application Deployments',
    metric: 'Multi-Cloud Portability',
    iconName: 'cloud',
    accentColor: 'text-blue-400 bg-blue-950/40 border-blue-800/60',
    borderAccent: 'group-hover:border-blue-500/60'
  },
  'Cloudflare': {
    id: 'cloudflare',
    name: 'Cloudflare Edge CDN',
    category: 'DevOps & Cloud',
    categoryKey: 'devops',
    role: 'Global Anycast CDN, WAF, SSL & DDoS Mitigation',
    metric: 'Global < 30ms Edge Route',
    iconName: 'shield',
    accentColor: 'text-orange-400 bg-orange-950/40 border-orange-800/60',
    borderAccent: 'group-hover:border-orange-500/60'
  },
  'Edge CDN': {
    id: 'edge-cdn',
    name: 'Edge CDN Caching',
    category: 'DevOps & Cloud',
    categoryKey: 'devops',
    role: 'Distributed Geolocation Cache & Asset Optimization',
    metric: '99.99% Availability',
    iconName: 'globe',
    accentColor: 'text-teal-400 bg-teal-950/40 border-teal-800/60',
    borderAccent: 'group-hover:border-teal-500/60'
  },
  'Reverse Proxy': {
    id: 'reverse-proxy',
    name: 'Strangler Reverse Proxy',
    category: 'DevOps & Cloud',
    categoryKey: 'devops',
    role: 'Non-Invasive Traffic Splitting for Zero-Downtime Migration',
    metric: 'Zero Production Stoppage',
    iconName: 'server',
    accentColor: 'text-purple-400 bg-purple-950/40 border-purple-800/60',
    borderAccent: 'group-hover:border-purple-500/60'
  },
  'Celery / Redis': {
    id: 'celery',
    name: 'Celery + Redis Queue',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Asynchronous Task Queue & Automated Error Retries',
    metric: 'Non-Blocking Background Tasks',
    iconName: 'server',
    accentColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    borderAccent: 'group-hover:border-emerald-500/60'
  },
  'React Native': {
    id: 'react-native',
    name: 'React Native',
    category: 'Mobile & Offline',
    categoryKey: 'mobile',
    role: 'Cross-Platform iOS & Android Native Operational Apps',
    metric: '60 FPS Native Performance',
    iconName: 'mobile',
    accentColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60',
    borderAccent: 'group-hover:border-cyan-500/60'
  },
  'Flutter': {
    id: 'flutter',
    name: 'Flutter (Dart)',
    category: 'Mobile & Offline',
    categoryKey: 'mobile',
    role: 'High-Fidelity Canvas-Rendered Mobile User Experiences',
    metric: 'Unified iOS/Android App',
    iconName: 'mobile',
    accentColor: 'text-sky-400 bg-sky-950/40 border-sky-800/60',
    borderAccent: 'group-hover:border-sky-500/60'
  },
  'WebSockets': {
    id: 'websockets',
    name: 'WebSocket Pipelines',
    category: 'Backend & APIs',
    categoryKey: 'backend',
    role: 'Persistent Full-Duplex Live Telemetry Streaming',
    metric: '< 20ms Live Packet Ping',
    iconName: 'zap',
    accentColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
    borderAccent: 'group-hover:border-emerald-500/60'
  }
};

interface SolutionItem {
  id: string;
  number: string;
  label: string;
  iconName: 'erp' | 'automation' | 'web' | 'mobile' | 'modernization' | 'realtime';
  category: string;
  headline: string;
  description: string;
  idealFor: string;
  businessImpact: string;
  serviceInterest: string;
  coreDeliverables: string[];
  techStackKeys: string[];
  architectureLayers: {
    presentation: string[];
    gateway: string[];
    services: string[];
    data: string[];
  };
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
  techStackKeys: string[];
  solutionIndex: number;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'manufacturing-erp',
    number: '01',
    industryTag: 'INDUSTRIAL MANUFACTURING & SPARES',
    clientTitle: 'Multi-Plant Industrial Components Manufacturer',
    location: 'Chennai & Coimbatore Hubs',
    challenge: '4 disconnected manufacturing plants operated on siloed spreadsheets and weekly manual tally reconciliation, causing regular stock blind spots and ₹18L/yr in recurring per-user SaaS license fees.',
    deliveredSolution: 'Proprietary Multi-Branch ERP & Inventory Ledger with real-time inter-plant sync, automated double-entry accounting ledger, and role-based plant floor dashboards.',
    businessImpact: '84% reduction in order processing turnaround, zero inventory discrepancies across 4 facilities, and 100% elimination of recurring SaaS user license taxes.',
    technicalOutcome: 'PostgreSQL ACID ledger with row-level security, sub-60ms cross-plant query latency, automated nightly snapshot replication, deployed on dedicated private infrastructure.',
    metrics: [
      { label: 'Order Processing', value: '84% Faster' },
      { label: 'Inventory Drift', value: '0% Discrepancy' },
      { label: 'Software Licensing', value: '₹18L / Yr Saved' },
      { label: 'Query Latency', value: '< 60ms Average' }
    ],
    techStackKeys: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    solutionIndex: 0
  },
  {
    id: 'logistics-iot',
    number: '02',
    industryTag: 'COLD-CHAIN FLEET LOGISTICS',
    clientTitle: 'Inter-State Temperature-Controlled Logistics Fleet',
    location: 'Bangalore Hub (120+ Trucks)',
    challenge: 'Manual driver phone check-ins caused visibility gaps across remote state highways, with 15% missed temperature SLA windows risking expensive cargo spoilage.',
    deliveredSolution: 'Sub-Second WebSocket Telemetry Streaming Daemon & Driver Mobile App with offline encrypted GPS caching and automated deviation alerts.',
    businessImpact: '100% cargo SLA compliance maintained continuously for 14 straight months, zero perishable spoilage claims, and 90+ manual dispatcher hours saved every week.',
    technicalOutcome: 'Go (Golang) streaming daemon handling 1,500 telemetry events/sec, Redis Pub/Sub bus, on-device encrypted SQLite app with automated delta sync upon network restore.',
    metrics: [
      { label: 'SLA Compliance', value: '100% Maintained' },
      { label: 'Cargo Spoilage', value: '₹0 Claims (14 Mos)' },
      { label: 'Dispatcher Time', value: '90+ Hrs / Wk Saved' },
      { label: 'Stream Latency', value: '< 45ms Packets' }
    ],
    techStackKeys: ['Go (Golang)', 'Redis Pub/Sub', 'React Native', 'SQLite', 'TimescaleDB'],
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
      { label: 'Data Retention', value: 'SOC2 Ready' }
    ],
    techStackKeys: ['Python', 'FastAPI', 'Celery / Redis', 'React', 'PostgreSQL', 'Docker'],
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
    techStackKeys: ['TypeScript', 'Reverse Proxy', 'PostgreSQL', 'Next.js', 'Cloudflare'],
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
    techStackKeys: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS', 'Edge CDN'],
    solutionIndex: 2
  }
];

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'erp',
    number: '01',
    label: 'Custom ERP & Operations',
    iconName: 'erp',
    category: 'ENTERPRISE RESOURCE PLATFORMS',
    headline: 'Unified Operations, Multi-Branch Inventory & Accounting',
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
    techStackKeys: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    architectureLayers: {
      presentation: ['Responsive Web Dashboard (React/Tailwind)', 'Branch POS Terminal PWA', 'Executive Mobile Analytics'],
      gateway: ['NGINX Reverse Proxy', 'JWT & Session Token Auth', 'Rate Limiter & TLS 1.3 Encryption'],
      services: ['Multi-Branch Inventory Engine', 'Double-Entry Accounting Service', 'Automated GST Billing Engine', 'RBAC & Audit Logger'],
      data: ['PostgreSQL (ACID Compliant)', 'Redis In-Memory Cache', 'Automated Nightly Snapshot Storage']
    },
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
    iconName: 'automation',
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
    techStackKeys: ['Python', 'FastAPI', 'Celery / Redis', 'React', 'PostgreSQL', 'Docker'],
    architectureLayers: {
      presentation: ['Approval Queue Portal (React)', 'Exceptions Review HUD', 'Email / WhatsApp Action Webhooks'],
      gateway: ['API Gateway with OAuth2', 'Webhook Ingestion Handler', 'Input Sanitization & Antivirus'],
      services: ['Intelligent OCR Parser', 'Tax/GSTIN Verification Service', 'Celery Asynchronous Task Workers', 'Approval Routing Matrix'],
      data: ['PostgreSQL Document Records', 'Redis Queue Broker', 'Encrypted S3 Document Vault']
    },
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
    iconName: 'web',
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
    techStackKeys: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Cloudflare'],
    architectureLayers: {
      presentation: ['Next.js Server-Rendered UI', 'Client Account Console', 'Mobile-Optimized Portal'],
      gateway: ['Cloudflare Edge CDN', 'DDoS Protection & SSL/TLS', 'Next.js Middleware Auth Guard'],
      services: ['Account Management Service', 'Payment Gateway Integration', 'Customer Invoicing Engine', 'Notification Dispatcher'],
      data: ['PostgreSQL Multi-Tenant DB', 'Edge Cache Replication', 'Audit Trail Storage']
    },
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
    iconName: 'mobile',
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
    techStackKeys: ['React Native', 'Flutter', 'SQLite', 'TypeScript', 'Node.js', 'PostgreSQL'],
    architectureLayers: {
      presentation: ['iOS & Android Native Mobile Apps', 'Dispatcher Web Console', 'Supervisor Tablet View'],
      gateway: ['API Gateway with Mobile JWT', 'Delta Sync Ingest Point', 'Certificate Pinning Guard'],
      services: ['Delta Synchronization Engine', 'GPS Route Optimizer', 'Media & Document Compression', 'Push Notification Service'],
      data: ['On-Device Encrypted SQLite', 'PostgreSQL Central Database', 'Blob Storage for Signatures & Photos']
    },
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
    iconName: 'modernization',
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
    techStackKeys: ['PostgreSQL', 'Docker', 'TypeScript', 'Reverse Proxy', 'Go (Golang)', 'Python'],
    architectureLayers: {
      presentation: ['Modern Responsive Web Portal', 'Unified Admin Dashboard', 'Legacy Facade Fallback'],
      gateway: ['Smart Reverse Proxy (Strangler Pattern)', 'Traffic Splitter & Canary Router', 'Dual Authorization Layer'],
      services: ['Modern Microservices (Go/Node)', 'Dual-Write Sync Engine', 'Data Transformation Pipeline', 'Health & Consistency Verifier'],
      data: ['Modern Cloud PostgreSQL', 'Legacy Database (Read Replica)', 'Shadow Verification Log']
    },
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
    iconName: 'realtime',
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
    techStackKeys: ['Go (Golang)', 'Redis Pub/Sub', 'TimescaleDB', 'React', 'WebSockets', 'Docker'],
    architectureLayers: {
      presentation: ['Live Operations Control HUD (React)', 'Driver / Field Agent PWA', 'Fleet Map Display'],
      gateway: ['High-Concurrency WebSocket Gateway', 'MQTT Message Broker', 'TLS & Device Token Auth'],
      services: ['Go Ingestion Streaming Daemon', 'Redis Pub/Sub Event Distributor', 'Alert & Anomaly Detection Engine', 'Push Notification Dispatcher'],
      data: ['TimescaleDB Time-Series Engine', 'Redis In-Memory State Store', 'Historical Telemetry Archive']
    },
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
  const [activeLayer, setActiveLayer] = useState<ArchitectureLayer>('presentation');
  const [engagementTier, setEngagementTier] = useState<EngagementTier>('enterprise');
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);
  const [blueprintRequestedNotice, setBlueprintRequestedNotice] = useState<string | null>(null);

  // Technologies Tile State
  const [techViewMode, setTechViewMode] = useState<'blueprint' | 'all'>('blueprint');
  const [techCategoryFilter, setTechCategoryFilter] = useState<TechCategoryFilter>('all');
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

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
    }, 7000);

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

    setBlueprintRequestedNotice(`Architecture Blueprint prepared for ${solutionItem.label}! Directing you to inquiry form...`);

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

  const renderIcon = (iconName: SolutionItem['iconName'], className = 'w-4 h-4') => {
    switch (iconName) {
      case 'erp':
        return <Boxes className={className} />;
      case 'automation':
        return <Workflow className={className} />;
      case 'web':
        return <Globe className={className} />;
      case 'mobile':
        return <Smartphone className={className} />;
      case 'modernization':
        return <RefreshCw className={className} />;
      case 'realtime':
        return <Radio className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  const renderTechIcon = (iconName: TechItem['iconName'], className = 'w-4 h-4') => {
    switch (iconName) {
      case 'database':
        return <Database className={className} />;
      case 'server':
        return <Server className={className} />;
      case 'cloud':
        return <Cloud className={className} />;
      case 'mobile':
        return <Smartphone className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'globe':
        return <Globe className={className} />;
      case 'shield':
        return <ShieldCheck className={className} />;
      case 'terminal':
        return <Terminal className={className} />;
      default:
        return <Code2 className={className} />;
    }
  };

  // Get active list of tech items based on view mode and filter
  const getDisplayedTechItems = (): TechItem[] => {
    let items: TechItem[] = [];

    if (techViewMode === 'blueprint') {
      items = currentSolution.techStackKeys
        .map((k) => TECH_CATALOG[k])
        .filter(Boolean);
    } else {
      items = Object.values(TECH_CATALOG);
    }

    if (techCategoryFilter !== 'all') {
      items = items.filter((item) => item.categoryKey === techCategoryFilter);
    }

    return items;
  };

  const displayedTechTiles = getDisplayedTechItems();

  return (
    <section 
      id="console"
      className="relative bg-[#0E1015] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-800 selection:bg-red-900 selection:text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* ======================================================== */}
        {/* EXECUTIVE HEADER: Zoho / Enterprise Software Standard     */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-800/90 mb-12">
          <div className="max-w-3xl">
            {/* Enterprise Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 mb-4 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span className="font-mono-tech tracking-wider uppercase text-[11px] text-slate-200">
                ARCHITECTURE WORKBENCH // ENTERPRISE SUITE
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
              Enterprise Software Architecture, Built For Business Scale.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              Explore production-tested software blueprints, system topology diagrams, and quantifiable client outcomes engineered by our engineering centers in Chennai and Bangalore.
            </p>
          </div>

          {/* Zoho-Grade Trust Bar */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 rounded-xl p-4 lg:min-w-[280px]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>100% Client-Owned Source Code</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>Zero Per-User Licensing Taxes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span>90-Day Post-Launch SLA Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#E50914] shrink-0" />
              <span>Direct Chennai &amp; Bangalore Pods</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODULE 1: ZOHO-STYLE ENTERPRISE CLIENT SUCCESS STORIES    */}
        {/* ======================================================== */}
        <div 
          className="mb-14 bg-gradient-to-b from-[#141721] to-[#10121A] border border-slate-800 rounded-2xl p-6 sm:p-9 shadow-2xl transition-all"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          {/* Top Bar of Success Story */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-red-950/40 border border-red-800/40 rounded-xl text-[#E50914]">
                <Award size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 font-semibold">
                    CLIENT CASE STUDY {currentStory.number} OF 0{SUCCESS_STORIES.length}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-400">
                    VERIFIED PRODUCTION DEPLOYMENT
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  {currentStory.clientTitle}
                </h3>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-1.5 mr-2">
                {SUCCESS_STORIES.map((st, sIndex) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStoryIndex(sIndex)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      storyIndex === sIndex
                        ? 'w-7 bg-[#E50914]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to case study ${sIndex + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handlePrevStory}
                className="p-2 bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:text-white text-slate-300 rounded-lg transition-colors cursor-pointer"
                title="Previous Case Study"
                aria-label="Previous Case Study"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                onClick={handleNextStory}
                className="p-2 bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:text-white text-slate-300 rounded-lg transition-colors cursor-pointer"
                title="Next Case Study"
                aria-label="Next Case Study"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* Quantifiable ROI Metric Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {currentStory.metrics.map((m, mIdx) => (
              <div 
                key={mIdx}
                className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between"
              >
                <span className="text-xs font-sans text-slate-400 mb-1 block">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl font-display font-extrabold text-emerald-400 tracking-tight">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Side-by-Side: Business Challenge vs Solution Delivered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <ShieldAlert size={14} className="text-amber-400" />
                <span>The Business Bottleneck</span>
              </div>
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                {currentStory.challenge}
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                <CheckCircle2 size={14} className="text-[#E50914]" />
                <span>Engineered Solution Delivered</span>
              </div>
              <p className="text-sm font-sans text-slate-200 leading-relaxed">
                {currentStory.deliveredSolution}
              </p>
            </div>
          </div>

          {/* Technical Architecture Outcome & Stack TILES */}
          <div className="p-5 bg-slate-900/90 border border-slate-800/90 rounded-xl mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                <Server size={14} />
                <span>Production Architecture Outcome</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-400">
                {currentStory.location}
              </span>
            </div>
            <p className="text-sm font-mono-tech text-slate-300 leading-relaxed mb-4">
              {currentStory.technicalOutcome}
            </p>

            {/* Deployed Tech Tiles in Story */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-semibold font-mono-tech block mb-2.5">
                VERIFIED PRODUCTION TECH TILES:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {currentStory.techStackKeys.map((techKey, tIdx) => {
                  const techInfo = TECH_CATALOG[techKey];
                  if (!techInfo) return null;

                  return (
                    <div 
                      key={tIdx}
                      className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-2.5"
                    >
                      <span className={`p-1.5 rounded-md border text-xs ${techInfo.accentColor}`}>
                        {renderTechIcon(techInfo.iconName, 'w-3.5 h-3.5')}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold font-sans text-white truncate">
                          {techInfo.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono-tech truncate">
                          {techInfo.metric}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleScopeFromStory(currentStory)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#E50914] hover:bg-[#c40811] transition-all rounded-xl cursor-pointer shadow-lg hover:shadow-red-900/30"
            >
              <span>Scope Similar Architecture For Your Company</span>
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-sans">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero-risk initial consultation &amp; 48-hour blueprint</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODULE 2: INTERACTIVE ENTERPRISE SOLUTION BLUEPRINTS      */}
        {/* ======================================================== */}
        <div className="bg-[#12141C] border border-slate-800 rounded-2xl p-6 sm:p-9 shadow-2xl">
          {/* Header of Blueprints */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#E50914] font-bold block mb-1">
                SYSTEM ARCHITECTURE MATRIX // 6 ENTERPRISE DOMAINS
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Select An Enterprise Architecture Specification
              </h3>
            </div>

            {blueprintRequestedNotice && (
              <div className="p-3 bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 text-xs font-medium flex items-center gap-2 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{blueprintRequestedNotice}</span>
              </div>
            )}
          </div>

          {/* Zoho-Style Enterprise Product Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
            {SOLUTIONS.map((sol, sIndex) => {
              const isSelected = selectedSolutionIndex === sIndex;

              return (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => handleSelectSolution(sIndex)}
                  className={`p-3.5 text-left rounded-xl transition-all cursor-pointer border flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 border-red-500 text-white shadow-lg ring-1 ring-red-500/30'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#E50914] text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {renderIcon(sol.iconName, 'w-4 h-4')}
                    </span>
                    <span className="text-[11px] font-mono-tech text-slate-400">
                      {sol.number}
                    </span>
                  </div>
                  <div className="font-sans font-bold text-xs sm:text-sm tracking-tight leading-snug">
                    {sol.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Architecture Overview */}
          <div className="space-y-8">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono-tech text-red-400 font-bold uppercase tracking-wider">
                  {currentSolution.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-sans">
                  Production Blueprint #{currentSolution.number}
                </span>
              </div>
              <h4 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {currentSolution.headline}
              </h4>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-4xl">
                {currentSolution.description}
              </p>

              {/* Target Profile & Business ROI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    <Building2 size={15} className="text-[#E50914]" />
                    <span>Ideal Business Profile</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                    {currentSolution.idealFor}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase mb-1.5">
                    <Zap size={15} />
                    <span>Quantifiable Business Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-emerald-300 font-medium leading-relaxed">
                    {currentSolution.businessImpact}
                  </p>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* ZOHO-GRADE SYSTEM ARCHITECTURE TOPOLOGY DIAGRAM EXPLORER  */}
            {/* ======================================================== */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    <GitBranch size={15} className="text-sky-400" />
                    <span>Interactive System Topology (Multi-Tier Architecture)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Click any architectural tier to inspect component specifications.
                  </p>
                </div>

                {/* Layer Selector Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveLayer('presentation')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeLayer === 'presentation'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1. Presentation
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('gateway')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeLayer === 'gateway'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    2. Gateway &amp; Auth
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('services')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeLayer === 'services'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3. Microservices
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('data')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      activeLayer === 'data'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    4. Data Persistence
                  </button>
                </div>
              </div>

              {/* Visual Multi-Tier Flow Card */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Tier 1: Presentation */}
                <div 
                  onClick={() => setActiveLayer('presentation')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeLayer === 'presentation'
                      ? 'bg-red-950/30 border-red-500/80 ring-1 ring-red-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400">
                      TIER 1
                    </span>
                    <Globe size={14} className={activeLayer === 'presentation' ? 'text-[#E50914]' : 'text-slate-500'} />
                  </div>
                  <h5 className="font-semibold text-xs text-white uppercase tracking-wider mb-2">
                    Client Presentation
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSolution.architectureLayers.presentation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tier 2: Gateway */}
                <div 
                  onClick={() => setActiveLayer('gateway')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeLayer === 'gateway'
                      ? 'bg-red-950/30 border-red-500/80 ring-1 ring-red-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400">
                      TIER 2
                    </span>
                    <ShieldCheck size={14} className={activeLayer === 'gateway' ? 'text-[#E50914]' : 'text-slate-500'} />
                  </div>
                  <h5 className="font-semibold text-xs text-white uppercase tracking-wider mb-2">
                    Gateway &amp; Security
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSolution.architectureLayers.gateway.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tier 3: Core Services */}
                <div 
                  onClick={() => setActiveLayer('services')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeLayer === 'services'
                      ? 'bg-red-950/30 border-red-500/80 ring-1 ring-red-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400">
                      TIER 3
                    </span>
                    <Cpu size={14} className={activeLayer === 'services' ? 'text-[#E50914]' : 'text-slate-500'} />
                  </div>
                  <h5 className="font-semibold text-xs text-white uppercase tracking-wider mb-2">
                    Microservices &amp; Logic
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSolution.architectureLayers.services.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tier 4: Data Layer */}
                <div 
                  onClick={() => setActiveLayer('data')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeLayer === 'data'
                      ? 'bg-red-950/30 border-red-500/80 ring-1 ring-red-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase font-bold text-slate-400">
                      TIER 4
                    </span>
                    <Database size={14} className={activeLayer === 'data' ? 'text-[#E50914]' : 'text-slate-500'} />
                  </div>
                  <h5 className="font-semibold text-xs text-white uppercase tracking-wider mb-2">
                    Data Persistence
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentSolution.architectureLayers.data.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* MODULE 3: PRODUCTION TECHNOLOGY TILES MATRIX              */}
            {/* ======================================================== */}
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-red-950/50 text-[#E50914] border border-red-900/40">
                      <Binary size={14} />
                    </span>
                    <h5 className="text-base font-bold font-sans text-white">
                      Production Technology Stack (Modular Architecture Tiles)
                    </h5>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Every production deployment is built with modular, enterprise-grade open-source components with zero proprietary lock-in.
                  </p>
                </div>

                {/* View Mode & Filter Toggles */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Mode switcher: Blueprint vs All */}
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono-tech">
                    <button
                      type="button"
                      onClick={() => setTechViewMode('blueprint')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        techViewMode === 'blueprint'
                          ? 'bg-[#E50914] text-white font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {currentSolution.label} Stack ({currentSolution.techStackKeys.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTechViewMode('all')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        techViewMode === 'all'
                          ? 'bg-[#E50914] text-white font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All Technologies (21)
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter Pills (When exploring all or refining) */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5 text-xs font-mono-tech">
                <span className="text-slate-400 flex items-center gap-1 mr-1 text-[11px]">
                  <Filter size={12} />
                  FILTER BY:
                </span>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'all'
                      ? 'bg-slate-200 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Categories
                </button>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('frontend')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'frontend'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Frontend &amp; UI
                </button>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('backend')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'backend'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Backend &amp; APIs
                </button>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('database')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'database'
                      ? 'bg-blue-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Databases &amp; Storage
                </button>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('devops')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'devops'
                      ? 'bg-orange-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  DevOps &amp; Cloud
                </button>
                <button
                  type="button"
                  onClick={() => setTechCategoryFilter('mobile')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    techCategoryFilter === 'mobile'
                      ? 'bg-indigo-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Mobile &amp; Offline
                </button>
              </div>

              {/* The Technology Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {displayedTechTiles.map((tech) => {
                  const isHovered = hoveredTechId === tech.id;

                  return (
                    <div
                      key={tech.id}
                      onMouseEnter={() => setHoveredTechId(tech.id)}
                      onMouseLeave={() => setHoveredTechId(null)}
                      className={`group relative p-4 rounded-xl bg-slate-950/80 border transition-all duration-200 flex flex-col justify-between gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                        isHovered 
                          ? 'border-red-500/80 bg-slate-900/90 ring-1 ring-red-500/20' 
                          : 'border-slate-800/90 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Row: Category Badge + Icon */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono-tech tracking-wider uppercase font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {tech.category}
                        </span>
                        <span className={`p-2 rounded-lg border transition-transform duration-200 group-hover:scale-110 ${tech.accentColor}`}>
                          {renderTechIcon(tech.iconName, 'w-4 h-4')}
                        </span>
                      </div>

                      {/* Middle: Title & Role */}
                      <div>
                        <h6 className="font-sans font-bold text-sm text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                          <span>{tech.name}</span>
                          <span className="text-emerald-400 text-xs">✓</span>
                        </h6>
                        <p className="mt-1 text-xs text-slate-300 font-sans leading-relaxed">
                          {tech.role}
                        </p>
                      </div>

                      {/* Bottom Row: Spec Metric */}
                      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-tech">
                        <span className="text-slate-400">Spec:</span>
                        <span className="text-emerald-400 font-medium truncate">
                          {tech.metric}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stack Architecture Guarantee Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                  <span>Production-Grade Architecture: Zero proprietary vendor lock-in with 100% full source code ownership.</span>
                </div>
                <div className="font-mono-tech text-slate-400 text-[11px]">
                  DEPLOYED ON DEDICATED VPS / AWS / GCP CLOUD
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <span className="block text-xs font-mono-tech uppercase font-bold text-slate-300 mb-4">
                Guaranteed Deliverables Included in this Solution
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSolution.coreDeliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <div className="p-1 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 shrink-0 mt-0.5">
                      <Check size={13} />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200 font-sans">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Stage Delivery Roadmap */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-semibold text-slate-200 uppercase tracking-wider">
                  Milestone Delivery Roadmap
                </span>
                <span className="font-mono-tech text-slate-400">
                  STAGE 0{activeRoadmapStep + 1} OF 04
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                {currentSolution.roadmap.map((step, sIdx) => {
                  const isActive = activeRoadmapStep === sIdx;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setActiveRoadmapStep(sIdx)}
                      className={`p-3.5 text-left rounded-xl transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#E50914] text-white border-[#E50914] shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[11px] font-mono-tech opacity-80 mb-0.5">
                        {step.week}
                      </div>
                      <div className="text-xs font-bold font-sans truncate">
                        {step.phase}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3 text-xs sm:text-sm">
                <CheckCircle2 size={16} className="text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">Phase Output: </span>
                  <span className="text-slate-300">{currentSolution.roadmap[activeRoadmapStep].deliverable}</span>
                </div>
              </div>
            </div>

            {/* Scale Selector & Pod Matrix */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h5 className="font-sans font-bold text-base text-white">
                    Engagement Tier &amp; Engineering Squad
                  </h5>
                  <p className="text-xs text-slate-400">
                    Select your organizational scale to inspect dedicated pod composition and timelines.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setEngagementTier('pilot')}
                    className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      engagementTier === 'pilot'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Rapid Pilot / MVP
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngagementTier('enterprise')}
                    className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      engagementTier === 'enterprise'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Enterprise Suite
                  </button>
                  <button
                    type="button"
                    onClick={() => setEngagementTier('corp')}
                    className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                      engagementTier === 'corp'
                        ? 'bg-[#E50914] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Corp Platform
                  </button>
                </div>
              </div>

              {/* 4 Pod Specs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono-tech mb-1">Timeline Window</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono-tech">{currentTier.timeline}</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono-tech mb-1">Dedicated Pod</span>
                  <span className="text-sm font-bold text-white truncate block font-sans">{currentTier.team}</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono-tech mb-1">Model</span>
                  <span className="text-sm font-medium text-slate-200 truncate block font-sans">{currentTier.investmentModel}</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono-tech mb-1">Source Code IP</span>
                  <span className="text-sm font-bold text-white font-sans">100% Client Owned</span>
                </div>
              </div>
            </div>

            {/* Enterprise Action Bar & Hotlines */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRequestBlueprint()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#c40811] transition-all rounded-xl cursor-pointer shadow-lg hover:shadow-red-900/30"
                >
                  <span>Request Free 48-Hour Architecture Blueprint</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => handleCallConsultant(COMPANY_INFO.phoneChennaiRaw)}
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors rounded-xl cursor-pointer"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>Chennai: {COMPANY_INFO.phoneChennai}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCallConsultant(COMPANY_INFO.phoneBangaloreRaw)}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-3.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors rounded-xl cursor-pointer"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>Bangalore: {COMPANY_INFO.phoneBangalore}</span>
                </button>
              </div>

              <div className="text-xs font-mono-tech text-slate-400">
                NO SALES PRESSURE // SENIOR ARCHITECTS ONLY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
