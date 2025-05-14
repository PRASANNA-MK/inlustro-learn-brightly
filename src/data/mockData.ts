import { User as UserIcon, Book, Code, GraduationCap, ListChecks, Presentation, MessageSquare } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  lessonsCompleted: number;
  totalLessons: number;
  progress: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  class: string;
  level: number;
  xp: number;
  lastLogin: string;
  language: string;
  theme: 'light' | 'dark';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  earnedDate?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  class: string;
  level: number;
  xp: number;
}

export const navigation = [
  {
    title: 'Dashboard',
    href: '/',
    icon: UserIcon,
  },
  {
    title: 'Lessons',
    href: '/lessons',
    icon: Book,
  },
  {
    title: 'Quizzes',
    href: '/quizzes',
    icon: ListChecks,
  },
  {
    title: 'AI Voice Tutor',
    href: '/ai-tutor',
    icon: Presentation,
  },
  {
    title: 'Chatbot',
    href: MessageSquare,
  },
  {
    title: 'Gamification',
    href: '/gamification',
    icon: Code,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: GraduationCap,
  },
];

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Math',
    lessonsCompleted: 8,
    totalLessons: 12,
    progress: 67,
    color: '#33C3F0'
  },
  {
    id: '2',
    name: 'Science',
    lessonsCompleted: 5,
    totalLessons: 10,
    progress: 50,
    color: '#4CAF50'
  },
  {
    id: '3',
    name: 'English',
    lessonsCompleted: 3,
    totalLessons: 8,
    progress: 38,
    color: '#FF9800'
  },
  {
    id: '4',
    name: 'History',
    lessonsCompleted: 6,
    totalLessons: 9,
    progress: 67,
    color: '#9C27B0'
  }
];

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  class: '10th Grade',
  level: 5,
  xp: 450,
  lastLogin: new Date(2023, 10, 20).toISOString(),
  language: 'English',
  theme: 'light'
};

// Extend the Lesson interface to include hasVoiceTutor property
export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  duration: string;
  description?: string;
  content: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  hasVoiceTutor?: boolean;
}

// Mock data for lessons
export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subjectId: '1', // Math
    duration: '20 minutes',
    description: 'Learn the basics of algebraic expressions and equations.',
    content: `
      <h2>Introduction to Algebra</h2>
      <p>Algebra is a branch of mathematics that uses symbols and letters to represent numbers, quantities, and operations in formulas and equations.</p>
      <h3>Key Concepts</h3>
      <ul>
        <li>Variables - Letters that represent unknown values</li>
        <li>Constants - Fixed values that don't change</li>
        <li>Expressions - Combinations of variables, constants, and operations</li>
        <li>Equations - Statements that show two expressions are equal</li>
      </ul>
      <p>In this lesson, we'll explore how to manipulate algebraic expressions and solve simple equations.</p>
    `,
    status: 'In Progress',
    hasVoiceTutor: true
  },
  {
    id: '2',
    title: 'Photosynthesis Explained',
    subjectId: '2', // Science
    duration: '25 minutes',
    description: 'Discover how plants convert sunlight into energy through photosynthesis.',
    content: `
      <h2>Photosynthesis</h2>
      <p>Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose.</p>
      <h3>The Process</h3>
      <p>The basic equation for photosynthesis is:</p>
      <p>6CO<sub>2</sub> + 6H<sub>2</sub>O + Light Energy → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub></p>
      <h3>Components Involved</h3>
      <ul>
        <li>Chlorophyll - The green pigment that captures light energy</li>
        <li>Chloroplasts - The organelles where photosynthesis occurs</li>
        <li>Stomata - Small pores in leaves that allow gas exchange</li>
      </ul>
      <p>Through this process, plants produce the oxygen we breathe and the glucose they need for growth.</p>
    `,
    status: 'Not Started',
    hasVoiceTutor: true
  },
  {
    id: '3',
    title: 'Shakespeare\'s Major Works',
    subjectId: '3', // English
    duration: '30 minutes',
    description: 'Explore the themes and language in Shakespeare\'s most famous plays and sonnets.',
    content: `
      <h2>Shakespeare's Major Works</h2>
      <p>William Shakespeare (1564-1616) was an English playwright, poet, and actor. He is widely regarded as the greatest writer in the English language.</p>
      <h3>Major Plays</h3>
      <ul>
        <li>Tragedies: Hamlet, Macbeth, Romeo and Juliet, King Lear, Othello</li>
        <li>Comedies: A Midsummer Night's Dream, Much Ado About Nothing, Twelfth Night</li>
        <li>Histories: Henry V, Richard III, Julius Caesar</li>
      </ul>
      <h3>Sonnets</h3>
      <p>Shakespeare wrote 154 sonnets dealing with themes of love, beauty, mortality, and the passage of time.</p>
      <p>His works continue to be studied and performed worldwide, influencing literature and culture for over 400 years.</p>
    `,
    status: 'Completed',
    hasVoiceTutor: true
  }
];

