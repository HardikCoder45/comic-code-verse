
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import ComicPanel from '../components/ComicPanel';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setShowIntro(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center mb-12">
            <h1 className="font-bangers text-5xl md:text-7xl text-comic-blue mb-4 text-center">
              <span className="text-comic-blue">COMIC</span>
              <span className="text-comic-pink">CODE</span>
              <span className="text-comic-orange">VERSE</span>
            </h1>
            <div className="w-full max-w-xl mx-auto mt-6">
              <SpeechBubble>
                <p className="font-comic text-lg">Welcome to my comic-style coding portfolio! I'm a developer who transforms ideas into interactive experiences.</p>
              </SpeechBubble>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
            <ComicPanel title="About the Hero">
              <div className="flex flex-col space-y-4">
                <p className="font-comic">A passionate developer with a love for creating beautiful, functional web applications that merge technology with creativity.</p>
                <div className="mt-4">
                  <Link to="/about" className="comic-button">
                    Origin Story
                  </Link>
                </div>
              </div>
            </ComicPanel>

            <ComicPanel title="Latest Missions">
              <div className="flex flex-col space-y-4">
                <p className="font-comic">Check out my latest coding adventures and projects - from web apps to machine learning experiments.</p>
                <div className="mt-4">
                  <Link to="/projects" className="comic-button-secondary">
                    View Projects
                  </Link>
                </div>
              </div>
            </ComicPanel>
          </div>

          <div className="mt-12">
            <ComicPanel title="Special Powers" className="animate-float">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-2xl">JS</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">JavaScript</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-pink rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-2xl">CSS</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">CSS</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-yellow rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-2xl">PY</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">Python</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-green rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-2xl">DB</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">Databases</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/skills" className="inline-block comic-button mt-4">
                  See All Powers
                </Link>
              </div>
            </ComicPanel>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="comic-button-secondary inline-block animate-shake">
              Send a Signal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
