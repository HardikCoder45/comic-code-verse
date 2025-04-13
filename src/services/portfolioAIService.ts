
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

// Groq API key - in production this should be stored securely
const GROQ_API_KEY = "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";
const GROQ_MODEL = "meta-llama/llama-4-maverick-17b-128e-instruct";

export const generatePortfolioHTML = async (promptData: PortfolioData, customPrompt?: string): Promise<string> => {
  try {
    // Display loading toast
    toast.loading("Generating portfolio with AI...");
    
    // Create structured data for the prompt
    const structuredData = JSON.stringify(promptData, null, 2);
    
    // Create the prompt for the AI
    let prompt = `Generate a professional, responsive HTML portfolio page with the following information:
    
${structuredData}

The HTML should:
1. Be a single, complete HTML file with inline CSS
2. Use a clean, modern design in light mode
3. Be fully responsive for mobile, tablet, and desktop
4. Include sections for: intro, about me, skills, projects, and contact
5. Use appropriate icons for social links
6. Implement subtle animations and hover effects
7. Include SEO meta tags
8. Use semantic HTML5
9. Include FontAwesome or similar for icons
10. Have a color scheme based on the theme: ${promptData.theme}
11. Use the layout style: ${promptData.layout}
12. Be ready to use without any additional files or dependencies
13. Include proper spacing, typography, and visual hierarchy
14. Return ONLY the HTML code without any explanation or markdown formatting

The code should be modern, valid HTML5, and follow best practices.`;

    // Add custom prompt if provided
    if (customPrompt && customPrompt.trim().length > 0) {
      prompt += `\n\nAdditional instructions: ${customPrompt}`;
    }

    // Call the Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an expert HTML and CSS developer. You create beautiful, responsive portfolio websites from user specifications. Your responses should contain ONLY the complete HTML code without any explanations or markdown formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      toast.dismiss();
      toast.error("Failed to generate portfolio with AI. Please try again.");
      return generateFallbackHTML(promptData);
    }

    // Parse the response
    const data = await response.json();
    const generatedHtml = data.choices[0].message.content.trim();
    
    // Clean up the response if it contains markdown code blocks
    const cleanedHtml = generatedHtml.replace(/```html|```/g, "").trim();
    
    toast.dismiss();
    toast.success("Portfolio generated successfully!");
    
    return cleanedHtml;
  } catch (error) {
    console.error('Error generating portfolio:', error);
    toast.dismiss();
    toast.error('Failed to generate portfolio. Please try again.');
    return generateFallbackHTML(promptData);
  }
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
