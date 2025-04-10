
import { createRoot } from 'react-dom/client';
import { StrictMode, lazy, Suspense } from 'react';
import App from './App.tsx';
import './index.css';
import './styles/animations.css';
import ComicLoading from './components/ComicLoading';

// Performance optimization with code splitting
const LazyApp = lazy(() => import('./App.tsx'));

// Console styling for branding
const consoleStyles = {
  title: 'font-size: 20px; font-weight: bold; color: #3b82f6;',
  subtitle: 'font-size: 14px; color: #ec4899;',
  text: 'font-size: 12px; color: #f97316;',
};

// Performance metrics tracking
const trackPerformance = () => {
  if (performance && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
          const timing = perfEntries[0];
          console.log('%cPerformance Metrics:', consoleStyles.subtitle);
          console.log(`%c• DOM Content Loaded: ${Math.round(timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart)}ms`, consoleStyles.text);
          console.log(`%c• Page Load Time: ${Math.round(timing.loadEventEnd - timing.fetchStart)}ms`, consoleStyles.text);
        }
      }, 0);
    });
  }
};

// Production vs development environment handling
if (import.meta.env.PROD) {
  console.log('%cCOMIC CODE VERSE - PRODUCTION', consoleStyles.title);
  console.log('%cOptimized for performance and speed!', consoleStyles.subtitle);
  
  // Disable console in production except for errors
  const originalConsole = { ...console };
  console.log = console.info = console.debug = console.warn = () => {};
  console.error = originalConsole.error; // Keep error logging
  
  trackPerformance();
} else {
  console.log('%cCOMIC CODE VERSE - DEVELOPMENT', consoleStyles.title);
  console.log('%cDetailed logs enabled for debugging', consoleStyles.subtitle);
  console.log('%cPress "?" for keyboard shortcuts!', consoleStyles.text);
  
  trackPerformance();
}

// Service worker registration for offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.error('ServiceWorker registration failed: ', err);
      }
    );
  });
}

// Device detection for optimized experience
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

// Apply device-specific classes
if (isMobile) {
  document.documentElement.classList.add('is-mobile-device');
} else {
  document.documentElement.classList.add('is-desktop-device');
}

// Mount the application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<ComicLoading message="Assembling the Comic Code Verse..." />}>
      <LazyApp />
    </Suspense>
  </StrictMode>
);

// Easter egg: Konami code detector
let konamiCodePosition = 0;
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

document.addEventListener('keydown', (e) => {
  // Handle "?" key press for help
  if (e.key === '?') {
    alert('Keyboard Shortcuts:\n\n• ? - Show this help\n• Home - Go to homepage\n• End - Go to contact page\n• 1-5 - Navigate to different sections\n• Konami code - Try it to find out!');
  }
  
  // Konami code detection
  if (e.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    if (konamiCodePosition === konamiCode.length) {
      document.body.classList.add('konami-activated');
      konamiCodePosition = 0;
      alert('🎮 KONAMI CODE ACTIVATED! You\'ve unlocked unlimited coding power!');
    }
  } else {
    konamiCodePosition = 0;
  }
});
