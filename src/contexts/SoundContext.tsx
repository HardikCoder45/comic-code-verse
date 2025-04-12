
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: 'click' | 'hover' | 'whoosh' | 'transition' | 'notification' | 'success' | 'error') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMuted, toggleMute, playSound } = useSoundEffects();
  
  // Listen for key press to toggle mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
        toggleMute();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleMute]);
  
  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
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
