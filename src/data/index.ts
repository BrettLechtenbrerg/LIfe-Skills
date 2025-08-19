// Central data export for all life skills training modules
import { gritTrainingData } from './gritTrainingData';
import { respectTrainingData } from './respectTrainingData';
import { confidenceTrainingData } from './confidenceTrainingData';
import { disciplineTrainingData } from './disciplineTrainingData';
import { LifeSkill } from '../types';
import { getGeneratedLifeSkills } from '../utils/lifeskillStorage';

// Export individual training modules
export { gritTrainingData, respectTrainingData, confidenceTrainingData, disciplineTrainingData };

// Static/built-in life skills
export const staticLifeSkills: LifeSkill[] = [
  gritTrainingData,
  respectTrainingData,
  confidenceTrainingData,
  disciplineTrainingData
  // Future modules will be added here:
  // leadershipTrainingData,
  // patienceTrainingData,
  // etc.
];

// Get all life skills (static + generated)
export const getAllLifeSkills = (): LifeSkill[] => {
  const generated = getGeneratedLifeSkills();
  return [...staticLifeSkills, ...generated];
};

// Export complete life skills collection (for backward compatibility)
export const allLifeSkills: LifeSkill[] = getAllLifeSkills();

// Helper functions for data access (dynamic to include generated skills)
export const getLifeSkillById = (id: string): LifeSkill | undefined => {
  const allSkills = getAllLifeSkills();
  return allSkills.find(skill => skill.id === id);
};

export const getLifeSkillBySlug = (slug: string): LifeSkill | undefined => {
  const allSkills = getAllLifeSkills();
  return allSkills.find(skill => skill.slug === slug);
};

// Get quotes by category
export const getQuotesByCategory = (category: 'martial-arts' | 'philosophy' | 'leadership'): any[] => {
  const allSkills = getAllLifeSkills();
  return allSkills.flatMap(skill => 
    skill.quotes.filter(quote => quote.category === category)
  );
};

// Get exercises by type
export const getExercisesByType = (type: 'foundational' | 'advanced' | 'physical'): any[] => {
  const allSkills = getAllLifeSkills();
  return allSkills.flatMap(skill => 
    skill.exercises.filter(exercise => exercise.type === type)
  );
};

// Get content by age group
export const getLessonsByAgeGroup = (ageGroup: 'young' | 'teen' | 'adult' | 'all'): any[] => {
  const allSkills = getAllLifeSkills();
  return allSkills.flatMap(skill => 
    skill.lessons.filter(lesson => lesson.ageGroup === ageGroup || lesson.ageGroup === 'all')
  );
};