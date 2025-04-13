import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import { Dna, GitBranch, Code, Brain, Zap, Sparkles, Cpu, Globe } from 'lucide-react';

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
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [activeNodeConnections, setActiveNodeConnections] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  
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
      const isActive = activeNode && (node.id === activeNode.id || activeNodeConnections.includes(node.id));
      const gravitationalStrength = isFiltered ? 0.01 : isActive ? 0.03 : 0.02;
      
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
            const repulsiveForce = isFiltered ? 0.5 : isActive ? 1.5 : 1;
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
            
            const bothActive = activeNode && 
                             (node.id === activeNode.id || activeNodeConnections.includes(node.id)) && 
                             (otherNode.id === activeNode.id || activeNodeConnections.includes(otherNode.id));
            
            if (ld > 50) {
              const attractiveForce = isFiltered ? 0.001 : bothActive ? 0.02 : 0.005;
              node.vx += lx * attractiveForce;
              node.vy += ly * attractiveForce;
            }
          }
        }
      });
      
      // Apply mouse attraction for hovered/active nodes
      if (activeNode && (node.id === activeNode.id || activeNodeConnections.includes(node.id))) {
        // Add slight attraction to mouse position
        if (mousePosition.x && mousePosition.y) {
          const mx = mousePosition.x - node.x;
          const my = mousePosition.y - node.y;
          const md = Math.sqrt(mx * mx + my * my);
          
          if (md > 10) {  // Only attract if not too close
            node.vx += mx * 0.001;
            node.vy += my * 0.001;
          }
        }
      }
      
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
        
        // Check if this connection is part of the active node
        const isActiveConnection = activeNode && 
                                  (sourceNode.id === activeNode.id || targetNode.id === activeNode.id) &&
                                  (activeNodeConnections.includes(sourceNode.id) || activeNodeConnections.includes(targetNode.id));
        
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        
        // Create a curved line with more pronounced curve for active connections
        const midX = (sourceNode.x + targetNode.x) / 2;
        const curveHeight = isActiveConnection ? -40 : -20;
        const midY = (sourceNode.y + targetNode.y) / 2 + curveHeight;
        
        ctx.quadraticCurveTo(midX, midY, targetNode.x, targetNode.y);
        
        // Use gradient for links, brighter for active connections
        const gradient = ctx.createLinearGradient(
          sourceNode.x, sourceNode.y, targetNode.x, targetNode.y
        );
        gradient.addColorStop(0, sourceNode.color);
        gradient.addColorStop(1, targetNode.color);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isActiveConnection ? 4 : 2;
        
        // Add glow effect for active connections
        if (isActiveConnection) {
          ctx.shadowColor = sourceNode.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Add animated particles along the active connections
        if (isActiveConnection) {
          // Calculate position along the curve based on time
          const time = Date.now() % 3000 / 3000;
          const t = time;
          
          // Parametric equation for quadratic curve
          const px = Math.pow(1-t, 2) * sourceNode.x + 2 * (1-t) * t * midX + Math.pow(t, 2) * targetNode.x;
          const py = Math.pow(1-t, 2) * sourceNode.y + 2 * (1-t) * t * midY + Math.pow(t, 2) * targetNode.y;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
          
          // Add glow
          ctx.shadowColor = 'white';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
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
      
      // Check if this node is being hovered over or is active
      const isHovered = hoveredNode && hoveredNode.id === node.id;
      const isActive = activeNode && (node.id === activeNode.id || activeNodeConnections.includes(node.id));
      
      // Node glow effect
      if (isHovered || isActive) {
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isActive ? 20 : 15;
      }
      
      // Draw node with pulse animation for active nodes
      ctx.beginPath();
      const nodeSize = node.value + (isHovered ? 4 : 0) + (isActive ? Math.sin(Date.now() / 200) * 2 + 2 : 0);
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? `${node.color}` : node.color;
      ctx.fill();
      
      // Draw sparkling particles around active nodes
      if (isActive) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const angle = (Date.now() / 1000 + i * (Math.PI * 2 / particleCount)) % (Math.PI * 2);
          const distance = node.value * 1.5;
          const px = node.x + Math.cos(angle) * distance;
          const py = node.y + Math.sin(angle) * distance;
          
          ctx.beginPath();
          const particleSize = 1 + Math.sin(Date.now() / 200 + i) * 1;
          ctx.arc(px, py, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }
      }
      
      // Draw node border
      ctx.strokeStyle = isActive ? '#fff' : '#000';
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
      
      // Draw node label if hovered
      if (isHovered || isActive) {
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
    
    // Handle mouse move to detect node hover and track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Update mouse position for attraction
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Check if mouse is over any node
      const hoveredNode = nodes.find(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= node.value + (activeNode && activeNode.id === node.id ? 5 : 0);
      });
      
      setHoveredNode(hoveredNode || null);
      
      // Change cursor based on hover state
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hoveredNode ? 'pointer' : 'default';
      }
    };

    // Handle click to set active node and its connections
    const handleClick = (e: MouseEvent) => {
      if (!canvasRef.current || !hoveredNode) return;
      
      if (activeNode && activeNode.id === hoveredNode.id) {
        // Clicking same node again - deactivate
        setActiveNode(null);
        setActiveNodeConnections([]);
      } else {
        // Find all connected nodes
        const connections = links
          .filter(link => link.source === hoveredNode.id || link.target === hoveredNode.id)
          .map(link => link.source === hoveredNode.id ? link.target : link.source);
        
        setActiveNode(hoveredNode);
        setActiveNodeConnections(connections);
      }
    };

    // Handle wheel for zoom functionality
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setZoomLevel(prevZoom => Math.min(Math.max(0.5, prevZoom + delta), 2));
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
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('wheel', handleWheel);
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
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [selectedCategory, hoveredNode, activeNode, activeNodeConnections]);
  
  // Handle toggling fullscreen view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
    // Reset active node when changing categories
    setActiveNode(null);
    setActiveNodeConnections([]);
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
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mr-2 text-comic-blue"
            >
              <Dna size={28} />
            </motion.div>
            Code DNA Visualization
          </motion.h2>
          
          <motion.button 
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-comic-purple text-white rounded-full border-2 border-black font-bangers flex items-center gap-2"
            whileHover={{ scale: 1.05, backgroundColor: "#9333ea" }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={16} />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
          </motion.button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {['frontend', 'backend', 'database', 'devops', 'mobile', 'other'].map(category => (
            <motion.button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full border-2 border-black font-comic flex items-center text-sm ${
                selectedCategory === category 
                  ? 'bg-comic-blue text-white' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * ['frontend', 'backend', 'database', 'devops', 'mobile', 'other'].indexOf(category) }}
            >
              <motion.span 
                className="mr-2"
                animate={selectedCategory === category ? { rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 0.5, repeat: selectedCategory === category ? Infinity : 0, repeatDelay: 2 }}
              >
                {CategoryIconMap[category]}
              </motion.span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          ref={containerRef} 
          className={`relative border-4 border-black rounded-xl overflow-hidden bg-gradient-to-br from-white to-blue-50 ${
            isFullscreen ? 'h-[80vh]' : 'h-[60vh]'
          }`}
          style={{ transform: `scale(${zoomLevel})` }}
          animate={{ boxShadow: activeNode ? "0 0 30px rgba(0, 0, 0, 0.3)" : "0 0 15px rgba(0, 0, 0, 0.2)" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {/* Skill details popup with enhanced animations */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                key={hoveredNode.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute bg-white border-2 border-black rounded-lg shadow-lg p-4 z-10"
                style={{
                  left: Math.min(window.innerWidth - 250, hoveredNode.x + 20),
                  top: hoveredNode.y + 20,
                  width: '240px',
                  boxShadow: `0 10px 25px -5px ${hoveredNode.color}40, 0 5px 10px -5px rgba(0,0,0,0.1)`
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ backgroundColor: hoveredNode.color }}
                  layoutId={`skill-bar-${hoveredNode.id}`}
                />
                
                <motion.h3 
                  className="font-bangers text-xl mb-2 text-black flex items-center"
                  layoutId={`skill-title-${hoveredNode.id}`}
                >
                  {hoveredNode.id}
                  <motion.span 
                    className="ml-2 text-yellow-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: [0, 15, -15, 0] }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Sparkles size={16} />
                  </motion.span>
                </motion.h3>
                
                {skills.find(s => s.name === hoveredNode.id)?.description && (
                  <motion.p 
                    className="text-sm text-black mb-3 font-comic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {skills.find(s => s.name === hoveredNode.id)?.description}
                  </motion.p>
                )}
                
                <motion.div 
                  className="flex items-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="mr-2 font-comic text-black">Power Level:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const skillLevel = skills.find(s => s.name === hoveredNode.id)?.level || 0;
                      return (
                        <motion.div 
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            level <= skillLevel ? hoveredNode.color : 'bg-gray-200'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + level * 0.1 }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
                
                {skills.find(s => s.name === hoveredNode.id)?.yearsExperience && (
                  <motion.div 
                    className="text-sm mt-2 text-black font-comic"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="font-semibold">Experience:</span> {skills.find(s => s.name === hoveredNode.id)?.yearsExperience} years
                  </motion.div>
                )}
                
                {skills.find(s => s.name === hoveredNode.id)?.projects && (
                  <motion.div 
                    className="mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-comic text-sm font-bold text-black">Projects:</h4>
                    <ul className="list-disc list-inside text-xs text-black font-comic">
                      {skills.find(s => s.name === hoveredNode.id)?.projects?.slice(0, 2).map((project, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          {project}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                <motion.div
                  className="mt-3 pt-2 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    className="text-xs text-comic-blue font-comic font-bold flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeNode && activeNode.id === hoveredNode.id) {
                        setActiveNode(null);
                        setActiveNodeConnections([]);
                      } else {
                        const connections = links
                          .filter(link => link.source === hoveredNode.id || link.target === hoveredNode.id)
                          .map(link => link.source === hoveredNode.id ? link.target : link.source);
                        
                        setActiveNode(hoveredNode);
                        setActiveNodeConnections(connections);
                      }
                    }}
                  >
                    {activeNode && activeNode.id === hoveredNode.id ? (
                      <>Hide connections <X size={14} /></>
                    ) : (
                      <>Show connections <Zap size={14} /></>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Active node background highlight */}
          {activeNode && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              style={{ 
                background: `radial-gradient(circle at ${activeNode.x}px ${activeNode.y}px, ${activeNode.color} 0%, transparent 70%)`,
                zIndex: 1
              }}
            />
          )}
          
          {/* Enhanced instruction overlay */}
          <motion.div 
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border-2 border-black rounded-lg p-3 text-sm font-comic text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p className="flex items-center gap-1">
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-comic-blue"
              >
                <Sparkles size={14} />
              </motion.span>
              <span>Hover over nodes to see details.</span>
            </motion.p>
            <motion.p className="mt-1 flex items-center gap-1">
              <motion.span 
                className="text-comic-pink"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Cpu size={14} />
              </motion.span>
              <span>Click nodes to highlight connections.</span>
            </motion.p>
            <motion.p className="mt-1 flex items-center gap-1">
              <motion.span className="text-comic-green">
                <Globe size={14} />
              </motion.span>
              <span>Use mouse wheel to zoom in/out.</span>
            </motion.p>
          </motion.div>
          
          {/* Zoom controls */}
          <motion.div
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))}
            >
              -
            </motion.button>
            <motion.button
              className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setZoomLevel(1)}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                ↺
              </motion.span>
            </motion.button>
            <motion.button
              className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))}
            >
              +
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeDNA;
