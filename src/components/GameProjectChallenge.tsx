import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Check, Clock, Cpu, Database, GitBranch, Globe, Heart, Play, RotateCcw, Rocket, Shield, Star, Trophy, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useSound } from '../contexts/SoundContext';

declare global {
  interface Window {
    confetti?: (options?: any) => void;
  }
}

interface ProjectTask {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  color: string;
  completed: boolean;
  timeRequired: number; // in seconds
}

const GameProjectChallenge: React.FC = () => {
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([
    {
      id: 'wireframe',
      name: 'Create Wireframes',
      description: 'Design the basic structure of your portfolio site',
      points: 100,
      icon: <Globe size={20} />,
      color: '#4A90E2',
      completed: false,
      timeRequired: 20
    },
    {
      id: 'frontend',
      name: 'Frontend Implementation',
      description: 'Build responsive UI components for your portfolio',
      points: 150,
      icon: <Cpu size={20} />,
      color: '#F06292',
      completed: false,
      timeRequired: 30
    },
    {
      id: 'backend',
      name: 'Backend Integration',
      description: 'Set up backend services for your portfolio functionality',
      points: 200,
      icon: <Database size={20} />,
      color: '#66BB6A',
      completed: false,
      timeRequired: 40
    },
    {
      id: 'deployment',
      name: 'Deployment',
      description: 'Deploy your portfolio to a live server',
      points: 120,
      icon: <Rocket size={20} />,
      color: '#FFD54F',
      completed: false,
      timeRequired: 25
    },
    {
      id: 'optimization',
      name: 'Performance Optimization',
      description: 'Optimize loading speed and performance',
      points: 180,
      icon: <Zap size={20} />,
      color: '#AB47BC',
      completed: false,
      timeRequired: 35
    }
  ]);

  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [projectComplete, setProjectComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const { playSound } = useSound();

  useEffect(() => {
    if (typeof window.confetti === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
      script.async = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        console.log('Confetti script loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load confetti script');
      };
    }
  }, []);

  useEffect(() => {
    if (activeTask && timeRemaining !== null) {
      if (timeRemaining <= 0) {
        handleTaskFailure();
        return;
      }

      const interval = setInterval(() => {
        setTimeRemaining(prev => prev !== null ? prev - 1 : null);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeTask, timeRemaining]);

  useEffect(() => {
    if (projectTasks.every(task => task.completed) && !projectComplete) {
      setProjectComplete(true);
      toast.success("Project complete! You've mastered all challenges!");
      playSound('success');
      
      const triggerConfetti = () => {
        const colors = ['#4A90E2', '#F06292', '#66BB6A', '#FFD54F', '#AB47BC'];
        
        const confettiConfig = {
          particleCount: 100,
          spread: 70,
          colors,
          origin: { y: 0.6 }
        };
        
        if (typeof window.confetti === 'function') {
          window.confetti(confettiConfig);
        }
      };
      
      setTimeout(triggerConfetti, 500);
    }
  }, [projectTasks, projectComplete, playSound]);

  const startTask = (taskId: string) => {
    const task = projectTasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setActiveTask(taskId);
      setTimeRemaining(task.timeRequired);
      toast.info(`Started: ${task.name}`);
      playSound('notification');
    }
  };

  const completeTask = (taskId: string) => {
    setProjectTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: true } 
          : task
      )
    );
    
    const task = projectTasks.find(t => t.id === taskId);
    if (task) {
      setScore(prev => prev + task.points);
      toast.success(`Task completed: ${task.name} (+${task.points} points)`);
      playSound('success');
    }
    
    setActiveTask(null);
    setTimeRemaining(null);
  };

  const handleTaskFailure = () => {
    setActiveTask(null);
    setTimeRemaining(null);
    setLives(prev => prev - 1);
    playSound('error');
    
    if (lives <= 1) {
      toast.error("Game over! You've run out of lives.");
      return;
    }
    
    toast.error("You ran out of time! Lost a life.");
  };

  const resetGame = () => {
    setProjectTasks(prev => 
      prev.map(task => ({ ...task, completed: false }))
    );
    setScore(0);
    setLives(3);
    setActiveTask(null);
    setTimeRemaining(null);
    setProjectComplete(false);
    toast.info("Game reset! Start building your portfolio again.");
    playSound('transition');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bangers text-white flex items-center">
          <Cpu className="mr-2 text-yellow-400" size={28} />
          Portfolio Builder Challenge
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center">
            <Trophy className="text-yellow-400 mr-2" size={18} />
            <span className="text-white font-bold">{score}</span>
          </div>
          
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart 
                key={i} 
                className="text-red-400 mr-1" 
                size={18} 
                fill="rgba(248, 113, 113, 0.8)" 
              />
            ))}
          </div>
        </div>
      </div>
      
      {activeTask && timeRemaining !== null && (
        <motion.div
          className="mb-6 bg-white/10 p-4 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-bold flex items-center">
              <Clock className="mr-2 text-yellow-400" size={18} />
              Time Remaining
            </h3>
            <span className="text-white font-mono text-xl">{timeRemaining}s</span>
          </div>
          
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: "100%" }}
              animate={{ 
                width: `${(timeRemaining / (projectTasks.find(t => t.id === activeTask)?.timeRequired || 1)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="flex justify-end mt-4">
            <motion.button
              className="px-4 py-2 bg-green-500 text-white rounded-full font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => completeTask(activeTask)}
              onMouseEnter={() => playSound('hover')}
            >
              Complete Task
            </motion.button>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projectTasks.map((task) => (
          <motion.div
            key={task.id}
            className={`p-4 rounded-lg border-l-4 transition-all ${
              task.completed 
                ? 'bg-white/5 border-green-500' 
                : activeTask === task.id
                  ? 'bg-white/10 shadow-lg border-yellow-400'
                  : 'bg-white/5 border-gray-600 hover:bg-white/10'
            }`}
            whileHover={!task.completed && activeTask !== task.id ? { scale: 1.02 } : {}}
            onMouseEnter={() => playSound('hover')}
          >
            <div className="flex items-start">
              <div 
                className={`p-3 rounded-full mr-3 ${
                  task.completed ? 'bg-green-500/20' : 'bg-white/10'
                }`}
                style={{ color: task.color }}
              >
                {task.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold ${task.completed ? 'text-green-400' : 'text-white'}`}>
                    {task.name}
                  </h3>
                  <span className="text-yellow-400 font-bold text-sm">+{task.points}</span>
                </div>
                
                <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock size={14} className="mr-1" />
                    <span>{task.timeRequired}s</span>
                  </div>
                  
                  {task.completed ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                      <Check size={12} className="mr-1" />
                      Completed
                    </span>
                  ) : activeTask === task.id ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                      <Play size={12} className="mr-1" />
                      In Progress
                    </span>
                  ) : (
                    <motion.button
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startTask(task.id)}
                      disabled={!!activeTask}
                      onMouseEnter={() => playSound('hover')}
                    >
                      Start Task
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {projectComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-center"
          >
            <Award className="text-yellow-300 mx-auto mb-3" size={48} />
            <h3 className="text-2xl font-bangers text-white mb-2">Project Complete!</h3>
            <p className="text-white/80 mb-4">
              You've successfully built your portfolio project and earned:
            </p>
            
            <div className="bg-white/10 p-4 rounded-lg mb-6">
              <div className="flex justify-between text-white">
                <span>Total Score:</span>
                <span className="font-bold">{score} points</span>
              </div>
              
              <div className="flex justify-between text-white">
                <span>Remaining Lives:</span>
                <span className="font-bold">{lives} ❤️</span>
              </div>
              
              <div className="flex justify-between text-white">
                <span>Rank:</span>
                <span className="font-bold">
                  {score >= 700 ? 'Master Developer' : 
                   score >= 500 ? 'Expert Developer' : 
                   score >= 300 ? 'Skilled Developer' : 'Junior Developer'}
                </span>
              </div>
            </div>
            
            <motion.button
              className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              onMouseEnter={() => playSound('hover')}
            >
              <RotateCcw size={16} className="mr-2 inline-block" />
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!projectComplete && !activeTask && (
        <div className="text-center mt-4">
          <p className="text-white/70 text-sm mb-3">
            Select a task to start building your portfolio project
          </p>
          
          {lives < 3 && (
            <motion.button
              className="px-4 py-2 bg-gray-700 text-white/80 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              onMouseEnter={() => playSound('hover')}
            >
              <RotateCcw size={14} className="mr-1 inline-block" />
              Reset Game
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default GameProjectChallenge;
