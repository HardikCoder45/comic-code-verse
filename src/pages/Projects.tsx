
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'carousel' | 'book'>('grid');
  const [animateIn, setAnimateIn] = useState(false);
  const { playSound } = useSound();
  const navigate = useNavigate();
  
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
      playSound('whoosh');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [playSound]);
  
  const handleShowProjectDetails = (id: number) => {
    navigate(`/show-project/${id}`);
    playSound('pageFlip');
  };
  
  const projectStats = {
    total: projects.length,
    frontend: projects.filter(p => p.skills.some(s => ['React', 'Vue.js', 'HTML', 'CSS', 'JavaScript'].includes(s.name))).length,
    backend: projects.filter(p => p.skills.some(s => ['Node.js', 'Express', 'Python', 'Flask', 'Django'].includes(s.name))).length,
    mobile: projects.filter(p => p.skills.some(s => ['React Native', 'Flutter', 'Android', 'iOS'].includes(s.name))).length,
    ai: projects.filter(p => p.skills.some(s => ['TensorFlow', 'PyTorch', 'Machine Learning', 'AI'].includes(s.name))).length
  };

  return (
    <div className="min-h-screen w-full py-6 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-bangers text-5xl text-blue-700 mb-4 text-center tracking-wider">
            Project Showcase
          </h1>
          
          <div className="max-w-3xl mx-auto mb-6">
            <SpeechBubble type="shout" color="blue">
              <p className="font-comic text-lg text-gray-800">Here's a collection of my coding adventures! Click on any panel to see the details.</p>
            </SpeechBubble>
          </div>
          
          <ProjectStats stats={projectStats} />
          
          <ProjectFilter 
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            totalProjects={projects.length}
            filteredCount={filteredProjects.length}
          />
          
          <ProjectViewSwitcher 
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </motion.div>
        
        {currentView === 'grid' && (
          <LayoutGroup>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
              layout
            >
              <AnimatePresence>
                {sortedProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onViewDetails={handleShowProjectDetails}
                  />
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
        
        <motion.div 
          className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="font-bangers text-3xl mb-2 tracking-wide">Want to collaborate?</h3>
              <p className="font-comic">Let's build something amazing together!</p>
            </div>
            <motion.a 
              href="/contact" 
              className="mt-4 md:mt-0 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
