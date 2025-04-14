
import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Code, Dna, Book, User, FileCode, PenTool, Home, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSound } from '../contexts/SoundContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

const PortfolioNavigation: React.FC = () => {
  const location = useLocation();
  const { playSound } = useSound();
  
  const navItems: NavItem[] = [
    {
      name: 'Home',
      path: '/',
      icon: <Home size={20} />,
      description: 'Return to the main page'
    },
    {
      name: 'Game Hub',
      path: '/game-hub',
      icon: <Gamepad size={20} />,
      description: 'Play interactive portfolio games'
    },
    {
      name: 'Code DNA',
      path: '/code-dna',
      icon: <Dna size={20} />,
      description: 'Visualize your skills network'
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: <Code size={20} />,
      description: 'Browse your portfolio projects'
    },
    {
      name: 'Resume',
      path: '/resume',
      icon: <FileCode size={20} />,
      description: 'View and export your resume'
    },
    {
      name: 'Editor',
      path: '/editor',
      icon: <PenTool size={20} />,
      description: 'Customize your portfolio'
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: <LineChart size={20} />,
      description: 'View your portfolio analytics'
    },
    {
      name: 'About',
      path: '/about',
      icon: <User size={20} />,
      description: 'Learn more about you'
    }
  ];

  return (
    <nav className="p-4 bg-white shadow-md rounded-xl mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                <motion.div
                  className={`
                    relative px-4 py-2 rounded-lg flex items-center gap-2
                    ${isActive 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      layoutId="activeIndicator"
                    />
                  )}
                  
                  <motion.div
                    className="absolute top-full left-0 w-full bg-black text-white text-xs p-2 rounded opacity-0 z-10 pointer-events-none"
                    whileHover={{ 
                      opacity: 1, 
                      y: 5,
                      transition: { delay: 0.3 }
                    }}
                    // Fixed the 'visible' property issue
                    transition={{ delay: 0.3 }}
                  >
                    {item.description}
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default PortfolioNavigation;
