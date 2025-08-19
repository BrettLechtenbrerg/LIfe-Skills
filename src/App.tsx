import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LifeSkills from './pages/LifeSkills';
import LifeSkillTraining from './pages/LifeSkillTraining';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import './App.css';

// Demo data initialization component
const AppInitializer: React.FC = () => {
  const { dispatch } = useApp();

  useEffect(() => {
    // Initialize demo user and studio
    dispatch({
      type: 'SET_USER',
      payload: {
        id: 'user-1',
        name: 'Demo Student',
        email: 'demo@pmmalifeskills.com',
        role: 'student',
        studioId: 'studio-1'
      }
    });

    dispatch({
      type: 'SET_STUDIO',
      payload: {
        id: 'studio-1',
        name: 'PMMA Life Skills Academy',
        type: 'martial-arts',
        branding: {
          primaryColor: '#fbbf24',
          name: 'PMMA Academy'
        }
      }
    });

    // Initialize some sample progress data
    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: {
        userId: 'user-1',
        lifeSkillId: 'grit',
        exercisesCompleted: ['grit-exercise-1', 'grit-exercise-2'],
        lessonsViewed: ['grit-lesson-1', 'grit-lesson-3'],
        currentLevel: 2,
        lastActivity: new Date()
      }
    });
  }, [dispatch]);

  return null;
};

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <AppInitializer />
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="lifeskills" element={<LifeSkills />} />
            <Route path="lifeskills/:slug" element={<LifeSkillTraining />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<div className="text-center py-12"><h2 className="text-2xl font-bold">User Profile</h2><p className="text-gray-600 mt-2">Coming Soon!</p></div>} />
          </Route>
        </Routes>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
