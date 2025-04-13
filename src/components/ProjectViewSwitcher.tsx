
import React from 'react';
import { ViewIcon, LayoutGrid, Layers, BookOpen } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface ProjectViewSwitcherProps {
  currentView: 'grid' | 'carousel' | 'book';
  setCurrentView: (view: 'grid' | 'carousel' | 'book') => void;
}

const ProjectViewSwitcher: React.FC<ProjectViewSwitcherProps> = ({ currentView, setCurrentView }) => {
  const { playSound } = useSound();
  
  const handleViewChange = (view: 'grid' | 'carousel' | 'book') => {
    setCurrentView(view);
    playSound('click');
  };
  
  return (
    <div className="flex gap-2 bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-lg border-2 border-comic-border shadow-lg mb-6">
      <button 
        className={`p-2 border-2 border-comic-border rounded-lg flex items-center gap-2 ${
          currentView === 'grid' 
            ? 'bg-comic-blue text-white' 
            : 'bg-gray-800 text-white hover:bg-gray-700 transition-colors'
        }`}
        onClick={() => handleViewChange('grid')}
      >
        <LayoutGrid size={16} />
        <span>Grid View</span>
      </button>
      <button 
        className={`p-2 border-2 border-comic-border rounded-lg flex items-center gap-2 ${
          currentView === 'carousel' 
            ? 'bg-comic-blue text-white' 
            : 'bg-gray-800 text-white hover:bg-gray-700 transition-colors'
        }`}
        onClick={() => handleViewChange('carousel')}
      >
        <Layers size={16} />
        <span>Carousel</span>
      </button>
      <button 
        className={`p-2 border-2 border-comic-border rounded-lg flex items-center gap-2 ${
          currentView === 'book' 
            ? 'bg-comic-blue text-white' 
            : 'bg-gray-800 text-white hover:bg-gray-700 transition-colors'
        }`}
        onClick={() => handleViewChange('book')}
      >
        <BookOpen size={16} />
        <span>Comic Book</span>
      </button>
    </div>
  );
};

export default ProjectViewSwitcher;
