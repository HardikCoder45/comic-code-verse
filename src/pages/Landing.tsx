
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import { ArrowRight, Code, Github, Zap, Star } from 'lucide-react';

const Landing = () => {
  const [showElements, setShowElements] = useState({
    hero: false,
    features: false,
    portfolio: false,
    cta: false
  });

  useEffect(() => {
    // Staged animation entries
    const timer1 = setTimeout(() => setShowElements(prev => ({ ...prev, hero: true })), 300);
    const timer2 = setTimeout(() => setShowElements(prev => ({ ...prev, features: true })), 800);
    const timer3 = setTimeout(() => setShowElements(prev => ({ ...prev, portfolio: true })), 1300);
    const timer4 = setTimeout(() => setShowElements(prev => ({ ...prev, cta: true })), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-comic-background pb-20">
      {/* Hero Section */}
      <div className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-comic-blue/10 to-comic-pink/5 z-0"></div>
        
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
              <span className="font-bangers text-white text-xl">CC</span>
            </div>
            <h1 className="ml-4 font-bangers text-2xl">
              <span className="text-comic-blue">COMIC</span>
              <span className="text-comic-pink">CODE</span>
              <span className="text-comic-orange">VERSE</span>
            </h1>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="font-comic font-bold hover:text-comic-blue transition-colors">About</Link>
            <Link to="/projects" className="font-comic font-bold hover:text-comic-pink transition-colors">Projects</Link>
            <Link to="/skills" className="font-comic font-bold hover:text-comic-orange transition-colors">Skills</Link>
            <Link to="/contact" className="font-comic font-bold hover:text-comic-green transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 z-10">
          <h1 className="font-bangers text-6xl md:text-8xl mb-6 leading-tight">
            <span className="text-comic-blue block animate-float">TURN YOUR CODE</span>
            <span className="text-comic-pink block -mt-2 animate-float" style={{ animationDelay: '0.2s' }}>INTO AN EPIC</span>
            <span className="text-comic-orange block -mt-2 animate-float" style={{ animationDelay: '0.4s' }}>ADVENTURE!</span>
          </h1>
          
          <div className="mt-8 max-w-2xl mx-auto">
            <SpeechBubble type="shout" position="bottom" color="yellow" animated>
              <p className="font-comic text-xl">Welcome to the Comic Code Verse - where coding meets storytelling and every project is a panel in your developer journey!</p>
            </SpeechBubble>
          </div>
          
          <div className="mt-10">
            <Link to="/" className="comic-button inline-flex items-center text-xl px-8 py-4 animate-pulse">
              <span>Enter the Universe</span>
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="border-2 border-black rounded-full p-2">
            <ArrowRight className="rotate-90" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 px-4 transition-all duration-1000 ${showElements.features ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bangers text-4xl md:text-6xl text-comic-purple text-center mb-16">SUPERPOWERS UNLOCKED!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="comic-panel hover:scale-105 transition-transform">
              <div className="h-40 bg-comic-blue rounded-t-lg border-b-2 border-black overflow-hidden">
                <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
              </div>
              <h3 className="font-bangers text-2xl mt-4 mb-2 text-comic-blue">Interactive Code Panels</h3>
              <p className="font-comic">Flip through projects like comic book pages with interactive animations and transitions.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Code className="text-comic-blue h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-pink text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </div>
            
            <div className="comic-panel hover:scale-105 transition-transform">
              <div className="h-40 bg-comic-pink rounded-t-lg border-b-2 border-black overflow-hidden">
                <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
              </div>
              <h3 className="font-bangers text-2xl mt-4 mb-2 text-comic-pink">Skill Showcases</h3>
              <p className="font-comic">Display your programming skills with animated badges that bounce and float around your profile.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Zap className="text-comic-pink h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </div>
            
            <div className="comic-panel hover:scale-105 transition-transform">
              <div className="h-40 bg-comic-green rounded-t-lg border-b-2 border-black overflow-hidden">
                <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
              </div>
              <h3 className="font-bangers text-2xl mt-4 mb-2 text-comic-green">Live Code Demos</h3>
              <p className="font-comic">Run and test code snippets directly in the browser with embedded demos and playgrounds.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Github className="text-comic-green h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-orange text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className={`py-20 px-4 bg-gradient-to-b from-white to-comic-background transition-all duration-1000 ${showElements.portfolio ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bangers text-4xl md:text-6xl text-comic-orange text-center mb-16">FEATURED PROJECTS</h2>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="comic-panel relative overflow-hidden group">
                <div className="absolute top-2 right-2 bg-comic-yellow text-black font-bangers px-2 py-1 rounded-lg rotate-6 z-10">HOT!</div>
                <div className="h-48 bg-gradient-to-br from-comic-blue to-comic-purple rounded-t-lg border-b-2 border-black overflow-hidden">
                  <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover opacity-70 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-bangers text-2xl mt-4 mb-2">Interactive Dashboard</h3>
                <p className="font-comic">A dynamic dashboard with real-time data visualization using React and D3.js</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-comic-blue text-white px-2 py-1 rounded-full text-xs font-comic">React</span>
                  <span className="bg-comic-orange text-white px-2 py-1 rounded-full text-xs font-comic">D3.js</span>
                  <span className="bg-comic-blue text-white px-2 py-1 rounded-full text-xs font-comic">TypeScript</span>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
              
              <div className="comic-panel relative overflow-hidden group">
                <div className="absolute top-2 right-2 bg-comic-green text-white font-bangers px-2 py-1 rounded-lg rotate-6 z-10">NEW!</div>
                <div className="h-48 bg-gradient-to-br from-comic-green to-comic-blue rounded-t-lg border-b-2 border-black overflow-hidden">
                  <div className="w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover opacity-70 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-bangers text-2xl mt-4 mb-2">AI Chat Application</h3>
                <p className="font-comic">A conversational AI interface with natural language processing capabilities</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-comic-green text-white px-2 py-1 rounded-full text-xs font-comic">Python</span>
                  <span className="bg-comic-orange text-white px-2 py-1 rounded-full text-xs font-comic">TensorFlow</span>
                  <span className="bg-comic-blue text-white px-2 py-1 rounded-full text-xs font-comic">Flask</span>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <SpeechBubble type="thought" color="purple" animated>
                <p className="font-comic">And many more exciting projects waiting for you to discover!</p>
              </SpeechBubble>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 px-4 transition-all duration-1000 ${showElements.cta ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto comic-panel relative overflow-hidden">
          <div className="absolute -top-10 -left-10 text-9xl font-bangers text-comic-yellow opacity-10">!</div>
          <div className="absolute -bottom-10 -right-10 text-9xl font-bangers text-comic-pink opacity-10">?</div>
          
          <h2 className="font-bangers text-4xl text-comic-blue mb-6">READY TO START YOUR JOURNEY?</h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <SpeechBubble color="green">
                <p className="font-comic">Jump into the Comic Code Verse and explore an interactive portfolio experience unlike any other!</p>
              </SpeechBubble>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <Link to="/" className="comic-button flex items-center justify-center">
                <Star className="mr-2" />
                <span>Enter Portfolio</span>
              </Link>
              
              <Link to="/contact" className="comic-button-secondary flex items-center justify-center">
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-comic text-sm text-gray-600">Created with 💖 using React, Tailwind CSS, and a whole lot of imagination!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
