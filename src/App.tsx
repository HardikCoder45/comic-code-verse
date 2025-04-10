
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
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={
              <div className="min-h-screen w-full flex relative">
                <ComicSidebar />
                <Suspense fallback={<ComicLoading message="Loading awesome comic panels..." />}>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/home" element={<Home />} />
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
