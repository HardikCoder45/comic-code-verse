
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-4 border-comic-border ${className}`}
      style={{
        ...getDepthStyle(),
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
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
        {/* Header */}
        <div className={`comic-panel-header ${getHeaderColorClass()}`}>
          <h3 className="font-bangers text-xl">{title}</h3>
        </div>
        
        {/* Content */}
        <div 
          className={`p-4 ${backgroundImage ? 'bg-white/70' : 'bg-white'} relative`}
          style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {/* Content container */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Spotlight effect */}
          {spotlightEffect && isHovered && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)`,
                mixBlendMode: 'overlay'
              }}
            />
          )}
        </div>
        
        {/* Corner fold effect */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" 
          style={{ 
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)' 
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Comic3DPanel;
