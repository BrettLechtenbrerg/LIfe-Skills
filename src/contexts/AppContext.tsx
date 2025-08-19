import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Studio, LifeSkill, Progress } from '../types';

// App State
interface AppState {
  user: User | null;
  studio: Studio | null;
  lifeSkills: LifeSkill[];
  progress: Progress[];
  currentLifeSkill: LifeSkill | null;
  loading: boolean;
  error: string | null;
}

// Actions
type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_STUDIO'; payload: Studio }
  | { type: 'SET_LIFE_SKILLS'; payload: LifeSkill[] }
  | { type: 'SET_CURRENT_LIFE_SKILL'; payload: LifeSkill | null }
  | { type: 'UPDATE_PROGRESS'; payload: Progress }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial State
const initialState: AppState = {
  user: null,
  studio: null,
  lifeSkills: [],
  progress: [],
  currentLifeSkill: null,
  loading: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_STUDIO':
      return { ...state, studio: action.payload };
    case 'SET_LIFE_SKILLS':
      return { ...state, lifeSkills: action.payload };
    case 'SET_CURRENT_LIFE_SKILL':
      return { ...state, currentLifeSkill: action.payload };
    case 'UPDATE_PROGRESS':
      const updatedProgress = state.progress.filter(p => 
        !(p.userId === action.payload.userId && p.lifeSkillId === action.payload.lifeSkillId)
      );
      return { ...state, progress: [...updatedProgress, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};