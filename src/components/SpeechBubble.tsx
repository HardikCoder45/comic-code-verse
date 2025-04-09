
import React from 'react';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  children: React.ReactNode;
  type?: 'speech' | 'thought' | 'shout' | 'whisper';
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  color?: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple' | 'white';
  animated?: boolean;
}

const SpeechBubble = ({ 
  children, 
  type = 'speech',
  position = 'left', 
  className = "",
  color = 'white',
  animated = false
}: SpeechBubbleProps) => {
  // Map type to class
  const typeClassMap = {
    'speech': 'speech-bubble',
    'thought': 'thought-bubble',
    'shout': 'shout-bubble',
    'whisper': 'whisper-bubble'
  };
  
  // Map position to class
  const positionClassMap = {
    'left': 'bubble-left',
    'right': 'bubble-right',
    'top': 'bubble-top',
    'bottom': 'bubble-bottom'
  };
  
  // Map color to class
  const colorClassMap = {
    'blue': 'bg-comic-blue text-white',
    'pink': 'bg-comic-pink text-white',
    'yellow': 'bg-comic-yellow text-black',
    'orange': 'bg-comic-orange text-white',
    'green': 'bg-comic-green text-white',
    'purple': 'bg-comic-purple text-white',
    'white': 'bg-white text-black'
  };
  
  const bubbleClass = typeClassMap[type] || 'speech-bubble';
  const positionClass = positionClassMap[position] || 'bubble-left';
  const colorClass = colorClassMap[color] || 'bg-white text-black';
  const animationClass = animated ? 'animate-pop' : '';
  
  return (
    <div className={cn(
      bubbleClass, 
      positionClass, 
      colorClass,
      animationClass,
      className
    )}>
      {children}
    </div>
  );
};

export default SpeechBubble;
