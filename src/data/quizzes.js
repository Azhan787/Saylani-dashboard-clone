export const quizzesList = [
  { id: 1, title: 'Javascript (Quiz-4)', module: 'Modern Front-End Development', questions: 40, attempts: '3/3', percentage: 35, status: 'FAILED' },
  { id: 2, title: 'Javascript (Quiz-3)', module: 'Modern Front-End Development', questions: 40, attempts: '1/3', percentage: 57, status: 'FAILED' },
  { id: 3, title: 'Javascript (Quiz-2)', module: 'Modern Front-End Development', questions: 40, attempts: '1/3', percentage: 50, status: 'FAILED' },
  { id: 4, title: 'Javascript (Quiz-1)', module: 'Modern Front-End Development', questions: 40, attempts: '1/3', percentage: 70, status: 'PASSED' },
  { id: 5, title: 'CSS Quiz', module: 'Front-End Development', questions: 40, attempts: '1/3', percentage: 53, status: 'FAILED' },
  { id: 6, title: 'HTML Quiz', module: 'Web Designing', questions: 40, attempts: '1/3', percentage: 65, status: 'FAILED' },
  { id: 7, title: 'React Fundamentals Quiz', module: 'Modern Front-End Development', questions: 10, attempts: '0/3', percentage: null, status: 'NOT ATTEMPTED' },
]

export const sampleQuizQuestions = [
  {
    id: 1,
    question: 'What does useState do in React?',
    options: ['Creates a route', 'Manages component state', 'Creates an API', 'Connects MongoDB'],
    answer: 1,
  },
  {
    id: 2,
    question: 'Which hook is used to perform side effects in a function component?',
    options: ['useMemo', 'useRef', 'useEffect', 'useCallback'],
    answer: 2,
  },
  {
    id: 3,
    question: 'What is the virtual DOM?',
    options: [
      'A backup of the real DOM stored on the server',
      'A lightweight in-memory representation of the real DOM',
      'A browser extension for debugging',
      'A CSS rendering engine',
    ],
    answer: 1,
  },
  {
    id: 4,
    question: 'Which method is used to render a list of elements in React?',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    answer: 1,
  },
  {
    id: 5,
    question: 'What does JSX stand for?',
    options: ['Java Syntax Extension', 'JavaScript XML', 'JSON Syntax Extension', 'Java Style Xtension'],
    answer: 1,
  },
  {
    id: 6,
    question: 'How do you pass data from a parent to a child component?',
    options: ['Using state', 'Using props', 'Using context only', 'Using refs only'],
    answer: 1,
  },
  {
    id: 7,
    question: 'Which array method does NOT mutate the original array?',
    options: ['push()', 'splice()', 'map()', 'sort()'],
    answer: 2,
  },
  {
    id: 8,
    question: 'What is the correct way to update state based on the previous state?',
    options: [
      'setState(state + 1)',
      'setState(prev => prev + 1)',
      'state = state + 1',
      'this.state++',
    ],
    answer: 1,
  },
  {
    id: 9,
    question: 'What keyword declares a block-scoped variable in JavaScript?',
    options: ['var', 'let', 'global', 'static'],
    answer: 1,
  },
  {
    id: 10,
    question: 'What does the "key" prop help React do?',
    options: [
      'Style list items',
      'Identify which items have changed, been added, or removed',
      'Encrypt component data',
      'Sort array elements automatically',
    ],
    answer: 1,
  },
]

export const trainerQuizzes = [
  { id: 1, title: 'Javascript (Quiz-4)', module: 'Modern Front-End Development', questions: 40, passPercentage: 60, timeLimit: 45, attempts: 24, avgScore: 48 },
  { id: 2, title: 'CSS Quiz', module: 'Front-End Development', questions: 40, passPercentage: 60, timeLimit: 40, attempts: 24, avgScore: 61 },
  { id: 3, title: 'HTML Quiz', module: 'Web Designing', questions: 40, passPercentage: 60, timeLimit: 40, attempts: 24, avgScore: 70 },
]
