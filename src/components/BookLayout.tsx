import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSound } from '../contexts/SoundContext';

interface BookLayoutProps {
  children: React.ReactNode;
  isLandingPage?: boolean;
}

const BookLayout: React.FC<BookLayoutProps> = ({ children, isLandingPage = false }) => {
  const { playSound } = useSound();
  const location = useLocation();
  const navigate = useNavigate();
  const bookRef = useRef<HTMLDivElement>(null);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const dragX = useMotionValue(0);
  const rotation = useTransform(dragX, [-300, 0, 300], [25, 0, -25]);
  const pagesOpacity = useTransform(dragX, [-300, -150, 0, 150, 300], [0.6, 0.8, 1, 0.8, 0.6]);
  const pageShadow = useTransform(
    dragX, 
    [-300, -150, 0, 150, 300], 
    [
      "inset 20px 0 30px rgba(0,0,0,0.2), -5px 0 10px rgba(0,0,0,0.1)",
      "inset 10px 0 20px rgba(0,0,0,0.15), -2px 0 5px rgba(0,0,0,0.05)",
      "inset 0 0 10px rgba(0,0,0,0.1)",
      "inset -10px 0 20px rgba(0,0,0,0.15), 2px 0 5px rgba(0,0,0,0.05)",
      "inset -20px 0 30px rgba(0,0,0,0.2), 5px 0 10px rgba(0,0,0,0.1)"
    ]
  );
  
  // Define the navigation order
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
  
  // Navigate to next/previous page
  const goToNextPage = () => {
    if (currentPageIndex < pageOrder.length - 1 && !isPageTurning) {
      setIsPageTurning(true);
      setSwipeDirection('left');
      playSound('pageFlip');
      
      setTimeout(() => {
        navigate(pageOrder[currentPageIndex + 1]);
        setTimeout(() => {
          setIsPageTurning(false);
          setSwipeDirection(null);
        }, 300);
      }, 100);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPageIndex > 0 && !isPageTurning) {
      setIsPageTurning(true);
      setSwipeDirection('right');
      playSound('pageFlip');
      
      setTimeout(() => {
        navigate(pageOrder[currentPageIndex - 1]);
        setTimeout(() => {
          setIsPageTurning(false);
          setSwipeDirection(null);
        }, 300);
      }, 100);
    }
  };
  
  // Reset drag value when location changes
  useEffect(() => {
    dragX.set(0);
    setIsPageTurning(false);
  }, [location.pathname]);

  // Special styles for landing page (book cover)
  if (isLandingPage) {
    return (
      <div className="w-full min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen py-8 px-4 overflow-hidden bg-[#f8f0dc]">
      <div 
        ref={bookRef}
        className="relative w-full max-w-6xl h-[85vh] shadow-2xl rounded-lg bg-white overflow-hidden"
        style={{ 
          perspective: '1500px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Book binding/spine */}
        <div className="absolute left-0 inset-y-0 w-12 bg-comic-blue rounded-l-md shadow-inner z-10 flex items-center justify-center">
          <h2 
            className="font-bangers text-2xl text-white transform rotate-90 whitespace-nowrap tracking-wide"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
          >
            COMIC CODE VERSE
          </h2>
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
        </div>
        
        {/* Left page shadow */}
        <div className="absolute left-12 inset-y-0 w-8 bg-gradient-to-r from-gray-200/50 to-transparent z-0"></div>
        
        {/* Right page shadow */}
        <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-gray-200/50 to-transparent z-0"></div>
        
        {/* Book cover edge */}
        <div className="absolute inset-0 rounded-lg border-8 border-comic-blue pointer-events-none z-20"></div>
        
        {/* Content with page turning effect */}
        <motion.div 
          className="absolute inset-0 ml-12 flex items-center justify-center bg-white overflow-y-auto"
          style={{ 
            rotateY: rotation,
            opacity: pagesOpacity,
            boxShadow: pageShadow,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            borderRadius: '0 0.5rem 0.5rem 0'
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          onDragStart={() => {
            playSound('pageFlip');
            setIsPageTurning(true);
          }}
          onDrag={(e, info) => {
            const threshold = 100;
            
            // Play whoosh sound during fast drags
            if (Math.abs(info.velocity.x) > 500) {
              playSound('whoosh');
            }
            
            // Trigger navigation on sufficient drag distance
            if (info.offset.x > threshold && !swipeDirection) {
              setSwipeDirection('right');
            } else if (info.offset.x < -threshold && !swipeDirection) {
              setSwipeDirection('left');
            }
          }}
          onDragEnd={(e, info) => {
            setIsPageTurning(false);
            
            // Navigation based on drag direction and distance
            const threshold = 100;
            
            if (info.offset.x > threshold) {
              goToPrevPage();
            } else if (info.offset.x < -threshold) {
              goToNextPage();
            } else {
              // Reset drag without transition for next interaction
              setSwipeDirection(null);
              setTimeout(() => {
                dragX.set(0);
              }, 300);
            }
          }}
        >
          {/* Paper texture background */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              backgroundImage: `url('/paper-texture.jpg')`, 
              backgroundSize: 'cover',
              opacity: 0.15,
              mixBlendMode: 'multiply'
            }}
          ></div>
          
          {/* Simulated paper fibers */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), 
                radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 30px 30px',
              backgroundPosition: '0 0, 10px 10px',
              opacity: 0.5
            }}
          ></div>
          
          {/* Page corner fold */}
          <div className="absolute bottom-0 right-0 w-16 h-16" style={{ 
            backgroundImage: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)" 
          }}></div>
          
          {/* Page content */}
          <div className="w-full h-full relative z-10 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Visual page flip effect overlay during page transitions */}
        <AnimatePresence>
          {isPageTurning && (
            <motion.div 
              className="absolute inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-6xl max-h-[80vh] relative" style={{ perspective: '1500px' }}>
                  <motion.div
                    className="absolute inset-0 ml-12 bg-white rounded-r-lg shadow-xl"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: swipeDirection === 'left' ? -90 : 90 }}
                    exit={{ rotateY: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ 
                      transformStyle: 'preserve-3d', 
                      transformOrigin: swipeDirection === 'left' ? 'right center' : 'left center',
                      backgroundImage: `url('/paper-texture.jpg')`,
                      backgroundSize: 'cover',
                      opacity: 0.9
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookLayout; 