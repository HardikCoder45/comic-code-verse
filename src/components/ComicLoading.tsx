
import React, { useEffect, useState } from 'react';
import SpeechBubble from './SpeechBubble';
import { motion } from 'framer-motion';

interface ComicLoadingProps {
  message?: string;
}

const LoadingImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
];

const ComicLoading = ({ message = "Loading comic universe..." }: ComicLoadingProps) => {
  const [dots, setDots] = useState('');
  const [randomTip, setRandomTip] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  
  const tips = [
    "Try typing 'comic' for a surprise!",
    "Click on icons to see their secrets!",
    "Every panel has a story. Explore them all!",
    "Some skills have hidden tooltips. Hover to discover!",
    "The avatar might have something to tell you!"
  ];
  
  useEffect(() => {
    // Dots animation
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    // Random tip
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    
    // Image rotation
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % LoadingImages.length);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-comic-border overflow-hidden">
          <motion.div 
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${LoadingImages[currentImage]})` }}
          />
        </div>
        
        <SpeechBubble type="speech" color="blue" animated>
          <motion.p 
            className="font-comic text-xl mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}{dots}
          </motion.p>
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
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 text-center"
        >
          <SpeechBubble type="thought" color="pink" position="top" className="inline-block">
            <p className="font-comic text-sm">💡 Tip: {randomTip}</p>
          </SpeechBubble>
        </motion.div>
        
        <div className="mt-8 flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div 
              key={index}
              animate={{ 
                scale: currentImage === index ? [1, 1.2, 1] : 1,
                opacity: currentImage === index ? 1 : 0.5
              }}
              transition={{ duration: 0.5 }}
              className="w-3 h-3 rounded-full bg-comic-blue"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicLoading;
