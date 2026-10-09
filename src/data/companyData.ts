import { ProjectItem, ServiceItem, InsightArticle, ApproachPhase, TechCategory, OfficeLocation } from '../types';

export const COMPANY_INFO = {
  name: 'ALS Infonet',
  tagline: "Engineering what's next.",
  headline: 'Engineering ideas into digital reality.',
  description: 'ALS Infonet builds intelligent software, scalable digital platforms, and AI-powered solutions for businesses ready to move forward.',
  estYear: 'EST. FOR WHAT\'S NEXT',
  email: 'contact@alsinfonet.com',
  careersEmail: 'careers@alsinfonet.com',
  hub: 'Chennai · Bangalore, India',
  phoneChennai: '+91 98940 51733',
  phoneBangalore: '+91 80738 88324',
  phoneChennaiRaw: '+919894051733',
  phoneBangaloreRaw: '+918073888324',
};

export const COUNTER_PHRASES = [
  'ALS INFONET',
  'SOFTWARE',
  'AI SOLUTIONS',
  'INNOVATION',
  'DIGITAL FUTURE'
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'business-management-systems',
    number: '01',
    title: 'Business Management Systems',
    category: 'Enterprise Platform',
    industry: 'Operations, Logistics & Services',
    tagline: 'Centralized platforms that help businesses manage records, workflows, reporting, and everyday operations.',
    businessChallenge: 'Growing organizations frequently encounter data fragmentation across spreadsheets, disconnected off-the-shelf software, and delayed cross-department reporting.',
    solutionOverview: 'A unified management system consolidating operational records, inventory, staff assignments, and automated management reporting into a single reliable platform.',
    keyFunctionality: [
      'Centralized operational records and document tracking',
      'Granular role-based staff access and permission levels',
      'Automated daily and weekly executive reporting',
      'Audit logging and compliance traceability'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    id: 'custom-web-applications',
    number: '02',
    title: 'Custom Web Applications',
    category: 'Web Platforms',
    industry: 'B2B Services & Regulated Workflows',
    tagline: 'Purpose-built web applications designed for specific business requirements, user roles, and operational processes.',
    businessChallenge: 'Standard software products rarely accommodate proprietary approval hierarchies, strict client privacy requirements, and multi-tiered customer portals.',
    solutionOverview: 'A purpose-built web platform providing distinct interfaces for customers, operations teams, and administrators, with validated workflows and real-time record updates.',
    keyFunctionality: [
      'Self-service customer portal with authenticated account access',
      'Multi-step workflow approval and review pipelines',
      'Secure document upload and automated data validation',
      'Integration with existing database infrastructures'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'REST APIs', 'PostgreSQL']
  },
  {
    id: 'intelligent-workflow-automation',
    number: '03',
    title: 'Intelligent Workflow Automation',
    category: 'Automation & AI',
    industry: 'Supply Chain, Administration & Finance',
    tagline: 'Software solutions that connect systems, reduce repetitive work, and improve the flow of information across teams.',
    businessChallenge: 'Teams lose dozens of hours every week manually transcribing invoices, reconciling multi-vendor orders, and resolving communication bottlenecks across separated tools.',
    solutionOverview: 'An automated processing pipeline connecting email channels, document data extraction, validation business rules, and direct ERP synchronization.',
    keyFunctionality: [
      'Automated invoice and document information extraction',
      'Business rule validation and anomaly flagging',
      'Direct synchronization with accounting and ERP systems',
      'Human-in-the-loop exception routing queue'
    ],
    techStack: ['Python', 'FastAPI', 'Gemini Models', 'Redis', 'PostgreSQL']
  },
  {
    id: 'digital-product-development',
    number: '04',
    title: 'Digital Product Development',
    category: 'Product Engineering',
    industry: 'Commercial Platforms & New Ventures',
    tagline: 'Web and mobile products developed from initial requirements through testing, deployment, and ongoing improvements.',
    businessChallenge: 'Translating early product requirements into a production-ready software application that is architecturally sound and scalable for expanding user adoption.',
    solutionOverview: 'End-to-end product engineering covering technical scoping, responsive frontend development, secure API architectures, and cloud deployment pipelines.',
    keyFunctionality: [
      'Scalable multi-tenant backend architecture',
      'Responsive web and companion mobile experiences',
      'User authentication, onboarding, and subscription workflows',
      'Continuous deployment pipeline with error monitoring'
    ],
    techStack: ['React', 'React Native', 'Node.js', 'TypeScript', 'Cloud Infrastructure']
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software Development',
    description: "Off-the-shelf tools don't always match the way a business operates. We develop tailored software for internal operations, administration, reporting, and industry-specific requirements.",
    typicalSolutions: [
      'Business management applications',
      'Administrative dashboards',
      'Internal workflow systems',
      'Custom operational platforms'
    ],
    businessValue: 'Eliminate manual workarounds, unify team workflows, and maintain proprietary ownership of core operational systems.',
    techStack: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker']
  },
  {
    id: 'web-apps',
    number: '02',
    title: 'Web Application Development',
    description: 'We build responsive, secure, and maintainable web applications for businesses that need more than a standard website.',
    typicalSolutions: [
      'Business portals',
      'Customer-facing applications',
      'Booking and management platforms',
      'Web-based operational systems'
    ],
    businessValue: 'Deliver reliable web tools that clients and internal teams can access securely from any browser with sub-second performance.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI Integration & Automation',
    description: 'We help businesses apply AI where it serves a practical purpose, from automating repetitive processes to improving how information is accessed and managed.',
    typicalSolutions: [
      'AI-enabled business applications',
      'Intelligent document processing',
      'Workflow automation',
      'AI integrations with existing software'
    ],
    businessValue: 'Free valuable employee time from repetitive data entry while improving processing speed, accuracy, and operational throughput.',
    techStack: ['Python', 'FastAPI', 'Gemini Models', 'Vector Search']
  },
  {
    id: 'mobile-apps',
    number: '04',
    title: 'Mobile Application Development',
    description: 'We develop mobile applications designed around how customers, employees, and business teams use them.',
    typicalSolutions: [
      'Customer applications',
      'Employee applications',
      'Service management apps',
      'Business companion applications'
    ],
    businessValue: 'Enable remote field teams and mobile customers to access business data reliably with intuitive touch interfaces.',
    techStack: ['React Native', 'Flutter', 'TypeScript', 'REST APIs']
  },
  {
    id: 'modernization',
    number: '05',
    title: 'Software Modernization & Integration',
    description: 'Existing software should support business operations, not slow them down. We help improve applications, connect systems, and simplify fragmented workflows.',
    typicalSolutions: [
      'Application upgrades',
      'API integrations',
      'Database improvements',
      'Legacy workflow modernization'
    ],
    businessValue: 'Protect existing software investments by modernizing technical debt, improving responsiveness, and connecting disparate tools.',
    techStack: ['REST APIs', 'Database Optimization', 'Cloud Migration']
  },
  {
    id: 'product-development',
    number: '06',
    title: 'Product Development',
    description: 'We work with founders and businesses to plan, develop, test, and launch digital products, with a focus on building the right functionality at each stage.',
    typicalSolutions: [
      'MVP development',
      'SaaS applications',
      'Product prototypes',
      'Production-ready applications'
    ],
    businessValue: 'Accelerate the path from concept to a production-grade software product with clean architecture designed for future expansion.',
    techStack: ['Full-Stack Architecture', 'CI/CD Pipelines', 'Cloud Hosting']
  }
];

