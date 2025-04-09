
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronDown, ChevronUp, Smile } from 'lucide-react';
import SpeechBubble from './SpeechBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! I'm Hardik, your friendly AI assistant. How can I help you today? 😊" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "system",
              content: "Your name is Hardik Arora. You are a friendly, helpful AI assistant with a GitHub at https://github.com/HardikCoder45. Behave like a real person named Hardik Arora. Use emojis occasionally to express emotions. Be conversational, helpful, and friendly."
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: message }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message) {
        const botResponse = { 
          role: 'assistant', 
          content: data.choices[0].message.content 
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('No response from API');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I had trouble connecting. Please try again later! 😅" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="bg-comic-orange text-white rounded-full w-14 h-14 flex items-center justify-center border-2 border-black shadow-md hover:bg-comic-pink transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white border-4 border-comic-border rounded-xl overflow-hidden shadow-xl"
          >
            {/* Chat header */}
            <div className="bg-comic-blue text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-comic-orange rounded-full flex items-center justify-center border-2 border-white mr-2">
                  <span className="font-bangers text-white text-sm">HA</span>
                </div>
                <h3 className="font-comic font-bold">Hardik Arora</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <button 
                  onClick={toggleChat}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            
            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 h-80 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                      <div key={index} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
                        {msg.role === 'user' ? (
                          <div className="inline-block bg-comic-orange text-white p-2 rounded-lg max-w-[80%] break-words">
                            <p className="font-comic">{msg.content}</p>
                          </div>
                        ) : (
                          <SpeechBubble type="speech" color="blue" position="left" className="inline-block max-w-[80%]">
                            <p className="font-comic text-sm">{msg.content}</p>
                          </SpeechBubble>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="mb-3">
                        <div className="inline-block bg-gray-200 p-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat input */}
                  <form onSubmit={handleSubmit} className="p-3 border-t-2 border-comic-border bg-white">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border-2 border-comic-border rounded-lg focus:outline-none focus:ring-2 focus:ring-comic-blue font-comic"
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !message.trim()}
                        className="ml-2 w-10 h-10 bg-comic-green text-white rounded-full flex items-center justify-center border-2 border-black disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
