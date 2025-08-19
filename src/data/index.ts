// Central data export for all life skills training modules
import { gritTrainingData } from './gritTrainingData';
import { LifeSkill } from '../types';

// Export individual training modules
export { gritTrainingData };

// Export complete life skills collection
export const allLifeSkills: LifeSkill[] = [
  gritTrainingData
  // Future modules will be added here:
  // respectTrainingData,
  // disciplineTrainingData,
  // confidenceTrainingData,
  // leadershipTrainingData,
  // etc.
];

// Helper functions for data access
export const getLifeSkillById = (id: string): LifeSkill | undefined => {
  return allLifeSkills.find(skill => skill.id === id);
};

export const getLifeSkillBySlug = (slug: string): LifeSkill | undefined => {
  return allLifeSkills.find(skill => skill.slug === slug);
};

// Get quotes by category
export const getQuotesByCategory = (category: 'martial-arts' | 'philosophy' | 'leadership'): any[] => {
  return allLifeSkills.flatMap(skill => 
    skill.quotes.filter(quote => quote.category === category)
  );
};

// Get exercises by type
export const getExercisesByType = (type: 'foundational' | 'advanced' | 'physical'): any[] => {
  return allLifeSkills.flatMap(skill => 
    skill.exercises.filter(exercise => exercise.type === type)
  );
};

// Get content by age group
export const getLessonsByAgeGroup = (ageGroup: 'young' | 'teen' | 'adult' | 'all'): any[] => {
  return allLifeSkills.flatMap(skill => 
    skill.lessons.filter(lesson => lesson.ageGroup === ageGroup || lesson.ageGroup === 'all')
  );
};