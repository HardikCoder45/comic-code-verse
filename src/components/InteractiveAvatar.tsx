
import React, { useState, useEffect } from 'react';
import SpeechBubble from './SpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarMessage {
  id: number;
  text: string;
  type: 'speech' | 'thought' | 'shout' | 'whisper';
}

const messages: AvatarMessage[] = [
  { id: 1, text: "Welcome to my comic portfolio! Click around to explore my projects!", type: 'speech' },
  { id: 2, text: "Check out my latest project in the Projects section!", type: 'speech' },
  { id: 3, text: "Want to know more about me? Visit the About page!", type: 'speech' },
  { id: 4, text: "WOAH! Did you just find an Easter egg?", type: 'shout' },
  { id: 5, text: "I know React, JavaScript, and many other technologies...", type: 'thought' },
  { id: 6, text: "psst... try clicking on different parts of the comic panels...", type: 'whisper' },
];

const avatarEmotions = ['neutral', 'happy', 'excited', 'thinking'];

const InteractiveAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState<AvatarMessage>(messages[0]);
  const [emotion, setEmotion] = useState('neutral');
  const [isVisible, setIsVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!isInteracting) {
      const interval = setInterval(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(randomMessage);
        
        const randomEmotion = avatarEmotions[Math.floor(Math.random() * avatarEmotions.length)];
        setEmotion(randomEmotion);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isInteracting]);

  const handleInteraction = () => {
    setIsInteracting(true);
    setEmotion('excited');
    setCurrentMessage({ id: 99, text: "Hey there! Thanks for saying hi! Feel free to explore my portfolio.", type: 'speech' });
    
    setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed right-6 bottom-24 z-50">
      <div className="flex flex-col items-end">
        <button 
          onClick={toggleVisibility}
          className="mb-2 bg-comic-orange text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-black shadow-md hover:bg-comic-pink transition-colors"
        >
          {isVisible ? 'X' : '👤'}
        </button>
        
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="flex flex-col items-end"
            >
              <div className="mb-2">
                <SpeechBubble type={currentMessage.type} color="yellow" position="left" animated>
                  <p className="font-comic">{currentMessage.text}</p>
                </SpeechBubble>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInteraction}
                className="relative cursor-pointer"
              >
                <div className="w-20 h-20 bg-comic-blue rounded-full border-4 border-black overflow-hidden">
                  <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover">
                    {/* Avatar image would go here */}
                  </div>
                </div>
                
                <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-black ${
                  emotion === 'neutral' ? 'bg-gray-300' :
                  emotion === 'happy' ? 'bg-comic-green' :
                  emotion === 'excited' ? 'bg-comic-orange' : 'bg-comic-purple'
                }`}>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveAvatar;
