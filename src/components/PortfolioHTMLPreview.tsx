
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, Code, Eye } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PortfolioHTMLPreviewProps {
  htmlCode: string;
}

const PortfolioHTMLPreview: React.FC<PortfolioHTMLPreviewProps> = ({ htmlCode }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const { playSound } = useSound();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    playSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Reset copied state when HTML code changes
    setCopied(false);
  }, [htmlCode]);

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
          
          {activeTab === 'code' && (
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
          )}
        </div>
        
        <TabsContent value="preview" className="flex-grow overflow-auto p-0 m-0">
          <div className="w-full h-full overflow-auto bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-md mx-auto max-w-4xl">
              <iframe
                srcDoc={htmlCode}
                title="Portfolio Preview"
                className="w-full h-[600px] rounded-md"
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
            >
              {htmlCode}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioHTMLPreview;
