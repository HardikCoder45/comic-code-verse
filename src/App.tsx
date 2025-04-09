
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
  
  useEffect(() => {
    // Secret key combination listener for Easter egg
    const keys: string[] = [];
    const secretCode = "comic";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > secretCode.length) {
        keys.shift();
      }
      
      if (keys.join('') === secretCode) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
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
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
