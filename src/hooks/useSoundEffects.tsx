
import { useState, useEffect } from 'react';

type SoundType = 'click' | 'hover' | 'whoosh' | 'transition' | 'notification' | 'success' | 'error';

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioElements, setAudioElements] = useState<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    hover: null,
    whoosh: null,
    transition: null,
    notification: null,
    success: null,
    error: null
  });
  
  useEffect(() => {
    // Create audio elements on mount
    const clickSound = new Audio('/sounds/click.mp3');
    const hoverSound = new Audio('/sounds/hover.mp3');
    const whooshSound = new Audio('/sounds/whoosh.mp3');
    const transitionSound = new Audio('/sounds/transition.mp3');
    const notificationSound = new Audio('/sounds/notification.mp3');
    const successSound = new Audio('/sounds/success.mp3');
    const errorSound = new Audio('/sounds/error.mp3');
    
    // Set volume
    [clickSound, hoverSound, whooshSound, transitionSound, notificationSound, successSound, errorSound].forEach(sound => {
      sound.volume = 0.4;
      
      // Preload sounds
      sound.load();
      
      // Add event listeners for loaded sounds
      sound.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });
    });
    
    setAudioElements({
      click: clickSound,
      hover: hoverSound,
      whoosh: whooshSound,
      transition: transitionSound,
      notification: notificationSound,
      success: successSound,
      error: errorSound
    });
    
    // Cleanup
    return () => {
      Object.values(audioElements).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);
  
  const playSound = (type: SoundType) => {
    if (isMuted || !isLoaded) return;
    
    const audio = audioElements[type];
    if (audio) {
      // Reset audio if it's already playing
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.error('Error playing sound:', err);
      });
    }
  };
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  return { playSound, toggleMute, isMuted, isLoaded };
};
