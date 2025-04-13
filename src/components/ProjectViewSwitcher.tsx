
import React from 'react';
import { ViewIcon, LayoutGrid, Layers, BookOpen, Code } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface ProjectViewSwitcherProps {
  currentView: 'grid' | 'carousel' | 'book' | 'code';
  setCurrentView: (view: 'grid' | 'carousel' | 'book' | 'code') => void;
}

const ProjectViewSwitcher: React.FC<ProjectViewSwitcherProps> = ({ currentView, setCurrentView }) => {
  const { playSound } = useSound();
  
  const handleViewChange = (view: 'grid' | 'carousel' | 'book' | 'code') => {
    setCurrentView(view);
    playSound('click');
    setTimeout(() => playSound('transition'), 100);
  };
  
  return (
    <div className="flex gap-2 bg-white p-2 rounded-lg border-2 border-gray-200 shadow-md mb-6">
      <button 
        className={`p-2 border-2 rounded-lg flex items-center gap-2 ${
          currentView === 'grid' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
        }`}
        onClick={() => handleViewChange('grid')}
        onMouseEnter={() => playSound('hover')}
      >
        <LayoutGrid size={16} />
        <span>Grid View</span>
      </button>
      <button 
        className={`p-2 border-2 rounded-lg flex items-center gap-2 ${
          currentView === 'carousel' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
        }`}
        onClick={() => handleViewChange('carousel')}
        onMouseEnter={() => playSound('hover')}
      >
        <Layers size={16} />
        <span>Carousel</span>
      </button>
      <button 
        className={`p-2 border-2 rounded-lg flex items-center gap-2 ${
          currentView === 'book' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
        }`}
        onClick={() => handleViewChange('book')}
        onMouseEnter={() => playSound('hover')}
      >
        <BookOpen size={16} />
        <span>Comic Book</span>
      </button>
      <button 
        className={`p-2 border-2 rounded-lg flex items-center gap-2 ${
          currentView === 'code' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
        }`}
        onClick={() => handleViewChange('code')}
        onMouseEnter={() => playSound('hover')}
      >
        <Code size={16} />
        <span>HTML Code</span>
      </button>
    </div>
  );
};

export default ProjectViewSwitcher;
