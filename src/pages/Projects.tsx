import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpeechBubble from '../components/SpeechBubble';
import { projects } from '../data/projects';
import { useSound } from '../contexts/SoundContext';

// Import our components
import ProjectCard from '../components/ProjectCard';
import ProjectFilter from '../components/ProjectFilter';
import ProjectStats from '../components/ProjectStats';
import ProjectViewSwitcher from '../components/ProjectViewSwitcher';
import ProjectCarousel from '../components/ProjectCarousel';
import ProjectBook from '../components/ProjectBook';
import { Search, Filter, SlidersHorizontal, Sparkles, X, ArrowUpRight, Code, Lightbulb, Star, GitFork, RefreshCw } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'carousel' | 'book'>('grid');
  const [animateIn, setAnimateIn] = useState(false);
  const [expandedFilterOptions, setExpandedFilterOptions] = useState(false);
  const [highlightedProject, setHighlightedProject] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: '', content: '' });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [layoutMode, setLayoutMode] = useState<'standard' | 'creative'>('standard');
  const [hoverStates, setHoverStates] = useState<{[key: number]: boolean}>({});
  
  // Mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });
  
  const { playSound } = useSound();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories = ['all', ...new Set(projects.flatMap(p => 
    p.skills.map(s => s.name.toLowerCase())
  ))];
  
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.skills.some(skill => 
      skill.name.toLowerCase() === filter.toLowerCase()
    );
  }).filter(project => {
    if (!searchTerm) return true;
    return (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sort === 'newest') return b.id - a.id;
    if (sort === 'oldest') return a.id - b.id;
    if (sort === 'alphabetical') return a.title.localeCompare(b.title);
    if (sort === 'complexity') return b.skills.length - a.skills.length;
    return 0;
  });

  // Generate search suggestions based on current input
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Get project titles, descriptions, and skills that match
      const matchingTerms = projects.flatMap(project => {
        const matches = [];
        if (project.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          matches.push(project.title);
        }
        project.skills.forEach(skill => {
          if (skill.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            matches.push(skill.name);
          }
        });
        return matches;
      });
      
      // Remove duplicates and limit to 5 suggestions
      const uniqueTerms = Array.from(new Set(matchingTerms)).slice(0, 5);
      setSearchSuggestions(uniqueTerms);
      setShowSearchSuggestions(uniqueTerms.length > 0);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
      playSound('whoosh');
    }, 100);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Normalize mouse position to be from -0.5 to 0.5
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [playSound, mouseX, mouseY]);
  
  const handleShowProjectDetails = (id: number) => {
    navigate(`/show-project/${id}`);
    playSound('pageFlip');
  };
  
  const handleProjectHover = (id: number, isHovering: boolean) => {
    setHoverStates(prev => ({...prev, [id]: isHovering}));
    if (isHovering) {
      setHighlightedProject(id);
      playSound('hover');
    } else if (highlightedProject === id) {
      setHighlightedProject(null);
    }
  };
  
  const handleShowTooltip = (title: string, content: string, x: number, y: number) => {
    setTooltipContent({ title, content });
    setTooltipPosition({ x, y });
    setShowTooltip(true);
  };
  
  const handleHideTooltip = () => {
    setShowTooltip(false);
  };
  
  const projectStats = {
    total: projects.length,
    frontend: projects.filter(p => p.skills.some(s => ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript'].includes(s.name))).length,
    backend: projects.filter(p => p.skills.some(s => ['Node.js', 'Express', 'Python', 'Flask', 'Django'].includes(s.name))).length,
    mobile: projects.filter(p => p.skills.some(s => ['React Native', 'Flutter', 'Android', 'iOS'].includes(s.name))).length,
    ai: projects.filter(p => p.skills.some(s => ['TensorFlow', 'PyTorch', 'Machine Learning', 'AI'].includes(s.name))).length
  };

  // Parallax effect values
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);
  const parallaxScale = useTransform(
    smoothMouseY, 
    [-0.5, 0, 0.5], 
    [0.98, 1, 0.98]
  );

  return (
    <div 
      className="min-h-screen w-full py-6 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white"
      ref={containerRef}
    >
      {/* Floating elements for visual interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-20 blur-3xl"
          style={{ 
            x: parallaxX, 
            y: parallaxY,
            top: '10%',
            right: '10%'
          }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-200 to-teal-200 opacity-20 blur-3xl"
          style={{ 
            x: useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]), 
            y: useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]),
            bottom: '20%',
            left: '10%'
          }}
        />
        <motion.div 
          className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 opacity-20 blur-3xl"
          style={{ 
            x: useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]), 
            y: useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]),
            top: '40%',
            left: '25%'
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.h1 
            className="font-bangers text-5xl text-blue-700 mb-4 text-center tracking-wider"
            style={{ 
              rotateX, 
              rotateY,
              textShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
          >
            Project Showcase
          </motion.h1>
          
          <div className="max-w-3xl mx-auto mb-6">
            <SpeechBubble type="shout" color="blue">
              <p className="font-comic text-lg text-gray-800">Here's a collection of my coding adventures! Click on any panel to see the details.</p>
            </SpeechBubble>
          </div>
          
          <ProjectStats stats={projectStats} />
          
          {/* Enhanced search and filter controls */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Search className="mr-2 text-blue-500" size={20} />
                <h3 className="font-bangers text-xl text-gray-700">Find Projects</h3>
              </div>
              
              <motion.button
                className={`px-3 py-1 rounded-full font-comic text-sm flex items-center ${expandedFilterOptions ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setExpandedFilterOptions(!expandedFilterOptions)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SlidersHorizontal size={16} className="mr-1" />
                {expandedFilterOptions ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 font-comic focus:border-blue-400 focus:outline-none pr-10"
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchTerm('')}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                {/* Search suggestions */}
                <AnimatePresence>
                  {showSearchSuggestions && (
                    <motion.div 
                      className="absolute z-10 bg-white w-full mt-1 rounded-lg shadow-lg border border-gray-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer font-comic text-sm text-gray-700 flex items-center"
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSearchSuggestions(false);
                          }}
                          whileHover={{ x: 5 }}
                        >
                          <Search size={14} className="mr-2 text-blue-400" />
                          {suggestion}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-gray-200 font-comic focus:border-blue-400 focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">A-Z</option>
                  <option value="complexity">Complexity</option>
                </select>
                
                <motion.button
                  className={`px-3 py-1 rounded-lg flex items-center font-comic ${layoutMode === 'creative' ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-200'}`}
                  onClick={() => setLayoutMode(prev => prev === 'standard' ? 'creative' : 'standard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={16} className="mr-1" />
                  {layoutMode === 'creative' ? 'Creative' : 'Standard'}
                </motion.button>
              </div>
            </div>
            
            {/* Expandable filter options */}
            <AnimatePresence>
              {expandedFilterOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-comic font-bold text-gray-700 mb-2 flex items-center">
                      <Filter size={16} className="mr-1 text-blue-500" />
                      Filter by Technology
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <motion.button
                          key={category}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filter === category 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          } font-comic`}
                          onClick={() => setFilter(category)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {category === 'all' ? 'All Technologies' : category}
                          {filter === category && <span className="ml-1">✓</span>}
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-comic text-sm text-gray-500">
                        Showing {filteredProjects.length} of {projects.length} projects
                      </span>
                      
                      <motion.button
                        className="text-blue-500 text-sm font-comic flex items-center"
                        onClick={() => {
                          setFilter('all');
                          setSearchTerm('');
                          setSort('newest');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RefreshCw size={14} className="mr-1" />
                        Reset Filters
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <ProjectViewSwitcher 
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </motion.div>
        
        {currentView === 'grid' && (
          <LayoutGroup>
            <motion.div 
              className={`grid ${
                layoutMode === 'creative' 
                  ? 'grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              } mb-10`}
              layout
            >
              <AnimatePresence>
                {sortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`${
                      layoutMode === 'creative' && index % 5 === 0 
                        ? 'md:col-span-2 md:row-span-2' 
                        : layoutMode === 'creative' && index % 7 === 3
                          ? 'md:col-span-2'
                          : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: highlightedProject === project.id ? 1.03 : 1
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onMouseEnter={() => handleProjectHover(project.id, true)}
                    onMouseLeave={() => handleProjectHover(project.id, false)}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      onViewDetails={handleShowProjectDetails}
                      isHighlighted={highlightedProject === project.id}
                      layoutMode={layoutMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
        
        {currentView === 'carousel' && (
          <ProjectCarousel 
            projects={sortedProjects}
            onViewDetails={handleShowProjectDetails}
          />
        )}
        
        {currentView === 'book' && (
          <ProjectBook 
            projects={sortedProjects}
            onViewDetails={handleShowProjectDetails}
          />
        )}
        
        {/* Enhanced CTA section */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 rounded-xl p-6 text-white shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ 
            translateX: parallaxX,
            translateY: parallaxY,
            rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [1, -1]), 
            rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-1, 1]),
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute w-40 h-40 rounded-full bg-white opacity-10"
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '10%', left: '10%' }}
            />
            <motion.div 
              className="absolute w-20 h-20 rounded-full bg-white opacity-10"
              animate={{ 
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ bottom: '20%', right: '20%' }}
            />
            <motion.div 
              className="absolute w-32 h-32 rounded-full bg-white opacity-5"
              animate={{ 
                x: [0, 70, 0],
                y: [0, 70, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '50%', left: '50%' }}
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div>
              <motion.h3 
                className="font-bangers text-3xl mb-2 tracking-wide flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Lightbulb className="mr-2" />
                Want to collaborate?
              </motion.h3>
              <motion.p 
                className="font-comic"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Let's build something amazing together!
              </motion.p>
            </div>
            <motion.a 
              href="/contact" 
              className="mt-4 md:mt-0 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Get in Touch
              <ArrowUpRight size={18} className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
        
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="fixed z-50 bg-white rounded-lg shadow-xl p-4 max-w-xs"
              style={{ 
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y + 10
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h4 className="font-comic font-bold text-blue-700 mb-1">{tooltipContent.title}</h4>
              <p className="font-comic text-sm text-gray-600">{tooltipContent.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
