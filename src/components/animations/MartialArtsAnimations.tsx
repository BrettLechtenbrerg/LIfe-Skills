import React from 'react';
import LottiePlayer from './LottiePlayer';

// Martial Arts Character Animation
export const MartialArtsCharacter: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json"
      className={className || "w-32 h-32"}
      loop={true}
      autoplay={true}
    />
  );
};

// Success/Achievement Animation
export const SuccessAnimation: React.FC<{ 
  className?: string; 
  onComplete?: () => void;
}> = ({ className, onComplete }) => {
  return (
    <LottiePlayer
      src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
      className={className || "w-24 h-24"}
      loop={false}
      autoplay={true}
      onComplete={onComplete}
    />
  );
};

// Progress/Growth Animation
export const ProgressAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets10.lottiefiles.com/packages/lf20_khtt8hpd.json"
      className={className || "w-20 h-20"}
      loop={true}
      autoplay={true}
    />
  );
};

// Meditation/Focus Animation
export const MeditationAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets4.lottiefiles.com/packages/lf20_28w91e7a.json"
      className={className || "w-28 h-28"}
      loop={true}
      autoplay={true}
    />
  );
};

// Loading Animation
export const LoadingAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets7.lottiefiles.com/packages/lf20_szlzzfaa.json"
      className={className || "w-16 h-16"}
      loop={true}
      autoplay={true}
    />
  );
};

// Trophy/Award Animation
export const TrophyAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets1.lottiefiles.com/packages/lf20_0lw8lwdl.json"
      className={className || "w-20 h-20"}
      loop={true}
      autoplay={true}
    />
  );
};

// Book/Learning Animation
export const BookAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets3.lottiefiles.com/packages/lf20_1a8dx7zj.json"
      className={className || "w-24 h-24"}
      loop={true}
      autoplay={true}
    />
  );
};

// Target/Goal Animation
export const TargetAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <LottiePlayer
      src="https://assets8.lottiefiles.com/packages/lf20_dmw2fksi.json"
      className={className || "w-24 h-24"}
      loop={true}
      autoplay={true}
    />
  );
};