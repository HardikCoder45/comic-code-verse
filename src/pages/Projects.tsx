
import React, { useState } from 'react';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import CodeSnippet from '../components/CodeSnippet';
import SpeechBubble from '../components/SpeechBubble';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
          Project Showcase
        </h1>
        
        <div className="mb-8">
          <SpeechBubble>
            <p className="font-comic text-lg">Here's a collection of my coding adventures! Click on any panel to see the code behind it.</p>
          </SpeechBubble>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ComicPanel 
              key={project.id} 
              title={project.title}
              flippable={true}
              backContent={
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="comic-panel-header">Code Peek</h3>
                    <CodeSnippet code={project.codeSnippet} />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="comic-button flex-1 text-center"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="comic-button-secondary flex-1 text-center"
                      >
                        View Code
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
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ComicPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
