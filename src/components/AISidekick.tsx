
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Zap, Lightbulb, Coffee, Brain, Smile, Star, HelpCircle } from 'lucide-react';
import SpeechBubble from './SpeechBubble';

interface SidekickMessage {
  id: number;
  text: string;
  type: 'tip' | 'fact' | 'joke' | 'question' | 'greeting';
  icon: React.ReactNode;
}

const messages: SidekickMessage[] = [
  {
    id: 1,
    text: "Hi there! I'm Bitsy, your friendly AI guide. I'm here to help you navigate through this portfolio!",
    type: 'greeting',
    icon: <Smile className="text-comic-yellow" />,
  },
  {
    id: 2,
    text: "This portfolio was built with React, TypeScript, TailwindCSS, and Framer Motion. Pretty cool tech stack, right?",
    type: 'fact',
    icon: <Zap className="text-comic-blue" />,
  },
  {
    id: 3,
    text: "Pro tip: Try clicking on different parts of the comic panels for interactive elements and easter eggs!",
    type: 'tip',
    icon: <Lightbulb className="text-comic-yellow" />,
  },
  {
    id: 4,
    text: "Why did the developer go broke? Because they used up all their cache!",
    type: 'joke',
    icon: <Coffee className="text-comic-orange" />,
  },
  {
    id: 5,
    text: "Did you know? This portfolio features a fully interactive timeline that showcases my journey as a developer.",
    type: 'fact',
    icon: <Brain className="text-comic-purple" />,
  },
  {
    id: 6,
    text: "Looking for something specific? Try using the navigation menu at the bottom of the screen!",
    type: 'tip',
    icon: <Lightbulb className="text-comic-yellow" />,
  },
  {
    id: 7,
    text: "What do you think about the interactive elements in this portfolio? Pretty engaging, right?",
    type: 'question',
    icon: <HelpCircle className="text-comic-green" />,
  },
  {
    id: 8,
    text: "Fun fact: The animations in this portfolio are powered by Framer Motion, giving it that smooth, comic-book feel!",
    type: 'fact',
    icon: <Star className="text-comic-pink" />,
  },
];

interface AISidekickProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  initialDelay?: number;
  messageInterval?: number;
  characterType?: 'robot' | 'cat' | 'alien' | 'hero';
}

const AISidekick: React.FC<AISidekickProps> = ({
  position = 'bottom-right',
  initialDelay = 3000,
  messageInterval = 15000,
  characterType = 'robot',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<SidekickMessage | null>(null);
  const [previousMessages, setPreviousMessages] = useState<SidekickMessage[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Character images based on type
  const characterImages = {
    robot: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    cat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    alien: "https://images.unsplash.com/photo-1608085575945-d7c825373859?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    hero: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  };

  // Character names based on type
  const characterNames = {
    robot: "Bitsy",
    cat: "Meowster",
    alien: "Zorb",
    hero: "Captain Portfolio",
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'right-6 bottom-24',
    'bottom-left': 'left-6 bottom-24',
    'top-right': 'right-6 top-6',
    'top-left': 'left-6 top-6',
  };

  useEffect(() => {
    // Initial message after delay
    const initialTimer = setTimeout(() => {
      if (!userInteracted) {
        setCurrentMessage(messages[0]);
        setPreviousMessages([messages[0]]);
        setIsOpen(true);
      }
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [initialDelay, userInteracted]);

  useEffect(() => {
    // Show random messages periodically if sidekick is open
    if (isOpen && !userInteracted && !isMinimized) {
      timeoutRef.current = setTimeout(() => {
        const displayedIds = [...previousMessages.map(m => m.id)];
        const availableMessages = messages.filter(m => !displayedIds.includes(m.id));
        
        if (availableMessages.length > 0) {
          const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
          setCurrentMessage(randomMessage);
          setPreviousMessages(prev => [...prev, randomMessage]);
        } else {
          // If all messages have been shown, start over with a random one
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          setCurrentMessage(randomMessage);
          setPreviousMessages(prev => [...prev, randomMessage]);
        }
      }, messageInterval);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isOpen, currentMessage, previousMessages, messageInterval, userInteracted, isMinimized]);

  useEffect(() => {
    // Scroll to the latest message
    if (showHistory) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [previousMessages, showHistory]);

  const toggleSidekick = () => {
    setIsOpen(!isOpen);
    setUserInteracted(true);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const getBubbleColorForType = (type: string): 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple' => {
    switch (type) {
      case 'tip': return 'yellow';
      case 'fact': return 'blue';
      case 'joke': return 'orange';
      case 'question': return 'green';
      case 'greeting': return 'pink';
      default: return 'blue';
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidekick}
        className={`w-14 h-14 rounded-full ${isOpen ? 'bg-comic-pink' : 'bg-comic-blue'} text-white border-2 border-black shadow-md flex items-center justify-center`}
        aria-label={isOpen ? "Close AI sidekick" : "Open AI sidekick"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 w-72 bg-white border-4 border-comic-border rounded-xl overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="bg-comic-blue text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white mr-2">
                  <img 
                    src={characterImages[characterType]} 
                    alt={characterNames[characterType]} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-comic font-bold">{characterNames[characterType]}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize} 
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  {isMinimized ? <Lightbulb size={14} /> : <Coffee size={14} />}
                </button>
                <button 
                  onClick={toggleHistory} 
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  {showHistory ? <Zap size={14} /> : <Brain size={14} />}
                </button>
              </div>
            </div>

            {/* Sidekick content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {showHistory ? (
                    // Message history
                    <div className="p-3 max-h-80 overflow-y-auto bg-gray-50">
                      {previousMessages.map((msg, index) => (
                        <div key={`${msg.id}-${index}`} className="mb-3">
                          <SpeechBubble 
                            type="speech" 
                            color={getBubbleColorForType(msg.type)} 
                            position="left" 
                            className="w-full"
                            icon={msg.icon}
                          >
                            <p className="font-comic text-sm text-black">{msg.text}</p>
                          </SpeechBubble>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    // Current message only
                    <div className="p-3 max-h-80 overflow-y-auto bg-gray-50">
                      {currentMessage && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentMessage.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SpeechBubble 
                              type="speech" 
                              color={getBubbleColorForType(currentMessage.type)} 
                              position="left" 
                              className="w-full"
                              icon={currentMessage.icon}
                            >
                              <p className="font-comic text-sm text-black">{currentMessage.text}</p>
                            </SpeechBubble>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="p-2 border-t-2 border-comic-border flex justify-between items-center bg-white">
                    <span className="text-xs text-gray-500">
                      {showHistory ? "Message history" : `${characterNames[characterType]} is here to help!`}
                    </span>
                    <button 
                      onClick={toggleSidekick}
                      className="text-xs text-comic-blue hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISidekick;
