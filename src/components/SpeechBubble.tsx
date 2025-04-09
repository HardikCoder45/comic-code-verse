
import React from 'react';

interface SpeechBubbleProps {
  children: React.ReactNode;
  type?: 'speech' | 'thought';
  position?: 'left' | 'right';
  className?: string;
}

const SpeechBubble = ({ 
  children, 
  type = 'speech',
  position = 'left', 
  className = "" 
}: SpeechBubbleProps) => {
  const bubbleClass = type === 'speech' ? 'speech-bubble' : 'thought-bubble';
  const positionClass = position === 'right' ? 'speech-bubble-right' : '';
  
  return (
    <div className={`${bubbleClass} ${positionClass} ${className}`}>
      {children}
    </div>
  );
};

export default SpeechBubble;
