
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import ComicPanel from './ComicPanel';
import Comic3DPanel from './Comic3DPanel';
import { Clock, Calendar, Award, Code, Zap, BookOpen } from 'lucide-react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  skills: string[];
  achievement?: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
}

const timeline: TimelineEvent[] = [
  {
    year: 2018,
    title: 'Beginning the Journey',
    description: 'Started learning web development with HTML, CSS, and JavaScript fundamentals.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    achievement: 'Built first static website',
    icon: <BookOpen size={24} />,
    color: 'blue'
  },
  {
    year: 2019,
    title: 'Diving into Frameworks',
    description: 'Explored React and Node.js, building full-stack applications and RESTful APIs.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    achievement: 'Launched first full-stack application',
    icon: <Code size={24} />,
    color: 'green'
  },
  {
    year: 2020,
    title: 'Frontend Mastery',
    description: 'Expanded frontend skills with TypeScript, Next.js, and advanced React patterns.',
    skills: ['TypeScript', 'Next.js', 'Redux'],
    achievement: 'Created production-grade e-commerce site',
    icon: <Zap size={24} />,
    color: 'pink'
  },
  {
    year: 2021,
    title: 'Backend & DevOps',
    description: 'Strengthened backend knowledge and implemented CI/CD pipelines for automated deployment.',
    skills: ['PostgreSQL', 'Docker', 'CI/CD'],
    achievement: 'Built microservice architecture',
    icon: <Award size={24} />,
    color: 'orange'
  },
  {
    year: 2022,
    title: 'Mobile & Cloud',
    description: 'Expanded into mobile development with React Native and cloud services with AWS.',
    skills: ['React Native', 'AWS', 'Firebase'],
    achievement: 'Launched first mobile app',
    icon: <Calendar size={24} />,
    color: 'purple'
  },
  {
    year: 2023,
    title: 'AI Integration',
    description: 'Integrated AI/ML into applications to create smarter, more responsive experiences.',
    skills: ['AI/ML', 'TensorFlow.js', 'GPT Integration'],
    achievement: 'Built AI-powered recommendation system',
    icon: <Clock size={24} />,
    color: 'yellow'
  }
];

// Get all unique skills from the timeline
const getAllSkillsFromTimeline = () => {
  const allSkills = new Set<string>();
  timeline.forEach(event => {
    event.skills.forEach(skill => allSkills.add(skill));
  });
  return Array.from(allSkills);
};

