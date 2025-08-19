import { LifeSkill } from '../types';

const STORAGE_KEY = 'pmma_generated_lifeskills';

export interface StoredLifeSkill extends LifeSkill {
  isGenerated: true;
  createdAt: string;
  updatedAt: string;
}

// Get all generated life skills from localStorage
export const getGeneratedLifeSkills = (): StoredLifeSkill[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading generated life skills:', error);
    return [];
  }
};

// Save a new generated life skill
export const saveGeneratedLifeSkill = (lifeSkill: LifeSkill): void => {
  try {
    const existing = getGeneratedLifeSkills();
    const now = new Date().toISOString();
    
    const storedLifeSkill: StoredLifeSkill = {
      ...lifeSkill,
      isGenerated: true,
      createdAt: now,
      updatedAt: now
    };
    
    // Check if life skill already exists (by id) and update it
    const existingIndex = existing.findIndex(skill => skill.id === lifeSkill.id);
    
    if (existingIndex >= 0) {
      // Update existing
      existing[existingIndex] = {
        ...storedLifeSkill,
        createdAt: existing[existingIndex].createdAt // Keep original creation date
      };
    } else {
      // Add new
      existing.push(storedLifeSkill);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Error saving generated life skill:', error);
  }
};

// Update an existing generated life skill
export const updateGeneratedLifeSkill = (id: string, updates: Partial<LifeSkill>): void => {
  try {
    const existing = getGeneratedLifeSkills();
    const index = existing.findIndex(skill => skill.id === id);
    
    if (index >= 0) {
      existing[index] = {
        ...existing[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (error) {
    console.error('Error updating generated life skill:', error);
  }
};

// Delete a generated life skill
export const deleteGeneratedLifeSkill = (id: string): void => {
  try {
    const existing = getGeneratedLifeSkills();
    const filtered = existing.filter(skill => skill.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting generated life skill:', error);
  }
};

// Get a specific generated life skill by id
export const getGeneratedLifeSkillById = (id: string): StoredLifeSkill | undefined => {
  const generated = getGeneratedLifeSkills();
  return generated.find(skill => skill.id === id);
};

// Get a specific generated life skill by slug
export const getGeneratedLifeSkillBySlug = (slug: string): StoredLifeSkill | undefined => {
  const generated = getGeneratedLifeSkills();
  return generated.find(skill => skill.slug === slug);
};

// Clear all generated life skills (for testing/reset)
export const clearGeneratedLifeSkills = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing generated life skills:', error);
  }
};

// Export generated life skills as JSON (for backup)
export const exportGeneratedLifeSkills = (): string => {
  const generated = getGeneratedLifeSkills();
  return JSON.stringify(generated, null, 2);
};

// Import generated life skills from JSON (for restore)
export const importGeneratedLifeSkills = (jsonData: string): boolean => {
  try {
    const parsed = JSON.parse(jsonData);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing generated life skills:', error);
    return false;
  }
};