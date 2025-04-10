import React, { useState, useEffect } from 'react';
import ComicPanel from '../components/ComicPanel';
import Comic3DPanel from '../components/Comic3DPanel';
import SkillBadge from '../components/SkillBadge';
import CodeSnippet from '../components/CodeSnippet';
import SpeechBubble from '../components/SpeechBubble';
import ComicBookPage from '../components/ComicBookPage';
import { projects } from '../data/projects';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, ExternalLink, Github, Search, Filter, SortDesc, 
  Zap, BookOpen, Star, Calendar, Eye, Award, Bolt,
  RotateCw, Layers, Box, Cpu, Palette, Rocket, Trophy,
  Smartphone, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'carousel' | 'book'>('grid');
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [showFeaturedProject, setShowFeaturedProject] = useState(false);
  const [featuredProjectId, setFeaturedProjectId] = useState(1);
  
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
    return 0;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleShowFeaturedProject = (id: number) => {
    setFeaturedProjectId(id);
    setShowFeaturedProject(true);
  };
  
  const projectStats = {
    total: projects.length,
    frontend: projects.filter(p => p.skills.some(s => ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript'].includes(s.name))).length,
    backend: projects.filter(p => p.skills.some(s => ['Node.js', 'Express', 'Python', 'Flask', 'Django'].includes(s.name))).length,
    mobile: projects.filter(p => p.skills.some(s => ['React Native', 'Flutter', 'Android', 'iOS'].includes(s.name))).length,
    ai: projects.filter(p => p.skills.some(s => ['TensorFlow', 'PyTorch', 'Machine Learning', 'AI'].includes(s.name))).length
  };

  return (
    <div className="min-h-screen w-full pl-20 py-6 px-4 md:px-8 bg-gradient-to-b from-white to-comic-background">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate={animateIn ? "animate" : "initial"}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-bangers text-5xl text-comic-blue mb-4 text-center">
            Project Showcase
          </h1>
          
          <div className="max-w-3xl mx-auto mb-6">
            <SpeechBubble type="shout" color="yellow">
              <p className="font-comic text-lg">Here's a collection of my coding adventures! Click on any panel to see the code behind it.</p>
            </SpeechBubble>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-6">
            <motion.div 
              className="bg-white rounded-lg border-2 border-comic-border p-3 text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 mx-auto bg-comic-blue rounded-full flex items-center justify-center mb-2">
                <Zap className="text-white" size={24} />
              </div>
              <span className="font-bangers text-2xl text-comic-blue">{projectStats.total}</span>
              <p className="font-comic text-xs">Total Projects</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg border-2 border-comic-border p-3 text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 mx-auto bg-comic-pink rounded-full flex items-center justify-center mb-2">
                <Code className="text-white" size={24} />
              </div>
              <span className="font-bangers text-2xl text-comic-pink">{projectStats.frontend}</span>
              <p className="font-comic text-xs">Frontend</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg border-2 border-comic-border p-3 text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 mx-auto bg-comic-green rounded-full flex items-center justify-center mb-2">
                <Cpu className="text-white" size={24} />
              </div>
              <span className="font-bangers text-2xl text-comic-green">{projectStats.backend}</span>
              <p className="font-comic text-xs">Backend</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg border-2 border-comic-border p-3 text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 mx-auto bg-comic-orange rounded-full flex items-center justify-center mb-2">
                <Layers className="text-white" size={24} />
              </div>
              <span className="font-bangers text-2xl text-comic-orange">{Math.round(projectStats.total * 0.4)}</span>
              <p className="font-comic text-xs">Open Source</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg border-2 border-comic-border p-3 text-center"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="w-12 h-12 mx-auto bg-comic-purple rounded-full flex items-center justify-center mb-2">
                <Bolt className="text-white" size={24} />
              </div>
              <span className="font-bangers text-2xl text-comic-purple">{projectStats.ai}</span>
              <p className="font-comic text-xs">AI Projects</p>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-6 bg-white p-4 rounded-lg border-2 border-comic-border">
            <div className="flex flex-1 gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-comic-border bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-full border-2 border-comic-border bg-white flex items-center gap-2">
                  <Filter size={16} /> Filter
                </button>
                <div className="absolute z-10 mt-2 hidden group-hover:block bg-white border-2 border-comic-border rounded-lg shadow-lg p-3 w-64 right-0">
                  <p className="font-bold mb-2">Categories:</p>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-2 py-1 text-xs rounded-full border border-comic-border ${filter === category ? 'bg-comic-blue text-white' : 'bg-white'}`}
                        onClick={() => setFilter(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-full border-2 border-comic-border bg-white flex items-center gap-2">
                  <SortDesc size={16} /> Sort
                </button>
                <div className="absolute z-10 mt-2 hidden group-hover:block bg-white border-2 border-comic-border rounded-lg shadow-lg p-3 min-w-48 right-0">
                  <p className="font-bold mb-2">Sort by:</p>
                  <div className="flex flex-col gap-1">
                    <button
                      className={`px-2 py-1 text-left text-sm rounded ${sort === 'newest' ? 'bg-comic-blue text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setSort('newest')}
                    >
                      Newest First
                    </button>
                    <button
                      className={`px-2 py-1 text-left text-sm rounded ${sort === 'oldest' ? 'bg-comic-blue text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setSort('oldest')}
                    >
                      Oldest First
                    </button>
                    <button
                      className={`px-2 py-1 text-left text-sm rounded ${sort === 'alphabetical' ? 'bg-comic-blue text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setSort('alphabetical')}
                    >
                      Alphabetical
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                className={`p-2 border-2 border-comic-border rounded-lg ${currentView === 'grid' ? 'bg-comic-blue text-white' : 'bg-white'}`}
                onClick={() => setCurrentView('grid')}
              >
                Grid View
              </button>
              <button 
                className={`p-2 border-2 border-comic-border rounded-lg ${currentView === 'carousel' ? 'bg-comic-blue text-white' : 'bg-white'}`}
                onClick={() => setCurrentView('carousel')}
              >
                Carousel
              </button>
              <button 
                className={`p-2 border-2 border-comic-border rounded-lg ${currentView === 'book' ? 'bg-comic-blue text-white' : 'bg-white'}`}
                onClick={() => setCurrentView('book')}
              >
                Comic Book
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg border-2 border-comic-border">
            <p className="font-comic">
              Showing <span className="font-bold">{sortedProjects.length}</span> out of <span className="font-bold">{projects.length}</span> projects
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm">
                <Star size={16} className="text-comic-yellow" /> {Math.round(projects.length * 0.2)} Featured
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Trophy size={16} className="text-comic-orange" /> {Math.round(projects.length * 0.3)} Award-winning
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={16} className="text-comic-green" /> {Math.round(projects.length * 0.5)} Recent
              </span>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {showFeaturedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
            >
              <div className="max-w-4xl w-full bg-white rounded-xl border-4 border-comic-border overflow-hidden">
                <div className="bg-comic-blue text-white p-3 flex justify-between items-center">
                  <h3 className="font-bangers text-xl">Featured Project</h3>
                  <button 
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                    onClick={() => setShowFeaturedProject(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6">
                  {projects.filter(p => p.id === featuredProjectId).map(project => (
                    <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="h-60 bg-gray-100 rounded-lg border-2 border-comic-border overflow-hidden mb-4">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-comic-background flex items-center justify-center">
                              <Code size={48} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <SpeechBubble type="speech" color="green">
                          <p className="font-comic">{project.description}</p>
                        </SpeechBubble>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.skills.map((skill, idx) => (
                            <SkillBadge 
                              key={idx} 
                              name={skill.name} 
                              color={skill.color}
                              size="sm"
                              icon={<Code size={12} />}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="font-bangers text-2xl text-comic-blue mb-4">{project.title}</h2>
                        
                        <div className="mb-4">
                          <h4 className="font-comic font-bold mb-2">Project Highlights:</h4>
                          <ul className="list-disc pl-5 font-comic space-y-1">
                            <li>Built with {project.skills.map(s => s.name).join(', ')}</li>
                            <li>Implemented responsive design and intuitive UX</li>
                            <li>Optimized for performance and accessibility</li>
                            <li>Successfully deployed with CI/CD pipeline</li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-100 rounded-lg p-3 mb-4">
                          <h4 className="font-comic font-bold mb-2">Code Snippet:</h4>
                          <CodeSnippet 
                            code={project.codeSnippet}
                            language={project.codeSnippet.includes('function') ? 'javascript' : 'python'}
                          />
                        </div>
                        
                        <div className="flex space-x-4 mt-4">
                          {project.demoUrl && (
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="comic-button flex-1 text-center flex items-center justify-center gap-2"
                            >
                              <ExternalLink size={16} /> Live Demo
                            </a>
                          )}
                          {project.repoUrl && (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="comic-button-secondary flex-1 text-center flex items-center justify-center gap-2"
                            >
                              <Github size={16} /> View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative"
            >
              <Comic3DPanel 
                title={project.title}
                headerColor={project.skills[0]?.color || 'blue'}
                spotlightEffect={true}
                backgroundImage={project.image}
                className="h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-comic-orange text-white text-xs font-bold px-2 py-1 rounded-full">#{project.id}</span>
                        <span className="flex items-center gap-1 text-xs">
                          <Eye size={14} /> {1200 + project.id * 100}
                        </span>
                      </div>
                      <span className="bg-comic-green text-white text-xs font-bold px-2 py-1 rounded-full">
                        {new Date().getFullYear() - Math.floor(Math.random() * 3)}
                      </span>
                    </div>
                    
                    <p className="font-comic mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.skills.map((skill, idx) => (
                        <SkillBadge 
                          key={idx} 
                          name={skill.name} 
                          color={skill.color}
                          size="sm"
                          icon={<Code size={12} />}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button 
                      className="flex-1 comic-button-secondary text-xs py-1"
                      onClick={() => handleShowFeaturedProject(project.id)}
                    >
                      <Box className="mr-1" size={14} /> View Details
                    </button>
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="comic-button text-xs py-1 flex-1 flex items-center justify-center"
                      >
                        <Github size={14} className="mr-1" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </Comic3DPanel>
              
              {hoveredProject === project.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-2 -right-2 bg-comic-yellow text-black font-bangers px-2 py-1 rounded-lg rotate-12 z-20"
                >
                  {index < 2 ? 'HOT!' : index < 4 ? 'NEW!' : 'COOL!'}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {sortedProjects.map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <Comic3DPanel 
                  title={project.title}
                  headerColor={project.skills[0]?.color || 'blue'}
                  backgroundImage={project.image}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <p className="font-comic mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color} 
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                    <button 
                      className="comic-button-secondary mt-4 text-sm"
                      onClick={() => handleShowFeaturedProject(project.id)}
                    >
                      See Details
                    </button>
                  </div>
                </Comic3DPanel>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
        
        <div className="relative w-full bg-comic-background border-4 border-comic-border rounded-xl overflow-hidden" style={{ height: '600px' }}>
          <div className="absolute top-0 left-0 w-full p-3 bg-comic-blue text-white font-bangers text-center">
            Comic Book View - {currentBookPage + 1}/{Math.ceil(sortedProjects.length / 2)}
          </div>
          
          <div className="absolute top-12 left-0 w-full h-[calc(100%-48px)] bg-white">
            {sortedProjects.map((project, index) => {
              const pageIdx = Math.floor(index / 2);
              const isLeftPage = index % 2 === 0;
              
              if (pageIdx === currentBookPage) {
                return (
                  <div key={project.id} className={`absolute ${isLeftPage ? 'left-0' : 'right-0'} top-0 w-1/2 h-full p-6`}>
                    <h3 className="font-bangers text-2xl text-comic-blue mb-4">{project.title}</h3>
                    
                    {project.image && (
                      <div className="h-40 mb-4 rounded-lg overflow-hidden border-2 border-comic-border">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <p className="font-comic mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, idx) => (
                        <SkillBadge 
                          key={idx} 
                          name={skill.name} 
                          color={skill.color}
                          size="sm"
                        />
                      ))}
                    </div>
                    
                    <button 
                      className="comic-button-secondary w-full text-sm"
                      onClick={() => handleShowFeaturedProject(project.id)}
                    >
                      View Details
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-100 border-t-2 border-comic-border flex justify-between items-center">
            <button 
              className="comic-button-secondary"
              disabled={currentBookPage === 0}
              onClick={() => setCurrentBookPage(prev => Math.max(0, prev - 1))}
            >
              Previous Page
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(sortedProjects.length / 2) }).map((_, idx) => (
                <button 
                  key={idx}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentBookPage === idx ? 'bg-comic-blue text-white' : 'bg-white border-2 border-comic-border'}`}
                  onClick={() => setCurrentBookPage(idx)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            
            <button 
              className="comic-button"
              disabled={currentBookPage === Math.ceil(sortedProjects.length / 2) - 1}
              onClick={() => setCurrentBookPage(prev => Math.min(Math.ceil(sortedProjects.length / 2) - 1, prev + 1))}
            >
              Next Page
            </button>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-xl border-4 border-comic-border">
          <h2 className="font-bangers text-3xl text-comic-blue mb-4">Project Categories</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-pop">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.slice(0, 4).map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="border-2 border-comic-border rounded-lg overflow-hidden bg-white"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-24 bg-gray-100 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-comic-blue to-comic-purple flex items-center justify-center">
                          <Code size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bangers text-lg mb-1">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color}
                            size="sm"
                            animated={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="frontend" className="animate-pop">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.filter(p => 
                  p.skills.some(s => ['React', 'Vue.js', 'JavaScript'].includes(s.name))
                ).slice(0, 4).map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="border-2 border-comic-border rounded-lg overflow-hidden bg-white"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-24 bg-gray-100 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-comic-pink to-comic-orange flex items-center justify-center">
                          <Code size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bangers text-lg mb-1">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color}
                            size="sm"
                            animated={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="backend" className="animate-pop">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.filter(p => 
                  p.skills.some(s => ['Python', 'Node.js', 'Flask'].includes(s.name))
                ).slice(0, 4).map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="border-2 border-comic-border rounded-lg overflow-hidden bg-white"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-24 bg-gray-100 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-comic-green to-comic-blue flex items-center justify-center">
                          <Cpu size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bangers text-lg mb-1">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color}
                            size="sm"
                            animated={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fullstack" className="animate-pop">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.filter(p => 
                  p.skills.some(s => ['Next.js', 'React', 'Node.js'].includes(s.name))
                ).slice(0, 4).map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="border-2 border-comic-border rounded-lg overflow-hidden bg-white"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-24 bg-gray-100 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-comic-purple to-comic-blue flex items-center justify-center">
                          <Layers size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bangers text-lg mb-1">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color}
                            size="sm"
                            animated={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="animate-pop">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.filter(p => 
                  p.skills.some(s => ['React Native', 'Firebase', 'Redux'].includes(s.name))
                ).slice(0, 4).map((project) => (
                  <motion.div 
                    key={project.id} 
                    className="border-2 border-comic-border rounded-lg overflow-hidden bg-white"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="h-24 bg-gray-100 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-comic-orange to-comic-yellow flex items-center justify-center">
                          <Smartphone size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bangers text-lg mb-1">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2 text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 2).map((skill, idx) => (
                          <SkillBadge 
                            key={idx} 
                            name={skill.name} 
                            color={skill.color}
                            size="sm"
                            animated={false}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-comic-blue to-comic-purple rounded-xl p-6 text-white shadow-lg shadow-purple-300/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="font-bangers text-3xl mb-2">Want to collaborate?</h3>
              <p className="font-comic">Let's build something amazing together!</p>
            </div>
            <a href="/contact" className="mt-4 md:mt-0 comic-button bg-white text-comic-blue hover:bg-white/80 animate-pulse">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
