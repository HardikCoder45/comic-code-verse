
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
import './styles/animations.css';

// Performance optimization
if (import.meta.env.PROD) {
  console.log('Production mode - optimizing performance');
} else {
  console.log('Development mode - detailed logs enabled');
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
