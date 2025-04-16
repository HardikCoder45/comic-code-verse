
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Components
import ComicStripNavigation from "./components/ComicStripNavigation";
import InteractiveAvatar from "./components/InteractiveAvatar";
import ComicLoading from "./components/ComicLoading";
import ChatBot from "./components/ChatBot";
import VoiceControl from "./components/VoiceControl";
import PageSlider from "./components/PageSlider";
import BookLayout from "./components/BookLayout";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import EnhancedGameFeatures from "./components/EnhancedGameFeatures";
import AwardsShowcase from "./components/AwardsShowcase";

// Providers
import { SoundProvider } from "./contexts/SoundContext";

// Pages
import Landing from "./pages/Landing";
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CodeSandboxes = lazy(() => import("./pages/CodeSandboxes"));
const Awards = lazy(() => import("./pages/Awards"));

// New interactive features
const TimeTravel = lazy(() => import("./components/TimeTravel"));
const CodeDNA = lazy(() => import("./components/CodeDNA"));
const PortfolioGame = lazy(() => import("./components/PortfolioGame"));
const CustomPortfolio = lazy(() => import("./components/CustomPortfolio"));
const PortfolioGameHub = lazy(() => import("./components/PortfolioGameHub"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SoundProvider>
          <PerformanceOptimizer>
            <Router>
              <Routes>
                <Route path="/" element={<BookLayout isLandingPage={true}><Landing /></BookLayout>} />
                <Route path="/game-hub" element={<PortfolioGameHub />} />
                <Route path="/code-dna" element={<CodeDNA />} />
                <Route path="/awards" element={<AwardsShowcase />} />
                <Route path="*" element={
                  <div className="min-h-screen w-full flex relative bg-blue-50">
                    <Suspense fallback={
                      <div className="flex items-center justify-center w-full h-screen bg-blue-50">
                        <div className="text-center">
                          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-blue-600 font-comic">Loading...</p>
                        </div>
                      </div>
                    }>
                      <main className="flex-1 ml-0 w-full">
                        <BookLayout>
                          <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/show-project/:id" element={<ProjectDetails />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/timeline" element={<TimeTravel />} />
                            <Route path="/code-samples" element={<CodeSandboxes />} />
                            <Route path="/dna" element={<CodeDNA />} />
                            <Route path="/game" element={<PortfolioGame />} />
                            <Route path="/game-features" element={<EnhancedGameFeatures />} />
                            <Route path="/custom-portfolio" element={<CustomPortfolio />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/awards" element={<AwardsShowcase />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </BookLayout>
                      </main>
                    </Suspense>
                    <ComicStripNavigation />
                    <InteractiveAvatar />
                    <VoiceControl />
                    <PageSlider />
                    <ChatBot />
                  </div>
                } />
              </Routes>
            </Router>
          </PerformanceOptimizer>
        </SoundProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
