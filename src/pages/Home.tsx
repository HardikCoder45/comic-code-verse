
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import { Code, Github, BookOpen, Zap, MessageSquare, Star, ThumbsUp, Trophy, Award, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    // Add animation delay
    const timer = setTimeout(() => {
      setShowIntro(true);
    }, 300);

    // Show particles after a short delay
    const particlesTimer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(particlesTimer);
    };
  }, []);

  const handleSkillHover = (skill: string, event: React.MouseEvent) => {
    setTooltipContent(skill);
    setShowTooltip(true);
    setTooltipPosition({ 
      x: event.clientX, 
      y: event.clientY 
    });
    setActiveSkill(skill);
  };

  const handleSkillLeave = () => {
    setShowTooltip(false);
    setActiveSkill(null);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Interactive particle effect for the hero section
  const Particles = () => {
    return showParticles ? (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    ) : null;
  };

  // 3D tilt effect component
  const TiltCard = ({ children }: { children: React.ReactNode }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      // Limit the rotation
      setRotateX(posY * -0.03); 
      setRotateY(posX * 0.03);
    };
    
    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };
    
    return (
      <motion.div 
        className="w-full h-full transform-gpu"
        style={{ 
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.2s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full pl-20 pt-2 px-4 md:px-8 relative" ref={containerRef}>
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
          {/* Hero Section with Parallax Effect */}
          <motion.div 
            className="flex flex-col items-center mb-8 relative overflow-hidden rounded-2xl"
            style={{ opacity, scale }}
            variants={fadeInUpVariants}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-comic-blue/20 via-comic-pink/10 to-comic-orange/15 opacity-50 rounded-2xl z-0"></div>
            <Particles />
            
            <motion.h1 
              className="font-bangers text-5xl md:text-7xl mb-2 text-center relative z-10 drop-shadow-md"
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
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-4 relative z-10">
              <motion.div 
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.3
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-comic-blue via-comic-pink to-comic-orange opacity-70 rounded-full blur-md animate-spin-slow"></div>
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white rounded-full overflow-hidden relative">
                  <AvatarImage src="/lovable-uploads/d25e6cad-522f-4979-a30a-b74af228186c.png" alt="Hardik Arora" className="object-cover" />
                  <AvatarFallback>HA</AvatarFallback>
                </Avatar>
              </motion.div>
              
              <motion.div 
                className="w-full max-w-xl"
                variants={fadeInUpVariants}
              >
                <SpeechBubble color="blue" animated interactive hoverEffect="grow">
                  <p className="font-comic text-lg text-black">
                    <span className="font-bold">Hello! I'm Hardik Arora</span>, a 15-year-old developer from Delhi, India who transforms ideas into interactive experiences. I specialize in full-stack development, AI/ML, and blockchain technologies!
                  </p>
                </SpeechBubble>
                
                <motion.div 
                  className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  <motion.div variants={fadeInUpVariants}>
                    <Link to="/projects" className="comic-button flex items-center">
                      <Code className="mr-2" />
                      <span>View Projects</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeInUpVariants}>
                    <Link to="/contact" className="comic-button-secondary flex items-center">
                      <MessageSquare className="mr-2" />
                      <span>Contact Me</span>
                    </Link>
                  </motion.div>
                  <motion.a 
                    href="https://github.com/HardikCoder45" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-black bg-black text-white font-bangers hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    variants={fadeInUpVariants}
                  >
                    <Github className="mr-2" size={18} />
                    <span>GitHub</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Skills Section - Innovative Component */}
          <motion.div 
            className="mb-10"
            variants={fadeInUpVariants}
          >
            <ComicPanel title="My Super Powers">
              <div className="relative p-2 overflow-hidden">
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="px-6 py-3 bg-comic-yellow rounded-full font-bangers text-xl border-2 border-black"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="mr-2">✨</span>
                    Hover Over My Skills
                    <span className="ml-2">✨</span>
                  </motion.div>
                </div>
                
                <div className="relative w-full h-[300px] bg-gradient-to-br from-gray-100 to-white rounded-xl border-2 border-comic-border overflow-hidden">
                  {/* Skill Orbits - Innovative Interactive Element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Central avatar */}
                    <motion.div 
                      className="w-20 h-20 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black z-10"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="font-bangers text-white text-2xl">HA</span>
                    </motion.div>
                    
                    {/* Orbiting Skills - First Ring */}
                    {[
                      { name: "JavaScript", icon: "JS", color: "bg-comic-yellow", delay: 0 },
                      { name: "React", icon: "⚛️", color: "bg-comic-blue", delay: 1 },
                      { name: "Node.js", icon: "🟢", color: "bg-comic-green", delay: 2 },
                      { name: "Python", icon: "PY", color: "bg-comic-orange", delay: 3 }
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        className={`absolute w-14 h-14 ${skill.color} rounded-full flex items-center justify-center text-white font-bold border-2 border-black cursor-pointer shadow-md z-20`}
                        animate={{
                          x: `${Math.cos(index * (Math.PI / 2) + Date.now() * 0.0005) * 100}px`,
                          y: `${Math.sin(index * (Math.PI / 2) + Date.now() * 0.0005) * 100}px`,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: skill.delay
                        }}
                        onMouseEnter={(e) => handleSkillHover(`${skill.name}: Expert level with multiple projects`, e)}
                        onMouseLeave={handleSkillLeave}
                        whileHover={{ scale: 1.2, zIndex: 30 }}
                      >
                        <span>{skill.icon}</span>
                      </motion.div>
                    ))}
                    
                    {/* Orbiting Skills - Second Ring */}
                    {[
                      { name: "Blockchain", icon: "⛓️", color: "bg-comic-pink", delay: 0.5 },
                      { name: "AI/ML", icon: "🧠", color: "bg-comic-purple", delay: 1.5 },
                      { name: "TypeScript", icon: "TS", color: "bg-comic-blue", delay: 2.5 },
                      { name: "Express", icon: "EX", color: "bg-comic-green", delay: 3.5 },
                      { name: "MongoDB", icon: "DB", color: "bg-comic-orange", delay: 4.5 },
                      { name: "Web3", icon: "W3", color: "bg-comic-yellow", delay: 5.5 }
                    ].map((skill, index) => (
                      <motion.div
                        key={`outer-${index}`}
                        className={`absolute w-12 h-12 ${skill.color} rounded-full flex items-center justify-center text-white font-bold border-2 border-black cursor-pointer shadow-md`}
                        animate={{
                          x: `${Math.cos(index * (Math.PI / 3) + Date.now() * 0.0003) * 160}px`,
                          y: `${Math.sin(index * (Math.PI / 3) + Date.now() * 0.0003) * 160}px`,
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                          delay: skill.delay
                        }}
                        onMouseEnter={(e) => handleSkillHover(`${skill.name}: Building innovative solutions`, e)}
                        onMouseLeave={handleSkillLeave}
                        whileHover={{ scale: 1.2, zIndex: 30 }}
                      >
                        <span>{skill.icon}</span>
                      </motion.div>
                    ))}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <g stroke="#e2e8f0" strokeWidth="1" opacity="0.6">
                        {[...Array(10)].map((_, i) => (
                          <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            animate={{
                              x2: `${50 + Math.cos(i * (Math.PI / 5) + Date.now() * 0.0003) * 45}%`,
                              y2: `${50 + Math.sin(i * (Math.PI / 5) + Date.now() * 0.0003) * 45}%`,
                            }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.5
                            }}
                          />
                        ))}
                      </g>
                    </svg>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/skills" className="inline-block comic-button flex items-center justify-center">
                    <Zap className="mr-2" size={18} />
                    <span>Explore All Skills</span>
                  </Link>
                </div>
              </div>
            </ComicPanel>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <motion.div variants={fadeInUpVariants}>
              <TiltCard>
                <ComicPanel 
                  title="About Me" 
                  className="h-full"
                  flippable
                  backContent={
                    <div className="p-6">
                      <h3 className="font-bangers text-2xl text-comic-pink mb-4">Quick Facts</h3>
                      <ul className="font-comic space-y-2 text-black">
                        <li className="flex items-center"><span className="mr-2 text-lg">🚀</span> 15 years old from Delhi, India</li>
                        <li className="flex items-center"><span className="mr-2 text-lg">💻</span> Self-taught programmer since age 11</li>
                        <li className="flex items-center"><span className="mr-2 text-lg">🏆</span> Winner of multiple coding competitions</li>
                        <li className="flex items-center"><span className="mr-2 text-lg">🔭</span> Passionate about emerging technologies</li>
                        <li className="flex items-center"><span className="mr-2 text-lg">🎮</span> Love gaming and building game mods</li>
                      </ul>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="h-20 bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-2 border-comic-border"></div>
                        <div className="h-20 bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg border-2 border-comic-border"></div>
                      </div>
                    </div>
                  }
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex">
                      <motion.div 
                        className="w-24 h-24 rounded-lg border-2 border-comic-border overflow-hidden mr-4"
                        whileHover={{ rotate: 5 }}
                      >
                        <img 
                          src="/lovable-uploads/d25e6cad-522f-4979-a30a-b74af228186c.png" 
                          alt="Hardik Arora" 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <p className="font-comic text-black">Hardik Arora, a 15-year-old developer from Delhi, India with a passion for creating beautiful, functional applications blending technology with creativity.</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <SkillBadge name="Full-Stack" color="blue" size="sm" />
                      <SkillBadge name="AI/ML" color="pink" size="sm" />
                      <SkillBadge name="Blockchain" color="green" size="sm" />
                    </div>
                    <motion.div 
                      className="mt-2"
                      whileHover={{ scale: 1.03 }}
                    >
                      <a 
                        href="https://github.com/HardikCoder45" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="comic-button flex items-center justify-center"
                      >
                        <Github className="mr-2" size={18} />
                        <span>GitHub Profile</span>
                      </a>
                    </motion.div>
                  </div>
                </ComicPanel>
              </TiltCard>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <TiltCard>
                <ComicPanel 
                  title="Latest Projects" 
                  className="h-full"
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
                            <p className="font-comic text-sm text-gray-600">Built with Solidity, React & Ethers.js</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-comic-pink flex items-center justify-center text-white">
                            <span className="font-bold">2</span>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-comic font-bold text-black">AI Chat Application</h4>
                            <p className="font-comic text-sm text-gray-600">Using OpenAI, Next.js & TailwindCSS</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-comic-green flex items-center justify-center text-white">
                            <span className="font-bold">3</span>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-comic font-bold text-black">Full Stack Dashboard</h4>
                            <p className="font-comic text-sm text-gray-600">React, Express, MongoDB & D3.js</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <motion.div 
                        className="h-20 rounded-lg border-2 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      ></motion.div>
                      <motion.div 
                        className="h-20 rounded-lg border-2 border-comic-border bg-[url('/placeholder.svg')] bg-center bg-cover"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      ></motion.div>
                    </div>
                    <p className="font-comic text-black">Check out my latest coding adventures and projects - from web apps to machine learning experiments and blockchain innovations.</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="bg-comic-blue text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">15+</div>
                        <p className="font-comic text-xs mt-1 text-black">Projects</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="bg-comic-pink text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">
                          <Trophy size={16} />
                        </div>
                        <p className="font-comic text-xs mt-1 text-black">Awards</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="bg-comic-green text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold">
                          <Star size={16} />
                        </div>
                        <p className="font-comic text-xs mt-1 text-black">Featured</p>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="mt-2"
                      whileHover={{ scale: 1.03 }}
                    >
                      <Link to="/projects" className="comic-button-secondary flex items-center justify-center">
                        <Code className="mr-2" size={18} />
                        <span>View All Projects</span>
                      </Link>
                    </motion.div>
                  </div>
                </ComicPanel>
              </TiltCard>
            </motion.div>
          </div>

          <motion.div 
            className="mt-8 text-center"
            variants={fadeInUpVariants}
          >
            <motion.div 
              className="inline-block"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SpeechBubble type="shout" color="pink" animated>
                <p className="font-comic text-lg text-black">Ready to collaborate? Let's build something amazing together!</p>
              </SpeechBubble>
            </motion.div>
            
            <div className="mt-6">
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -1, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <Link to="/contact" className="comic-button-secondary inline-flex items-center justify-center px-6 py-3">
                  <MessageSquare className="mr-2" size={20} />
                  <span className="text-lg">Get In Touch</span>
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {showTooltip && (
        <motion.div 
          className="fixed bg-black text-white p-2 rounded-lg text-sm font-comic z-50 max-w-xs"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`
          }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {tooltipContent}
        </motion.div>
      )}
      
      {/* Add custom CSS for the spinning animation */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
