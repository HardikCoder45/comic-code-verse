
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpeechBubble from './SpeechBubble';

const characterParts = {
  heads: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  ],
  bodies: [
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1526374870839-e155464bb9b2",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
  ]
};

interface CharacterPartSelectorProps {
  partType: 'head' | 'body' | 'accessory';
  currentValue: number;
  onChange: (value: number) => void;
  options: string[];
}

const CharacterPartSelector = ({ partType, currentValue, onChange, options }: CharacterPartSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bangers text-xl mb-2 capitalize">{partType}</h3>
      <div className="flex space-x-4">
        <button 
          className="bg-comic-blue text-white w-8 h-8 rounded-full flex items-center justify-center"
          onClick={() => onChange((currentValue - 1 + options.length) % options.length)}
        >
          ←
        </button>
        
        <div className="flex-1 bg-white border-2 border-comic-border rounded-lg overflow-hidden h-24">
          <motion.div 
            className="w-full h-full bg-center bg-cover" 
            style={{ backgroundImage: `url(${options[currentValue]})` }}
            key={currentValue}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <button 
          className="bg-comic-blue text-white w-8 h-8 rounded-full flex items-center justify-center"
          onClick={() => onChange((currentValue + 1) % options.length)}
        >
          →
        </button>
      </div>
    </div>
  );
};

const ComicCharacterCreator = () => {
  const [character, setCharacter] = useState({
    head: 0,
    body: 0,
    accessory: 0,
    name: 'Code Hero',
    power: 'JavaScript Mastery'
  });
  
  const [showDialog, setShowDialog] = useState(false);
  
  const handlePartChange = (part: 'head' | 'body' | 'accessory', value: number) => {
    setCharacter(prev => ({ ...prev, [part]: value }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter(prev => ({ ...prev, [name]: value }));
  };
  
  const generateCharacter = () => {
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 5000);
  };
  
  return (
    <div className="border-4 border-comic-border rounded-xl bg-comic-background p-6 max-w-lg mx-auto">
      <h2 className="font-bangers text-3xl text-comic-purple mb-6 text-center">Character Creator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CharacterPartSelector 
            partType="head"
            currentValue={character.head}
            onChange={(value) => handlePartChange('head', value)}
            options={characterParts.heads}
          />
          
          <CharacterPartSelector 
            partType="body"
            currentValue={character.body}
            onChange={(value) => handlePartChange('body', value)}
            options={characterParts.bodies}
          />
          
          <CharacterPartSelector 
            partType="accessory"
            currentValue={character.accessory}
            onChange={(value) => handlePartChange('accessory', value)}
            options={characterParts.accessories}
          />
        </div>
        
        <div>
          <div className="bg-white border-2 border-comic-border rounded-lg p-4 mb-6">
            <h3 className="font-bangers text-xl mb-4">Character Stats</h3>
            
            <div className="mb-4">
              <label className="block font-comic text-sm mb-1">Character Name</label>
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={handleInputChange}
                className="w-full border-2 border-comic-border rounded px-3 py-2 font-comic"
              />
            </div>
            
            <div className="mb-4">
              <label className="block font-comic text-sm mb-1">Super Power</label>
              <input
                type="text"
                name="power"
                value={character.power}
                onChange={handleInputChange}
                className="w-full border-2 border-comic-border rounded px-3 py-2 font-comic"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="block font-comic text-xs mb-1">Speed</label>
                <div className="h-4 bg-gray-200 rounded-full">
                  <div className="h-full bg-comic-green rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
              <div>
                <label className="block font-comic text-xs mb-1">Strength</label>
                <div className="h-4 bg-gray-200 rounded-full">
                  <div className="h-full bg-comic-orange rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
              <div>
                <label className="block font-comic text-xs mb-1">Intelligence</label>
                <div className="h-4 bg-gray-200 rounded-full">
                  <div className="h-full bg-comic-blue rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
              <div>
                <label className="block font-comic text-xs mb-1">Charisma</label>
                <div className="h-4 bg-gray-200 rounded-full">
                  <div className="h-full bg-comic-pink rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={generateCharacter}
              className="comic-button w-full flex items-center justify-center"
            >
              Generate Hero
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="font-comic text-xs text-gray-500">Click to generate your coding superhero!</p>
          </div>
        </div>
      </div>
      
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl border-4 border-comic-border p-6 max-w-md relative"
          >
            <button 
              className="absolute top-2 right-2 w-8 h-8 bg-comic-pink text-white rounded-full"
              onClick={() => setShowDialog(false)}
            >
              ×
            </button>
            
            <h3 className="font-bangers text-2xl text-comic-blue mb-4 text-center">Meet {character.name}!</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="h-24 bg-center bg-cover rounded border-2 border-comic-border" style={{ backgroundImage: `url(${characterParts.heads[character.head]})` }}></div>
              <div className="h-24 bg-center bg-cover rounded border-2 border-comic-border" style={{ backgroundImage: `url(${characterParts.bodies[character.body]})` }}></div>
              <div className="h-24 bg-center bg-cover rounded border-2 border-comic-border" style={{ backgroundImage: `url(${characterParts.accessories[character.accessory]})` }}></div>
            </div>
            
            <SpeechBubble type="shout" color="yellow">
              <p className="font-comic text-center">
                <span className="font-bold">{character.name}</span> has been created with the power of {character.power}!
              </p>
            </SpeechBubble>
            
            <div className="text-center mt-4">
              <p className="font-comic text-sm">Your hero is ready to tackle any coding challenge!</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ComicCharacterCreator;
