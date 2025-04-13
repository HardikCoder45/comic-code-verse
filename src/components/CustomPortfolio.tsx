
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brush, Save, Download, Image, Upload, Palette, Layout, Type, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpeechBubble from './SpeechBubble';
import { useSound } from '../contexts/SoundContext';

const CustomPortfolio = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('blue');
  const [layout, setLayout] = useState('modern');
  const [previewUrl, setPreviewUrl] = useState('');
  const { toast } = useToast();
  const { playSound } = useSound();

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

    toast({
      title: "Portfolio Exported!",
      description: "Your custom portfolio has been exported and is ready to download.",
    });
    playSound('success');
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
            Portfolio Creator
          </h1>

          <div className="max-w-3xl mx-auto mb-6">
            <SpeechBubble type="shout" color="blue">
              <p className="font-comic text-lg text-gray-800">
                Create your own stunning portfolio in minutes! Just fill in your details and customize the look and feel.
              </p>
            </SpeechBubble>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 w-full">
                <TabsTrigger 
                  value="content" 
                  className="font-comic"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                >
                  <FileEdit className="mr-2 h-4 w-4" /> Content
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
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
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
                    <textarea 
                      rows={5} 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      onFocus={() => playSound('click')}
                    ></textarea>
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

              <TabsContent value="appearance" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Color Theme</label>
                    <div className="grid grid-cols-4 gap-4">
                      {['blue', 'purple', 'green', 'orange'].map((color) => (
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
                              '#F59E0B' 
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
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'modern', label: 'Modern', icon: <Layout /> },
                        { id: 'classic', label: 'Classic', icon: <Type /> }
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
                      Your custom portfolio will be exported as a fully responsive webpage that you can host anywhere.
                    </p>
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
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={handleExport}
                      onMouseEnter={() => playSound('hover')}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-full">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <Image className="mr-2 h-5 w-5" /> Preview
              </h3>

              <div 
                className={`rounded-lg overflow-hidden border ${
                  theme === 'blue' ? 'border-blue-200' : 
                  theme === 'purple' ? 'border-purple-200' : 
                  theme === 'green' ? 'border-green-200' : 
                  'border-orange-200'
                }`}
              >
                <div
                  className={`p-4 ${
                    theme === 'blue' ? 'bg-blue-500' : 
                    theme === 'purple' ? 'bg-purple-500' : 
                    theme === 'green' ? 'bg-green-500' : 
                    'bg-orange-500'
                  } text-white`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-white overflow-hidden flex items-center justify-center">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <Image className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{name || 'Your Name'}</h2>
                      <p className="text-sm opacity-90">{title || 'Your Title'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-2">About Me</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {bio || 'Your bio will appear here. Add a short description about yourself, your skills, and your experience.'}
                  </p>
                  
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'JavaScript', 'Node.js', 'CSS'].map((skill) => (
                      <span 
                        key={skill}
                        className={`px-2 py-1 text-xs rounded ${
                          theme === 'blue' ? 'bg-blue-100 text-blue-700' : 
                          theme === 'purple' ? 'bg-purple-100 text-purple-700' : 
                          theme === 'green' ? 'bg-green-100 text-green-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mb-2">Projects</h3>
                  <div className="space-y-2">
                    {['Project 1', 'Project 2', 'Project 3'].map((project) => (
                      <div 
                        key={project}
                        className="p-2 border rounded text-sm"
                      >
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPortfolio;
