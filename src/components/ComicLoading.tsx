
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

interface ComicLoadingProps {
  message?: string;
}

const ComicLoading = ({ message = "Loading..." }: ComicLoadingProps) => {
 
  useEffect(() => {
    // Play page flip sound when component mounts
 
  }, []);

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md text-center perspective-1000">
        <motion.div 
          className="w-64 h-80 mx-auto mb-4 relative book-container"
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: [0, -180, -360, -540, -720, -900, -1080], 
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut",
            times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
            repeat: Infinity
          }}
          onAnimationIteration={() => {
            playSound('pageFlip');
          }}
        >
          {/* Book covers and pages */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 page bg-white border-2 border-comic-border rounded-r-md shadow-md ${i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transformOrigin: 'left center',
                zIndex: 10 - i,
                transform: `rotateY(${i * 0.2}deg) translateZ(${i * 0.5}px)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-comic text-lg font-bold text-comic-blue rotate-1">
                  {i === 0 ? message : `Loading...${'.'.repeat(i % 4)}`}
                </p>
              </div>
              
              {/* Page corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12" style={{ 
                backgroundImage: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)" 
              }}></div>
            </motion.div>
          ))}

          {/* Book spine */}
          <div className="absolute left-0 inset-y-0 w-4 bg-comic-blue rounded-l-sm z-0"></div>
        </motion.div>
        
        <motion.p 
          className="font-comic text-lg text-comic-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Flipping through the pages...
        </motion.p>
      </div>

      <style >{`jsx
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .book-container {
          transform-style: preserve-3d;
        }
        
        .page {
          transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      `}</style>
    </div>
  );
};

export default ComicLoading;
