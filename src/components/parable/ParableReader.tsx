import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import FloatingElements from '../animations/FloatingElements';

interface ParableReaderProps {
  title: string;
  content: string;
  teachingPoints: string[];
}

const ParableReader: React.FC<ParableReaderProps> = ({ title, content, teachingPoints }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  // Simple fade animation without ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    // Initial setup
    paragraphsRef.current.forEach((paragraph, index) => {
      if (paragraph) {
        gsap.set(paragraph, { opacity: 0.3, y: 10 });
        
        // Animate each paragraph in with a delay
        gsap.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out"
        });
      }
    });
  }, []);

  // Typewriter animation function
  const playTypewriterAnimation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCurrentParagraph(0);
    
    // Reset all paragraphs
    paragraphsRef.current.forEach(p => {
      if (p) {
        gsap.set(p, { opacity: 1 });
        const textElement = p.querySelector('.paragraph-text');
        if (textElement) {
          textElement.textContent = '';
        }
      }
    });

    // Create timeline for typewriter effect
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false)
    });

    paragraphsRef.current.forEach((paragraph, index) => {
      if (paragraph) {
        const textElement = paragraph.querySelector('.paragraph-text');
        const originalText = paragraphs[index];
        
        if (textElement && originalText) {
          tl.to(textElement, {
            duration: originalText.length * 0.02,
            ease: "none",
            onStart: () => setCurrentParagraph(index),
            onUpdate: function() {
              const progress = this.progress();
              const currentLength = Math.ceil(originalText.length * progress);
              textElement.textContent = originalText.substring(0, currentLength);
            },
            onComplete: () => {
              // Add a pulse effect when paragraph completes
              gsap.to(paragraph, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
              });
            }
          }, index > 0 ? "+=0.5" : "+=0");
        }
      }
    });
  };

  // Fade in animation
  const playFadeAnimation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Reset paragraphs
    gsap.set(paragraphsRef.current, { opacity: 0, y: 30 });
    
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false)
    });

    paragraphsRef.current.forEach((paragraph, index) => {
      tl.to(paragraph, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onStart: () => setCurrentParagraph(index)
      }, index * 0.6);
    });
  };

  // Slide animation
  const playSlideAnimation = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Reset paragraphs
    gsap.set(paragraphsRef.current, { opacity: 0, x: -100 });
    
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false)
    });

    paragraphsRef.current.forEach((paragraph, index) => {
      tl.to(paragraph, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        onStart: () => setCurrentParagraph(index)
      }, index * 0.4);
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <FloatingElements />
      {/* Animation Controls */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={playTypewriterAnimation}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-martial-gold text-martial-black hover:bg-yellow-500 shadow-md hover:shadow-lg transform hover:scale-105'
          }`}
        >
          📝 Typewriter Effect
        </button>
        
        <button
          onClick={playFadeAnimation}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:scale-105'
          }`}
        >
          ✨ Fade Animation
        </button>
        
        <button
          onClick={playSlideAnimation}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg transform hover:scale-105'
          }`}
        >
          🎬 Slide Animation
        </button>
      </div>

      {/* Progress Indicator */}
      {isPlaying && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Reading:</span>
            <div className="flex space-x-1">
              {paragraphs.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentParagraph ? 'bg-martial-gold' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span>({currentParagraph + 1}/{paragraphs.length})</span>
          </div>
        </div>
      )}

      {/* Parable Content */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 shadow-lg border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center relative">
          <span className="inline-block">📖</span>
          <span className="ml-3">{title}</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-martial-gold rounded-full mt-2"></div>
        </h2>

        {/* Story Paragraphs */}
        <div className="prose prose-lg max-w-none mb-8">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              ref={el => {
                if (el) paragraphsRef.current[index] = el;
              }}
              className={`mb-6 p-4 rounded-lg transition-all duration-300 ${
                isPlaying && index === currentParagraph 
                  ? 'bg-martial-gold bg-opacity-10 border-l-4 border-martial-gold' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <p className="paragraph-text text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {/* Teaching Points */}
        <div className="bg-martial-gold bg-opacity-10 rounded-lg p-6 border-l-4 border-martial-gold">
          <h3 className="font-bold text-martial-black mb-4 text-xl flex items-center">
            <span className="mr-2">💡</span>
            Key Teaching Points
          </h3>
          <ul className="space-y-3">
            {teachingPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start group"
              >
                <span className="text-martial-gold mr-3 text-xl group-hover:scale-110 transition-transform">
                  •
                </span>
                <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          <span className="inline-block animate-bounce mr-2">👆</span>
          Try the animation buttons above for interactive storytelling
        </p>
      </div>
    </div>
  );
};

export default ParableReader;