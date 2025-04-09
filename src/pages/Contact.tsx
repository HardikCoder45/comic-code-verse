
import React, { useState } from 'react';
import ComicPanel from '../components/ComicPanel';
import SpeechBubble from '../components/SpeechBubble';
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Message Sent!",
      description: "Your cosmic transmission has been received!",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen w-full pl-20 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
          Send a Signal
        </h1>
        
        <div className="mb-8">
          <SpeechBubble>
            <p className="font-comic text-lg">Want to team up on a project or just say hello? Drop me a message!</p>
          </SpeechBubble>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ComicPanel title="Contact Form">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-marker mb-1 text-comic-blue">
                  Your Alias
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-comic-blue font-comic"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-marker mb-1 text-comic-blue">
                  Communication Channel (Email)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-comic-blue font-comic"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-marker mb-1 text-comic-blue">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-comic-blue font-comic resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="comic-button w-full"
              >
                Transmit Message
              </button>
            </form>
          </ComicPanel>
          
          <ComicPanel title="Other Ways to Connect">
            <div className="space-y-6">
              <div>
                <h3 className="font-marker text-xl mb-3 text-comic-pink">Social Networks</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-2 font-comic hover:text-comic-blue transition-colors">
                    <div className="w-10 h-10 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-sm">GH</span>
                    </div>
                    <span>GitHub</span>
                  </a>
                  
                  <a href="#" className="flex items-center space-x-2 font-comic hover:text-comic-blue transition-colors">
                    <div className="w-10 h-10 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-sm">LI</span>
                    </div>
                    <span>LinkedIn</span>
                  </a>
                  
                  <a href="#" className="flex items-center space-x-2 font-comic hover:text-comic-blue transition-colors">
                    <div className="w-10 h-10 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-sm">TW</span>
                    </div>
                    <span>Twitter</span>
                  </a>
                  
                  <a href="#" className="flex items-center space-x-2 font-comic hover:text-comic-blue transition-colors">
                    <div className="w-10 h-10 bg-comic-blue rounded-full flex items-center justify-center border-2 border-black">
                      <span className="font-bangers text-white text-sm">DEV</span>
                    </div>
                    <span>Dev.to</span>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-marker text-xl mb-3 text-comic-yellow">Direct Contact</h3>
                <div className="space-y-2">
                  <p className="font-comic flex items-center space-x-2">
                    <span className="font-bangers text-comic-blue">✉</span>
                    <span>hello@example.com</span>
                  </p>
                  <p className="font-comic flex items-center space-x-2">
                    <span className="font-bangers text-comic-blue">🌐</span>
                    <span>www.example.com</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <SpeechBubble type="thought">
                  <p className="font-comic">Looking forward to collaborating on exciting projects!</p>
                </SpeechBubble>
              </div>
            </div>
          </ComicPanel>
        </div>
      </div>
    </div>
  );
};

export default Contact;
