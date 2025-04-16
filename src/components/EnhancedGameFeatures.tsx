import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad, Shield, Heart, Zap, Brain, Sparkles, ArrowUp, 
  Star, Gift, Clock, Flame, Award, Gauge, Crosshair, Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Power-up types
export enum PowerUpType {
  SPEED_BOOST = 'speedBoost',
  BUG_SHIELD = 'bugShield',
  DOUBLE_POINTS = 'doublePoints',
  TIME_EXTENSION = 'timeExtension',
  MAGNETIC_PULL = 'magneticPull',
  EXTRA_LIFE = 'extraLife'
}

// PowerUp definitions
export interface PowerUp {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  icon: React.ReactNode;
  duration: number; // in seconds
  color: string;
  effect: string;
  active: boolean;
  timeLeft?: number;
}

// Game modifiers
export interface GameModifiers {
  playerSpeed: number;
  playerSize: number;
  scoreMultiplier: number;
  collectionRadius: number;
  bugRepellent: boolean;
  timeFreeze: boolean;
}

// Game levels with enhanced features
export interface EnhancedGameLevel {
  name: string;
  theme: 'tech' | 'fantasy' | 'space' | 'underwater' | 'cyberpunk';
  backgroundEffect: 'particles' | 'gradient' | 'matrix' | 'stars' | 'bubbles';
  specialAbility?: 'dash' | 'teleport' | 'freeze' | 'shield' | 'gravity';
  boss?: {
    name: string;
    health: number;
    attack: number;
    special: string;
    icon: React.ReactNode;
  };
}

// Character special abilities
export interface SpecialAbility {
  name: string;
  icon: React.ReactNode;
  description: string;
  cooldown: number; // seconds
  duration: number; // seconds
  effect: (setModifiers: React.Dispatch<React.SetStateAction<GameModifiers>>) => void;
  endEffect: (setModifiers: React.Dispatch<React.SetStateAction<GameModifiers>>) => void;
}

// Define available power-ups
export const powerUps: PowerUp[] = [
  {
    id: 'speed_boost',
    type: PowerUpType.SPEED_BOOST,
    name: 'Speed Boost',
    description: 'Move 50% faster for 10 seconds',
    icon: <Zap size={20} />,
    duration: 10,
    color: '#3b82f6', // blue
    effect: 'Increases movement speed by 50%',
    active: false
  },
  {
    id: 'bug_shield',
    type: PowerUpType.BUG_SHIELD,
    name: 'Bug Shield',
    description: 'Immunity to bugs for 15 seconds',
    icon: <Shield size={20} />,
    duration: 15,
    color: '#10b981', // green
    effect: 'Provides immunity to bug collisions',
    active: false
  },
  {
    id: 'double_points',
    type: PowerUpType.DOUBLE_POINTS,
    name: 'Double Points',
    description: 'Double all points for 20 seconds',
    icon: <Star size={20} />,
    duration: 20,
    color: '#f59e0b', // amber
    effect: 'Doubles points from all collections',
    active: false
  },
  {
    id: 'time_extension',
    type: PowerUpType.TIME_EXTENSION,
    name: 'Time Extension',
    description: 'Adds 15 seconds to the level timer',
    icon: <Clock size={20} />,
    duration: 0, // instant effect
    color: '#8b5cf6', // purple
    effect: 'Adds 15 seconds to the level timer',
    active: false
  },
  {
    id: 'magnetic_pull',
    type: PowerUpType.MAGNETIC_PULL,
    name: 'Magnetic Pull',
    description: 'Attracts nearby items for 12 seconds',
    icon: <Crosshair size={20} />,
    duration: 12,
    color: '#ec4899', // pink
    effect: 'Pulls nearby collectibles toward you',
    active: false
  },
  {
    id: 'extra_life',
    type: PowerUpType.EXTRA_LIFE,
    name: 'Extra Life',
    description: 'Grants an additional life',
    icon: <Heart size={20} />,
    duration: 0, // instant effect
    color: '#ef4444', // red
    effect: 'Adds one extra life',
    active: false
  }
];

