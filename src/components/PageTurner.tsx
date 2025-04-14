
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

interface PageTurnerProps {
  children: React.ReactNode;
  onPageTurn?: (direction: 'next' | 'prev') => void;
  pageNumber?: number;
  totalPages?: number;
}

const PageTurner: React.FC<PageTurnerProps> = ({ 
  children, 
  onPageTurn,
  pageNumber = 1,
  totalPages = 1
}) => {
  const { playSound } = useSound();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-300, 0, 300], [45, 0, -45]);
  const pageOpacity = useTransform(dragX, [-300, -100, 0, 100, 300], [0.5, 0.8, 1, 0.8, 0.5]);
  const pageShadow = useTransform(
    dragX,
    [-300, -100, 0, 100, 300],
    [
      '15px 5px 50px rgba(0,0,0,0.5)',
      '5px 2px 20px rgba(0,0,0,0.3)',
      '0px 0px 0px rgba(0,0,0,0.0)',
      '-5px 2px 20px rgba(0,0,0,0.3)',
      '-15px 5px 50px rgba(0,0,0,0.5)'
    ]
  );
  
  // Paper texture effect
  const paperTexture = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E";
  
  const handleDragStart = () => {
    setIsDragging(true);
    playSound('pageFlip');
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    setIsDragging(false);
    
    // Detect drag direction and magnitude to determine if page should turn
    if (info.offset.x > 100 && !isTurning) {
      turnPage('prev');
    } else if (info.offset.x < -100 && !isTurning) {
      turnPage('next');
    } else {
      // Reset if not turning page
      dragX.set(0);
    }
  };
  
  const turnPage = (direction: 'next' | 'prev') => {
    if (isTurning) return;
    
    setIsTurning(true);
    setDirection(direction === 'next' ? 'left' : 'right');
    playSound('pageFlip');
    
    // Animate page turn
    dragX.set(direction === 'next' ? -300 : 300);
    
    // Call callback after animation
    setTimeout(() => {
      if (onPageTurn) {
        onPageTurn(direction);
      }
      
      // Reset after turning
      setTimeout(() => {
        setIsTurning(false);
        setDirection(null);
        dragX.set(0);
      }, 300);
    }, 300);
  };
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        turnPage('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        turnPage('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTurning]);
  
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ perspective: '1500px' }}>
      {/* Page number indicator */}
      {pageNumber && totalPages > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 bg-white/80 px-2 py-1 rounded-full text-xs font-comic text-gray-600">
          Page {pageNumber} of {totalPages}
        </div>
      )}
      
      {/* Main page content with 3D turn effect */}
      <motion.div
        ref={pageRef}
        className="w-full h-full bg-white rounded-lg"
        style={{
          rotateY: rotate,
          opacity: pageOpacity,
          boxShadow: pageShadow,
          backgroundImage: `url("${paperTexture}")`,
          transformStyle: 'preserve-3d',
          transformOrigin: direction === 'left' ? 'left center' : 'right center'
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
      >
        {/* Corner fold effect */}
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div 
            className="w-full h-full" 
            style={{ 
              backgroundImage: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)" 
            }}
          />
        </div>
        
        {/* Page content */}
        <div className="w-full h-full p-6 overflow-auto">
          {children}
        </div>
      </motion.div>
      
      {/* Page turn visual effect overlay */}
      <AnimatePresence>
        {isTurning && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20 bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full h-full relative">
              <motion.div 
                className="absolute inset-0 bg-white rounded-lg shadow-2xl"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: direction === 'left' ? -90 : 90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: direction === 'left' ? 'left center' : 'right center',
                  backgroundImage: `url("${paperTexture}")` 
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation arrows */}
      {totalPages > 1 && (
        <>
          {pageNumber > 1 && (
            <motion.button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md border border-gray-200"
              whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => turnPage('prev')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          )}
          
          {pageNumber < totalPages && (
            <motion.button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md border border-gray-200"
              whileHover={{ scale: 1.1, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => turnPage('next')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          )}
        </>
      )}
      
      {/* Drag hint */}
      <div className="absolute bottom-4 right-4 z-30">
        <motion.div 
          className="text-xs text-gray-400 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span>Drag to turn page</span>
          <motion.div 
            className="ml-1 w-5 h-5"
            animate={{ 
              x: [0, 5, 0, -5, 0],
              opacity: [1, 0.8, 0.6, 0.8, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M3 10h6"></path>
              <path d="M15 10h6"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageTurner;
