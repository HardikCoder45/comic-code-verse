
import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Trophy, Zap, Star, Rocket, Target, Gauge, Flame } from 'lucide-react';

const EnhancedGameFeatures = () => {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bangers text-center text-white mb-6 flex items-center justify-center">
        <Gamepad2 className="mr-2 text-yellow-400" size={32} />
        Enhanced Portfolio Game Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full mr-4">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bangers text-yellow-300 mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-white font-comic">
          Enjoy an immersive portfolio experience with our enhanced gaming features!
          <span className="block mt-2 text-yellow-300">
            <Star className="inline mr-1" size={16} /> Collect achievements to showcase your skills!
          </span>
        </p>
      </motion.div>
    </div>
  );
};

const features = [
  {
    title: "Dynamic Skill Challenges",
    description: "Complete mini-games that showcase specific portfolio skills with increasing difficulty levels.",
    icon: <Target size={24} className="text-white" />
  },
  {
    title: "Achievement System",
    description: "Earn badges and achievements as you showcase different skills and project experiences.",
    icon: <Trophy size={24} className="text-white" />
  },
  {
    title: "Power-ups & Abilities",
    description: "Unlock special abilities based on your strongest skills and experiences.",
    icon: <Zap size={24} className="text-white" />
  },
  {
    title: "Interactive Timeline",
    description: "Navigate your career journey as an adventure path with milestone challenges.",
    icon: <Rocket size={24} className="text-white" />
  },
  {
    title: "Skill Tree Visualization",
    description: "Explore your skills as interconnected nodes that grow as you progress.",
    icon: <Sparkles size={24} className="text-white" />
  },
  {
    title: "Performance Analytics",
    description: "Track your progress and get insights on your portfolio performance.",
    icon: <Gauge size={24} className="text-white" />
  },
];

export default EnhancedGameFeatures;
