
import React, { useEffect, useState } from 'react';
import SpeechBubble from './SpeechBubble';
import { motion } from 'framer-motion';

interface ComicLoadingProps {
  message?: string;
}

const LoadingImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

const ComicLoading = ({ message = "Loading comic universe..." }: ComicLoadingProps) => {
  const [dots, setDots] = useState('');
  const [randomTip, setRandomTip] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [showStoryPanel, setShowStoryPanel] = useState(false);
  
  const tips = [
    "Try typing 'comic' for a surprise!",
    "Click on icons to see their secrets!",
    "Every panel has a story. Explore them all!",
    "Some skills have hidden tooltips. Hover to discover!",
    "The avatar might have something to tell you!",
    "Double-click on project cards to see a special animation!",
    "Try finding the hidden easter eggs in the navigation bar!",
    "The chatbot has special responses to certain keywords...",
    "Some panels can be dragged around for a different perspective!",
    "There's a secret game hidden somewhere in the projects page..."
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
    
    // Show story panel after delay
    const storyTimer = setTimeout(() => {
      setShowStoryPanel(true);
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
      clearTimeout(storyTimer);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white/90 to-comic-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
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
            className="font-comic text-xl mb-2 text-black"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}{dots}
          </motion.p>
          <p className="font-comic text-sm text-black">Our comic hero is assembling the panels...</p>
        </SpeechBubble>
        
        <div className="mt-8 flex justify-center">
          <div className="relative w-24 h-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-t-comic-blue border-r-comic-pink border-b-comic-yellow border-l-comic-green rounded-full"
            ></motion.div>
            
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <motion.span 
                className="font-bangers text-2xl text-comic-blue"
                animate={{ scale: [1, 1.2, 1], color: ['#3B82F6', '#EC4899', '#3B82F6'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                POW!
              </motion.span>
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
            <p className="font-comic text-sm text-black">💡 Tip: {randomTip}</p>
          </SpeechBubble>
        </motion.div>
        
        <div className="mt-8 flex justify-center space-x-2">
          {LoadingImages.map((_, index) => (
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
        
        {showStoryPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border-2 border-comic-border rounded-lg bg-white p-4 shadow-lg"
          >
            <h3 className="font-bangers text-lg text-comic-purple mb-2">Comic Origin Story</h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-12 h-12 bg-comic-blue rounded-lg overflow-hidden border border-comic-border">
                <motion.div 
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${LoadingImages[0]})` }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full w-3/4 mb-1">
                  <motion.div 
                    className="h-full bg-comic-orange rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <motion.div 
                    className="h-full bg-comic-green rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
            <p className="font-comic text-sm text-black">Assembling creative components and loading innovative features...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComicLoading;