export const ABOUT_DATA = {
  sectionLabel: 'ABOUT ALS INFONET',
  headline: 'Good software starts with understanding the problem.',
  mainDescription: 'ALS Infonet is a software development company operating in Chennai and Bangalore. We work with businesses to design, develop, and implement digital solutions that address practical operational and technical requirements.',
  subDescription: 'Our work covers custom software, web and mobile applications, AI integrations, and business automation. We focus on understanding what a client needs, choosing an appropriate technical approach, and developing software that remains useful beyond its initial launch.',
  secondaryHeading: 'Built around your requirements.',
  secondaryDescription: 'No two businesses work exactly the same way. We believe software should reflect the processes, people, and objectives it is designed to support.',
  principles: [
    {
      number: '01',
      title: 'Understand First',
      description: 'We begin by understanding the problem, the people using the software, and the outcome the business expects.'
    },
    {
      number: '02',
      title: 'Build with Clarity',
      description: 'We prioritize clear requirements, maintainable architecture, and straightforward communication throughout development.'
    },
    {
      number: '03',
      title: 'Focus on Usability',
      description: 'Software should make work easier. We pay attention to how applications function in everyday use.'
    },
    {
      number: '04',
      title: 'Think Beyond Launch',
      description: 'We consider how software can be maintained, improved, and adapted as business requirements change.'
    }
  ],
  locations: [
    {
      city: 'CHENNAI',
      region: 'Tamil Nadu, India',
      focus: 'Delivery & Engineering Hub'
    },
    {
      city: 'BANGALORE',
      region: 'Karnataka, India',
      focus: 'Technology & AI Solutions Hub'
    }
  ]
};

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'custom-software-need',
    number: '01',
    title: 'When Does a Business Need Custom Software?',
    category: 'Software Development',
    description: 'Understanding when existing tools are enough, when they become limiting, and what to consider before investing in a custom application.',
    perspectiveSummary: 'Pre-packaged SaaS is ideal for standard business functions like bookkeeping or basic email. However, when teams spend multiple hours each day manually bridging disparate tools, when licensing costs escalate with headcount, or when core competitive differentiators cannot be modeled in off-the-shelf tools, tailored software delivers a high return on investment.',
    keyConsiderations: [
      'Evaluating recurring subscription costs against one-time custom software asset ownership',
      'Assessing employee hours lost to manual workarounds and duplicated data entry',
      'Determining whether unique proprietary business logic creates competitive advantage'
    ]
  },
  {
    id: 'ai-automation-sense',
    number: '02',
    title: 'Where AI Automation Makes Business Sense',
    category: 'Artificial Intelligence',
    description: 'A practical look at identifying repetitive workflows, evaluating automation opportunities, and deciding where AI can provide value.',
    perspectiveSummary: 'Artificial intelligence provides the highest tangible value in operational business workflows when applied to unstructured data tasks: parsing diverse vendor invoices, routing customer inquiries, and contextual information retrieval. Rather than speculative novelty, practical AI implementation requires deterministic schemas and human-in-the-loop validation for edge cases.',
    keyConsiderations: [
      'Focusing on high-volume, repetitive text and document processing bottlenecks',
      'Designing strict confidence thresholds and automated fallback to human review',
      'Measuring operational cost reductions and response time velocity directly'
    ]
  },
  {
    id: 'mvp-without-overcomplicating',
    number: '03',
    title: 'Building an MVP Without Overcomplicating It',
    category: 'Product Engineering',
    description: 'How to prioritize features, validate requirements, and approach the first version of a digital product.',
    perspectiveSummary: 'The primary risk in new product development is over-engineering features before real users have validated the primary value proposition. A disciplined MVP isolates the core operational loop, applies clean architectural boundaries that can scale later, and gathers immediate feedback with minimal development cycle overhead.',
    keyConsiderations: [
      'Isolating the single most critical problem the software solves for its initial users',
      'Avoiding speculative microservice complexity before user load justifies it',
      'Establishing clear measurement criteria to evaluate product-market validation'
    ]
  },
  {
    id: 'architecture-web-application',
    number: '04',
    title: 'Choosing the Right Architecture for a Web Application',
    category: 'Engineering',
    description: 'Key considerations around scalability, maintainability, integrations, and long-term software ownership.',
    perspectiveSummary: 'Choosing a technical architecture is primarily a decision about long-term maintainability and operational predictability. A well-designed modular application with strict type safety, clear database indexing, and straightforward deployment pipelines consistently outperforms over-architected solutions in uptime and team development velocity.',
    keyConsiderations: [
      'Prioritizing type safety and modular domain boundaries to simplify future changes',
      'Selecting proven database technologies with strong data integrity guarantees',
      'Designing with straightforward CI/CD deployment routines that reduce maintenance overhead'
    ]
  }
];

