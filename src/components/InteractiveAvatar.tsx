import React, { useState, useEffect } from 'react';
import SpeechBubble from './SpeechBubble';
import { motion, AnimatePresence } from 'framer-motion';
import EasterEgg from './EasterEgg';
import { Code, Github, Star, Coffee, Lightbulb, Rocket } from 'lucide-react';
interface AvatarMessage {
  id: number;
  text: string;
  type: 'speech' | 'thought' | 'shout' | 'whisper';
  icon?: React.ReactNode;
}
const avatarImages = ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
// Placeholder, replace with actual avatar images
"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", "https://images.unsplash.com/photo-1426604966848-d7adac402bff"];
const messages: AvatarMessage[] = [{
  id: 1,
  text: "Welcome to my comic portfolio! Click around to explore my projects!",
  type: 'speech',
  icon: <Star className="text-comic-yellow" />
}, {
  id: 2,
  text: "Check out my latest project in the Projects section!",
  type: 'speech',
  icon: <Code className="text-comic-blue" />
}, {
  id: 3,
  text: "Want to know more about me? Visit the About page!",
  type: 'speech',
  icon: <Github className="text-comic-purple" />
}, {
  id: 4,
  text: "WOAH! Did you just find an Easter egg?",
  type: 'shout',
  icon: <Rocket className="text-comic-orange" />
}, {
  id: 5,
  text: "I know React, JavaScript, and many other technologies...",
  type: 'thought',
  icon: <Lightbulb className="text-comic-yellow" />
}, {
  id: 6,
  text: "psst... try clicking on different parts of the comic panels...",
  type: 'whisper',
  icon: <Coffee className="text-comic-orange" />
}];
const avatarEmotions = ['neutral', 'happy', 'excited', 'thinking', 'surprised', 'curious'];
const InteractiveAvatar = () => {
  const [currentMessage, setCurrentMessage] = useState<AvatarMessage>(messages[0]);
  const [emotion, setEmotion] = useState('neutral');
  const [isVisible, setIsVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showEmotionSelector, setShowEmotionSelector] = useState(false);
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
    setCurrentMessage({
      id: 99,
      text: "Hey there! Thanks for saying hi! Feel free to explore my portfolio. Did you know there are secret Easter eggs hidden throughout the site?",
      type: 'speech',
      icon: <Star className="text-comic-yellow" />
    });
    setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const changeAvatar = () => {
    setAvatarIndex(prev => (prev + 1) % avatarImages.length);
  };
  const toggleEmotionSelector = () => {
    setShowEmotionSelector(!showEmotionSelector);
  };
  const setSpecificEmotion = (newEmotion: string) => {
    setEmotion(newEmotion);
    setShowEmotionSelector(false);

    // Set a corresponding message for this emotion
    switch (newEmotion) {
      case 'happy':
        setCurrentMessage({
          id: 101,
          text: "I'm feeling great today! Ready to show you my best projects!",
          type: 'speech',
          icon: <Star className="text-comic-yellow" />
        });
        break;
      case 'excited':
        setCurrentMessage({
          id: 102,
          text: "Wow! I'm super excited about what I've been working on recently!",
          type: 'shout',
          icon: <Rocket className="text-comic-orange" />
        });
        break;
      case 'thinking':
        setCurrentMessage({
          id: 103,
          text: "Hmm, I wonder what new technologies I should learn next...",
          type: 'thought',
          icon: <Lightbulb className="text-comic-yellow" />
        });
        break;
      case 'surprised':
        setCurrentMessage({
          id: 104,
          text: "Oh! Did you find that hidden feature already?",
          type: 'speech',
          icon: <Star className="text-comic-pink" />
        });
        break;
      case 'curious':
        setCurrentMessage({
          id: 105,
          text: "I'm curious - which of my projects do you find most interesting?",
          type: 'speech',
          icon: <Lightbulb className="text-comic-green" />
        });
        break;
      default:
        setCurrentMessage({
          id: 100,
          text: "Hello! I'm glad you're exploring my portfolio!",
          type: 'speech',
          icon: <Star className="text-comic-yellow" />
        });
    }
    setIsInteracting(true);
    setTimeout(() => {
      setIsInteracting(false);
    }, 5000);
  };
  return <div className="fixed right-6 bottom-24 z-50">
      <div className="flex flex-col items-end">
        <div className="flex space-x-2 mb-2">
          
          
          <button onClick={toggleVisibility} className="bg-comic-orange text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-black shadow-md hover:bg-comic-pink transition-colors" title={isVisible ? "Hide avatar" : "Show avatar"}>
            {isVisible ? 'X' : '👤'}
          </button>
        </div>
        
        <AnimatePresence>
          {showEmotionSelector && <motion.div initial={{
          opacity: 0,
          scale: 0.8,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.8,
          y: 20
        }} className="mb-2 bg-white rounded-lg border-2 border-comic-border p-2 flex space-x-2">
              {avatarEmotions.map(em => <button key={em} onClick={() => setSpecificEmotion(em)} className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${emotion === em ? 'border-comic-blue' : 'border-gray-300'} hover:border-comic-pink transition-colors`} title={em}>
                  {em === 'neutral' && '😐'}
                  {em === 'happy' && '😊'}
                  {em === 'excited' && '😃'}
                  {em === 'thinking' && '🤔'}
                  {em === 'surprised' && '😮'}
                  {em === 'curious' && '🧐'}
                </button>)}
            </motion.div>}
        </AnimatePresence>
        
        <AnimatePresence>
          {isVisible}
        </AnimatePresence>
      </div>
    </div>;
};
export default InteractiveAvatar;