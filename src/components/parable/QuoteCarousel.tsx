import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Quote } from '../../types';

interface QuoteCarouselProps {
  quotes: Quote[];
}

const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ quotes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-advance quotes
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, quotes.length]);

  // Animate quote transitions
  useEffect(() => {
    if (!containerRef.current || quotesRef.current.length === 0) return;

    quotesRef.current.forEach((quote, index) => {
      if (quote) {
        if (index === currentIndex) {
          // Animate current quote in
          gsap.fromTo(quote,
            { 
              opacity: 0, 
              scale: 0.9,
              rotationX: -15,
              y: 20
            },
            {
              opacity: 1,
              scale: 1,
              rotationX: 0,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              transformOrigin: "center center"
            }
          );
        } else {
          // Hide other quotes
          gsap.to(quote, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }
    });
  }, [currentIndex]);

  const goToQuote = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'martial-arts': return '🥋';
      case 'philosophy': return '🏛️';
      case 'leadership': return '👑';
      default: return '💬';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'martial-arts': return 'from-red-500 to-orange-500';
      case 'philosophy': return 'from-blue-500 to-purple-500';
      case 'leadership': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main Quote Display */}
      <div className="relative h-80 overflow-hidden rounded-lg">
        {quotes.map((quote, index) => (
          <div
            key={quote.id}
            ref={el => {
              if (el) quotesRef.current[index] = el;
            }}
            className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(quote.category)} rounded-lg shadow-lg p-8 text-white`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1
            }}
          >
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 flex items-center space-x-2">
                <span className="text-lg">{getCategoryIcon(quote.category)}</span>
                <span className="text-sm font-medium capitalize">
                  {quote.category.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Quote Content */}
            <div className="flex flex-col justify-center h-full">
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-6 text-center">
                "{quote.text}"
              </blockquote>
              
              <div className="text-center mb-6">
                <cite className="text-lg text-white text-opacity-90">
                  — {quote.author}
                </cite>
              </div>

              {/* Application */}
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm leading-relaxed">
                  <span className="font-medium">Application: </span>
                  {quote.application}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Previous Button */}
        <button
          onClick={prevQuote}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
        >
          <svg 
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuote(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-martial-gold scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextQuote}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
        >
          <svg 
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Auto-play Indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`text-sm px-3 py-1 rounded-full transition-colors ${
            isAutoPlaying 
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'}
        </button>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="mt-3">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-martial-gold rounded-full transition-all duration-1000 ease-linear"
                 style={{ width: '100%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteCarousel;