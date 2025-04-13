
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeechBubble from './SpeechBubble';
import { useSound } from '../contexts/SoundContext';

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
  const { playSound } = useSound();
  
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
      keywords: ['go to resume', 'navigate to resume', 'show resume', 'show your resume'], 
      action: () => navigate('/resume'),
      description: 'Navigate to the Resume Builder'
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
  }, []);

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
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <SpeechBubble type="speech" color="purple" position="left" className="max-w-xs">
              <h3 className="font-bangers text-lg mb-2">Voice Commands</h3>
              <div className="max-h-60 overflow-y-auto text-sm">
                <ul className="space-y-1">
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
                className="mt-2 text-xs font-bold text-purple-700 hover:underline"
                onClick={() => setShowHelp(false)}
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
            <SpeechBubble type="speech" color="pink" position="left" className="max-w-xs">
              <p className="font-comic text-sm italic">"{transcript}"</p>
            </SpeechBubble>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg transition-colors ${
            showHelp ? 'bg-purple-500 text-white' : 'bg-white backdrop-blur-sm'
          }`}
          onClick={() => setShowHelp(!showHelp)}
          onMouseEnter={() => playSound('hover')}
        >
          {showHelp ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg transition-colors ${
            isListening ? 'bg-purple-500 text-white border-purple-500' : 'bg-white backdrop-blur-sm'
          }`}
          onClick={toggleListening}
          onMouseEnter={() => playSound('hover')}
        >
          {isListening ? <Mic size={24} /> : <MicOff size={24} />}
        </Button>
      </div>
    </div>
  );
};

export default VoiceControl;
