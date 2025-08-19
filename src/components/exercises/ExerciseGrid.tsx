import React, { useState } from 'react';
import { Exercise } from '../../types';
import InteractiveExercise from './InteractiveExercise';

interface ExerciseGridProps {
  exercises: Exercise[];
  onExerciseComplete?: (exerciseId: string, data: any) => void;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ exercises, onExerciseComplete }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'foundational' | 'advanced' | 'physical'>('all');
  const [filterAge, setFilterAge] = useState<'all' | 'young' | 'teen' | 'adult'>('all');

  const filteredExercises = exercises.filter(exercise => {
    const typeMatch = filterType === 'all' || exercise.type === filterType;
    const ageMatch = filterAge === 'all' || exercise.ageGroup === filterAge || exercise.ageGroup === 'all';
    return typeMatch && ageMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foundational': return 'from-blue-500 to-blue-600';
      case 'advanced': return 'from-purple-500 to-purple-600';
      case 'physical': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'foundational': return '🎯';
      case 'advanced': return '🚀';
      case 'physical': return '💪';
      default: return '📝';
    }
  };

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleExerciseClose = () => {
    setSelectedExercise(null);
  };

  const handleExerciseComplete = (exerciseId: string, data: any) => {
    if (onExerciseComplete) {
      onExerciseComplete(exerciseId, data);
    }
    // Auto-close after a delay
    setTimeout(() => {
      setSelectedExercise(null);
    }, 3000);
  };

  if (selectedExercise) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Interactive Exercise</h2>
          <button
            onClick={handleExerciseClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            ← Back to Exercises
          </button>
        </div>
        <InteractiveExercise 
          exercise={selectedExercise} 
          onComplete={handleExerciseComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Filter Exercises</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-martial-gold focus:border-martial-gold"
            >
              <option value="all">All Types</option>
              <option value="foundational">🎯 Foundational</option>
              <option value="advanced">🚀 Advanced</option>
              <option value="physical">💪 Physical</option>
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
            <select
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value as any)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-martial-gold focus:border-martial-gold"
            >
              <option value="all">All Ages</option>
              <option value="young">Ages 6-10</option>
              <option value="teen">Ages 11-17</option>
              <option value="adult">Ages 18+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all transform hover:scale-102 cursor-pointer"
            onClick={() => handleExerciseSelect(exercise)}
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${getTypeColor(exercise.type)} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(exercise.type)}</span>
                  <div>
                    <h4 className="font-semibold text-lg">{exercise.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                        {exercise.type}
                      </span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                        {exercise.duration}min
                      </span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                        {exercise.ageGroup === 'all' ? 'All Ages' : exercise.ageGroup}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Click to Start</div>
                  <div className="text-xl">▶️</div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Materials:</h5>
                <div className="flex flex-wrap gap-1">
                  {exercise.materials.slice(0, 3).map((material, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {material}
                    </span>
                  ))}
                  {exercise.materials.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{exercise.materials.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Steps Preview:</h5>
                <div className="text-sm text-gray-600">
                  {exercise.process.length} interactive steps to complete
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div className="bg-gray-400 h-1 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded p-3 border-l-4 border-yellow-400">
                <div className="text-xs text-yellow-700">
                  <span className="font-medium">Instructor Tip: </span>
                  {exercise.instructorNotes.substring(0, 100)}
                  {exercise.instructorNotes.length > 100 && '...'}
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-martial-gold bg-opacity-0 hover:bg-opacity-5 transition-all rounded-lg pointer-events-none"></div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No exercises match your filters</h3>
          <p className="text-gray-600">Try adjusting your filter settings to see more exercises.</p>
          <button
            onClick={() => {
              setFilterType('all');
              setFilterAge('all');
            }}
            className="mt-4 px-4 py-2 bg-martial-gold text-martial-black rounded-md hover:bg-yellow-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseGrid;