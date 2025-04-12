
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Zap } from 'lucide-react';
import SpeechBubble from './SpeechBubble';

type Theme = 'light' | 'dark' | 'comic-dark';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [showTooltip, setShowTooltip] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class and save to localStorage
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    root.classList.remove('light-theme', 'dark-theme', 'comic-dark-theme');
    
    switch (newTheme) {
      case 'dark':
        root.classList.add('dark-theme');
        break;
      case 'comic-dark':
        root.classList.add('comic-dark-theme');
        break;
      default:
        root.classList.add('light-theme');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  // Cycle through themes
  const toggleTheme = () => {
    const nextTheme: { [key in Theme]: Theme } = {
      'light': 'dark',
      'dark': 'comic-dark',
      'comic-dark': 'light'
    };
    
    const newTheme = nextTheme[theme];
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="relative">
        <motion.button
          onClick={toggleTheme}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-colors ${
            theme === 'light' 
              ? 'bg-comic-blue text-white' 
              : theme === 'dark' 
                ? 'bg-comic-purple text-white' 
                : 'bg-comic-orange text-white'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'light' && <Sun size={20} />}
          {theme === 'dark' && <Moon size={20} />}
          {theme === 'comic-dark' && <Zap size={20} />}
        </motion.button>

        {showTooltip && (
          <div className="absolute top-full right-0 mt-2">
            <SpeechBubble 
              type="speech" 
              position="top" 
              color={theme === 'light' ? 'blue' : theme === 'dark' ? 'purple' : 'orange'}
              className="whitespace-nowrap"
            >
              <p className="font-comic text-sm text-black">
                {theme === 'light' 
                  ? 'Switch to Dark Mode' 
                  : theme === 'dark' 
                    ? 'Switch to Comic Dark Mode' 
                    : 'Switch to Light Mode'
                }
              </p>
            </SpeechBubble>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
