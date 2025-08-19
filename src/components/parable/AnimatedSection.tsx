import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'flip';
  delay?: number;
  duration?: number;
  stagger?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fade',
  delay = 0,
  duration = 0.8,
  stagger = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const childElements = stagger > 0 ? Array.from(element.children) : [element];

    // Set initial states based on animation type
    const getInitialState = () => {
      switch (animationType) {
        case 'fade':
          return { opacity: 0 };
        case 'slideUp':
          return { opacity: 0, y: 50 };
        case 'slideLeft':
          return { opacity: 0, x: -50 };
        case 'slideRight':
          return { opacity: 0, x: 50 };
        case 'scale':
          return { opacity: 0, scale: 0.8 };
        case 'flip':
          return { opacity: 0, rotationY: -90, transformOrigin: "center center" };
        default:
          return { opacity: 0 };
      }
    };

    // Set final states
    const getFinalState = () => {
      switch (animationType) {
        case 'fade':
          return { opacity: 1 };
        case 'slideUp':
          return { opacity: 1, y: 0 };
        case 'slideLeft':
          return { opacity: 1, x: 0 };
        case 'slideRight':
          return { opacity: 1, x: 0 };
        case 'scale':
          return { opacity: 1, scale: 1 };
        case 'flip':
          return { opacity: 1, rotationY: 0 };
        default:
          return { opacity: 1 };
      }
    };

    // Set initial state
    gsap.set(childElements, getInitialState());

    // Create animation
    const animation = gsap.to(childElements, {
      ...getFinalState(),
      duration,
      ease: animationType === 'flip' ? "back.out(1.7)" : "power2.out",
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        once: false
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationType, delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;