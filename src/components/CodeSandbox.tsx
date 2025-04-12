
import React, { useState, useEffect } from 'react';
import Comic3DPanel from './Comic3DPanel';
import { RefreshCw, Play, Code } from 'lucide-react';
import CodeSnippet from './CodeSnippet';
import { Button } from '@/components/ui/button';

interface CodeSandboxProps {
  title: string;
  initialCode: string;
  language?: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'python';
  description?: string;
}

const CodeSandbox = ({ 
  title, 
  initialCode, 
  language = 'javascript',
  description
}: CodeSandboxProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const runCode = () => {
    setIsRunning(true);
    setError(null);
    playSoundEffect('whoosh');
    
    try {
      // Safety: run in a try-catch to prevent errors from breaking the page
      const result = new Function(`
        try {
          // Capture console output
          const originalConsole = console.log;
          let output = '';
          console.log = (...args) => {
            output += args.join(' ') + '\\n';
            originalConsole(...args);
          };
          
          ${code}
          
          // Return captured output
          return output;
        } catch (e) {
          return 'Error: ' + e.message;
        }
      `)();
      
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
  
  const resetCode = () => {
    playSoundEffect('click');
    setCode(initialCode);
    setOutput('');
    setError(null);
  };
  
  const playSoundEffect = (type: 'click' | 'whoosh' | 'notification') => {
    // We'll implement this in our SoundEffects component
  };
  
  return (
    <Comic3DPanel 
      title={title} 
      className="w-full h-full"
      headerColor="green"
      depth="deep"
    >
      <div className="space-y-4">
        {description && <p className="font-comic text-sm">{description}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-marker text-lg">Code Editor</h3>
              <div className="flex gap-2">
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
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 font-mono text-sm p-3 border-2 border-comic-border rounded-lg focus:ring-2 focus:ring-comic-blue focus:border-transparent outline-none"
              spellCheck="false"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-marker text-lg flex items-center gap-2">
              <Code size={18} /> Output
            </h3>
            <div className="border-2 border-comic-border rounded-lg bg-gray-100 p-3 h-48 overflow-auto font-mono text-sm whitespace-pre-wrap">
              {output || 'Click "Run" to see the output here!'}
            </div>
            {error && (
              <div className="text-red-500 text-xs font-mono mt-1">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </Comic3DPanel>
  );
};

export default CodeSandbox;
