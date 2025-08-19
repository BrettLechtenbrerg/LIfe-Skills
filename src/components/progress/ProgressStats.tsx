import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const ProgressStats: React.FC = () => {
  const { state } = useApp();
  const currentUser = state.user;
  
  if (!currentUser) return null;

  const userProgress = state.progress.filter(p => p.userId === currentUser.id);
  
  const totalExercises = userProgress.reduce((sum, p) => sum + p.exercisesCompleted.length, 0);
  const totalLessons = userProgress.reduce((sum, p) => sum + p.lessonsViewed.length, 0);
  const currentLevel = Math.max(...userProgress.map(p => p.currentLevel), 1);
  
  const overallProgress = Math.min(((totalExercises * 2 + totalLessons) / 20) * 100, 100);

  const getProgressEmoji = (percentage: number) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🥉';
    if (percentage >= 40) return '📈';
    if (percentage >= 20) return '🌱';
    return '⭐';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <span className="text-2xl">{getProgressEmoji(overallProgress)}</span>
      </div>
      
      <div className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-martial-gold to-yellow-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-martial-gold">{totalExercises}</div>
            <div className="text-xs text-gray-600">Exercises</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
            <div className="text-xs text-gray-600">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentLevel}</div>
            <div className="text-xs text-gray-600">Level</div>
          </div>
        </div>

        {/* View Details Link */}
        <div className="pt-2">
          <Link 
            to="/progress" 
            className="block w-full text-center bg-martial-gold text-martial-black py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition-colors"
          >
            View Detailed Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;