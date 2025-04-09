
import React from 'react';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  color?: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  animated?: boolean;
  level?: number;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SkillBadge = ({ 
  name, 
  color = 'blue',
  animated = true,
  level,
  size = 'md',
  icon,
  onClick
}: SkillBadgeProps) => {
  const colorMap = {
    blue: 'bg-comic-blue',
    pink: 'bg-comic-pink',
    yellow: 'bg-comic-yellow',
    orange: 'bg-comic-orange',
    green: 'bg-comic-green',
    purple: 'bg-comic-purple'
  };
  
  const sizeMap = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };
  
  const animationMap = {
    true: 'animate-float',
    false: ''
  };
  
  return (
    <span 
      className={cn(
        'skill-badge',
        colorMap[color],
        'text-white',
        sizeMap[size],
        animationMap[String(animated) as 'true' | 'false'],
        'font-comic font-bold rounded-full inline-flex items-center justify-center',
        'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : '',
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {name}
      {level && 
        <span className="ml-1 flex space-x-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`inline-block w-1.5 h-1.5 rounded-full ${i < level ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </span>
      }
    </span>
  );
};

export default SkillBadge;
