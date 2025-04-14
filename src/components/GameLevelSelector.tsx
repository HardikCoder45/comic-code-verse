import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Lock, Trophy, Cpu, Brain, Globe, Zap, Rocket, Shield, Award, Code } from 'lucide-react';

interface GameLevel {
  id: number;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  skills: string[];
  challenges: string[];
  reward: string;
}

const levels: GameLevel[] = [
  {
    id: 1,
    name: "Skills Showcase",
    description: "Master foundational programming skills in this introductory level.",
    difficulty: "Beginner",
    icon: <Code size={28} />,
    color: "#4A90E2",
    unlocked: true,
    skills: ["HTML", "CSS", "JavaScript"],
    challenges: ["Collect core web technologies", "Avoid syntax errors", "Build your first website"],
    reward: "Coding Foundation Badge"
  },
  {
    id: 2,
    name: "Frontend Path",
    description: "Develop interactive UIs and responsive designs with modern frameworks.",
    difficulty: "Intermediate",
    icon: <Globe size={28} />,
    color: "#FF9800",
    unlocked: true,
    skills: ["React", "Vue", "TypeScript", "Tailwind"],
    challenges: ["Master component architecture", "Implement state management", "Create responsive layouts"],
    reward: "Frontend Developer Badge"
  },
  {
    id: 3,
    name: "Full Stack Journey",
    description: "Connect your frontend with powerful backend technologies.",
    difficulty: "Advanced",
    icon: <Cpu size={28} />,
    color: "#66BB6A",
    unlocked: false,
    skills: ["Node.js", "Express", "MongoDB", "AWS"],
    challenges: ["Build REST APIs", "Implement authentication", "Deploy to the cloud"],
    reward: "Full Stack Developer Badge"
  },
  {
    id: 4,
    name: "Innovation Mastery",
    description: "Push boundaries with cutting-edge technologies and innovation.",
    difficulty: "Expert",
    icon: <Brain size={28} />,
    color: "#AB47BC",
    unlocked: false,
    skills: ["AI/ML", "Blockchain", "AR/VR", "Web3"],
    challenges: ["Integrate AI capabilities", "Build immersive experiences", "Create decentralized applications"],
    reward: "Tech Innovator Badge"
  }
];

const GameLevelSelector: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <h2 className="text-3xl font-bangers text-white mb-6 flex items-center">
        <Trophy className="mr-3 text-yellow-400" size={32} />
        Portfolio Adventure Levels
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {levels.map((level) => (
          <motion.div
            key={level.id}
            className={`relative rounded-lg p-5 ${level.unlocked ? 'cursor-pointer' : 'opacity-70'}`}
            style={{ backgroundColor: `${level.color}20`, borderLeft: `4px solid ${level.color}` }}
            whileHover={level.unlocked ? { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" } : {}}
            onClick={() => level.unlocked && setSelectedLevel(level)}
            onMouseEnter={() => setHoveredLevel(level.id)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            {!level.unlocked && (
              <div className="absolute right-3 top-3">
                <Lock size={20} className="text-gray-400" />
              </div>
            )}
            
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full mr-3" style={{ backgroundColor: level.color }}>
                {level.icon}
              </div>
              <div>
                <h3 className="text-xl font-bangers text-white">{level.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  level.difficulty === 'Beginner' ? 'bg-blue-200 text-blue-800' :
                  level.difficulty === 'Intermediate' ? 'bg-yellow-200 text-yellow-800' :
                  level.difficulty === 'Advanced' ? 'bg-green-200 text-green-800' :
                  'bg-purple-200 text-purple-800'
                }`}>
                  {level.difficulty}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{level.description}</p>
            
            <AnimatePresence>
              {hoveredLevel === level.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center">
                        <Zap size={14} className="mr-1 text-yellow-400" />
                        Skills:
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {level.skills.map((skill, i) => (
                          <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center">
                        <Shield size={14} className="mr-1 text-yellow-400" />
                        Challenges:
                      </h4>
                      <ul className="list-disc list-inside text-xs text-gray-300 ml-1">
                        {level.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center">
                      <Award size={14} className="mr-1 text-yellow-400" />
                      <span className="text-xs text-white">Reward: {level.reward}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {level.unlocked ? (
              <motion.button
                className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium flex items-center"
                whileHover={{ backgroundColor: `${level.color}50`, scale: 1.05 }}
              >
                <Rocket size={14} className="mr-2" />
                Start Adventure
              </motion.button>
            ) : (
              <div className="mt-4 px-4 py-2 rounded-full bg-white/5 text-white/50 text-sm font-medium flex items-center">
                <Lock size={14} className="mr-2" />
                Complete Previous Level
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 mr-2" />
            <h3 className="font-bangers text-white text-lg">Your Portfolio Adventure Progress</h3>
          </div>
          <div className="text-white/70 text-sm">25% Complete</div>
        </div>
        
        <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLevelSelector;
