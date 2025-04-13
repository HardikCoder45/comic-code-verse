
import React from 'react';
import { X, Code, Github, ExternalLink, Award, Star, Calendar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechBubble from './SpeechBubble';
import SkillBadge from './SkillBadge';
import CodeSnippet from './CodeSnippet';
import { Project } from '../data/projects';
import { useSound } from '../contexts/SoundContext';
import { Badge } from '@/components/ui/badge';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const { playSound } = useSound();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playSound('click');
          onClose();
        }
      }}
    >
      <motion.div 
        className="max-w-4xl w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-4 border-comic-border overflow-hidden shadow-[0_0_30px_rgba(155,135,245,0.3)]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-comic-blue text-white p-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="text-yellow-300" size={20} />
            <h3 className="font-bangers text-2xl tracking-wider">Featured Project</h3>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 ml-2">
              {project.id < 3 ? 'New' : project.id < 6 ? 'Featured' : 'Popular'}
            </Badge>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform hover:rotate-90 hover:bg-white/30"
            onClick={() => {
              playSound('click');
              onClose();
            }}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-60 bg-gray-100 rounded-lg border-2 border-comic-border overflow-hidden mb-4 relative group">
                {project.image ? (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex space-x-2">
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-comic-blue text-white px-3 py-1 rounded-full text-xs flex items-center"
                            onClick={() => playSound('click')}
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
                          >
                            <Github size={12} className="mr-1" /> Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Code size={48} className="text-gray-400" />
                  </div>
                )}
                
                <div className="absolute top-2 right-2">
                  <div className="bg-yellow-500 text-black font-bold px-2 py-1 rounded-lg text-xs rotate-12 shadow-lg">
                    {project.id < 3 ? '🔥 HOT!' : project.id < 5 ? '✨ NEW!' : '🏆 TOP!'}
                  </div>
                </div>
              </div>
              
              <SpeechBubble type="speech" color="green">
                <p className="font-comic text-white">{project.description}</p>
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
                <div className="flex items-center bg-white/10 rounded-lg p-2">
                  <Star size={16} className="text-yellow-400 mr-2" />
                  <span>4.{8 + project.id % 2} Star Rating</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg p-2">
                  <Calendar size={16} className="text-green-400 mr-2" />
                  <span>{new Date().getFullYear() - Math.floor(Math.random() * 3)}</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg p-2">
                  <Award size={16} className="text-purple-400 mr-2" />
                  <span>Featured Project</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg p-2">
                  <Zap size={16} className="text-blue-400 mr-2" />
                  <span>{5 + project.id} Contributors</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-bangers text-3xl text-comic-yellow mb-4 tracking-wider">{project.title}</h2>
              
              <div className="mb-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <h4 className="font-comic font-bold mb-2 text-white">Project Highlights:</h4>
                <ul className="list-disc pl-5 font-comic space-y-1 text-gray-300">
                  <li>Built with {project.skills.map(s => s.name).join(', ')}</li>
                  <li>Implemented responsive design and intuitive UX</li>
                  <li>Optimized for performance and accessibility</li>
                  <li>Successfully deployed with CI/CD pipeline</li>
                  <li>Maintained {90 + project.id}% test coverage</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-comic font-bold text-white">Featured Code Snippet:</h4>
                  <Badge variant="outline" className="bg-comic-blue/20 text-comic-blue border-comic-blue/30">
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
                    className="flex-1 bg-gradient-to-r from-comic-blue to-comic-purple text-white font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-lg shadow-comic-blue/30"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => playSound('click')}
                  >
                    <ExternalLink size={18} /> Live Demo
                  </motion.a>
                )}
                {project.repoUrl && (
                  <motion.a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-lg border border-white/10"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => playSound('click')}
                  >
                    <Github size={18} /> View Code
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailsModal;
