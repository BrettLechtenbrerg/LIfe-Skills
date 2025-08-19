import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { TrophyAnimation, ProgressAnimation, MeditationAnimation } from '../animations/MartialArtsAnimations';

const ProgressDashboard: React.FC = () => {
  const { state } = useApp();
  const currentUser = state.user;
  
  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <MeditationAnimation className="w-20 h-20" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No User Selected</h3>
        <p className="text-gray-600">Please select a user to view progress.</p>
      </div>
    );
  }

  const userProgress = state.progress.filter(p => p.userId === currentUser.id);

  const getOverallProgress = () => {
    if (userProgress.length === 0) return 0;
    
    const totalExercises = userProgress.reduce((sum, p) => sum + p.exercisesCompleted.length, 0);
    const totalLessons = userProgress.reduce((sum, p) => sum + p.lessonsViewed.length, 0);
    
    // Simple progress calculation - can be enhanced
    return Math.min(((totalExercises * 2 + totalLessons) / 20) * 100, 100);
  };

  const getLifeSkillProgress = (lifeSkillId: string) => {
    const progress = userProgress.find(p => p.lifeSkillId === lifeSkillId);
    if (!progress) return 0;
    
    // Calculate based on exercises completed and lessons viewed
    const exerciseScore = progress.exercisesCompleted.length * 15;
    const lessonScore = progress.lessonsViewed.length * 10;
    
    return Math.min(exerciseScore + lessonScore, 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-cyan-600';
    if (percentage >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getProgressEmoji = (percentage: number) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🥉';
    if (percentage >= 40) return '📈';
    if (percentage >= 20) return '🌱';
    return '⭐';
  };

  const overallProgress = getOverallProgress();
  const gritProgress = getLifeSkillProgress('grit');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-4 md:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Progress Dashboard</h1>
            <p className="text-white text-opacity-90">
              Track your martial arts life skills journey
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrophyAnimation className="w-12 h-12" />
            </div>
            <div className="text-xl font-bold">{Math.round(overallProgress)}%</div>
            <div className="text-sm opacity-90">Overall</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-martial-gold to-yellow-600 rounded-full flex items-center justify-center text-2xl text-white font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {currentUser.role}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Level {Math.max(...userProgress.map(p => p.currentLevel), 1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <span className="text-2xl">{getProgressEmoji(overallProgress)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className={`bg-gradient-to-r ${getProgressColor(overallProgress)} h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
        </div>

        {/* Exercises Completed */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Exercises</h3>
            <span className="text-2xl">🏃‍♂️</span>
          </div>
          <div className="text-3xl font-bold text-martial-gold mb-2">
            {userProgress.reduce((sum, p) => sum + p.exercisesCompleted.length, 0)}
          </div>
          <div className="text-sm text-gray-600">
            Completed exercises
          </div>
        </div>

        {/* Lessons Viewed */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Lessons</h3>
            <span className="text-2xl">📚</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {userProgress.reduce((sum, p) => sum + p.lessonsViewed.length, 0)}
          </div>
          <div className="text-sm text-gray-600">
            Lessons completed
          </div>
        </div>
      </div>

      {/* Life Skills Progress */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Life Skills Progress</h3>
          <p className="text-gray-600 mt-1">Your advancement through different life skill modules</p>
        </div>
        
        <div className="p-6">
          {/* Grit Module */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">💪</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Grit & Perseverance</h4>
                    <p className="text-sm text-gray-600">Develop resilience and determination</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${gritProgress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{Math.round(gritProgress)}%</span>
                </div>
              </div>
              
              <div className="text-right ml-6">
                <div className="text-2xl mb-1">{getProgressEmoji(gritProgress)}</div>
                <div className="text-xs text-gray-500">
                  {gritProgress >= 100 ? 'Mastered' : gritProgress >= 80 ? 'Advanced' : gritProgress >= 40 ? 'Learning' : 'Starting'}
                </div>
              </div>
            </div>

            {/* Detailed breakdown for current module */}
            {userProgress.find(p => p.lifeSkillId === 'grit') && (
              <div className="mt-4 pt-4 border-t border-red-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Exercises:</span>
                    <span className="ml-2 font-medium">
                      {userProgress.find(p => p.lifeSkillId === 'grit')?.exercisesCompleted.length || 0}/5
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Lessons:</span>
                    <span className="ml-2 font-medium">
                      {userProgress.find(p => p.lifeSkillId === 'grit')?.lessonsViewed.length || 0}/5
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Placeholder for future modules */}
          <div className="mt-4 space-y-3">
            {[
              { name: 'Respect & Honor', emoji: '🙏', color: 'from-blue-50 to-cyan-50 border-blue-200', coming: true },
              { name: 'Leadership', emoji: '👑', color: 'from-purple-50 to-indigo-50 border-purple-200', coming: true },
              { name: 'Discipline', emoji: '⚡', color: 'from-yellow-50 to-orange-50 border-yellow-200', coming: true }
            ].map((skill, index) => (
              <div key={index} className={`bg-gradient-to-r ${skill.color} rounded-lg p-4 opacity-60`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.emoji}</span>
                    <div>
                      <h4 className="font-medium text-gray-700">{skill.name}</h4>
                      <p className="text-xs text-gray-500">Coming Soon</p>
                    </div>
                  </div>
                  <div className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Locked
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        </div>
        
        <div className="p-6">
          {userProgress.length > 0 ? (
            <div className="space-y-4">
              {userProgress.map((progress, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-martial-gold rounded-full flex items-center justify-center text-white font-bold">
                    💪
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Grit Training Progress</p>
                    <p className="text-sm text-gray-600">
                      Completed {progress.exercisesCompleted.length} exercises and viewed {progress.lessonsViewed.length} lessons
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last activity: {formatDate(progress.lastActivity)}
                    </p>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Level {progress.currentLevel}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <ProgressAnimation className="w-16 h-16" />
              </div>
              <p className="text-gray-600">Start your first training module to see activity here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;