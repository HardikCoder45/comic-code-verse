import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Loader2, Download, Copy, Check, ChevronsUpDown, Send, RefreshCcw, Save } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SpeechBubble from './SpeechBubble';
interface ResumeSection {
  id: string;
  title: string;
  enabled: boolean;
  content: string;
}
const ResumeBuilder: React.FC = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeHTML, setResumeHTML] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('build');
  const [fullName, setFullName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [useAI, setUseAI] = useState<boolean>(true);
  const [resumeStyle, setResumeStyle] = useState<string>('modern');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generateComplete, setGenerateComplete] = useState(false);

  // Resume sections
  const [sections, setSections] = useState<ResumeSection[]>([{
    id: 'summary',
    title: 'Professional Summary',
    enabled: true,
    content: ''
  }, {
    id: 'experience',
    title: 'Work Experience',
    enabled: true,
    content: ''
  }, {
    id: 'education',
    title: 'Education',
    enabled: true,
    content: ''
  }, {
    id: 'skills',
    title: 'Skills',
    enabled: true,
    content: ''
  }, {
    id: 'projects',
    title: 'Projects',
    enabled: false,
    content: ''
  }, {
    id: 'certifications',
    title: 'Certifications',
    enabled: false,
    content: ''
  }, {
    id: 'languages',
    title: 'Languages',
    enabled: false,
    content: ''
  }, {
    id: 'achievements',
    title: 'Achievements',
    enabled: false,
    content: ''
  }, {
    id: 'interests',
    title: 'Interests',
    enabled: false,
    content: ''
  }]);

  // Example resume styles
  const resumeStyles = [{
    id: 'modern',
    name: 'Modern',
    color: 'bg-blue-500'
  }, {
    id: 'professional',
    name: 'Professional',
    color: 'bg-gray-700'
  }, {
    id: 'creative',
    name: 'Creative',
    color: 'bg-purple-500'
  }, {
    id: 'minimal',
    name: 'Minimal',
    color: 'bg-emerald-500'
  }, {
    id: 'academic',
    name: 'Academic',
    color: 'bg-amber-600'
  }];

  // Toggle section enabled status
  const toggleSection = (id: string) => {
    setSections(sections.map(section => section.id === id ? {
      ...section,
      enabled: !section.enabled
    } : section));
  };

  // Update section content
  const updateSectionContent = (id: string, content: string) => {
    setSections(sections.map(section => section.id === id ? {
      ...section,
      content
    } : section));
  };

  // Generate the resume using AI
  const generateResume = async () => {
    setIsLoading(true);
    try {
      // Prepare the active sections for the prompt
      const activeSections = sections.filter(section => section.enabled);

      // Construct the prompt for the AI
      let prompt = 'Generate a professional resume in clean HTML format with the following information:\n\n';
      prompt += `Name: ${fullName}\n`;
      prompt += `Job Title: ${jobTitle}\n`;
      prompt += `Email: ${email}\n`;
      prompt += `Phone: ${phone}\n`;
      prompt += `Location: ${location}\n`;
      prompt += `Style: ${resumeStyle}\n\n`;

      // Add the content for each active section
      activeSections.forEach(section => {
        prompt += `${section.title}: ${section.content || 'Please generate appropriate content'}\n\n`;
      });

      // Add custom instructions if provided
      if (customPrompt.trim()) {
        prompt += `Additional Instructions: ${customPrompt}\n\n`;
      }
      prompt += "Only output clean, semantic HTML without any scripts or external CSS. Use inline styles for formatting. The HTML should be for the resume content only, no need for a full HTML document structure with html, head, or body tags.";

      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate a sample resume HTML based on the style and sections
      let generatedHTML = '';
      if (resumeStyle === 'modern') {
        generatedHTML = generateModernResumeHTML();
      } else if (resumeStyle === 'professional') {
        generatedHTML = generateProfessionalResumeHTML();
      } else if (resumeStyle === 'creative') {
        generatedHTML = generateCreativeResumeHTML();
      } else if (resumeStyle === 'minimal') {
        generatedHTML = generateMinimalResumeHTML();
      } else if (resumeStyle === 'academic') {
        generatedHTML = generateAcademicResumeHTML();
      }
      setResumeHTML(generatedHTML);
      setActiveTab('preview');
      setGenerateComplete(true);
      toast({
        title: "Resume Generated!",
        description: "Your resume has been successfully created."
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        variant: "destructive",
        title: "Failed to generate resume",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sample resume HTML generators for different styles
  const generateModernResumeHTML = () => {
    return `
      <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #333;">
        <header style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px;">
          <h1 style="font-size: 36px; margin-bottom: 5px; color: #1e3a8a;">${fullName || 'John Doe'}</h1>
          <p style="font-size: 20px; margin: 5px 0; color: #3b82f6;">${jobTitle || 'Software Engineer'}</p>
          <div style="margin-top: 15px; font-size: 14px;">
            <span style="margin: 0 10px;">${email || 'john.doe@example.com'}</span> |
            <span style="margin: 0 10px;">${phone || '(123) 456-7890'}</span> |
            <span style="margin: 0 10px;">${location || 'San Francisco, CA'}</span>
          </div>
        </header>
        
        ${sections.find(s => s.id === 'summary' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Professional Summary</h2>
          <p style="line-height: 1.6;">${sections.find(s => s.id === 'summary')?.content || 'Experienced software engineer with a strong background in web development and a passion for creating efficient, scalable solutions. Skilled in JavaScript, React, and Node.js with a proven track record of delivering high-quality applications.'}</p>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'experience' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Work Experience</h2>
          
          <div style="margin-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; margin: 0;">Senior Software Engineer</h3>
              <span style="font-style: italic;">Jan 2020 - Present</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <p style="font-weight: 500; margin: 0;">Tech Innovators Inc.</p>
              <p style="margin: 0;">San Francisco, CA</p>
            </div>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li style="margin-bottom: 5px;">Led the development of a cloud-based application that increased company revenue by 25%</li>
              <li style="margin-bottom: 5px;">Managed a team of 5 developers, implementing agile methodologies</li>
              <li style="margin-bottom: 5px;">Reduced application load time by 40% through optimization techniques</li>
            </ul>
          </div>
          
          <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; margin: 0;">Software Developer</h3>
              <span style="font-style: italic;">Mar 2017 - Dec 2019</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <p style="font-weight: 500; margin: 0;">WebSolutions Co.</p>
              <p style="margin: 0;">Boston, MA</p>
            </div>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li style="margin-bottom: 5px;">Developed and maintained client websites using React and Node.js</li>
              <li style="margin-bottom: 5px;">Collaborated with design team to implement responsive UI components</li>
              <li style="margin-bottom: 5px;">Participated in code reviews and documentation processes</li>
            </ul>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'education' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Education</h2>
          
          <div style="margin-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; margin: 0;">Master of Science in Computer Science</h3>
              <span style="font-style: italic;">2015 - 2017</span>
            </div>
            <p style="margin: 0;">Stanford University - Stanford, CA</p>
            <p style="margin-top: 5px;">GPA: 3.8/4.0</p>
          </div>
          
          <div style="margin-top: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; margin: 0;">Bachelor of Science in Software Engineering</h3>
              <span style="font-style: italic;">2011 - 2015</span>
            </div>
            <p style="margin: 0;">Massachusetts Institute of Technology - Cambridge, MA</p>
            <p style="margin-top: 5px;">GPA: 3.7/4.0</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'skills' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Skills</h2>
          
          <div style="margin-top: 15px; display: flex; flex-wrap: wrap;">
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">JavaScript</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">TypeScript</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">React</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Node.js</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Express</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">MongoDB</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">SQL</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Git</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Docker</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">AWS</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">CI/CD</div>
            <div style="background-color: #dbeafe; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Agile</div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'projects' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Projects</h2>
          
          <div style="margin-top: 15px;">
            <h3 style="font-size: 18px; margin: 0 0 5px 0;">E-commerce Platform</h3>
            <p style="margin: 0 0 10px 0; font-style: italic;">Full-stack React/Node.js application</p>
            <p style="line-height: 1.5;">Developed a complete e-commerce solution with user authentication, product catalog, shopping cart, and payment processing. Implemented responsive design and optimized for performance.</p>
          </div>
          
          <div style="margin-top: 15px;">
            <h3 style="font-size: 18px; margin: 0 0 5px 0;">Task Management System</h3>
            <p style="margin: 0 0 10px 0; font-style: italic;">React & Firebase application</p>
            <p style="line-height: 1.5;">Created a collaborative task management tool with real-time updates, task assignment, due dates, and notifications. Features include drag-and-drop interface and reporting dashboard.</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'certifications' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Certifications</h2>
          
          <ul style="padding-left: 20px; margin-top: 15px;">
            <li style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>AWS Certified Solutions Architect</strong>
                <span>2022</span>
              </div>
            </li>
            <li style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>Google Cloud Professional Developer</strong>
                <span>2021</span>
              </div>
            </li>
            <li style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <strong>Certified Scrum Master (CSM)</strong>
                <span>2020</span>
              </div>
            </li>
          </ul>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'languages' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Languages</h2>
          
          <div style="margin-top: 15px; display: flex; flex-wrap: wrap;">
            <div style="width: 50%; margin-bottom: 10px;">
              <p style="margin: 0;"><strong>English</strong> - Native</p>
            </div>
            <div style="width: 50%; margin-bottom: 10px;">
              <p style="margin: 0;"><strong>Spanish</strong> - Fluent</p>
            </div>
            <div style="width: 50%; margin-bottom: 10px;">
              <p style="margin: 0;"><strong>French</strong> - Intermediate</p>
            </div>
            <div style="width: 50%; margin-bottom: 10px;">
              <p style="margin: 0;"><strong>German</strong> - Basic</p>
            </div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'achievements' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Achievements</h2>
          
          <ul style="padding-left: 20px; margin-top: 15px;">
            <li style="margin-bottom: 8px;">Published technical article on modern JavaScript frameworks in <strong>Web Development Monthly</strong> magazine</li>
            <li style="margin-bottom: 8px;">Speaker at ReactConf 2022 on "Performance Optimization in React Applications"</li>
            <li style="margin-bottom: 8px;">Recipient of the "Innovation Excellence Award" at Tech Innovators Inc. (2021)</li>
            <li style="margin-bottom: 8px;">Contributed to open-source React component library with over 10,000 stars on GitHub</li>
          </ul>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'interests' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 22px; color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Interests</h2>
          
          <div style="margin-top: 15px; display: flex; flex-wrap: wrap;">
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Machine Learning</div>
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Blockchain Technology</div>
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Web Accessibility</div>
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Photography</div>
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Hiking</div>
            <div style="background-color: #f3f4f6; padding: 8px 15px; border-radius: 20px; margin: 5px; font-size: 14px;">Open Source Contributing</div>
          </div>
        </section>
        ` : ''}
      </div>
    `;
  };

  // Generate sample professional resume HTML
  const generateProfessionalResumeHTML = () => {
    return `
      <div style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; color: #222; line-height: 1.5;">
        <header style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px;">${fullName || 'John Doe'}</h1>
          <p style="font-size: 16px; margin: 5px 0; font-style: italic;">${jobTitle || 'Software Engineer'}</p>
          <div style="margin-top: 10px; font-size: 14px;">
            <span style="margin: 0 10px;">${email || 'john.doe@example.com'}</span> |
            <span style="margin: 0 10px;">${phone || '(123) 456-7890'}</span> |
            <span style="margin: 0 10px;">${location || 'San Francisco, CA'}</span>
          </div>
        </header>
        
        ${sections.find(s => s.id === 'summary' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Summary</h2>
          <p>${sections.find(s => s.id === 'summary')?.content || 'Detail-oriented software engineer with over 5 years of experience developing enterprise applications. Expertise in Java, Spring Boot, and database design. Strong analytical skills and commitment to delivering high-quality, well-tested code.'}</p>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'experience' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Professional Experience</h2>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: bold;">Senior Software Engineer</h3>
              <span>01/2020 - Present</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">Tech Innovators Inc., San Francisco, CA</p>
            <ul style="margin-top: 8px; padding-left: 20px;">
              <li>Designed and implemented scalable microservices architecture supporting 1M+ daily active users</li>
              <li>Improved system reliability by 40% through enhanced error handling and comprehensive unit testing</li>
              <li>Collaborated with product and design teams to deliver features aligned with business objectives</li>
              <li>Mentored junior developers and conducted weekly code reviews to maintain code quality standards</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: bold;">Software Developer</h3>
              <span>03/2017 - 12/2019</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">WebSolutions Co., Boston, MA</p>
            <ul style="margin-top: 8px; padding-left: 20px;">
              <li>Developed and maintained Java/Spring applications for financial services clients</li>
              <li>Designed and optimized SQL queries, improving database performance by 30%</li>
              <li>Created comprehensive documentation for API endpoints and system architecture</li>
              <li>Participated in agile development cycle with weekly sprints and daily stand-ups</li>
            </ul>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'education' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Education</h2>
          
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: bold;">Master of Science in Computer Science</h3>
              <span>2015 - 2017</span>
            </div>
            <p style="margin: 3px 0;">Stanford University, Stanford, CA</p>
            <p style="margin: 3px 0;">GPA: 3.8/4.0</p>
          </div>
          
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: bold;">Bachelor of Science in Software Engineering</h3>
              <span>2011 - 2015</span>
            </div>
            <p style="margin: 3px 0;">Massachusetts Institute of Technology, Cambridge, MA</p>
            <p style="margin: 3px 0;">GPA: 3.7/4.0</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'skills' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Skills</h2>
          
          <div style="display: flex; flex-wrap: wrap;">
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Programming:</strong> Java, Spring, SQL
            </div>
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Web Development:</strong> HTML, CSS, JavaScript
            </div>
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Databases:</strong> Oracle, PostgreSQL, MongoDB
            </div>
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Tools:</strong> Git, Maven, Jenkins, JIRA
            </div>
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Cloud:</strong> AWS, Azure, Docker
            </div>
            <div style="width: 33%; margin-bottom: 8px;">
              <strong>Methodologies:</strong> Agile, Scrum, TDD
            </div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'certifications' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Certifications</h2>
          
          <ul style="padding-left: 20px; margin-top: 10px;">
            <li style="margin-bottom: 8px;">AWS Certified Solutions Architect - Professional (2022)</li>
            <li style="margin-bottom: 8px;">Oracle Certified Professional, Java SE 11 Developer (2021)</li>
            <li style="margin-bottom: 8px;">Google Cloud Professional Developer (2021)</li>
            <li style="margin-bottom: 8px;">Certified Scrum Master (CSM) (2020)</li>
          </ul>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'projects' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Projects</h2>
          
          <div style="margin-bottom: 12px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: bold;">Enterprise Resource Planning System</h3>
            <p style="margin: 0 0 5px 0; font-style: italic;">Lead Developer</p>
            <p>Designed and implemented a comprehensive ERP solution for manufacturing clients. The system integrated inventory management, order processing, and financial reporting modules. Utilized Java, Spring Boot, and Angular with a PostgreSQL database.</p>
          </div>
          
          <div style="margin-bottom: 12px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: bold;">Customer Relationship Management Platform</h3>
            <p style="margin: 0 0 5px 0; font-style: italic;">Backend Developer</p>
            <p>Developed RESTful APIs and service layer for a CRM platform serving 50+ enterprise clients. Implemented caching strategies and query optimization that reduced response times by 60%. Technologies used: Java, Spring Boot, Hibernate, Redis, MySQL.</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'achievements' && s.enabled) ? `
        <section style="margin-bottom: 20px;">
          <h2 style="font-size: 18px; text-transform: uppercase; border-bottom: 1px solid #222; padding-bottom: 5px; margin-bottom: 10px;">Professional Achievements</h2>
          
          <ul style="padding-left: 20px; margin-top: 10px;">
            <li style="margin-bottom: 8px;">Recipient of the Technical Excellence Award at Tech Innovators Inc. (2021)</li>
            <li style="margin-bottom: 8px;">Patent filed for optimized data synchronization method (2020)</li>
            <li style="margin-bottom: 8px;">Published article on microservices architecture in IEEE Software journal (2019)</li>
            <li style="margin-bottom: 8px;">Invited speaker at Java One Conference (2018)</li>
          </ul>
        </section>
        ` : ''}
      </div>
    `;
  };

  // Generate sample creative resume HTML
  const generateCreativeResumeHTML = () => {
    return `
      <div style="font-family: 'Poppins', sans-serif; max-width: 800px; margin: 0 auto; color: #333; background-color: #f9f7fe; padding: L20px; border-radius: 10px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; width: 35%; height: 100%; background-color: #6b46c1; z-index: 0;"></div>
        
        <div style="position: relative; z-index: 1; display: flex;">
          <div style="width: 35%; padding: 30px 20px; color: white;">
            <div style="margin-bottom: 30px; text-align: center;">
              <h1 style="font-size: 28px; margin-bottom: 0;">${fullName || 'John Doe'}</h1>
              <p style="margin-top: 5px; opacity: 0.9;">${jobTitle || 'UI/UX Designer'}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 10px;">Contact</h2>
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong><br />${email || 'john.doe@example.com'}</p>
              </div>
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Phone:</strong><br />${phone || '(123) 456-7890'}</p>
              </div>
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Location:</strong><br />${location || 'San Francisco, CA'}</p>
              </div>
            </div>
            
            ${sections.find(s => s.id === 'skills' && s.enabled) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 10px;">Skills</h2>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Design:</strong></p>
                <div style="background: rgba(255,255,255,0.2); height: 5px; border-radius: 5px; margin-bottom: 8px;">
                  <div style="background: white; width: 95%; height: 100%; border-radius: 5px;"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Figma:</strong></p>
                <div style="background: rgba(255,255,255,0.2); height: 5px; border-radius: 5px; margin-bottom: 8px;">
                  <div style="background: white; width: 90%; height: 100%; border-radius: 5px;"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Adobe XD:</strong></p>
                <div style="background: rgba(255,255,255,0.2); height: 5px; border-radius: 5px; margin-bottom: 8px;">
                  <div style="background: white; width: 85%; height: 100%; border-radius: 5px;"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Sketch:</strong></p>
                <div style="background: rgba(255,255,255,0.2); height: 5px; border-radius: 5px; margin-bottom: 8px;">
                  <div style="background: white; width: 80%; height: 100%; border-radius: 5px;"></div>
                </div>
              </div>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>HTML/CSS:</strong></p>
                <div style="background: rgba(255,255,255,0.2); height: 5px; border-radius: 5px; margin-bottom: 8px;">
                  <div style="background: white; width: 75%; height: 100%; border-radius: 5px;"></div>
                </div>
              </div>
            </div>
            ` : ''}
            
            ${sections.find(s => s.id === 'languages' && s.enabled) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 10px;">Languages</h2>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>English:</strong> Native</p>
              </div>
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Spanish:</strong> Fluent</p>
              </div>
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>French:</strong> Intermediate</p>
              </div>
            </div>
            ` : ''}
            
            ${sections.find(s => s.id === 'interests' && s.enabled) ? `
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 18px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 5px; margin-bottom: 10px;">Interests</h2>
              
              <div style="display: flex; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; margin: 0 5px 5px 0; font-size: 12px;">Photography</div>
                <div style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; margin: 0 5px 5px 0; font-size: 12px;">Hiking</div>
                <div style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; margin: 0 5px 5px 0; font-size: 12px;">Travel</div>
                <div style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; margin: 0 5px 5px 0; font-size: 12px;">Art</div>
              </div>
            </div>
            ` : ''}
          </div>
          
          <div style="width: 65%; padding: 30px;">
            ${sections.find(s => s.id === 'summary' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">About Me</h2>
              <p style="line-height: 1.6;">${sections.find(s => s.id === 'summary')?.content || 'Creative and detail-oriented UI/UX Designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design and accessibility. Proven track record of increasing user engagement and conversion rates through thoughtful, data-informed design solutions.'}</p>
            </section>
            ` : ''}
            
            ${sections.find(s => s.id === 'experience' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">Work Experience</h2>
              
              <div style="margin-bottom: 20px; position: relative; padding-left: 20px;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background-color: #6b46c1;"></div>
                <div style="position: absolute; left: -4px; top: 0; width: 10px; height: 10px; border-radius: 50%; background-color: #6b46c1;"></div>
                
                <div style="margin-bottom: 8px;">
                  <h3 style="font-size: 18px; margin: 0 0 5px 0;">Senior UI/UX Designer</h3>
                  <div style="display: flex; justify-content: space-between;">
                    <p style="margin: 0; font-style: italic; color: #6b46c1;">Creative Solutions Agency</p>
                    <p style="margin: 0; font-size: 14px;">2020 - Present</p>
                  </div>
                </div>
                
                <ul style="padding-left: 20px; margin-top: 10px;">
                  <li style="margin-bottom: 5px;">Led the redesign of a major e-commerce platform, resulting in a 35% increase in conversion rate</li>
                  <li style="margin-bottom: 5px;">Conducted user research and usability testing for 10+ clients across various industries</li>
                  <li style="margin-bottom: 5px;">Managed a team of 3 junior designers, providing mentorship and direction</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 20px; position: relative; padding-left: 20px;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background-color: #6b46c1;"></div>
                <div style="position: absolute; left: -4px; top: 0; width: 10px; height: 10px; border-radius: 50%; background-color: #6b46c1;"></div>
                
                <div style="margin-bottom: 8px;">
                  <h3 style="font-size: 18px; margin: 0 0 5px 0;">UI Designer</h3>
                  <div style="display: flex; justify-content: space-between;">
                    <p style="margin: 0; font-style: italic; color: #6b46c1;">Digital Innovators Inc.</p>
                    <p style="margin: 0; font-size: 14px;">2017 - 2020</p>
                  </div>
                </div>
                
                <ul style="padding-left: 20px; margin-top: 10px;">
                  <li style="margin-bottom: 5px;">Created wireframes, prototypes, and high-fidelity designs for mobile and web applications</li>
                  <li style="margin-bottom: 5px;">Collaborated with developers to ensure seamless implementation of designs</li>
                  <li style="margin-bottom: 5px;">Established design system and component library, improving team efficiency by 40%</li>
                </ul>
              </div>
            </section>
            ` : ''}
            
            ${sections.find(s => s.id === 'education' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">Education</h2>
              
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <h3 style="font-size: 18px; margin: 0;">Bachelor of Fine Arts in Graphic Design</h3>
                  <span style="font-size: 14px;">2013 - 2017</span>
                </div>
                <p style="margin: 0; font-style: italic; color: #6b46c1;">Rhode Island School of Design</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <h3 style="font-size: 18px; margin: 0;">UI/UX Design Specialization</h3>
                  <span style="font-size: 14px;">2018</span>
                </div>
                <p style="margin: 0; font-style: italic; color: #6b46c1;">California Institute of the Arts (online)</p>
              </div>
            </section>
            ` : ''}
            
            ${sections.find(s => s.id === 'projects' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">Featured Projects</h2>
              
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div style="background-color: #f0ebfa; padding: 15px; border-radius: 10px;">
                  <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #6b46c1;">HealthTrack App</h3>
                  <p style="margin: 0; font-size: 14px; line-height: 1.4;">Redesigned user interface for a health tracking application, improving user engagement by 45% and earning a 4.8/5 star rating.</p>
                </div>
                
                <div style="background-color: #f0ebfa; padding: 15px; border-radius: 10px;">
                  <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #6b46c1;">E-commerce Redesign</h3>
                  <p style="margin: 0; font-size: 14px; line-height: 1.4;">Complete overhaul of checkout process for a major retailer, reducing cart abandonment by 30% and increasing conversions.</p>
                </div>
                
                <div style="background-color: #f0ebfa; padding: 15px; border-radius: 10px;">
                  <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #6b46c1;">Banking Portal</h3>
                  <p style="margin: 0; font-size: 14px; line-height: 1.4;">Designed an accessible, user-friendly banking portal that simplified complex financial tasks for users of all abilities.</p>
                </div>
                
                <div style="background-color: #f0ebfa; padding: 15px; border-radius: 10px;">
                  <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #6b46c1;">Travel App</h3>
                  <p style="margin: 0; font-size: 14px; line-height: 1.4;">Created intuitive travel planning experience with personalized recommendations and seamless booking process.</p>
                </div>
              </div>
            </section>
            ` : ''}
            
            ${sections.find(s => s.id === 'certifications' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">Certifications</h2>
              
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <div style="background-color: #f0ebfa; padding: 10px 15px; border-radius: 8px; font-size: 14px;">
                  <strong>Google UX Design Professional Certificate</strong> (2021)
                </div>
                <div style="background-color: #f0ebfa; padding: 10px 15px; border-radius: 8px; font-size: 14px;">
                  <strong>Certified User Experience Professional (CUXP)</strong> (2020)
                </div>
                <div style="background-color: #f0ebfa; padding: 10px 15px; border-radius: 8px; font-size: 14px;">
                  <strong>Adobe Certified Expert - XD</strong> (2019)
                </div>
              </div>
            </section>
            ` : ''}
            
            ${sections.find(s => s.id === 'achievements' && s.enabled) ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 22px; color: #6b46c1; margin-bottom: 10px;">Awards & Recognition</h2>
              
              <ul style="padding-left: 20px; margin-top: 10px;">
                <li style="margin-bottom: 8px;"><strong>Webby Award Nominee</strong> - Best Navigation/Structure (2022)</li>
                <li style="margin-bottom: 8px;"><strong>Awwwards Site of the Day</strong> - HealthTrack App Redesign (2021)</li>
                <li style="margin-bottom: 8px;"><strong>CSS Design Awards</strong> - UI Design of the Month (2020)</li>
              </ul>
            </section>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  };

  // Generate sample minimal resume HTML
  const generateMinimalResumeHTML = () => {
    return `
      <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
        <header style="border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; font-weight: 500; margin-bottom: 5px;">${fullName || 'John Doe'}</h1>
          <p style="font-size: 18px; color: #10b981; margin-top: 0; margin-bottom: 15px;">${jobTitle || 'Product Designer'}</p>
          
          <div style="display: flex; gap: 20px; flex-wrap: wrap; font-size: 15px;">
            <div>${email || 'john.doe@example.com'}</div>
            <div>${phone || '(123) 456-7890'}</div>
            <div>${location || 'San Francisco, CA'}</div>
          </div>
        </header>
        
        ${sections.find(s => s.id === 'summary' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">${sections.find(s => s.id === 'summary')?.content || 'Product designer with over 5 years of experience creating user-centered digital experiences. Skilled in user research, interaction design, and visual design. Passionate about creating products that are accessible, intuitive, and deliver measurable results.'}</p>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'experience' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 15px; color: #10b981;">Experience</h2>
          
          <div style="margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; font-weight: 500; margin: 0;">Senior Product Designer</h3>
              <span style="color: #6b7280;">2020 - Present</span>
            </div>
            <div style="color: #6b7280; margin-bottom: 10px;">Design Studio, San Francisco</div>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li style="margin-bottom: 8px;">Led product design for flagship mobile application with 2M+ active users</li>
              <li style="margin-bottom: 8px;">Conducted user research that informed a major redesign, increasing user retention by 40%</li>
              <li style="margin-bottom: 8px;">Collaborated with engineering and product teams to ensure high-quality implementation</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; font-weight: 500; margin: 0;">UX/UI Designer</h3>
              <span style="color: #6b7280;">2017 - 2020</span>
            </div>
            <div style="color: #6b7280; margin-bottom: 10px;">Tech Innovation Co., Boston</div>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li style="margin-bottom: 8px;">Designed user interfaces for various web and mobile applications</li>
              <li style="margin-bottom: 8px;">Created and maintained a component library that improved design consistency by 80%</li>
              <li style="margin-bottom: 8px;">Facilitated design sprints and workshops to align stakeholders around user needs</li>
            </ul>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'education' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 15px; color: #10b981;">Education</h2>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <h3 style="font-size: 18px; font-weight: 500; margin: 0;">Bachelor of Fine Arts, Interaction Design</h3>
              <span style="color: #6b7280;">2013 - 2017</span>
            </div>
            <div style="color: #6b7280;">California College of the Arts, San Francisco</div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'skills' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 15px; color: #10b981;">Skills</h2>
          
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">User Research</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Wireframing</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Prototyping</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Interaction Design</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Visual Design</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Figma</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Sketch</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Adobe XD</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">InVision</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">A/B Testing</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Design Systems</div>
            <div style="padding: 6px 12px; background-color: #ecfdf5; border-radius: 4px; font-size: 14px;">Information Architecture</div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'projects' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 15px; color: #10b981;">Projects</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 18px; font-weight: 500; margin: 0 0 8px 0;">Redesign of Financial App</h3>
            <p style="margin-top: 0; margin-bottom: 8px;">Led the end-to-end redesign of a personal finance application used by over 1 million users. The redesign focused on simplifying complex financial information and improving usability for users of all financial literacy levels.</p>
            <div style="color: #6b7280; font-size: 14px;">Technologies: Figma, Principle, UsabilityHub, Optimizely</div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 18px; font-weight: 500; margin: 0 0 8px 0;">E-commerce Checkout Optimization</h3>
            <p style="margin-top: 0; margin-bottom: 8px;">Redesigned the checkout flow for an e-commerce platform, reducing cart abandonment by 28% and increasing revenue by $1.2M annually.</p>
            <div style="color: #6b7280; font-size: 14px;">Technologies: Sketch, InVision, Hotjar, Google Analytics</div>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'certifications' && s.enabled) ? `
        <section style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 15px; color: #10b981;">Certifications</h2>
          
          <ul style="padding-left: 0; list-style-type: none;">
            <li style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <div>Certified Usability Analyst (CUA)</div>
                <div style="color: #6b7280;">2021</div>
              </div>
            </li>
            <li style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between;">
                <div>Interaction Design Foundation UX Certificate</div>
                <div style="color: #6b7280;">2019</div>
              </div>
            </li>
          </ul>
        </section>
        ` : ''}
      </div>
    `;
  };

  // Generate sample academic resume HTML
  const generateAcademicResumeHTML = () => {
    return `
      <div style="font-family: 'Georgia', serif; max-width: 800px; margin: 0 auto; color: #333; line-height: 1.6;">
        <header style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #718096; padding-bottom: 20px;">
          <h1 style="font-size: 24px; margin-bottom: 5px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px;">${fullName || 'John Doe, Ph.D.'}</h1>
          <p style="font-size: 18px; margin: 5px 0; font-style: italic;">${jobTitle || 'Associate Professor of Computer Science'}</p>
          <div style="margin-top: 10px; font-size: 15px;">
            <div>${email || 'john.doe@university.edu'}</div>
            <div>${phone || '(123) 456-7890'}</div>
            <div>${location || 'Cambridge, MA'}</div>
          </div>
        </header>
        
        ${sections.find(s => s.id === 'summary' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Research Interests</h2>
          <p>${sections.find(s => s.id === 'summary')?.content || 'My research focuses on artificial intelligence, specifically deep learning applications in computer vision and natural language processing. I am particularly interested in developing interpretable AI systems that can explain their decision-making processes and ethical considerations in machine learning.'}</p>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'education' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Education</h2>
          
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: normal;">Ph.D. in Computer Science</h3>
              <span>2012 - 2016</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">Massachusetts Institute of Technology, Cambridge, MA</p>
            <p style="margin: 3px 0;">Dissertation: "Deep Learning Approaches to Visual Understanding in Autonomous Systems"</p>
            <p style="margin: 3px 0;">Advisor: Prof. Jane Smith</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: normal;">M.S. in Computer Science</h3>
              <span>2010 - 2012</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">Stanford University, Stanford, CA</p>
            <p style="margin: 3px 0;">Thesis: "Efficient Algorithms for Large-Scale Image Classification"</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: normal;">B.S. in Computer Engineering, summa cum laude</h3>
              <span>2006 - 2010</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">University of California, Berkeley, CA</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'experience' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Academic Appointments</h2>
          
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: normal;">Associate Professor of Computer Science</h3>
              <span>2020 - Present</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">Harvard University, Cambridge, MA</p>
            <ul style="margin-top: 8px;">
              <li>Lead the Interpretable AI research group with 5 Ph.D. students and 3 postdoctoral researchers</li>
              <li>Teach graduate and undergraduate courses in machine learning and computer vision</li>
              <li>Principal investigator on $2.5M research grant from the National Science Foundation</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <h3 style="font-size: 16px; margin: 0; font-weight: normal;">Assistant Professor of Computer Science</h3>
              <span>2016 - 2020</span>
            </div>
            <p style="margin: 3px 0; font-style: italic;">Carnegie Mellon University, Pittsburgh, PA</p>
            <ul style="margin-top: 8px;">
              <li>Established a research program in deep learning for autonomous systems</li>
              <li>Developed and taught new curriculum in artificial intelligence</li>
              <li>Mentored 8 graduate students to completion (6 M.S., 2 Ph.D.)</li>
            </ul>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'projects' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Research Projects</h2>
          
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: normal;">Interpretable Deep Learning Systems</h3>
            <p style="margin: 3px 0; font-style: italic;">National Science Foundation, $2.5M, 2020-2024</p>
            <p style="margin: 8px 0;">Developing novel techniques for making deep neural networks more interpretable and transparent, enabling users to understand why specific decisions are made by AI systems.</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: normal;">Ethical Considerations in Machine Learning</h3>
            <p style="margin: 3px 0; font-style: italic;">Ethics in AI Foundation, $800K, 2019-2022</p>
            <p style="margin: 8px 0;">Investigating methods to detect and mitigate bias in machine learning models, with applications in healthcare and criminal justice.</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: normal;">Computer Vision for Autonomous Vehicles</h3>
            <p style="margin: 3px 0; font-style: italic;">Department of Transportation, $1.2M, 2017-2020</p>
            <p style="margin: 8px 0;">Developed robust computer vision algorithms for autonomous vehicles operating in adverse weather conditions, improving safety and reliability.</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'publications' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Selected Publications</h2>
          
          <div style="margin-top: 15px;">
            <p style="margin-bottom: 10px;"><strong>Doe, J.</strong>, Smith, A., & Johnson, B. (2022). "Towards Explainable AI: A Framework for Interpreting Deep Neural Networks." <em>Journal of Artificial Intelligence Research</em>, 75, 112-145.</p>
            
            <p style="margin-bottom: 10px;"><strong>Doe, J.</strong>, & Brown, C. (2021). "Mitigating Bias in Machine Learning Models for Healthcare Applications." <em>Nature Machine Intelligence</em>, 3(5), 412-422.</p>
            
            <p style="margin-bottom: 10px;">Williams, D., <strong>Doe, J.</strong>, & Taylor, E. (2020). "Efficient Visual Recognition in Limited Visibility Conditions." <em>Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)</em>, 3218-3227.</p>
            
            <p style="margin-bottom: 10px;"><strong>Doe, J.</strong>, & White, M. (2019). "A Survey of Deep Learning Approaches for Autonomous Navigation." <em>IEEE Transactions on Intelligent Transportation Systems</em>, 20(6), 2191-2210.</p>
            
            <p style="margin-bottom: 10px;"><strong>Doe, J.</strong>, Martin, R., & Adams, S. (2018). "Transfer Learning for Low-Resource Language Processing." <em>Proceedings of the Annual Meeting of the Association for Computational Linguistics (ACL)</em>, 2637-2646.</p>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'teaching' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Teaching Experience</h2>
          
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: normal;">Harvard University</h3>
            <ul style="margin-top: 5px;">
              <li>CS 682: Advanced Machine Learning (Graduate), 2020-Present</li>
              <li>CS 480: Computer Vision (Undergraduate), 2020-Present</li>
              <li>CS 782: Special Topics in AI Ethics (Graduate Seminar), 2021-Present</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 5px 0; font-weight: normal;">Carnegie Mellon University</h3>
            <ul style="margin-top: 5px;">
              <li>15-780: Graduate Artificial Intelligence, 2017-2020</li>
              <li>15-463: Computational Photography, 2016-2019</li>
              <li>15-388: Practical Data Science, 2018-2020</li>
            </ul>
          </div>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'awards' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Honors and Awards</h2>
          
          <ul style="margin-top: 15px;">
            <li style="margin-bottom: 8px;">NSF CAREER Award, 2019</li>
            <li style="margin-bottom: 8px;">MIT Technology Review's 35 Innovators Under 35, 2018</li>
            <li style="margin-bottom: 8px;">Best Paper Award, Conference on Computer Vision and Pattern Recognition (CVPR), 2018</li>
            <li style="margin-bottom: 8px;">Outstanding Teaching Award, School of Computer Science, Carnegie Mellon University, 2017</li>
            <li style="margin-bottom: 8px;">Google Faculty Research Award, 2017</li>
          </ul>
        </section>
        ` : ''}
        
        ${sections.find(s => s.id === 'service' && s.enabled) ? `
        <section style="margin-bottom: 25px;">
          <h2 style="font-size: 18px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #cbd5e0; padding-bottom: 5px;">Professional Service</h2>
          
          <div style="margin-top: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 8px 0; font-weight: normal;">Editorial Boards</h3>
            <ul style="margin-top: 5px;">
              <li>Associate Editor, IEEE Transactions on Pattern Analysis and Machine Intelligence, 2020-Present</li>
              <li>Editorial Board Member, Journal of Artificial Intelligence Research, 2019-Present</li>
            </ul>
          </div>
          
          <div style="margin-top: 15px;">
            <h3 style="font-size: 16px; margin: 0 0 8px 0; font-weight: normal;">Conference Organization</h3>
            <ul style="margin-top: 5px;">
              <li>Program Chair, Neural Information Processing Systems (NeurIPS), 2023</li>
              <li>Area Chair, International Conference on Machine Learning (ICML), 2019-2022</li>
              <li>Workshop Organizer, "Interpretability in Deep Learning," CVPR 2021</li>
            </ul>
          </div>
        </section>
        ` : ''}
      </div>
    `;
  };

  // Function to copy resume to clipboard
  const copyToClipboard = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = resumeHTML;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Copied to clipboard",
        description: "Resume HTML has been copied to your clipboard."
      });
    } catch (error) {
      console.error('Failed to copy text: ', error);
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy resume to clipboard."
      });
    }
  };

  // Function to handle download
  const handleDownload = () => {
    try {
      const blob = new Blob([resumeHTML], {
        type: 'text/html'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fullName.trim() || 'resume'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been downloaded as an HTML file."
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Could not download the resume file."
      });
    }
  };
  return <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center mb-8">
        <SpeechBubble type="speech" color="blue" className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-2 font-comic text-comic-blue">AI-Powered Resume Builder</h1>
          <p className="font-comic text-black">Create a professional resume in minutes! Fill in your information, customize sections, and let AI help polish your career story.</p>
        </SpeechBubble>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="build" className="text-lg">
            Build Resume
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!resumeHTML} className="text-lg">
            Preview & Download
          </TabsTrigger>
        </TabsList>

        <TabsContent value="build" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-2 bg-blue-600 rounded-full"></div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="e.g. John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="e.g. Software Engineer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="e.g. john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="e.g. (123) 456-7890" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-2 bg-purple-600 rounded-full"></div>
                Resume Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Accordion type="multiple" defaultValue={sections.filter(s => s.enabled).map(s => s.id)}>
                  {sections.map(section => <AccordionItem value={section.id} key={section.id}>
                      <div className="flex items-center px-4">
                        <Checkbox id={`enable-${section.id}`} checked={section.enabled} onCheckedChange={() => toggleSection(section.id)} className="mr-3" />
                        <AccordionTrigger className="flex-1 hover:no-underline">
                          {section.title}
                        </AccordionTrigger>
                      </div>
                      <AccordionContent className="px-4 pt-2">
                        <Textarea placeholder={`Enter your ${section.title.toLowerCase()} information...`} value={section.content} onChange={e => updateSectionContent(section.id, e.target.value)} disabled={!section.enabled} className="min-h-[120px]" />
                        {section.id === 'summary' && section.enabled && <p className="text-sm text-gray-500 mt-2">
                            Tip: A strong summary highlights your most relevant skills and experience in 3-5 sentences.
                          </p>}
                      </AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-2 bg-green-600 rounded-full"></div>
                Resume Style & AI Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Choose Resume Style</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-2">
                    {resumeStyles.map(style => <div key={style.id} className={`cursor-pointer transition-all duration-200 border-2 rounded-lg overflow-hidden ${resumeStyle === style.id ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500 scale-105' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setResumeStyle(style.id)}>
                        <div className={`${style.color} h-3`}></div>
                        <div className="p-3 text-center">
                          <p className="font-medium">{style.name}</p>
                        </div>
                      </div>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useAI" className="cursor-pointer">Use AI to enhance resume</Label>
                    <Switch id="useAI" checked={useAI} onCheckedChange={setUseAI} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Let our AI improve your resume with professional language and formatting
                  </p>
                </div>

                {useAI && <div className="space-y-2 pt-2">
                    <Label htmlFor="customPrompt">Custom Instructions (optional)</Label>
                    <Textarea id="customPrompt" placeholder="e.g. Focus on leadership skills, use action verbs, highlight teamwork..." value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} className="min-h-[100px]" />
                  </div>}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button onClick={generateResume} disabled={isLoading} size="lg" className="text-lg px-8 py-6">
              {isLoading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Resume...
                </> : <>
                  <Send className="mr-2 h-5 w-5" />
                  Generate Resume
                </>}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {resumeHTML && <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Resume Preview</span>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy HTML
                      </Button>
                      <Button variant="default" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-md overflow-auto max-h-[800px] shadow-inner p-6">
                    <div dangerouslySetInnerHTML={{
                  __html: resumeHTML
                }} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('build')}>
                  <ChevronsUpDown className="mr-2 h-4 w-4" />
                  Edit Resume
                </Button>
                
                <div className="space-x-2">
                  <Button variant="secondary" onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  // Generate a different style
                  const currentStyleIndex = resumeStyles.findIndex(s => s.id === resumeStyle);
                  const nextStyleIndex = (currentStyleIndex + 1) % resumeStyles.length;
                  setResumeStyle(resumeStyles[nextStyleIndex].id);
                  generateResume();
                }, 500);
              }} disabled={isLoading}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Try Different Style
                  </Button>
                  
                  <Button variant="default" onClick={handleDownload}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Resume
                  </Button>
                </div>
              </div>
            </>}
        </TabsContent>
      </Tabs>

      {generateComplete && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="mt-8 text-center">
          <SpeechBubble type="thought" color="green" className="inline-block">
            <p className="font-comic">Great job! Your resume looks professional. Download it or keep editing to perfect it.</p>
          </SpeechBubble>
        </motion.div>}
    </div>;
};
export default ResumeBuilder;