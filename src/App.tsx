
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

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

// New interactive features
const TimeTravel = lazy(() => import("./components/TimeTravel"));
const CodeDNA = lazy(() => import("./components/CodeDNA"));
const PortfolioGame = lazy(() => import("./components/PortfolioGame"));
const ResumeBuilder = lazy(() => import("./components/ResumeBuilder"));

const queryClient = new QueryClient();

const App = () => {
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
                <Suspense fallback={<ComicLoading message="Loading..." />}>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/skills" element={<Skills />} />
                      <Route path="/timeline" element={<TimeTravel />} />
                      <Route path="/dna" element={<CodeDNA />} />
                      <Route path="/game" element={<PortfolioGame />} />
                      <Route path="/resume" element={<ResumeBuilder />} />
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
