import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { allLifeSkills } from '../data';

/**
 * Custom hook for loading and managing life skills data
 */
export const useLifeSkills = () => {
  const { state, dispatch } = useApp();

  // Load life skills data on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate loading from our static data
      setTimeout(() => {
        dispatch({ type: 'SET_LIFE_SKILLS', payload: allLifeSkills });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 500); // Simulate network delay
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load life skills data' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  // Helper function to get a specific life skill
  const getLifeSkill = (id: string) => {
    return state.lifeSkills.find(skill => skill.id === id);
  };

  // Helper function to set current life skill
  const setCurrentLifeSkill = (skillId: string) => {
    const skill = getLifeSkill(skillId);
    dispatch({ type: 'SET_CURRENT_LIFE_SKILL', payload: skill || null });
  };

  return {
    lifeSkills: state.lifeSkills,
    currentLifeSkill: state.currentLifeSkill,
    loading: state.loading,
    error: state.error,
    getLifeSkill,
    setCurrentLifeSkill
  };
};

/**
 * Hook specifically for the Grit training module
 */
export const useGritTraining = () => {
  const { getLifeSkill } = useLifeSkills();
  
  const gritData = getLifeSkill('grit');
  
  return {
    parable: gritData?.parable,
    explanations: gritData?.explanations,
    quotes: gritData?.quotes || [],
    lessons: gritData?.lessons || [],
    exercises: gritData?.exercises || [],
    isLoaded: !!gritData
  };
};