const TimeTravel = () => {
  const [selectedYear, setSelectedYear] = useState<number>(timeline[timeline.length - 1].year);
  const [isAnimating, setIsAnimating] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState<string[]>([]);
  
  // Find the current event based on selected year
  const currentEvent = timeline.find(event => event.year === selectedYear) || timeline[0];
  
  // Filter all skills data to show only those acquired up to the selected year
  const getSkillsForYear = (year: number) => {
    return skills.filter(skill => {
      if (!skill.learningPath) return false;
      const firstLearned = skill.learningPath[0]?.year;
      return firstLearned && firstLearned <= year;
    });
  };
  
  const acquiredSkills = getSkillsForYear(selectedYear);
  
  // Update visible skills when year changes
  useEffect(() => {
    setIsAnimating(true);
    // Show skills progressively
    const allSkills = currentEvent.skills;
    setSkillsVisible([]);
    
    allSkills.forEach((skill, index) => {
      setTimeout(() => {
        setSkillsVisible(prev => [...prev, skill]);
      }, index * 300);
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, allSkills.length * 300 + 500);
  }, [selectedYear]);
  
  const handleYearChange = (year: number) => {
    if (year !== selectedYear) {
      setSelectedYear(year);
    }
  };
  
  return (
    <div className="min-h-screen pl-20 py-8 px-4 md:px-8 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="font-bangers text-5xl text-comic-blue text-center drop-shadow-md mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Clock className="inline-block mr-2 text-comic-pink" />
          Time Travel Portfolio
          <Clock className="inline-block ml-2 text-comic-pink" />
        </motion.h1>
        
        {/* Year slider */}
        <div className="mb-12 relative">
          <div className="h-4 bg-gray-200 rounded-full mx-auto mb-8 relative">
            {timeline.map((event, index) => (
              <motion.button
                key={event.year}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black cursor-pointer ${
                  selectedYear === event.year ? `bg-comic-${event.color} text-white` : 'bg-white text-black'
                }`}
                style={{ 
                  left: `${(index / (timeline.length - 1)) * 100}%`,
                  top: '50%'
                }}
                whileHover={{ y: -5, scale: 1.2 }}
                onClick={() => handleYearChange(event.year)}
              >
                {event.year}
              </motion.button>
            ))}
            
            {/* Timeline line with animated progress */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-comic-blue via-comic-pink to-comic-purple rounded-full"
              style={{ 
                width: `${((timeline.findIndex(e => e.year === selectedYear)) / (timeline.length - 1)) * 100}%`
              }}
              initial={{ width: 0 }}
              animate={{ 
                width: `${((timeline.findIndex(e => e.year === selectedYear)) / (timeline.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Year markers */}
          <div className="flex justify-between mb-8">
            {timeline.map((event) => (
              <div 
                key={event.year} 
                className="text-center"
                style={{ 
                  opacity: selectedYear === event.year ? 1 : 0.5,
                }}
              >
                <span className="font-bangers text-lg">{event.year}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current year event display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Comic3DPanel 
              title={currentEvent.title} 
              headerColor={currentEvent.color}
              depth="deep"
              spotlightEffect={true}
            >
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-comic-${currentEvent.color} flex items-center justify-center text-white mr-4`}>
                    {currentEvent.icon}
                  </div>
                  <div>
                    <h3 className="font-bangers text-2xl text-black">{currentEvent.year}</h3>
                    <p className="text-gray-600 font-comic">{currentEvent.title}</p>
                  </div>
                </div>
                
                <p className="text-black mb-6 font-comic">{currentEvent.description}</p>
                
                {currentEvent.achievement && (
                  <div className="mb-6 bg-yellow-100 border-2 border-black rounded-lg p-3 animate-pulse">
                    <div className="flex items-center">
                      <Award className="mr-2 text-yellow-600" />
                      <h4 className="font-bangers text-xl text-black">Achievement Unlocked!</h4>
                    </div>
                    <p className="text-black font-comic">{currentEvent.achievement}</p>
                  </div>
                )}
                
                <h4 className="font-bangers text-xl text-black mb-4">Skills Acquired:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentEvent.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: skillsVisible.includes(skill) ? 1 : 0, 
                        scale: skillsVisible.includes(skill) ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`px-3 py-1 rounded-full bg-comic-${
                        ['blue', 'pink', 'green', 'orange', 'purple', 'yellow'][index % 6]
                      } text-white font-comic text-sm font-bold border-2 border-black`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Comic3DPanel>
          </motion.div>
        </AnimatePresence>
        
        {/* Skill progression visualization */}
        <div className="mb-12">
          <h2 className="font-bangers text-3xl text-comic-blue mb-6">Skill Tree Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {acquiredSkills.slice(0, 6).map((skill, index) => (
              <ComicPanel
                key={skill.name}
                title={skill.name}
                headerColor={skill.color}
                className="animate-pop"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            level <= skill.level ? `bg-comic-${skill.color}` : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4 text-black">{skill.description}</p>
                  
                  {skill.learningPath && (
                    <div className="mt-auto">
                      <h4 className="font-bangers text-sm text-gray-700 mb-2">Learning Journey:</h4>
                      <div className="space-y-1">
                        {skill.learningPath
                          .filter(milestone => milestone.year <= selectedYear)
                          .map((milestone, mIndex) => (
                            <motion.div 
                              key={mIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: mIndex * 0.1 }}
                              className="flex items-center"
                            >
                              <span className="w-5 h-5 rounded-full bg-comic-blue text-white flex items-center justify-center text-xs mr-2">
                                {mIndex + 1}
                              </span>
                              <span className="text-xs font-comic text-black">
                                <span className="font-bold">{milestone.year}:</span> {milestone.milestone}
                              </span>
                            </motion.div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ComicPanel>
            ))}
          </div>
        </div>
        
        {/* Keyboard controls guide */}
        <div className="mt-8 bg-black/5 rounded-lg p-4 border-2 border-black">
          <h3 className="font-bangers text-xl text-black mb-2">Keyboard Controls:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center font-bangers bg-white mr-2">
                ←
              </div>
              <span className="text-sm text-black">Previous Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center font-bangers bg-white mr-2">
                →
              </div>
              <span className="text-sm text-black">Next Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center font-bangers bg-white mr-2">
                ↑
              </div>
              <span className="text-sm text-black">Skill Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 border-2 border-black rounded flex items-center justify-center font-bangers bg-white mr-2">
                Space
              </div>
              <span className="text-sm text-black">Achievement Details</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add keyboard event listeners */}
      <KeyboardControls
        onLeft={() => {
          const currentIndex = timeline.findIndex(e => e.year === selectedYear);
          if (currentIndex > 0) {
            handleYearChange(timeline[currentIndex - 1].year);
          }
        }}
        onRight={() => {
          const currentIndex = timeline.findIndex(e => e.year === selectedYear);
          if (currentIndex < timeline.length - 1) {
            handleYearChange(timeline[currentIndex + 1].year);
          }
        }}
      />
    </div>
  );
};

// Keyboard controls component
const KeyboardControls = ({ onLeft, onRight }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onLeft();
          break;
        case 'ArrowRight':
          onRight();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onLeft, onRight]);
  
  return null;
};

export default TimeTravel;
