
import React from 'react';
import { motion } from 'framer-motion';

interface ComicLoadingProps {
  message?: string;
}

const ComicLoading = ({ message = "Loading..." }: ComicLoadingProps) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md text-center">
        <motion.div 
          className="w-16 h-16 mx-auto mb-4 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-t-comic-blue border-r-comic-pink border-b-comic-yellow border-l-comic-green rounded-full"></div>
        </motion.div>
        
        <motion.p 
          className="font-comic text-lg mb-2 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
};

export default ComicLoading;
