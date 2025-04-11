
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import SpeechBubble from '../components/SpeechBubble';
import { skills } from '../data/skills';
import { Sparkles, Zap, Brain, Code, Database, Server, Rocket, Lightbulb } from 'lucide-react';

// 3D tilt effect for skill cards
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.05 : 1})`,
      transition: 'transform 0.1s ease'
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease'
    });
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="animate-pop relative z-10"
      style={{ 
        ...tiltStyle,
        animationDelay: `${index * 0.1}s` 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      whileHover={{ zIndex: 20 }}
    >
      <div className="relative overflow-hidden">
        <ComicPanel title={skill.name}>
          <div className="flex flex-col h-full">
            <div className="mb-3">
              <SkillBadge name={skill.name} color={skill.color} animated={isHovered} level={skill.level} />
            </div>
            
            <div className="relative">
              {isHovered && (
                <motion.div 
                  className="absolute -right-4 -top-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Sparkles className={`text-comic-${skill.color} w-12 h-12`} />
                </motion.div>
              )}
              <p className="font-comic mb-4 text-black">{skill.description}</p>
            </div>
            
            <div className="mt-auto flex items-center justify-between">
              <span className="font-marker text-sm text-black">Power Level:</span>
              <SkillLevel level={skill.level} />
            </div>
            
            {isHovered && (
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-comic-blue/30" />
              </motion.div>
            )}
          </div>
        </ComicPanel>
      </div>
    </motion.div>
  );
};

const SkillLevel = ({ level }: { level: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div 
          key={i} 
          className={`w-4 h-4 rounded-full border border-black ${
            i <= level ? 'bg-comic-blue' : 'bg-gray-200'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>
  );
};

// Floating particles animation component
const SkillParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${['rgba(66,153,225,0.7)', 'rgba(236,72,153,0.7)', 'rgba(52,211,153,0.7)', 'rgba(245,158,11,0.7)', 'rgba(139,92,246,0.7)'][i % 5]} 0%, rgba(255,255,255,0) 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [0, 1, 0],
            opacity: [0, 0.7, 0]
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
  );
};

// Floating skill sphere component
const FloatingSkillSphere = ({ selectedCategory }) => {
  return (
    <motion.div 
      className="absolute right-10 top-40 w-32 h-32 md:w-48 md:h-48 rounded-full hidden md:flex items-center justify-center z-0"
      style={{
        background: 'radial-gradient(circle, rgba(66,153,225,0.9) 0%, rgba(66,153,225,0.2) 70%, rgba(66,153,225,0) 100%)',
        boxShadow: '0 0 20px rgba(66,153,225,0.5)'
      }}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
        rotate: [0, 10, 0, -10, 0]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-white relative"
        >
          {selectedCategory === 'all' ? (
            <Sparkles size={40} className="text-white drop-shadow-glow" />
          ) : selectedCategory === 'frontend' ? (
            <Code size={40} className="text-white drop-shadow-glow" />
          ) : selectedCategory === 'backend' ? (
            <Server size={40} className="text-white drop-shadow-glow" />
          ) : selectedCategory === 'database' ? (
            <Database size={40} className="text-white drop-shadow-glow" />
          ) : selectedCategory === 'devops' ? (
            <Rocket size={40} className="text-white drop-shadow-glow" />
          ) : selectedCategory === 'mobile' ? (
            <Rocket size={40} className="text-white drop-shadow-glow" />
          ) : (
            <Lightbulb size={40} className="text-white drop-shadow-glow" />
          )}
        </motion.div>
        <div className="font-bangers text-xs mt-2 text-white drop-shadow-sm">
          {selectedCategory === 'all' ? 'All Powers' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </div>
      </div>
      
      {/* Orbiting mini skills */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center border border-comic-border"
          animate={{
            x: Math.cos(i * (Math.PI * 2) / 5) * 80,
            y: Math.sin(i * (Math.PI * 2) / 5) * 80,
            rotate: [0, 360]
          }}
          transition={{
            x: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            },
            y: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <span className="text-xs font-bold text-comic-blue">
            {i === 0 ? 'JS' : i === 1 ? 'TS' : i === 2 ? 'CSS' : i === 3 ? 'HTML' : 'REACT'}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const categories = [
    { id: 'all', name: 'All Powers', icon: <Sparkles size={16} /> },
    { id: 'frontend', name: 'Frontend', icon: <Code size={16} /> },
    { id: 'backend', name: 'Backend', icon: <Server size={16} /> },
    { id: 'database', name: 'Database', icon: <Database size={16} /> },
    { id: 'devops', name: 'DevOps', icon: <Rocket size={16} /> },
    { id: 'mobile', name: 'Mobile', icon: <Rocket size={16} /> },
    { id: 'other', name: 'Other', icon: <Lightbulb size={16} /> }
  ];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Staggered animation for category buttons
  const staggerDelay = 0.05;

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8 relative bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden" ref={containerRef}>
      <SkillParticles />
      <FloatingSkillSphere selectedCategory={selectedCategory} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="sticky top-0 z-20 mb-8 bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-sm pb-6 pt-4 px-4 rounded-xl border border-white/30"
        >
          <motion.h1 
            className="font-bangers text-5xl text-comic-blue text-center drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Zap className="inline-block mr-2 text-comic-pink" />
            Super Powers
            <Zap className="inline-block ml-2 text-comic-pink" />
          </motion.h1>
          
          <motion.div 
            className="mb-8 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SpeechBubble color="blue" animated>
              <p className="font-comic text-lg text-black">Every hero needs their powers! Here are the technologies and skills in my arsenal. Click on a category to filter!</p>
            </SpeechBubble>
          </motion.div>
          
          <motion.div 
            className="flex justify-center flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full border-2 border-black font-bangers transition-all flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-comic-blue text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-comic-blue hover:bg-comic-blue hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * staggerDelay + 0.4 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 left-4 w-24 h-24 rounded-full bg-comic-pink/10 z-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-4 w-32 h-32 rounded-full bg-comic-green/10 z-0"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
        }
      `}</style>
    </div>
  );
};

export default Skills;
