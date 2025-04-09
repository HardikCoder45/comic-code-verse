
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  children: React.ReactNode;
  type?: 'speech' | 'thought' | 'shout' | 'whisper';
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  color?: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple' | 'white';
  animated?: boolean;
  interactive?: boolean;
  onHover?: () => void;
  onClick?: () => void;
  hoverEffect?: 'grow' | 'bounce' | 'shake' | 'glow';
  icon?: React.ReactNode;
}

const SpeechBubble = ({ 
  children, 
  type = 'speech',
  position = 'left', 
  className = "",
  color = 'white',
  animated = false,
  interactive = false,
  onHover,
  onClick,
  hoverEffect = 'grow',
  icon
}: SpeechBubbleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Map hover effect to class
  const hoverEffectClassMap = {
    'grow': 'hover:scale-105',
    'bounce': 'hover:animate-bounce',
    'shake': 'hover:animate-shake',
    'glow': 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]'
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const bubbleClass = typeClassMap[type] || 'speech-bubble';
  const positionClass = positionClassMap[position] || 'bubble-left';
  const colorClass = colorClassMap[color] || 'bg-white text-black';
  const animationClass = animated ? 'animate-pop' : '';
  const interactiveClass = interactive ? `cursor-pointer ${hoverEffectClassMap[hoverEffect] || ''}` : '';
  
  return (
    <div 
      className={cn(
        bubbleClass, 
        positionClass, 
        colorClass,
        animationClass,
        interactiveClass,
        isHovered && 'scale-105',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {icon && <div className="float-left mr-2">{icon}</div>}
      {children}
    </div>
  );
};

export default SpeechBubble;
