import data from '../app/portfolio/data.json';

export interface SocialLink {
  name: string;
  url: string;
  svg: string;
  viewBox?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  type: string;
}

export interface ProfileData {
  name: string;
  birthDate: string;
  major: string;
  email: string;
  image: string;
  experience: Experience[];
  links: SocialLink[];
}

export interface Certification {
  name: string;
  date: string;
  issuer: string;
  attachment?: string;
}

export interface Education {
  name: string;
  date: string;
  institution: string;
  attachment?: string;
}

export interface Award {
  name: string;
  rank: string;
  date: string;
  attachment?: string;
}

export interface Achievements {
  certifications: Certification[];
  education: Education[];
  awards: Award[];
}

export interface Skill {
  name: string;
  badge: string;
  skilled?: boolean;
}

export interface TechStack {
  category: string;
  skills: Skill[];
}

// 프로필 데이터
export const profileData: ProfileData = data.profileData;

// 성과 데이터
export const achievements: Achievements = data.achievements;

// 기술 스택 데이터
export const techStacks: TechStack[] = data.techStacks;