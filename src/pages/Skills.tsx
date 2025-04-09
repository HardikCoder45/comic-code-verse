
import React, { useState } from 'react';
import ComicPanel from '../components/ComicPanel';
import SkillBadge from '../components/SkillBadge';
import SpeechBubble from '../components/SpeechBubble';
import { skills } from '../data/skills';

const SkillLevel = ({ level }: { level: number }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`w-4 h-4 rounded-full border border-black ${
            i <= level ? 'bg-comic-blue' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Powers' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'other', name: 'Other' }
  ];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
          Super Powers
        </h1>
        
        <div className="mb-8">
          <SpeechBubble>
            <p className="font-comic text-lg">Every hero needs their powers! Here are the technologies and skills in my arsenal.</p>
          </SpeechBubble>
        </div>
        
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full border-2 border-black font-bangers transition-all ${
                selectedCategory === category.id
                  ? 'bg-comic-blue text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-comic-blue hover:bg-comic-blue hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="animate-pop" style={{ animationDelay: `${index * 0.1}s` }}>
              <ComicPanel title={skill.name}>
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <SkillBadge name={skill.name} color={skill.color} animated={false} />
                  </div>
                  
                  <p className="font-comic mb-4">{skill.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-marker text-sm">Power Level:</span>
                    <SkillLevel level={skill.level} />
                  </div>
                </div>
              </ComicPanel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
