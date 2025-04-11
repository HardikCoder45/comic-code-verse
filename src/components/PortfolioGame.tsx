
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Medal, Star, Book, Code, Coffee, Heart, Zap, X } from 'lucide-react';
import SpeechBubble from './SpeechBubble';
import { toast } from 'sonner';

// Game objects and obstacles
interface GameObject {
  id: string;
  type: 'skill' | 'project' | 'achievement' | 'obstacle';
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
}

// Portfolio items to collect
const gameObjects: GameObject[] = [
  {
    id: 'react',
    type: 'skill',
    x: 150,
    y: 200,
    width: 40,
    height: 40,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React" className="w-full h-full" />,
    points: 100,
    title: 'React Master',
    description: 'Building interactive UIs with component-based architecture',
    color: '#61DAFB'
  },
  {
    id: 'node',
    type: 'skill',
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    icon: <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" className="w-full h-full" />,
    points: 75,
    title: 'Node.js Expert',
    description: 'Building scalable backend services with JavaScript',
    color: '#68A063'
  },
  {
    id: 'portfolio',
    type: 'project',
    x: 250,
    y: 450,
    width: 50,
    height: 50,
    icon: <Code size={30} />,
    points: 150,
    title: 'Portfolio Website',
    description: 'Created this awesome interactive comic portfolio website!',
    color: '#FF6B6B'
  },
  {
    id: 'ai',
    type: 'project',
    x: 500,
    y: 150,
    width: 50,
    height: 50,
    icon: <Zap size={30} />,
    points: 200,
    title: 'AI Integration Expert',
    description: 'Specialized in adding AI capabilities to applications',
    color: '#9B59B6'
  },
  {
    id: 'achievement1',
    type: 'achievement',
    x: 600,
    y: 400,
    width: 60,
    height: 60,
    icon: <Medal size={40} />,
    points: 300,
    title: 'Open Source Contributor',
    description: 'Active contributor to popular open source projects',
    color: '#F1C40F'
  },
  {
    id: 'bug1',
    type: 'obstacle',
    x: 300,
    y: 250,
    width: 30,
    height: 30,
    icon: <X size={20} />,
    points: -50,
    title: 'Bug',
    description: 'Oops! You hit a bug in the code!',
    color: '#E74C3C'
  },
  {
    id: 'bug2',
    type: 'obstacle',
    x: 450,
    y: 350,
    width: 30,
    height: 30,
    icon: <X size={20} />,
    points: -50,
    title: 'Bug',
    description: 'Another pesky bug appears!',
    color: '#E74C3C'
  }
];

// Obstacles
const obstacles = [
  { x: 200, y: 200, width: 100, height: 20 },
  { x: 400, y: 350, width: 20, height: 150 },
  { x: 100, y: 400, width: 150, height: 20 },
  { x: 550, y: 150, width: 20, height: 100 },
];

const PortfolioGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [objects, setObjects] = useState<GameObject[]>(gameObjects);
  const [collectedItems, setCollectedItems] = useState<GameObject[]>([]);
  const [showInfo, setShowInfo] = useState<GameObject | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const characterSize = { width: 40, height: 40 };
  const characterSpeed = 5;

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameTick = () => {
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
          for (const obstacle of obstacles) {
            if (
              newPos.x < obstacle.x + obstacle.width &&
              newPos.x + characterSize.width > obstacle.x &&
              newPos.y < obstacle.y + obstacle.height &&
              newPos.y + characterSize.height > obstacle.y
            ) {
              // Collision detected, prevent movement
              return prev;
            }
          }
        }

        return newPos;
      });

      // Check collectibles
      setObjects(prev => {
        const updatedObjects = [...prev];
        let objectCollected = false;

        for (let i = 0; i < updatedObjects.length; i++) {
          const obj = updatedObjects[i];
          if (obj.collected) continue;

          // Check collision with object
          if (
            position.x < obj.x + obj.width &&
            position.x + characterSize.width > obj.x &&
            position.y < obj.y + obj.height &&
            position.y + characterSize.height > obj.y
          ) {
            // Collect the object
            updatedObjects[i] = { ...obj, collected: true };
            setScore(prevScore => prevScore + obj.points);
            setCollectedItems(prev => [...prev, obj]);
            
            // Show notification
            toast(
              obj.type === 'obstacle' 
                ? `Ouch! ${obj.title}: ${obj.points} points` 
                : `Collected ${obj.title}: +${obj.points} points`
            );
            
            // Display object info
            setShowInfo(obj);
            setTimeout(() => setShowInfo(null), 3000);
            
            objectCollected = true;
          }
        }

        // Check if game is over (all non-obstacles collected)
        if (objectCollected) {
          const remainingItems = updatedObjects.filter(
            obj => !obj.collected && obj.type !== 'obstacle'
          );
          if (remainingItems.length === 0) {
            setGameOver(true);
            toast.success(`Game complete! Final score: ${score}`);
          }
        }

        return updatedObjects;
      });
    };

    const gameInterval = setInterval(gameTick, 16); // ~60fps
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, velocity, position, score]);

  // Keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setVelocity(prev => ({ ...prev, y: -characterSpeed }));
          break;
        case 'ArrowDown':
        case 's':
          setVelocity(prev => ({ ...prev, y: characterSpeed }));
          break;
        case 'ArrowLeft':
        case 'a':
          setVelocity(prev => ({ ...prev, x: -characterSpeed }));
          break;
        case 'ArrowRight':
        case 'd':
          setVelocity(prev => ({ ...prev, x: characterSpeed }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'ArrowDown':
        case 's':
          setVelocity(prev => ({ ...prev, y: 0 }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'ArrowRight':
        case 'd':
          setVelocity(prev => ({ ...prev, x: 0 }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPosition({ x: 50, y: 50 });
    setVelocity({ x: 0, y: 0 });
    setObjects(gameObjects);
    setCollectedItems([]);
    toast.success("Game started! Collect all skills and projects while avoiding bugs!");
  };

  const restartGame = () => {
    setGameStarted(false);
    setTimeout(startGame, 100);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bangers text-comic-pink mb-2">PORTFOLIO ADVENTURE</h1>
        <SpeechBubble type="speech" color="pink" position="top" className="inline-block">
          <p className="font-comic">Explore my skills and projects in this interactive game!</p>
          <p className="font-comic text-sm mt-1">Use WASD or arrow keys to move</p>
        </SpeechBubble>
      </div>

      {/* Game stats bar */}
      <div className="flex justify-between items-center mb-4 p-4 bg-comic-blue rounded-xl border-2 border-comic-border">
        <div className="flex items-center">
          <Gamepad size={24} className="text-white mr-2" />
          <span className="font-bangers text-white text-2xl">Score: {score}</span>
        </div>
        <div className="flex space-x-2">
          {!gameStarted ? (
            <button onClick={startGame} className="comic-button">
              Start Game
            </button>
          ) : (
            <button onClick={restartGame} className="comic-button-secondary">
              Restart
            </button>
          )}
        </div>
      </div>

      {/* Game area */}
      <div 
        ref={gameAreaRef} 
        className="relative w-full h-[500px] bg-gray-100 rounded-xl border-4 border-comic-border overflow-hidden"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '150px 150px'
        }}
      >
        {!gameStarted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20">
            <Gamepad size={60} className="text-comic-pink mb-4" />
            <h2 className="text-3xl font-bangers text-comic-blue mb-4">Portfolio Adventure Game</h2>
            <p className="font-comic text-center max-w-md mb-6">
              Explore my portfolio through this interactive game! Collect skills, projects and achievements while avoiding bugs.
            </p>
            <button onClick={startGame} className="comic-button animate-pulse">
              Start Playing
            </button>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-20">
            <Star size={60} className="text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bangers text-comic-green mb-4">Game Complete!</h2>
            <p className="font-comic text-center max-w-md mb-2">
              Congratulations! You've explored my entire portfolio.
            </p>
            <p className="font-comic text-2xl mb-6">Final Score: {score}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {collectedItems
                .filter(item => item.type !== 'obstacle')
                .map(item => (
                  <div key={item.id} className="flex items-center">
                    <div 
                      className="w-8 h-8 flex items-center justify-center rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>
                    <span className="font-comic text-sm">{item.title}</span>
                  </div>
                ))}
            </div>
            <button onClick={restartGame} className="comic-button">
              Play Again
            </button>
          </div>
        ) : null}

        {/* Game obstacles */}
        {obstacles.map((obstacle, index) => (
          <div
            key={`obstacle-${index}`}
            className="absolute bg-gray-400 border border-gray-500"
            style={{
              left: obstacle.x,
              top: obstacle.y,
              width: obstacle.width,
              height: obstacle.height
            }}
          />
        ))}

        {/* Game objects */}
        {objects.map(obj => !obj.collected && (
          <motion.div
            key={obj.id}
            className="absolute"
            style={{
              left: obj.x,
              top: obj.y,
              width: obj.width,
              height: obj.height
            }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
          >
            <div 
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: obj.color,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {obj.icon}
            </div>
          </motion.div>
        ))}

        {/* Player character */}
        {gameStarted && !gameOver && (
          <motion.div
            className="absolute bg-comic-green rounded-full border-2 border-black flex items-center justify-center"
            style={{
              left: position.x,
              top: position.y,
              width: characterSize.width,
              height: characterSize.height,
              zIndex: 10
            }}
            animate={{
              rotate: velocity.x !== 0 ? velocity.x > 0 ? 10 : -10 : 0
            }}
          >
            <Heart fill="white" size={20} color="white" />
          </motion.div>
        )}

        {/* Info popup */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 bottom-4 transform -translate-x-1/2 z-30"
          >
            <SpeechBubble type="speech" color={showInfo.type === 'obstacle' ? 'orange' : 'green'} position="bottom">
              <h3 className="font-bold text-black">{showInfo.title}</h3>
              <p className="text-sm text-black">{showInfo.description}</p>
              <p className="text-xs mt-1 font-bold text-black">
                {showInfo.type === 'obstacle' ? `-${Math.abs(showInfo.points)}` : `+${showInfo.points}`} points
              </p>
            </SpeechBubble>
          </motion.div>
        )}
      </div>

      {/* Collected items */}
      <div className="mt-8">
        <h2 className="text-2xl font-bangers text-comic-blue mb-4">Collected Portfolio Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collectedItems
            .filter(item => item.type !== 'obstacle')
            .map(item => (
              <div 
                key={`collected-${item.id}`} 
                className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200"
              >
                <div className="flex items-center mb-2">
                  <div 
                    className="w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-black">{item.title}</h3>
                </div>
                <p className="text-sm text-black">{item.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Game controls help */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <h3 className="font-bold text-black mb-2">How to Play</h3>
        <ul className="list-disc list-inside text-sm text-black">
          <li>Use WASD or arrow keys to move your character</li>
          <li>Collect all skills, projects and achievements</li>
          <li>Avoid obstacles and bugs that will reduce your score</li>
          <li>The game ends when you've collected all portfolio items</li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioGame;
