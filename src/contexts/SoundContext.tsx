
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export type SoundType = 
  // Basic UI sounds
  'click' | 'hover' | 'whoosh' | 'transition' | 'notification' | 'success' | 'error' |
  // Comic-specific sounds
  'pageFlip' | 'popIn' | 'speechBubble' | 'typewriter' | 'muffledVoice' | 
  // Hero/Power sounds
  'heroEntrance' | 'electricZap' | 'energyCharge' |
  // Coding sounds
  'keyboardTyping' | 'terminalBeep' | 'glitchEffect' |
  // Game mechanics
  'levelUp' | 'achievementUnlock' |
  // AI sounds
  'neuralTone' | 'robotBeep' | 'voiceAssistant' |
  // Mystery sounds
  'footsteps' | 'magnifyingGlass' | 'suspenseMusic' |
  // Magic sounds
  'spellCast' | 'twinkle' | 'teleport' |
  // Environmental sounds
  'cafeAmbience' | 'serverRoom' | 'rain' |
  // Background music
  'eightBitMusic' | 'lofiBeats' | 'highEnergySynth';

interface SoundContextType {
  isMuted: boolean;
  isLoaded: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
  stopSound: (type: SoundType) => void;
  volumeLevel: number;
  setVolumeLevel: (level: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMuted, isLoaded, toggleMute, playSound, stopSound, volumeLevel, setVolumeLevel } = useSoundEffects();
  
  // Listen for key press to toggle mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
        toggleMute();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Enhance interactions with sound effects
    const addHoverSounds = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => playSound('hover'));
        element.addEventListener('click', () => playSound('click'));
      });
    };
    
    // Add sound effects to new elements periodically
    const interval = setInterval(addHoverSounds, 2000);
    
    // Initial addition
    setTimeout(addHoverSounds, 1000);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [toggleMute, playSound]);
  
  return (
    <SoundContext.Provider value={{ 
      isMuted, 
      isLoaded, 
      toggleMute, 
      playSound, 
      stopSound,
      volumeLevel,
      setVolumeLevel
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