// Update the quiz interface to include more comprehensive fields for the enhanced quiz feature
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  description?: string;
  totalQuestions: number;
  timeLimit?: number; // time limit in minutes
  completed?: boolean;
  score?: number;
  questions: Question[];
}

// Enhance quiz data
export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    subjectId: '1',
    description: 'Test your knowledge of basic algebraic concepts',
    totalQuestions: 5,
    timeLimit: 10,
    completed: false,
    questions: [
      {
        id: 'q1-1',
        text: 'If x + 5 = 9, what is the value of x?',
        options: ['2', '4', '5', '14'],
        correctAnswer: 1,
        explanation: 'To solve for x, subtract 5 from both sides: x + 5 - 5 = 9 - 5, which gives x = 4.'
      },
      {
        id: 'q1-2',
        text: 'Simplify the expression: 3(x + 2) - 4x',
        options: ['3x + 6 - 4x', '3x - 4x + 6', 'x + 6', '-x + 6'],
        correctAnswer: 3,
        explanation: 'First distribute: 3(x + 2) - 4x = 3x + 6 - 4x. Then combine like terms: 3x - 4x + 6 = -x + 6'
      },
      {
        id: 'q1-3',
        text: 'Which of the following is equivalent to 2(x - 3) + 4?',
        options: ['2x - 6 + 4', '2x - 2', '2x - 2 + 4', '2x - 6'],
        correctAnswer: 0,
        explanation: 'Distribute 2: 2(x - 3) + 4 = 2x - 6 + 4 = 2x - 2'
      },
      {
        id: 'q1-4',
        text: 'Solve for y: 3y - 7 = 8',
        options: ['y = 5', 'y = 1', 'y = 15/3', 'y = 5/3'],
        correctAnswer: 0,
        explanation: 'Add 7 to both sides: 3y - 7 + 7 = 8 + 7, so 3y = 15. Then divide by 3: y = 15/3 = 5'
      },
      {
        id: 'q1-5',
        text: 'If 2x + 3y = 12 and y = 2, what is x?',
        options: ['x = 3', 'x = 6', 'x = 3/2', 'x = 3/4'],
        correctAnswer: 2,
        explanation: 'Substitute y = 2 into the equation: 2x + 3(2) = 12, so 2x + 6 = 12. Subtract 6 from both sides: 2x = 6. Divide by 2: x = 3'
      }
    ]
  },
  {
    id: '2',
    title: 'Photosynthesis Quiz',
    subjectId: '2',
    description: 'Test your understanding of how plants make their own food',
    totalQuestions: 4,
    timeLimit: 8,
    completed: true,
    score: 75,
    questions: [
      {
        id: 'q2-1',
        text: 'What gas do plants take in during photosynthesis?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 1,
        explanation: 'Plants take in carbon dioxide (CO2) during photosynthesis, which they use to produce glucose.'
      },
      {
        id: 'q2-2',
        text: 'Where does photosynthesis occur in plant cells?',
        options: ['Mitochondria', 'Nucleus', 'Chloroplasts', 'Vacuole'],
        correctAnswer: 2,
        explanation: 'Photosynthesis occurs in the chloroplasts, which contain chlorophyll that captures light energy.'
      },
      {
        id: 'q2-3',
        text: 'What is the main pigment responsible for capturing light energy in plants?',
        options: ['Chlorophyll', 'Melanin', 'Hemoglobin', 'Carotene'],
        correctAnswer: 0,
        explanation: 'Chlorophyll is the main pigment that captures light energy for photosynthesis, giving plants their green color.'
      },
      {
        id: 'q2-4',
        text: 'Which of the following is NOT a product of photosynthesis?',
        options: ['Glucose', 'Oxygen', 'Water', 'ATP'],
        correctAnswer: 3,
        explanation: 'The main products of photosynthesis are glucose and oxygen. ATP is produced during cellular respiration.'
      }
    ]
  },
  {
    id: '3',
    title: 'Shakespeare\'s Plays',
    subjectId: '3',
    description: 'Test your knowledge of Shakespeare\'s famous works',
    totalQuestions: 4,
    timeLimit: 6,
    completed: false,
    questions: [
      {
        id: 'q3-1',
        text: 'Which play features the line "To be, or not to be"?',
        options: ['Macbeth', 'Romeo and Juliet', 'Hamlet', 'King Lear'],
        correctAnswer: 2,
        explanation: 'The famous soliloquy "To be, or not to be" appears in Act III, Scene 1 of Hamlet.'
      },
      {
        id: 'q3-2',
        text: 'In which city is "Romeo and Juliet" set?',
        options: ['Venice', 'Verona', 'Rome', 'Florence'],
        correctAnswer: 1,
        explanation: 'Romeo and Juliet is set in Verona, Italy, where the two feuding families (Montagues and Capulets) live.'
      },
      {
        id: 'q3-3',
        text: 'Which character speaks the line "All the world\'s a stage"?',
        options: ['Hamlet', 'Macbeth', 'Jacques', 'Othello'],
        correctAnswer: 2,
        explanation: 'Jacques speaks this famous line in "As You Like It" (Act II, Scene 7).'
      },
      {
        id: 'q3-4',
        text: 'How many plays is Shakespeare generally credited with writing?',
        options: ['25', '37', '42', '50'],
        correctAnswer: 1,
        explanation: 'Shakespeare is generally credited with writing 37 plays, although some scholars debate the exact number.'
      }
    ]
  }
];

