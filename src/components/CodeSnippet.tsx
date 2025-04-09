
import React from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet = ({ code, language = 'javascript' }: CodeSnippetProps) => {
  return (
    <div className="code-block">
      <pre><code>{code}</code></pre>
    </div>
  );
};

export default CodeSnippet;
