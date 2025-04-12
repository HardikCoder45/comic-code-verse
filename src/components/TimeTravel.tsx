
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, BookOpen, Code, Briefcase, Lightbulb, Rocket, Server, Globe, FileCode, Coffee, Heart, Zap, Star, Wrench, X } from 'lucide-react';
import ComicPanel from './ComicPanel';
import SpeechBubble from './SpeechBubble';

// Timeline data
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'skill' | 'achievement' | 'personal';
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  subEvents?: {
    month: string;
    title: string;
    description: string;
  }[];
  techStack?: string[];
  testimonial?: string;
  impact?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 2016,
    title: "First Steps in Coding",
    description: "Started exploring HTML and CSS. Created my first static webpage for a school project.",
    type: "education",
    icon: <BookOpen size={24} />,
    color: "blue",
    subEvents: [
      {
        month: "May",
        title: "First HTML Page",
        description: "Created a simple HTML page about favorite hobbies"
      },
      {
        month: "September",
        title: "CSS Styling",
        description: "Learned about CSS and styling web pages"
      }
    ],
    techStack: ["HTML", "CSS", "Notepad++"],
    impact: "Sparked my interest in web development and set me on the path to becoming a developer"
  },
  {
    year: 2017,
    title: "JavaScript Fundamentals",
    description: "Learned JavaScript basics through online courses and small projects. Built a simple calculator and a to-do list app.",
    type: "education",
    icon: <FileCode size={24} />,
    color: "green",
    subEvents: [
      {
        month: "February",
        title: "JavaScript Basics",
        description: "Completed an online course on JavaScript fundamentals"
      },
      {
        month: "July",
        title: "First Interactive App",
        description: "Built a calculator app using JavaScript"
      }
    ],
    techStack: ["JavaScript", "HTML", "CSS", "VS Code"],
    impact: "Gained confidence in programming logic and problem-solving"
  },
  {
    year: 2018,
    title: "Web Development Bootcamp",
    description: "Attended an intensive 3-month bootcamp focused on modern web development. Mastered responsive design principles.",
    type: "education",
    icon: <Rocket size={24} />,
    color: "purple",
    subEvents: [
      {
        month: "March",
        title: "Bootcamp Start",
        description: "Began an intensive web development bootcamp"
      },
      {
        month: "June",
        title: "Graduation Project",
        description: "Developed a full-stack e-commerce website as graduation project"
      }
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Git"],
    testimonial: "One of the most dedicated students I've seen. Always going beyond what was required. - Bootcamp Instructor",
    impact: "Transformed from a hobbyist to a professional developer with industry-ready skills"
  },
  {
    year: 2019,
    title: "First React Project",
    description: "Learned React and built a weather app that consumed a public API. Implemented state management with Context API.",
    type: "project",
    icon: <Code size={24} />,
    color: "blue",
    subEvents: [
      {
        month: "February",
        title: "React Learning",
        description: "Started learning React through documentation and tutorials"
      },
      {
        month: "April",
        title: "Weather App Launch",
        description: "Completed and deployed the weather app to GitHub Pages"
      }
    ],
    techStack: ["React", "Context API", "CSS Modules", "Axios", "Weather API"],
    impact: "Gained deep understanding of component-based architecture and modern JavaScript"
  },
  {
    year: 2020,
    title: "Freelance Web Developer",
    description: "Started freelancing, building websites for small businesses and startups. Specialized in responsive, performant designs.",
    type: "work",
    icon: <Briefcase size={24} />,
    color: "orange",
    subEvents: [
      {
        month: "January",
        title: "First Client",
        description: "Built a portfolio website for a local photographer"
      },
      {
        month: "July",
        title: "E-commerce Project",
        description: "Developed an online store for a boutique fashion brand"
      },
      {
        month: "November",
        title: "Client Milestone",
        description: "Reached 10 successful client projects"
      }
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "Stripe", "Netlify"],
    testimonial: "Working with you transformed our online presence. Sales increased by 35% in the first quarter after launch. - E-commerce Client",
    impact: "Developed crucial client communication skills and learned to manage projects independently"
  },
  {
    year: 2021,
    title: "Full Stack Development",
    description: "Expanded skill set to include Node.js, Express, MongoDB, and built several MERN stack applications. Implemented authentication and authorization systems.",
    type: "skill",
    icon: <Server size={24} />,
    color: "yellow",
    subEvents: [
      {
        month: "March",
        title: "Backend Journey",
        description: "Started learning Node.js and Express"
      },
      {
        month: "June",
        title: "Database Skills",
        description: "Mastered MongoDB and Mongoose for data modeling"
      },
      {
        month: "October",
        title: "Full Stack App",
        description: "Built a social media platform for developers with the MERN stack"
      }
    ],
    techStack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "REST APIs"],
    impact: "Became a true full-stack developer capable of building complete applications independently"
  },
  {
    year: 2022,
    title: "Open Source Contribution",
    description: "Started contributing to open source projects. Had my PR to a popular UI library merged. Became an active member of the developer community.",
    type: "achievement",
    icon: <Globe size={24} />,
    color: "green",
    subEvents: [
      {
        month: "February",
        title: "First Contribution",
        description: "Fixed a bug in an open-source React component library"
      },
      {
        month: "May",
        title: "Feature Implementation",
        description: "Added accessibility features to a popular UI framework"
      },
      {
        month: "August",
        title: "Project Maintainer",
        description: "Invited to become a maintainer for a smaller open-source project"
      }
    ],
    techStack: ["React", "TypeScript", "Jest", "GitHub Actions", "Storybook"],
    impact: "Gained recognition in the developer community and improved collaboration skills"
  },
  {
    year: 2022,
    title: "AWS Certification",
    description: "Earned AWS Solutions Architect Associate certification. Implemented serverless architectures for clients.",
    type: "education",
    icon: <Award size={24} />,
    color: "blue",
    subEvents: [
      {
        month: "July",
        title: "Study Start",
        description: "Began structured study plan for AWS certification"
      },
      {
        month: "October",
        title: "Certification Exam",
        description: "Passed the AWS Solutions Architect Associate exam with high score"
      },
      {
        month: "December",
        title: "First Serverless App",
        description: "Deployed a production serverless application using AWS Lambda and API Gateway"
      }
    ],
    techStack: ["AWS Lambda", "DynamoDB", "S3", "API Gateway", "CloudFormation", "IAM"],
    impact: "Opened up new career opportunities in cloud architecture and DevOps"
  },
  {
    year: 2023,
    title: "Tech Lead Role",
    description: "Promoted to Tech Lead, managing a team of developers and architecting solutions for enterprise clients. Implemented CI/CD pipelines and mentored junior developers.",
    type: "work",
    icon: <Star size={24} />,
    color: "pink",
    subEvents: [
      {
        month: "February",
        title: "Promotion",
        description: "Promoted to Tech Lead role at a growing tech company"
      },
      {
        month: "April",
        title: "Team Management",
        description: "Started leading a team of 5 developers on a major project"
      },
      {
        month: "September",
        title: "Process Improvements",
        description: "Implemented new code review and CI/CD processes that reduced bugs by 40%"
      }
    ],
    techStack: ["Docker", "Kubernetes", "Jenkins", "TypeScript", "Agile/Scrum", "Jira"],
    testimonial: "Your leadership transformed our development process. The team is more productive and happier than ever. - CTO",
    impact: "Developed leadership and mentoring skills while deepening technical expertise"
  },
  {
    year: 2023,
    title: "Conference Speaker",
    description: "Gave talks at two developer conferences about modern front-end architecture and performance optimization techniques.",
    type: "achievement",
    icon: <Zap size={24} />,
    color: "purple",
    subEvents: [
      {
        month: "May",
        title: "First Talk",
        description: "Presented on 'React Performance Optimization' at a regional conference"
      },
      {
        month: "November",
        title: "International Conference",
        description: "Invited to speak at an international web development conference"
      }
    ],
    techStack: ["Public Speaking", "React", "Performance Optimization", "Webpack"],
    impact: "Established myself as a thought leader in the front-end community"
  },
  {
    year: 2024,
    title: "AI Integration Expert",
    description: "Specialized in integrating AI solutions into web applications, including LLMs, computer vision, and recommendation systems.",
    type: "skill",
    icon: <Lightbulb size={24} />,
    color: "blue",
    subEvents: [
      {
        month: "January",
        title: "AI Learning Journey",
        description: "Started focused learning on AI and ML integration with web apps"
      },
      {
        month: "March",
        title: "First AI Project",
        description: "Built a content recommendation engine using machine learning"
      },
      {
        month: "June",
        title: "LLM Integration",
        description: "Integrated OpenAI's GPT API into a customer service platform"
      },
      {
        month: "October",
        title: "Computer Vision App",
        description: "Developed an app that analyzes photos for accessibility issues"
      }
    ],
    techStack: ["TensorFlow.js", "OpenAI API", "Python", "HuggingFace", "LangChain", "Vector Databases"],
    impact: "Positioned myself at the forefront of AI integration in web applications"
  },
  {
    year: 2024,
    title: "Personal Achievement",
    description: "Completed a 6-month sabbatical to travel and contribute to humanitarian tech projects. Built water monitoring systems in developing regions.",
    type: "personal",
    icon: <Heart size={24} />,
    color: "pink",
    subEvents: [
      {
        month: "February",
        title: "Sabbatical Start",
        description: "Began a 6-month sabbatical to focus on humanitarian tech projects"
      },
      {
        month: "April",
        title: "Water Monitoring Project",
        description: "Deployed IoT water quality sensors in three communities"
      },
      {
        month: "July",
        title: "Tech Workshop",
        description: "Led coding workshops for young students in rural areas"
      }
    ],
    techStack: ["IoT", "Arduino", "Solar Power", "Low-cost Sensors", "Data Visualization"],
    testimonial: "Your water monitoring system has transformed how we manage our resources. Thank you for making a difference. - Community Leader",
    impact: "Combined technical skills with personal values to create meaningful impact"
  },
  {
    year: 2025,
    title: "Future Plans",
    description: "Working on launching a SaaS product focused on developer productivity tools. Exploring Web3 and blockchain technologies.",
    type: "project",
    icon: <Wrench size={24} />,
    color: "green",
    subEvents: [
      {
        month: "January",
        title: "SaaS Concept",
        description: "Started developing the concept for a developer productivity SaaS"
      },
      {
        month: "March",
        title: "MVP Development",
        description: "Building the minimum viable product with a small team"
      },
      {
        month: "Planned: June",
        title: "Beta Launch",
        description: "Planning to launch beta version to early adopters"
      }
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "GraphQL", "PostgreSQL", "Stripe"],
    impact: "Taking entrepreneurial steps while continuing to advance technical skills"
  }
];

