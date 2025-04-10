
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface ComicBookPageProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  onPageTurn?: (pageNumber: number) => void;
}

const ComicBookPage = ({ 
  frontContent, 
  backContent, 
  pageNumber, 
  totalPages,
  onPageTurn 
}: ComicBookPageProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Motion values for the page flip animation
  const flipProgress = useMotionValue(0);
  const pageRotate = useTransform(flipProgress, [0, 1], [0, -180]);
  const frontOpacity = useTransform(flipProgress, [0, 0.5, 0.5, 1], [1, 0, 0, 0]);
  const backOpacity = useTransform(flipProgress, [0, 0.5, 0.5, 1], [0, 0, 1, 1]);
  const pageShadow = useTransform(
    flipProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [
      "0px 0px 0px rgba(0, 0, 0, 0.0)",
      "20px 0px 20px rgba(0, 0, 0, 0.1)",
      "0px 0px 0px rgba(0, 0, 0, 0.0)",
      "-20px 0px 20px rgba(0, 0, 0, 0.1)",
      "0px 0px 0px rgba(0, 0, 0, 0.0)"
    ]
  );
  const pageZIndex = useTransform(
    flipProgress,
    [0, 0.5, 0.5, 1],
    [totalPages - pageNumber, totalPages + 50, totalPages + 50, pageNumber]
  );
  
  const handleFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Flip animation
    const flipDuration = 1.2;
    const targetValue = hasFlipped ? 0 : 1;
    
    const animation = {
      type: 'spring',
      stiffness: 60,
      damping: 15,
      duration: flipDuration
    };
    
    flipProgress.set(hasFlipped ? 1 : 0);
    flipProgress.animate(targetValue, animation).then(() => {
      setHasFlipped(!hasFlipped);
      setIsFlipping(false);
      if (onPageTurn) {
        onPageTurn(pageNumber);
      }
    });
  };
  
  return (
    <div 
      className="absolute w-full h-full"
      style={{ 
        perspective: '2000px',
        transformStyle: 'preserve-3d',
        zIndex: pageZIndex.get()
      }}
    >
      <motion.div
        ref={pageRef}
        className="absolute w-full h-full origin-left"
        style={{
          rotateY: pageRotate,
          boxShadow: pageShadow,
          zIndex: pageZIndex,
          transformStyle: 'preserve-3d'
        }}
        onClick={handleFlip}
      >
        {/* Front of page */}
        <motion.div
          className="absolute w-full h-full bg-white border-r-2 border-comic-border overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            opacity: frontOpacity
          }}
        >
          <div className="absolute top-2 right-4 font-comic text-sm text-gray-500">
            Page {pageNumber} of {totalPages}
          </div>
          <div className="p-6 flex flex-col h-full">
            {frontContent}
          </div>
          
          {/* Page corner fold */}
          <div 
            className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent via-transparent to-gray-200 cursor-pointer"
            style={{ 
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              zIndex: 10
            }}
            onClick={handleFlip}
          >
            <div className="absolute bottom-6 right-6 text-xs font-comic text-gray-500 rotate-45">
              Flip
            </div>
          </div>
        </motion.div>
        
        {/* Back of page */}
        <motion.div
          className="absolute w-full h-full bg-white border-l-2 border-comic-border overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            opacity: backOpacity,
            rotateY: 180,
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="absolute top-2 left-4 font-comic text-sm text-gray-500">
            Page {pageNumber + 1} of {totalPages}
          </div>
          <div className="p-6 flex flex-col h-full">
            {backContent}
          </div>
          
          {/* Page corner fold */}
          <div 
            className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-bl from-transparent via-transparent to-gray-200 cursor-pointer"
            style={{ 
              clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
              zIndex: 10
            }}
            onClick={handleFlip}
          >
            <div className="absolute bottom-6 left-6 text-xs font-comic text-gray-500 -rotate-45">
              Flip
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComicBookPage;
