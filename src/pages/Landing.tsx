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
  return <div className="min-h-screen w-full bg-comic-background" ref={containerRef}>
      {/* Hero Section */}
      <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${showElements.hero ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
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
          {/* Main title with layered 3D effect */}
          <div className="relative">
            <motion.h1 className="font-bangers text-6xl md:text-8xl mb-6 leading-tight relative z-10 text-black" style={{
            textShadow: "0 10px 30px rgba(0,0,0,0.2)",
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

            {/* Shadow copies for 3D effect */}
            <motion.div className="absolute top-0 left-0 w-full h-full font-bangers text-6xl md:text-8xl text-black/5 -z-10" style={{
            transform: "translate(5px, 5px)"
          }}>
              <span className="block">HARDIK ARORA</span>
              <span className="block -mt-2">15-YEAR-OLD</span>
              <span className="block -mt-2">FULL STACK DEVELOPER</span>
            </motion.div>
            
            <motion.div className="absolute top-0 left-0 w-full h-full font-bangers text-6xl md:text-8xl text-black/5 -z-20" style={{
            transform: "translate(10px, 10px)"
          }}>
              <span className="block">HARDIK ARORA</span>
              <span className="block -mt-2">15-YEAR-OLD</span>
              <span className="block -mt-2">FULL STACK DEVELOPER</span>
            </motion.div>
          </div>
          
          <motion.div className="mt-8 max-w-2xl mx-auto" initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 1.4,
          duration: 0.8
        }}>
            <SpeechBubble type="shout" position="bottom" color="yellow" animated>
              <p className="font-comic text-xl text-black">From Delhi, India. Building awesome web applications with JavaScript, Python, React, Express, Node.js, AI/ML, and Blockchain!</p>
            </SpeechBubble>
          </motion.div>
          
          <motion.div className="mt-6 flex justify-center" initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 1.8,
          duration: 0.8
        }}>
            <a href="https://github.com/HardikCoder45" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 font-comic text-black bg-white rounded-full px-4 py-2 border-2 border-black hover:bg-gray-100 transition-colors shadow-md">
              <Github size={18} />
              <span>github.com/HardikCoder45</span>
              <ExternalLink size={14} />
            </a>
          </motion.div>
          
          <motion.div className="mt-10" initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 2,
          duration: 0.8
        }}>
            <Link to="/home" className="comic-button inline-flex items-center text-xl px-8 py-4 group relative overflow-hidden">
              <span className="relative z-10">Enter My Universe</span>
              <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-comic-pink to-comic-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </motion.div>
        </div>
        
        <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <div className="border-2 border-black rounded-full p-2 bg-white/80">
            <ArrowRight className="rotate-90" />
          </div>
        </motion.div>
      </div>

      {/* Skills Matrix Section */}
      <div className={`py-16 px-4 transition-all duration-1000 ${showElements.skills ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="font-bangers text-4xl md:text-6xl text-comic-green text-center mb-12" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            MY SUPERPOWERS
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <div className="bg-comic-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Code className="text-comic-blue" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-blue">JavaScript</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-blue h-2 rounded-full" style={{
                width: '95%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">ES6+, TypeScript, Async</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              <div className="bg-comic-pink/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Database className="text-comic-pink" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-pink">Python</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-pink h-2 rounded-full" style={{
                width: '90%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">FastAPI, Django, Data Science</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <div className="bg-comic-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Zap className="text-comic-green" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-green">React</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-green h-2 rounded-full" style={{
                width: '92%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Hooks, Context, Redux</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
              <div className="bg-comic-orange/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Brain className="text-comic-orange" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-orange">Node.js</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-orange h-2 rounded-full" style={{
                width: '88%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Express, RESTful APIs</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <div className="bg-comic-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <PanelLeft className="text-comic-purple" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-purple">AI/ML</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-purple h-2 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">TensorFlow, PyTorch</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.5
          }}>
              <div className="bg-comic-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Rocket className="text-comic-blue" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-blue">Blockchain</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-blue h-2 rounded-full" style={{
                width: '80%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Ethereum, Smart Contracts</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.6
          }}>
              <div className="bg-comic-pink/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <PanelRight className="text-comic-pink" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-pink">UI/UX</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-pink h-2 rounded-full" style={{
                width: '88%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Tailwind, CSS, Figma</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.7
          }}>
              <div className="bg-comic-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Database className="text-comic-green" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-green">Databases</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-green h-2 rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">MongoDB, SQL, Firebase</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.8
          }}>
              <div className="bg-comic-orange/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <Coffee className="text-comic-orange" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-orange">DevOps</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-orange h-2 rounded-full" style={{
                width: '80%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Docker, Git, CI/CD</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl border-4 border-comic-border p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5,
            scale: 1.03
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.9
          }}>
              <div className="bg-comic-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <MessageSquare className="text-comic-purple" />
              </div>
              <h3 className="font-bangers text-lg mb-1 text-comic-purple">Problem Solving</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-comic-purple h-2 rounded-full" style={{
                width: '95%'
              }}></div>
              </div>
              <p className="font-comic text-xs text-black text-center">Algorithms, Optimizations</p>
            </motion.div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/skills" className="comic-button-secondary inline-flex items-center justify-center">
              <Zap className="mr-2" size={18} />
              <span>Explore All Skills</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 px-4 transition-all duration-1000 ${showElements.features ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <motion.div className="max-w-6xl mx-auto" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.8
      }}>
          <motion.h2 className="font-bangers text-4xl md:text-6xl text-comic-purple text-center mb-12" style={{
          textShadow: "0 5px 15px rgba(139, 92, 246, 0.4)"
        }} initial={{
          scale: 0.9,
          opacity: 0
        }} whileInView={{
          scale: 1,
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            MY INNOVATIVE CREATIONS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Comic3DPanel title="Interactive 3D Panels" headerColor="blue" backgroundImage={backgroundImages[1]} className="hover:scale-105 transition-transform duration-300" spotlightEffect={true}>
              <p className="font-comic mb-4 text-white">Dynamic 3D panels with spotlight tracking and parallax effects for immersive display of project details.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Code className="text-comic-blue h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-pink text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel title="Comic Book Page Flip" headerColor="pink" backgroundImage={backgroundImages[0]} className="hover:scale-105 transition-transform duration-300" spotlightEffect={true}>
              <p className="font-comic mb-4 text-white">Realistic page-turning animations with shadow effects for an authentic comic book reading experience.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <BookOpen className="text-comic-pink h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel title="AI-Powered Chatbot" headerColor="green" backgroundImage={backgroundImages[2]} className="hover:scale-105 transition-transform duration-300" spotlightEffect={true}>
              <p className="font-comic mb-4 text-white">Custom-built AI assistant using the Groq API with Llama 4 Model for helping visitors navigate the portfolio.</p>
              <div className="mt-4 flex justify-center">
                <div className="relative">
                  <Brain className="text-comic-green h-10 w-10 animate-pulse" />
                  <div className="absolute -top-1 -right-1 bg-comic-orange text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">+1</div>
                </div>
              </div>
            </Comic3DPanel>
          </div>

          {/* Additional Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              <div className="bg-comic-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Rocket className="text-comic-blue" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-blue">Character Creator</h3>
              <p className="font-comic text-sm text-black">Create custom comics avatars with various poses, expressions and props.</p>
            </motion.div>

            <motion.div className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <div className="bg-comic-pink/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <PanelLeft className="text-comic-pink" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-pink">Interactive Timeline</h3>
              <p className="font-comic text-sm text-black">Visualize the coding journey with animated milestones and achievements.</p>
            </motion.div>

            <motion.div className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
              <div className="bg-comic-green/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award className="text-comic-green" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-green">Micro-animations</h3>
              <p className="font-comic text-sm text-black">Subtle movement and interaction effects throughout to enhance user experience.</p>
            </motion.div>

            <motion.div className="bg-white rounded-lg p-5 border-2 border-comic-border shadow-lg hover:shadow-xl transition-shadow" whileHover={{
            y: -5
          }} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <div className="bg-comic-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Coffee className="text-comic-orange" />
              </div>
              <h3 className="font-bangers text-xl mb-2 text-comic-orange">Performance Optimization</h3>
              <p className="font-comic text-sm text-black">Lazy loading, code splitting, and optimized assets for lightning-fast experience.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Preview */}
      <div className={`py-16 px-4 bg-gradient-to-b from-white to-comic-background transition-all duration-1000 ${showElements.portfolio ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <motion.div className="max-w-6xl mx-auto" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <motion.h2 className="font-bangers text-4xl md:text-6xl text-comic-orange text-center mb-12" initial={{
          scale: 0.9
        }} whileInView={{
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            FEATURED PROJECTS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Comic3DPanel title="AI Chat Application" headerColor="blue" backgroundImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" spotlightEffect={true} className="h-full">
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-yellow text-black font-bangers px-2 py-1 rounded-lg rotate-6 z-10">NEW!</div>
                <p className="font-comic mb-4 text-white">A conversational AI interface with natural language processing capabilities.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="Python" color="green" />
                  <SkillBadge name="TensorFlow" color="orange" />
                  <SkillBadge name="Flask" color="blue" />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <Users className="text-comic-blue mr-2" size={16} />
                    <span className="font-comic text-sm text-white">12,500+ Active Users</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-comic-yellow mr-2" size={16} />
                    <span className="font-comic text-sm text-white">Featured Product of the Month</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
            
            <Comic3DPanel title="Blockchain Explorer" headerColor="green" backgroundImage="https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800" spotlightEffect={true} className="h-full">
              <div className="relative h-full">
                <div className="absolute top-2 right-2 bg-comic-green text-white font-bangers px-2 py-1 rounded-lg rotate-6 z-10">HOT!</div>
                <p className="font-comic mb-4 text-white">Interactive blockchain data visualizer with real-time transaction tracking.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillBadge name="React" color="blue" />
                  <SkillBadge name="Web3.js" color="orange" />
                  <SkillBadge name="D3.js" color="purple" />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <MessageSquare className="text-comic-green mr-2" size={16} />
                    <span className="font-comic text-sm text-white">500,000+ Transactions Processed</span>
                  </div>
                  <div className="flex items-center">
                    <Database className="text-comic-blue mr-2" size={16} />
                    <span className="font-comic text-sm text-white">99.9% Uptime</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/projects" className="comic-button-secondary text-sm">View Details</Link>
                </div>
              </div>
            </Comic3DPanel>
          </div>
          
          <div className="mt-8 text-center">
            <SpeechBubble type="thought" color="purple" animated>
              <p className="font-comic text-black">Many more exciting projects waiting for you to discover!</p>
            </SpeechBubble>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/projects" className="comic-button inline-flex items-center justify-center">
              <span>See All Projects</span>
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className={`py-16 px-4 transition-all duration-1000 ${showElements.cta ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto comic-panel relative overflow-hidden">
          <div className="absolute -top-10 -left-10 text-9xl font-bangers text-comic-yellow opacity-10">!</div>
          <div className="absolute -bottom-10 -right-10 text-9xl font-bangers text-comic-pink opacity-10">?</div>
          
          <h2 className="font-bangers text-4xl text-comic-blue mb-6">READY TO START YOUR JOURNEY?</h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <SpeechBubble color="green">
                <p className="font-comic text-black">Jump into my Comic Code Verse and explore an interactive portfolio experience unlike any other!</p>
              </SpeechBubble>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              <Link to="/home" className="comic-button flex items-center justify-center group">
                <motion.div className="mr-2" animate={{
                rotate: [0, 20, 0, -20, 0]
              }} transition={{
                repeat: Infinity,
                duration: 1.5
              }}>
                  <Star />
                </motion.div>
                <span>Enter Portfolio</span>
              </Link>
              
              <Link to="/contact" className="comic-button-secondary flex items-center justify-center group">
                <span>Get In Touch</span>
                <motion.div className="ml-2 opacity-0 group-hover:opacity-100" animate={{
                x: [0, 5, 0]
              }} transition={{
                repeat: Infinity,
                duration: 1
              }}>
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-comic text-sm text-gray-600">Created by Hardik Arora with 💖 using React, Tailwind CSS, and a whole lot of imagination!</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Landing;