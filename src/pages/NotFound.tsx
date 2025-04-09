
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import { Home, RotateCcw } from 'lucide-react';

const NotFound = () => {
  const [showContent, setShowContent] = useState(false);
  const [showBubble1, setShowBubble1] = useState(false);
  const [showBubble2, setShowBubble2] = useState(false);
  const [showBubble3, setShowBubble3] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => setShowBubble1(true), 1000);
    const timer3 = setTimeout(() => setShowBubble2(true), 2000);
    const timer4 = setTimeout(() => setShowBubble3(true), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8 flex items-center justify-center">
      <div className={`max-w-4xl transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="comic-panel relative py-12 px-8">
          <h1 className="font-bangers text-6xl text-comic-pink mb-8 text-center">
            PAGE LOST IN THE MULTIVERSE!
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-64 h-64 relative">
              <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-4 border-black transform rotate-3 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-4 border-black transform -rotate-3 animate-float" style={{ animationDelay: '0.5s' }}></div>
              
              {showBubble1 && (
                <div className="absolute -top-12 -right-4">
                  <SpeechBubble type="shout" color="orange" animated>
                    <p className="font-comic text-lg">404!</p>
                  </SpeechBubble>
                </div>
              )}
            </div>
            
            <div className="max-w-md">
              {showBubble2 && (
                <SpeechBubble type="speech" color="blue" animated className="mb-4">
                  <p className="font-comic text-lg">Oops! This page got lost in the comic multiverse! Our hero is working to bring it back...</p>
                </SpeechBubble>
              )}
              
              {showBubble3 && (
                <SpeechBubble type="thought" color="purple" animated className="mb-8">
                  <p className="font-comic">Perhaps we took a wrong turn at that last panel? Let's get back to safe territory!</p>
                </SpeechBubble>
              )}
              
              <div className="flex space-x-4 justify-center">
                <Link to="/" className="comic-button flex items-center">
                  <Home className="mr-2" />
                  <span>Return Home</span>
                </Link>
                <button onClick={() => window.history.back()} className="comic-button-secondary flex items-center">
                  <RotateCcw className="mr-2" />
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-8 -left-8 text-9xl font-bangers text-comic-yellow opacity-10">?</div>
          <div className="absolute -bottom-8 -right-8 text-9xl font-bangers text-comic-pink opacity-10">!</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
