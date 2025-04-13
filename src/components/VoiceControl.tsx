
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeechBubble from './SpeechBubble';
import { useSound } from '../contexts/SoundContext';
import { Badge } from '@/components/ui/badge';

interface Command {
  keywords: string[];
  action: () => void;
  description: string;
}

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [supportsSpeech, setSupportsSpeech] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { playSound, isMuted, toggleMute } = useSound();
  
  // Define commands
  const commands: Command[] = [
    { 
      keywords: ['go to home', 'navigate to home', 'show home'], 
      action: () => navigate('/home'),
      description: 'Navigate to the Home page'
    },
    { 
      keywords: ['go to projects', 'navigate to projects', 'show projects', 'show me your projects'], 
      action: () => navigate('/projects'),
      description: 'Navigate to the Projects page'
    },
    { 
      keywords: ['go to about', 'navigate to about', 'show about', 'tell me about yourself'], 
      action: () => navigate('/about'),
      description: 'Navigate to the About page'
    },
    { 
      keywords: ['go to skills', 'navigate to skills', 'show skills', 'what are your skills'], 
      action: () => navigate('/skills'),
      description: 'Navigate to the Skills page'
    },
    { 
      keywords: ['go to timeline', 'navigate to timeline', 'show timeline', 'show your history'], 
      action: () => navigate('/timeline'),
      description: 'Navigate to the Timeline page'
    },
    { 
      keywords: ['go to code', 'navigate to code', 'show code samples', 'show your code'], 
      action: () => navigate('/code-samples'),
      description: 'Navigate to the Code Samples page'
    },
    { 
      keywords: ['go to game', 'navigate to game', 'play game', 'show game'], 
      action: () => navigate('/game'),
      description: 'Navigate to the Portfolio Game'
    },
    { 
      keywords: ['go to portfolio', 'navigate to portfolio', 'create portfolio', 'custom portfolio'], 
      action: () => navigate('/custom-portfolio'),
      description: 'Navigate to the Portfolio Creator'
    },
    { 
      keywords: ['go to dna', 'navigate to dna', 'show dna', 'show code dna'], 
      action: () => navigate('/dna'),
      description: 'Navigate to the Code DNA visualization'
    },
    { 
      keywords: ['go to contact', 'navigate to contact', 'show contact', 'how to contact you'], 
      action: () => navigate('/contact'),
      description: 'Navigate to the Contact page'
    },
    { 
      keywords: ['mute sounds', 'turn off sounds', 'disable sounds'], 
      action: () => {
        if (!isMuted) toggleMute();
      },
      description: 'Mute all sounds'
    },
    { 
      keywords: ['unmute sounds', 'turn on sounds', 'enable sounds'], 
      action: () => {
        if (isMuted) toggleMute();
      },
      description: 'Unmute all sounds'
    },
    { 
      keywords: ['show help', 'what can I say', 'voice commands', 'available commands'], 
      action: () => setShowHelp(true),
      description: 'Show a list of available voice commands'
    },
    { 
      keywords: ['hide help', 'close help'], 
      action: () => setShowHelp(false),
      description: 'Hide the list of available commands'
    }
  ];

  useEffect(() => {
    // Check if Speech Recognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        playSound('notification');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          setSupportsSpeech(false);
        }
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcript = result[0].transcript.trim().toLowerCase();
        
        setTranscript(transcript);
        setShowTranscript(true);
        
        // Clear any existing timeout
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        
        // Set a new timeout to hide the transcript
        timeoutRef.current = window.setTimeout(() => {
          setShowTranscript(false);
        }, 3000);
        
        // Check if this is a final result
        if (result.isFinal) {
          // Process commands
          processCommand(transcript);
        }
      };
      
      setRecognition(recognition);
    } else {
      setSupportsSpeech(false);
      console.error('Speech recognition not supported');
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [playSound]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setShowTranscript(false);
    } else {
      recognition.start();
      playSound('notification');
    }
  };

  const processCommand = (transcript: string) => {
    for (const command of commands) {
      if (command.keywords.some(keyword => transcript.includes(keyword))) {
        playSound('success');
        command.action();
        return;
      }
    }
    
    // No command matched
    playSound('error');
  };

  if (!supportsSpeech) {
    return null; // Don't render anything if speech not supported
  }

  return (
    <div className="fixed top-4 right-6 z-50 flex flex-col items-end gap-4">
      <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50`}
          onClick={() => setShowHelp(!showHelp)}
          onMouseEnter={() => playSound('hover')}
        >
          {showHelp ? <X size={18} /> : <HelpCircle size={18} />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50`}
          onClick={toggleMute}
          onMouseEnter={() => playSound('hover')}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        
        <Badge 
          variant={isListening ? "default" : "outline"}
          className={`${isListening ? 'bg-blue-500 hover:bg-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'} cursor-pointer px-3`}
          onClick={toggleListening}
          onMouseEnter={() => playSound('hover')}
        >
          {isListening ? <Mic size={16} className="mr-1" /> : <MicOff size={16} className="mr-1" />}
          {isListening ? 'Listening...' : 'Voice Control'}
        </Badge>
      </div>
      
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 w-80"
          >
            <SpeechBubble type="speech" color="blue" position="left" className="max-w-full">
              <h3 className="font-bangers text-lg mb-2 text-gray-800">Voice Commands</h3>
              <div className="max-h-60 overflow-y-auto text-sm">
                <ul className="space-y-1 text-gray-700">
                  {commands.map((command, index) => (
                    <li key={index} className="flex items-start">
                      <span className="font-bold mr-1">•</span>
                      <div>
                        <span className="font-comic font-bold">"{command.keywords[0]}"</span>
                        <p className="text-xs text-gray-600">{command.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                onClick={() => {
                  setShowHelp(false);
                  playSound('click');
                }}
                onMouseEnter={() => playSound('hover')}
              >
                Close Help
              </button>
            </SpeechBubble>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showTranscript && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2"
          >
            <SpeechBubble type="speech" color="blue" position="left" className="max-w-xs">
              <p className="font-comic text-sm italic text-gray-800">"{transcript}"</p>
            </SpeechBubble>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceControl;
