
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import Comic3DPanel from '../components/Comic3DPanel';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Github, Zap, Star, Users, BookOpen, Award, Rocket, Coffee, Brain, Database, PanelLeft, PanelRight, MessageSquare, Heart, Trophy } from 'lucide-react';
import SkillBadge from '../components/SkillBadge';
import { projects } from '../data/projects';

const Landing = () => {
  const [showElements, setShowElements] = useState({
    hero: false,
    features: false,
    portfolio: false,
    testimonials: false,
    cta: false,
    skills: false,
    journey: false
  });

  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [parallaxImages, setParallaxImages] = useState<{src: string, depth: number}[]>([
    {src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80', depth: 0.2},
    {src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80', depth: 0.4},
    {src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80', depth: 0.6},
    {src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80', depth: 0.3},
  ]);

  // References for scroll-based animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  useEffect(() => {
    // Staged animation entries with sequential timing
    const timers = [
      setTimeout(() => setShowElements(prev => ({ ...prev, hero: true })), 300),
      setTimeout(() => setShowElements(prev => ({ ...prev, features: true })), 800),
      setTimeout(() => setShowElements(prev => ({ ...prev, portfolio: true })), 1300),
      setTimeout(() => setShowElements(prev => ({ ...prev, testimonials: true })), 1800),
      setTimeout(() => setShowElements(prev => ({ ...prev, skills: true })), 2300),
      setTimeout(() => setShowElements(prev => ({ ...prev, journey: true })), 2800),
      setTimeout(() => setShowElements(prev => ({ ...prev, cta: true })), 3300),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Interactive panel handler
  const handlePanelHover = (id: number) => {
    setActivePanel(id);
  };

  return (
    <div className="min-h-screen w-full bg-comic-background pb-20" ref={containerRef}>
      {/* Floating code elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-comic-blue/5 font-mono text-4xl md:text-6xl"
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%",
              rotate: Math.random() * 30 - 15
            }}
            animate={{ 
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              rotate: [
                Math.random() * 30 - 15,
                Math.random() * 30 - 15
              ]
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {["</>", "{}", "[]", "==>", "&&", "||", "//", "**", "??", "$$"][i % 10]}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        {/* Parallax background images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {parallaxImages.map((img, index) => (
            <motion.div 
              key={index}
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ 
                backgroundImage: `url(${img.src})`,
                y: useTransform(scrollYProgress, [0, 1], [0, -100 * img.depth]),
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-comic-blue/10 to-comic-pink/5 mix-blend-overlay"></div>
        </div>
        
        {/* Animated header */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-20">
          <motion.div 
            className="flex items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="w-12 h-12 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-comic-blue via-comic-pink to-comic-blue"
                animate={{ 
                  background: [
                    "linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)",
                    "linear-gradient(225deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%)"
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="font-bangers text-white text-xl relative z-10">CC</span>
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
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span>COMIC</span>
              <span>CODE</span>
              <span>VERSE</span>
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/about" className="font-comic font-bold hover:text-comic-blue transition-colors relative overflow-hidden group">
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/projects" className="font-comic font-bold hover:text-comic-pink transition-colors relative overflow-hidden group">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/skills" className="font-comic font-bold hover:text-comic-orange transition-colors relative overflow-hidden group">
              Skills
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link to="/contact" className="font-comic font-bold hover:text-comic-green transition-colors relative overflow-hidden group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-comic-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </motion.div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 z-10">
          {/* Main title with layered 3D effect */}
          <div className="relative">
            <motion.h1 
              className="font-bangers text-6xl md:text-8xl mb-6 leading-tight relative z-10 text-black"
              style={{ 
                textShadow: "0 10px 30px rgba(0,0,0,0.2)",
                WebkitTextStroke: "2px rgba(0,0,0,0.1)" 
              }}
            >
              <motion.span 
                className="text-comic-blue block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                TURN YOUR CODE
              </motion.span>
              <motion.span 
                className="text-comic-pink block -mt-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                INTO AN EPIC
              </motion.span>
              <motion.span 
                className="text-comic-orange block -mt-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                ADVENTURE!
              </motion.span>
            </motion.h1>

            {/* Shadow copies for 3D effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full font-bangers text-6xl md:text-8xl text-black/5 -z-10"
              style={{ transform: "translate(5px, 5px)" }}
            >
              <span className="block">TURN YOUR CODE</span>
              <span className="block -mt-2">INTO AN EPIC</span>
              <span className="block -mt-2">ADVENTURE!</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-0 left-0 w-full h-full font-bangers text-6xl md:text-8xl text-black/5 -z-20"
              style={{ transform: "translate(10px, 10px)" }}
            >
              <span className="block">TURN YOUR CODE</span>
              <span className="block -mt-2">INTO AN EPIC</span>
              <span className="block -mt-2">ADVENTURE!</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 max-w-2xl mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <SpeechBubble type="shout" position="bottom" color="yellow" animated>
              <p className="font-comic text-xl text-black">Welcome to the Comic Code Verse - where coding meets storytelling and every project is a panel in your developer journey!</p>
            </SpeechBubble>
          </motion.div>
          
          <motion.div 
            className="mt-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <Link to="/projects" className="comic-button inline-flex items-center text-xl px-8 py-4 group relative overflow-hidden">
              <span className="relative z-10">Enter the Universe</span>
              <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-comic-pink to-comic-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="border-2 border-black rounded-full p-2 bg-white/80">
            <ArrowRight className="rotate-90" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className={`py-20 px-4 transition-all duration-1000 ${showElements.features ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-bangers text-4xl md:text-6xl text-comic-purple text-center mb-16"
            style={{ textShadow: "0 5px 15px rgba(139, 92, 246, 0.4)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            SUPERPOWERS UNLOCKED!
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Comic3DPanel 
              title="Interactive Code Panels" 
              headerColor="blue"
              backgroundImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"
              className="hover:scale-105 transition-transform duration-300"
              spotlightEffect={true}
            >
              <p className="font-comic mb-6 text-black">Flip through projects like comic book pages with interactive animations and transitions.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Code className="text-comic-blue h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-pink text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel 
              title="Skill Showcases" 
              headerColor="pink"
              backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              className="hover:scale-105 transition-transform duration-300"
              spotlightEffect={true}
            >
              <p className="font-comic mb-6 text-black">Display your programming skills with animated badges that bounce and float around your profile.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Zap className="text-comic-pink h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel 
              title="Live Code Demos" 
              headerColor="green"
              backgroundImage="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80"
              className="hover:scale-105 transition-transform duration-300"
              spotlightEffect={true}
            >
              <p className="font-comic mb-6 text-black">Run and test code snippets directly in the browser with embedded demos and playgrounds.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Github className="text-comic-green h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-orange text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
          </div>

          {/* Additional Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-comic-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Rocket className="text-comic-blue" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-blue">Fast Performance</h3>
              <p className="font-comic text-sm text-black">Optimized code and assets for lightning-fast loading and smooth animations</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-comic-pink/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <PanelLeft className="text-comic-pink" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-pink">Comic Layouts</h3>
              <p className="font-comic text-sm text-black">Unique comic-book style layouts that make your portfolio stand out</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-comic-green/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Brain className="text-comic-green" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-green">AI Assistant</h3>
              <p className="font-comic text-sm text-black">Smart chatbot that helps visitors navigate your portfolio</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-comic-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Coffee className="text-comic-orange" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-orange">Dark Mode</h3>
              <p className="font-comic text-sm text-black">Toggle between light and dark comic themes for comfortable viewing</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* My Journey Section */}
      <div className={`py-20 px-4 transition-all duration-1000 ${showElements.journey ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-bangers text-4xl md:text-6xl text-comic-blue text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            MY CODING JOURNEY
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-comic-border"></div>

            {/* Timeline nodes */}
            <div className="space-y-24 relative">
              {/* Year 1 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2 md:pr-12 text-right">
                  <div className="bg-white p-6 rounded-xl border-2 border-comic-border shadow-lg">
                    <h3 className="font-bangers text-2xl text-comic-blue mb-2">Origin Story</h3>
                    <p className="font-comic text-black">It all began with HTML and CSS. Building simple websites and discovering the joy of creating things from scratch.</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                      <SkillBadge name="HTML" color="orange" size="sm" />
                      <SkillBadge name="CSS" color="blue" size="sm" />
                    </div>
                  </div>
                </div>
                <div className="md:w-0 py-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-comic-blue border-4 border-white shadow-xl flex items-center justify-center text-white font-bangers">
                    1
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80" 
                    alt="Coding beginning" 
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Year 2 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2 md:pr-12 flex justify-end items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80" 
                    alt="Learning JavaScript" 
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
                <div className="md:w-0 py-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-comic-pink border-4 border-white shadow-xl flex items-center justify-center text-white font-bangers">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl border-2 border-comic-border shadow-lg">
                    <h3 className="font-bangers text-2xl text-comic-pink mb-2">Power-Up: JavaScript</h3>
                    <p className="font-comic text-black">Learning JavaScript transformed static pages into interactive applications. The adventure was getting exciting!</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <SkillBadge name="JavaScript" color="yellow" size="sm" />
                      <SkillBadge name="DOM" color="green" size="sm" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Year 3 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2 md:pr-12 text-right">
                  <div className="bg-white p-6 rounded-xl border-2 border-comic-border shadow-lg">
                    <h3 className="font-bangers text-2xl text-comic-green mb-2">Framework Frenzy</h3>
                    <p className="font-comic text-black">Diving into React and discovering the power of component-based architecture. Building faster and more efficiently!</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                      <SkillBadge name="React" color="blue" size="sm" />
                      <SkillBadge name="Redux" color="purple" size="sm" />
                    </div>
                  </div>
                </div>
                <div className="md:w-0 py-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-comic-green border-4 border-white shadow-xl flex items-center justify-center text-white font-bangers">
                    3
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80" 
                    alt="React development" 
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Year 4 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2 md:pr-12 flex justify-end items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&q=80" 
                    alt="Backend development" 
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
                <div className="md:w-0 py-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-comic-orange border-4 border-white shadow-xl flex items-center justify-center text-white font-bangers">
                    4
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl border-2 border-comic-border shadow-lg">
                    <h3 className="font-bangers text-2xl text-comic-orange mb-2">Backend Breakthrough</h3>
                    <p className="font-comic text-black">Mastering Node.js and databases. Now I could build full-stack applications from scratch!</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <SkillBadge name="Node.js" color="green" size="sm" />
                      <SkillBadge name="MongoDB" color="green" size="sm" />
                      <SkillBadge name="Express" color="blue" size="sm" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Year 5 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="md:w-1/2 md:pr-12 text-right">
                  <div className="bg-white p-6 rounded-xl border-2 border-comic-border shadow-lg">
                    <h3 className="font-bangers text-2xl text-comic-purple mb-2">The Present: AI & Beyond</h3>
                    <p className="font-comic text-black">Exploring AI, machine learning, and creating innovative applications that push the boundaries of what's possible!</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                      <SkillBadge name="Python" color="blue" size="sm" />
                      <SkillBadge name="TensorFlow" color="orange" size="sm" />
                      <SkillBadge name="Next.js" color="purple" size="sm" />
                    </div>
                  </div>
                </div>
                <div className="md:w-0 py-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-comic-purple border-4 border-white shadow-xl flex items-center justify-center text-white font-bangers">
                    NOW
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80" 
                    alt="AI development" 
                    className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className={`py-20 px-4 bg-gradient-to-b from-white to-comic-background transition-all duration-1000 ${showElements.portfolio ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="font-bangers text-4xl md:text-6xl text-comic-orange text-center mb-16"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FEATURED PROJECTS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <Comic3DPanel 
              title="Interactive Dashboard" 
              headerColor="blue"
              backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
              spotlightEffect={true}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-yellow text-black font-bangers px-2 py-1 rounded-lg rotate-6 z-10">HOT!</div>
                <p className="font-comic mb-4 text-black">A dynamic dashboard with real-time data visualization using React and D3.js</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="React" color="blue" />
                  <SkillBadge name="D3.js" color="orange" />
                  <SkillBadge name="TypeScript" color="blue" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Users className="text-comic-blue mr-2" size={16} />
                    <span className="font-comic text-sm text-black">12,500+ Active Users</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-comic-yellow mr-2" size={16} />
                    <span className="font-comic text-sm text-black">Featured Product of the Month</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-comic-purple mr-2" size={16} />
                    <span className="font-comic text-sm text-black">Best Design Award 2023</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel 
              title="AI Chat Application" 
              headerColor="green"
              backgroundImage="https://images.unsplash.com/photo-1596638787647-904d822d751e?auto=format&fit=crop&q=80"
              spotlightEffect={true}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-green text-white font-bangers px-2 py-1 rounded-lg rotate-6 z-10">NEW!</div>
                <p className="font-comic mb-4 text-black">A conversational AI interface with natural language processing capabilities</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="Python" color="green" />
                  <SkillBadge name="TensorFlow" color="orange" />
                  <SkillBadge name="Flask" color="blue" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <MessageSquare className="text-comic-green mr-2" size={16} />
                    <span className="font-comic text-sm text-black">500,000+ Messages Processed</span>
                  </div>
                  <div className="flex items-center">
                    <Database className="text-comic-blue mr-2" size={16} />
                    <span className="font-comic text-sm text-black">99.9% Uptime</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="text-comic-pink mr-2" size={16} />
                    <span className="font-comic text-sm text-black">96% User Satisfaction</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel 
              title="E-commerce Platform" 
              headerColor="pink"
              backgroundImage="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80"
              spotlightEffect={true}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-pink text-white font-bangers px-2 py-1 rounded-lg rotate-6 z-10">POPULAR!</div>
                <p className="font-comic mb-4 text-black">A full-featured online store with payment processing and inventory management</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="Next.js" color="purple" />
                  <SkillBadge name="Stripe" color="purple" />
                  <SkillBadge name="PostgreSQL" color="blue" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="text-comic-purple mr-2" size={16} />
                    <span className="font-comic text-sm text-black">Case Study Published</span>
                  </div>
                  <div className="flex items-center">
                    <Rocket className="text-comic-orange mr-2" size={16} />
                    <span className="font-comic text-sm text-black">200% Growth in 6 Months</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-comic-yellow mr-2" size={16} />
                    <span className="font-comic text-sm text-black">4.9/5 Client Rating</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel 
              title="Mobile Fitness App" 
              headerColor="orange"
              backgroundImage="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80"
              spotlightEffect={true}
              className="h-full"
            >
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-orange text-white font-bangers px-2 py-1 rounded-lg rotate-6 z-10">FEATURED!</div>
                <p className="font-comic mb-4 text-black">A cross-platform mobile app for fitness tracking with social features</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="React Native" color="blue" />
                  <SkillBadge name="Firebase" color="orange" />
                  <SkillBadge name="Redux" color="purple" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <Users className="text-comic-green mr-2" size={16} />
                    <span className="font-comic text-sm text-black">50,000+ Downloads</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-comic-yellow mr-2" size={16} />
                    <span className="font-comic text-sm text-black">4.8 App Store Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="text-comic-orange mr-2" size={16} />
                    <span className="font-comic text-sm text-black">Featured in App Store</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
          </div>
          
          <div className="mt-12 text-center">
            <SpeechBubble type="thought" color="purple" animated>
              <p className="font-comic text-black">And many more exciting projects waiting for you to discover!</p>
            </SpeechBubble>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/projects" className="comic-button inline-flex items-center justify-center">
              <span>See All Projects</span>
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Skills Matrix Section */}
      <div className={`py-20 px-4 transition-all duration-1000 ${showElements.skills ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-bangers text-4xl md:text-6xl text-comic-green text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            SUPERHERO SKILL MATRIX
          </motion.h2>

          <div className="bg-white rounded-xl border-4 border-comic-border p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="col-span-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-bangers text-2xl text-comic-blue mb-4">Frontend Mastery</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">React & Next.js</span>
                      <span className="font-comic text-sm text-black">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-blue h-2.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">HTML5 & CSS3</span>
                      <span className="font-comic text-sm text-black">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-orange h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">JavaScript/TypeScript</span>
                      <span className="font-comic text-sm text-black">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-yellow h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">State Management</span>
                      <span className="font-comic text-sm text-black">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-purple h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Responsive Design</span>
                      <span className="font-comic text-sm text-black">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-pink h-2.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-span-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="font-bangers text-2xl text-comic-green mb-4">Backend Powers</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Node.js</span>
                      <span className="font-comic text-sm text-black">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-green h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Python</span>
                      <span className="font-comic text-sm text-black">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-blue h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">API Development</span>
                      <span className="font-comic text-sm text-black">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-orange h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Databases</span>
                      <span className="font-comic text-sm text-black">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-yellow h-2.5 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Authentication</span>
                      <span className="font-comic text-sm text-black">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-purple h-2.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="col-span-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="font-bangers text-2xl text-comic-pink mb-4">Special Abilities</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">UI/UX Design</span>
                      <span className="font-comic text-sm text-black">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-pink h-2.5 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">DevOps/CI/CD</span>
                      <span className="font-comic text-sm text-black">82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-blue h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Machine Learning</span>
                      <span className="font-comic text-sm text-black">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-orange h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Mobile Development</span>
                      <span className="font-comic text-sm text-black">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-green h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-comic font-bold text-black">Project Management</span>
                      <span className="font-comic text-sm text-black">86%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-comic-purple h-2.5 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/skills" className="comic-button-secondary inline-flex items-center justify-center">
                <Zap className="mr-2" size={18} />
                <span>Explore All Skills</span>
              </Link>
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
                <p className="font-comic text-black">Jump into the Comic Code Verse and explore an interactive portfolio experience unlike any other!</p>
              </SpeechBubble>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <Link to="/projects" className="comic-button flex items-center justify-center group">
                <motion.div 
                  className="mr-2"
                  animate={{ rotate: [0, 20, 0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Star />
                </motion.div>
                <span>Enter Portfolio</span>
              </Link>
              
              <Link to="/contact" className="comic-button-secondary flex items-center justify-center group">
                <span>Get In Touch</span>
                <motion.div 
                  className="ml-2 opacity-0 group-hover:opacity-100"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
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
