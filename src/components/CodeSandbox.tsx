
import React, { useState } from 'react';
import { Play, Copy, Download, Refresh, Maximize, ExternalLink } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import ComicPanel from './ComicPanel';
import SpeechBubble from './SpeechBubble';

interface CodeSandboxProps {
  initialCode: string;
  language: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'python';
  title: string;
  description?: string;
  readOnly?: boolean;
  livePreview?: boolean;
  sandboxUrl?: string;
}

const CodeSandbox: React.FC<CodeSandboxProps> = ({
  initialCode,
  language,
  title,
  description,
  readOnly = false,
  livePreview = false,
  sandboxUrl
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-comic-green text-white p-3 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    try {
      // For JavaScript/TypeScript code, we can actually run it
      if (language === 'javascript' || language === 'typescript') {
        // Create a safe environment to run the code
        const originalConsoleLog = console.log;
        let consoleOutput: string[] = [];
        
        // Override console.log to capture output
        console.log = (...args) => {
          consoleOutput.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalConsoleLog(...args);
        };
        
        // Run the code
        try {
          // Use Function constructor to create a function from the code
          const runnable = new Function(code);
          runnable();
          setOutput(consoleOutput.join('\n'));
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        }
        
        // Restore original console.log
        console.log = originalConsoleLog;
      } else {
        // For other languages, just simulate running
        setOutput(`[Preview for ${language} code would appear here in a full environment]`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const openInNewTab = () => {
    if (sandboxUrl) {
      window.open(sandboxUrl, '_blank');
    } else {
      // Create a CodeSandbox or similar URL based on the language
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('language', language);
      
      let url = 'https://codesandbox.io/s/new?';
      if (language === 'javascript' || language === 'typescript' || language === 'jsx' || language === 'tsx') {
        url += 'file=/src/index.' + (language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language === 'jsx' ? 'jsx' : 'tsx');
      } else if (language === 'python') {
        url = 'https://replit.com/languages/python?';
      }
      
      window.open(url + params.toString(), '_blank');
    }
  };

  return (
    <div className={`${showFullscreen ? 'fixed inset-0 z-50 bg-white p-4' : ''}`}>
      <ComicPanel 
        title={title} 
        headerColor="green"
        className={`overflow-hidden transition-all duration-300 ${showFullscreen ? 'h-full' : ''}`}
      >
        {description && (
          <div className="mb-4">
            <SpeechBubble type="speech" color="green" position="left">
              <p className="text-sm text-black">{description}</p>
            </SpeechBubble>
          </div>
        )}
        
        <div className="flex flex-col h-full">
          <div className="flex space-x-2 mb-2">
            <button
              onClick={runCode}
              disabled={isRunning || readOnly}
              className="px-3 py-1 bg-comic-blue text-white rounded-md flex items-center text-sm shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={16} className="mr-1" /> Run
            </button>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-comic-purple text-white rounded-md flex items-center text-sm shadow-md hover:bg-purple-700"
            >
              <Copy size={16} className="mr-1" /> Copy
            </button>
            <button
              onClick={resetCode}
              disabled={code === initialCode || readOnly}
              className="px-3 py-1 bg-comic-orange text-white rounded-md flex items-center text-sm shadow-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Refresh size={16} className="mr-1" /> Reset
            </button>
            <button
              onClick={() => setShowFullscreen(!showFullscreen)}
              className="px-3 py-1 bg-comic-pink text-white rounded-md flex items-center text-sm shadow-md hover:bg-pink-700"
            >
              <Maximize size={16} className="mr-1" /> {showFullscreen ? 'Exit' : 'Fullscreen'}
            </button>
            <button
              onClick={openInNewTab}
              className="px-3 py-1 bg-comic-green text-white rounded-md flex items-center text-sm shadow-md hover:bg-green-700"
            >
              <ExternalLink size={16} className="mr-1" /> Open
            </button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <div className="h-full overflow-hidden">
              {readOnly ? (
                <div className="h-full">
                  <CodeSnippet 
                    code={code} 
                    language={language} 
                    maxHeight={showFullscreen ? 'calc(100vh - 300px)' : '300px'} 
                  />
                </div>
              ) : (
                <div className="border-2 border-comic-border rounded-lg h-full overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-gray-400 text-xs">
                    Edit code here
                  </div>
                  <textarea
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full h-[calc(100%-32px)] p-4 font-mono text-sm bg-gray-900 text-white border-0 resize-none outline-none"
                    style={{ height: showFullscreen ? 'calc(100vh - 300px)' : '300px' }}
                  />
                </div>
              )}
            </div>
            
            {(output || livePreview) && (
              <div className="bg-black rounded-lg overflow-auto">
                <div className="bg-gray-800 px-4 py-2 text-gray-400 text-xs">
                  Output
                </div>
                <pre className="p-4 text-green-400 font-mono text-sm overflow-auto" style={{ height: showFullscreen ? 'calc(100vh - 300px)' : '300px' }}>
                  {isRunning ? 'Running code...' : output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </ComicPanel>
    </div>
  );
};

export default CodeSandbox;
