
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Crown, Star, Badge, Gift } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import PageTurner from '../components/PageTurner';
import AwardsShowcase from '../components/AwardsShowcase';

const Awards = () => {
  const { playSound } = useSound();
  const [currentSection, setCurrentSection] = useState<'personal' | 'professional' | 'featured'>('featured');
  
  const handleSectionChange = (section: 'personal' | 'professional' | 'featured') => {
    playSound('click');
    setCurrentSection(section);
  };
  
  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <motion.h1 
          className="text-4xl font-bangers text-center text-comic-blue"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Trophy className="inline-block mr-2 text-yellow-500" size={32} />
          Portfolio Awards & Achievements
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Showcasing the recognition and milestones achieved throughout my professional journey.
          Each award represents dedication, innovation, and excellence in the field.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-6 space-x-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'featured' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('featured')}
          >
            <Star className="inline-block mr-1" size={16} />
            Featured
          </button>
          
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'professional' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('professional')}
          >
            <Badge className="inline-block mr-1" size={16} />
            Professional
          </button>
          
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              currentSection === 'personal' 
                ? 'bg-comic-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleSectionChange('personal')}
          >
            <Trophy className="inline-block mr-1" size={16} />
            Personal
          </button>
        </motion.div>
      </div>
      
      <div className="h-[calc(100%-10rem)]">
        <motion.div 
          className="w-full h-full"
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {currentSection === 'featured' && (
            <AwardsShowcase />
          )}
          
          {currentSection === 'professional' && (
            <div className="w-full h-full p-4">
              <PageTurner pageNumber={1} totalPages={3}>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bangers text-comic-blue mb-4">Professional Achievements</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {professionalAwards.map((award, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 bg-blue-50 p-2 rounded-full">
                            {award.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{award.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                            <div className="mt-2 text-xs text-gray-500">{award.date}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PageTurner>
            </div>
          )}
          
          {currentSection === 'personal' && (
            <div className="w-full h-full p-4">
              <PageTurner pageNumber={1} totalPages={2}>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bangers text-comic-blue mb-4">Personal Achievements</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {personalAwards.map((award, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 bg-purple-50 p-2 rounded-full">
                            {award.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{award.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                            <div className="mt-2 text-xs text-gray-500">{award.date}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PageTurner>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Sample data for professional awards
const professionalAwards = [
  {
    title: "Best Web Developer Award",
    description: "Recognized for exceptional contributions to web development projects and innovative solutions.",
    date: "October 2024",
    icon: <Trophy size={24} className="text-yellow-500" />
  },
  {
    title: "Performance Optimization Champion",
    description: "Awarded for improving application performance by 70% through advanced optimization techniques.",
    date: "August 2024",
    icon: <Medal size={24} className="text-gray-500" />
  },
  {
    title: "Frontend Excellence Award",
    description: "Recognized for creating outstanding user interfaces with attention to detail and accessibility.",
    date: "July 2024",
    icon: <Crown size={24} className="text-yellow-500" />
  },
  {
    title: "Team Collaboration Star",
    description: "Awarded for exceptional teamwork and facilitating effective collaboration across departments.",
    date: "May 2024",
    icon: <Star size={24} className="text-blue-500" />
  },
  {
    title: "Innovation Leader",
    description: "Recognized for introducing new technologies and methodologies that improved development processes.",
    date: "March 2024",
    icon: <Badge size={24} className="text-purple-500" />
  },
  {
    title: "Project Management Excellence",
    description: "Awarded for successfully managing complex projects and delivering results ahead of schedule.",
    date: "January 2024",
    icon: <Award size={24} className="text-green-500" />
  }
];

// Sample data for personal awards
const personalAwards = [
  {
    title: "Hackathon Winner",
    description: "First place in the annual coding competition for creating an innovative accessibility solution.",
    date: "November 2024",
    icon: <Trophy size={24} className="text-yellow-500" />
  },
  {
    title: "Open Source Contributor",
    description: "Recognized for significant contributions to open source projects in the web development community.",
    date: "September 2024",
    icon: <Gift size={24} className="text-pink-500" />
  },
  {
    title: "Digital Art Competition Winner",
    description: "Awarded first prize for creative digital artwork combining programming and visual design.",
    date: "July 2024",
    icon: <Award size={24} className="text-purple-500" />
  },
  {
    title: "Community Teacher Award",
    description: "Recognized for teaching web development skills to underprivileged youth in local communities.",
    date: "May 2024",
    icon: <Badge size={24} className="text-blue-500" />
  },
  {
    title: "Tech Blog Excellence",
    description: "Awarded for maintaining a highly informative technical blog that has helped many developers.",
    date: "March 2024",
    icon: <Star size={24} className="text-orange-500" />
  }
];

export default Awards;
