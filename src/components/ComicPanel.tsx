
import React, { useState } from 'react';

interface ComicPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  flippable?: boolean;
  backContent?: React.ReactNode;
}

const ComicPanel = ({ 
  title, 
  children, 
  className = "", 
  flippable = false,
  backContent
}: ComicPanelProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (flippable) setIsFlipped(!isFlipped);
  };

  if (flippable) {
    return (
      <div className={`comic-book-cover ${className}`}>
        <div 
          className={`comic-panel comic-book-page ${isFlipped ? 'flipped' : ''}`} 
          onClick={handleFlip}
        >
          <h3 className="comic-panel-header">{title}</h3>
          {children}
          {flippable && (
            <div className="absolute bottom-2 right-2">
              <span className="font-marker text-xs">Click to flip!</span>
            </div>
          )}
        </div>
        {flippable && backContent && (
          <div 
            className="comic-panel comic-book-page-back" 
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
    <div className={`comic-panel ${className}`}>
      <h3 className="comic-panel-header">{title}</h3>
      {children}
    </div>
  );
};

export default ComicPanel;
