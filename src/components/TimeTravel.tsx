
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, BookOpen, Code, Briefcase, Lightbulb } from 'lucide-react';
import ComicPanel from './ComicPanel';
import SpeechBubble from './SpeechBubble';

// Timeline data
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'skill' | 'achievement';
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2018,
    title: "Started Coding Journey",
    description: "Began learning HTML, CSS, and JavaScript basics. Built my first static website.",
    type: "education",
    icon: <BookOpen size={24} />,
    color: "blue"
  },
  {
    year: 2019,
    title: "First React Project",
    description: "Learned React and built a weather app that consumed a public API.",
    type: "project",
    icon: <Code size={24} />,
    color: "green"
  },
  {
    year: 2020,
    title: "Freelance Web Developer",
    description: "Started freelancing, building websites for small businesses and startups.",
    type: "work",
    icon: <Briefcase size={24} />,
    color: "orange"
  },
  {
    year: 2021,
    title: "Full Stack Development",
    description: "Expanded skill set to include Node.js, Express, MongoDB, and built several MERN stack applications.",
    type: "skill",
    icon: <Lightbulb size={24} />,
    color: "yellow"
  },
  {
    year: 2022,
    title: "Open Source Contribution",
    description: "Started contributing to open source projects. My PR to a popular UI library was merged.",
    type: "achievement",
    icon: <Award size={24} />,
    color: "purple"
  },
  {
    year: 2023,
    title: "Tech Lead Role",
    description: "Promoted to Tech Lead, managing a team of developers and architecting solutions.",
    type: "work",
    icon: <Briefcase size={24} />,
    color: "pink"
  },
  {
    year: 2024,
    title: "AI Integration Expert",
    description: "Specialized in integrating AI solutions into web applications, including LLMs and computer vision.",
    type: "skill",
    icon: <Lightbulb size={24} />,
    color: "blue"
  }
];

const TimeTravel: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);

  // Filter events for the current year
  const currentEvents = timelineEvents.filter(event => event.year === currentYear);
  const yearsAvailable = Array.from(new Set(timelineEvents.map(event => event.year))).sort();
  const currentYearIndex = yearsAvailable.indexOf(currentYear);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsKeyboardActive(true);
      setTimeout(() => setIsKeyboardActive(false), 1000);

      if (e.key === 'ArrowLeft' && currentYearIndex > 0) {
        setCurrentYear(yearsAvailable[currentYearIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentYearIndex < yearsAvailable.length - 1) {
        setCurrentYear(yearsAvailable[currentYearIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentYear, currentYearIndex, yearsAvailable]);

  const handlePrevYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYear(yearsAvailable[currentYearIndex - 1]);
    }
  };

  const handleNextYear = () => {
    if (currentYearIndex < yearsAvailable.length - 1) {
      setCurrentYear(yearsAvailable[currentYearIndex + 1]);
    }
  };

  // Calculate timeline UI positions
  const calculatePosition = (index: number) => {
    const position = ((index / (yearsAvailable.length - 1)) * 100);
    return `${position}%`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bangers text-comic-blue mb-2">TIME TRAVEL PORTFOLIO</h1>
        <SpeechBubble type="speech" color="blue" position="top" className="inline-block">
          <p className="font-comic">Travel through my career timeline! Use keyboard arrows ← → or buttons to navigate</p>
        </SpeechBubble>
      </div>

      {/* Keyboard indicator */}
      {isKeyboardActive && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-black bg-opacity-80 text-white px-6 py-4 rounded-lg font-comic text-xl animate-fade-in">
            Keyboard Navigation Active!
          </div>
        </div>
      )}

      {/* Timeline UI */}
      <div className="relative h-24 mb-12 bg-gray-100 rounded-xl border-2 border-comic-border overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="relative w-full h-2 bg-gray-300">
            {yearsAvailable.map((year, index) => (
              <button
                key={year}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full 
                  ${year === currentYear 
                    ? 'bg-comic-green border-2 border-black z-10 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-500'
                  } 
                  transition-all duration-300`}
                style={{ left: calculatePosition(index), top: '50%' }}
                onClick={() => setCurrentYear(year)}
                aria-label={`Go to year ${year}`}
              >
                <span className="absolute text-xs font-bold text-white">{year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Year labels */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="relative w-full h-8">
            {yearsAvailable.map((year, index) => (
              <div 
                key={`label-${year}`} 
                className={`absolute transform -translate-x-1/2 font-bangers text-lg
                  ${year === currentYear ? 'text-comic-blue scale-125' : 'text-gray-500'}`}
                style={{ left: calculatePosition(index) }}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={handlePrevYear}
          disabled={currentYearIndex === 0}
          className="comic-button-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous year"
        >
          <ChevronLeft size={24} />
          <span className="ml-1">Previous</span>
        </button>
        <div className="text-4xl font-bangers text-comic-blue px-6 py-2 border-4 border-comic-blue rounded-xl bg-white">
          {currentYear}
        </div>
        <button
          onClick={handleNextYear}
          disabled={currentYearIndex === yearsAvailable.length - 1}
          className="comic-button-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next year"
        >
          <span className="mr-1">Next</span>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Year events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentEvents.map((event, index) => (
          <div
            key={`${event.year}-${event.title}`}
            className="animate-pop"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ComicPanel
              title={event.title}
              headerColor={event.color}
              className="h-full"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-comic-${event.color} text-white`}>
                  {event.icon}
                </div>
                <div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-bold">
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-black">{event.description}</p>
                </div>
              </div>
            </ComicPanel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTravel;
