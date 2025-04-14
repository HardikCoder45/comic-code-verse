
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Database, Brain, Code } from 'lucide-react';

interface CodeDNAHoverProps {
  skill: {
    name: string;
    category: string;
    level: number;
    description?: string;
    color: string;
  };
  connections: string[];
  onViewSkill: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return <Code size={16} />;
    case 'backend':
      return <Database size={16} />;
    case 'mobile':
      return <Globe size={16} />;
    default:
      return <Brain size={16} />;
  }
};

const CodeDNAHover: React.FC<CodeDNAHoverProps> = ({ skill, connections, onViewSkill }) => {
  return (
    <motion.div
      className="absolute z-10 bg-white rounded-lg shadow-xl p-4 w-64"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ border: `2px solid ${skill.color}` }}
    >
      <div className="absolute -top-2 -right-2">
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
      
      <div className="flex items-center mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${skill.color}30` }}
        >
          {getCategoryIcon(skill.category)}
        </div>
        
        <div>
          <h3 className="font-bold text-lg">{skill.name}</h3>
          <div className="flex items-center text-xs text-gray-600">
            <span className="capitalize">{skill.category}</span>
            <span className="mx-1">•</span>
            <span>Level {skill.level}/5</span>
          </div>
        </div>
      </div>
      
      {skill.description && (
        <p className="text-sm text-gray-700 mb-3">{skill.description}</p>
      )}
      
      {connections.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Connected Skills</h4>
          <div className="flex flex-wrap gap-1">
            {connections.map((connection, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-gray-100"
              >
                {connection}
              </span>
            ))}
          </div>
        </div>
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
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
        
        <motion.button
          className="text-xs font-medium flex items-center text-blue-600"
          whileHover={{ scale: 1.05 }}
          onClick={onViewSkill}
        >
          View Details
          <ArrowRight size={12} className="ml-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CodeDNAHover;
