
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Cpu, Layers, Bolt, Terminal, Palette, Rocket, Award, Trophy } from 'lucide-react';

interface ProjectStatsProps {
  stats: {
    total: number;
    frontend: number;
    backend: number;
    mobile: number;
    ai: number;
  };
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  const featuredStats = [
    { 
      label: 'Total Projects', 
      value: stats.total, 
      icon: <Zap className="text-white" size={24} />, 
      color: 'bg-comic-blue'
    },
    { 
      label: 'Frontend', 
      value: stats.frontend, 
      icon: <Code className="text-white" size={24} />, 
      color: 'bg-comic-pink'
    },
    { 
      label: 'Backend', 
      value: stats.backend, 
      icon: <Cpu className="text-white" size={24} />, 
      color: 'bg-comic-green'
    },
    { 
      label: 'Open Source', 
      value: Math.round(stats.total * 0.4), 
      icon: <Layers className="text-white" size={24} />, 
      color: 'bg-comic-orange'
    },
    { 
      label: 'AI Projects', 
      value: stats.ai, 
      icon: <Bolt className="text-white" size={24} />, 
      color: 'bg-comic-purple'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      {featuredStats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-comic-border p-3 text-center shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -5,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(155, 135, 245, 0.3)',
            transition: { duration: 0.2 }
          }}
        >
          <div className={`w-12 h-12 mx-auto ${stat.color} rounded-full flex items-center justify-center mb-2 shadow-lg shadow-${stat.color}/30`}>
            {stat.icon}
          </div>
          <span className="font-bangers text-2xl text-white drop-shadow-glow">{stat.value}</span>
          <p className="font-comic text-xs text-gray-300">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectStats;
