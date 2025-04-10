
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeechBubble from './SpeechBubble';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'orange' | 'green' | 'yellow' | 'purple';
  image?: string;
}

interface ComicTimelineProps {
  events: TimelineEvent[];
  title?: string;
}

const ComicTimeline = ({ events, title = "Comic Timeline" }: ComicTimelineProps) => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  return (
    <div className="w-full">
      <h2 className="font-bangers text-2xl md:text-3xl text-comic-purple mb-6 text-center">{title}</h2>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-comic-blue via-comic-pink to-comic-orange"></div>
        
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeEvent === index;
          
          return (
            <div key={index} className={`relative z-10 flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Line connector with circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <motion.div 
                  className={`w-8 h-8 rounded-full border-2 border-black bg-comic-${event.color} flex items-center justify-center cursor-pointer`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveEvent(isActive ? null : index)}
                >
                  {event.icon}
                </motion.div>
              </div>
              
              {/* Date bubble */}
              <div className={`absolute ${isLeft ? 'left-1/2 ml-12' : 'right-1/2 mr-12'} transform ${isLeft ? '-translate-x-1/2' : 'translate-x-1/2'} top-0`}>
                <div className={`bg-comic-${event.color} text-white px-3 py-1 rounded-full font-comic font-bold text-sm`}>
                  {event.year}
                </div>
              </div>
              
              {/* Content panel */}
              <motion.div 
                className={`w-[45%] ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`bg-white border-2 border-comic-border rounded-lg shadow-md overflow-hidden cursor-pointer ${isActive ? 'ring-4 ring-comic-' + event.color : ''}`}
                  onClick={() => setActiveEvent(isActive ? null : index)}
                >
                  {event.image && (
                    <div className="h-40 overflow-hidden">
                      <motion.img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-bangers text-xl mb-2 text-comic-blue">{event.title}</h3>
                    <p className="font-comic text-sm">{event.description}</p>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-dashed border-gray-300"
                        >
                          <SpeechBubble type="thought" color={event.color} position={isLeft ? "right" : "left"}>
                            <p className="font-comic text-sm">This was an important milestone in my journey!</p>
                          </SpeechBubble>
                          
                          <div className="flex justify-end mt-2">
                            <button className={`px-3 py-1 bg-comic-${event.color} text-white rounded-full text-xs font-comic`}>
                              Read More
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicTimeline;
