import React, { useState, useEffect, useRef } from 'react';
import Comic3DPanel from './Comic3DPanel';
import { RefreshCw, Play, Code, Download, Share, Copy, Check, Settings, X, HelpCircle, ChevronDown, Terminal } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface CodeSandboxProps {
  title: string;
  initialCode: string;
  language?: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'python' | 'html' | 'java' | 'c' | 'cpp';
  description?: string;
  editorTheme?: 'light' | 'dark';
  defaultExpanded?: boolean;
  showLineNumbers?: boolean;
  height?: string;
}

const CodeSandbox = ({ 
  title, 
  initialCode, 
  language = 'javascript',
  description,
  editorTheme = 'dark',
  defaultExpanded = false,
  showLineNumbers = true,
  height = 'h-48'
}: CodeSandboxProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [executionHistory, setExecutionHistory] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [editorHeight, setEditorHeight] = useState(height);
  const resizeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (defaultExpanded) {
      setEditorHeight('h-96');
    }
  }, [defaultExpanded]);
  
  const runCode = () => {
    setIsRunning(true);
    setError(null);
    playSoundEffect('whoosh');
    
    try {
      // Create a safe execution environment
      const result = getExecutionResult();
      
      // Add to execution history
      setExecutionHistory(prev => [...prev, `Execution at ${new Date().toLocaleTimeString()}\n${result}`]);
      
      setOutput(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setOutput('Error: ' + e.message);
      }
    } finally {
      setIsRunning(false);
    }
  };
  
  const getExecutionResult = () => {
    try {
      // Safety: run in a try-catch to prevent errors from breaking the page
      const sandbox = new Function(`
        try {
          // Capture console output
          const originalConsole = console.log;
          let output = '';
          console.log = (...args) => {
            output += args.join(' ') + '\\n';
            originalConsole(...args);
          };
          
          // Create a safe environment to run user code
          const safeEval = (code) => {
            // Add safety measures for different languages
            if (${JSON.stringify(language)} === 'python') {
              return 'Python code simulation:\\n' + code.split('\\n').map(line => 
                line.startsWith('print') ? line.replace('print(', '').replace(')', '') : null
              ).filter(Boolean).join('\\n');
            }
            
            // Run the actual code for JavaScript/TypeScript
            return eval(code);
          };
          
          // Execute the code
          safeEval(\`${code.replace(/`/g, '\\`')}\`);
          
          // Return captured output
          return output || 'Code executed successfully with no console output';
        } catch (e) {
          return 'Error: ' + e.message;
        }
      `)();
      
      return sandbox;
    } catch (e) {
      if (e instanceof Error) {
        return 'Error: ' + e.message;
      }
      return 'Unknown error occurred';
    }
  };
  
  const resetCode = () => {
    playSoundEffect('click');
    setCode(initialCode);
    setOutput('');
    setError(null);
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    playSoundEffect('click');
    toast.success('Code copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const downloadCode = () => {
    const fileExtension = getFileExtension();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playSoundEffect('click');
    toast.success('Code downloaded successfully!');
  };
  
  const getFileExtension = () => {
    switch (language) {
      case 'javascript': return 'js';
      case 'typescript': return 'ts';
      case 'jsx': return 'jsx';
      case 'tsx': return 'tsx';
      case 'css': return 'css';
      case 'python': return 'py';
      case 'html': return 'html';
      case 'java': return 'java';
      case 'c': return 'c';
      case 'cpp': return 'cpp';
      default: return 'txt';
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    playSoundEffect('click');
    if (!isExpanded) {
      setEditorHeight('h-96');
    } else {
      setEditorHeight(height);
    }
  };
  
  const playSoundEffect = (type: 'click' | 'whoosh' | 'notification') => {
    // We'll implement this in our SoundEffects component
  };
  
  // Handle resize functionality
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartY(e.clientY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - startY;
      const currentHeightValue = parseInt(editorHeight.replace('h-', ''));
      const newHeight = Math.max(32, currentHeightValue + Math.round(deltaY / 4));
      setEditorHeight(`h-${newHeight}`);
      setStartY(e.clientY);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    const resizeElement = resizeRef.current;
    if (resizeElement) {
      resizeElement.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      if (resizeElement) {
        resizeElement.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, editorHeight]);
  
  return (
    <Comic3DPanel 
      title={title} 
      className="w-full h-full"
      headerColor="green"
      depth="deep"
    >
      <div className="space-y-4">
        {description && (
          <motion.p 
            className="font-comic text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-marker text-lg flex items-center">
                <Code size={18} className="mr-1 text-comic-green" />
                Code Editor
                <motion.span 
                  className="ml-2 text-xs text-comic-green bg-comic-green/10 px-2 py-0.5 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {language.toUpperCase()}
                </motion.span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleExpand}
                  className="flex items-center gap-1"
                >
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                  {isExpanded ? 'Collapse' : 'Expand'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetCode}
                  className="flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Reset
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={runCode}
                  className="flex items-center gap-1 bg-comic-green text-white hover:bg-comic-green/80"
                  disabled={isRunning}
                >
                  <Play size={14} /> Run
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full ${editorHeight} font-mono text-sm p-3 border-2 border-comic-border rounded-lg focus:ring-2 focus:ring-comic-blue focus:border-transparent outline-none ${editorTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}
                spellCheck="false"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.5, resize: 'none' }}
              />
              
              <div className="absolute bottom-0 right-0 p-2 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={copyCode}
                  className="w-8 h-8 bg-comic-blue text-white rounded-full flex items-center justify-center shadow-md"
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={downloadCode}
                  className="w-8 h-8 bg-comic-green text-white rounded-full flex items-center justify-center shadow-md"
                >
                  <Download size={16} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="w-8 h-8 bg-comic-orange text-white rounded-full flex items-center justify-center shadow-md"
                >
                  <Settings size={16} />
                </motion.button>
              </div>
              
              <div 
                ref={resizeRef}
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-300 cursor-ns-resize hover:bg-comic-blue rounded-b-lg opacity-50 hover:opacity-100 transition-opacity"
              />
              
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div 
                    className="absolute right-2 bottom-12 bg-white rounded-lg shadow-xl border-2 border-comic-border p-3 z-10 w-64"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Editor Settings</h4>
                      <button 
                        onClick={() => setIsSettingsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm block mb-1">Font Size</label>
                        <div className="flex items-center">
                          <input 
                            type="range" 
                            min="10" 
                            max="24" 
                            value={fontSize} 
                            onChange={(e) => setFontSize(parseInt(e.target.value))} 
                            className="flex-1 mr-2" 
                          />
                          <span className="text-sm w-6">{fontSize}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm block mb-1">Theme</label>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditorTheme('light')} 
                            className={`px-3 py-1 text-xs rounded ${editorTheme === 'light' ? 'bg-comic-blue text-white' : 'bg-gray-100'}`}
                          >
                            Light
                          </button>
                          <button 
                            onClick={() => setEditorTheme('dark')} 
                            className={`px-3 py-1 text-xs rounded ${editorTheme === 'dark' ? 'bg-comic-blue text-white' : 'bg-gray-100'}`}
                          >
                            Dark
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-marker text-lg flex items-center gap-2">
              <Terminal size={18} className="text-comic-blue" /> Output
            </h3>
            <div 
              className={`border-2 border-comic-border rounded-lg ${editorTheme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'} p-3 ${editorHeight} overflow-auto font-mono text-sm whitespace-pre-wrap flex flex-col`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {output ? (
                <div className="flex-1">{output}</div>
              ) : (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    y: [0, -3, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex-1 text-center flex flex-col items-center justify-center"
                >
                  <HelpCircle size={24} className="mb-2 opacity-50" />
                  <span>Click "Run" to see the output here!</span>
                </motion.div>
              )}
            </div>
            {error && (
              <motion.div 
                className="text-red-500 text-xs font-mono mt-1 p-2 bg-red-50 border border-red-200 rounded-md"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="font-bold mb-1 flex items-center">
                  <X size={12} className="mr-1" /> Error:
                </div>
                {error}
              </motion.div>
            )}
            
            {executionHistory.length > 0 && (
              <div className="mt-2">
                <details className="text-xs">
                  <summary className="cursor-pointer font-medium text-gray-500 hover:text-gray-700">
                    Execution History ({executionHistory.length})
                  </summary>
                  <div className="mt-2 border-t pt-2 space-y-2 max-h-40 overflow-auto">
                    {executionHistory.map((result, index) => (
                      <div 
                        key={index} 
                        className="border-l-2 border-comic-blue pl-2 text-xs font-mono whitespace-pre-wrap"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </Comic3DPanel>
  );
};

export default CodeSandbox;
