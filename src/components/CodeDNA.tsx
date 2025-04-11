
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import { Dna, GitBranch, Code, Brain, Zap } from 'lucide-react';

interface Node {
  id: string;
  value: number;
  color: string;
  category: string;
  x?: number;
  y?: number;
  targetX?: number;
  targetY?: number;
  vx?: number;
  vy?: number;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

const ColorMap = {
  'blue': '#4A90E2',
  'pink': '#F06292',
  'yellow': '#FFD54F',
  'orange': '#FF9800',
  'green': '#66BB6A',
  'purple': '#AB47BC'
};

const CategoryIconMap = {
  'frontend': <Code size={20} />,
  'backend': <GitBranch size={20} />,
  'database': <Dna size={20} />,
  'devops': <Zap size={20} />,
  'mobile': <GitBranch size={20} />,
  'other': <Brain size={20} />
};

const CodeDNA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Create the nodes and links for the DNA visualization
  const nodes: Node[] = skills.map(skill => ({
    id: skill.name,
    value: skill.level * 2,
    color: ColorMap[skill.color] || '#4A90E2',
    category: skill.category,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0
  }));
  
  // Create connections between related skills
  const links: Link[] = [];
  skills.forEach(skill => {
    if (skill.relatedSkills) {
      skill.relatedSkills.forEach(related => {
        // Only add links where both skills exist
        if (nodes.find(n => n.id === related)) {
          links.push({
            source: skill.name,
            target: related,
            strength: 0.5
          });
        }
      });
    }
  });
  
  const drawDNA = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate gravitational center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Apply forces to nodes
    nodes.forEach(node => {
      // Initialize random positions if not set
      if (!node.x) {
        node.x = Math.random() * canvas.width;
        node.y = Math.random() * canvas.height;
      }
      
      // Gravitational pull to center
      const dx = centerX - node.x;
      const dy = centerY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Skip categories that are not selected (if a category is selected)
      const isFiltered = selectedCategory && node.category !== selectedCategory;
      const gravitationalStrength = isFiltered ? 0.01 : 0.02;
      
      // Apply gravitational force
      node.vx += dx * gravitationalStrength / distance;
      node.vy += dy * gravitationalStrength / distance;
      
      // Apply repulsive forces between nodes
      nodes.forEach(otherNode => {
        if (node.id !== otherNode.id) {
          const nx = otherNode.x - node.x;
          const ny = otherNode.y - node.y;
          const nd = Math.sqrt(nx * nx + ny * ny);
          
          if (nd < 100) {
            const repulsiveForce = isFiltered ? 0.5 : 1;
            node.vx -= nx * repulsiveForce / nd;
            node.vy -= ny * repulsiveForce / nd;
          }
        }
      });
      
      // Apply attractive forces for linked nodes
      links.forEach(link => {
        if (link.source === node.id || link.target === node.id) {
          const otherNodeId = link.source === node.id ? link.target : link.source;
          const otherNode = nodes.find(n => n.id === otherNodeId);
          
          if (otherNode) {
            const lx = otherNode.x - node.x;
            const ly = otherNode.y - node.y;
            const ld = Math.sqrt(lx * lx + ly * ly);
            
            if (ld > 50) {
              const attractiveForce = isFiltered ? 0.001 : 0.005;
              node.vx += lx * attractiveForce;
              node.vy += ly * attractiveForce;
            }
          }
        }
      });
      
      // Apply velocity with damping
      node.vx *= 0.95;
      node.vy *= 0.95;
      node.x += node.vx;
      node.y += node.vy;
      
      // Constrain to canvas
      node.x = Math.max(node.value, Math.min(canvas.width - node.value, node.x));
      node.y = Math.max(node.value, Math.min(canvas.height - node.value, node.y));
    });
    
