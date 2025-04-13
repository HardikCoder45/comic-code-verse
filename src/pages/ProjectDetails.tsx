
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Github, ExternalLink, Award, Star, Calendar, Zap } from 'lucide-react';
import { Project } from '../data/projects';
import { projects } from '../data/projects';
import SpeechBubble from '../components/SpeechBubble';
import SkillBadge from '../components/SkillBadge';
import CodeSnippet from '../components/CodeSnippet';
import { useSound } from '../contexts/SoundContext';
import { Badge } from '@/components/ui/badge';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playSound } = useSound();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the project by ID
    const projectId = parseInt(id || '0');
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
      playSound('pageFlip');
    } else {
      // If project not found, navigate back to projects page
      navigate('/projects');
    }
    
    setLoading(false);
  }, [id, navigate, playSound]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-blue-600 font-comic">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Project Not Found</h2>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              playSound('click');
              navigate('/projects');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-6 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center"
        >
          <button 
            className="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 mr-4"
            onClick={() => {
              playSound('click');
              navigate('/projects');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bangers text-4xl text-blue-700 tracking-wider">{project.title}</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-60 md:h-80 bg-white rounded-lg border-2 border-gray-200 overflow-hidden mb-4 shadow-lg relative group">
              {project.image ? (
                <>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex space-x-2">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs flex items-center"
                          onClick={() => playSound('click')}
                          onMouseEnter={() => playSound('hover')}
                        >
                          <ExternalLink size={12} className="mr-1" /> Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs flex items-center"
                          onClick={() => playSound('click')}
                          onMouseEnter={() => playSound('hover')}
                        >
                          <Github size={12} className="mr-1" /> Repository
                        </a>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Code size={48} className="text-gray-400" />
                </div>
              )}
            </div>

            <SpeechBubble type="speech" color="blue">
              <p className="font-comic text-gray-800">{project.description}</p>
            </SpeechBubble>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.skills.map((skill, idx) => (
                <SkillBadge 
                  key={idx} 
                  name={skill.name} 
                  color={skill.color}
                  size="sm"
                  icon={<Code size={12} />}
                  animated={true}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center bg-blue-50 rounded-lg p-2">
                <Star size={16} className="text-yellow-500 mr-2" />
                <span className="text-gray-700">4.{8 + project.id % 2} Star Rating</span>
              </div>
              <div className="flex items-center bg-blue-50 rounded-lg p-2">
                <Calendar size={16} className="text-green-500 mr-2" />
                <span className="text-gray-700">{new Date().getFullYear() - Math.floor(Math.random() * 3)}</span>
              </div>
              <div className="flex items-center bg-blue-50 rounded-lg p-2">
                <Award size={16} className="text-purple-500 mr-2" />
                <span className="text-gray-700">Featured Project</span>
              </div>
              <div className="flex items-center bg-blue-50 rounded-lg p-2">
                <Zap size={16} className="text-blue-500 mr-2" />
                <span className="text-gray-700">{5 + project.id} Contributors</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-4 bg-white rounded-lg p-4 border border-gray-200 shadow-md">
              <h4 className="font-comic font-bold mb-2 text-gray-800">Project Highlights:</h4>
              <ul className="list-disc pl-5 font-comic space-y-1 text-gray-700">
                <li>Built with {project.skills.map(s => s.name).join(', ')}</li>
                <li>Implemented responsive design and intuitive UX</li>
                <li>Optimized for performance and accessibility</li>
                <li>Successfully deployed with CI/CD pipeline</li>
                <li>Maintained {90 + project.id}% test coverage</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-comic font-bold text-gray-800">Featured Code Snippet:</h4>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  {project.codeSnippet.includes('function') ? 'JavaScript' : 'Python'}
                </Badge>
              </div>
              <CodeSnippet 
                code={project.codeSnippet}
                language={project.codeSnippet.includes('function') ? 'javascript' : 'python'}
              />
            </div>

            <div className="flex space-x-4 mt-6">
              {project.demoUrl && (
                <motion.a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <ExternalLink size={18} /> Live Demo
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-md border border-gray-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Github size={18} /> View Code
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
