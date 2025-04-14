
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Zap, X } from 'lucide-react';

interface DNATooltipProps {
  skill: {
    name: string;
    description?: string;
    level?: number;
    yearsExperience?: number;
    projects?: string[];
    category?: string;
    color?: string;
  };
  position: { x: number; y: number };
  onClose: () => void;
  onShowConnections: () => void;
  isShowingConnections: boolean;
}

const DNATooltip: React.FC<DNATooltipProps> = ({ 
  skill, 
  position, 
  onClose,
  onShowConnections,
  isShowingConnections
}) => {
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      className="absolute bg-white border-2 border-black rounded-lg shadow-lg p-4 z-10"
      style={{
        left: Math.min(window.innerWidth - 250, position.x + 20),
        top: position.y + 20,
        width: '240px',
        boxShadow: `0 10px 25px -5px ${skill.color}40, 0 5px 10px -5px rgba(0,0,0,0.1)`
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: skill.color }}
        layoutId={`skill-bar-${skill.name}`}
      />
      
      <motion.h3 
        className="font-bangers text-xl mb-2 text-black flex items-center"
        layoutId={`skill-title-${skill.name}`}
      >
        {skill.name}
        <motion.span 
          className="ml-2 text-yellow-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 15, -15, 0] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles size={16} />
        </motion.span>
      </motion.h3>
      
      {skill.description && (
        <motion.p 
          className="text-sm text-black mb-3 font-comic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {skill.description}
        </motion.p>
      )}
      
      <motion.div 
        className="flex items-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="mr-2 font-comic text-black">Power Level:</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <motion.div 
              key={level}
              className={`w-3 h-3 rounded-full ${
                level <= (skill.level || 0) ? skill.color : 'bg-gray-200'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + level * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
      
      {skill.yearsExperience && (
        <motion.div 
          className="text-sm mt-2 text-black font-comic"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="font-semibold">Experience:</span> {skill.yearsExperience} years
        </motion.div>
      )}
      
      {skill.projects && skill.projects.length > 0 && (
        <motion.div 
          className="mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="font-comic text-sm font-bold text-black">Projects:</h4>
          <ul className="list-disc list-inside text-xs text-black font-comic">
            {skill.projects.slice(0, 2).map((project, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {project}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      
      <motion.div
        className="mt-3 pt-2 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex justify-between">
          <motion.button
            className="text-xs text-comic-blue font-comic font-bold flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            onClick={onShowConnections}
          >
            {isShowingConnections ? (
              <>Hide connections <X size={14} /></>
            ) : (
              <>Show connections <Zap size={14} /></>
            )}
          </motion.button>
          
          <motion.button
            className="text-xs text-gray-500 font-comic flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
          >
            <X size={14} />
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-black flex items-center justify-center"
        whileHover={{ scale: 1.2, rotate: 90 }}
      >
        <Cpu size={12} className="text-comic-blue" />
      </motion.div>
    </motion.div>
  );
};

export default DNATooltip;
