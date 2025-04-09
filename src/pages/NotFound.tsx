
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import ComicPanel from "../components/ComicPanel";
import SpeechBubble from "../components/SpeechBubble";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full animate-float">
        <ComicPanel title="Page Not Found!">
          <div className="text-center py-8">
            <h2 className="font-bangers text-6xl text-comic-pink mb-4">404</h2>
            <SpeechBubble>
              <p className="font-comic text-lg">Oh no! This page seems to have vanished into another dimension!</p>
            </SpeechBubble>
            
            <div className="mt-8">
              <Link to="/" className="comic-button inline-block">
                Return to Home Base
              </Link>
            </div>
          </div>
        </ComicPanel>
      </div>
    </div>
  );
};

export default NotFound;
