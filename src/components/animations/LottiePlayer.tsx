import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onComplete?: () => void;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  loop = true,
  autoplay = true,
  style,
  className,
  onComplete
}) => {
  return (
    <Player
      src={src}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
      onEvent={(event) => {
        if (event === 'complete' && onComplete) {
          onComplete();
        }
      }}
    />
  );
};

export default LottiePlayer;