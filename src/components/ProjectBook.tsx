
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import SkillBadge from './SkillBadge';
import { useSound } from '../contexts/SoundContext';

interface ProjectBookProps {
  projects: Project[];
  onViewDetails: (id: number) => void;
}

const ProjectBook: React.FC<ProjectBookProps> = ({ projects, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(projects.length / 2);
  const { playSound } = useSound();
  
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      playSound('pageFlip');
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-comic-border rounded-xl overflow-hidden shadow-2xl" style={{ height: '600px' }}>
      <div className="absolute top-0 left-0 w-full p-3 bg-comic-blue text-white font-bangers text-center text-xl">
        Comic Book Projects - {currentPage + 1}/{totalPages}
      </div>
      
      <div className="absolute top-14 left-0 w-full h-[calc(100%-64px)] bg-gray-800 flex">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPage}
            className="w-full h-full flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {projects.slice(currentPage * 2, currentPage * 2 + 2).map((project, index) => {
              const isLeftPage = index === 0;
              
              return (
                <motion.div 
                  key={project.id} 
                  className={`w-1/2 h-full p-6 ${isLeftPage ? 'border-r border-comic-border' : ''}`}
                  initial={{ 
                    x: isLeftPage ? -50 : 50,
                    opacity: 0
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.5 }
                  }}
                >
                  <div className="h-full flex flex-col">
                    <h3 className="font-bangers text-3xl text-comic-yellow mb-4 drop-shadow-glow tracking-wide">{project.title}</h3>
                    
                    {project.image && (
                      <div className="h-48 mb-4 rounded-lg overflow-hidden border-2 border-comic-border relative group">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}
                    
                    <p className="font-comic mb-4 text-white">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, idx) => (
                        <SkillBadge 
                          key={idx} 
                          name={skill.name} 
                          color={skill.color}
                          size="sm"
                        />
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <motion.button 
                        className="w-full bg-gradient-to-r from-comic-blue to-comic-purple text-white font-bold py-2 rounded-lg text-center shadow-lg"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          onViewDetails(project.id);
                          playSound('click');
                        }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        {/* Book crease effect */}
        <div className="absolute inset-y-0 left-1/2 w-4 transform -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none">
          <div className="h-full w-[1px] bg-gradient-to-b from-gray-600/0 via-gray-600/80 to-gray-600/0"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-600/30 to-gray-800/10 blur-sm"></div>
        </div>
        
        {/* Page turn effect corners */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-800 to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gray-800 to-transparent opacity-50 pointer-events-none"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-900 border-t-2 border-comic-border flex justify-between items-center">
        <motion.button 
          className="comic-button-secondary bg-gray-800 hover:bg-gray-700 text-white"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
          whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
        >
          Previous Page
        </motion.button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <motion.button 
              key={idx}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === idx 
                  ? 'bg-comic-blue text-white' 
                  : 'bg-gray-800 text-white border-2 border-comic-border hover:bg-gray-700'
              }`}
              onClick={() => handlePageChange(idx)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {idx + 1}
            </motion.button>
          ))}
        </div>
        
        <motion.button 
          className="comic-button bg-gradient-to-r from-comic-blue to-comic-purple hover:from-comic-purple hover:to-comic-blue text-white"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
          whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages - 1 ? 1 : 0.95 }}
        >
          Next Page
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectBook;