const TimeTravel: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

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
        setSelectedEvent(null);
        setViewMode('list');
      } else if (e.key === 'ArrowRight' && currentYearIndex < yearsAvailable.length - 1) {
        setCurrentYear(yearsAvailable[currentYearIndex + 1]);
        setSelectedEvent(null);
        setViewMode('list');
      } else if (e.key === 'Escape' && viewMode === 'detail') {
        setSelectedEvent(null);
        setViewMode('list');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentYear, currentYearIndex, yearsAvailable, viewMode]);

  const handlePrevYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYear(yearsAvailable[currentYearIndex - 1]);
      setSelectedEvent(null);
      setViewMode('list');
    }
  };

  const handleNextYear = () => {
    if (currentYearIndex < yearsAvailable.length - 1) {
      setCurrentYear(yearsAvailable[currentYearIndex + 1]);
      setSelectedEvent(null);
      setViewMode('list');
    }
  };

  const showEventDetail = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setViewMode('detail');
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
          <p className="font-comic text-sm mt-1">Press <kbd className="px-2 py-1 bg-gray-200 rounded">ESC</kbd> to return from detailed view</p>
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
      <div className="relative h-28 mb-12 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-xl border-2 border-comic-border overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="relative w-full h-2 bg-gray-300">
            {yearsAvailable.map((year, index) => (
              <button
                key={year}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full 
                  ${year === currentYear 
                    ? 'bg-comic-green border-2 border-black z-10 scale-125 shadow-lg' 
                    : 'bg-gray-400 hover:bg-gray-500'
                  } 
                  transition-all duration-300`}
                style={{ left: calculatePosition(index), top: '50%' }}
                onClick={() => {
                  setCurrentYear(year);
                  setSelectedEvent(null);
                  setViewMode('list');
                }}
                aria-label={`Go to year ${year}`}
              >
                <span className="absolute text-xs font-bold text-white">{year}</span>
              </button>
            ))}
            
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-comic-blue via-comic-purple to-comic-pink transform -translate-y-1/2"></div>
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
        <div className="text-4xl font-bangers text-comic-blue px-6 py-2 border-4 border-comic-blue rounded-xl bg-white shadow-lg">
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

      {viewMode === 'list' ? (
        /* Year events list view */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentEvents.map((event, index) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              className="animate-pop cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => showEventDetail(event)}
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
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-bold">
                        {event.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-black mb-3">{event.description}</p>
                    
                    {event.techStack && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                            {tech}
                          </span>
                        ))}
                        {event.techStack.length > 3 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                            +{event.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-3 text-right">
                      <span className="inline-block text-sm text-comic-blue font-bold">
                        Click for details →
                      </span>
                    </div>
                  </div>
                </div>
              </ComicPanel>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Detail view */
        selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl border-4 border-comic-border shadow-xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-full bg-comic-${selectedEvent.color} text-white`}>
                  {selectedEvent.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bangers text-comic-blue">{selectedEvent.title}</h2>
                  <span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-bold mt-1">
                    {selectedEvent.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedEvent(null);
                  setViewMode('list');
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-lg mb-6 font-comic">{selectedEvent.description}</p>
            
            {/* Timeline of sub-events */}
            {selectedEvent.subEvents && (
              <div className="my-6">
                <h3 className="text-xl font-bangers text-comic-purple mb-4">Detailed Timeline</h3>
                <div className="relative pl-8 border-l-2 border-dashed border-comic-purple space-y-4">
                  {selectedEvent.subEvents.map((subEvent, index) => (
                    <motion.div 
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-comic-purple transform -translate-x-[calc(0.5rem+1px)]"></div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-bold text-comic-blue">{subEvent.month}</div>
                        <h4 className="font-bangers text-lg">{subEvent.title}</h4>
                        <p className="text-sm">{subEvent.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tech Stack */}
            {selectedEvent.techStack && (
              <div className="mb-6">
                <h3 className="text-xl font-bangers text-comic-green mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Testimonial */}
            {selectedEvent.testimonial && (
              <div className="mb-6">
                <h3 className="text-xl font-bangers text-comic-pink mb-2">Testimonial</h3>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 italic">
                  "{selectedEvent.testimonial}"
                </div>
              </div>
            )}
            
            {/* Impact */}
            {selectedEvent.impact && (
              <div className="mb-6">
                <h3 className="text-xl font-bangers text-comic-orange mb-2">Impact & Learning</h3>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  {selectedEvent.impact}
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => {
                  setSelectedEvent(null);
                  setViewMode('list');
                }}
                className="comic-button-secondary"
              >
                Return to {currentYear} Overview
              </button>
            </div>
          </motion.div>
        )
      )}
      
      {/* Year navigation shortcut */}
      <div className="mt-12 p-4 bg-gray-100 rounded-lg text-center">
        <h3 className="font-bold mb-2">Quick Navigation</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {yearsAvailable.map(year => (
            <button
              key={`quick-${year}`}
              onClick={() => {
                setCurrentYear(year);
                setSelectedEvent(null);
                setViewMode('list');
              }}
              className={`px-3 py-1 rounded-md text-sm 
                ${year === currentYear 
                  ? 'bg-comic-blue text-white font-bold' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTravel;
