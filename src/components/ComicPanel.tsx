
import React, { useState, useEffect } from 'react';

interface ComicPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  flippable?: boolean;
  backContent?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  backgroundImage?: string;
  animated?: boolean;
  interactive?: boolean;
  clickEffect?: 'zoom' | 'shake' | 'flash' | 'none';
  borderStyle?: 'normal' | 'jagged' | 'cloud' | 'thick';
  headerColor?: 'blue' | 'pink' | 'orange' | 'green' | 'yellow' | 'purple';
}

const ComicPanel = ({ 
  title, 
  children, 
  className = "", 
  flippable = false,
  backContent,
  onMouseEnter,
  onMouseLeave,
  backgroundImage,
  animated = false,
  interactive = false,
  clickEffect = 'none',
  borderStyle = 'normal',
  headerColor = 'blue'
}: ComicPanelProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleFlip = () => {
    if (flippable) setIsFlipped(!isFlipped);
  };
  
  const handleClick = () => {
    if (interactive && clickEffect !== 'none') {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
  };
  
  // Border style class
  const getBorderClass = () => {
    switch (borderStyle) {
      case 'jagged':
        return 'border-[16px] border-[#000] border-[pattern:linear-gradient(45deg,transparent_25%,currentColor_0,currentColor_50%,transparent_0)]';
      case 'cloud':
        return 'border-[12px] border-comic-border rounded-[30px]';
      case 'thick':
        return 'border-[8px] border-comic-border';
      default:
        return 'border-4 border-comic-border';
    }
  };
  
  // Header color class
  const getHeaderColorClass = () => {
    switch (headerColor) {
      case 'pink': return 'bg-comic-pink text-white';
      case 'orange': return 'bg-comic-orange text-white';
      case 'green': return 'bg-comic-green text-white';
      case 'yellow': return 'bg-comic-yellow text-black';
      case 'purple': return 'bg-comic-purple text-white';
      default: return 'bg-comic-blue text-white';
    }
  };
  
  // Click effect class
  const getClickEffectClass = () => {
    if (!isClicked) return '';
    
    switch (clickEffect) {
      case 'zoom': return 'scale-110';
      case 'shake': return 'animate-shake';
      case 'flash': return 'animate-flash';
      default: return '';
    }
  };
  
  // Animation class
  const getAnimationClass = () => {
    if (!animated) return '';
    return 'animate-float';
  };

  const panelStyle = backgroundImage ? 
    { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : 
    {};

  if (flippable) {
    return (
      <div 
        className={`comic-book-cover ${className} ${getAnimationClass()} ${interactive ? 'cursor-pointer' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={interactive ? handleClick : undefined}
      >
        <div 
          className={`comic-panel comic-book-page ${isFlipped ? 'flipped' : ''} ${getBorderClass()} ${getClickEffectClass()} transition-transform duration-300`} 
          onClick={handleFlip}
          style={panelStyle}
        >
          <h3 className={`comic-panel-header ${getHeaderColorClass()}`}>{title}</h3>
          <div className={backgroundImage ? 'p-4 bg-white/80' : ''}>
            {children}
          </div>
          {flippable && (
            <div className="absolute bottom-2 right-2">
              <span className="font-marker text-xs">Click to flip!</span>
            </div>
          )}
        </div>
        {flippable && backContent && (
          <div 
            className={`comic-panel comic-book-page-back ${getBorderClass()}`}
            onClick={handleFlip}
          >
            {backContent}
            <div className="absolute bottom-2 right-2">
              <span className="font-marker text-xs">Click to flip back!</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`comic-panel ${className} ${getBorderClass()} ${getAnimationClass()} ${getClickEffectClass()} ${interactive ? 'cursor-pointer' : ''} transition-all duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={interactive ? handleClick : undefined}
      style={panelStyle}
    >
      <h3 className={`comic-panel-header ${getHeaderColorClass()}`}>{title}</h3>
      <div className={backgroundImage ? 'p-4 bg-white/80' : ''}>
        {children}
      </div>
    </div>
  );
};

export default ComicPanel;
