
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderOpen, User, Sparkles, MessageSquare, Clock, Gamepad2, FileText, Code, PanelLeft, Compass } from 'lucide-react';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const BottomNavigation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const navigationItems: NavigationItem[] = [
    { path: '/home', label: 'Home', icon: <Home size={20} />, color: 'bg-comic-blue' },
    { path: '/projects', label: 'Projects', icon: <FolderOpen size={20} />, color: 'bg-comic-green' },
    { path: '/about', label: 'About', icon: <User size={20} />, color: 'bg-comic-purple' },
    { path: '/skills', label: 'Skills', icon: <Sparkles size={20} />, color: 'bg-comic-pink' },
    { path: '/timeline', label: 'Timeline', icon: <Clock size={20} />, color: 'bg-comic-orange' },
    { path: '/game', label: 'Game', icon: <Gamepad2 size={20} />, color: 'bg-comic-yellow' },
    { path: '/resume', label: 'Resume', icon: <FileText size={20} />, color: 'bg-comic-blue' },
    { path: '/dna', label: 'Code DNA', icon: <Code size={20} />, color: 'bg-comic-purple' },
    { path: '/sandboxes', label: 'Sandboxes', icon: <PanelLeft size={20} />, color: 'bg-comic-green' },
    { path: '/contact', label: 'Contact', icon: <MessageSquare size={20} />, color: 'bg-comic-pink' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 w-full z-40 transition-colors duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur' : 'bg-black/40'
      }`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-screen-lg mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex-1 flex items-center justify-between md:justify-center md:space-x-6">
            <AnimatePresence>
              {isExpanded ? (
                // Expanded view - all navigation items
                <motion.div 
                  className="flex items-center justify-between w-full overflow-x-auto hide-scrollbar py-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        flex flex-col items-center justify-center min-w-[60px] text-white py-1 px-2 rounded-full transition-all
                        ${isActive ? `${item.color} shadow-glow` : 'hover:bg-white/10'}
                      `}
                    >
                      {item.icon}
                      <span className="text-[10px] mt-1 font-comic">{item.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              ) : (
                // Collapsed view - only active and adjacent items
                <motion.div 
                  className="flex items-center space-x-1 sm:space-x-2 justify-between w-full overflow-x-auto hide-scrollbar py-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {navigationItems.slice(0, 5).map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center justify-center space-x-1 text-white py-1 px-3 rounded-full transition-all
                        ${isActive ? `${item.color} shadow-glow` : 'hover:bg-white/10'}
                      `}
                    >
                      {item.icon}
                      <span className="text-xs font-comic hidden sm:inline">{item.label}</span>
                    </NavLink>
                  ))}

                  <button
                    className="flex items-center justify-center space-x-1 text-white py-1 px-3 rounded-full bg-white/10 hover:bg-white/20"
                    onClick={toggleExpand}
                  >
                    <Compass size={20} />
                    <span className="text-xs font-comic hidden sm:inline">More</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle button for expanded view */}
          <button
            className={`absolute -top-10 right-4 p-2 rounded-full ${isExpanded ? 'bg-comic-pink' : 'bg-comic-blue'} text-white shadow-lg`}
            onClick={toggleExpand}
          >
            {isExpanded ? <motion.div animate={{ rotate: 180 }}><PanelLeft size={20} /></motion.div> : <Compass size={20} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default BottomNavigation;
