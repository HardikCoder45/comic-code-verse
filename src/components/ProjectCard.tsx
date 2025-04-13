
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../data/projects';
import SkillBadge from './SkillBadge';
import Comic3DPanel from './Comic3DPanel';
import { Box, Code, Eye } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { playSound } = useSound();

  return (
    <motion.div 
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: index * 0.05,
            type: 'spring',
            stiffness: 200,
            damping: 20
          }
        }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Comic3DPanel 
        title={project.title}
        headerColor={project.skills[0]?.color || 'blue'}
        spotlightEffect={true}
        backgroundImage={project.image}
        className="h-full"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-comic-orange text-white text-xs font-bold px-2 py-1 rounded-full">#{project.id}</span>
                <span className="flex items-center gap-1 text-xs">
                  <Eye size={14} /> {1200 + project.id * 100}
                </span>
              </div>
              <span className="bg-comic-green text-white text-xs font-bold px-2 py-1 rounded-full">
                {new Date().getFullYear() - Math.floor(Math.random() * 3)}
              </span>
            </div>
            
            <p className="font-comic mb-4 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {project.skills.map((skill, idx) => (
                <SkillBadge 
                  key={idx} 
                  name={skill.name} 
                  color={skill.color}
                  size="sm"
                  icon={<Code size={12} />}
                />
              ))}
            </div>
          </div>
          
          <motion.button 
            className="w-full mt-4 bg-gradient-to-r from-comic-blue to-comic-purple hover:from-comic-purple hover:to-comic-blue text-white font-bold py-2 rounded-lg shadow-lg text-sm flex items-center justify-center gap-1 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playSound('click');
              onViewDetails(project.id);
            }}
          >
            <Box className="mr-1" size={14} /> View Details
          </motion.button>
        </div>
      </Comic3DPanel>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-2 -right-2 bg-comic-yellow text-black font-bangers px-2 py-1 rounded-lg z-20 shadow-lg"
        >
          {index < 2 ? '🔥 HOT!' : index < 4 ? '✨ NEW!' : '⭐ COOL!'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
