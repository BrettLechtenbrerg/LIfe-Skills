import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Exercise } from '../../types';
import { SuccessAnimation } from '../animations/MartialArtsAnimations';

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete?: (exerciseId: string, data: any) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ exercise, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(exercise.duration * 60); // Convert to seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(exercise.process.length).fill(false));
  const [exerciseData, setExerciseData] = useState<any>({});

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const startExercise = () => {
    setIsStarted(true);
    setIsTimerRunning(true);
    setCurrentStep(0);
    
    // Animate the start
    gsap.fromTo('.exercise-content', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  };

  const completeStep = (stepIndex: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = true;
    setCompletedSteps(newCompletedSteps);
    
    // Animate step completion
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
      gsap.to(stepElement, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    
    // Move to next step
    if (stepIndex === currentStep && stepIndex < exercise.process.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
    
    // Check if all steps are completed
    if (newCompletedSteps.every(step => step)) {
      setIsTimerRunning(false);
      if (onComplete) {
        onComplete(exercise.id, {
          completedAt: new Date(),
          timeUsed: (exercise.duration * 60) - timeRemaining,
          data: exerciseData
        });
      }
      
      // Celebrate completion
      gsap.fromTo('.completion-celebration',
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  };

  const resetExercise = () => {
    setIsStarted(false);
    setIsTimerRunning(false);
    setTimeRemaining(exercise.duration * 60);
    setCurrentStep(0);
    setCompletedSteps(new Array(exercise.process.length).fill(false));
    setExerciseData({});
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeColor = () => {
    switch (exercise.type) {
      case 'foundational': return 'from-blue-500 to-blue-600';
      case 'advanced': return 'from-purple-500 to-purple-600';
      case 'physical': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = () => {
    switch (exercise.type) {
      case 'foundational': return '🎯';
      case 'advanced': return '🚀';
      case 'physical': return '💪';
      default: return '📝';
    }
  };

  const allStepsCompleted = completedSteps.every(step => step);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getTypeColor()} p-4 md:p-6 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getTypeIcon()}</span>
            <div>
              <h3 className="text-lg md:text-xl font-bold">{exercise.title}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {exercise.type}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {exercise.ageGroup === 'all' ? 'All Ages' : exercise.ageGroup}
                </span>
              </div>
            </div>
          </div>
          
          {/* Timer */}
          <div className="text-right">
            <div className="text-xl md:text-2xl font-bold">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm opacity-90">
              {isTimerRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(completedSteps.filter(Boolean).length / exercise.process.length) * 100}%` 
            }}
          />
        </div>
      </div>

      <div className="p-4 md:p-6">
        {!isStarted ? (
          /* Pre-Exercise View */
          <div className="text-center">
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Materials Needed:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {exercise.materials.map((material, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">Duration: {exercise.duration} minutes</h4>
              <p className="text-gray-600">
                This exercise has {exercise.process.length} steps to complete.
              </p>
            </div>
            
            <button
              onClick={startExercise}
              className="bg-martial-gold text-martial-black px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md hover:shadow-lg touch-feedback touch-target"
            >
              🚀 Start Exercise
            </button>
          </div>
        ) : (
          /* Exercise In Progress */
          <div className="exercise-content">
            {/* Current Step Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  Step {currentStep + 1} of {exercise.process.length}
                </h4>
                <div className="flex space-x-1">
                  {exercise.process.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        completedSteps[index] 
                          ? 'bg-green-500' 
                          : index === currentStep 
                            ? 'bg-martial-gold' 
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Steps List */}
            <div className="space-y-4 mb-6">
              {exercise.process.map((step, index) => (
                <div
                  key={index}
                  id={`step-${index}`}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    completedSteps[index]
                      ? 'border-green-500 bg-green-50'
                      : index === currentStep
                        ? 'border-martial-gold bg-martial-gold bg-opacity-10'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedSteps[index]
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                              ? 'bg-martial-gold text-martial-black'
                              : 'bg-gray-300 text-gray-600'
                        }`}>
                          {completedSteps[index] ? '✓' : index + 1}
                        </span>
                        <span className={`font-medium ${
                          index === currentStep ? 'text-martial-black' : 'text-gray-700'
                        }`}>
                          Step {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 ml-11">{step}</p>
                    </div>
                    
                    {!completedSteps[index] && index <= currentStep && (
                      <button
                        onClick={() => completeStep(index)}
                        className="ml-4 bg-martial-gold text-martial-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    
                    {completedSteps[index] && (
                      <div className="ml-4 text-green-500 text-xl">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Exercise Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isTimerRunning
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isTimerRunning ? '⏸️ Pause' : '▶️ Resume'}
              </button>
              
              <button
                onClick={resetExercise}
                className="px-4 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        )}
        
        {/* Completion Celebration */}
        {allStepsCompleted && (
          <div className="completion-celebration fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center max-w-md">
              <div className="flex justify-center mb-4">
                <SuccessAnimation className="w-20 h-20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Exercise Complete!</h3>
              <p className="text-gray-600 mb-4">
                Great job completing "{exercise.title}"
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Time used: {formatTime((exercise.duration * 60) - timeRemaining)}
              </p>
              <button
                onClick={() => document.querySelector('.completion-celebration')?.remove()}
                className="bg-martial-gold text-martial-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Instructor Notes */}
        <div className="mt-6 bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
          <h4 className="font-medium text-yellow-800 mb-2">💡 Instructor Notes:</h4>
          <p className="text-sm text-yellow-700">{exercise.instructorNotes}</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercise;