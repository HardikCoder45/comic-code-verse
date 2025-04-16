
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Sparkles, Trophy, Zap, Star, Rocket, Target, Gauge, Flame, Award, Medal, Badge, Crown, Gift, Users2 } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const EnhancedGameFeatures = () => {
  const [expandedAward, setExpandedAward] = useState<number | null>(null);
  const { playSound } = useSound();
  
  const handleAwardClick = (index: number) => {
    playSound('click');
    setExpandedAward(expandedAward === index ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bangers text-center text-white mb-6 flex items-center justify-center">
        <Gamepad2 className="mr-2 text-yellow-400" size={32} />
        Enhanced Portfolio Game Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
      
      {/* Awards Section */}
      <div className="mt-10 mb-6">
        <h2 className="text-3xl font-bangers text-center text-white mb-6 flex items-center justify-center">
          <Trophy className="mr-2 text-yellow-400" size={32} />
          Portfolio Achievements & Awards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-lg border ${
                expandedAward === index 
                  ? 'bg-gradient-to-br from-yellow-500/20 to-amber-700/30 border-yellow-300' 
                  : 'bg-white/5 border-white/10'
              } transition-all duration-300`}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
              }}
              layoutId={`award-card-${index}`}
              onClick={() => handleAwardClick(index)}
            >
              {/* Top glow effect when expanded */}
              {expandedAward === index && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 to-transparent opacity-0"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              <motion.div className="p-4">
                <div className="flex items-center mb-3">
                  <div className={`p-3 rounded-full mr-3 ${
                    expandedAward === index 
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-600' 
                      : 'bg-white/10'
                  } transition-colors duration-300`}>
                    {award.icon}
                  </div>
                  <h3 className={`font-bangers text-xl ${
                    expandedAward === index ? 'text-yellow-300' : 'text-white'
                  } transition-colors duration-300`}>
                    {award.title}
                  </h3>
                </div>
                
                <AnimatePresence>
                  {expandedAward === index ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/80 text-sm mb-3">{award.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {award.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {award.unlockDate && (
                        <div className="text-xs text-yellow-300/80 mt-2">
                          Unlocked: {award.unlockDate}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.p 
                      className="text-white/60 text-sm truncate"
                      exit={{ opacity: 0 }}
                    >
                      {award.description.substring(0, 60)}...
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Achievement rarity indicator */}
              <div className="absolute top-2 right-2">
                <div className={`rounded-full w-3 h-3 ${
                  award.rarity === 'legendary' ? 'bg-amber-400 animate-pulse' :
                  award.rarity === 'rare' ? 'bg-purple-400' :
                  award.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                }`} />
              </div>
              
              {/* Click to expand hint */}
              {expandedAward !== index && (
                <div className="absolute bottom-1 right-2 text-white/40 text-xs">
                  Click to expand
                </div>
              )}
            </motion.div>
          ))}
        </div>
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

const awards = [
  {
    title: "Code Master",
    description: "Achieved excellence in coding challenges across multiple programming languages with a perfect score in advanced algorithms.",
    icon: <Crown size={24} className="text-white" />,
    tags: ["Algorithms", "Problem Solving", "Multiple Languages"],
    rarity: "legendary",
    unlockDate: "April 10, 2025"
  },
  {
    title: "Design Virtuoso",
    description: "Created exceptional UI/UX designs that received recognition from the design community for innovation and user-centered approach.",
    icon: <Award size={24} className="text-white" />,
    tags: ["UI/UX", "Creative Design", "User Experience"],
    rarity: "rare",
    unlockDate: "March 22, 2025"
  },
  {
    title: "Performance Guru",
    description: "Optimized application performance resulting in 80% faster load times and significantly improved user experience metrics.",
    icon: <Gauge size={24} className="text-white" />,
    tags: ["Optimization", "Speed", "Technical Excellence"],
    rarity: "rare",
    unlockDate: "February 15, 2025"
  },
  {
    title: "Full Stack Champion",
    description: "Demonstrated mastery in both frontend and backend technologies, creating seamless end-to-end solutions with modern tech stacks.",
    icon: <Badge size={24} className="text-white" />,
    tags: ["Frontend", "Backend", "Database", "DevOps"],
    rarity: "uncommon",
    unlockDate: "January 30, 2025"
  },
  {
    title: "Innovation Pioneer",
    description: "Introduced groundbreaking features that redefined user interactions and set new standards for portfolio applications.",
    icon: <Sparkles size={24} className="text-white" />,
    tags: ["Innovation", "Creativity", "Technical Excellence"],
    rarity: "legendary",
    unlockDate: "December 12, 2024"
  },
  {
    title: "Team Collaborator",
    description: "Demonstrated exceptional teamwork skills, facilitating successful project completions through effective communication and leadership.",
    icon: <Users2 size={24} className="text-white" />,
    tags: ["Teamwork", "Communication", "Leadership"],
    rarity: "uncommon",
    unlockDate: "November 5, 2024"
  },
];

export default EnhancedGameFeatures;
