import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGritTraining } from '../hooks/useLifeSkills';
import { useApp } from '../contexts/AppContext';
import ParableReader from '../components/parable/ParableReader';
import QuoteCarousel from '../components/parable/QuoteCarousel';
import ExerciseGrid from '../components/exercises/ExerciseGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const GritTraining: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { parable, explanations, quotes, lessons, exercises, isLoaded } = useGritTraining();
  const { dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('parable');

  const handleExerciseComplete = (exerciseId: string, data: any) => {
    // Update progress in global state
    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: {
        userId: 'user-1', // Would come from auth context in real app
        lifeSkillId: 'grit',
        exercisesCompleted: [exerciseId],
        lessonsViewed: [],
        currentLevel: 1,
        lastActivity: new Date()
      }
    });
    
    console.log(`Exercise ${exerciseId} completed with data:`, data);
  };

  // Redirect if not the grit module
  if (slug !== 'grit') {
    return <Navigate to="/lifeskills" replace />;
  }

  if (!isLoaded) {
    return <LoadingSpinner message="Loading Grit Training Module..." />;
  }

  const tabs = [
    { id: 'parable', label: 'Parable', icon: '📖' },
    { id: 'explanations', label: 'Explanations', icon: '🎯' },
    { id: 'quotes', label: 'Quotes', icon: '💬' },
    { id: 'lessons', label: 'Lessons', icon: '📚' },
    { id: 'exercises', label: 'Exercises', icon: '🏃‍♂️' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md p-4 md:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Grit Training Module</h1>
            <p className="text-white text-opacity-90">
              Develop resilience and perseverance through martial arts principles
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <span className="text-4xl md:text-6xl">💪</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 md:space-x-2 px-4 md:px-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 md:py-4 px-2 md:px-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap flex items-center space-x-1 md:space-x-2 ${
                  activeTab === tab.id
                    ? 'border-martial-gold text-martial-black bg-martial-gold bg-opacity-10'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 md:p-6">
          {/* Parable Section */}
          {activeTab === 'parable' && parable && (
            <ParableReader
              title={parable.title}
              content={parable.content}
              teachingPoints={parable.teachingPoints}
            />
          )}

          {/* Age-Appropriate Explanations */}
          {activeTab === 'explanations' && explanations && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Understanding Grit</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Young Students */}
                <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Ages 6-10</h3>
                  <p className="text-blue-800 mb-4">{explanations.young.definition}</p>
                  <ul className="space-y-2">
                    {explanations.young.keyConcepts.map((concept, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-blue-500 mr-2">★</span>
                        <span className="text-blue-700">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teens */}
                <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Ages 11-17</h3>
                  <p className="text-green-800 mb-4">{explanations.teen.definition}</p>
                  <ul className="space-y-2">
                    {explanations.teen.keyConcepts.map((concept, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">★</span>
                        <span className="text-green-700">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Adults */}
                <div className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Ages 18+</h3>
                  <p className="text-purple-800 mb-4">{explanations.adult.definition}</p>
                  <ul className="space-y-2">
                    {explanations.adult.keyConcepts.map((concept, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-purple-500 mr-2">★</span>
                        <span className="text-purple-700">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Inspirational Quotes */}
          {activeTab === 'quotes' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 Inspirational Quotes</h2>
              <QuoteCarousel quotes={quotes} />
            </div>
          )}

          {/* Key Lessons */}
          {activeTab === 'lessons' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Key Lessons</h2>
              
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                        <p className="text-gray-600 mb-3">{lesson.description}</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                        {lesson.ageGroup === 'all' ? 'All Ages' : lesson.ageGroup}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Exercises */}
          {activeTab === 'exercises' && (
            <ExerciseGrid 
              exercises={exercises} 
              onExerciseComplete={handleExerciseComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GritTraining;