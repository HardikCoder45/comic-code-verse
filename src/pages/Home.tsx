
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import { Code, Github, BookOpen, Zap, MessageSquare } from 'lucide-react';

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setShowIntro(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSkillHover = (skill: string, event: React.MouseEvent) => {
    setTooltipContent(skill);
    setShowTooltip(true);
    setTooltipPosition({ 
      x: event.clientX, 
      y: event.clientY 
    });
  };

  const handleSkillLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${showIntro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Hero Section */}
          <div className="flex flex-col items-center mb-12 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover opacity-10 rounded-2xl"></div>
            
            <h1 className="font-bangers text-5xl md:text-7xl text-comic-blue mb-4 text-center relative z-10">
              <span className="text-comic-blue">COMIC</span>
              <span className="text-comic-pink">CODE</span>
              <span className="text-comic-orange">VERSE</span>
            </h1>
            
            <div className="relative z-10 w-32 h-32 rounded-full border-4 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover mb-4 animate-float"></div>
            
            <div className="w-full max-w-xl mx-auto mt-6 relative z-10">
              <SpeechBubble color="blue" animated interactive hoverEffect="grow">
                <p className="font-comic text-lg">Welcome to my comic-style coding portfolio! I'm a developer who transforms ideas into interactive experiences.</p>
              </SpeechBubble>
            </div>
            
            <div className="mt-8 flex space-x-4 relative z-10">
              <Link to="/projects" className="comic-button flex items-center">
                <Code className="mr-2" />
                <span>View Projects</span>
              </Link>
              <Link to="/contact" className="comic-button-secondary flex items-center">
                <MessageSquare className="mr-2" />
                <span>Contact Me</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
            <ComicPanel 
              title="About the Hero" 
              className={`transform transition-all duration-300 ${activePanel === 1 ? 'scale-105' : ''}`}
              flippable
              backContent={
                <div className="p-6">
                  <h3 className="font-bangers text-2xl text-comic-pink mb-4">Secret Identity</h3>
                  <p className="font-comic mb-4">When not saving the world with code, I enjoy:</p>
                  <ul className="font-comic space-y-2 list-disc pl-5">
                    <li>Exploring new technologies and frameworks</li>
                    <li>Contributing to open-source projects</li>
                    <li>Mentoring junior developers</li>
                    <li>Mountain biking and outdoor adventures</li>
                  </ul>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-20 bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-2 border-comic-border"></div>
                    <div className="h-20 bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-2 border-comic-border"></div>
                  </div>
                </div>
              }
              onMouseEnter={() => setActivePanel(1)}
              onMouseLeave={() => setActivePanel(null)}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex">
                  <div className="w-24 h-24 rounded-lg border-2 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover mr-4"></div>
                  <p className="font-comic">A passionate developer with a love for creating beautiful, functional web applications that merge technology with creativity.</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <SkillBadge name="5+ Years" color="blue" size="sm" />
                  <SkillBadge name="Full-Stack" color="pink" size="sm" />
                  <SkillBadge name="Team Lead" color="green" size="sm" />
                </div>
                <div className="mt-4">
                  <Link to="/about" className="comic-button flex items-center justify-center">
                    <BookOpen className="mr-2" size={18} />
                    <span>Origin Story</span>
                  </Link>
                </div>
              </div>
            </ComicPanel>

            <ComicPanel 
              title="Latest Missions" 
              className={`transform transition-all duration-300 ${activePanel === 2 ? 'scale-105' : ''}`}
              flippable
              backContent={
                <div className="p-6">
                  <h3 className="font-bangers text-2xl text-comic-orange mb-4">Project Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-comic-blue flex items-center justify-center text-white">
                        <span className="font-bold">1</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-comic font-bold">E-commerce Platform</h4>
                        <p className="font-comic text-sm text-gray-600">10K+ Monthly Users</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-comic-pink flex items-center justify-center text-white">
                        <span className="font-bold">2</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-comic font-bold">AI Chat Application</h4>
                        <p className="font-comic text-sm text-gray-600">Featured on ProductHunt</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-comic-green flex items-center justify-center text-white">
                        <span className="font-bold">3</span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-comic font-bold">Blockchain Explorer</h4>
                        <p className="font-comic text-sm text-gray-600">Open Source - 500+ Stars</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              onMouseEnter={() => setActivePanel(2)}
              onMouseLeave={() => setActivePanel(null)}
            >
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-20 rounded-lg border-2 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
                  <div className="h-20 rounded-lg border-2 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
                </div>
                <p className="font-comic">Check out my latest coding adventures and projects - from web apps to machine learning experiments.</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="bg-comic-blue text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">20+</div>
                    <p className="font-comic text-xs mt-1">Projects</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-comic-pink text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">15k</div>
                    <p className="font-comic text-xs mt-1">Users</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-comic-green text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">8</div>
                    <p className="font-comic text-xs mt-1">Awards</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/projects" className="comic-button-secondary flex items-center justify-center">
                    <Github className="mr-2" size={18} />
                    <span>View Projects</span>
                  </Link>
                </div>
              </div>
            </ComicPanel>
          </div>

          <div className="mt-12">
            <ComicPanel title="Special Powers" className="animate-float">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("JavaScript: Building interactive web applications with modern frameworks", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">JS</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">JavaScript</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-pink rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("CSS: Creating beautiful, responsive designs with modern techniques", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">CSS</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">CSS</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-yellow rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("Python: Building backend services, data analysis and machine learning", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">PY</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">Python</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-green rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("Databases: Designing and optimizing SQL and NoSQL data solutions", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">DB</span>
                  </div>
                  <p className="mt-2 font-comic font-bold">Databases</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-comic-border rounded-lg p-4 bg-white/80">
                  <h3 className="font-bangers text-xl text-comic-blue mb-2">Frontend Arsenal</h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="React" color="blue" level={5} />
                    <SkillBadge name="Vue.js" color="green" level={4} />
                    <SkillBadge name="Angular" color="pink" level={3} />
                    <SkillBadge name="TypeScript" color="blue" level={5} />
                    <SkillBadge name="Tailwind" color="blue" level={5} />
                    <SkillBadge name="GSAP" color="green" level={4} />
                  </div>
                </div>
                
                <div className="border-2 border-comic-border rounded-lg p-4 bg-white/80">
                  <h3 className="font-bangers text-xl text-comic-pink mb-2">Backend Toolkit</h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Node.js" color="green" level={5} />
                    <SkillBadge name="Django" color="green" level={4} />
                    <SkillBadge name="Express" color="blue" level={5} />
                    <SkillBadge name="GraphQL" color="pink" level={4} />
                    <SkillBadge name="MongoDB" color="green" level={4} />
                    <SkillBadge name="PostgreSQL" color="blue" level={4} />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/skills" className="inline-block comic-button mt-4 flex items-center justify-center">
                  <Zap className="mr-2" size={18} />
                  <span>See All Powers</span>
                </Link>
              </div>
            </ComicPanel>
          </div>

          <div className="mt-12 text-center">
            <SpeechBubble type="shout" color="pink" animated>
              <p className="font-comic text-lg">Ready to collaborate? Let's create something amazing together!</p>
            </SpeechBubble>
            
            <div className="mt-8">
              <Link to="/contact" className="comic-button-secondary inline-block animate-shake flex items-center justify-center">
                <MessageSquare className="mr-2" size={18} />
                <span>Send a Signal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {showTooltip && (
        <div 
          className="fixed bg-black text-white p-2 rounded-lg text-sm font-comic z-50 max-w-xs"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Home;
