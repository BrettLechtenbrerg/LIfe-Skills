import { useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { getAllLifeSkills } from '../data';

/**
 * Custom hook for loading and managing life skills data
 */
export const useLifeSkills = () => {
  const { state, dispatch } = useApp();

  // Function to reload life skills (including generated ones)
  const reloadLifeSkills = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Get all life skills (static + generated from localStorage)
      setTimeout(() => {
        const allSkills = getAllLifeSkills();
        dispatch({ type: 'SET_LIFE_SKILLS', payload: allSkills });
        dispatch({ type: 'SET_LOADING', payload: false });
      }, 300); // Simulate brief loading
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load life skills data' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  // Load life skills data on mount
  useEffect(() => {
    reloadLifeSkills();
  }, [reloadLifeSkills]);

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
    setCurrentLifeSkill,
    reloadLifeSkills
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