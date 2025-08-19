import React from 'react';
import { MeditationAnimation, TargetAnimation, BookAnimation } from './MartialArtsAnimations';

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Floating meditation figure - top left */}
      <div 
        className="absolute top-10 left-10 opacity-10"
        style={{
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '0s'
        }}
      >
        <MeditationAnimation className="w-16 h-16" />
      </div>
      
      {/* Floating target - top right */}
      <div 
        className="absolute top-20 right-16 opacity-15"
        style={{
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}
      >
        <TargetAnimation className="w-12 h-12" />
      </div>
      
      {/* Floating book - bottom left */}
      <div 
        className="absolute bottom-20 left-20 opacity-10"
        style={{
          animation: 'float 7s ease-in-out infinite',
          animationDelay: '4s'
        }}
      >
        <BookAnimation className="w-14 h-14" />
      </div>
      
      {/* Floating meditation - bottom right */}
      <div 
        className="absolute bottom-16 right-10 opacity-12"
        style={{
          animation: 'float 9s ease-in-out infinite',
          animationDelay: '1s'
        }}
      >
        <MeditationAnimation className="w-10 h-10" />
      </div>

      {/* Add CSS to global styles in App.css for floating animation */}
    </div>
  );
};

export default FloatingElements;