
import React from 'react';
import { motion } from 'framer-motion';

interface ComicLoadingProps {
  message?: string;
}

const ComicLoading = ({ message = "Loading comic universe..." }: ComicLoadingProps) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md text-center">
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-t-comic-blue border-r-comic-pink border-b-comic-yellow border-l-comic-green rounded-full"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="font-bangers text-xl text-comic-blue">HA</span>
          </div>
        </motion.div>
        
        <motion.p 
          className="font-comic text-xl mb-2 text-black"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
};

export default ComicLoading;
