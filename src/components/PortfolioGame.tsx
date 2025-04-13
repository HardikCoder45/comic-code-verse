import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad, Medal, Star, Book, Code, Coffee, Heart, Zap, X, Shield, Cpu, Database, Globe, Award, Wrench, AlertCircle, Brain, ArrowUp, Clock, ArrowRight, Lock, BookOpen } from 'lucide-react';
import SpeechBubble from './SpeechBubble';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// Game objects and obstacles
interface GameObject {
  id: string;
  type: 'skill' | 'project' | 'achievement' | 'obstacle' | 'powerup';
  x: number;
  y: number;
  width: number;
  height: number;
  icon: React.ReactNode;
  points: number;
  title: string;
  description: string;
  color: string;
  collected?: boolean;
  movePattern?: 'horizontal' | 'vertical' | 'circular' | 'chase';
  speed?: number;
  moveRange?: number;
  initialPos?: {
    x: number;
    y: number;
  };
}

// Game levels definition
interface GameLevel {
  name: string;
  description: string;
  timeLimit: number; // in seconds
  pointsToWin: number;
  characterSpeed: number;
  backgroundColor: string;
  obstacles: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
  objects: GameObject[];
}

// Portfolio items to collect
const gameLevels: GameLevel[] = [
// Level 1: Beginner
{
  name: "Skills Showcase",
  description: "Collect basic programming skills to build your foundation. Watch out for bugs!",
  timeLimit: 60,
  pointsToWin: 250,
  characterSpeed: 5,
  backgroundColor: "#e6f7ff",
  obstacles: [{
    x: 200,
    y: 200,
    width: 100,
    height: 20
  }, {
    x: 400,
    y: 350,
    width: 20,
    height: 150
  }, {
    x: 100,
    y: 400,
    width: 150,
    height: 20
  }, {
    x: 550,
    y: 150,
    width: 20,
    height: 100
  }],
  objects: [{
    id: 'html',
    type: 'skill',
    x: 150,
    y: 200,
    width: 40,
    height: 40,
    icon: <Code size={24} />,
    points: 50,
    title: 'HTML',
    description: 'The foundation of web development',
    color: '#E34F26'
  }, {
    id: 'css',
    type: 'skill',
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    icon: <Code size={24} />,
    points: 50,
    title: 'CSS',
    description: 'Styling web pages with precision',
    color: '#1572B6'
  }, {
    id: 'javascript',
    type: 'skill',
    x: 250,
    y: 450,
    width: 40,
    height: 40,
    icon: <Code size={24} />,
    points: 75,
    title: 'JavaScript',
    description: 'Making websites interactive',
    color: '#F7DF1E'
  }, {
    id: 'portfolio',
    type: 'project',
    x: 500,
    y: 150,
    width: 50,
    height: 50,
    icon: <Globe size={30} />,
    points: 100,
    title: 'First Portfolio',
    description: 'Your first personal website',
    color: '#FF6B6B'
  }, {
    id: 'bug1',
    type: 'obstacle',
    x: 300,
    y: 250,
    width: 30,
    height: 30,
    icon: <X size={20} />,
    points: -25,
    title: 'Bug',
    description: 'Oops! A syntax error!',
    color: '#E74C3C',
    movePattern: 'horizontal',
    speed: 2,
    moveRange: 100,
    initialPos: {
      x: 300,
      y: 250
    }
  }]
},
// Level 2: Intermediate
{
  name: "Frontend Development",
  description: "Master frontend frameworks and libraries. More bugs to dodge!",
  timeLimit: 90,
  pointsToWin: 500,
  characterSpeed: 6,
  backgroundColor: "#f0f8ff",
  obstacles: [{
    x: 150,
    y: 150,
    width: 100,
    height: 20
  }, {
    x: 350,
    y: 300,
    width: 20,
    height: 200
  }, {
    x: 150,
    y: 350,
    width: 120,
    height: 20
  }, {
    x: 500,
    y: 250,
    width: 20,
    height: 150
  }, {
    x: 400,
    y: 400,
    width: 150,
    height: 20
  }],
  objects: [{
    id: 'react',
    type: 'skill',
    x: 150,
    y: 200,
    width: 40,
    height: 40,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React" className="w-full h-full" />,
    points: 100,
    title: 'React',
    description: 'Component-based UI development',
    color: '#61DAFB',
    movePattern: 'vertical',
    speed: 1,
    moveRange: 50,
    initialPos: {
      x: 150,
      y: 200
    }
  }, {
    id: 'vue',
    type: 'skill',
    x: 500,
    y: 350,
    width: 40,
    height: 40,
    icon: <Cpu size={24} />,
    points: 100,
    title: 'Vue.js',
    description: 'Progressive JavaScript framework',
    color: '#4FC08D'
  }, {
    id: 'typescript',
    type: 'skill',
    x: 300,
    y: 200,
    width: 40,
    height: 40,
    icon: <Code size={24} />,
    points: 100,
    title: 'TypeScript',
    description: 'Typed JavaScript at any scale',
    color: '#007ACC'
  }, {
    id: 'shopsite',
    type: 'project',
    x: 400,
    y: 150,
    width: 50,
    height: 50,
    icon: <Globe size={30} />,
    points: 150,
    title: 'E-commerce Site',
    description: 'Built an online shopping platform',
    color: '#9B59B6'
  }, {
    id: 'powerup1',
    type: 'powerup',
    x: 250,
    y: 400,
    width: 35,
    height: 35,
    icon: <Shield size={20} />,
    points: 50,
    title: 'Speed Boost',
    description: 'Temporarily increases your speed!',
    color: '#2ECC71'
  }, {
    id: 'bug2',
    type: 'obstacle',
    x: 200,
    y: 300,
    width: 30,
    height: 30,
    icon: <X size={20} />,
    points: -50,
    title: 'Logic Bug',
    description: 'A tricky logical error appeared!',
    color: '#E74C3C',
    movePattern: 'circular',
    speed: 2,
    moveRange: 80,
    initialPos: {
      x: 200,
      y: 300
    }
  }, {
    id: 'bug3',
    type: 'obstacle',
    x: 450,
    y: 200,
    width: 30,
    height: 30,
    icon: <AlertCircle size={20} />,
    points: -75,
    title: 'Critical Bug',
    description: 'This one could crash your app!',
    color: '#C0392B',
    movePattern: 'chase',
    speed: 1.5,
    initialPos: {
      x: 450,
      y: 200
    }
  }]
},
// Level 3: Advanced
{
  name: "Full Stack Mastery",
  description: "Conquer full stack development with advanced skills and complex projects.",
  timeLimit: 120,
  pointsToWin: 1000,
  characterSpeed: 7,
  backgroundColor: "#f5f5f5",
  obstacles: [{
    x: 100,
    y: 150,
    width: 20,
    height: 300
  }, {
    x: 200,
    y: 100,
    width: 300,
    height: 20
  }, {
    x: 600,
    y: 200,
    width: 20,
    height: 250
  }, {
    x: 200,
    y: 450,
    width: 400,
    height: 20
  }, {
    x: 200,
    y: 250,
    width: 20,
    height: 200
  }, {
    x: 300,
    y: 250,
    width: 200,
    height: 20
  }, {
    x: 500,
    y: 250,
    width: 20,
    height: 100
  }, {
    x: 300,
    y: 350,
    width: 100,
    height: 20
  }],
  objects: [{
    id: 'node',
    type: 'skill',
    x: 150,
    y: 200,
    width: 40,
    height: 40,
    icon: <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" className="w-full h-full" />,
    points: 150,
    title: 'Node.js',
    description: 'JavaScript runtime for server-side code',
    color: '#68A063',
    movePattern: 'horizontal',
    speed: 2,
    moveRange: 100,
    initialPos: {
      x: 150,
      y: 200
    }
  }, {
    id: 'mongodb',
    type: 'skill',
    x: 550,
    y: 300,
    width: 40,
    height: 40,
    icon: <Database size={24} />,
    points: 150,
    title: 'MongoDB',
    description: 'NoSQL database for modern apps',
    color: '#4DB33D'
  }, {
    id: 'aws',
    type: 'skill',
    x: 250,
    y: 400,
    width: 40,
    height: 40,
    icon: <Globe size={24} />,
    points: 150,
    title: 'AWS',
    description: 'Cloud computing platform',
    color: '#FF9900',
    movePattern: 'vertical',
    speed: 1.5,
    moveRange: 80,
    initialPos: {
      x: 250,
      y: 400
    }
  }, {
    id: 'docker',
    type: 'skill',
    x: 400,
    y: 200,
    width: 40,
    height: 40,
    icon: <Wrench size={24} />,
    points: 150,
    title: 'Docker',
    description: 'Containerization platform',
    color: '#2496ED'
  }, {
    id: 'saas',
    type: 'project',
    x: 550,
    y: 150,
    width: 50,
    height: 50,
    icon: <Zap size={30} />,
    points: 200,
    title: 'SaaS Platform',
    description: 'Built a subscription-based service',
    color: '#9B59B6',
    movePattern: 'circular',
    speed: 1,
    moveRange: 50,
    initialPos: {
      x: 550,
      y: 150
    }
  }, {
    id: 'ai',
    type: 'project',
    x: 150,
    y: 350,
    width: 50,
    height: 50,
    icon: <Cpu size={30} />,
    points: 200,
    title: 'AI Integration',
    description: 'Added machine learning to applications',
    color: '#3498DB'
  }, {
    id: 'achievement1',
    type: 'achievement',
    x: 350,
    y: 300,
    width: 60,
    height: 60,
    icon: <Award size={40} />,
    points: 300,
    title: 'Open Source Star',
    description: 'Major contribution to open source',
    color: '#F1C40F'
  }, {
    id: 'powerup2',
    type: 'powerup',
    x: 450,
    y: 400,
    width: 35,
    height: 35,
    icon: <Shield size={20} />,
    points: 100,
    title: 'Bug Shield',
    description: 'Temporary immunity to bugs!',
    color: '#2ECC71'
  }, {
    id: 'bug4',
    type: 'obstacle',
    x: 300,
    y: 200,
    width: 35,
    height: 35,
    icon: <X size={25} />,
    points: -100,
    title: 'Production Bug',
    description: 'A critical error in production!',
    color: '#E74C3C',
    movePattern: 'chase',
    speed: 2.5,
    initialPos: {
      x: 300,
      y: 200
    }
  }, {
    id: 'bug5',
    type: 'obstacle',
    x: 500,
    y: 350,
    width: 30,
    height: 30,
    icon: <AlertCircle size={20} />,
    points: -75,
    title: 'Memory Leak',
    description: 'This bug slowly eats your resources!',
    color: '#C0392B',
    movePattern: 'circular',
    speed: 2,
    moveRange: 100,
    initialPos: {
      x: 500,
      y: 350
    }
  }]
},
// Level 4: Expert Challenge
{
  name: "Tech Innovator",
  description: "Master cutting-edge technologies and become a true tech innovator. Beware of complex challenges!",
  timeLimit: 180,
  pointsToWin: 1500,
  characterSpeed: 8,
  backgroundColor: "#f0f8ff",
  obstacles: [
    // Maze-like structure
    {x: 100, y: 100, width: 600, height: 20},
    {x: 100, y: 100, width: 20, height: 500},
    {x: 100, y: 600, width: 600, height: 20},
    {x: 700, y: 100, width: 20, height: 500},
    // Inner walls
    {x: 200, y: 200, width: 20, height: 300},
    {x: 200, y: 200, width: 400, height: 20},
    {x: 600, y: 200, width: 20, height: 300},
    {x: 200, y: 500, width: 400, height: 20},
    // Cross section
    {x: 300, y: 300, width: 200, height: 20},
    {x: 400, y: 300, width: 20, height: 200},
  ],
  objects: [
    {
      id: 'ai_ml',
      type: 'skill',
      x: 150, y: 150,
      width: 45, height: 45,
      icon: <Brain size={28} />,
      points: 200,
      title: 'AI/ML',
      description: 'Advanced AI and machine learning skills',
      color: '#8E44AD',
      movePattern: 'circular',
      speed: 2,
      moveRange: 50,
      initialPos: {x: 150, y: 150}
    },
    {
      id: 'blockchain',
      type: 'skill',
      x: 650, y: 150,
      width: 45, height: 45,
      icon: <Database size={28} />,
      points: 200,
      title: 'Blockchain',
      description: 'Decentralized app development',
      color: '#F39C12',
      movePattern: 'vertical',
      speed: 1.5,
      moveRange: 100,
      initialPos: {x: 650, y: 150}
    },
    {
      id: 'ar_vr',
      type: 'skill',
      x: 150, y: 550,
      width: 45, height: 45,
      icon: <Globe size={28} />,
      points: 200,
      title: 'AR/VR',
      description: 'Augmented and virtual reality development',
      color: '#16A085',
      movePattern: 'horizontal',
      speed: 2,
      moveRange: 100,
      initialPos: {x: 150, y: 550}
    },
    {
      id: 'quantum',
      type: 'skill',
      x: 650, y: 550,
      width: 45, height: 45,
      icon: <Cpu size={28} />,
      points: 250,
      title: 'Quantum Computing',
      description: 'The future of computing',
      color: '#2980B9',
      movePattern: 'chase',
      speed: 0.8,
      initialPos: {x: 650, y: 550}
    },
    {
      id: 'metaverse',
      type: 'project',
      x: 400, y: 400,
      width: 60, height: 60,
      icon: <Globe size={35} />,
      points: 350,
      title: 'Metaverse Platform',
      description: 'Built a revolutionary virtual world',
      color: '#9B59B6',
      movePattern: 'circular',
      speed: 1,
      moveRange: 150,
      initialPos: {x: 400, y: 400}
    },
    {
      id: 'innovation_award',
      type: 'achievement',
      x: 250, y: 350,
      width: 65, height: 65,
      icon: <Award size={45} />,
      points: 500,
      title: 'Tech Innovator Award',
      description: 'Recognized for groundbreaking innovation',
      color: '#F1C40F'
    },
    {
      id: 'time_warp',
      type: 'powerup',
      x: 550, y: 350,
      width: 40, height: 40,
      icon: <Shield size={24} />,
      points: 150,
      title: 'Time Warp',
      description: 'Temporarily slows down time',
      color: '#3498DB'
    },
    // Advanced obstacles
    {
      id: 'security_threat',
      type: 'obstacle',
      x: 300, y: 500,
      width: 35, height: 35,
      icon: <AlertCircle size={24} />,
      points: -125,
      title: 'Security Breach',
      description: 'A major security vulnerability!',
      color: '#C0392B',
      movePattern: 'chase',
      speed: 2.5,
      initialPos: {x: 300, y: 500}
    },
    {
      id: 'complexity',
      type: 'obstacle',
      x: 500, y: 250,
      width: 35, height: 35,
      icon: <X size={24} />,
      points: -100,
      title: 'Complexity Overload',
      description: 'Your system is too complex!',
      color: '#E74C3C',
      movePattern: 'circular',
      speed: 3,
      moveRange: 80,
      initialPos: {x: 500, y: 250}
    }
  ]
}
];

const PortfolioGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({
    x: 50,
    y: 50
  });
  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0
  });
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [objects, setObjects] = useState<GameObject[]>(gameLevels[0].objects);
  const [collectedItems, setCollectedItems] = useState<GameObject[]>([]);
  const [showInfo, setShowInfo] = useState<GameObject | null>(null);
  const [timeLeft, setTimeLeft] = useState(gameLevels[0].timeLimit);
  const [powerups, setPowerups] = useState<{
    speedBoost: boolean;
    bugShield: boolean;
  }>({
    speedBoost: false,
    bugShield: false
  });
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [lives, setLives] = useState(3);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const characterSize = {
    width: 40,
    height: 40
  };
  const characterBaseSpeed = gameLevels[currentLevel]?.characterSpeed || 5;
  const characterSpeed = powerups.speedBoost ? characterBaseSpeed * 1.5 : characterBaseSpeed;

  // Timer for countdown
  useEffect(() => {
    if (!gameStarted || gameOver || levelCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, levelCompleted]);

  // Handle power-up timers
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (powerups.speedBoost) {
      const timer = setTimeout(() => {
        setPowerups(prev => ({
          ...prev,
          speedBoost: false
        }));
        toast("Speed boost expired!");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [powerups.speedBoost, gameStarted, gameOver]);
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (powerups.bugShield) {
      const timer = setTimeout(() => {
        setPowerups(prev => ({
          ...prev,
          bugShield: false
        }));
        toast("Bug shield expired!");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [powerups.bugShield, gameStarted, gameOver]);

  // Handle game over
  const handleGameOver = (message: string) => {
    setGameOver(true);
    toast.error(message);
  };

  // Complete level
  const completeLevel = () => {
    setLevelCompleted(true);
    setTotalScore(prev => prev + score);
    toast.success(`Level ${currentLevel + 1} completed! Score: ${score}`);
  };

  // Start next level
  const startNextLevel = () => {
    if (currentLevel < gameLevels.length - 1) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setObjects(gameLevels[nextLevel].objects);
      setScore(0);
      setPosition({
        x: 50,
        y: 50
      });
      setVelocity({
        x: 0,
        y: 0
      });
      setTimeLeft(gameLevels[nextLevel].timeLimit);
      setLevelCompleted(false);
      setPowerups({
        speedBoost: false,
        bugShield: false
      });
      setCollectedItems([]);
      toast.success(`Starting Level ${nextLevel + 1}: ${gameLevels[nextLevel].name}`);
    } else {
      // Game complete!
      setGameOver(true);
      toast.success(`Congratulations! You've completed all levels with a total score of ${totalScore + score}!`);
      setTotalScore(prev => prev + score);
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || levelCompleted) return;
    const gameTick = () => {
      // Update character position
      setPosition(prev => {
        const newPos = {
          x: prev.x + velocity.x,
          y: prev.y + velocity.y
        };

        // Check boundaries
        if (gameAreaRef.current) {
          const bounds = gameAreaRef.current.getBoundingClientRect();
          if (newPos.x < 0) newPos.x = 0;
          if (newPos.y < 0) newPos.y = 0;
          if (newPos.x > bounds.width - characterSize.width) {
            newPos.x = bounds.width - characterSize.width;
          }
          if (newPos.y > bounds.height - characterSize.height) {
            newPos.y = bounds.height - characterSize.height;
          }

          // Check obstacle collisions
          for (const obstacle of gameLevels[currentLevel].obstacles) {
            if (newPos.x < obstacle.x + obstacle.width && newPos.x + characterSize.width > obstacle.x && newPos.y < obstacle.y + obstacle.height && newPos.y + characterSize.height > obstacle.y) {
              // Collision detected, prevent movement
              return prev;
            }
          }
        }
        return newPos;
      });

      // Update game objects (movement)
      setObjects(prev => {
        return prev.map(obj => {
          if (obj.collected || !obj.movePattern || !obj.speed) return obj;
          let newX = obj.x;
          let newY = obj.y;
          const initialX = obj.initialPos?.x || obj.x;
          const initialY = obj.initialPos?.y || obj.y;
          switch (obj.movePattern) {
            case 'horizontal':
              newX = initialX + Math.sin(Date.now() * 0.001 * obj.speed) * (obj.moveRange || 50);
              break;
            case 'vertical':
              newY = initialY + Math.sin(Date.now() * 0.001 * obj.speed) * (obj.moveRange || 50);
              break;
            case 'circular':
              newX = initialX + Math.cos(Date.now() * 0.001 * obj.speed) * (obj.moveRange || 50);
              newY = initialY + Math.sin(Date.now() * 0.001 * obj.speed) * (obj.moveRange || 50);
              break;
            case 'chase':
              // Simple chase logic - move toward player slowly
              const dx = position.x - obj.x;
              const dy = position.y - obj.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 5) {
                newX = obj.x + dx / dist * obj.speed;
                newY = obj.y + dy / dist * obj.speed;
              }
              break;
          }
          return {
            ...obj,
            x: newX,
            y: newY
          };
        });
      });

      // Check collectibles
      setObjects(prev => {
        const updatedObjects = [...prev];
        let objectCollected = false;
        let levelPointsReached = false;
        for (let i = 0; i < updatedObjects.length; i++) {
          const obj = updatedObjects[i];
          if (obj.collected) continue;

          // Check collision with object
          if (position.x < obj.x + obj.width && position.x + characterSize.width > obj.x && position.y < obj.y + obj.height && position.y + characterSize.height > obj.y) {
            // Handle collision based on object type
            if (obj.type === 'obstacle' && !powerups.bugShield) {
              // Hit an obstacle (bug)
              updatedObjects[i] = {
                ...obj,
                collected: true
              };
              setScore(prevScore => prevScore + obj.points);
              setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                  handleGameOver("Game Over! You ran out of lives.");
                }
                return newLives;
              });
              toast.error(`Ouch! ${obj.title}: ${obj.points} points`);
            } else if (obj.type === 'powerup') {
              // Collected a power-up
              updatedObjects[i] = {
                ...obj,
                collected: true
              };
              setScore(prevScore => prevScore + obj.points);

              // Apply power-up effect
              if (obj.title === 'Speed Boost') {
                setPowerups(prev => ({
                  ...prev,
                  speedBoost: true
                }));
                toast.success("Speed Boost activated for 5 seconds!");
              } else if (obj.title === 'Bug Shield') {
                setPowerups(prev => ({
                  ...prev,
                  bugShield: true
                }));
                toast.success("Bug Shield activated for 7 seconds!");
              }
              setCollectedItems(prev => [...prev, obj]);
            } else {
              // Collect regular item
              updatedObjects[i] = {
                ...obj,
                collected: true
              };
              setScore(prevScore => {
                const newScore = prevScore + obj.points;
                // Check if reached points to win level
                if (newScore >= gameLevels[currentLevel].pointsToWin) {
                  levelPointsReached = true;
                }
                return newScore;
              });
              setCollectedItems(prev => [...prev, obj]);
              toast.success(`Collected ${obj.title}: +${obj.points} points`);
            }

            // Display object info
            setShowInfo(obj);
            setTimeout(() => setShowInfo(null), 3000);
            objectCollected = true;
          }
        }

        // Check if level is complete
        if (levelPointsReached) {
          completeLevel();
        }
        return updatedObjects;
      });
    };
    const gameInterval = setInterval(gameTick, 16); // ~60fps
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, levelCompleted, velocity, position, currentLevel, powerups.bugShield]);

  // Keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver || levelCompleted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setVelocity(prev => ({
            ...prev,
            y: -characterSpeed
          }));
          break;
        case 'ArrowDown':
        case 's':
          setVelocity(prev => ({
            ...prev,
            y: characterSpeed
          }));
          break;
        case 'ArrowLeft':
        case 'a':
          setVelocity(prev => ({
            ...prev,
            x: -characterSpeed
          }));
          break;
        case 'ArrowRight':
        case 'd':
          setVelocity(prev => ({
            ...prev,
            x: characterSpeed
          }));
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'ArrowDown':
        case 's':
          setVelocity(prev => ({
            ...prev,
            y: 0
          }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'ArrowRight':
        case 'd':
          setVelocity(prev => ({
            ...prev,
            x: 0
          }));
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, levelCompleted, characterSpeed]);
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevelCompleted(false);
    setScore(0);
    setTotalScore(0);
    setLives(3);
    setCurrentLevel(0);
    setPosition({
      x: 50,
      y: 50
    });
    setVelocity({
      x: 0,
      y: 0
    });
    setObjects(gameLevels[0].objects);
    setTimeLeft(gameLevels[0].timeLimit);
    setPowerups({
      speedBoost: false,
      bugShield: false
    });
    setCollectedItems([]);
    toast.success(`Starting Level 1: ${gameLevels[0].name}`);
  };
  const restartGame = () => {
    setGameStarted(false);
    setTimeout(startGame, 100);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  return <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bangers text-comic-pink mb-2">PORTFOLIO ADVENTURE</h1>
        <SpeechBubble type="speech" color="pink" position="top" className="inline-block">
          <p className="font-comic text-black">Master programming skills and build projects in this challenging game!</p>
          <p className="font-comic text-sm mt-1 text-black">Use WASD or arrow keys to move</p>
        </SpeechBubble>
      </div>

      {/* Game stats bar */}
      <div className="flex justify-between items-center mb-4 p-4 bg-comic-blue rounded-xl border-2 border-comic-border">
        <div className="flex items-center">
          <Gamepad size={24} className="text-white mr-2" />
          <span className="font-bangers text-white text-2xl">Level {currentLevel + 1}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white">
            <span className="font-bangers">Score: {score}</span>
            {totalScore > 0 && <span className="text-sm ml-2">(Total: {totalScore + (levelCompleted ? score : 0)})</span>}
          </div>
          
          <div className="text-white">
            <span className="font-bangers">Time: {formatTime(timeLeft)}</span>
          </div>
          
          <div className="text-white">
            <span className="font-bangers">Lives: </span>
            {Array.from({
            length: lives
          }).map((_, i) => <Heart key={i} size={16} className="inline text-red-300 ml-1" fill="white" />)}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {!gameStarted ? <button onClick={startGame} className="comic-button">
              Start Game
            </button> : <button onClick={restartGame} className="comic-button-secondary">
              Restart
            </button>}
        </div>
      </div>
      
      {/* Power-ups status */}
      {gameStarted && !gameOver && (powerups.speedBoost || powerups.bugShield) && <div className="mb-4 p-2 bg-comic-green text-white rounded-lg flex justify-center space-x-4">
          {powerups.speedBoost && <div className="flex items-center">
              <Zap size={18} className="mr-1" />
              <span className="font-comic">Speed Boost Active</span>
            </div>}
          {powerups.bugShield && <div className="flex items-center">
              <Shield size={18} className="mr-1" />
              <span className="font-comic">Bug Shield Active</span>
            </div>}
        </div>}

      {/* Level info */}
      {gameStarted && !gameOver && !levelCompleted && <div className="mb-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="font-bangers text-xl text-comic-blue">{gameLevels[currentLevel].name}</h3>
          <p className="font-comic text-sm">{gameLevels[currentLevel].description}</p>
          <div className="text-sm mt-2">
            <span className="font-bold">Goal: </span>
            <span>Score {gameLevels[currentLevel].pointsToWin} points before time runs out!</span>
          </div>
        </div>}

      {/* Game area */}
      <div ref={gameAreaRef} className="relative w-full h-[500px] rounded-xl border-4 border-comic-border overflow-hidden" style={{
      backgroundColor: gameLevels[currentLevel].backgroundColor,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      backgroundSize: '150px 150px'
    }}>
        {!gameStarted ? <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20">
            <Gamepad size={60} className="text-comic-pink mb-4" />
            <h2 className="text-3xl font-bangers text-comic-blue mb-4">Portfolio Adventure Game</h2>
            <p className="font-comic text-center max-w-md mb-6">
              Challenge yourself with 3 increasingly difficult levels! Collect skills, projects and achievements while avoiding bugs.
            </p>
            <button onClick={startGame} className="comic-button animate-pulse">
              Start Playing
            </button>
          </div> : gameOver ? <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20">
            <Star size={60} className="text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bangers text-comic-green mb-4">Game Complete!</h2>
            <p className="font-comic text-center max-w-md mb-2">
              {lives > 0 ? "Congratulations! You've mastered the portfolio game." : "Game Over! You ran out of lives."}
            </p>
            <p className="font-comic text-2xl mb-6">Final Score: {totalScore + (levelCompleted ? score : 0)}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {collectedItems.filter(item => item.type !== 'obstacle' && item.type !== 'powerup').map(item => <div key={item.id} className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full mr-2" style={{
              backgroundColor: item.color
            }}>
                      {item.icon}
                    </div>
                    <span className="font-comic text-sm">{item.title}</span>
                  </div>)}
            </div>
            <button onClick={restartGame} className="comic-button">
              Play Again
            </button>
          </div> : levelCompleted ? <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20">
            <Award size={60} className="text-comic-yellow mb-4" />
            <h2 className="text-3xl font-bangers text-comic-green mb-4">Level {currentLevel + 1} Complete!</h2>
            <p className="font-comic text-center max-w-md mb-2">
              You've mastered this level with a score of {score}!
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-xl">
              {collectedItems.filter(item => item.type !== 'obstacle' && item.type !== 'powerup').map(item => <div key={item.id} className="flex items-center bg-white p-2 rounded-lg shadow">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full mr-2" style={{
              backgroundColor: item.color
            }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-comic text-sm font-bold">{item.title}</span>
                      <span className="font-comic text-xs block text-gray-600">{item.points} pts</span>
                    </div>
                  </div>)}
            </div>
            
            {currentLevel < gameLevels.length - 1 ? <button onClick={startNextLevel} className="comic-button">
                Next Level: {gameLevels[currentLevel + 1].name}
              </button> : <button onClick={() => {
          setGameOver(true);
          setTotalScore(prev => prev + score);
        }} className="comic-button">
                Complete Game
              </button>}
          </div> : null}

        {/* Game obstacles */}
        {gameStarted && !gameOver && !levelCompleted && gameLevels[currentLevel].obstacles.map((obstacle, index) => <div key={`obstacle-${index}`} className="absolute bg-gray-400 border border-gray-500" style={{
        left: obstacle.x,
        top: obstacle.y,
        width: obstacle.width,
        height: obstacle.height
      }} />)}

        {/* Game objects */}
        {gameStarted && !gameOver && !levelCompleted && objects.map(obj => !obj.collected && <motion.div key={obj.id} className="absolute" style={{
        left: obj.x,
        top: obj.y,
        width: obj.width,
        height: obj.height
      }} animate={{
        y: obj.movePattern === 'vertical' || obj.movePattern === 'circular' ? undefined : [0, -5, 0]
      }} transition={{
        repeat: Infinity,
        duration: 2
      }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{
          backgroundColor: obj.color,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
              {obj.icon}
            </div>
          </motion.div>)}

        {/* Player character */}
        {gameStarted && !gameOver && !levelCompleted && <motion.div className={`absolute rounded-full border-2 border-black flex items-center justify-center ${powerups.bugShield ? "bg-comic-green ring-4 ring-comic-yellow" : "bg-comic-green"} ${powerups.speedBoost ? "animate-pulse" : ""}`} style={{
        left: position.x,
        top: position.y,
        width: characterSize.width,
        height: characterSize.height,
        zIndex: 10
      }} animate={{
        rotate: velocity.x !== 0 ? velocity.x > 0 ? 10 : -10 : 0
      }}>
            <Heart fill="white" size={20} color="white" />
          </motion.div>}

        {/* Info popup */}
        {showInfo && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0
      }} className="absolute left-1/2 bottom-4 transform -translate-x-1/2 z-30">
            <SpeechBubble type="speech" color={showInfo.type === 'obstacle' ? 'orange' : showInfo.type === 'powerup' ? 'yellow' : 'green'} position="bottom">
              <h3 className="font-bold text-black">{showInfo.title}</h3>
              <p className="text-sm text-black">{showInfo.description}</p>
              <p className="text-xs mt-1 font-bold text-black">
                {showInfo.type === 'obstacle' ? `-${Math.abs(showInfo.points)}` : `+${showInfo.points}`} points
              </p>
            </SpeechBubble>
          </motion.div>}
      </div>

      {/* Game controls help */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <h3 className="font-bold text-black mb-2">How to Play</h3>
        <ul className="list-disc list-inside text-sm text-black">
          <li>Use WASD or arrow keys to move your character</li>
          <li>Collect skills, projects and achievements to earn points</li>
          <li>Avoid bugs that will cost you points and lives</li>
          <li>Reach the target score to complete each level</li>
          <li>Collect power-ups for special abilities</li>
          <li>Complete all three levels to master the game</li>
        </ul>
      </div>
    </div>;
};
export default PortfolioGame;