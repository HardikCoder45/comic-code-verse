
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

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
  const [isDragging, setIsDragging] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();
  
  // Motion values for the page flip animation
  const flipProgress = useMotionValue(0);
  const pageControls = useAnimation();
  
  // Transform values for the 3D effect
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
  const pageZIndex = useMotionValue(totalPages - pageNumber);
  
  // Sound effect timings
  useEffect(() => {
    const unsubscribe = flipProgress.onChange(value => {
      // Play page crinkling sound during drag
      if (isDragging) {
        if (value % 0.25 < 0.05) {
          playSound('pageFlip');
        }
      }
    });
    
    return () => unsubscribe();
  }, [isDragging, flipProgress]);
  
  const handleFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    playSound('pageFlip');
    
    // Flip animation
    const flipDuration = 1.2;
    const nextValue = hasFlipped ? 0 : 1;
    
    pageControls.start({
      rotateY: hasFlipped ? 0 : -180,
      transition: { 
        duration: flipDuration,
        ease: "easeInOut" 
      }
    });
    
    // Create a simple animation function
    const startTime = Date.now();
    const startValue = hasFlipped ? 1 : 0;
    const endValue = hasFlipped ? 0 : 1;
    
    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const duration = flipDuration * 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Simple easing function
      const easedProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      const newValue = startValue + (endValue - startValue) * easedProgress;
      
      flipProgress.set(newValue);
      
      // Update zIndex halfway through the animation
      if (progress > 0.5 && !hasFlipped) {
        pageZIndex.set(pageNumber);
      } else if (progress > 0.5 && hasFlipped) {
        pageZIndex.set(totalPages - pageNumber);
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setHasFlipped(!hasFlipped);
        setIsFlipping(false);
        if (onPageTurn) {
          onPageTurn(pageNumber);
        }
      }
    };
    
    requestAnimationFrame(updateValue);
  };
  
  // Drag-to-flip functionality
  const handleDragStart = () => {
    if (isFlipping) return;
    setIsDragging(true);
    playSound('whoosh');
  };
  
  const handleDragEnd = (info: any) => {
    setIsDragging(false);
    
    const threshold = 0.3;
    const currentValue = flipProgress.get();
    
    if (hasFlipped) {
      // If already flipped
      if (currentValue < 0.7) {
        handleFlip(); // Flip back
      } else {
        // Reset to fully flipped
        pageControls.start({
          rotateY: -180,
          transition: { duration: 0.3, ease: "easeOut" }
        });
        flipProgress.set(1);
      }
    } else {
      // If not flipped yet
      if (currentValue > threshold) {
        handleFlip(); // Complete the flip
      } else {
        // Reset to not flipped
        pageControls.start({
          rotateY: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        });
        flipProgress.set(0);
      }
    }
  };
  
  const handleDrag = (event: any, info: any) => {
    if (isFlipping) return;
    
    // Calculate drag progress based on horizontal movement
    const dragX = info.offset.x;
    const maxDrag = 200; // Maximum drag distance for a full flip
    
    let progress;
    if (hasFlipped) {
      // If already flipped, reverse the progress calculation
      progress = 1 - Math.min(Math.max(dragX / maxDrag, 0), 1);
    } else {
      progress = Math.min(Math.max(-dragX / maxDrag, 0), 1);
    }
    
    flipProgress.set(progress);
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
        className="absolute w-full h-full origin-left cursor-pointer"
        style={{
          rotateY: pageRotate,
          boxShadow: pageShadow,
          zIndex: pageZIndex,
          transformStyle: 'preserve-3d'
        }}
        animate={pageControls}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={() => !isDragging && handleFlip()}
        whileHover={{ scale: 1.01 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        {/* Front of page */}
        <motion.div
          className="absolute w-full h-full bg-white border-r-2 border-comic-border overflow-hidden rounded-r-md"
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
          <motion.div 
            className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent via-transparent to-gray-200 cursor-pointer"
            style={{ 
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              zIndex: 10
            }}
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
            onHoverStart={() => playSound('hover')}
          >
            <div className="absolute bottom-6 right-6 text-xs font-comic text-gray-500 rotate-45">
              Flip
            </div>
          </motion.div>
        </motion.div>
        
        {/* Back of page */}
        <motion.div
          className="absolute w-full h-full bg-white border-l-2 border-comic-border overflow-hidden rounded-l-md"
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
          <motion.div 
            className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-bl from-transparent via-transparent to-gray-200 cursor-pointer"
            style={{ 
              clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
              zIndex: 10
            }}
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
            onHoverStart={() => playSound('hover')}
          >
            <div className="absolute bottom-6 left-6 text-xs font-comic text-gray-500 -rotate-45">
              Flip
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Page turn effect - shadow that follows the page */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        style={{
          opacity: useTransform(flipProgress, [0, 0.5, 1], [0, 0.5, 0]),
          background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0))',
          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          transformOrigin: 'left center',
          transform: `translateZ(0.1px)`
        }}
      />
    </div>
  );
};

export default ComicBookPage;
