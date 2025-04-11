
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  level: number; // 1-5
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  description: string;
  icon?: string;
}

export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Building interactive UIs with component-based architecture and state management',
    icon: '⚛️'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 4,
    color: 'blue',
    description: 'Adding type safety to JavaScript applications for robust code quality',
    icon: 'TS'
  },
  {
    name: 'CSS/Tailwind',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Creating beautiful, responsive designs with utility-first approach and animations',
    icon: '🎨'
  },
  {
    name: 'Next.js',
    category: 'frontend',
    level: 4,
    color: 'pink',
    description: 'Building fast, SEO-friendly React applications with server-side rendering',
    icon: '▲'
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Building scalable backend services with JavaScript for high-performance applications',
    icon: '🟢'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Web services, data analysis, and machine learning models for complex applications',
    icon: '🐍'
  },
  {
    name: 'Express',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Fast, unopinionated web framework for Node.js to build robust APIs',
    icon: '🚂'
  },
  {
    name: 'MongoDB',
    category: 'database',
    level: 3,
    color: 'green',
    description: 'Document-based NoSQL database for flexible schemas and quick iterations',
    icon: '🍃'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 4,
    color: 'blue',
    description: 'Powerful, open-source relational database management system with advanced features',
    icon: '🐘'
  },
  {
    name: 'Firebase',
    category: 'database',
    level: 5,
    color: 'orange',
    description: 'Google\'s platform for quick backend setup with realtime database and authentication',
    icon: '🔥'
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 3,
    color: 'blue',
    description: 'Containerizing applications for consistent deployment across environments',
    icon: '🐳'
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 3,
    color: 'orange',
    description: 'Cloud services for hosting and scaling applications with global infrastructure',
    icon: '☁️'
  },
  {
    name: 'CI/CD',
    category: 'devops',
    level: 4,
    color: 'purple',
    description: 'Automated testing and deployment pipelines for reliable software delivery',
    icon: '🔄'
  },
  {
    name: 'React Native',
    category: 'mobile',
    level: 3,
    color: 'blue',
    description: 'Cross-platform mobile app development with native-like performance',
    icon: '📱'
  },
  {
    name: 'Flutter',
    category: 'mobile',
    level: 2,
    color: 'blue',
    description: 'Google\'s UI toolkit for building natively compiled applications',
    icon: '🦋'
  },
  {
    name: 'GraphQL',
    category: 'other',
    level: 4,
    color: 'pink',
    description: 'Efficient data querying and manipulation with type-safe API development',
    icon: '⚡'
  },
  {
    name: 'Git & GitHub',
    category: 'other',
    level: 5,
    color: 'purple',
    description: 'Version control and collaboration for effective team development',
    icon: '🔄'
  },
  {
    name: 'AI/ML',
    category: 'other',
    level: 3,
    color: 'green',
    description: 'Implementing machine learning models and AI solutions for smart applications',
    icon: '🧠'
  }
];
