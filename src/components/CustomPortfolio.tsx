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
  const [sections, setSections] = useState<PortfolioSection[]>([
    { id: '1', title: 'About Me', type: 'about', order: 1, enabled: true },
    { id: '2', title: 'Skills', type: 'skills', order: 2, enabled: true },
    { id: '3', title: 'Projects', type: 'projects', order: 3, enabled: true },
    { id: '4', title: 'Experience', type: 'experience', order: 4, enabled: true },
    { id: '5', title: 'Contact', type: 'contact', order: 5, enabled: true },
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [customCss, setCustomCss] = useState('');
  const [viewMode, setViewMode] = useState<'form' | 'preview'>('form');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [isHTMLGenerating, setIsHTMLGenerating] = useState(false);
  
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

  const handleSave = () => {
    if (!name || !title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and title",
        variant: "destructive",
      });
      playSound('error');
      return;
    }

    toast({
      title: "Portfolio Saved!",
      description: "Your custom portfolio has been saved successfully.",
    });
    playSound('success');
  };

  const handleExport = () => {
    if (!name || !title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and title",
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
      description: "Your custom portfolio has been exported and is ready to download.",
    });
    playSound('success');
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description of what you want to generate",
        variant: "destructive",
      });
      playSound('error');
      return;
    }

    setIsGenerating(true);
    playSound('keyboardTyping');
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      // Example AI-generated content based on prompt
      if (aiPrompt.toLowerCase().includes('developer')) {
        setName('Alex Morgan');
        setTitle('Full Stack Developer');
        setBio('Passionate full-stack developer with 5+ years of experience building modern web applications. Specialized in React, Node.js, and cloud architecture.');
        setTheme('blue');
      } else if (aiPrompt.toLowerCase().includes('designer')) {
        setName('Jordan Taylor');
        setTitle('UX/UI Designer');
        setBio('Creative designer with a passion for crafting beautiful, user-centered digital experiences. Specialized in design systems, product design, and brand identity.');
        setTheme('purple');
      } else if (aiPrompt.toLowerCase().includes('marketing')) {
        setName('Cameron Riley');
        setTitle('Digital Marketing Specialist');
        setBio('Results-driven marketing professional with expertise in SEO, content strategy, and social media campaigns. Proven track record of growing brands online.');
        setTheme('green');
      } else {
        setName('Sam Wilson');
        setTitle('Creative Professional');
        setBio('Versatile creative professional combining technical skills with artistic vision. Dedicated to delivering impactful digital solutions that make a difference.');
        setTheme('orange');
      }

      // Generate some projects
      setProjects([
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'A fully responsive e-commerce solution with payment processing and inventory management',
          tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
          image: 'https://picsum.photos/seed/proj1/400/300'
        },
        {
          id: '2',
          title: 'Portfolio Website',
          description: 'A modern, responsive portfolio website with parallax scrolling and animated sections',
          tags: ['HTML/CSS', 'JavaScript', 'Animation', 'Responsive'],
          image: 'https://picsum.photos/seed/proj2/400/300'
        }
      ]);

      // Generate some skills
      setSkills([
        { name: 'JavaScript', level: 5, category: 'frontend' },
        { name: 'React', level: 4, category: 'frontend' },
        { name: 'Node.js', level: 4, category: 'backend' },
        { name: 'UI/UX Design', level: 3, category: 'design' },
      ]);

      setIsGenerating(false);
      setIsAiPanelOpen(false);
      
      playSound('success');
      toast({
        title: "Content Generated!",
        description: "AI has created portfolio content based on your prompt.",
      });
      
      // Generate HTML with this new data
      handleGeneratePortfolioHTML();
    }, 3000);
  };

  const handleGeneratePortfolioHTML = async () => {
    if (!name && !title) return;
    
    setIsHTMLGenerating(true);
    
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
      
      // Generate HTML
      const html = await generatePortfolioHTML(portfolioData, aiPrompt);
      setGeneratedHTML(html);
      
      // If we're in preview mode, play a sound to indicate it's ready
      if (viewMode === 'preview') {
        playSound('success');
      }
    } catch (error) {
      console.error('Error generating HTML:', error);
      toast({
        title: "Error",
        description: "Failed to generate portfolio HTML. Please try again.",
        variant: "destructive",
      });
      playSound('error');
    } finally {
      setIsHTMLGenerating(false);
    }
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
                Create your custom portfolio with AI! Fill in your details or let AI generate a portfolio based on your description. Your portfolio will be created in HTML that you can download and host anywhere.
              </p>
            </SpeechBubble>

            <div className="mt-4 flex justify-center gap-4">
              <Dialog open={isAiPanelOpen} onOpenChange={setIsAiPanelOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6 py-2 text-white font-medium rounded-full flex items-center gap-2"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('robotBeep')}
                  >
                    <Sparkles className="h-5 w-5" />
                    <Cpu className="h-5 w-5" />
                    Generate with AI
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Generate Portfolio with AI</DialogTitle>
                    <DialogDescription>
                      Describe the type of portfolio you want and our AI will generate content for you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="I'm a full-stack developer with 5 years of experience in React and Node.js. I enjoy creating clean, modern web applications..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="min-h-[150px]"
                      onFocus={() => playSound('click')}
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleAiGenerate}
                      disabled={isGenerating}
                      className="relative"
                      onMouseEnter={() => playSound('hover')}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="flex gap-2 bg-white p-1 rounded-full border-2 border-gray-200 shadow-sm">
                <button
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                    viewMode === 'form' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setViewMode('form');
                    playSound('click');
                  }}
                  onMouseEnter={() => playSound('hover')}
                >
                  <FileEdit className="h-4 w-4" />
                  <span>Form View</span>
                </button>
                <button
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                    viewMode === 'preview' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setViewMode('preview');
                    playSound('click');
                    // Generate HTML if we don't have it yet
                    if (!generatedHTML) {
                      handleGeneratePortfolioHTML();
                    }
                  }}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Code className="h-4 w-4" />
                  <span>HTML Preview</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {viewMode === 'form' ? (
          // Form view
          <div className="grid grid-cols-1 gap-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 w-full">
                <TabsTrigger 
                  value="content" 
                  className="font-comic"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <FileEdit className="mr-2 h-4 w-4" /> Content
                </TabsTrigger>
                <TabsTrigger 
                  value="projects" 
                  className="font-comic"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Layers className="mr-2 h-4 w-4" /> Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="font-comic"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Palette className="mr-2 h-4 w-4" /> Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="export" 
                  className="font-comic"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Download className="mr-2 h-4 w-4" /> Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  <div>
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

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Bio / About Me</label>
                    <Textarea 
                      rows={5} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      onFocus={() => playSound('click')}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">Social Links</h3>
                    
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

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">Portfolio Sections</h3>
                    <div className="space-y-2">
                      {sections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <span className="font-medium">{section.title}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                checked={section.enabled} 
                                onCheckedChange={(checked) => {
                                  setSections(sections.map(s => 
                                    s.id === section.id ? {...s, enabled: checked} : s
                                  ));
                                  playSound('click');
                                }}
                                onMouseEnter={() => playSound('hover')}
                              />
                              <span className="text-sm text-gray-500">
                                {section.enabled ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onMouseEnter={() => playSound('hover')}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Content
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">My Projects</h3>
                    <Button 
                      variant="outline" 
                      onClick={addNewProject}
                      onMouseEnter={() => playSound('hover')}
                    >
                      Add Project
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {projects.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No projects yet. Add a project or use AI to generate some examples.</p>
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
                          <CardFooter className="flex justify-between">
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
              </TabsContent>

              <TabsContent value="appearance" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Color Theme</label>
                    <div className="grid grid-cols-4 gap-4">
                      {['blue', 'purple', 'green', 'orange', 'teal', 'pink', 'red', 'slate'].map((color) => (
                        <div 
                          key={color}
                          className={`h-12 rounded-md cursor-pointer transition-all ${
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
                    <div className="grid grid-cols-3 gap-4">
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

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Custom CSS (Advanced)</label>
                    <textarea 
                      rows={5} 
                      value={customCss}
                      onChange={(e) => setCustomCss(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder=".my-portfolio h1 { color: #3B82F6; }"
                      onFocus={() => playSound('click')}
                    />
                  </div>

                  <Button 
                    onClick={handleSave}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onMouseEnter={() => playSound('hover')}
                  >
                    <Brush className="mr-2 h-4 w-4" /> Apply Style
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="export" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">Ready to Share Your Portfolio?</h3>
                    <p className="text-sm text-blue-700">
                      Your custom portfolio will be exported as a fully responsive HTML page that you can host anywhere.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Portfolio Format</label>
                      <Select onValueChange={(value) => playSound('click')} defaultValue="html">
                        <SelectTrigger className="w-full" onMouseEnter={() => playSound('hover')}>
                          <SelectValue placeholder="Choose format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="html">Static HTML Website</SelectItem>
                          <SelectItem value="react" disabled>React Application (Coming Soon)</SelectItem>
                          <SelectItem value="nextjs" disabled>Next.js Project (Coming Soon)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">SEO Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="seo-meta" onCheckedChange={() => playSound('click')} onMouseEnter={() => playSound('hover')} />
                          <Label htmlFor="seo-meta">Include SEO meta tags</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="seo-sitemap" onCheckedChange={() => playSound('click')} onMouseEnter={() => playSound('hover')} />
                          <Label htmlFor="seo-sitemap">Generate sitemap</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Analytics</label>
                      <div className="flex items-center space-x-2">
                        <Switch id="analytics" onCheckedChange={() => playSound('click')} onMouseEnter={() => playSound('hover')} />
                        <Label htmlFor="analytics">Setup Google Analytics</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
                      onClick={handleSave}
                      onMouseEnter={() => playSound('hover')}
                    >
                      <Save className="mr-2 h-4 w-4" /> Save Draft
                    </Button>
                    <Button 
                      className="bg-blue-50
