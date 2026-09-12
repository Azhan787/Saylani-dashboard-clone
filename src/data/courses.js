export const activeCourse = {
  id: 'mwad-20',
  title: 'Modern Web Application Development',
  status: 'ENROLLED',
  schedule: [
    { day: 'Mon', time: '01:00 PM - 03:00 PM' },
    { day: 'Wed', time: '01:00 PM - 03:00 PM' },
    { day: 'Fri', time: '01:00 PM - 03:00 PM' },
  ],
  progress: 73,
  batch: 20,
  roll: '447877',
  campus: 'Tayyebah Academy Campus',
  city: 'Karachi',
}

export const classSchedule = [
  { label: 'Sun', date: '06', active: false },
  { label: 'Mon', date: '07', active: true },
  { label: 'Tue', date: '08', active: false },
  { label: 'Wed', date: '09', active: true },
  { label: 'Thu', date: '10', active: false },
  { label: 'Fri', date: '11', active: true },
  { label: 'Sat', date: '12', active: false },
]

export const modules = [
  {
    id: 'web-designing',
    title: 'Web Designing',
    total: 20,
    completed: 20,
    percent: 100,
    status: 'complete',
    completedTopics: [
      'HTML Basics', 'HTML Forms', 'Semantic HTML', 'CSS Fundamentals',
      'CSS Box Model', 'Flexbox', 'CSS Grid', 'Responsive Design',
      'CSS Animations', 'CSS Variables', 'Typography', 'Color Theory',
      'SASS Basics', 'BEM Methodology', 'Accessibility Basics',
      'Cross Browser Testing', 'Figma to Code', 'Mobile First Design',
      'CSS Frameworks', 'Design Systems',
    ],
    pendingTopics: [],
  },
  {
    id: 'frontend-dev',
    title: 'Front-End Development',
    total: 31,
    completed: 26,
    percent: 84,
    status: 'in-progress',
    completedTopics: [
      'JavaScript Basics', 'Variables & Data Types', 'Functions', 'Arrays',
      'Objects', 'DOM Manipulation', 'Events', 'Event Bubbling',
      'ES6 Features', 'Arrow Functions', 'Destructuring', 'Spread & Rest',
      'Promises', 'Async/Await', 'Fetch API', 'JSON Handling',
      'LocalStorage', 'Error Handling', 'Closures', 'Higher Order Functions',
      'Array Methods', 'Modules', 'Debugging Tools', 'Form Validation',
      'Timers', 'Regular Expressions',
    ],
    pendingTopics: [
      'Design Patterns', 'Web Components', 'Service Workers', 'Web Sockets', 'Performance Optimization',
    ],
  },
  {
    id: 'modern-frontend',
    title: 'Modern Front-End Development',
    total: 14,
    completed: 10,
    percent: 71,
    status: 'in-progress',
    completedTopics: [
      'React Fundamentals', 'JSX', 'Components & Props', 'State',
      'Hooks Overview', 'useState', 'useEffect', 'Conditional Rendering',
      'Lists & Keys', 'Forms in React',
    ],
    pendingTopics: [
      'React Router', 'Context API', 'Custom Hooks', 'Performance in React',
    ],
  },
  {
    id: 'backend-dev',
    title: 'Back-End Development',
    total: 16,
    completed: 0,
    percent: 0,
    status: 'pending',
    completedTopics: [],
    pendingTopics: [
      'Node.js Basics', 'NPM & Packages', 'Express.js', 'Routing',
      'Middleware', 'REST APIs', 'Databases Overview', 'SQL Basics',
      'MongoDB Basics', 'Mongoose', 'Authentication', 'JWT',
      'File Uploads', 'Error Handling', 'API Testing', 'Deployment Basics',
    ],
  },
]
