
// This file contains all the mock data used in the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  level?: number;
  xp?: number;
  class: string;
  language: string;
  theme: string;
  lastLogin: string;
  role: 'admin' | 'teacher' | 'student';
}

export interface Subject {
  id: string;
  name: string;
  lessonsCompleted: number;
  totalLessons: number;
  progress: number;
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  earnedDate?: string;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
}

export interface LeaderboardItem {
  id: string;
  name: string;
  avatar: string | null;
  score: number;
  position: number;
  // Adding the missing properties from error messages
  class: string;
  xp: number;
  level: number;
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  hasVoiceTutor: boolean;
  content: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  completed: boolean;
  score?: number;
}

// Current user data
export const currentUser: User = {
  id: '001',
  name: 'Alex Morgan',
  email: 'alex.morgan@inlustro.edu',
  avatar: null, // Add a URL here if you have an avatar image
  level: 5,
  xp: 2750,
  class: 'School Administrator',
  language: 'English',
  theme: 'light',
  lastLogin: '2025-05-10T08:30:00',
  role: 'admin'
};

// Subject progress data
export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    lessonsCompleted: 12,
    totalLessons: 15,
    progress: 80,
    color: '#33C3F0'
  },
  {
    id: 'science',
    name: 'Science',
    lessonsCompleted: 8,
    totalLessons: 12,
    progress: 67,
    color: '#9B87F5'
  },
  {
    id: 'english',
    name: 'English',
    lessonsCompleted: 15,
    totalLessons: 18,
    progress: 83,
    color: '#7E69AB'
  },
  {
    id: 'history',
    name: 'History',
    lessonsCompleted: 6,
    totalLessons: 10,
    progress: 60,
    color: '#6E59A5'
  }
];

// Weekly activity data
export const weeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 75 },
  { day: 'Fri', minutes: 90 },
  { day: 'Sat', minutes: 120 },
  { day: 'Sun', minutes: 45 }
];

// Badges
export const badges: Badge[] = [
  {
    id: 'b1',
    title: 'First Login',
    description: 'Logged in for the first time',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2025-01-15'
  },
  {
    id: 'b2',
    title: 'Perfect Score',
    description: 'Got 100% on a quiz',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2025-02-20'
  },
  {
    id: 'b3',
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2025-03-10'
  },
  {
    id: 'b4',
    title: 'Champion',
    description: 'Reached the top of the leaderboard',
    imageUrl: '/placeholder.svg',
    earned: false
  },
  {
    id: 'b5',
    title: 'Consistent',
    description: 'Logged in for 7 days in a row',
    imageUrl: '/placeholder.svg',
    earned: false
  }
];

// Leaderboard
export const leaderboard: LeaderboardItem[] = [
  {
    id: 'u1',
    name: 'Emma S.',
    avatar: null,
    score: 4250,
    position: 1,
    class: 'Advanced Mathematics',
    xp: 4250,
    level: 8
  },
  {
    id: 'u2',
    name: 'James L.',
    avatar: null,
    score: 4120,
    position: 2,
    class: 'Physics 101',
    xp: 4120,
    level: 7
  },
  {
    id: 'u3',
    name: 'Alex M.',
    avatar: null,
    score: 3890,
    position: 3,
    class: 'School Administrator',
    xp: 3890,
    level: 7
  },
  {
    id: 'u4',
    name: 'Sophia R.',
    avatar: null,
    score: 3700,
    position: 4,
    class: 'English Literature',
    xp: 3700,
    level: 6
  },
  {
    id: 'u5',
    name: 'Daniel K.',
    avatar: null,
    score: 3650,
    position: 5,
    class: 'Computer Science',
    xp: 3650,
    level: 6
  }
];

