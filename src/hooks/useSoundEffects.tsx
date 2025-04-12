
import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

type SoundType = 
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

interface SoundElements {
  [key: string]: Howl | null;
}

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [soundElements, setSoundElements] = useState<SoundElements>({});
  
  useEffect(() => {
    // Create sound objects
    const sounds: SoundElements = {
      // Basic UI sounds
      click: new Howl({ src: ['/sounds/click.mp3'], volume: 0.4 }),
      hover: new Howl({ src: ['/sounds/hover.mp3'], volume: 0.2 }),
      whoosh: new Howl({ src: ['/sounds/whoosh.mp3'], volume: 0.5 }),
      transition: new Howl({ src: ['/sounds/transition.mp3'], volume: 0.5 }),
      notification: new Howl({ src: ['/sounds/notification.mp3'], volume: 0.4 }),
      success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.5 }),
      error: new Howl({ src: ['/sounds/error.mp3'], volume: 0.5 }),
      
      // Comic-specific sounds
      pageFlip: new Howl({ src: ['/sounds/page-flip.mp3'], volume: 0.6 }),
      popIn: new Howl({ src: ['/sounds/pop-in.mp3'], volume: 0.4 }),
      speechBubble: new Howl({ src: ['/sounds/speech-bubble.mp3'], volume: 0.3 }),
      typewriter: new Howl({ src: ['/sounds/typewriter.mp3'], volume: 0.3, rate: 1.5 }),
      muffledVoice: new Howl({ src: ['/sounds/muffled-voice.mp3'], volume: 0.4 }),
      
      // Hero/Power sounds
      heroEntrance: new Howl({ src: ['/sounds/hero-entrance.mp3'], volume: 0.5 }),
      electricZap: new Howl({ src: ['/sounds/electric-zap.mp3'], volume: 0.4 }),
      energyCharge: new Howl({ src: ['/sounds/energy-charge.mp3'], volume: 0.5 }),
      
      // Coding sounds
      keyboardTyping: new Howl({ src: ['/sounds/keyboard-typing.mp3'], volume: 0.3, sprite: { typing: [0, 2000] } }),
      terminalBeep: new Howl({ src: ['/sounds/terminal-beep.mp3'], volume: 0.4 }),
      glitchEffect: new Howl({ src: ['/sounds/glitch-effect.mp3'], volume: 0.5 }),
      
      // Game mechanics
      levelUp: new Howl({ src: ['/sounds/level-up.mp3'], volume: 0.6 }),
      achievementUnlock: new Howl({ src: ['/sounds/achievement-unlock.mp3'], volume: 0.5 }),
      
      // AI sounds
      neuralTone: new Howl({ src: ['/sounds/neural-tone.mp3'], volume: 0.3 }),
      robotBeep: new Howl({ src: ['/sounds/robot-beep.mp3'], volume: 0.4 }),
      voiceAssistant: new Howl({ src: ['/sounds/voice-assistant.mp3'], volume: 0.5 }),
      
      // Mystery sounds
      footsteps: new Howl({ src: ['/sounds/footsteps.mp3'], volume: 0.3 }),
      magnifyingGlass: new Howl({ src: ['/sounds/magnifying-glass.mp3'], volume: 0.4 }),
      suspenseMusic: new Howl({ src: ['/sounds/suspense-music.mp3'], volume: 0.3, loop: true }),
      
      // Magic sounds
      spellCast: new Howl({ src: ['/sounds/spell-cast.mp3'], volume: 0.5 }),
      twinkle: new Howl({ src: ['/sounds/twinkle.mp3'], volume: 0.4 }),
      teleport: new Howl({ src: ['/sounds/teleport.mp3'], volume: 0.5 }),
      
      // Environmental sounds
      cafeAmbience: new Howl({ src: ['/sounds/cafe-ambience.mp3'], volume: 0.2, loop: true }),
      serverRoom: new Howl({ src: ['/sounds/server-room.mp3'], volume: 0.2, loop: true }),
      rain: new Howl({ src: ['/sounds/rain.mp3'], volume: 0.2, loop: true }),
      
      // Background music
      eightBitMusic: new Howl({ src: ['/sounds/8bit-music.mp3'], volume: 0.3, loop: true }),
      lofiBeats: new Howl({ src: ['/sounds/lofi-beats.mp3'], volume: 0.3, loop: true }),
      highEnergySynth: new Howl({ src: ['/sounds/high-energy-synth.mp3'], volume: 0.3, loop: true })
    };
    
    // Set up load events
    let loadedCount = 0;
    const totalSounds = Object.keys(sounds).length;
    
    Object.values(sounds).forEach((sound) => {
      if (sound) {
        sound.once('load', () => {
          loadedCount++;
          if (loadedCount >= totalSounds) {
            setIsLoaded(true);
          }
        });
        
        sound.once('loaderror', (id, err) => {
          console.error('Error loading sound:', err);
          // Still count as "loaded" to not block UI
          loadedCount++;
          if (loadedCount >= totalSounds) {
            setIsLoaded(true);
          }
        });
      }
    });
    
    setSoundElements(sounds);
    
    // Cleanup
    return () => {
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.unload();
        }
      });
    };
  }, []);
  
  const playSound = useCallback((type: SoundType) => {
    if (isMuted || !isLoaded) return;
    
    const sound = soundElements[type];
    if (sound) {
      // For sprite-based sounds
      if (sound.sprite && sound.sprite.typing && type === 'keyboardTyping') {
        sound.play('typing');
      } else {
        sound.play();
      }
    } else {
      console.warn(`Sound '${type}' not loaded or doesn't exist`);
    }
  }, [isMuted, isLoaded, soundElements]);
  
  const stopSound = useCallback((type: SoundType) => {
    const sound = soundElements[type];
    if (sound) {
      sound.stop();
    }
  }, [soundElements]);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    
    // Mute/unmute all sounds
    Object.values(soundElements).forEach(sound => {
      if (sound) {
        sound.mute(!isMuted);
      }
    });
  }, [isMuted, soundElements]);
  
  return { 
    playSound, 
    stopSound, 
    toggleMute, 
    isMuted, 
    isLoaded 
  };
};
