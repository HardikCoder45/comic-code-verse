
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Badge, Trophy, Star, Medal, Crown, Gift } from 'lucide-react';
import PageTurner from './PageTurner';
import { useSound } from '../contexts/SoundContext';

interface AwardItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  issuer: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: string;
  image?: string;
}

const AwardsShowcase: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const { playSound } = useSound();
  
  const awardsPerPage = 3;
  const totalPages = Math.ceil(awards.length / awardsPerPage);
  
  const handlePageTurn = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleAwardClick = (award: AwardItem) => {
    playSound('click');
    setSelectedAward(award);
  };
  
  const currentAwards = awards.slice(
    (currentPage - 1) * awardsPerPage, 
    currentPage * awardsPerPage
  );
  
  return (
    <div className="w-full h-full relative">
      <h2 className="text-3xl font-bangers text-center text-comic-blue mb-8">
        <Trophy className="inline-block mr-2 text-yellow-500" size={28} />
        My Awards & Achievements
      </h2>
      
      <div className="h-[calc(100%-8rem)]">
        <PageTurner 
          pageNumber={currentPage} 
          totalPages={totalPages}
          onPageTurn={handlePageTurn}
        >
          <div className="grid grid-cols-1 gap-8">
            {currentAwards.map((award) => (
              <motion.div
                key={award.id}
                className="bg-white shadow-lg rounded-xl p-6 border-2 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: getLevelColor(award.level)
                }}
                onClick={() => handleAwardClick(award)}
              >
                {/* Background pattern based on award level */}
                <div 
                  className="absolute top-0 right-0 bottom-0 w-1/3 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${getLevelColorHex(award.level)}' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover'
                  }}
                />
                
                <div className="flex">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 shrink-0 ${getLevelBgColor(award.level)}`}
                  >
                    {award.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bangers mb-2 text-comic-blue">
                      {award.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      {award.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {award.category}
                      </span>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{award.date}</span>
                        <span className="mx-2">•</span>
                        <span>{award.issuer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Level indicator */}
                <div className="absolute top-2 right-2">
                  <div 
                    className={`px-2 py-0.5 rounded-full text-xs ${getLevelTextColor(award.level)}`}
                  >
                    {award.level.charAt(0).toUpperCase() + award.level.slice(1)}
                  </div>
                </div>
                
                {/* Click for details hint */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  Click for details
                </div>
              </motion.div>
            ))}
          </div>
        </PageTurner>
      </div>
      
      {/* Award detail modal */}
      {selectedAward && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedAward(null)}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl p-6 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={() => setSelectedAward(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div 
                className={`w-full md:w-1/3 rounded-xl p-6 flex items-center justify-center ${getLevelBgColor(selectedAward.level)}`}
              >
                <div className="w-32 h-32 relative">
                  {selectedAward.icon}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {selectedAward.icon}
                  </motion.div>
                </div>
              </div>
              
              <div className="flex-1 p-4">
                <h2 className="text-2xl font-bangers text-comic-blue mb-2">
                  {selectedAward.title}
                </h2>
                
                <div 
                  className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${getLevelTextColor(selectedAward.level)}`}
                >
                  {selectedAward.level.charAt(0).toUpperCase() + selectedAward.level.slice(1)} Level Award
                </div>
                
                <p className="text-gray-600 mb-4">
                  {selectedAward.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Category</div>
                    <div className="text-gray-700">{selectedAward.category}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Date Received</div>
                    <div className="text-gray-700">{selectedAward.date}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Issuing Organization</div>
                    <div className="text-gray-700">{selectedAward.issuer}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Award ID</div>
                    <div className="text-gray-700">#{selectedAward.id.toString().padStart(4, '0')}</div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <motion.button
                    className="bg-comic-blue text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAward(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Utility functions for award levels
const getLevelColor = (level: string): string => {
  switch (level) {
    case 'bronze': return '#cd7f32';
    case 'silver': return '#c0c0c0';
    case 'gold': return '#ffd700';
    case 'platinum': return '#e5e4e2';
    default: return '#c0c0c0';
  }
};

const getLevelColorHex = (level: string): string => {
  switch (level) {
    case 'bronze': return 'cd7f32';
    case 'silver': return 'c0c0c0';
    case 'gold': return 'ffd700';
    case 'platinum': return 'e5e4e2';
    default: return 'c0c0c0';
  }
};

const getLevelBgColor = (level: string): string => {
  switch (level) {
    case 'bronze': return 'bg-amber-100';
    case 'silver': return 'bg-gray-100';
    case 'gold': return 'bg-yellow-100';
    case 'platinum': return 'bg-blue-50';
    default: return 'bg-gray-100';
  }
};

const getLevelTextColor = (level: string): string => {
  switch (level) {
    case 'bronze': return 'bg-amber-100 text-amber-800';
    case 'silver': return 'bg-gray-100 text-gray-700';
    case 'gold': return 'bg-yellow-100 text-yellow-800';
    case 'platinum': return 'bg-blue-50 text-blue-800';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Sample awards data
const awards: AwardItem[] = [
  {
    id: 1,
    title: "Best Portfolio Design",
    description: "Awarded for exceptional portfolio design combining aesthetics and usability in a creative presentation.",
    icon: <Award size={32} className="text-yellow-600" />,
    date: "March 15, 2025",
    issuer: "Design Awards International",
    level: 'gold',
    category: 'Design Excellence'
  },
  {
    id: 2,
    title: "Frontend Development Achievement",
    description: "Recognition for mastery in frontend technologies including React, TypeScript, and modern CSS frameworks.",
    icon: <Badge size={32} className="text-blue-600" />,
    date: "January 10, 2025",
    issuer: "Web Development Association",
    level: 'platinum',
    category: 'Technical Excellence'
  },
  {
    id: 3,
    title: "Creative Coding Challenge Winner",
    description: "First place in the annual Creative Coding Challenge for innovative use of web technologies.",
    icon: <Trophy size={32} className="text-amber-600" />,
    date: "February 28, 2025",
    issuer: "CodeCraft Foundation",
    level: 'gold',
    category: 'Coding Competition'
  },
  {
    id: 4,
    title: "UI/UX Innovation Medal",
    description: "Awarded for pioneering new approaches to user interface design and interaction patterns.",
    icon: <Medal size={32} className="text-gray-600" />,
    date: "November 5, 2024",
    issuer: "UX Design Alliance",
    level: 'silver',
    category: 'Innovation'
  },
  {
    id: 5,
    title: "Performance Optimization Champion",
    description: "Recognition for exceptional work in optimizing web application performance and load times.",
    icon: <Crown size={32} className="text-yellow-600" />,
    date: "October 12, 2024",
    issuer: "Web Performance Consortium",
    level: 'gold',
    category: 'Technical Excellence'
  },
  {
    id: 6,
    title: "Accessible Design Commendation",
    description: "Awarded for creating highly accessible digital experiences that work for all users regardless of ability.",
    icon: <Star size={32} className="text-blue-600" />,
    date: "August 20, 2024",
    issuer: "Digital Accessibility Foundation",
    level: 'bronze',
    category: 'Accessibility'
  },
  {
    id: 7,
    title: "Emerging Talent Recognition",
    description: "Highlighted as an emerging talent in the field of digital portfolio design and development.",
    icon: <Gift size={32} className="text-pink-600" />,
    date: "July 3, 2024",
    issuer: "Next Generation Creators",
    level: 'silver',
    category: 'Rising Talent'
  },
  {
    id: 8,
    title: "Interactive Portfolio Excellence",
    description: "Awarded for creating highly engaging and interactive portfolio experiences that showcase skills effectively.",
    icon: <Award size={32} className="text-purple-600" />,
    date: "May 18, 2024",
    issuer: "Interactive Media Awards",
    level: 'platinum',
    category: 'Interactivity'
  }
];

export default AwardsShowcase;