export const APPROACH_PHASES: ApproachPhase[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Understand the business, its challenges, and its goals.',
    description: 'We begin by analyzing current operational workflows, system boundaries, and user requirements before designing technical architecture.',
    keyOutputs: [
      'Technical Feasibility Assessment',
      'Domain Model & Data Architecture Spec',
      'Security & Concurrency Framework',
      'Milestone & Delivery Roadmap'
    ],
    methodology: 'Discovery & Workflow Auditing'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Define intuitive experiences and scalable technical architecture.',
    description: 'We formulate the technical architecture, data schemas, API contracts, and user interactions to eliminate ambiguity.',
    keyOutputs: [
      'API Contracts & Schema Definitions',
      'High-Fidelity Wireframes & Interactions',
      'Database & Concurrency Topology',
      'Availability & Performance Budgets'
    ],
    methodology: 'Specification-First Architecture'
  },
  {
    number: '03',
    title: 'Develop',
    subtitle: 'Engineer reliable solutions with attention to performance and quality.',
    description: 'Our engineering teams build robust, type-safe, maintainable code with automated testing and continuous integration.',
    keyOutputs: [
      'Production-Ready Clean Codebase',
      'Automated Test Suites (Unit & E2E)',
      'Continuous Deployment Pipeline (CI/CD)',
      'Containerized Environment Staging'
    ],
    methodology: 'Test-Driven Development'
  },
  {
    number: '04',
    title: 'Deliver',
    subtitle: 'Deploy, verify, and transition production software to your team.',
    description: 'We execute structured user acceptance tests, execute seamless zero-downtime cutover, deliver documentation, and monitor live systems.',
    keyOutputs: [
      'Production Deployment & Cutover',
      'User Acceptance Sign-off & QA Verification',
      'Documentation & Team Knowledge Transfer',
      'Live System Monitoring & Post-Launch Support'
    ],
    methodology: 'Verified Production Launch'
  }
];

