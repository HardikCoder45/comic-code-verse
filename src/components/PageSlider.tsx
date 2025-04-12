import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import { motion, useAnimation, PanInfo } from 'framer-motion';

const PageSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound } = useSound();
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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

  // Navigate to next page with page flip effect
  const goToNextPage = () => {
    if (currentPageIndex < pageOrder.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setSwipeDirection('left');
      playSound('pageFlip');
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate(pageOrder[currentPageIndex + 1]);
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 300);
      }, 100);
    }
  };

  // Navigate to previous page with page flip effect
  const goToPrevPage = () => {
    if (currentPageIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSwipeDirection('right');
      playSound('pageFlip');
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate(pageOrder[currentPageIndex - 1]);
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 300);
      }, 100);
    }
  };

  // Handle drag end for navigation
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimating) return;
    
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      goToPrevPage();
    } else if (info.offset.x < -threshold) {
      goToNextPage();
    }
    
    setIsDragging(false);
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
  }, [location.pathname, isAnimating]);

  // Play transition sound when navigation changes
  useEffect(() => {
    playSound('transition');
  }, [location.pathname]);

  // Don't show on landing page
  if (location.pathname === '/') {
    return null;
  }

  // Determine if next/prev buttons should be visible
  const showPrevButton = currentPageIndex > 0;
  const showNextButton = currentPageIndex < pageOrder.length - 1;

  return (
    <div ref={containerRef} className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center space-x-4">
      {/* Smaller, more subtle navigation buttons at the bottom */}
      {showPrevButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevPage}
          className="w-10 h-10 rounded-full bg-white/80 shadow-md hover:bg-white transition-all border-2 border-comic-border"
          disabled={isAnimating}
        >
          <ArrowLeft className="h-5 w-5 text-comic-blue" />
        </Button>
      )}
      
      {/* Page indicator dots */}
      <div className="flex space-x-1">
        {pageOrder.map((path, index) => (
          <motion.button
            key={path}
            onClick={() => {
              if (!isAnimating && path !== location.pathname) {
                setIsAnimating(true);
                setSwipeDirection(index > currentPageIndex ? 'left' : 'right');
                playSound('pageFlip');
                
                setTimeout(() => {
                  navigate(path);
                  setTimeout(() => {
                    setIsAnimating(false);
                    setSwipeDirection(null);
                  }, 300);
                }, 100);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              path === location.pathname
                ? 'bg-comic-blue w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
          />
        ))}
      </div>
      
      {showNextButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextPage}
          className="w-10 h-10 rounded-full bg-white/80 shadow-md hover:bg-white transition-all border-2 border-comic-border"
          disabled={isAnimating}
        >
          <ArrowRight className="h-5 w-5 text-comic-blue" />
        </Button>
      )}
    </div>
  );
};

export default PageSlider;
