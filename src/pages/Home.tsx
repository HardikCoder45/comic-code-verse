
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import { 
  Code, Github, BookOpen, Zap, MessageSquare, Star, 
  ThumbsUp, Trophy, Award, ArrowRight, Sparkles, 
  Rocket, Lightbulb, Brain, Atom, Cpu
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comic3DPanel from '../components/Comic3DPanel';

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
    }, 200); // Reduced delay for faster loading

    // Show particles after a short delay
    const particlesTimer = setTimeout(() => {
      setShowParticles(true);
    }, 500); // Reduced delay for faster loading

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Interactive particle effect for the hero section
  const Particles = () => {
    return showParticles ? (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
              duration: 4 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen w-full pl-20 pt-2 px-4 md:px-8 relative bg-gradient-to-br from-white via-blue-50 to-purple-50" ref={containerRef}>
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
          {/* Hero Section with Modern Design */}
          <motion.div 
            className="flex flex-col items-center mb-12 relative overflow-hidden rounded-2xl"
            style={{ opacity, scale }}
            variants={fadeInUpVariants}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-comic-blue/10 via-comic-pink/5 to-comic-orange/10 opacity-50 rounded-2xl z-0"></div>
            <Particles />
            
            <motion.h1 
              className="font-bangers text-5xl md:text-7xl text-center relative z-10 drop-shadow-md mt-6 mb-4 tracking-wider"
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
            
            {/* Hero content with interactive elements */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 gap-8 relative z-10">
              {/* Profile section */}
              <motion.div 
                className="w-full md:w-1/3 flex flex-col items-center"
                variants={fadeInUpVariants}
              >
                <motion.div 
                  className="relative mb-4"
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
                  <motion.div 
                    className="relative"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: [-2, 2, -2, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Avatar className="w-36 h-36 md:w-48 md:h-48 border-4 border-white rounded-full overflow-hidden relative">
                      <AvatarImage src="/lovable-uploads/d25e6cad-522f-4979-a30a-b74af228186c.png" alt="Hardik Arora" className="object-cover" />
                      <AvatarFallback>HA</AvatarFallback>
                    </Avatar>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="text-center mb-4"
                  variants={fadeInUpVariants}
                >
                  <h2 className="font-bangers text-2xl md:text-3xl text-comic-blue">Hardik Arora</h2>
                  <p className="font-comic text-sm text-gray-600">15-year-old Developer • Delhi, India</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  variants={fadeInUpVariants}
                >
                  <motion.a 
                    href="https://github.com/HardikCoder45" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-black bg-black text-white font-bangers hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="mr-2" size={18} />
                    <span>GitHub</span>
                  </motion.a>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/projects" className="comic-button flex items-center">
                      <Code className="mr-2" />
                      <span>Projects</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Introduction bubble with animation */}
              <motion.div 
                className="w-full md:w-2/3"
                variants={fadeInUpVariants}
              >
                <SpeechBubble color="blue" animated interactive hoverEffect="grow">
                  <p className="font-comic text-lg text-black">
                    <span className="font-bold">Hello!</span> I'm a passionate young developer from Delhi, India who transforms ideas into interactive experiences. I specialize in full-stack development, AI/ML, and blockchain technologies!
                  </p>
                  <p className="font-comic text-black mt-2">
                    My journey in coding began at age 11, and I've been building amazing projects ever since. I love creating innovative solutions that push the boundaries of what's possible on the web.
                  </p>
                </SpeechBubble>
                
                {/* Key skills highlights */}
                <motion.div 
                  className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2"
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
                  {[
                    { name: "Full-Stack", icon: <Code size={14} /> },
                    { name: "AI/ML", icon: <Brain size={14} /> },
                    { name: "Blockchain", icon: <Link size={14} /> },
                    { name: "React", icon: <Atom size={14} /> }
                  ].map((skill, i) => (
                    <motion.div 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <SkillBadge 
                        name={skill.name} 
                        color={['blue', 'pink', 'green', 'orange'][i % 4] as any}
                        size="sm"
                        icon={skill.icon}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Innovative Skills Showcase */}
          <motion.div 
            className="mb-12 mt-8"
            variants={fadeInUpVariants}
          >
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-comic-border overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-comic-blue via-comic-pink to-comic-orange"></div>
              
              <div className="p-6">
                <motion.h2 
                  className="font-bangers text-3xl md:text-4xl text-center mb-6 text-comic-blue"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="inline-block mr-2 text-comic-pink" />
                  My Tech Superpowers
                  <Sparkles className="inline-block ml-2 text-comic-pink" />
                </motion.h2>
                
                {/* Innovative Orbital Skills Visualization */}
                <div className="relative w-full h-[350px] bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden">
                  {/* Central node */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-comic-blue to-comic-pink rounded-full flex items-center justify-center border-2 border-black shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="font-bangers text-white text-2xl">HA</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Inner orbit */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-gray-200 opacity-30"></div>
                  
                  {/* Middle orbit */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-gray-200 opacity-30"></div>
                  
                  {/* Outer orbit */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-gray-200 opacity-30"></div>
                  
                  {/* Inner orbit skills */}
                  {[
                    { name: "JavaScript", icon: "JS", color: "bg-comic-yellow", textColor: "text-black" },
                    { name: "React", icon: "⚛️", color: "bg-comic-blue", textColor: "text-white" },
                    { name: "Python", icon: "PY", color: "bg-comic-green", textColor: "text-white" },
                    { name: "Node.js", icon: "NJ", color: "bg-comic-orange", textColor: "text-white" }
                  ].map((skill, index) => (
                    <motion.div
                      key={`inner-${index}`}
                      className={`absolute top-1/2 left-1/2 w-16 h-16 ${skill.color} rounded-full flex items-center justify-center ${skill.textColor} font-bold border-2 border-black cursor-pointer shadow-lg z-20`}
                      animate={{
                        x: `${Math.cos(index * Math.PI / 2 + Date.now() * 0.0008) * 110 - 32}px`,
                        y: `${Math.sin(index * Math.PI / 2 + Date.now() * 0.0008) * 110 - 32}px`,
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{ scale: 1.2, zIndex: 30 }}
                      onMouseEnter={(e) => handleSkillHover(`${skill.name}: Expert level with multiple projects`, e)}
                      onMouseLeave={handleSkillLeave}
                    >
                      <span>{skill.icon}</span>
                    </motion.div>
                  ))}
                  
                  {/* Middle orbit skills */}
                  {[
                    { name: "Express", icon: "EX", color: "bg-comic-green", textColor: "text-white" },
                    { name: "TypeScript", icon: "TS", color: "bg-comic-blue", textColor: "text-white" },
                    { name: "MongoDB", icon: "DB", color: "bg-comic-orange", textColor: "text-white" },
                    { name: "HTML/CSS", icon: "HC", color: "bg-comic-pink", textColor: "text-white" },
                    { name: "Git", icon: "GT", color: "bg-comic-purple", textColor: "text-white" }
                  ].map((skill, index) => (
                    <motion.div
                      key={`middle-${index}`}
                      className={`absolute top-1/2 left-1/2 w-14 h-14 ${skill.color} rounded-full flex items-center justify-center ${skill.textColor} font-bold border-2 border-black cursor-pointer shadow-lg`}
                      animate={{
                        x: `${Math.cos(index * (Math.PI * 2) / 5 + Date.now() * 0.0006) * 170 - 28}px`,
                        y: `${Math.sin(index * (Math.PI * 2) / 5 + Date.now() * 0.0006) * 170 - 28}px`,
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{ scale: 1.2, zIndex: 30 }}
                      onMouseEnter={(e) => handleSkillHover(`${skill.name}: Advanced skills with professional experience`, e)}
                      onMouseLeave={handleSkillLeave}
                    >
                      <span>{skill.icon}</span>
                    </motion.div>
                  ))}
                  
                  {/* Outer orbit skills */}
                  {[
                    { name: "AI/ML", icon: "🧠", color: "bg-comic-purple", textColor: "text-white" },
                    { name: "Blockchain", icon: "⛓️", color: "bg-comic-pink", textColor: "text-white" },
                    { name: "AWS", icon: "AWS", color: "bg-comic-orange", textColor: "text-white" },
                    { name: "Web3", icon: "W3", color: "bg-comic-yellow", textColor: "text-black" },
                    { name: "UI/UX", icon: "UI", color: "bg-comic-blue", textColor: "text-white" },
                    { name: "API", icon: "API", color: "bg-comic-green", textColor: "text-white" }
                  ].map((skill, index) => (
                    <motion.div
                      key={`outer-${index}`}
                      className={`absolute top-1/2 left-1/2 w-12 h-12 ${skill.color} rounded-full flex items-center justify-center ${skill.textColor} font-bold border-2 border-black cursor-pointer shadow-lg`}
                      animate={{
                        x: `${Math.cos(index * (Math.PI * 2) / 6 + Date.now() * 0.0004) * 230 - 24}px`,
                        y: `${Math.sin(index * (Math.PI * 2) / 6 + Date.now() * 0.0004) * 230 - 24}px`,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      whileHover={{ scale: 1.2, zIndex: 30 }}
                      onMouseEnter={(e) => handleSkillHover(`${skill.name}: Building innovative solutions`, e)}
                      onMouseLeave={handleSkillLeave}
                    >
                      <span>{skill.icon}</span>
                    </motion.div>
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <g stroke="#e2e8f0" strokeWidth="1" opacity="0.5">
                      {[...Array(12)].map((_, i) => (
                        <motion.line
                          key={i}
                          x1="50%"
                          y1="50%"
                          animate={{
                            x2: `${50 + Math.cos(i * (Math.PI / 6) + Date.now() * 0.0003) * 45}%`,
                            y2: `${50 + Math.sin(i * (Math.PI / 6) + Date.now() * 0.0003) * 45}%`,
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </g>
                  </svg>
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/skills" className="inline-block comic-button-secondary flex items-center justify-center mx-auto">
                    <Zap className="mr-2" size={18} />
                    <span>Explore All Skills</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {/* About Me Section */}
            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Comic3DPanel 
                title="About Me" 
                headerColor="blue"
                depth="deep"
                spotlightEffect={true}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <motion.div 
                      className="w-20 h-20 rounded-lg border-2 border-comic-border overflow-hidden"
                      whileHover={{ rotate: 5 }}
                    >
                      <img 
                        src="/lovable-uploads/d25e6cad-522f-4979-a30a-b74af228186c.png" 
                        alt="Hardik Arora" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-bangers text-xl text-comic-blue mb-1">Who Am I?</h3>
                      <p className="font-comic text-black">15-year-old developer from Delhi with a passion for creating beautiful, functional applications.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bangers text-lg text-comic-pink">Quick Facts</h4>
                    <ul className="font-comic space-y-1 ml-5 list-disc text-black">
                      <li>Self-taught programmer since age 11</li>
                      <li>Winner of multiple coding competitions</li>
                      <li>Passionate about emerging technologies</li>
                      <li>Love gaming and building game mods</li>
                    </ul>
                  </div>
                  
                  <Link to="/about" className="comic-button-secondary flex items-center justify-center w-full">
                    <BookOpen className="mr-2" size={18} />
                    <span>My Full Story</span>
                  </Link>
                </div>
              </Comic3DPanel>
            </motion.div>

            {/* Projects Showcase */}
            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Comic3DPanel 
                title="Latest Projects" 
                headerColor="pink"
                depth="deep"
                spotlightEffect={true}
              >
                <div className="flex flex-col space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "Web3 Marketplace", tech: "Solidity, React & Ethers.js", icon: <Cpu size={16} /> },
                      { name: "AI Chat Application", tech: "OpenAI, Next.js & TailwindCSS", icon: <MessageSquare size={16} /> },
                      { name: "Full Stack Dashboard", tech: "React, Express, MongoDB & D3.js", icon: <Rocket size={16} /> }
                    ].map((project, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${['bg-comic-blue', 'bg-comic-pink', 'bg-comic-green'][i]} flex items-center justify-center text-white`}>
                          {project.icon}
                        </div>
                        <div>
                          <h4 className="font-comic font-bold text-black">{project.name}</h4>
                          <p className="font-comic text-xs text-gray-600">{project.tech}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <div className="flex flex-col items-center">
                          <div className="bg-comic-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">15+</div>
                          <p className="font-comic text-xs mt-1 text-black">Projects</p>
                        </div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <div className="flex flex-col items-center">
                          <div className="bg-comic-pink text-white rounded-full w-10 h-10 flex items-center justify-center">
                            <Trophy size={16} />
                          </div>
                          <p className="font-comic text-xs mt-1 text-black">Awards</p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <Link to="/projects" className="comic-button flex items-center">
                      <Code className="mr-2" size={18} />
                      <span>View All</span>
                    </Link>
                  </div>
                </div>
              </Comic3DPanel>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div 
            className="my-12 text-center"
            variants={fadeInUpVariants}
          >
            <motion.div 
              className="inline-block mb-6"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <SpeechBubble type="shout" color="pink" animated>
                <p className="font-comic text-xl text-black">Ready to collaborate? Let's build something amazing together!</p>
              </SpeechBubble>
            </motion.div>
            
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Link to="/contact" className="comic-button-secondary inline-flex items-center justify-center px-6 py-3">
                <MessageSquare className="mr-2" size={20} />
                <span className="text-lg">Get In Touch</span>
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
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
      
      <style>
        {`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Home;

