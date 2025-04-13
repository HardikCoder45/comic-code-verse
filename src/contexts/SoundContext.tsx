
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
  const soundEffects = useSoundEffects();
  const [volumeLevel, setVolumeLevel] = useState(soundEffects.volumeLevel || 1);
  
  // Use the values from the hook but add our own state for volume if it's not provided
  const contextValue: SoundContextType = {
    isMuted: soundEffects.isMuted,
    isLoaded: soundEffects.isLoaded,
    toggleMute: soundEffects.toggleMute,
    playSound: soundEffects.playSound,
    stopSound: soundEffects.stopSound,
    volumeLevel: volumeLevel,
    setVolumeLevel: (level: number) => setVolumeLevel(level)
  };
  
  // Listen for key press to toggle mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
        contextValue.toggleMute();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Enhance interactions with sound effects
    const addHoverSounds = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => contextValue.playSound('hover'));
        element.addEventListener('click', () => contextValue.playSound('click'));
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
  }, [contextValue.toggleMute, contextValue.playSound]);
  
  return (
    <SoundContext.Provider value={contextValue}>
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
