export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  industry: string;
  tagline: string;
  businessChallenge: string;
  solutionOverview: string;
  keyFunctionality: string[];
  techStack: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  typicalSolutions: string[];
  businessValue: string;
  techStack: string[];
}

export interface InsightArticle {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  perspectiveSummary: string;
  keyConsiderations: string[];
}

export interface ApproachPhase {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyOutputs: string[];
  methodology: string;
}

export interface TechCategory {
  category: string;
  description: string;
  technologies: {
    name: string;
    role: string;
    highlight: string;
  }[];
}

export interface OfficeLocation {
  city: string;
  state: string;
  country: string;
  address?: string;
  phone: string;
  email: string;
  timezone: string;
}
