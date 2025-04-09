
import React, { useState, useEffect } from 'react';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import CodeSnippet from '../components/CodeSnippet';
import SpeechBubble from '../components/SpeechBubble';
import { projects } from '../data/projects';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, ExternalLink, Github, Search, Filter, SortDesc, 
  Zap, BookOpen, Star, Calendar, Eye
} from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'carousel'>('grid');
  const [animateIn, setAnimateIn] = useState(false);
  
  // Get all unique categories from projects
  const categories = ['all', ...new Set(projects.flatMap(p => 
    p.skills.map(s => s.name.toLowerCase())
  ))];
  
  // Filter and sort projects
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

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
            Project Showcase
          </h1>
          
          <div className="mb-8">
            <SpeechBubble type="shout" color="yellow">
              <p className="font-comic text-lg">Here's a collection of my coding adventures! Click on any panel to see the code behind it.</p>
            </SpeechBubble>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-comic-border bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-full border-2 border-comic-border bg-white flex items-center gap-2">
                  <Filter size={16} /> Filter
                </button>
                <div className="absolute z-10 mt-2 hidden group-hover:block bg-white border-2 border-comic-border rounded-lg shadow-lg p-3 min-w-48">
                  <p className="font-bold mb-2">Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 10).map((category) => (
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
                <div className="absolute z-10 mt-2 hidden group-hover:block bg-white border-2 border-comic-border rounded-lg shadow-lg p-3 min-w-48">
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
                Carousel View
              </button>
            </div>
          </div>
          
          {/* Project count and stats */}
          <div className="flex justify-between items-center mb-6">
            <p className="font-comic">
              Showing <span className="font-bold">{sortedProjects.length}</span> out of <span className="font-bold">{projects.length}</span> projects
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm">
                <Zap size={16} className="text-comic-yellow" /> {projects.length} Total
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Star size={16} className="text-comic-orange" /> 10 Featured
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={16} className="text-comic-green" /> 5 Recent
              </span>
            </div>
          </div>
          
          {/* Project display - Grid or Carousel */}
          {currentView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sortedProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="animate-pop" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ComicPanel 
                    title={project.title}
                    flippable={true}
                    backContent={
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="comic-panel-header">Code Peek</h3>
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
                    }
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-comic-orange text-white text-xs font-bold px-2 py-1 rounded-full">#{project.id}</span>
                            <span className="flex items-center gap-1 text-xs">
                              <Eye size={14} /> 1.2k
                            </span>
                          </div>
                          <span className="bg-comic-green text-white text-xs font-bold px-2 py-1 rounded-full">
                            {new Date().getFullYear() - Math.floor(Math.random() * 3)}
                          </span>
                        </div>
                        
                        <p className="font-comic mb-4">{project.description}</p>
                        
                        <SpeechBubble type="thought" position="right" className="mb-4 text-sm">
                          <p>This project was built using {project.skills.map(s => s.name).join(', ')}.</p>
                        </SpeechBubble>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
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
                    </div>
                  </ComicPanel>
                </div>
              ))}
            </div>
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {sortedProjects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/2">
                    <ComicPanel 
                      title={project.title}
                      flippable={true}
                      backContent={
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <h3 className="comic-panel-header">Code Peek</h3>
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
                      }
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <p className="font-comic mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
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
                      </div>
                    </ComicPanel>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          
          {/* Project Categories Tabs */}
          <div className="mt-12">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.slice(0, 4).map((project) => (
                    <div key={project.id} className="border-2 border-comic-border rounded-lg p-4 bg-white">
                      <h3 className="font-bangers text-lg mb-2">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{project.description}</p>
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="frontend" className="animate-pop">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.filter(p => 
                    p.skills.some(s => ['React', 'Vue.js', 'JavaScript'].includes(s.name))
                  ).slice(0, 4).map((project) => (
                    <div key={project.id} className="border-2 border-comic-border rounded-lg p-4 bg-white">
                      <h3 className="font-bangers text-lg mb-2">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{project.description}</p>
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="backend" className="animate-pop">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.filter(p => 
                    p.skills.some(s => ['Python', 'Node.js', 'Flask'].includes(s.name))
                  ).slice(0, 4).map((project) => (
                    <div key={project.id} className="border-2 border-comic-border rounded-lg p-4 bg-white">
                      <h3 className="font-bangers text-lg mb-2">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{project.description}</p>
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fullstack" className="animate-pop">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.filter(p => 
                    p.skills.some(s => ['Next.js', 'React', 'Node.js'].includes(s.name))
                  ).slice(0, 4).map((project) => (
                    <div key={project.id} className="border-2 border-comic-border rounded-lg p-4 bg-white">
                      <h3 className="font-bangers text-lg mb-2">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{project.description}</p>
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="mobile" className="animate-pop">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.filter(p => 
                    p.skills.some(s => ['React Native', 'Firebase', 'Redux'].includes(s.name))
                  ).slice(0, 4).map((project) => (
                    <div key={project.id} className="border-2 border-comic-border rounded-lg p-4 bg-white">
                      <h3 className="font-bangers text-lg mb-2">{project.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{project.description}</p>
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
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-comic-blue to-comic-purple rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="font-bangers text-2xl mb-2">Want to collaborate?</h3>
                <p className="font-comic">Let's build something amazing together!</p>
              </div>
              <a href="/contact" className="mt-4 md:mt-0 comic-button bg-white text-comic-blue hover:bg-white/80">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
