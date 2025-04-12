
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

interface Comic3DPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  headerColor?: 'blue' | 'pink' | 'orange' | 'green' | 'yellow' | 'purple';
  depth?: 'normal' | 'deep' | 'shallow';
  spotlightEffect?: boolean;
  interactive3D?: boolean;
}

const Comic3DPanel = ({
  title,
  children,
  className = "",
  backgroundImage,
  headerColor = 'blue',
  depth = 'normal',
  spotlightEffect = false,
  interactive3D = true
}: Comic3DPanelProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { playSound } = useSound();
  
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for tilt effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Get depth effect
  const getDepthStyle = () => {
    switch (depth) {
      case 'deep':
        return { boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.33)' };
      case 'shallow':
        return { boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' };
      default:
        return { boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 8px rgba(0, 0, 0, 0.12)' };
    }
  };
  
  // Header color class
  const getHeaderColorClass = () => {
    switch (headerColor) {
      case 'pink': return 'bg-comic-pink text-white';
      case 'orange': return 'bg-comic-orange text-white';
      case 'green': return 'bg-comic-green text-white';
      case 'yellow': return 'bg-comic-yellow text-black';
      case 'purple': return 'bg-comic-purple text-white';
      default: return 'bg-comic-blue text-white';
    }
  };
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive3D) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
    
    if (spotlightEffect) {
      setMousePosition({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height
      });
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const handleClick = () => {
    playSound('click');
  };
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-4 border-comic-border ${className}`}
      style={{
        ...getDepthStyle(),
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* 3D transform container */}
      <motion.div
        style={{
          rotateX: interactive3D ? rotateX : 0,
          rotateY: interactive3D ? rotateY : 0,
          z: isHovered ? 10 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        className="w-full h-full"
      >
        {/* Pop-in effects for elements */}
        <motion.div 
          className={`comic-panel-header ${getHeaderColorClass()}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onAnimationStart={() => playSound('popIn')}
        >
          <h3 className="font-bangers text-xl">{title}</h3>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className={`p-4 ${backgroundImage ? 'bg-white/70' : 'bg-white'} relative`}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Content container */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Spotlight effect */}
          {spotlightEffect && isHovered && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)`,
                mixBlendMode: 'overlay'
              }}
            />
          )}
        </motion.div>
        
        {/* Corner fold effect */}
        <motion.div 
          className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" 
          style={{ 
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)' 
          }}
          whileHover={{ scale: 1.2, opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      {/* Magic sparkle effects on hover */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white pointer-events-none"
              initial={{ 
                opacity: 1,
                scale: 0,
                x: mousePosition.x * 100 + '%',
                y: mousePosition.y * 100 + '%'
              }}
              animate={{ 
                opacity: [1, 0],
                scale: [0, 1.5],
                x: [
                  mousePosition.x * 100 + '%', 
                  (mousePosition.x * 100 + Math.random() * 40 - 20) + '%'
                ],
                y: [
                  mousePosition.y * 100 + '%', 
                  (mousePosition.y * 100 + Math.random() * 40 - 20) + '%'
                ]
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: i * 0.1
              }}
              onAnimationStart={() => {
                if (i === 0) playSound('twinkle');
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default Comic3DPanel;