export const TECH_CAPABILITIES: TechCategory[] = [
  {
    category: 'Frontend Engineering',
    description: 'Modern, high-performance web applications built for speed, responsiveness, and complex interactions.',
    technologies: [
      { name: 'React & Next.js', role: 'Component Framework', highlight: 'Server components, reactive architecture' },
      { name: 'TypeScript', role: 'Type Safety', highlight: 'Strict compile-time guarantees, clean contracts' },
      { name: 'Tailwind CSS', role: 'Design System', highlight: 'Utility styling, design consistency' },
      { name: 'WebSockets', role: 'Real-Time Data', highlight: 'Sub-second client telemetry, bidirectional sync' }
    ]
  },
  {
    category: 'Backend Engineering',
    description: 'Resilient, high-concurrency microservices and APIs engineered for enterprise data processing.',
    technologies: [
      { name: 'Node.js & Express', role: 'Asynchronous Services', highlight: 'Event-driven I/O, rapid API orchestration' },
      { name: 'Go (Golang)', role: 'High-Concurrency Services', highlight: 'Low memory footprint, high throughput' },
      { name: 'Python & FastAPI', role: 'AI & Data Services', highlight: 'Async endpoints, computational algorithms' },
      { name: 'REST & gRPC', role: 'Communication Protocols', highlight: 'Universal standards, typed contracts' }
    ]
  },
  {
    category: 'Cloud & Infrastructure',
    description: 'Scalable, fault-tolerant cloud architecture managed via automated deployment pipelines.',
    technologies: [
      { name: 'AWS & Google Cloud', role: 'Cloud Providers', highlight: 'Managed clusters, reliable hosting' },
      { name: 'Docker & Containers', role: 'Containerization', highlight: 'Immutable deployments, elastic scaling' },
      { name: 'CI/CD Pipelines', role: 'Automated Delivery', highlight: 'Automated test runners, zero-downtime releases' },
      { name: 'PostgreSQL & Redis', role: 'Databases & Cache', highlight: 'ACID transactions, low-latency caching' }
    ]
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    phone: '+91 98940 51733',
    email: 'chennai@alsinfonet.com',
    timezone: 'Asia/Kolkata'
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    phone: '+91 80738 88324',
    email: 'bangalore@alsinfonet.com',
    timezone: 'Asia/Kolkata'
  }
];
