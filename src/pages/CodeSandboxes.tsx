
import React, { useEffect } from 'react';
import CodeSandbox from '../components/CodeSandbox';
import SpeechBubble from '../components/SpeechBubble';
import { useSoundEffects } from '../hooks/useSoundEffects';

const CodeSandboxes = () => {
  const { playSound } = useSoundEffects();

  useEffect(() => {
    playSound('transition');
  }, []);

  const codeExamples = [
    {
      title: "JavaScript Animation Loop",
      language: "javascript" as const,
      description: "A simple animation loop that counts up to 10.",
      code: `// Simple counter animation
let count = 0;
const interval = setInterval(() => {
  console.log("Count: " + count);
  count++;
  if (count > 10) {
    clearInterval(interval);
    console.log("Animation complete!");
  }
}, 500);

// The output will appear gradually
console.log("Animation started...");`
    },
    {
      title: "React Component Example",
      language: "jsx" as const,
      description: "Example of a React functional component.",
      code: `// Example React component
function Greeting({ name }) {
  console.log("Rendering Greeting component");
  
  // Simple state example
  const fullGreeting = React.useMemo(() => {
    console.log("Computing greeting...");
    return \`Hello, \${name}! Welcome to our comic world.\`;
  }, [name]);
  
  console.log(fullGreeting);
  
  // Return JSX
  return fullGreeting;
}

// Test it
console.log(Greeting({name: "Comic Fan"}));`
    },
    {
      title: "CSS Animation in JavaScript",
      language: "javascript" as const,
      description: "Create a simple CSS animation with JavaScript.",
      code: `// Simulate a CSS animation in JavaScript
const colors = [
  "red", "orange", "yellow", 
  "green", "blue", "indigo", "violet"
];

console.log("🎨 CSS Animation Simulator 🎨");
console.log("--------------------------");

// Animate through colors
let frameCount = 0;
const animation = setInterval(() => {
  const colorIndex = frameCount % colors.length;
  const color = colors[colorIndex];
  
  console.log(\`Frame \${frameCount}: Element color is \${color}\`);
  
  frameCount++;
  if (frameCount > 10) {
    clearInterval(animation);
    console.log("--------------------------");
    console.log("✨ Animation complete! ✨");
  }
}, 300);`
    }
  ];

  return (
    <div className="min-h-screen w-full py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bangers text-5xl text-comic-blue mb-6 text-center">
          Interactive Code Sandboxes
        </h1>
        
        <SpeechBubble type="speech" position="right" color="yellow" className="mb-8">
          <p className="font-comic">
            Welcome to my interactive code playground! Feel free to modify the code examples and click "Run" to see them in action. These are live sandboxes where you can experiment with JavaScript, React, and CSS animations!
          </p>
        </SpeechBubble>
        
        <div className="grid grid-cols-1 gap-8">
          {codeExamples.map((example, index) => (
            <CodeSandbox
              key={index}
              title={example.title}
              initialCode={example.code}
              language={example.language}
              description={example.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeSandboxes;
