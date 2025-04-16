
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  
  const handleToggle = () => {
    playSound('click');
    toggleTheme();
  };
  
  return (
    <motion.button
      className="p-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      onMouseEnter={() => playSound('hover')}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-gray-800" />
      ) : (
        <Sun size={18} className="text-yellow-300" />
      )}
      
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