// Add badges data
export const badges: Badge[] = [
  {
    id: 'badge-1',
    title: 'First Lesson',
    description: 'Completed your first lesson',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: new Date(2023, 9, 15).toISOString()
  },
  {
    id: 'badge-2',
    title: 'Quiz Master',
    description: 'Scored 100% on a quiz',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: new Date(2023, 9, 20).toISOString()
  },
  {
    id: 'badge-3',
    title: 'Study Streak',
    description: 'Studied for 5 consecutive days',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: new Date(2023, 10, 1).toISOString()
  },
  {
    id: 'badge-4',
    title: 'Subject Expert',
    description: 'Completed all lessons in a subject',
    imageUrl: '/placeholder.svg',
    earned: false
  },
  {
    id: 'badge-5',
    title: 'Knowledge Explorer',
    description: 'Tried lessons from all subjects',
    imageUrl: '/placeholder.svg',
    earned: false
  }
];

// Add leaderboard data
export const leaderboard: LeaderboardEntry[] = [
  {
    id: 'user-2',
    name: 'Emma Watson',
    avatar: '/placeholder.svg',
    class: '10th Grade',
    level: 8,
    xp: 780
  },
  {
    id: 'user-3',
    name: 'Noah Smith',
    avatar: '/placeholder.svg',
    class: '10th Grade',
    level: 7,
    xp: 720
  },
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: '/placeholder.svg',
    class: '10th Grade',
    level: 5,
    xp: 450
  },
  {
    id: 'user-4',
    name: 'Olivia Brown',
    avatar: '/placeholder.svg',
    class: '10th Grade',
    level: 4,
    xp: 380
  },
  {
    id: 'user-5',
    name: 'William Johnson',
    avatar: '/placeholder.svg',
    class: '10th Grade',
    level: 3,
    xp: 320
  }
];

// Add weekly activity data
export const weeklyActivity = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 65 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 75 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 40 }
];
