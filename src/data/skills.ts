
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other';
  level: number; // 1-5
  color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  description: string;
  icon?: string;
  yearsExperience?: number;
  projects?: string[];
  relatedSkills?: string[];
  learningPath?: {
    year: number;
    milestone: string;
  }[];
}

export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Building interactive UIs with component-based architecture and state management',
    icon: '⚛️',
    yearsExperience: 4,
    projects: ['Portfolio Website', 'E-commerce Dashboard', 'Chat Application'],
    relatedSkills: ['TypeScript', 'Next.js', 'Redux'],
    learningPath: [
      { year: 2019, milestone: 'First React component' },
      { year: 2020, milestone: 'First production React app' },
      { year: 2021, milestone: 'Advanced state management' },
      { year: 2022, milestone: 'React performance optimization' },
      { year: 2023, milestone: 'React Server Components' }
    ]
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 4,
    color: 'blue',
    description: 'Adding type safety to JavaScript applications for robust code quality',
    icon: 'TS',
    yearsExperience: 3,
    projects: ['Banking API', 'CRM System', 'Analytics Dashboard'],
    relatedSkills: ['JavaScript', 'React', 'Node.js'],
    learningPath: [
      { year: 2020, milestone: 'Basic types and interfaces' },
      { year: 2021, milestone: 'Generic types and utility types' },
      { year: 2022, milestone: 'Advanced TypeScript patterns' },
      { year: 2023, milestone: 'TypeScript compiler customization' }
    ]
  },
  {
    name: 'CSS/Tailwind',
    category: 'frontend',
    level: 5,
    color: 'blue',
    description: 'Creating beautiful, responsive designs with utility-first approach and animations',
    icon: '🎨',
    yearsExperience: 5,
    projects: ['E-commerce Website', 'Educational Platform', 'Admin Dashboard'],
    relatedSkills: ['HTML', 'SASS', 'Framer Motion'],
    learningPath: [
      { year: 2018, milestone: 'CSS fundamentals' },
      { year: 2019, milestone: 'Responsive design' },
      { year: 2020, milestone: 'CSS animations' },
      { year: 2021, milestone: 'Tailwind adoption' },
      { year: 2022, milestone: 'Complex UI components' }
    ]
  },
  {
    name: 'Next.js',
    category: 'frontend',
    level: 4,
    color: 'pink',
    description: 'Building fast, SEO-friendly React applications with server-side rendering',
    icon: '▲',
    yearsExperience: 3,
    projects: ['Company Website', 'Blog Platform', 'Marketing Site'],
    relatedSkills: ['React', 'TypeScript', 'Vercel'],
    learningPath: [
      { year: 2020, milestone: 'First Next.js app' },
      { year: 2021, milestone: 'SSR and SSG' },
      { year: 2022, milestone: 'Next.js API routes' },
      { year: 2023, milestone: 'App Router and Server Components' }
    ]
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Building scalable backend services with JavaScript for high-performance applications',
    icon: '🟢',
    yearsExperience: 4,
    projects: ['REST API', 'Authentication Service', 'Real-time Chat Backend'],
    relatedSkills: ['Express', 'MongoDB', 'Socket.io'],
    learningPath: [
      { year: 2019, milestone: 'Basic HTTP server' },
      { year: 2020, milestone: 'Express routes and middleware' },
      { year: 2021, milestone: 'Performance optimization' },
      { year: 2022, milestone: 'Microservices architecture' }
    ]
  },
  {
    name: 'Python',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Web services, data analysis, and machine learning models for complex applications',
    icon: '🐍',
    yearsExperience: 4,
    projects: ['Data Analysis Tool', 'ML Model', 'Web Scraper'],
    relatedSkills: ['Django', 'Flask', 'Pandas'],
    learningPath: [
      { year: 2019, milestone: 'Python basics' },
      { year: 2020, milestone: 'Web development with Django' },
      { year: 2021, milestone: 'Data analysis with pandas' },
      { year: 2022, milestone: 'Machine learning with scikit-learn' }
    ]
  },
  {
    name: 'Express',
    category: 'backend',
    level: 4,
    color: 'green',
    description: 'Fast, unopinionated web framework for Node.js to build robust APIs',
    icon: '🚂',
    yearsExperience: 3,
    projects: ['REST API', 'E-commerce Backend', 'Authentication Service'],
    relatedSkills: ['Node.js', 'MongoDB', 'JWT'],
    learningPath: [
      { year: 2020, milestone: 'Basic route handling' },
      { year: 2021, milestone: 'Middleware and authentication' },
      { year: 2022, milestone: 'API optimization and security' }
    ]
  },
  {
    name: 'MongoDB',
    category: 'database',
    level: 3,
    color: 'green',
    description: 'Document-based NoSQL database for flexible schemas and quick iterations',
    icon: '🍃',
    yearsExperience: 3,
    projects: ['User Management System', 'Content Management System', 'Analytics Platform'],
    relatedSkills: ['Mongoose', 'Node.js', 'Express'],
    learningPath: [
      { year: 2020, milestone: 'CRUD operations' },
      { year: 2021, milestone: 'Aggregation pipelines' },
      { year: 2022, milestone: 'Indexing and performance' }
    ]
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 4,
    color: 'blue',
    description: 'Powerful, open-source relational database management system with advanced features',
    icon: '🐘',
    yearsExperience: 3,
    projects: ['Financial System', 'Inventory Management', 'Booking Platform'],
    relatedSkills: ['SQL', 'Node.js', 'Prisma'],
    learningPath: [
      { year: 2020, milestone: 'Basic SQL queries' },
      { year: 2021, milestone: 'Database design' },
      { year: 2022, milestone: 'Performance tuning' }
    ]
  },
  {
    name: 'Firebase',
    category: 'database',
    level: 5,
    color: 'orange',
    description: 'Google\'s platform for quick backend setup with realtime database and authentication',
    icon: '🔥',
    yearsExperience: 4,
    projects: ['Mobile App Backend', 'User Authentication', 'Realtime Chat'],
    relatedSkills: ['Firestore', 'Authentication', 'Cloud Functions'],
    learningPath: [
      { year: 2019, milestone: 'Authentication and Realtime Database' },
      { year: 2020, milestone: 'Firestore and Security Rules' },
      { year: 2021, milestone: 'Cloud Functions' },
      { year: 2022, milestone: 'Firebase Extensions' }
    ]
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 3,
    color: 'blue',
    description: 'Containerizing applications for consistent deployment across environments',
    icon: '🐳',
    yearsExperience: 2,
    projects: ['Microservices Architecture', 'CI/CD Pipeline', 'Development Environment'],
    relatedSkills: ['Kubernetes', 'Docker Compose', 'CI/CD'],
    learningPath: [
      { year: 2021, milestone: 'Basic containerization' },
      { year: 2022, milestone: 'Multi-container applications' },
      { year: 2023, milestone: 'Docker optimization' }
    ]
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 3,
    color: 'orange',
    description: 'Cloud services for hosting and scaling applications with global infrastructure',
    icon: '☁️',
    yearsExperience: 2,
    projects: ['Serverless API', 'Image Processing Service', 'Cloud Infrastructure'],
    relatedSkills: ['Lambda', 'S3', 'EC2'],
    learningPath: [
      { year: 2021, milestone: 'EC2 and S3' },
      { year: 2022, milestone: 'Lambda and API Gateway' },
      { year: 2023, milestone: 'CloudFormation and IaC' }
    ]
  },
  {
    name: 'CI/CD',
    category: 'devops',
    level: 4,
    color: 'purple',
    description: 'Automated testing and deployment pipelines for reliable software delivery',
    icon: '🔄',
    yearsExperience: 3,
    projects: ['Automated Deployment', 'Test Automation', 'Release Management'],
    relatedSkills: ['GitHub Actions', 'Jenkins', 'Travis CI'],
    learningPath: [
      { year: 2020, milestone: 'Basic automation' },
      { year: 2021, milestone: 'Continuous integration' },
      { year: 2022, milestone: 'Continuous deployment' }
    ]
  },
  {
    name: 'React Native',
    category: 'mobile',
    level: 3,
    color: 'blue',
    description: 'Cross-platform mobile app development with native-like performance',
    icon: '📱',
    yearsExperience: 2,
    projects: ['E-commerce Mobile App', 'Fitness Tracker', 'Social Media App'],
    relatedSkills: ['React', 'JavaScript', 'Native Modules'],
    learningPath: [
      { year: 2021, milestone: 'Basic mobile UI' },
      { year: 2022, milestone: 'Native modules integration' }
    ]
  },
  {
    name: 'Flutter',
    category: 'mobile',
    level: 2,
    color: 'blue',
    description: 'Google\'s UI toolkit for building natively compiled applications',
    icon: '🦋',
    yearsExperience: 1,
    projects: ['Weather App', 'To-Do List', 'News Reader'],
    relatedSkills: ['Dart', 'Material Design', 'Mobile Development'],
    learningPath: [
      { year: 2022, milestone: 'Dart basics' },
      { year: 2023, milestone: 'Flutter widgets' }
    ]
  },
  {
    name: 'GraphQL',
    category: 'other',
    level: 4,
    color: 'pink',
    description: 'Efficient data querying and manipulation with type-safe API development',
    icon: '⚡',
    yearsExperience: 3,
    projects: ['API Gateway', 'Client-Server Communication', 'Data Aggregation'],
    relatedSkills: ['Apollo', 'Node.js', 'TypeScript'],
    learningPath: [
      { year: 2020, milestone: 'Schema definition' },
      { year: 2021, milestone: 'Resolvers and mutations' },
      { year: 2022, milestone: 'Performance optimization' }
    ]
  },
  {
    name: 'Git & GitHub',
    category: 'other',
    level: 5,
    color: 'purple',
    description: 'Version control and collaboration for effective team development',
    icon: '🔄',
    yearsExperience: 5,
    projects: ['Open Source Contribution', 'Team Collaboration', 'Version Control'],
    relatedSkills: ['Git Flow', 'Code Review', 'Pull Requests'],
    learningPath: [
      { year: 2018, milestone: 'Basic git commands' },
      { year: 2019, milestone: 'Branching strategies' },
      { year: 2020, milestone: 'Pull requests and code review' },
      { year: 2021, milestone: 'GitHub Actions' }
    ]
  },
  {
    name: 'AI/ML',
    category: 'other',
    level: 3,
    color: 'green',
    description: 'Implementing machine learning models and AI solutions for smart applications',
    icon: '🧠',
    yearsExperience: 2,
    projects: ['Sentiment Analysis', 'Recommendation System', 'Image Recognition'],
    relatedSkills: ['Python', 'TensorFlow', 'scikit-learn'],
    learningPath: [
      { year: 2021, milestone: 'ML fundamentals' },
      { year: 2022, milestone: 'Neural networks' },
      { year: 2023, milestone: 'Natural language processing' }
    ]
  }
];
