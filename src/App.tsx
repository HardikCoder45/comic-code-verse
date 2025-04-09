
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";

// Components
import ComicSidebar from "./components/ComicSidebar";
import ComicStripNavigation from "./components/ComicStripNavigation";
import InteractiveAvatar from "./components/InteractiveAvatar";
import ComicLoading from "./components/ComicLoading";
import ChatBot from "./components/ChatBot";

// Pages
import Landing from "./pages/Landing";
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [secondEasterEgg, setSecondEasterEgg] = useState(false);
  
  useEffect(() => {
    // Secret key combination listener for Easter egg
    const keys: string[] = [];
    const secretCode = "comic";
    const secondCode = "hero";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > 5) {
        keys.shift();
      }
      
      const currentCode = keys.join('');
      if (currentCode === secretCode) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
      } else if (currentCode === secondCode) {
        setSecondEasterEgg(true);
        setTimeout(() => setSecondEasterEgg(false), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showEasterEgg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-lg border-4 border-comic-border max-w-xl">
                <h2 className="font-bangers text-3xl text-comic-pink mb-4">Easter Egg Found!</h2>
                <p className="font-comic mb-4">You've discovered the secret code! Here's a special message just for you:</p>
                <div className="p-4 bg-comic-background rounded-lg border-2 border-comic-border mb-4">
                  <p className="font-marker text-lg">Thanks for exploring my comic portfolio so thoroughly! As a reward, try typing "hero" for another surprise!</p>
                </div>
                <button 
                  onClick={() => setShowEasterEgg(false)}
                  className="comic-button w-full"
                >
                  Continue Adventure
                </button>
              </div>
            </div>
          )}
          
          {secondEasterEgg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-lg border-4 border-comic-border max-w-xl overflow-hidden relative">
                <div className="absolute -top-10 -left-10 text-9xl font-bangers text-comic-yellow opacity-10">!</div>
                <div className="absolute -bottom-10 -right-10 text-9xl font-bangers text-comic-pink opacity-10">!</div>
                
                <h2 className="font-bangers text-3xl text-comic-green mb-4">Hero Mode Activated!</h2>
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-center bg-cover rounded-full border-4 border-comic-border animate-pulse"></div>
                </div>
                <p className="font-comic mb-4 text-center">You've unlocked the secret hero mode! You now have access to special developer powers!</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-xs">DEBUG</span>
                    </div>
                    <p className="font-comic text-xs mt-1">Debug Vision</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-comic-pink rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-xs">CODE</span>
                    </div>
                    <p className="font-comic text-xs mt-1">Code Speed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-comic-green rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-xs">FIX</span>
                    </div>
                    <p className="font-comic text-xs mt-1">Bug Crusher</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSecondEasterEgg(false)}
                  className="comic-button-secondary w-full"
                >
                  Return to Civilian Mode
                </button>
              </div>
            </div>
          )}
          
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={
              <div className="min-h-screen w-full flex relative">
                <ComicSidebar />
                <Suspense fallback={<ComicLoading />}>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </Suspense>
                <ComicStripNavigation />
                <InteractiveAvatar />
                <ChatBot />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
