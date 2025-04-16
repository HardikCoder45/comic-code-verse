import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import Comic3DPanel from '../components/Comic3DPanel';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Code, Github, Zap, Star, Users, BookOpen, Award, 
  Rocket, Coffee, Brain, Database, PanelLeft, PanelRight, 
  MessageSquare, Heart, ExternalLink, Sparkles, Trees
} from 'lucide-react';
import SkillBadge from '../components/SkillBadge';

// Forest parallax background images
const forestBackgrounds = {
  far: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?cs=srgb&dl=pexels-nejc-kosir-108379-338936.jpg&fm=jpg',
  mid: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?cs=srgb&dl=pexels-nejc-kosir-108379-338936.jpg&fm=jpg',
  near: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?cs=srgb&dl=pexels-nejc-kosir-108379-338936.jpg&fm=jpg',
  fog: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg?cs=srgb&dl=pexels-nejc-kosir-108379-338936.jpg&fm=jpg'
};

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
  const [isSparkleActive, setIsSparkleActive] = useState(false);
  const [forestLoaded, setForestLoaded] = useState(false);
  
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
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const forestOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  
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
        
        setMousePosition({ x: relativeX * 15, y: relativeY * 15 });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Preload forest background images
  useEffect(() => {
    // Force forestLoaded to true immediately to ensure image is visible
    setForestLoaded(true);
    
    const imagesToLoad = [
      forestBackgrounds.far,
      forestBackgrounds.mid,
      forestBackgrounds.near,
      forestBackgrounds.fog
    ];
    
    imagesToLoad.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Activate sparkle effect periodically
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setIsSparkleActive(true);
      setTimeout(() => setIsSparkleActive(false), 2000);
    }, 5000);
    
    return () => clearInterval(sparkleInterval);
  }, []);
  
  // Staged animation entries with sequential timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, hero: true })), 200),
      setTimeout(() => setShowElements(prev => ({ ...prev, features: true })), 600),
      setTimeout(() => setShowElements(prev => ({ ...prev, portfolio: true })), 1000),
      setTimeout(() => setShowElements(prev => ({ ...prev, skills: true })), 1400),
      setTimeout(() => setShowElements(prev => ({ ...prev, journey: true })), 1800),
      setTimeout(() => setShowElements(prev => ({ ...prev, cta: true })), 2200)
    ];

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
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.3 + 0.1,
          type: Math.random() > 0.8 ? 'leaf' : 'particle',
          rotation: Math.random() * 360
        });
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    const moveParticles = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100,
        rotation: particle.type === 'leaf' ? (particle.rotation + 1) % 360 : particle.rotation
      })));
    }, 50);
    
    return () => clearInterval(moveParticles);
  }, []);
  
  // Firefly effect for forest scene
  const [fireflies, setFireflies] = useState([]);
  
  useEffect(() => {
    const createFireflies = () => {
      const newFireflies = [];
      
      for (let i = 0; i < 15; i++) {
        newFireflies.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5
        });
      }
      
      setFireflies(newFireflies);
    };
    
    createFireflies();
  }, []);
  
  return <div className="min-h-screen w-full bg-amber-50 perspective-1000" ref={containerRef}>
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
      {/* Move forest background inside the book */}
      {forestLoaded && (
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Single forest background for simplicity */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${forestBackgrounds.far})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Optional overlay to make text more readable */}
          <motion.div 
            className="absolute inset-0 bg-black/30"
            style={{ mixBlendMode: 'multiply' }}
          />
          
          {/* Keep fireflies for the effect */}
          {fireflies.map(firefly => (
            <motion.div
              key={firefly.id}
              className="absolute rounded-full bg-yellow-300"
              style={{
                left: `${firefly.x}%`,
                top: `${firefly.y}%`,
                width: `${firefly.size}px`,
                height: `${firefly.size}px`,
                boxShadow: `0 0 ${firefly.size * 3}px ${firefly.size}px rgba(250, 250, 210, 0.7)`,
                zIndex: 5
              }}
              animate={{ 
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: firefly.duration,
                repeat: Infinity,
                delay: firefly.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
      
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
      
      {/* Book spine with enhanced 3D effect */}
      <motion.div 
        className="absolute left-0 inset-y-0 w-14 bg-comic-blue rounded-l-md shadow-inner z-10 flex items-center justify-center"
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
        
        {/* Decorative design on the spine */}
        <motion.div
          className="absolute top-5 left-1/2 transform -translate-x-1/2 rotate-90"
          animate={{ 
            rotate: [90, 85, 95, 90],
            y: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={15} className="text-yellow-300" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 rotate-90"
          animate={{ 
            rotate: [90, 95, 85, 90],
            y: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Sparkles size={15} className="text-yellow-300" />
        </motion.div>
      </motion.div>
      
      {/* Book cover */}
      <div className="absolute inset-0 ml-14 border-8 border-comic-blue bg-comic-background rounded-r-md overflow-hidden z-5">
        {/* Hero Section */}
        <div className={`relative h-full flex items-center justify-center overflow-hidden transition-all duration-700 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {/* Enhanced forest-themed background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Forest-themed gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-green-800/10 to-amber-800/20" 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                
              }}
              style={{
           
              opacity: 0.7
            }}
              
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              
            />
            
            {/* Animated tree silhouettes */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-full bg-contain"
              style={{ 
                backgroundImage: `url(${forestBackgrounds.far})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.7
              }}
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
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
            <motion.div 
              className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black relative overflow-hidden"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
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
            </motion.div>
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
                className="font-comic font-bold text-white hover:text-comic-blue transition-colors relative overflow-hidden group"
              >
                <motion.span
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {item}
                </motion.span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  whileHover={{ 
                    scaleX: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </Link>
            ))}
          </motion.div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 z-10">
          <div className="relative">
              <motion.h1 
                className="font-bangers text-6xl md:text-8xl mb-6 leading-tight relative z-10 text-black" 
                style={{
                  textShadow: "0 4px 15px rgba(0,0,0,0.15), 0 0 30px rgba(22, 101, 52, 0.2)",
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
                    textShadow: "0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)" 
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
                    textShadow: "0 0 15px rgba(236, 72, 153, 0.5), 0 0 30px rgba(236, 72, 153, 0.3)" 
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
                    textShadow: "0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)" 
                  }}
                >
                  FULL STACK DEVELOPER
                </motion.span>
                
                {/* Decorative forest-themed elements */}
                <motion.div
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-green-900/20 text-6xl"
                  animate={{ 
                    y: [0, -5, 0],
                    rotateY: [0, 180, 0]
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Trees size={80} />
                </motion.div>
              </motion.h1>
            </div>
            
            {/* Enhanced CTA button with forest-themed effects */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Link to="/home">
                <motion.button 
                  className="bg-comic-green text-white font-bangers text-2xl px-10 py-5 rounded-full shadow-lg border-2 border-black relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 20px 5px rgba(16, 185, 129, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Gleaming effect */}
                  <motion.span 
                    className="absolute top-0 left-0 w-full h-full bg-white"
                    initial={{ x: "-100%", opacity: 0.3 }}
                    animate={{ x: "100%", opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ mixBlendMode: "overlay" }}
                  />
                  
                  {/* Leaf particles on hover */}
                  <AnimatePresence>
                    {isHovering && (
                      <>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={`leaf-${i}`}
                            className="absolute text-green-300 opacity-70"
                            initial={{ 
                              x: 0, 
                              y: 0, 
                              scale: 0,
                              rotate: Math.random() * 360
                            }}
                            animate={{ 
                              x: (Math.random() - 0.5) * 100,
                              y: (Math.random() - 0.5) * 100,
                              scale: Math.random() * 0.5 + 0.5,
                              rotate: [
                                Math.random() * 360,
                                Math.random() * 360 + 180,
                                Math.random() * 360 + 360
                              ]
                            }}
                            exit={{ 
                              opacity: 0,
                              scale: 0,
                              transition: { duration: 0.2 }
                            }}
                            transition={{ 
                              duration: 1 + Math.random(),
                              ease: "easeOut"
                            }}
                          >
                            <Trees size={12} />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                  
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
                
                {/* Button ambient effect - glowing aura */}
                <motion.div
                  className="absolute -inset-5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced book edge with 3D effect */}
      <motion.div 
        className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-gray-200 to-transparent z-0"
        animate={{ 
          width: isHovering ? "8px" : "4px",
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
          width: isHovering ? "24px" : "16px", 
          height: isHovering ? "24px" : "16px",
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Magic sparkle effect */}
      <AnimatePresence>
        {(isSparkleActive || isHovering) && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-yellow-300"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%'
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={Math.random() * 16 + 4} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Book opening hint with enhanced micro-animation */}
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div 
        className="flex items-center justify-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
      >
        <motion.span
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-comic-green"
        >
          <ArrowRight size={18} />
        </motion.span>
        <motion.p 
          className="font-comic text-black/70 text-sm font-bold"
        >
          Click to open the comic book
        </motion.p>
        <motion.span
          animate={{ 
            rotate: [0, -5, 0, 5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="text-comic-green"
        >
          <ArrowRight size={18} className="transform rotate-180" />
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
