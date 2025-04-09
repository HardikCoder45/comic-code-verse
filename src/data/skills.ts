
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  level: number; // 1-5
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  description: string;
}

export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Building interactive UIs with component-based architecture'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 4,
    color: 'blue',
    description: 'Adding type safety to JavaScript applications'
  },
  {
    name: 'CSS/Tailwind',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Creating beautiful, responsive designs with utility-first approach'
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Building scalable backend services with JavaScript'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Web services, data analysis, and machine learning'
  },
  {
    name: 'MongoDB',
    category: 'database',
    level: 3,
    color: 'green',
    description: 'Document-based NoSQL database for flexible schemas'
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 4,
    color: 'blue',
    description: 'Relational database management system'
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 3,
    color: 'blue',
    description: 'Containerizing applications for consistent deployment'
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 3,
    color: 'orange',
    description: 'Cloud services for hosting and scaling applications'
  },
  {
    name: 'React Native',
    category: 'mobile',
    level: 3,
    color: 'blue',
    description: 'Cross-platform mobile app development'
  },
  {
    name: 'GraphQL',
    category: 'other',
    level: 4,
    color: 'pink',
    description: 'Efficient data querying and manipulation'
  },
  {
    name: 'Git & GitHub',
    category: 'other',
    level: 5,
    color: 'purple',
    description: 'Version control and collaboration'
  }
];
