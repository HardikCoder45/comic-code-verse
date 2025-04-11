
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, Plus, Minus, Trash, RefreshCw, Copy } from 'lucide-react';
import { skills } from '../data/skills';
import SpeechBubble from './SpeechBubble';
import { toast } from 'sonner';

// Resume sections and types
interface ResumeSection {
  id: string;
  title: string;
  enabled: boolean;
}

interface ResumeFormData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  targetRole: string;
  selectedSkills: string[];
  experiences: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    year: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
  }[];
}

const ResumeBuilder: React.FC = () => {
  const [sections, setSections] = useState<ResumeSection[]>([
    { id: 'contact', title: 'Contact Information', enabled: true },
    { id: 'summary', title: 'Professional Summary', enabled: true },
    { id: 'skills', title: 'Skills', enabled: true },
    { id: 'experience', title: 'Work Experience', enabled: true },
    { id: 'education', title: 'Education', enabled: true },
    { id: 'projects', title: 'Projects', enabled: true },
  ]);

  const [formData, setFormData] = useState<ResumeFormData>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    targetRole: '',
    selectedSkills: [],
    experiences: [{ 
      id: 'exp1', 
      title: '', 
      company: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }],
    education: [{ 
      id: 'edu1', 
      degree: '', 
      institution: '', 
      year: '' 
    }],
    projects: [{ 
      id: 'proj1', 
      title: '', 
      description: '', 
      technologies: '' 
    }],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [resumeFormat, setResumeFormat] = useState<'html' | 'markdown' | 'plain'>('html');
  const resumeRef = useRef<HTMLDivElement>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle sections
  const toggleSection = (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, enabled: !section.enabled } : section
    ));
  };

  // Handle skill selection
  const toggleSkill = (skillName: string) => {
    setFormData(prev => {
      if (prev.selectedSkills.includes(skillName)) {
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter(s => s !== skillName)
        };
      } else {
        return {
          ...prev,
          selectedSkills: [...prev.selectedSkills, skillName]
        };
      }
    });
  };

  // Experience form array handlers
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { 
          id: `exp${prev.experiences.length + 1}`, 
          title: '', 
          company: '', 
          startDate: '', 
          endDate: '', 
          description: '' 
        }
      ]
    }));
  };

  const removeExperience = (id: string) => {
    if (formData.experiences.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Education form array handlers
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { 
          id: `edu${prev.education.length + 1}`, 
          degree: '', 
          institution: '', 
          year: '' 
        }
      ]
    }));
  };

  const removeEducation = (id: string) => {
    if (formData.education.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Projects form array handlers
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { 
          id: `proj${prev.projects.length + 1}`, 
          title: '', 
          description: '', 
          technologies: '' 
        }
      ]
    }));
  };

  const removeProject = (id: string) => {
    if (formData.projects.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const handleProjectChange = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  // AI Resume Generation
  const generateResume = async () => {
    // Validate form data
    if (!formData.fullName || !formData.title) {
      toast.error("Please fill in at least your name and professional title");
      return;
    }

    setIsGenerating(true);
    try {
      // Build the prompt
      const enabledSections = sections
        .filter(section => section.enabled)
        .map(section => section.title)
        .join(', ');
      
      const prompt = `
        Generate a professional resume for ${formData.fullName}, who is a ${formData.title}.
        
        Target role: ${formData.targetRole || 'Not specified'}
        
        Include the following sections: ${enabledSections}
        
        Contact Information:
        - Name: ${formData.fullName}
        - Email: ${formData.email}
        - Phone: ${formData.phone}
        - Location: ${formData.location}
        
        Professional Summary:
        ${formData.summary}
        
        Skills:
        ${formData.selectedSkills.join(', ')}
        
        Work Experience:
        ${formData.experiences.map(exp => `
          - ${exp.title} at ${exp.company}
          - ${exp.startDate} to ${exp.endDate}
          - ${exp.description}
        `).join('\n')}
        
        Education:
        ${formData.education.map(edu => `
          - ${edu.degree} from ${edu.institution}, ${edu.year}
        `).join('\n')}
        
        Projects:
        ${formData.projects.map(proj => `
          - ${proj.title}
          - ${proj.description}
          - Technologies: ${proj.technologies}
        `).join('\n')}
        
        Please format the resume professionally in ${resumeFormat} format. Make it concise, impactful, and highlight the key strengths. Add some persuasive language that will help when applying for ${formData.targetRole || 'professional positions'}.
      `;

      // Make API request to Groq
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [{
            role: "system",
            content: "You are an expert resume creator. Your task is to create professional, well-structured resumes based on the information provided. Format the output according to the requested format (HTML, Markdown, or plain text). Make it look professional, highlight strengths, and be concise yet comprehensive."
          }, {
            role: "user",
            content: prompt
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.choices && data.choices[0]?.message) {
        setGeneratedResume(data.choices[0].message.content);
        toast.success("Resume generated successfully!");
      } else {
        throw new Error('No response content from API');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error("Failed to generate resume. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Download resume as a file
  const downloadResume = () => {
    if (!generatedResume) return;
    
    const element = document.createElement('a');
    const fileType = resumeFormat === 'html' ? 'html' : resumeFormat === 'markdown' ? 'md' : 'txt';
    const file = new Blob([generatedResume], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.fullName.replace(/\s+/g, '_')}_Resume.${fileType}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success(`Resume downloaded as ${fileType.toUpperCase()} file`);
  };

  // Copy resume to clipboard
  const copyToClipboard = () => {
    if (!generatedResume) return;
    
    navigator.clipboard.writeText(generatedResume)
      .then(() => toast.success("Resume copied to clipboard!"))
      .catch(() => toast.error("Failed to copy resume"));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bangers text-comic-green mb-2">AI RESUME BUILDER</h1>
        <SpeechBubble type="speech" color="green" position="top" className="inline-block">
          <p className="font-comic">Create a professional resume tailored to your dream job!</p>
        </SpeechBubble>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Column */}
        <div>
          <motion.div 
            className="bg-white rounded-xl border-2 border-comic-border shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-comic-green p-4">
              <h2 className="text-2xl font-bangers text-white">Resume Information</h2>
            </div>
            
            <div className="p-6">
              {/* Sections Toggle */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 text-black">Resume Sections</h3>
                <div className="flex flex-wrap gap-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        section.enabled 
                          ? 'bg-comic-green text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {section.enabled ? (
                        <CheckCircle className="inline-block w-4 h-4 mr-1" />
                      ) : null}
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information Section */}
              {sections.find(s => s.id === 'contact')?.enabled && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-black">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-black">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-black">Professional Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Full Stack Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-black">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-black">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1 text-black">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Target Role */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-black">Target Role</label>
                <input
                  type="text"
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Position you're applying for"
                />
              </div>

              {/* Summary Section */}
              {sections.find(s => s.id === 'summary')?.enabled && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-black">Professional Summary</h3>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                    placeholder="Brief summary of your professional background and goals..."
                  />
                </div>
              )}

              {/* Skills Section */}
              {sections.find(s => s.id === 'skills')?.enabled && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 text-black">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <button
                        key={skill.name}
                        onClick={() => toggleSkill(skill.name)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          formData.selectedSkills.includes(skill.name)
                            ? `bg-comic-${skill.color} text-white`
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {skill.icon && <span className="mr-1">{skill.icon}</span>}
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience Section */}
              {sections.find(s => s.id === 'experience')?.enabled && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-black">Work Experience</h3>
                    <button 
                      onClick={addExperience}
                      className="p-1 bg-comic-green text-white rounded-full"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  {formData.experiences.map((exp, index) => (
                    <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-black">Experience {index + 1}</h4>
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          disabled={formData.experiences.length <= 1}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Job Title</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Company Inc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Present"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-black">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Section */}
              {sections.find(s => s.id === 'education')?.enabled && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-black">Education</h3>
                    <button 
                      onClick={addEducation}
                      className="p-1 bg-comic-green text-white rounded-full"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  {formData.education.map((edu, index) => (
                    <div key={edu.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-black">Education {index + 1}</h4>
                        <button 
                          onClick={() => removeEducation(edu.id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          disabled={formData.education.length <= 1}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="University Name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1 text-black">Year</label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="2018 - 2022"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {sections.find(s => s.id === 'projects')?.enabled && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-black">Projects</h3>
                    <button 
                      onClick={addProject}
                      className="p-1 bg-comic-green text-white rounded-full"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  {formData.projects.map((proj, index) => (
                    <div key={proj.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-black">Project {index + 1}</h4>
                        <button 
                          onClick={() => removeProject(proj.id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          disabled={formData.projects.length <= 1}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="E-commerce Website"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Description</label>
                          <textarea
                            value={proj.description}
                            onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                            placeholder="Describe the project and your role..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-black">Technologies</label>
                          <input
                            type="text"
                            value={proj.technologies}
                            onChange={(e) => handleProjectChange(proj.id, 'technologies', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resume Format */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 text-black">Resume Format</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setResumeFormat('html')}
                    className={`px-4 py-2 rounded-md ${
                      resumeFormat === 'html' 
                        ? 'bg-comic-blue text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setResumeFormat('markdown')}
                    className={`px-4 py-2 rounded-md ${
                      resumeFormat === 'markdown' 
                        ? 'bg-comic-blue text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    onClick={() => setResumeFormat('plain')}
                    className={`px-4 py-2 rounded-md ${
                      resumeFormat === 'plain' 
                        ? 'bg-comic-blue text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Plain Text
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-6">
                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="comic-button w-full flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText size={20} className="mr-2" />
                      Generate Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview Column */}
        <div>
          <motion.div 
            className="bg-white rounded-xl border-2 border-comic-border shadow-lg overflow-hidden sticky top-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-comic-blue p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bangers text-white">Resume Preview</h2>
              <div className="flex space-x-2">
                {generatedResume && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 bg-white text-comic-blue rounded-full tooltip"
                      aria-label="Copy to clipboard"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      onClick={downloadResume}
                      className="p-2 bg-white text-comic-blue rounded-full tooltip"
                      aria-label="Download resume"
                    >
                      <Download size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div ref={resumeRef} className="p-6 h-[70vh] overflow-auto bg-gray-50">
              {generatedResume ? (
                resumeFormat === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: generatedResume }} />
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm text-black">{generatedResume}</pre>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FileText size={64} className="mb-4" />
                  <p className="text-lg font-medium">Your generated resume will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click "Generate Resume"</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
