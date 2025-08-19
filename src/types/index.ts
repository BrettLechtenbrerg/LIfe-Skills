// Core type definitions for the Life Skills Training App

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  studioId: string;
}

export interface Studio {
  id: string;
  name: string;
  type: 'martial-arts' | 'yoga' | 'sports-team' | 'fitness';
  branding: {
    primaryColor: string;
    logo?: string;
    name: string;
  };
}

export interface LifeSkill {
  id: string;
  title: string;
  slug: string;
  description: string;
  parable: Parable;
  explanations: AgeGroupExplanations;
  quotes: Quote[];
  lessons: Lesson[];
  exercises: Exercise[];
}

export interface Parable {
  title: string;
  content: string;
  teachingPoints: string[];
}

export interface AgeGroupExplanations {
  young: ExplanationContent; // 6-10
  teen: ExplanationContent;  // 11-17
  adult: ExplanationContent; // 18+
}

export interface ExplanationContent {
  definition: string;
  keyConcepts: string[];
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  application: string;
  category: 'martial-arts' | 'philosophy' | 'leadership';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  ageGroup: 'all' | 'young' | 'teen' | 'adult';
}

export interface Exercise {
  id: string;
  title: string;
  type: 'foundational' | 'advanced' | 'physical';
  duration: number; // minutes
  materials: string[];
  process: string[];
  ageGroup: 'all' | 'young' | 'teen' | 'adult';
  instructorNotes: string;
}

export interface Progress {
  userId: string;
  lifeSkillId: string;
  exercisesCompleted: string[];
  lessonsViewed: string[];
  currentLevel: number;
  lastActivity: Date;
}