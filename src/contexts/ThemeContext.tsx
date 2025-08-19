import React, { createContext, useContext, useEffect } from 'react';
import { useApp } from './AppContext';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  studioName: string;
  terminology: {
    instructor: string;
    student: string;
    session: string;
    skill: string;
  };
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { state } = useApp();
  
  const studioTerminology = {
    'martial-arts': {
      instructor: 'Sensei',
      student: 'Student',
      session: 'Training',
      skill: 'Life Skill'
    },
    'yoga': {
      instructor: 'Teacher',
      student: 'Practitioner',
      session: 'Practice',
      skill: 'Life Practice'
    },
    'sports-team': {
      instructor: 'Coach',
      student: 'Athlete',
      session: 'Training',
      skill: 'Character Trait'
    },
    'fitness': {
      instructor: 'Trainer',
      student: 'Member',
      session: 'Workout',
      skill: 'Personal Skill'
    }
  };

  const getThemeColors = () => {
    switch (state.studio?.type) {
      case 'martial-arts':
        return { primary: '#fbbf24', secondary: '#dc2626' };
      case 'yoga':
        return { primary: '#10b981', secondary: '#8b5cf6' };
      case 'sports-team':
        return { primary: '#2563eb', secondary: '#dc2626' };
      case 'fitness':
        return { primary: '#f59e0b', secondary: '#059669' };
      default:
        return { primary: '#fbbf24', secondary: '#dc2626' };
    }
  };

  const colors = getThemeColors();
  const terminology = studioTerminology[state.studio?.type || 'martial-arts'];

  // Update CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colors.primary);
    }
  }, [colors.primary, colors.secondary]);

  const themeValue: ThemeContextType = {
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    studioName: state.studio?.branding?.name || 'Life Skills Training',
    terminology
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};