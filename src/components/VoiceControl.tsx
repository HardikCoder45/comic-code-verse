
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '../hooks/useSoundEffects';
import SpeechBubble from './SpeechBubble';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();
  const { playSound, toggleMute, isMuted } = useSoundEffects();

  // Set up voice commands
  const voiceCommands = useRef<VoiceCommand[]>([
    {
      command: "show home",
      action: () => navigate('/home'),
      description: "Navigate to the home page"
    },
    {
      command: "show projects",
      action: () => navigate('/projects'),
      description: "Navigate to the projects page"
    },
    {
      command: "show about",
      action: () => navigate('/about'),
      description: "Navigate to the about page"
    },
    {
      command: "show skills",
      action: () => navigate('/skills'),
      description: "Navigate to the skills page"
    },
    {
      command: "show timeline",
      action: () => navigate('/timeline'),
      description: "Navigate to the timeline page"
    },
    {
      command: "show code samples",
      action: () => navigate('/code-samples'),
      description: "Navigate to the code samples page"
    },
    {
      command: "show game",
      action: () => navigate('/game'),
      description: "Navigate to the portfolio game"
    },
    {
      command: "show resume",
      action: () => navigate('/resume'),
      description: "Navigate to the resume builder"
    },
    {
      command: "show contact",
      action: () => navigate('/contact'),
      description: "Navigate to the contact page"
    },
    {
      command: "mute sound",
      action: () => {
        if (!isMuted) toggleMute();
        setFeedback("Sound effects muted");
      },
      description: "Mute all sound effects"
    },
    {
      command: "unmute sound",
      action: () => {
        if (isMuted) toggleMute();
        setFeedback("Sound effects unmuted");
      },
      description: "Unmute all sound effects"
    },
    {
      command: "toggle sound",
      action: () => {
        toggleMute();
        setFeedback(isMuted ? "Sound effects enabled" : "Sound effects muted");
      },
      description: "Toggle sound on/off"
    },
    {
      command: "help",
      action: () => setShowHelp(true),
      description: "Show voice command help"
    }
  ]).current;

  useEffect(() => {
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setFeedback('Listening...');
      };
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const text = result[0].transcript.toLowerCase().trim();
        
        setTranscript(text);
        
        // Only process commands when the result is final
        if (result.isFinal) {
          processCommand(text);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setFeedback(`Error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        
        // Auto restart if it stopped unexpectedly
        if (isListening) {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error('Failed to restart speech recognition', e);
          }
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setFeedback('Voice control paused');
      playSound('click');
    } else {
      try {
        recognitionRef.current?.start();
        setFeedback('Listening for commands...');
        playSound('click');
      } catch (error) {
        console.error('Error starting recognition:', error);
        setFeedback('Error starting voice recognition');
      }
    }
  };

  const processCommand = (text: string) => {
    // Find matching command
    for (const cmd of voiceCommands) {
      if (text.includes(cmd.command)) {
        playSound('success');
        setFeedback(`Executing: ${cmd.description}`);
        cmd.action();
        return;
      }
    }
    
    // No matching command found
    setFeedback('Command not recognized. Try "help" to see available commands.');
  };

  // Check if speech recognition is supported
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    return (
      <div className="fixed bottom-24 right-4 z-40">
        <SpeechBubble type="thought" position="left" color="red">
          <p className="text-sm">Voice control not supported in this browser</p>
        </SpeechBubble>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <div className="flex flex-col items-end gap-2">
        {/* Feedback bubble */}
        {feedback && (
          <SpeechBubble type="speech" position="left" color="purple" className="mb-1">
            <p className="text-sm">{feedback}</p>
            {transcript && isListening && (
              <p className="text-xs text-gray-600 mt-1">"{transcript}"</p>
            )}
          </SpeechBubble>
        )}
        
        <div className="flex gap-2">
          {/* Sound toggle button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMute}
            className="bg-white shadow-md hover:bg-gray-100"
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
          
          {/* Voice command help */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white shadow-md hover:bg-gray-100"
                onClick={() => playSound('click')}
              >
                Help
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Voice Commands</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-500">
                  Say any of these commands to control the application with your voice.
                </p>
                <ul className="space-y-2">
                  {voiceCommands.map((cmd, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="font-medium">"{cmd.command}"</span>
                      <span className="text-gray-500">- {cmd.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Voice control button */}
          <Button 
            variant={isListening ? "destructive" : "default"}
            size="icon" 
            className={`rounded-full shadow-md ${isListening ? 'animate-pulse' : ''}`}
            onClick={toggleListening}
          >
            {isListening ? <MicOff /> : <Mic />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceControl;
