
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeSnippetProps {
  code: string;
  language?: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'python';
  showLineNumbers?: boolean;
  maxHeight?: string;
}

const CodeSnippet = ({ 
  code, 
  language = 'javascript', 
  showLineNumbers = true,
  maxHeight = '300px'
}: CodeSnippetProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="code-block overflow-hidden rounded-lg border-2 border-comic-border">
      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs font-medium text-gray-400">{language.toUpperCase()}</span>
      </div>
      <div className={`overflow-auto ${showLineNumbers ? 'line-numbers' : ''}`} style={{ maxHeight }}>
        <pre className="m-0">
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