// Lessons data
export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Introduction to Algebra',
    subjectId: 'math',
    description: 'Learn the basics of algebraic expressions and equations',
    duration: '45 minutes',
    status: 'Completed',
    hasVoiceTutor: true,
    content: '<h2>Introduction to Algebra</h2><p>Algebra is a branch of mathematics that helps us solve problems by using symbols (usually letters) to represent numbers and quantities in formulas and equations.</p><p>In this lesson, we will cover:</p><ul><li>Variables and expressions</li><li>Simplifying expressions</li><li>Solving basic equations</li></ul><h3>Example:</h3><p>If x + 5 = 10, then x = 5.</p>'
  },
  {
    id: 'l2',
    title: 'Scientific Method',
    subjectId: 'science',
    description: 'Understand the process scientists use to investigate phenomena',
    duration: '30 minutes',
    status: 'In Progress',
    hasVoiceTutor: true,
    content: '<h2>The Scientific Method</h2><p>The scientific method is a systematic approach to understanding the natural world through observation and experimentation.</p><p>The steps include:</p><ol><li>Ask a question</li><li>Research the topic</li><li>Form a hypothesis</li><li>Test with an experiment</li><li>Analyze data and draw conclusions</li><li>Report results</li></ol>'
  },
  {
    id: 'l3',
    title: 'Essay Writing Techniques',
    subjectId: 'english',
    description: 'Master the art of writing compelling essays',
    duration: '60 minutes',
    status: 'Not Started',
    hasVoiceTutor: false,
    content: '<h2>Essay Writing Techniques</h2><p>A well-structured essay includes an introduction, body paragraphs, and a conclusion.</p><p>Key elements of good essay writing:</p><ul><li>Clear thesis statement</li><li>Supporting evidence</li><li>Logical transitions</li><li>Strong conclusion</li></ul>'
  },
  {
    id: 'l4',
    title: 'Ancient Civilizations',
    subjectId: 'history',
    description: 'Explore the great civilizations of Mesopotamia and Egypt',
    duration: '55 minutes',
    status: 'Not Started',
    hasVoiceTutor: true,
    content: '<h2>Ancient Civilizations</h2><p>Mesopotamia and Egypt were among the first complex societies to develop.</p><p>Key characteristics:</p><ul><li>Writing systems</li><li>Monumental architecture</li><li>Social hierarchies</li><li>Religious beliefs</li><li>Agricultural innovations</li></ul>'
  },
  {
    id: 'l5',
    title: 'Calculus Fundamentals',
    subjectId: 'math',
    description: 'Introduction to differential calculus',
    duration: '75 minutes',
    status: 'Not Started',
    hasVoiceTutor: true,
    content: '<h2>Calculus Fundamentals</h2><p>Calculus is the mathematical study of continuous change.</p><p>In this lesson we will cover:</p><ul><li>Limits</li><li>Derivatives</li><li>Basic differentiation rules</li><li>Applications of derivatives</li></ul>'
  }
];

// Quizzes data
export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Algebra Basics Quiz',
    subjectId: 'math',
    description: 'Test your knowledge of basic algebraic concepts',
    timeLimit: 20,
    completed: true,
    score: 85,
    questions: [
      {
        id: 1,
        text: 'Solve for x: 3x + 7 = 22',
        options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
        correctAnswer: 1,
        explanation: 'Subtracting 7 from both sides: 3x = 15. Dividing by 3: x = 5.',
        difficulty: 'easy'
      },
      {
        id: 2,
        text: 'Simplify: 2(x + 3) - 4x',
        options: ['2x + 6', '-2x + 6', '6x - 6', '2x - 6'],
        correctAnswer: 1,
        explanation: '2(x + 3) - 4x = 2x + 6 - 4x = -2x + 6',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Scientific Method Quiz',
    subjectId: 'science',
    description: 'Test your understanding of the scientific process',
    timeLimit: 15,
    completed: false,
    questions: [
      {
        id: 1,
        text: 'What is the first step of the scientific method?',
        options: ['Experiment', 'Ask a question', 'Form a hypothesis', 'Analyze data'],
        correctAnswer: 1,
        explanation: 'The scientific method begins with asking a question about something you observe.',
        difficulty: 'easy'
      },
      {
        id: 2,
        text: 'A hypothesis is best described as:',
        options: ['A proven theory', 'A testable prediction', 'An experimental result', 'A scientific law'],
        correctAnswer: 1,
        explanation: 'A hypothesis is a testable prediction that can be supported or refuted through experimentation.',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'q3',
    title: 'English Grammar Quiz',
    subjectId: 'english',
    description: 'Test your knowledge of English grammar rules',
    timeLimit: 25,
    completed: true,
    score: 92,
    questions: [
      {
        id: 1,
        text: 'Which sentence uses the correct form of its/it\'s?',
        options: [
          'The dog wagged it\'s tail.',
          'Its going to rain tomorrow.',
          'The book lost its cover.',
          'The company changed it\'s policy.'
        ],
        correctAnswer: 2,
        explanation: '"Its" is the possessive form, while "it\'s" is a contraction of "it is" or "it has".',
        difficulty: 'medium'
      }
    ]
  }
];
