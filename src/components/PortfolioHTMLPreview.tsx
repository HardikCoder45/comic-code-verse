
import React, { useState, useEffect, useRef } from 'react';
import { CopyIcon, CheckIcon, Code, Eye, ExternalLink, Download } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface PortfolioHTMLPreviewProps {
  htmlCode: string;
  isStreaming?: boolean;
}

const PortfolioHTMLPreview: React.FC<PortfolioHTMLPreviewProps> = ({ 
  htmlCode,
  isStreaming = false
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const { playSound } = useSound();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    playSound('success');
    setTimeout(() => setCopied(false), 2000);
    toast.success("HTML code copied to clipboard!");
  };

  const downloadHTML = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlCode], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "portfolio.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    playSound('success');
    toast.success("HTML file downloaded successfully!");
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(htmlCode);
      newWindow.document.close();
      playSound('click');
    } else {
      toast.error("Popup blocked! Please allow popups for this site.");
    }
  };

  useEffect(() => {
    // Reset copied state when HTML code changes
    setCopied(false);
  }, [htmlCode]);

  // Automatically scroll to the bottom of the preview container while streaming
  useEffect(() => {
    if (isStreaming && previewContainerRef.current) {
      previewContainerRef.current.scrollTop = previewContainerRef.current.scrollHeight;
    }
  }, [htmlCode, isStreaming]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'code' | 'preview');
    playSound('click');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs 
        defaultValue="preview" 
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full h-full flex flex-col"
      >
        <div className="border-b border-gray-200 px-4 py-2 flex justify-between items-center">
          <TabsList className="grid grid-cols-2 w-64">
            <TabsTrigger 
              value="preview" 
              className="flex items-center gap-2"
              onMouseEnter={() => playSound('hover')}
            >
              <Eye size={16} />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              className="flex items-center gap-2"
              onMouseEnter={() => playSound('hover')}
            >
              <Code size={16} />
              <span>HTML Code</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === 'preview' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={openInNewTab}
                className="text-gray-600 hover:text-gray-900"
                onMouseEnter={() => playSound('hover')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            )}
            
            {activeTab === 'code' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-gray-600 hover:text-gray-900"
                  onMouseEnter={() => playSound('hover')}
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <CopyIcon className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadHTML}
                  className="text-gray-600 hover:text-gray-900"
                  onMouseEnter={() => playSound('hover')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
                </Button>
              </>
            )}
          </div>
        </div>
        
        <TabsContent value="preview" className="flex-grow overflow-auto p-0 m-0">
          <div 
            className={`w-full h-full overflow-auto bg-gray-50 p-4 ${isStreaming ? 'streaming-container' : ''}`}
            ref={previewContainerRef}
          >
            <div className={`bg-white shadow-md rounded-md mx-auto max-w-4xl ${isStreaming ? 'relative' : ''}`}>
              {isStreaming && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                srcDoc={htmlCode}
                title="Portfolio Preview"
                className={`w-full h-[600px] rounded-md ${isStreaming ? 'animate-pulse-subtle' : ''}`}
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="flex-grow overflow-auto p-0 m-0">
          <div className="w-full h-full overflow-auto">
            <SyntaxHighlighter
              language="html"
              style={atomOneLight}
              customStyle={{ margin: 0, borderRadius: 0, height: '100%', fontSize: '14px' }}
              wrapLines={true}
              showLineNumbers={true}
              className={isStreaming ? 'streaming-code' : ''}
            >
              {htmlCode}
            </SyntaxHighlighter>
            {isStreaming && (
              <style>
                {`
                .streaming-code {
                  position: relative;
                }
                
                .streaming-code::after {
                  content: '|';
                  position: absolute;
                  bottom: 0;
                  right: 8px;
                  color: #333;
                  font-weight: 700;
                  animation: cursor-blink 1s infinite;
                }
                
                @keyframes cursor-blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                
                .typing-indicator {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: rgba(255, 255, 255, 0.8);
                  border-radius: 50px;
                  padding: 10px 20px;
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  z-index: 10;
                }
                
                .typing-indicator span {
                  height: 10px;
                  width: 10px;
                  margin: 0 2px;
                  background-color: #3B82F6;
                  display: block;
                  border-radius: 50%;
                  opacity: 0.4;
                }
                
                .typing-indicator span:nth-of-type(1) {
                  animation: pulse 1s infinite ease-in-out;
                }
                
                .typing-indicator span:nth-of-type(2) {
                  animation: pulse 1s infinite ease-in-out .2s;
                }
                
                .typing-indicator span:nth-of-type(3) {
                  animation: pulse 1s infinite ease-in-out .4s;
                }
                
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 0.4; }
                  50% { transform: scale(1.3); opacity: 1; }
                  100% { transform: scale(1); opacity: 0.4; }
                }
                
                .animate-pulse-subtle {
                  animation: pulse-subtle 2s infinite ease-in-out;
                }
                
                @keyframes pulse-subtle {
                  0% { opacity: 0.8; }
                  50% { opacity: 1; }
                  100% { opacity: 0.8; }
                }
                `}
              </style>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioHTMLPreview;
