
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpeechBubble from './SpeechBubble';
import { Home, BookOpen, User, Image, MessageSquare, Calendar, Gamepad, FileText, Dna, Code } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const ComicStripNavigation = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { playSound } = useSound();
  
  const navItems = [
    { path: '/home', label: 'Home', icon: Home, color: 'bg-comic-blue' },
    { path: '/projects', label: 'Projects', icon: BookOpen, color: 'bg-comic-pink' },
    { path: '/about', label: 'About', icon: User, color: 'bg-comic-orange' },
    { path: '/skills', label: 'Skills', icon: Image, color: 'bg-comic-green' },
    { path: '/timeline', label: 'Timeline', icon: Calendar, color: 'bg-comic-purple' },
    { path: '/code-samples', label: 'Code', icon: Code, color: 'bg-comic-green' },
    { path: '/game', label: 'Game', icon: Gamepad, color: 'bg-comic-yellow' },
    { path: '/resume', label: 'Resume', icon: FileText, color: 'bg-comic-blue' },
    { path: '/dna', label: 'Code DNA', icon: Dna, color: 'bg-comic-pink' },
    { path: '/contact', label: 'Contact', icon: MessageSquare, color: 'bg-comic-purple' }
  ];

  useEffect(() => {
    // Play transition sound when navigation changes
    const unlisten = () => {
      playSound('transition');
    };
    
    return unlisten;
  }, [location.pathname]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="bg-white border-4 border-black rounded-xl p-2 shadow-lg flex flex-wrap justify-center gap-2 max-w-4xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === item.path;
          
          return (
            <div key={item.path} className="relative">
              <Link 
                to={item.path}
                className={`block p-3 rounded-lg transition-all ${isActive ? item.color + ' text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onMouseEnter={() => {
                  setHoveredItem(item.path);
                  playSound('hover');
                }}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  playSound('click');
                  setTimeout(() => playSound('pageFlip'), 100);
                }}
              >
                <item.icon size={24} />
                
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    onAnimationStart={() => playSound('speechBubble')}
                  >
                    <SpeechBubble type="speech" color="yellow" position="bottom" className="py-1 px-2">
                      <span className="font-comic text-sm font-bold">{item.label}</span>
                    </SpeechBubble>
                  </motion.div>
                )}
              </Link>
              
              {isActive && (
                <motion.div 
                  layoutId="navigation-indicator"
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 ${item.color}`}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ComicStripNavigation;
