import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import Comic3DPanel from '../components/Comic3DPanel';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Github, Zap, Star, Users, BookOpen, Award, Rocket, Coffee, Brain, Database, PanelLeft, PanelRight, MessageSquare, Heart, ExternalLink, Sparkles } from 'lucide-react';
import SkillBadge from '../components/SkillBadge';

const Landing = () => {
  const [showElements, setShowElements] = useState({
    hero: false,
    features: false,
    portfolio: false,
    skills: false,
    journey: false,
    cta: false
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const bookRef = useRef(null);

  // References for scroll-based animations
  const containerRef = React.useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  // Mouse parallax effect for the book cover
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bookRef.current) {
        const rect = bookRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate relative position from center
        const relativeX = (e.clientX - centerX) / rect.width;
        const relativeY = (e.clientY - centerY) / rect.height;
        
        setMousePosition({ x: relativeX * 10, y: relativeY * 10 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background images with optimized loading
  const backgroundImages = ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800'];
  useEffect(() => {
    // Staged animation entries with sequential timing
    const timers = [setTimeout(() => setShowElements(prev => ({
      ...prev,
      hero: true
    })), 200), setTimeout(() => setShowElements(prev => ({
      ...prev,
      features: true
    })), 600), setTimeout(() => setShowElements(prev => ({
      ...prev,
      portfolio: true
    })), 1000), setTimeout(() => setShowElements(prev => ({
      ...prev,
      skills: true
    })), 1400), setTimeout(() => setShowElements(prev => ({
      ...prev,
      journey: true
    })), 1800), setTimeout(() => setShowElements(prev => ({
      ...prev,
      cta: true
    })), 2200)];

    // Preload background images
    backgroundImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  // Particle system for a more dynamic background
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      const colors = ['#3b82f6', '#ec4899', '#f97316', '#10b981'];
      
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.3 + 0.1
        });
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    const moveParticles = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100
      })));
    }, 50);
    
    return () => clearInterval(moveParticles);
  }, []);
  
  return <div className="min-h-screen w-full bg-amber-50 perspective-1000" ref={containerRef}>
    {/* Background particles */}
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.3
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
    
    {/* Book cover effect */}
    <motion.div 
      ref={bookRef}
      className="relative w-full max-w-6xl h-[85vh] mx-auto mt-10 shadow-2xl rounded-lg overflow-hidden"
      initial={{ rotateY: 15, scale: 0.95 }}
      animate={{ 
        rotateY: isHovering ? 5 + mousePosition.x : 0, 
        rotateX: isHovering ? -mousePosition.y : 0,
        scale: 1,
        boxShadow: isHovering ? "0 25px 50px -12px rgba(0, 0, 0, 0.35)" : "0 20px 25px -5px rgba(0, 0, 0, 0.25)" 
      }}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        boxShadow: { duration: 0.5 }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Interactive light reflection effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 mix-blend-overlay z-50 pointer-events-none rounded-lg"
        animate={{ 
          opacity: isHovering ? 0.6 : 0,
          background: isHovering ? `linear-gradient(
            ${135 + mousePosition.x * 5}deg, 
            rgba(255,255,255,0.8) 0%, 
            rgba(255,255,255,0) 60%
          )` : ""
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Book spine with 3D effect */}
      <motion.div 
        className="absolute left-0 inset-y-0 w-12 bg-comic-blue rounded-l-md shadow-inner z-10 flex items-center justify-center"
        animate={{ 
          rotateY: isHovering ? -15 : 0,
          boxShadow: isHovering ? "inset -5px 0 10px rgba(0,0,0,0.2)" : "inset -2px 0 5px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="font-bangers text-2xl text-white transform rotate-90 whitespace-nowrap tracking-wide"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
          animate={{ 
            textShadow: isHovering ? '0 2px 4px rgba(0,0,0,0.7)' : '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          COMIC CODE VERSE
        </motion.h2>
      </motion.div>
      
      {/* Book cover */}
      <div className="absolute inset-0 ml-12 border-8 border-comic-blue bg-comic-background rounded-r-md overflow-hidden">
      {/* Hero Section */}
        <div className={`relative h-full flex items-center justify-center overflow-hidden transition-all duration-700 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        {/* Parallax background images with enhanced effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{
              backgroundImage: `url(${backgroundImages[0]})`,
              y: y1
            }} 
          />
          <motion.div 
            className="absolute inset-0" 
            animate={{ 
              background: [
                'linear-gradient(to b, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.05))',
                'linear-gradient(to b, rgba(236, 72, 153, 0.1), rgba(249, 115, 22, 0.05))',
                'linear-gradient(to b, rgba(249, 115, 22, 0.1), rgba(59, 130, 246, 0.05))'
              ]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Animated header with micro-interactions */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-20">
          <motion.div 
            className="flex items-center" 
            initial={{ x: -50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-comic-blue via-comic-pink to-comic-blue" 
                animate={{
                  background: ["linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)", "linear-gradient(225deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)"]
                }} 
                transition={{
                  duration: 3,
                  repeat: Infinity
                }} 
              />
              <motion.span 
                className="font-bangers text-white text-xl relative z-10"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.5)",
                    "0 0 10px rgba(255,255,255,0.8)",
                    "0 0 5px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >HA</motion.span>
            </div>
            <motion.h1 
              className="ml-4 font-bangers text-2xl" 
              animate={{
                color: [
                  "#3b82f6", // blue
                  "#ec4899", // pink
                  "#f97316", // orange
                  "#3b82f6"  // back to blue
                ]
              }} 
              transition={{
                duration: 5,
                repeat: Infinity
              }}
            >
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >COMIC</motion.span>
              <motion.span 
                className="inline-block mx-1"
                whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
              >CODE</motion.span>
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >VERSE</motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="flex space-x-6" 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {['Home', 'Projects', 'About', 'Skills', 'Contact'].map((item, index) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase()}`} 
                className="font-comic font-bold hover:text-comic-blue transition-colors relative overflow-hidden group"
              >
                <motion.span
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {item}
                </motion.span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </motion.div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 z-10">
          <div className="relative">
              <motion.h1 
                className="font-bangers text-5xl md:text-7xl mb-6 leading-tight relative z-10 text-black" 
                style={{
                  textShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  WebkitTextStroke: "2px rgba(0,0,0,0.1)"
                }}
              >
                <motion.span 
                  className="text-comic-blue block" 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05, 
                    textShadow: "0 0 15px rgba(59, 130, 246, 0.5)" 
                  }}
                >
                  HARDIK ARORA
                </motion.span>
                <motion.span 
                  className="text-comic-pink block -mt-2" 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.8, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05, 
                    textShadow: "0 0 15px rgba(236, 72, 153, 0.5)" 
                  }}
                >
                  15-YEAR-OLD
                </motion.span>
                <motion.span 
                  className="text-comic-orange block -mt-2" 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 1.1, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05, 
                    textShadow: "0 0 15px rgba(249, 115, 22, 0.5)" 
                  }}
                >
                  FULL STACK DEVELOPER
                </motion.span>
              </motion.h1>
            </div>
            
            {/* Enhanced CTA button */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Link to="/home">
                <motion.button 
                  className="bg-comic-blue text-white font-bangers text-xl px-8 py-4 rounded-full shadow-lg border-2 border-black relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="absolute top-0 left-0 w-full h-full bg-white"
                    initial={{ x: "-100%", opacity: 0.3 }}
                    animate={{ x: "100%", opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ mixBlendMode: "overlay" }}
                  />
                  <motion.span 
                    className="relative z-10 flex items-center justify-center"
                  >
                    OPEN THE COMIC BOOK
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                      <ArrowRight size={20} />
                    </motion.span>
                  </motion.span>
                </motion.button>
                
                {/* Button sparkle effects */}
                <AnimatePresence>
                  {isHovering && (
                    <>
                      <motion.span
                        className="absolute text-yellow-400"
                        initial={{ opacity: 0, scale: 0, x: -30, y: -20 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles size={20} />
                      </motion.span>
                      <motion.span
                        className="absolute text-yellow-400"
                        initial={{ opacity: 0, scale: 0, x: 30, y: -20 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Sparkles size={16} />
                      </motion.span>
                    </>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced book edge with 3D effect */}
      <motion.div 
        className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-gray-200 to-transparent z-0"
        animate={{ 
          width: isHovering ? "6px" : "4px",
          boxShadow: isHovering ? "inset 2px 0 5px rgba(0,0,0,0.2)" : "none" 
        }}
      />
      
      {/* Enhanced book corner fold */}
      <motion.div 
        className="absolute bottom-0 right-0 w-16 h-16 z-10" 
        style={{ 
          backgroundImage: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)" 
        }}
        animate={{ 
          width: isHovering ? "20px" : "16px", 
          height: isHovering ? "20px" : "16px",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>

    {/* Book opening hint with micro-animation */}
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div 
        className="flex items-center justify-center gap-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <ArrowRight size={16} className="text-black/70" />
        </motion.span>
        <motion.p 
          className="font-comic text-black/70 text-sm"
        >
          Click to open the comic book
        </motion.p>
        <motion.span
          animate={{ 
            rotate: [0, -5, 0, 5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <ArrowRight size={16} className="text-black/70 transform rotate-180" />
        </motion.span>
      </motion.div>
    </motion.div>

    <style>
      {`.perspective-1000 {
        perspective: 1000px;
      }`}
    </style>
    </div>;
};
export default Landing;
