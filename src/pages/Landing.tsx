import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import Comic3DPanel from '../components/Comic3DPanel';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Github, Zap, Star, Users, BookOpen, Award, Rocket, Coffee, Brain, Database, PanelLeft, PanelRight, MessageSquare, Heart, ExternalLink } from 'lucide-react';
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
  return <div className="min-h-screen w-full bg-amber-50 perspective-1000" ref={containerRef}>
    {/* Book cover effect */}
    <motion.div 
      className="relative w-full max-w-6xl h-[85vh] mx-auto mt-10 shadow-2xl rounded-lg overflow-hidden"
      initial={{ rotateY: 15, scale: 0.95 }}
      animate={{ rotateY: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Book spine */}
      <div className="absolute left-0 inset-y-0 w-12 bg-comic-blue rounded-l-md shadow-inner z-10 flex items-center justify-center">
        <h2 
          className="font-bangers text-2xl text-white transform rotate-90 whitespace-nowrap tracking-wide"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          COMIC CODE VERSE
        </h2>
      </div>
      
      {/* Book cover */}
      <div className="absolute inset-0 ml-12 border-8 border-comic-blue bg-comic-background rounded-r-md overflow-hidden">
      {/* Hero Section */}
        <div className={`relative h-full flex items-center justify-center overflow-hidden transition-all duration-700 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        {/* Parallax background images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center opacity-10" style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          y: y1
        }} />
          <div className="absolute inset-0 bg-gradient-to-b from-comic-blue/10 to-comic-pink/5 mix-blend-overlay"></div>
        </div>
        
        {/* Animated header */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-20">
          <motion.div className="flex items-center" initial={{
          x: -50,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }}>
            <div className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-tr from-comic-blue via-comic-pink to-comic-blue" animate={{
              background: ["linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)", "linear-gradient(225deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)"]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} />
              <span className="font-bangers text-white text-xl relative z-10">HA</span>
            </div>
            <motion.h1 className="ml-4 font-bangers text-2xl" animate={{
            color: ["#3b82f6",
            // blue
            "#ec4899",
            // pink
            "#f97316",
            // orange
            "#3b82f6" // back to blue
            ]
          }} transition={{
            duration: 5,
            repeat: Infinity
          }}>
              <span>COMIC</span>
              <span>CODE</span>
              <span>VERSE</span>
            </motion.h1>
          </motion.div>
          
          <motion.div className="flex space-x-6" initial={{
          y: -20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5,
          duration: 0.6
        }}>
            <Link to="/home" className="font-comic font-bold hover:text-comic-blue transition-colors relative overflow-hidden group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/projects" className="font-comic font-bold hover:text-comic-pink transition-colors relative overflow-hidden group">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/about" className="font-comic font-bold hover:text-comic-orange transition-colors relative overflow-hidden group">
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/skills" className="font-comic font-bold hover:text-comic-green transition-colors relative overflow-hidden group">
              Skills
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/contact" className="font-comic font-bold hover:text-comic-purple transition-colors relative overflow-hidden group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-purple transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </motion.div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 z-10">
          <div className="relative">
              <motion.h1 className="font-bangers text-5xl md:text-7xl mb-6 leading-tight relative z-10 text-black" style={{
                textShadow: "0 4px 15px rgba(0,0,0,0.15)",
            WebkitTextStroke: "2px rgba(0,0,0,0.1)"
          }}>
              <motion.span className="text-comic-blue block" initial={{
              y: 50,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5,
              duration: 0.8
            }}>
                HARDIK ARORA
              </motion.span>
              <motion.span className="text-comic-pink block -mt-2" initial={{
              y: 50,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.8,
              duration: 0.8
            }}>
                15-YEAR-OLD
              </motion.span>
              <motion.span className="text-comic-orange block -mt-2" initial={{
              y: 50,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 1.1,
              duration: 0.8
            }}>
                FULL STACK DEVELOPER
              </motion.span>
            </motion.h1>
            </div>
            
            {/* CTA button to open the book */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Link to="/home">
                <button className="bg-comic-blue text-white font-bangers text-xl px-6 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105 active:scale-95 border-2 border-black">
                  OPEN THE COMIC BOOK
                </button>
            </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Book edge/pages effect */}
      <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-gray-200 to-transparent z-0"></div>
      
      {/* Book corner fold */}
      <div className="absolute bottom-0 right-0 w-16 h-16 z-10" style={{ 
        backgroundImage: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)" 
      }}></div>
            </motion.div>

    {/* Book opening hint */}
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.p 
        className="font-comic text-black/70 text-sm"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click to open the comic book
      </motion.p>
            </motion.div>

    <style jsx>{`
      .perspective-1000 {
        perspective: 1000px;
      }
    `}</style>
    </div>;
};
export default Landing;