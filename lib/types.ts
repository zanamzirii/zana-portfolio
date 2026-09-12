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
  cv: string;
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
  github?: string;
  website?: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tech: string[];
  links: ProjectLinks;
  images: string[];
  highlights: string[];
  color: string;
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
  skills: SkillCategory[];
  projects: Project[];
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
