
import React from 'react';
import { motion } from 'framer-motion';
import CodeSandbox from '../components/CodeSandbox';
import SpeechBubble from '../components/SpeechBubble';

const sampleJavaScript = `// This is a simple JavaScript example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate and print the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci \${i}: \${fibonacci(i)}\`);
}`;

const sampleReactJSX = `// A simple React component example
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

// Note: This code needs a React environment to run
console.log("React Counter component defined!");`;

const sampleCSS = `/* A fun animated button */
.fancy-button {
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff6b6b, #5f27cd);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fancy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, #5f27cd, #ff6b6b);
}`;

const samplePython = `# A simple Python program
def is_prime(num):
    """Check if a number is prime."""
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

# Print the first 10 prime numbers
count = 0
num = 2
prime_list = []

while count < 10:
    if is_prime(num):
        prime_list.append(num)
        count += 1
    num += 1

print(f"First 10 prime numbers: {prime_list}")`;

const CodeSandboxes: React.FC = () => {
  return (
    <div className="min-h-screen w-full py-8 px-4 md:px-8 relative bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="font-bangers text-5xl text-comic-blue text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interactive Code Sandboxes
        </motion.h1>
        
        <div className="mb-8">
          <SpeechBubble type="speech" color="blue" animated>
            <p className="font-comic text-lg text-black">Check out these interactive code examples! You can edit the code and run it right in your browser.</p>
          </SpeechBubble>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CodeSandbox 
              initialCode={sampleJavaScript} 
              language="javascript" 
              title="JavaScript Fibonacci Sequence"
              description="This code calculates the first 10 numbers in the Fibonacci sequence. Try changing the loop to display more numbers!"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CodeSandbox 
              initialCode={sampleReactJSX} 
              language="jsx" 
              title="React JSX Counter Component"
              description="A simple React counter component. Note: This can't be fully executed in this sandbox, but the syntax is highlighted correctly."
              sandboxUrl="https://codesandbox.io/s/react-counter-example-forked-rgc4h3"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CodeSandbox 
              initialCode={sampleCSS} 
              language="css" 
              title="CSS Animated Button"
              description="CSS code for a fancy animated button with hover effects. Use this in your own projects!"
              readOnly={true}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <CodeSandbox 
              initialCode={samplePython} 
              language="python" 
              title="Python Prime Number Generator"
              description="This Python script finds and prints the first 10 prime numbers. Can you modify it to find the first 20?"
              sandboxUrl="https://replit.com/@replit/Python?v=1"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CodeSandboxes;
