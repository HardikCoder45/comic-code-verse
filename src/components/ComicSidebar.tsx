
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Image, MessageSquare, User } from 'lucide-react';

const ComicSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: BookOpen, path: '/projects', label: 'Projects' },
    { icon: User, path: '/about', label: 'About' },
    { icon: Image, path: '/skills', label: 'Skills' },
    { icon: MessageSquare, path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white border-r-4 border-comic-border flex flex-col items-center p-4 z-10">
      <div className="mb-8 mt-4">
        <div className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
          <span className="font-bangers text-white text-xl">CC</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`sidebar-icon group relative ${isActive ? 'bg-comic-blue text-white' : ''}`}
            >
              <item.icon size={24} />
              <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-300 origin-left">
                <div className="speech-bubble whitespace-nowrap">
                  <span className="font-comic font-bold">{item.label}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ComicSidebar;
