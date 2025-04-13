
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, SortDesc } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface ProjectFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  totalProjects: number;
  filteredCount: number;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
  searchTerm,
  setSearchTerm,
  categories,
  totalProjects,
  filteredCount
}) => {
  const { playSound } = useSound();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-2 bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border-2 border-comic-border shadow-lg">
        <div className="flex flex-1 gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-comic-border bg-gray-800 text-white focus:ring-2 focus:ring-comic-blue focus:border-comic-blue transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                playSound('keyboardTyping');
              }}
            />
          </div>
          
          <div className="relative group">
            <button 
              className="p-2 rounded-full border-2 border-comic-border bg-gray-800 text-white flex items-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => playSound('click')}
            >
              <Filter size={16} /> Filter
            </button>
            <div className="absolute z-10 mt-2 hidden group-hover:block bg-gray-800 border-2 border-comic-border rounded-lg shadow-lg p-3 w-64 right-0">
              <p className="font-bold mb-2 text-white">Categories:</p>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-2 py-1 text-xs rounded-full border ${filter === category ? 'bg-comic-blue text-white border-comic-blue' : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'}`}
                    onClick={() => {
                      setFilter(category);
                      playSound('click');
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button 
              className="p-2 rounded-full border-2 border-comic-border bg-gray-800 text-white flex items-center gap-2 hover:bg-gray-700 transition-colors"
              onClick={() => playSound('click')}
            >
              <SortDesc size={16} /> Sort
            </button>
            <div className="absolute z-10 mt-2 hidden group-hover:block bg-gray-800 border-2 border-comic-border rounded-lg shadow-lg p-3 min-w-48 right-0">
              <p className="font-bold mb-2 text-white">Sort by:</p>
              <div className="flex flex-col gap-1">
                <button
                  className={`px-2 py-1 text-left text-sm rounded ${sort === 'newest' ? 'bg-comic-blue text-white' : 'text-white hover:bg-gray-700'}`}
                  onClick={() => {
                    setSort('newest');
                    playSound('click');
                  }}
                >
                  Newest First
                </button>
                <button
                  className={`px-2 py-1 text-left text-sm rounded ${sort === 'oldest' ? 'bg-comic-blue text-white' : 'text-white hover:bg-gray-700'}`}
                  onClick={() => {
                    setSort('oldest');
                    playSound('click');
                  }}
                >
                  Oldest First
                </button>
                <button
                  className={`px-2 py-1 text-left text-sm rounded ${sort === 'alphabetical' ? 'bg-comic-blue text-white' : 'text-white hover:bg-gray-700'}`}
                  onClick={() => {
                    setSort('alphabetical');
                    playSound('click');
                  }}
                >
                  Alphabetical
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border-2 border-comic-border shadow-lg text-white">
        <p className="font-comic">
          Showing <span className="font-bold text-comic-yellow">{filteredCount}</span> out of <span className="font-bold text-comic-yellow">{totalProjects}</span> projects
        </p>
        {searchTerm && (
          <button 
            className="ml-2 bg-comic-pink/20 hover:bg-comic-pink/30 text-comic-pink px-3 py-1 rounded-full text-xs"
            onClick={() => {
              setSearchTerm('');
              playSound('click');
            }}
          >
            Clear search
          </button>
        )}
        {filter !== 'all' && (
          <button 
            className="ml-2 bg-comic-blue/20 hover:bg-comic-blue/30 text-comic-blue px-3 py-1 rounded-full text-xs"
            onClick={() => {
              setFilter('all');
              playSound('click');
            }}
          >
            Clear filter
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectFilter;