    // Draw connections
    ctx.globalAlpha = 0.3;
    links.forEach(link => {
      const sourceNode = nodes.find(n => n.id === link.source);
      const targetNode = nodes.find(n => n.id === link.target);
      
      if (sourceNode && targetNode) {
        // Skip if either node is filtered out
        if (selectedCategory && 
            sourceNode.category !== selectedCategory && 
            targetNode.category !== selectedCategory) {
          return;
        }
        
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        
        // Create a curved line
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2 - 20;
        
        ctx.quadraticCurveTo(midX, midY, targetNode.x, targetNode.y);
        
        // Use gradient for links
        const gradient = ctx.createLinearGradient(
          sourceNode.x, sourceNode.y, targetNode.x, targetNode.y
        );
        gradient.addColorStop(0, sourceNode.color);
        gradient.addColorStop(1, targetNode.color);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    
    ctx.globalAlpha = 1;
    
    // Draw nodes
    nodes.forEach(node => {
      // Skip nodes that are not in the selected category
      if (selectedCategory && node.category !== selectedCategory) {
        // Draw filtered nodes smaller and with less opacity
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.value / 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        return;
      }
      
      // Check if this node is being hovered over
      const isHovered = hoveredNode && hoveredNode.id === node.id;
      
      // Node glow effect
      if (isHovered) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
      }
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.value + (isHovered ? 4 : 0), 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      
      // Draw node border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Draw node label if hovered
      if (isHovered) {
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px Comic Neue, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, node.x, node.y + node.value + 15);
      }
    });
  };
  
  useEffect(() => {
    // Animate the DNA visualization
    const animate = () => {
      drawDNA();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle mouse move to detect node hover
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if mouse is over any node
      const hoveredNode = nodes.find(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= node.value;
      });
      
      setHoveredNode(hoveredNode || null);
      
      // Change cursor based on hover state
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hoveredNode ? 'pointer' : 'default';
      }
    };
    
    // Handle window resize to adjust canvas size
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    
    // Add event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
    }
    
    // Initial resize
    handleResize();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [selectedCategory, hoveredNode]);
  
  // Handle toggling fullscreen view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };
  
  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''} transition-all duration-300`}>
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="font-bangers text-3xl text-black flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dna className="mr-2 text-comic-blue" />
            Code DNA Visualization
          </motion.h2>
          
          <button 
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-comic-purple text-white rounded-full border-2 border-black font-bangers"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {['frontend', 'backend', 'database', 'devops', 'mobile', 'other'].map(category => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full border-2 border-black font-comic flex items-center text-sm ${
                selectedCategory === category 
                  ? 'bg-comic-blue text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{CategoryIconMap[category]}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div 
          ref={containerRef} 
          className={`relative border-4 border-black rounded-xl overflow-hidden bg-gradient-to-br from-white to-blue-50 ${
            isFullscreen ? 'h-[80vh]' : 'h-[60vh]'
          }`}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {/* Skill details popup */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bg-white border-2 border-black rounded-lg shadow-lg p-4 z-10"
                style={{
                  left: Math.min(window.innerWidth - 250, hoveredNode.x + 20),
                  top: hoveredNode.y + 20,
                  width: '240px'
                }}
              >
                <h3 className="font-bangers text-xl mb-2 text-black">{hoveredNode.id}</h3>
                {skills.find(s => s.name === hoveredNode.id)?.description && (
                  <p className="text-sm text-black mb-3 font-comic">
                    {skills.find(s => s.name === hoveredNode.id)?.description}
                  </p>
                )}
                
                <div className="flex items-center text-sm">
                  <span className="mr-2 font-comic text-black">Power Level:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const skillLevel = skills.find(s => s.name === hoveredNode.id)?.level || 0;
                      return (
                        <div 
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            level <= skillLevel ? hoveredNode.color : 'bg-gray-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                
                {skills.find(s => s.name === hoveredNode.id)?.yearsExperience && (
                  <div className="text-sm mt-2 text-black font-comic">
                    <span className="font-semibold">Experience:</span> {skills.find(s => s.name === hoveredNode.id)?.yearsExperience} years
                  </div>
                )}
                
                {skills.find(s => s.name === hoveredNode.id)?.projects && (
                  <div className="mt-3">
                    <h4 className="font-comic text-sm font-bold text-black">Projects:</h4>
                    <ul className="list-disc list-inside text-xs text-black font-comic">
                      {skills.find(s => s.name === hoveredNode.id)?.projects?.slice(0, 2).map((project, i) => (
                        <li key={i}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Instruction overlay */}
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 text-sm font-comic text-black">
            <p>Hover over nodes to see details. Nodes represent skills, connections show relationships.</p>
            <p className="mt-1">Select categories to filter the visualization.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDNA;
