
import React from 'react';
import ComicPanel from '../components/ComicPanel';
import SpeechBubble from '../components/SpeechBubble';

const About = () => {
  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
          Origin Story
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ComicPanel title="The Beginning">
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-4 border-black mb-4">
                  <span className="font-bangers text-white text-4xl">DEV</span>
                </div>
              </div>
              <SpeechBubble>
                <p className="font-comic">Hello! I'm a passionate developer with a love for creating interactive experiences on the web.</p>
              </SpeechBubble>
            </ComicPanel>
          </div>
          
          <div className="lg:col-span-2">
            <ComicPanel title="The Journey">
              <div className="prose prose-lg font-comic">
                <p>My adventure in coding began when I discovered the power of building digital experiences that people can interact with. What started as curiosity quickly grew into a passion.</p>
                
                <p className="mt-4">Over the years, I've developed expertise in:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Building responsive, user-friendly web applications</li>
                  <li>Creating elegant user interfaces that delight users</li>
                  <li>Solving complex problems with clean, efficient code</li>
                  <li>Learning new technologies and adapting to industry changes</li>
                </ul>
                
                <p className="mt-4">Each project is an opportunity to craft something meaningful and impactful, combining technical expertise with creative vision.</p>
              </div>
            </ComicPanel>
          </div>
        </div>
        
        <div className="mt-8">
          <ComicPanel title="Super Powers & Abilities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-marker text-xl mb-3 text-comic-pink">Technical Skills</h3>
                <ul className="list-disc pl-6 font-comic">
                  <li>Frontend Development (React, TypeScript, CSS)</li>
                  <li>Backend Development (Node.js, Python)</li>
                  <li>Database Design & Management</li>
                  <li>API Development & Integration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-marker text-xl mb-3 text-comic-yellow">Super Abilities</h3>
                <ul className="list-disc pl-6 font-comic">
                  <li>Problem Solving & Analytical Thinking</li>
                  <li>User-Centered Design Focus</li>
                  <li>Continuous Learning & Adaptation</li>
                  <li>Attention to Detail & Clean Code</li>
                </ul>
              </div>
            </div>
          </ComicPanel>
        </div>
        
        <div className="mt-8">
          <ComicPanel title="Secret Identity">
            <div className="prose prose-lg font-comic">
              <p>When not writing code, you might find me:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-green rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-xl">📚</span>
                  </div>
                  <p className="mt-2">Reading tech blogs & books</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-pink rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-xl">🎮</span>
                  </div>
                  <p className="mt-2">Playing video games</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                    <span className="font-bangers text-white text-xl">🚶</span>
                  </div>
                  <p className="mt-2">Exploring nature</p>
                </div>
              </div>
            </div>
          </ComicPanel>
        </div>
      </div>
    </div>
  );
};

export default About;
