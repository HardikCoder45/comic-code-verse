
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { motion, AnimatePresence } from 'framer-motion';

const PageSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound } = useSoundEffects();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  // Define the order of pages for navigation
  const pageOrder = [
    '/home',
    '/projects',
    '/about',
    '/skills',
    '/timeline',
    '/code-samples',
    '/game',
    '/resume',
    '/dna',
    '/contact'
  ];

  // Get current page index
  const currentPageIndex = pageOrder.indexOf(location.pathname);

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPageIndex < pageOrder.length - 1) {
      playSound('whoosh');
      navigate(pageOrder[currentPageIndex + 1]);
    }
  };

  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      playSound('whoosh');
      navigate(pageOrder[currentPageIndex - 1]);
    }
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const diff = touchStartX - touchEndX;
    const threshold = 100; // Minimum swipe distance
    
    if (diff > threshold) {
      // Swiped left
      goToNextPage();
    } else if (diff < -threshold) {
      // Swiped right
      goToPrevPage();
    }
    
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Handle mouse drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStartX) return;
    
    const currentX = e.clientX;
    const diff = touchStartX - currentX;
    
    if (diff > 50) {
      setDragDirection('left');
    } else if (diff < -50) {
      setDragDirection('right');
    } else {
      setDragDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragDirection) {
      if (dragDirection === 'left') {
        goToNextPage();
      } else if (dragDirection === 'right') {
        goToPrevPage();
      }
    }
    
    setIsDragging(false);
    setDragDirection(null);
    setTouchStartX(null);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  // Don't show on landing page
  if (location.pathname === '/') {
    return null;
  }

  // Navigation arrow animations
  const arrowVariants = {
    initial: { opacity: 0.5, scale: 0.9 },
    hover: { opacity: 1, scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Page sliding indicators */}
      <AnimatePresence>
        {isDragging && dragDirection === 'left' && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.7, x: 20 }}
            exit={{ opacity: 0, x: 0 }}
            className="fixed top-1/2 right-0 -translate-y-1/2 bg-comic-blue text-white p-4 rounded-l-lg"
          >
            <ArrowRight size={40} />
          </motion.div>
        )}
        
        {isDragging && dragDirection === 'right' && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.7, x: -20 }}
            exit={{ opacity: 0, x: 0 }}
            className="fixed top-1/2 left-0 -translate-y-1/2 bg-comic-blue text-white p-4 rounded-r-lg"
          >
            <ArrowLeft size={40} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Left arrow */}
      {currentPageIndex > 0 && (
        <motion.div
          className="fixed left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto"
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={arrowVariants}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-comic-blue border-2 border-comic-blue"
            onClick={goToPrevPage}
            onMouseEnter={() => playSound('hover')}
          >
            <ArrowLeft size={24} />
          </Button>
        </motion.div>
      )}
      
      {/* Right arrow */}
      {currentPageIndex < pageOrder.length - 1 && (
        <motion.div
          className="fixed right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto"
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={arrowVariants}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-comic-blue border-2 border-comic-blue"
            onClick={goToNextPage}
            onMouseEnter={() => playSound('hover')}
          >
            <ArrowRight size={24} />
          </Button>
        </motion.div>
      )}
      
      {/* Page indicator dots */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-auto">
        {pageOrder.map((path, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPageIndex
                ? 'bg-comic-blue w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => {
              playSound('click');
              navigate(path);
            }}
            onMouseEnter={() => playSound('hover')}
          />
        ))}
      </div>
    </div>
  );
};

export default PageSlider;
