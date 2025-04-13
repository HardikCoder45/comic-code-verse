
import { toast } from 'sonner';

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: any[];
  projects: any[];
  theme: string;
  layout: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    email: string;
  };
  profileImage?: string;
}

interface AIPortfolioResponse {
  html: string;
  error?: string;
}

export const generatePortfolioHTML = async (promptData: PortfolioData, customPrompt?: string): Promise<string> => {
  try {
    // Simulate API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create HTML based on the prompt data
    const html = generateHTMLFromData(promptData, customPrompt);
    
    return html;
  } catch (error) {
    console.error('Error generating portfolio:', error);
    toast.error('Failed to generate portfolio. Please try again.');
    return generateFallbackHTML(promptData);
  }
};

// This function generates HTML based on the portfolio data
const generateHTMLFromData = (data: PortfolioData, customPrompt?: string): string => {
  // Get primary and secondary colors based on theme
  const colors = getThemeColors(data.theme);
  
  // Determine the layout style
  const layoutClass = data.layout === 'modern' ? 'modern-layout' : 
                      data.layout === 'creative' ? 'creative-layout' : 'classic-layout';
  
  // Generate skills HTML if there are skills
  const skillsHTML = data.skills.length > 0 ? `
    <section id="skills" class="skills-section">
      <h2>Skills</h2>
      <div class="skills-container">
        ${data.skills.map((skill) => `
          <div class="skill-item" style="background-color: ${colors.primaryLight}; color: ${colors.primaryDark};">
            <span>${skill.name}</span>
            <div class="skill-level">
              ${Array(skill.level).fill('★').join('')}${Array(5 - skill.level).fill('☆').join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  // Generate projects HTML if there are projects
  const projectsHTML = data.projects.length > 0 ? `
    <section id="projects" class="projects-section">
      <h2>Projects</h2>
      <div class="projects-grid">
        ${data.projects.map((project) => `
          <div class="project-card">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            ${project.link ? `<a href="${project.link}" class="project-link">View Project</a>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  // Generate social links HTML if any are provided
  const socialLinksHTML = Object.values(data.socialLinks).some(link => link) ? `
    <div class="social-links">
      ${data.socialLinks.github ? `<a href="${data.socialLinks.github}" class="social-link"><i class="fab fa-github"></i></a>` : ''}
      ${data.socialLinks.linkedin ? `<a href="${data.socialLinks.linkedin}" class="social-link"><i class="fab fa-linkedin"></i></a>` : ''}
      ${data.socialLinks.twitter ? `<a href="${data.socialLinks.twitter}" class="social-link"><i class="fab fa-twitter"></i></a>` : ''}
      ${data.socialLinks.website ? `<a href="${data.socialLinks.website}" class="social-link"><i class="fas fa-globe"></i></a>` : ''}
      ${data.socialLinks.email ? `<a href="mailto:${data.socialLinks.email}" class="social-link"><i class="fas fa-envelope"></i></a>` : ''}
    </div>
  ` : '';

  // Generate the complete HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} | ${data.title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    :root {
      --primary-color: ${colors.primary};
      --secondary-color: ${colors.secondary};
      --primary-light: ${colors.primaryLight};
      --primary-dark: ${colors.primaryDark};
      --text-color: #333;
      --background-color: #f9f9f9;
      --card-bg-color: #ffffff;
      --border-radius: 8px;
      --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background-color: var(--background-color);
      color: var(--text-color);
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 2rem 0;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid white;
      box-shadow: var(--box-shadow);
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    h2 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
    }
    
    h2:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: var(--primary-color);
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    section {
      margin-bottom: 3rem;
      padding: 2rem;
      background-color: var(--card-bg-color);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }
    
    .bio-section {
      text-align: center;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    
    .skill-item {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    
    .skill-level {
      font-size: 0.8rem;
      color: var(--primary-dark);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .project-card {
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--box-shadow);
      transition: var(--transition);
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    
    .project-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .project-card h3 {
      padding: 1rem 1rem 0.5rem;
      color: var(--primary-color);
    }
    
    .project-card p {
      padding: 0 1rem;
      flex-grow: 1;
    }
    
    .project-tags {
      padding: 0 1rem 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tag {
      padding: 0.2rem 0.6rem;
      background-color: var(--primary-light);
      color: var(--primary-dark);
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .project-link {
      display: inline-block;
      margin: 1rem;
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: var(--transition);
    }
    
    .project-link:hover {
      background-color: var(--primary-dark);
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      text-decoration: none;
      transition: var(--transition);
    }
    
    .social-link:hover {
      background-color: var(--primary-dark);
      transform: translateY(-3px);
    }
    
    footer {
      text-align: center;
      padding: 2rem;
      background-color: var(--primary-color);
      color: white;
      margin-top: 2rem;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
    
    /* Layout-specific styles */
    .modern-layout section {
      border-radius: 12px;
    }
    
    .creative-layout section {
      border-radius: 0;
      border-left: 5px solid var(--primary-color);
    }
    
    .classic-layout h2 {
      text-align: center;
    }
    
    .classic-layout h2:after {
      left: 50%;
      transform: translateX(-50%);
    }
  </style>
</head>
<body class="${layoutClass}">
  <header>
    <div class="container">
      <div class="profile">
        ${data.profileImage ? 
          `<img src="${data.profileImage}" alt="${data.name}" class="profile-image">` : 
          `<div class="profile-image" style="background-color: ${colors.secondary}; display: flex; align-items: center; justify-content: center; font-size: 3rem;">${data.name[0]}</div>`
        }
        <h1>${data.name}</h1>
        <p>${data.title}</p>
        ${socialLinksHTML}
      </div>
    </div>
  </header>
  
  <main class="container">
    <section class="bio-section">
      <h2>About Me</h2>
      <p>${data.bio || 'Professional with a passion for creating amazing experiences.'}</p>
    </section>
    
    ${skillsHTML}
    
    ${projectsHTML}
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
};

// Fallback HTML in case of errors
const generateFallbackHTML = (data: PortfolioData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name || 'Portfolio'}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; }
    section { margin-bottom: 30px; }
  </style>
</head>
<body>
  <header>
    <h1>${data.name || 'Portfolio'}</h1>
    <p>${data.title || 'Professional'}</p>
  </header>
  <main>
    <section>
      <h2>About Me</h2>
      <p>${data.bio || 'Welcome to my portfolio.'}</p>
    </section>
  </main>
</body>
</html>`;
};

// Helper function to get theme colors
const getThemeColors = (theme: string) => {
  const themeColors: Record<string, { primary: string, secondary: string, primaryLight: string, primaryDark: string }> = {
    blue: {
      primary: '#3B82F6',
      secondary: '#93C5FD',
      primaryLight: '#DBEAFE',
      primaryDark: '#1D4ED8'
    },
    purple: {
      primary: '#8B5CF6',
      secondary: '#C4B5FD',
      primaryLight: '#EDE9FE',
      primaryDark: '#6D28D9'
    },
    green: {
      primary: '#10B981',
      secondary: '#6EE7B7',
      primaryLight: '#D1FAE5',
      primaryDark: '#059669'
    },
    orange: {
      primary: '#F59E0B',
      secondary: '#FCD34D',
      primaryLight: '#FEF3C7',
      primaryDark: '#D97706'
    },
    teal: {
      primary: '#14B8A6',
      secondary: '#5EEAD4',
      primaryLight: '#CCFBF1',
      primaryDark: '#0D9488'
    },
    pink: {
      primary: '#EC4899',
      secondary: '#F9A8D4',
      primaryLight: '#FCE7F3',
      primaryDark: '#DB2777'
    },
    red: {
      primary: '#EF4444',
      secondary: '#FCA5A5',
      primaryLight: '#FEE2E2',
      primaryDark: '#DC2626'
    },
    slate: {
      primary: '#64748B',
      secondary: '#94A3B8',
      primaryLight: '#F1F5F9',
      primaryDark: '#475569'
    }
  };
  
  return themeColors[theme] || themeColors.blue;
};
