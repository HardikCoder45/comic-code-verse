import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brush, Save, Download, Image, Upload, Palette, Layout, Type, FileEdit, 
         MessageSquare, User, Github, Linkedin, Mail, Link, Globe, Star, Sparkles,
         Command, Cpu, Bot, Code, Layers, Database, RefreshCw, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SpeechBubble from './SpeechBubble';
import { useSound } from '../contexts/SoundContext';
import PortfolioHTMLPreview from './PortfolioHTMLPreview';
import { generatePortfolioHTML, PortfolioData } from '../services/portfolioAIService';

interface PortfolioSection {
  id: string;
  title: string;
  type: 'projects' | 'about' | 'skills' | 'experience' | 'contact' | 'education' | 'custom';
  order: number;
  enabled: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'soft' | 'other';
}

const CustomPortfolio = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('blue');
  const [layout, setLayout] = useState('modern');
  const [previewUrl, setPreviewUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    email: '',
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  const { toast } = useToast();
  const { playSound } = useSound();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
          playSound('success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    if (!generatedHTML) {
      toast({
        title: "No Portfolio Generated",
        description: "Please generate a portfolio first",
        variant: "destructive",
      });
      playSound('error');
      return;
    }

    // Create a download link for the HTML content
    const element = document.createElement('a');
    const file = new Blob([generatedHTML], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = `${name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Portfolio Exported!",
      description: "Your custom portfolio has been exported and is ready to use.",
    });
    playSound('success');
  };

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Describe your project here',
      tags: ['Tag1', 'Tag2'],
    };
    
    setProjects([...projects, newProject]);
    playSound('popIn');
  };

  const addNewSkill = () => {
    const newSkill: Skill = {
      name: 'New Skill',
      level: 3,
      category: 'other',
    };
    
    setSkills([...skills, newSkill]);
    playSound('popIn');
  };

  const handleGeneratePortfolio = async () => {
    if (!name || !title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and title",
        variant: "destructive",
      });
      playSound('error');
      return;
    }
    
    // Immediately switch to preview mode
    setShowPreview(true);
    setIsGenerating(true);
    setIsStreaming(true);
    setLoadingProgress(0);
    setStreamingContent('');
    playSound('keyboardTyping');
    
    // Start progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Move faster at the beginning, slower as it approaches 90%
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 85 ? 1 : 0.5;
        const newProgress = Math.min(prev + increment, 90);
        return newProgress;
      });
    }, 300);
    
    try {
      // Prepare portfolio data
      const portfolioData: PortfolioData = {
        name,
        title,
        bio,
        skills,
        projects,
        theme,
        layout,
        socialLinks,
        profileImage: previewUrl
      };
      
      // Generate HTML using the Groq API with streaming
      const html = await generatePortfolioHTML(
        portfolioData, 
        customPrompt,
        (streamedContent) => {
          // Update the streaming content as it arrives
          setStreamingContent(streamedContent);
        }
      );
      
      // After receiving response, quickly complete the progress bar
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      // Short delay to show the completed progress bar
      setTimeout(() => {
        setGeneratedHTML(html);
        setIsGenerating(false);
        setIsStreaming(false);
        playSound('success');
        toast({
          title: "Portfolio Generated!",
          description: "AI has created your portfolio. Check out the preview!",
        });
      }, 500);
      
    } catch (error) {
      console.error('Error generating HTML:', error);
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      setTimeout(() => {
        setIsGenerating(false);
        setIsStreaming(false);
        toast({
          title: "Error",
          description: "Failed to generate portfolio HTML. Please try again.",
          variant: "destructive",
        });
        playSound('error');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen w-full py-6 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-bangers text-5xl text-blue-700 mb-4 text-center tracking-wider">
            AI Portfolio Creator
          </h1>

          <div className="max-w-3xl mx-auto mb-6">
            <SpeechBubble type="shout" color="blue">
              <p className="font-comic text-lg text-gray-800">
                Create your custom portfolio with Groq AI! Fill in your details below and let AI generate a professional portfolio website that you can download and host anywhere.
              </p>
            </SpeechBubble>
          </div>
        </motion.div>

        {!showPreview ? (
          // Form view
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                    <Input 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="border-gray-300"
                      onFocus={() => playSound('click')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Professional Title</label>
                    <Input 
                      placeholder="Full Stack Developer" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      className="border-gray-300"
                      onFocus={() => playSound('click')}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                    <label className="block text-gray-700 mb-2 font-medium">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                          <Image className="h-10 w-10 text-gray-400" />
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <div 
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
                          onMouseEnter={() => playSound('hover')}
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload Photo
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                  </div>

                <div className="mt-4">
                    <label className="block text-gray-700 mb-2 font-medium">Bio / About Me</label>
                    <Textarea 
                    rows={4} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      onFocus={() => playSound('click')}
                    />
                  </div>
                  </div>
                    
              {/* Social Links */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Github className="h-5 w-5 text-gray-500" />
                        <Input 
                          placeholder="GitHub URL" 
                          value={socialLinks.github}
                          onChange={(e) => setSocialLinks({...socialLinks, github: e.target.value})}
                          className="border-gray-300"
                          onFocus={() => playSound('click')}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Linkedin className="h-5 w-5 text-gray-500" />
                        <Input 
                          placeholder="LinkedIn URL" 
                          value={socialLinks.linkedin}
                          onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                          className="border-gray-300"
                          onFocus={() => playSound('click')}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <Input 
                          placeholder="Email Address" 
                          value={socialLinks.email}
                          onChange={(e) => setSocialLinks({...socialLinks, email: e.target.value})}
                          className="border-gray-300"
                          onFocus={() => playSound('click')}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <Input 
                          placeholder="Website URL" 
                          value={socialLinks.website}
                          onChange={(e) => setSocialLinks({...socialLinks, website: e.target.value})}
                          className="border-gray-300"
                          onFocus={() => playSound('click')}
                        />
                      </div>
                    </div>
                  </div>

              {/* Projects Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                    <Button 
                      variant="outline" 
                      onClick={addNewProject}
                      onMouseEnter={() => playSound('hover')}
                    size="sm"
                    >
                      Add Project
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {projects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-md">
                      <p>No projects yet. Add some projects to showcase in your portfolio.</p>
                      </div>
                    ) : (
                      projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                          {project.image && (
                            <div className="h-40 overflow-hidden">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle>
                              <Input 
                                value={project.title}
                                onChange={(e) => {
                                  setProjects(projects.map(p => 
                                    p.id === project.id ? {...p, title: e.target.value} : p
                                  ));
                                }}
                                className="border-0 p-0 text-xl font-bold focus-visible:ring-0"
                                onFocus={() => playSound('click')}
                              />
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                setProjects(projects.map(p => 
                                  p.id === project.id ? {...p, description: e.target.value} : p
                                ));
                              }}
                              className="min-h-[80px] border-gray-200"
                              placeholder="Project description..."
                              onFocus={() => playSound('click')}
                            />
                            
                            <div>
                              <Label htmlFor={`project-tags-${project.id}`}>Tags (comma separated)</Label>
                              <Input
                                id={`project-tags-${project.id}`}
                                value={project.tags.join(', ')}
                                onChange={(e) => {
                                  const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                                  setProjects(projects.map(p => 
                                    p.id === project.id ? {...p, tags} : p
                                  ));
                                }}
                                className="border-gray-200 mt-1"
                                placeholder="React, TypeScript, UI Design"
                                onFocus={() => playSound('click')}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`project-image-${project.id}`}>Image URL</Label>
                              <Input
                                id={`project-image-${project.id}`}
                                value={project.image || ''}
                                onChange={(e) => {
                                  setProjects(projects.map(p => 
                                    p.id === project.id ? {...p, image: e.target.value} : p
                                  ));
                                }}
                                className="border-gray-200 mt-1"
                                placeholder="https://example.com/image.jpg"
                                onFocus={() => playSound('click')}
                              />
                            </div>
                          </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setProjects(projects.filter(p => p.id !== project.id));
                                playSound('whoosh');
                              }}
                              onMouseEnter={() => playSound('hover')}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              
              {/* Skills Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                  <Button 
                    variant="outline" 
                    onClick={addNewSkill}
                    onMouseEnter={() => playSound('hover')}
                    size="sm"
                  >
                    Add Skill
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-md col-span-2">
                      <p>No skills added yet. Add some skills to showcase your expertise.</p>
                    </div>
                  ) : (
                    skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                        <div className="flex-grow">
                          <Input
                            value={skill.name}
                            onChange={(e) => {
                              setSkills(skills.map((s, i) => 
                                i === index ? {...s, name: e.target.value} : s
                              ));
                            }}
                            className="border-0 bg-transparent p-0 font-medium focus-visible:ring-0"
                            placeholder="Skill name"
                            onFocus={() => playSound('click')}
                          />
                          <div className="mt-2 flex items-center">
                            <span className="text-xs text-gray-500 mr-2">Level:</span>
                            <div className="flex-grow">
                              <Slider
                                value={[skill.level]}
                                min={1}
                                max={5}
                                step={1}
                                onValueChange={(value) => {
                                  setSkills(skills.map((s, i) => 
                                    i === index ? {...s, level: value[0]} : s
                                  ));
                                  playSound('click');
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{skill.level}/5</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSkills(skills.filter((_, i) => i !== index));
                            playSound('whoosh');
                          }}
                          onMouseEnter={() => playSound('hover')}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <span className="sr-only">Remove</span>
                          ✕
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Appearance */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Appearance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Color Theme</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['blue', 'purple', 'green', 'orange', 'teal', 'pink', 'red', 'slate'].map((color) => (
                        <div 
                          key={color}
                          className={`h-10 rounded-md cursor-pointer transition-all ${
                            theme === color ? 'ring-2 ring-offset-2 scale-105' : ''
                          }`}
                          style={{ 
                            backgroundColor: 
                              color === 'blue' ? '#3B82F6' : 
                              color === 'purple' ? '#8B5CF6' : 
                              color === 'green' ? '#10B981' : 
                              color === 'orange' ? '#F59E0B' : 
                              color === 'teal' ? '#14B8A6' : 
                              color === 'pink' ? '#EC4899' : 
                              color === 'red' ? '#EF4444' : 
                              '#64748B'
                          }}
                          onClick={() => {
                            setTheme(color);
                            playSound('click');
                          }}
                          onMouseEnter={() => playSound('hover')}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Layout Style</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'modern', label: 'Modern', icon: <Layout /> },
                        { id: 'classic', label: 'Classic', icon: <Type /> },
                        { id: 'creative', label: 'Creative', icon: <Palette /> }
                      ].map((layoutOption) => (
                        <div 
                          key={layoutOption.id}
                          className={`p-4 border rounded-md cursor-pointer flex flex-col items-center transition-all ${
                            layout === layoutOption.id 
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setLayout(layoutOption.id);
                            playSound('click');
                          }}
                          onMouseEnter={() => playSound('hover')}
                        >
                          {layoutOption.icon}
                          <span className="mt-2">{layoutOption.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                    </div>
                  </div>

              {/* Custom Prompt */}
                  <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom AI Instructions (Optional)</h2>
                <Textarea 
                  rows={3} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any custom instructions for the AI, e.g., 'Make it minimalist', 'Use a dark theme', 'Focus on my design skills'..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                      onFocus={() => playSound('click')}
                    />
                  </div>

              {/* Generate Button */}
              <div className="flex justify-center pt-4">
                  <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-6 rounded-xl text-lg font-bold flex items-center gap-2"
                  disabled={isGenerating}
                  onClick={handleGeneratePortfolio}
                    onMouseEnter={() => playSound('hover')}
                  >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Generating Your Portfolio...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <Wand2 className="h-5 w-5" />
                      Generate AI Portfolio
                    </>
                  )}
                  </Button>
                </div>
                        </div>
                      </div>
        ) : (
          // Preview view
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-semibold text-blue-700 mb-6">Generating Your Portfolio</h3>
                <div className="w-full max-w-md mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300 animate-pulse"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-500 mt-1">{Math.round(loadingProgress)}%</p>
                </div>
                <p className="text-gray-600 text-center max-w-md">
                  {loadingProgress < 30 ? 
                    "Analyzing your information..." : 
                    loadingProgress < 60 ? 
                    "Crafting your portfolio design..." : 
                    loadingProgress < 85 ? 
                    "Adding customizations and styling..." : 
                    "Finalizing your portfolio..."}
                </p>
                
                {isStreaming && streamingContent && (
                  <div className="mt-8 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Live Preview (Streaming)</h4>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-2"></span>
                        <span className="text-xs text-blue-500 animate-pulse">AI is generating...</span>
                      </div>
                    </div>
                    <div className="h-[400px] overflow-auto border border-gray-200 rounded-md p-2 bg-gray-50">
                      <PortfolioHTMLPreview 
                        htmlCode={streamingContent} 
                        isStreaming={isStreaming}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">Your AI-Generated Portfolio</h2>
                  <p className="text-gray-600">Your portfolio has been created! Preview it below or download the HTML to use it.</p>
                </div>

                <div className="h-[600px] mb-6">
                  <PortfolioHTMLPreview htmlCode={generatedHTML} />
                </div>
              </>
            )}

            <div className="flex justify-between items-center">
                    <Button 
                      variant="outline"
                onClick={() => {
                  setShowPreview(false);
                  playSound('click');
                }}
                      onMouseEnter={() => playSound('hover')}
                      disabled={isGenerating}
                    >
                <FileEdit className="mr-2 h-4 w-4" /> Back to Editor
                    </Button>
              
                    <Button 
                onClick={handleExport}
                className="bg-blue-500 hover:bg-blue-600"
                onMouseEnter={() => playSound('hover')}
                disabled={isGenerating || !generatedHTML}
              >
                <Download className="mr-2 h-4 w-4" /> Download Portfolio HTML
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPortfolio;
