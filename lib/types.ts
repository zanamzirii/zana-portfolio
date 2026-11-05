// ─── Project Data Types ───────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  nameShort: string;
  initials: string;
  tagline: string;
  roles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  available: boolean;
  availabilityNote: string;
}

export interface Links {
  github: string;
  linkedin: string;
  appStore: string;
  cv?: string;
  whatsapp: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface ProjectLinks {
  appStore?: string;
  playStore?: string;
  github?: string;
  website?: string;
  testFlight?: string;
  live?: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  badge?: string;
  category?: "Mobile" | "Web" | "3D / Academic";
  tech: string[];
  links: ProjectLinks;
  images: string[];
  video?: string;
  appLogo?: string;
  qrCode?: string;
  highlights: string[];
  color: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: "ui-ux" | "brand-social" | "video-motion";
  type: "figma" | "instagram" | "video";
  subtitle: string;
  description: string;
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
  link?: string;
  linkLabel?: string;
  tags: string[];
  brand?: string;
}

export interface KYCStats {
  headline: {
    placesVisited: number;
    doorsOpened: number;
    doorOpenRate: string;
    kycCompleted: number;
    leafletsDistributed: number;
    didNotOpen: number;
    alreadyRegistered: number;
    withoutMeters: number;
    agentsLed: number;
    areaCoveredKm2: number;
  };
  phase1: {
    placesVisited: number;
    kycCompleted: number;
    doorOpenRate: string;
  };
  phase2: {
    placesVisited: number;
    kycCompleted: number;
    doorOpenRate: string;
  };
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  type: "full-time" | "founder" | "freelance" | "internship";
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  score: string;
  date: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface SiteData {
  personal: PersonalInfo;
  links: Links;
  stats: Stat[];
  kyc: KYCStats;
  skills: SkillCategory[];
  projects: Project[];
  creative: CreativeItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  languages: Language[];
}

// ─── Contact Form Types ───────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export type ContactFormStatus = "idle" | "loading" | "success" | "error";
