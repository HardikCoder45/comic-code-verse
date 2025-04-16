import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Database, Brain, Code, Cpu, Zap, CheckCircle, Star } from 'lucide-react';

interface CodeDNAHoverProps {
  skill: {
    name: string;
    category: string;
    level: number;
    description?: string;
    color: string;
    yearsExperience?: number;
    projects?: string[];
    relatedSkills?: string[];
  };
  connections: string[];
  onViewSkill: () => void;
  position: { x: number, y: number };
  isActive?: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Code size={16} />;
    case 'backend':
      return <Database size={16} />;
    case 'mobile':
      return <Globe size={16} />;
    case 'devops':
      return <Cpu size={16} />;
    case 'ai':
      return <Brain size={16} />;
    default:
      return <Brain size={16} />;
  }
};

const CodeDNAHover: React.FC<CodeDNAHoverProps> = ({ 
  skill, 
  connections, 
  onViewSkill, 
  position,
  isActive = false
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  
  // Calculate tooltip dimensions to ensure it doesn't go offscreen
  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, []);
  
  // Calculate the position to ensure tooltip stays within viewport
  const calculatePosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Default position
    let x = position.x;
    let y = position.y;
    
    // Adjust for right edge
    if (position.x + tooltipWidth > viewportWidth - 20) {
      x = position.x - tooltipWidth - 20;
    }
    
    // Adjust for bottom edge
    if (position.y + tooltipHeight > viewportHeight - 20) {
      y = position.y - tooltipHeight - 20;
    }
    
    return { x, y };
  };
  
  // Tooltip adjusted position
  const tooltipPosition = calculatePosition();
  
  return (
    <AnimatePresence>
      {isTooltipVisible && (
        <motion.div
          ref={tooltipRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl p-4 w-64 border-2"
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 5 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ 
            borderColor: skill.color,
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transformOrigin: 'center center',
            boxShadow: isActive 
              ? `0 0 0 2px ${skill.color}, 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px ${skill.color}80`
              : `0 0 0 2px ${skill.color}, 0 10px 25px -5px rgba(0, 0, 0, 0.2)`
          }}
        >
          {/* Inner glow effect on active skills */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 rounded-lg"
              animate={{ 
                boxShadow: [
                  `inset 0 0 10px ${skill.color}30`,
                  `inset 0 0 20px ${skill.color}50`,
                  `inset 0 0 10px ${skill.color}30`
                ] 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ pointerEvents: 'none' }}
            />
          )}
          
          {/* Sparkle decoration */}
          <div className="absolute -top-2 -right-2 z-10">
            <motion.div
              className="bg-white rounded-full w-8 h-8 flex items-center justify-center border-2"
              style={{ borderColor: skill.color }}
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2
              }}
            >
              <Sparkles size={16} style={{ color: skill.color }} />
            </motion.div>
          </div>
          
          {/* Badge for active indicator */}
          {isActive && (
            <motion.div 
              className="absolute -top-2 -left-2 z-10 bg-comic-green text-white rounded-full w-8 h-8 flex items-center justify-center"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <CheckCircle size={16} />
            </motion.div>
          )}
          
          <div className="flex items-center mb-3">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${skill.color}30` }}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {getCategoryIcon(skill.category)}
            </motion.div>
            
            <div>
              <motion.h3 
                className="font-bold text-lg"
                animate={isActive ? {
                  color: [
                    '#000000',
                    skill.color,
                    '#000000'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {skill.name}
              </motion.h3>
              <div className="flex items-center text-xs text-gray-600">
                <span className="capitalize">{skill.category}</span>
                <span className="mx-1">•</span>
                <span>Level {skill.level}/5</span>
                {skill.yearsExperience && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{skill.yearsExperience} {skill.yearsExperience === 1 ? 'yr' : 'yrs'}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {skill.description && (
            <motion.p 
              className="text-sm text-gray-700 mb-3 font-comic line-clamp-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {skill.description}
            </motion.p>
          )}
          
          {connections.length > 0 && (
            <motion.div 
              className="mb-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center">
                <Zap size={12} className="mr-1 text-comic-blue" /> Connected Skills
              </h4>
              <div className="flex flex-wrap gap-1">
                {connections.map((connection, index) => (
                  <motion.span 
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: isActive ? `${skill.color}20` : 'rgba(243, 244, 246, 1)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.1, backgroundColor: `${skill.color}30` }}
                  >
                    {connection}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Projects list if available */}
          {skill.projects && skill.projects.length > 0 && (
            <motion.div 
              className="mb-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center">
                <Star size={12} className="mr-1 text-yellow-500" /> Key Projects
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                {skill.projects.slice(0, 2).map((project, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
                    {project}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: i <= skill.level ? skill.color : '#e2e8f0' 
                  }}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: i <= skill.level && isActive ? [0.7, 1, 0.7] : 1
                  }}
                  transition={{ 
                    delay: i * 0.05,
                    duration: isActive ? 1.5 : 0.3,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <motion.button
              className="text-xs font-medium flex items-center text-comic-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewSkill}
            >
              View Details
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight size={12} className="ml-1" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeDNAHover;
