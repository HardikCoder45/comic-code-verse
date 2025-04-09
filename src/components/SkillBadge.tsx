
import React from 'react';

interface SkillBadgeProps {
  name: string;
  color?: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  animated?: boolean;
}

const SkillBadge = ({ 
  name, 
  color = 'blue',
  animated = true
}: SkillBadgeProps) => {
  const colorMap = {
    blue: 'bg-comic-blue',
    pink: 'bg-comic-pink',
    yellow: 'bg-comic-yellow',
    orange: 'bg-comic-orange',
    green: 'bg-comic-green',
    purple: 'bg-comic-purple'
  };
  
  const animationClass = animated ? 'animate-float' : '';
  
  return (
    <span className={`skill-badge ${colorMap[color]} text-white ${animationClass}`}>
      {name}
    </span>
  );
};

export default SkillBadge;
