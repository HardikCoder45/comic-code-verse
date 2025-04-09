
import React, { useEffect, useState } from 'react';
import SpeechBubble from './SpeechBubble';
import { motion } from 'framer-motion';

interface ComicLoadingProps {
  message?: string;
}

const ComicLoading = ({ message = "Loading comic universe..." }: ComicLoadingProps) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md">
        <SpeechBubble type="speech" color="blue" animated>
          <p className="font-comic text-xl mb-2">{message}{dots}</p>
          <p className="font-comic text-sm">Our comic hero is assembling the panels...</p>
        </SpeechBubble>
        
        <div className="mt-8 flex justify-center">
          <div className="relative w-24 h-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-t-comic-blue border-r-comic-pink border-b-comic-yellow border-l-comic-green rounded-full"
            ></motion.div>
            
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <span className="font-bangers text-2xl text-comic-blue">POW!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicLoading;
