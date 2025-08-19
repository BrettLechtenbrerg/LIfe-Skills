import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useLifeSkills } from '../hooks/useLifeSkills';
import ProgressStats from '../components/progress/ProgressStats';
import { MartialArtsCharacter, ProgressAnimation, BookAnimation, TrophyAnimation } from '../components/animations/MartialArtsAnimations';

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const { lifeSkills } = useLifeSkills();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome{state.user ? `, ${state.user.name}` : ''}! 🥋
        </h2>
        <p className="text-gray-600">
          Ready to develop powerful life skills through martial arts training?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-martial-gold rounded-lg">
              <ProgressAnimation className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Skills</p>
              <p className="text-2xl font-bold text-gray-900">
                {lifeSkills.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <ProgressAnimation className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {state.progress.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrophyAnimation className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Life Skill */}
      <div className="bg-gradient-to-r from-martial-gold to-yellow-500 rounded-lg shadow-md p-4 md:p-6 text-martial-black">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-xl font-bold mb-2">Featured Training: Grit</h3>
            <p className="mb-4">
              Learn the power of perseverance through martial arts practice. 
              Develop resilience and determination that lasts a lifetime.
            </p>
            <Link
              to="/lifeskills/grit"
              className="inline-flex items-center px-4 py-2 bg-martial-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Start Training →
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <MartialArtsCharacter className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <ProgressStats />
        <Link
          to="/lifeskills"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center">
            <div className="group-hover:scale-110 transition-transform">
              <BookAnimation className="w-12 h-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Browse Life Skills</h3>
              <p className="text-gray-600">Explore all available training packages</p>
            </div>
          </div>
        </Link>

        <Link
          to="/progress"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center">
            <div className="group-hover:scale-110 transition-transform">
              <ProgressAnimation className="w-12 h-12" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
              <p className="text-gray-600">Monitor your development journey</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;