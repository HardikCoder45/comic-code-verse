
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechBubble from './SpeechBubble';
import { ZapIcon, Sparkles, Star, Code } from 'lucide-react';

interface EasterEggProps {
  type: 'joke' | 'game' | 'animation' | 'quote';
  trigger: 'click' | 'hover';
  children: React.ReactNode;
  content: React.ReactNode;
}

const EasterEgg = ({ type, trigger, children, content }: EasterEggProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const handleTrigger = () => {
    if (trigger === 'click') {
      setIsRevealed(!isRevealed);
    }
  };
  
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsRevealed(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsRevealed(false);
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'joke':
        return <Star className="text-comic-yellow" />;
      case 'game':
        return <Sparkles className="text-comic-pink" />;
      case 'animation':
        return <ZapIcon className="text-comic-orange" />;
      case 'quote':
        return <Code className="text-comic-blue" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative inline-block"
      onClick={handleTrigger}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer relative">
        {children}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-comic-orange rounded-full border border-black flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-white text-xs">!</span>
        </div>
      </div>
      
      <AnimatePresence>
        {isRevealed && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute z-30 top-full left-1/2 transform -translate-x-1/2 mt-2 w-max max-w-xs"
          >
            <SpeechBubble type="speech" color="yellow" position="top" className="p-3">
              <div className="flex items-center">
                <div className="mr-2">
                  {getIcon()}
                </div>
                <div className="font-comic">
                  {content}
                </div>
              </div>
            </SpeechBubble>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EasterEgg;