// Character special abilities
export const specialAbilities: SpecialAbility[] = [
  {
    name: 'Coding Dash',
    icon: <Flame size={24} />,
    description: 'Dash forward at high speed, collecting everything in your path',
    cooldown: 15,
    duration: 3,
    effect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        playerSpeed: prev.playerSpeed * 3,
        bugRepellent: true
      }));
    },
    endEffect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        playerSpeed: prev.playerSpeed / 3,
        bugRepellent: false
      }));
    }
  },
  {
    name: 'Skill Magnet',
    icon: <Sparkles size={24} />,
    description: 'Pull all skills towards you with increased collection radius',
    cooldown: 20,
    duration: 5,
    effect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        collectionRadius: prev.collectionRadius * 5
      }));
    },
    endEffect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        collectionRadius: prev.collectionRadius / 5
      }));
    }
  },
  {
    name: 'Time Freeze',
    icon: <Clock size={24} />,
    description: 'Temporarily freeze all obstacles and enemies',
    cooldown: 30,
    duration: 4,
    effect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        timeFreeze: true
      }));
    },
    endEffect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        timeFreeze: false
      }));
    }
  },
  {
    name: 'Debug Mode',
    icon: <Brain size={24} />,
    description: 'Double points and shield against bugs',
    cooldown: 45,
    duration: 7,
    effect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        scoreMultiplier: prev.scoreMultiplier * 2,
        bugRepellent: true
      }));
    },
    endEffect: (setModifiers) => {
      setModifiers(prev => ({
        ...prev,
        scoreMultiplier: prev.scoreMultiplier / 2,
        bugRepellent: false
      }));
    }
  }
];

// Enhanced UI components
interface PowerUpStatusProps {
  activePowerUps: PowerUp[];
}

export const PowerUpStatus: React.FC<PowerUpStatusProps> = ({ activePowerUps }) => {
  return (
    <AnimatePresence>
      {activePowerUps.length > 0 && (
        <motion.div 
          className="mb-4 p-2 bg-gradient-to-r from-comic-blue to-comic-green text-white rounded-lg flex justify-center space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {activePowerUps.map((powerUp) => (
            <motion.div 
              key={powerUp.id}
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div 
                className="mr-2 w-8 h-8 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: powerUp.color }}
              >
                {powerUp.icon}
              </div>
              <div>
                <span className="font-comic text-xs font-bold block">{powerUp.name}</span>
                {powerUp.timeLeft && powerUp.timeLeft > 0 && (
                  <div className="w-16 h-1.5 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ 
                        duration: powerUp.timeLeft, 
                        ease: 'linear' 
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SpecialAbilityButtonProps {
  ability: SpecialAbility;
  onActivate: () => void;
  cooldownRemaining: number;
  isActive: boolean;
}

export const SpecialAbilityButton: React.FC<SpecialAbilityButtonProps> = ({ 
  ability, 
  onActivate, 
  cooldownRemaining,
  isActive
}) => {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-full w-14 h-14 border-2 border-black 
        ${isActive 
          ? 'bg-comic-pink shadow-[0_0_15px_rgba(236,72,153,0.7)]' 
          : cooldownRemaining > 0 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-comic-blue hover:bg-comic-blue/90'}`}
      onClick={cooldownRemaining === 0 && !isActive ? onActivate : undefined}
      whileHover={cooldownRemaining === 0 && !isActive ? { scale: 1.1 } : {}}
      whileTap={cooldownRemaining === 0 && !isActive ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {ability.icon}
      </div>
      
      {/* Cooldown overlay */}
      {cooldownRemaining > 0 && (
        <motion.div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: ability.cooldown, ease: 'linear' }}
        >
          {cooldownRemaining}
        </motion.div>
      )}
      
      {/* Active indicator pulse */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-comic-pink"
          animate={{ 
            opacity: [0.7, 0.3, 0.7], 
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: 'easeInOut' 
          }}
        />
      )}
      
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs font-comic">{ability.name}</span>
      </div>
    </motion.button>
  );
};

// Utility functions
export const triggerLevelCompleteEffect = () => {
  // Multiple confetti bursts
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#3b82f6', '#ec4899', '#f97316', '#10b981', '#8b5cf6'];
  
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  (function frame() {
    confetti({
      particleCount: 5,
      angle: randomInRange(0, 360),
      spread: randomInRange(50, 100),
      origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.9) },
      colors: [colors[Math.floor(Math.random() * colors.length)]],
      zIndex: 9999,
      gravity: 0.7,
      scalar: 1.5
    });
    
    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};

export const generateRandomPowerUp = (): PowerUp => {
  const randomPowerUp = { ...powerUps[Math.floor(Math.random() * powerUps.length)] };
  randomPowerUp.id = `${randomPowerUp.id}_${Date.now()}`;
  randomPowerUp.active = true;
  randomPowerUp.timeLeft = randomPowerUp.duration;
  return randomPowerUp;
};

export default {
  PowerUpType,
  powerUps,
  specialAbilities,
  PowerUpStatus,
  SpecialAbilityButton,
  triggerLevelCompleteEffect,
  generateRandomPowerUp
};
