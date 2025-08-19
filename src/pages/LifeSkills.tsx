import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useLifeSkills } from '../hooks/useLifeSkills';

const LifeSkills: React.FC = () => {
  const { state } = useApp();
  const { lifeSkills, loading } = useLifeSkills();

  // Map actual skills to display data with icons and colors
  const iconMap = {
    'grit': '💪',
    'respect': '🙏',
    'discipline': '🎯',
    'confidence': '🌟'
  };
  
  const colorMap = {
    'grit': 'from-red-500 to-orange-500',
    'respect': 'from-blue-500 to-purple-500',
    'discipline': 'from-green-500 to-teal-500',
    'confidence': 'from-yellow-500 to-orange-500'
  };

  const skillDisplayData = lifeSkills.map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    icon: iconMap[skill.id] || '🥋',
    color: colorMap[skill.id] || 'from-gray-500 to-blue-500'
  }));

  // Add placeholder skills for upcoming features
  const placeholderSkills = [
    {
      id: 'discipline',
      title: 'Discipline', 
      description: 'Master self-control and consistent practice habits.',
      icon: '🎯',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'confidence',
      title: 'Confidence',
      description: 'Build unshakeable self-belief through progressive challenges.',
      icon: '🌟',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const allSkills = [...skillDisplayData, ...placeholderSkills];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Life Skills Training</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Develop character and leadership through martial arts principles. 
          Each skill includes parables, exercises, and practical applications.
        </p>
      </div>

      {/* Life Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {allSkills.map((skill) => (
          <Link
            key={skill.id}
            to={`/lifeskills/${skill.id}`}
            className="group"
          >
            <div className={`bg-gradient-to-br ${skill.color} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-6 text-white`}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-white bg-opacity-20 rounded text-xs font-medium">
                    Training Module
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-white text-opacity-90 text-sm mb-4">
                {skill.description}
              </p>
              
              <div className="flex items-center text-sm font-medium">
                <span>Start Training</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <span className="text-4xl mb-4 block">🚀</span>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">More Skills Coming Soon</h3>
        <p className="text-gray-600">
          We're developing additional life skills modules including Leadership, Teamwork, 
          Patience, and Focus. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default LifeSkills;