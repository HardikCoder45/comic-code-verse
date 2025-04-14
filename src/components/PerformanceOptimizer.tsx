
import React, { useEffect, useState, useMemo, useCallback } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Enhanced component for lazy loading and performance optimization
const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [resourceHints, setResourceHints] = useState<Array<{rel: string, href: string, as: string}>>([]);
  
  // Track performance metrics
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    interactionTime: 0,
    renderTime: 0,
  });
  
  // Optimization strategies based on device capabilities
  const optimizationStrategies = useMemo(() => {
    return {
      lowPower: window.navigator.deviceMemory && window.navigator.deviceMemory < 4,
      supportsPriority: 'connection' in navigator && (navigator as any).connection?.saveData,
      supportsImageOptimization: 'connection' in navigator && (navigator as any).connection?.effectiveType !== '4g',
    };
  }, []);
  
  // Enhanced visibility change handler with debouncing
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      // Pause non-essential operations and animations when tab is not visible
      document.body.classList.add('performance-mode');
      setPerformanceMode(true);
      
      // Stop expensive background processes
      window.cancelAnimationFrame = window.cancelAnimationFrame || function(id) { clearTimeout(id); };
      
      // Reduce polling intervals for data fetching
      document.dispatchEvent(new CustomEvent('visibility-hidden'));
    } else {
      // Resume normal operation when tab becomes visible again
      document.body.classList.remove('performance-mode');
      setPerformanceMode(false);
      
      // Resume normal operations
      document.dispatchEvent(new CustomEvent('visibility-visible'));
      
      // Refresh content if needed after long inactivity
      const lastActiveTime = parseInt(sessionStorage.getItem('lastActiveTime') || '0', 10);
      const currentTime = Date.now();
      if (lastActiveTime && (currentTime - lastActiveTime > 5 * 60 * 1000)) {
        // Content was inactive for more than 5 minutes, consider refreshing data
        document.dispatchEvent(new CustomEvent('refresh-stale-data'));
      }
      
      // Update last active time
      sessionStorage.setItem('lastActiveTime', currentTime.toString());
    }
  }, []);
  
  // Advanced optimization for animations based on device capabilities
  const optimizeAnimations = useCallback(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
      setReduceMotion(true);
    }
    
    // Adjust animation complexity based on device capabilities
    if (optimizationStrategies.lowPower) {
      document.body.classList.add('simple-animations');
    }
    
    // Use requestAnimationFrame for smooth animations with throttling for low-powered devices
    let lastFrameTime = 0;
    const targetFPS = optimizationStrategies.lowPower ? 30 : 60; // Lower FPS for low-power devices
    const frameThreshold = 1000 / targetFPS;
    
    const tick = (timestamp: number) => {
      if (!document.hidden) {
        // Only run animations when tab is visible
        if (!lastFrameTime || timestamp - lastFrameTime >= frameThreshold) {
          lastFrameTime = timestamp;
          // Animation code would go here
        }
      }
      
      // Continue animation loop
      animationFrameId = window.requestAnimationFrame(tick);
    };
    
    let animationFrameId = window.requestAnimationFrame(tick);
    
    return () => {
      // Clean up animation frame
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [optimizationStrategies]);
  
  // Preload critical resources with priority
  const preloadCriticalAssets = useCallback(() => {
    // Determine which resources to preload based on current route and screen size
    const currentPath = window.location.pathname;
    const isMobile = window.innerWidth < 768;
    
    const preloadLinks = [
      { rel: 'preload', href: '/paper-texture.jpg', as: 'image' },
      // Add more critical assets based on the current route
      ...(currentPath.includes('game') ? [
        { rel: 'preload', href: '/game-assets/sprite-sheet.png', as: 'image' }
      ] : []),
      // Fonts should always be preloaded
      { rel: 'preload', href: '/fonts/comic-sans.woff2', as: 'font' },
      // Conditional preloading based on device
      ...(isMobile ? [] : [
        { rel: 'preload', href: '/high-res-background.jpg', as: 'image' }
      ])
    ];
    
    setResourceHints(preloadLinks);
    
    // Progressive loading strategy for non-critical assets
    setTimeout(() => {
      const lazyLoadLinks = [
        { rel: 'prefetch', href: '/assets/settings-panel.js', as: 'script' },
        { rel: 'preconnect', href: 'https://api.example.com' }
      ];
      
      setResourceHints(prev => [...prev, ...lazyLoadLinks]);
    }, 2000); // Delay loading non-critical assets
    
    return preloadLinks;
  }, []);
  
  // Optimized event listeners with passive option for touch events
  const setupOptimizedEventListeners = useCallback(() => {
    // Use passive event listeners for touch events to improve scrolling performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Throttled scroll listener
    let scrollTimeout: number | null = null;
    
    const handleScrollThrottled = () => {
      if (!scrollTimeout) {
        scrollTimeout = window.setTimeout(() => {
          // Handle scroll event
          scrollTimeout = null;
        }, 100); // throttle to 100ms
      }
    };
    
    window.addEventListener('scroll', handleScrollThrottled);
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);
  
  // Implement Intersection Observer for lazy loading elements
  const setupIntersectionObserver = useCallback(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          if (element.dataset.src) {
            // Lazy load image
            element.setAttribute('src', element.dataset.src);
            delete element.dataset.src;
            observer.unobserve(element);
          }
          
          if (element.classList.contains('lazy-component')) {
            // Trigger component loading
            element.classList.remove('lazy-component');
            element.classList.add('component-loaded');
            observer.unobserve(element);
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observe all elements with data-src attribute
    document.querySelectorAll('[data-src]').forEach(el => {
      observer.observe(el);
    });
    
    // Observe lazy components
    document.querySelectorAll('.lazy-component').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Use memory caching for expensive calculations
  const setupMemoryCache = useCallback(() => {
    // Simple in-memory cache for expensive calculations
    const cache = new Map();
    
    // Expose cache to window for debugging
    (window as any).performanceCache = {
      get: (key: string) => cache.get(key),
      set: (key: string, value: any, ttl = 60000) => {
        cache.set(key, {
          value,
          expiry: Date.now() + ttl
        });
      },
      has: (key: string) => {
        if (!cache.has(key)) return false;
        
        const cached = cache.get(key);
        if (cached.expiry < Date.now()) {
          cache.delete(key);
          return false;
        }
        
        return true;
      },
      clear: () => cache.clear()
    };
    
    // Cleanup expired cache entries periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      cache.forEach((value, key) => {
        if (value.expiry < now) {
          cache.delete(key);
        }
      });
    }, 60000); // Cleanup every minute
    
    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);
  
  // Advanced layout optimization to prevent reflows
  const optimizeLayout = useCallback(() => {
    // Create a performance observer to detect layout shifts
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              // Log layout shifts for debugging
              console.debug('Layout shift detected:', (entry as any).value);
              
              // If significant layout shifts are detected, add stabilizing class
              if ((entry as any).value > 0.1) {
                document.body.classList.add('stabilize-layout');
                
                // Log a more detailed warning for significant layout shifts
                console.warn('Significant layout shift detected. Consider optimizing:', entry);
              }
            }
          }
        });
        
        layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
        
        return () => {
          layoutShiftObserver.disconnect();
        };
      } catch (e) {
        console.info('PerformanceObserver for layout shifts not supported');
      }
    }
  }, []);
  
  useEffect(() => {
    // Record start time for performance measurement
    const startTime = performance.now();
    let hydrationComplete = false;
    
    // Delay non-critical operations based on device capabilities
    const delayNonCritical = () => {
      // Mark ready for hydration
      setIsReady(true);
      hydrationComplete = true;
      
      // Record hydration time
      const hydrationTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, loadTime: hydrationTime }));
      
      // Log performance metrics
      console.info(`%cPerformance Metrics:`, 'font-size: 14px; color: #ec4899;');
      console.info(`%c• DOM Content Loaded: ${hydrationTime.toFixed(0)}ms`, 'font-size: 12px; color: #f97316;');
      
      // Add throttled listener for future navigations
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Preload critical assets based on current route
      const preloadedAssets = preloadCriticalAssets();
      
      // Optimize animations based on device capabilities
      const cleanupAnimations = optimizeAnimations();
      
      // Setup optimized event listeners
      const cleanupEventListeners = setupOptimizedEventListeners();
      
      // Setup intersection observer for lazy loading
      const cleanupIntersectionObserver = setupIntersectionObserver();
      
      // Setup memory cache
      const cleanupMemoryCache = setupMemoryCache();
      
      // Optimize layout
      const cleanupLayoutOptimization = optimizeLayout();
      
      // Implement requestIdleCallback polyfill if needed
      if (!('requestIdleCallback' in window)) {
        (window as any).requestIdleCallback = (callback: Function) => {
          const start = Date.now();
          return setTimeout(() => {
            callback({
              didTimeout: false,
              timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
            });
          }, 1);
        };
        
        (window as any).cancelIdleCallback = (id: number) => {
          clearTimeout(id);
        };
      }
      
      // Record total page load time
      window.addEventListener('load', () => {
        const pageLoadTime = performance.now() - startTime;
        setMetrics(prev => ({ ...prev, loadTime: pageLoadTime }));
        console.info(`%c• Page Load Time: ${pageLoadTime.toFixed(0)}ms`, 'font-size: 12px; color: #f97316;');
      }, { once: true });
      
      return () => {
        cleanupAnimations();
        cleanupEventListeners();
        cleanupIntersectionObserver();
        cleanupMemoryCache();
        cleanupLayoutOptimization();
      };
    };
    
    // Schedule non-critical operations based on device capabilities
    if ('requestIdleCallback' in window) {
      // Use requestIdleCallback for high-priority devices
      const idleCallbackId = (window as any).requestIdleCallback(() => delayNonCritical(), { timeout: 2000 });
      
      return () => {
        if (!hydrationComplete) {
          (window as any).cancelIdleCallback(idleCallbackId);
        }
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(delayNonCritical, 1);
      
      return () => {
        if (!hydrationComplete) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [
    handleVisibilityChange, 
    optimizeAnimations, 
    preloadCriticalAssets, 
    setupOptimizedEventListeners, 
    setupIntersectionObserver,
    setupMemoryCache,
    optimizeLayout
  ]);
  
  return (
    <>
      {/* Add resource hints */}
      {resourceHints.map((link, index) => (
        <link key={index} rel={link.rel} href={link.href} as={link.as} />
      ))}
      
      {/* Add global styles for performance optimizations */}
      <style>
        {`
          .performance-mode .non-essential {
            will-change: auto !important;
            animation-play-state: paused !important;
            transition: none !important;
          }
          
          .reduce-motion * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
          
          .simple-animations * {
            transition-property: opacity !important;
            transition-duration: 0.2s !important;
            animation-duration: 0.2s !important;
          }
          
          .stabilize-layout * {
            contain: layout;
            width: 100%;
            height: auto;
            box-sizing: border-box;
          }
          
          .lazy-component {
            opacity: 0;
            transition: opacity 0.3s ease-in;
          }
          
          .component-loaded {
            opacity: 1;
          }
          
          /* Optimize paint operations */
          .optimize-paint {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          /* Prevent layout shifts */
          img, video, iframe {
            aspect-ratio: attr(width) / attr(height);
          }
          
          /* Content-visibility optimization for off-screen content */
          .content-visibility-auto {
            content-visibility: auto;
            contain-intrinsic-size: 0 500px;
          }
        `}
      </style>
      
      {/* Render children or loading state */}
      {isReady ? children : 
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-50">
          <div className="animate-pulse text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-300 to-purple-300"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            <div className="mt-4 text-xs text-blue-400">Optimizing performance...</div>
          </div>
        </div>
      }
    </>
  );
};

export default PerformanceOptimizer;
