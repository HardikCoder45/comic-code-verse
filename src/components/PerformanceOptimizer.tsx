
import React, { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Component for lazy loading and performance optimization
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Delay non-critical operations
    const delayNonCritical = () => {
      // Mark ready for hydration
      setIsReady(true);
      
      // Add listener for future navigations
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Preload critical assets
      preloadCriticalAssets();
      
      // Optimize animations
      optimizeAnimations();
    };
    
    // Handle visibility change for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause non-essential operations when tab is not visible
        document.body.classList.add('performance-mode');
      } else {
        // Resume operations when tab becomes visible
        document.body.classList.remove('performance-mode');
      }
    };
    
    // Preload critical assets
    const preloadCriticalAssets = () => {
      // Preload key images and fonts
      const preloadLinks = [
        { rel: 'preload', href: '/paper-texture.jpg', as: 'image' },
        // Add more critical assets as needed
      ];
      
      preloadLinks.forEach(link => {
        const linkEl = document.createElement('link');
        linkEl.rel = link.rel;
        linkEl.href = link.href;
        linkEl.as = link.as;
        document.head.appendChild(linkEl);
      });
    };
    
    // Optimize animations
    const optimizeAnimations = () => {
      // Check if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
      }
      
      // Use requestAnimationFrame for smooth animations
      const tick = () => {
        if (!document.hidden) {
          // Only run animations when tab is visible
          // This is a hook for potential animation optimizations
        }
        requestAnimationFrame(tick);
      };
      
      requestAnimationFrame(tick);
    };
    
    // Schedule non-critical operations
    if (window.requestIdleCallback) {
      // Use requestIdleCallback if available
      window.requestIdleCallback(() => delayNonCritical());
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(delayNonCritical, 1);
    }
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return (
    <>
      {/* Add global styles for performance optimizations */}
      <style>
        {`
          .performance-mode .non-essential {
            will-change: auto !important;
            animation-play-state: paused !important;
          }
          
          .reduce-motion * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        `}
      </style>
      
      {/* Render children once ready */}
      {isReady ? children : 
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      }
    </>
  );
};

export default PerformanceOptimizer;
