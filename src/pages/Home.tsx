
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import { Code, Github, BookOpen, Zap, MessageSquare, Star, ThumbsUp, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          animate={showIntro ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Hero Section */}
          <motion.div 
            className="flex flex-col items-center mb-12 relative" 
            variants={fadeInUpVariants}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-center bg-cover opacity-10 rounded-2xl"></div>
            
            <motion.h1 
              className="font-bangers text-5xl md:text-7xl mb-4 text-center relative z-10"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <span className="text-comic-blue">COMIC</span>
              <span className="text-comic-pink">CODE</span>
              <span className="text-comic-orange">VERSE</span>
            </motion.h1>
            
            <motion.div 
              className="relative z-10 w-32 h-32 rounded-full border-4 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover mb-4"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            <motion.div 
              className="w-full max-w-xl mx-auto mt-6 relative z-10"
              variants={fadeInUpVariants}
            >
              <SpeechBubble color="blue" animated interactive hoverEffect="grow">
                <p className="font-comic text-lg text-black">Welcome to my comic-style coding portfolio! I'm Hardik Arora, a 15-year-old developer who transforms ideas into interactive experiences.</p>
              </SpeechBubble>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex space-x-4 relative z-10"
              variants={fadeInUpVariants}
            >
              <Link to="/projects" className="comic-button flex items-center">
                <Code className="mr-2" />
                <span>View Projects</span>
              </Link>
              <Link to="/contact" className="comic-button-secondary flex items-center">
                <MessageSquare className="mr-2" />
                <span>Contact Me</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
            <motion.div variants={fadeInUpVariants}>
              <ComicPanel 
                title="About the Hero" 
                className={`transform transition-all duration-300 ${activePanel === 1 ? 'scale-105' : ''}`}
                flippable
                backContent={
                  <div className="p-6">
                    <h3 className="font-bangers text-2xl text-comic-pink mb-4">Tech Powers</h3>
                    <p className="font-comic mb-4 text-black">When not saving the world with code, I enjoy:</p>
                    <ul className="font-comic space-y-2 list-disc pl-5 text-black">
                      <li>Building AI and ML projects</li>
                      <li>Crafting blockchain applications</li>
                      <li>Creating full-stack web experiences</li>
                      <li>Learning new technologies constantly</li>
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
                    <p className="font-comic text-black">Hardik Arora, a 15-year-old developer from Delhi, India with a passion for creating beautiful, functional applications blending technology with creativity.</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <SkillBadge name="Full-Stack" color="blue" size="sm" />
                    <SkillBadge name="AI/ML" color="pink" size="sm" />
                    <SkillBadge name="Blockchain" color="green" size="sm" />
                  </div>
                  <div className="mt-4">
                    <a href="https://github.com/HardikCoder45" target="_blank" rel="noopener noreferrer" className="comic-button flex items-center justify-center">
                      <Github className="mr-2" size={18} />
                      <span>View GitHub</span>
                    </a>
                  </div>
                </div>
              </ComicPanel>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
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
                          <h4 className="font-comic font-bold text-black">Web3 Marketplace</h4>
                          <p className="font-comic text-sm text-gray-600">Blockchain powered platform</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-comic-pink flex items-center justify-center text-white">
                          <span className="font-bold">2</span>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-comic font-bold text-black">AI Chat Application</h4>
                          <p className="font-comic text-sm text-gray-600">Natural language processing</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-comic-green flex items-center justify-center text-white">
                          <span className="font-bold">3</span>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-comic font-bold text-black">Full Stack Dashboard</h4>
                          <p className="font-comic text-sm text-gray-600">React & Node.js</p>
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
                  <p className="font-comic text-black">Check out my latest coding adventures and projects - from web apps to machine learning experiments and blockchain innovations.</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="bg-comic-blue text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">15+</div>
                      <p className="font-comic text-xs mt-1 text-black">Projects</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-comic-pink text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">
                        <Trophy size={16} />
                      </div>
                      <p className="font-comic text-xs mt-1 text-black">Awards</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-comic-green text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">
                        <Star size={16} />
                      </div>
                      <p className="font-comic text-xs mt-1 text-black">Featured</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to="/projects" className="comic-button-secondary flex items-center justify-center">
                      <Code className="mr-2" size={18} />
                      <span>View Projects</span>
                    </Link>
                  </div>
                </div>
              </ComicPanel>
            </motion.div>
          </div>

          <motion.div className="mt-12" variants={fadeInUpVariants}>
            <ComicPanel title="Special Powers" className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("JavaScript: Building interactive web applications with modern frameworks", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">JS</span>
                  </div>
                  <p className="mt-2 font-comic font-bold text-black">JavaScript</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-pink rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("React: Creating beautiful, responsive designs with modern techniques", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">React</span>
                  </div>
                  <p className="mt-2 font-comic font-bold text-black">React</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-yellow rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("Python: Building backend services, data analysis and machine learning", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">PY</span>
                  </div>
                  <p className="mt-2 font-comic font-bold text-black">Python</p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto bg-comic-green rounded-full flex items-center justify-center border-2 border-black hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={(e) => handleSkillHover("AI/ML: Implementing machine learning models and AI solutions", e)}
                    onMouseLeave={handleSkillLeave}
                  >
                    <span className="font-bangers text-white text-2xl">AI</span>
                  </div>
                  <p className="mt-2 font-comic font-bold text-black">AI/ML</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-comic-border rounded-lg p-4 bg-white/80">
                  <h3 className="font-bangers text-xl text-comic-blue mb-2">Frontend Arsenal</h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="React" color="blue" level={5} />
                    <SkillBadge name="Node.js" color="green" level={5} />
                    <SkillBadge name="Express" color="pink" level={4} />
                    <SkillBadge name="TypeScript" color="blue" level={4} />
                    <SkillBadge name="Tailwind" color="blue" level={5} />
                    <SkillBadge name="Next.js" color="green" level={4} />
                  </div>
                </div>
                
                <div className="border-2 border-comic-border rounded-lg p-4 bg-white/80">
                  <h3 className="font-bangers text-xl text-comic-pink mb-2">Innovation Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Blockchain" color="green" level={4} />
                    <SkillBadge name="TensorFlow" color="blue" level={4} />
                    <SkillBadge name="Smart Contracts" color="pink" level={4} />
                    <SkillBadge name="Machine Learning" color="green" level={4} />
                    <SkillBadge name="Computer Vision" color="blue" level={3} />
                    <SkillBadge name="Web3" color="pink" level={4} />
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
          </motion.div>

          <motion.div className="mt-12 text-center" variants={fadeInUpVariants}>
            <SpeechBubble type="shout" color="pink" animated>
              <p className="font-comic text-lg text-black">Ready to collaborate? I'm a 15-year-old coder from Delhi, India with full-stack skills!</p>
            </SpeechBubble>
            
            <div className="mt-8">
              <Link to="/contact" className="comic-button-secondary inline-block animate-pulse flex items-center justify-center">
                <MessageSquare className="mr-2" size={18} />
                <span>Contact Me</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
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
