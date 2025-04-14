
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad, Trophy, Book, Brain, Sparkles, Rocket, Clock, ArrowRight } from 'lucide-react';
import GameLevelSelector from './GameLevelSelector';
import GameProjectChallenge from './GameProjectChallenge';
import EnhancedGameFeatures from './EnhancedGameFeatures';
import PortfolioGame from './PortfolioGame';

const PortfolioGameHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const games = [
    {
      id: 'arcade',
      name: 'Portfolio Arcade',
      description: 'Navigate through obstacles while collecting skills and achievements',
      component: <PortfolioGame />,
      icon: <Gamepad size={24} />,
      color: '#4A90E2'
    },
    {
      id: 'project',
      name: 'Project Builder',
      description: 'Complete project tasks against the clock to build your portfolio',
      component: <GameProjectChallenge />,
      icon: <Brain size={24} />,
      color: '#F06292'
    },
    {
      id: 'levels',
      name: 'Career Progression',
      description: 'Level up your skills from beginner to expert',
      component: <GameLevelSelector />,
      icon: <Trophy size={24} />,
      color: '#FFD54F'
    },
    {
      id: 'features',
      name: 'Coming Soon',
      description: 'Explore upcoming portfolio game features',
      component: <EnhancedGameFeatures />,
      icon: <Rocket size={24} />,
      color: '#66BB6A'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl shadow-2xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bangers text-white flex items-center">
              <Gamepad className="mr-3 text-yellow-400" size={40} />
              Portfolio Game Hub
            </h1>
            <p className="text-indigo-200 mt-2">
              Showcase your skills through interactive games and challenges
            </p>
          </div>
          
          {activeGame && (
            <motion.button
              className="mt-4 md:mt-0 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveGame(null)}
            >
              <ArrowRight className="mr-2 transform rotate-180" size={16} />
              Back to Games
            </motion.button>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="game-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
                  }}
                  onClick={() => setActiveGame(game.id)}
                >
                  <div 
                    className="h-3 w-full" 
                    style={{ backgroundColor: game.color }}
                  />
                  
                  <div className="p-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${game.color}30` }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        style={{ color: game.color }}
                      >
                        {game.icon}
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bangers text-white mb-2">{game.name}</h3>
                    <p className="text-indigo-200 text-sm mb-4">{game.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-indigo-200">
                        <Clock size={14} className="mr-1" />
                        <span>5-15 min</span>
                      </div>
                      
                      <motion.div
                        className="flex items-center text-yellow-400 text-xs font-medium"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span>Play Now</span>
                        <ArrowRight size={14} className="ml-1" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="active-game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {games.find(game => game.id === activeGame)?.component}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {!activeGame && (
        <motion.div
          className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-purple-900/50 rounded-full mb-4">
            <Sparkles size={24} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bangers text-white mb-2">Your Gaming Stats</h2>
          <p className="text-indigo-200 mb-4">Track your progress across all portfolio games</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white text-lg font-medium">Games Played</h3>
              <p className="text-3xl font-bold text-yellow-400">6</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white text-lg font-medium">Total Score</h3>
              <p className="text-3xl font-bold text-yellow-400">1,250</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white text-lg font-medium">Skills Unlocked</h3>
              <p className="text-3xl font-bold text-yellow-400">12</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white text-lg font-medium">Current Rank</h3>
              <p className="text-3xl font-bold text-yellow-400">Expert</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioGameHub;
