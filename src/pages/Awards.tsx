import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Medal, Crown, Star, Badge, Gift, Home, Code, User, Briefcase, Mail, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import PageTurner from '../components/PageTurner';
import AwardsShowcase from '../components/AwardsShowcase';
import { Link, useNavigate } from 'react-router-dom';

const Awards = () => {
  const { playSound } = useSound();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<'personal' | 'professional' | 'featured'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = currentSection === 'professional' ? 3 : currentSection === 'personal' ? 2 : 1;
  
  // New state for improved page turning
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'left' | 'right' | null>(null);
  
  const handleSectionChange = (section: 'personal' | 'professional' | 'featured') => {
    playSound('click');
    setCurrentSection(section);
    setCurrentPage(1); // Reset to first page when changing sections
  };
  
  // Enhanced page turning functionality
  const turnPage = (direction: 'next' | 'prev') => {
    if (isPageTurning) return;
    
    if (direction === 'next' && currentPage < totalPages) {
      setIsPageTurning(true);
      setTurnDirection('left');
      playSound('pageFlip');
      
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setTimeout(() => {
          setIsPageTurning(false);
          setTurnDirection(null);
        }, 300);
      }, 200);
    } else if (direction === 'prev' && currentPage > 1) {
      setIsPageTurning(true);
      setTurnDirection('right');
      playSound('pageFlip');
      
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setTimeout(() => {
          setIsPageTurning(false);
          setTurnDirection(null);
        }, 300);
      }, 200);
    }
  };
  
  // Keyboard navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        turnPage('next');
      } else if (e.key === 'ArrowLeft') {
        turnPage('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, isPageTurning]);
  
  // Navigation items
  const navItems = [
    { name: 'Home', path: '/home', icon: <Home size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Skills', path: '/skills', icon: <Code size={20} /> },
    { name: 'About', path: '/about', icon: <User size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={20} /> }
  ];
  
  return (
    <div className="w-full h-full relative pb-4">
      <div className="mb-6">
        <motion.h1 
          className="text-4xl font-bangers text-center text-comic-blue"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="inline-block mr-2 text-yellow-500" size={32} />
          Portfolio Awards & Achievements
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Showcasing the recognition and milestones achieved throughout my professional journey.
          Each award represents dedication, innovation, and excellence in the field.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-6 space-x-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'featured' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('featured')}
          >
            <Star className="inline-block mr-1" size={16} />
            Featured
          </button>
          
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'professional' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('professional')}
          >
            <Badge className="inline-block mr-1" size={16} />
            Professional
          </button>
          
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'personal' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('personal')}
          >
            <Trophy className="inline-block mr-1" size={16} />
            Personal
          </button>
        </motion.div>
      </div>
      
      <div className="relative h-[calc(100%-8rem)] overflow-hidden">
        {/* Page turning visual effect */}
        <AnimatePresence>
          {isPageTurning && (
            <motion.div 
              className="absolute inset-0 bg-white/10 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-paper shadow-lg rounded-lg"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: turnDirection === 'left' ? -70 : 70 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: turnDirection === 'left' ? 'right center' : 'left center',
                  backgroundImage: 'url(/paper-texture.jpg)',
                  backgroundSize: 'cover'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="w-full h-full"
          key={`${currentSection}-${currentPage}`}
          initial={{ opacity: 0, x: turnDirection === 'left' ? -20 : turnDirection === 'right' ? 20 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: turnDirection === 'left' ? 20 : turnDirection === 'right' ? -20 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentSection === 'featured' && (
            <AwardsShowcase />
          )}
          
          {currentSection === 'professional' && (
            <div className="w-full h-full p-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bangers text-comic-blue">Professional Achievements</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professionalAwards
                    .slice((currentPage - 1) * 4, currentPage * 4)
                    .map((award, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md border border-gray-100 relative overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -5, 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          scale: 1.02
                        }}
                      >
                        {/* Decorative corner ribbon */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                          <div className="absolute top-0 right-0 transform rotate-45 translate-y-[-50%] translate-x-[50%] w-24 h-8 bg-comic-blue opacity-20"></div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 bg-blue-50 p-2 rounded-full">
                            <motion.div
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {award.icon}
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{award.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                            <div className="mt-2 text-xs text-gray-500">{award.date}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          )}
          
          {currentSection === 'personal' && (
            <div className="w-full h-full p-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bangers text-comic-blue">Personal Achievements</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {personalAwards
                    .slice((currentPage - 1) * 4, currentPage * 4)
                    .map((award, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md border border-gray-100 relative overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -5, 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                          scale: 1.02
                        }}
                      >
                        {/* Animated glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-purple-200 opacity-0"
                          whileHover={{ opacity: 0.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="flex items-start">
                          <div className="mr-3 bg-purple-50 p-2 rounded-full">
                            <motion.div
                              whileHover={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {award.icon}
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{award.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                            <div className="mt-2 text-xs text-gray-500">{award.date}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Manual page turning buttons */}
        {totalPages > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-30">
            <motion.button
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage > 1 ? 'bg-comic-blue text-white shadow-md' : 'bg-gray-200 text-gray-400'
              }`}
              whileHover={currentPage > 1 ? { scale: 1.1 } : {}}
              whileTap={currentPage > 1 ? { scale: 0.9 } : {}}
              onClick={() => turnPage('prev')}
              disabled={currentPage <= 1}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage < totalPages ? 'bg-comic-blue text-white shadow-md' : 'bg-gray-200 text-gray-400'
              }`}
              whileHover={currentPage < totalPages ? { scale: 1.1 } : {}}
              whileTap={currentPage < totalPages ? { scale: 0.9 } : {}}
              onClick={() => turnPage('next')}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Page corner fold hint */}
      <div className="absolute bottom-0 right-0 w-12 h-12">
        <motion.div 
          className="absolute bottom-0 right-0 w-0 h-0 
                     border-b-[12px] border-l-[12px] border-b-gray-300/50 border-l-transparent
                     shadow-inner"
          whileHover={{ width: 20, height: 20 }}
          animate={isPageTurning ? { width: 50, height: 50 } : {}}
          style={{ transformOrigin: 'bottom right' }}
        />
      </div>
      
      {/* Book texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10" 
        style={{ 
          backgroundImage: "url(/paper-texture.jpg)",
          backgroundSize: 'cover'
        }}
      />
      
      {/* Paper fibers texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), 
            radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 30px 30px',
          backgroundPosition: '0 0, 10px 10px',
          opacity: 0.5
        }}
      />
      
      {/* Back to home button */}
      <motion.div
        className="absolute top-4 left-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          onClick={() => {
            playSound('click');
            navigate('/home');
          }}
          className="flex items-center gap-2 px-3 py-2 bg-comic-blue text-white rounded-full text-sm shadow-md"
        >
          <Home size={16} /> Back to Home
        </button>
      </motion.div>
      
      {/* Help hint for keyboard navigation */}
      <motion.div
        className="absolute bottom-16 right-4 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs shadow-md z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center gap-1">
          <span>Use</span>
          <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">→</kbd>
          <span>to turn pages</span>
        </div>
      </motion.div>
    </div>
  );
};

// Sample data for professional awards
const professionalAwards = [
  {
    title: "Best Web Developer Award",
    description: "Recognized for exceptional contributions to web development projects and innovative solutions.",
    date: "October 2024",
    icon: <Trophy size={24} className="text-yellow-500" />
  },
  {
    title: "Performance Optimization Champion",
    description: "Awarded for improving application performance by 70% through advanced optimization techniques.",
    date: "August 2024",
    icon: <Medal size={24} className="text-gray-500" />
  },
  {
    title: "Frontend Excellence Award",
    description: "Recognized for creating outstanding user interfaces with attention to detail and accessibility.",
    date: "July 2024",
    icon: <Crown size={24} className="text-yellow-500" />
  },
  {
    title: "Team Collaboration Star",
    description: "Awarded for exceptional teamwork and facilitating effective collaboration across departments.",
    date: "May 2024",
    icon: <Star size={24} className="text-blue-500" />
  },
  {
    title: "Innovation Leader",
    description: "Recognized for introducing new technologies and methodologies that improved development processes.",
    date: "March 2024",
    icon: <Badge size={24} className="text-purple-500" />
  },
  {
    title: "Project Management Excellence",
    description: "Awarded for successfully managing complex projects and delivering results ahead of schedule.",
    date: "January 2024",
    icon: <Award size={24} className="text-green-500" />
  }
];

// Sample data for personal awards
const personalAwards = [
  {
    title: "Hackathon Winner",
    description: "First place in the annual coding competition for creating an innovative accessibility solution.",
    date: "November 2024",
    icon: <Trophy size={24} className="text-yellow-500" />
  },
  {
    title: "Open Source Contributor",
    description: "Recognized for significant contributions to open source projects in the web development community.",
    date: "September 2024",
    icon: <Gift size={24} className="text-pink-500" />
  },
  {
    title: "Digital Art Competition Winner",
    description: "Awarded first prize for creative digital artwork combining programming and visual design.",
    date: "July 2024",
    icon: <Award size={24} className="text-purple-500" />
  },
  {
    title: "Community Teacher Award",
    description: "Recognized for teaching web development skills to underprivileged youth in local communities.",
    date: "May 2024",
    icon: <Badge size={24} className="text-blue-500" />
  },
  {
    title: "Tech Blog Excellence",
    description: "Awarded for maintaining a highly informative technical blog that has helped many developers.",
    date: "March 2024",
    icon: <Star size={24} className="text-orange-500" />
  }
];

export default Awards;
