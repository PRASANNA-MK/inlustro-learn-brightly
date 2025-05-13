
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  class: string;
  level: number;
  xp: number;
  language: string;
  theme: 'light' | 'dark';
  lastLogin: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface Lesson {
  id: string;
  title: string;
  subjectId: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  duration: string;
  content: string;
  imageUrl?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  questions: Question[];
  completed: boolean;
  score?: number;
  totalQuestions: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
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
  xp: number;
  level: number;
  class: string;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
}

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@school.edu',
  avatar: '/placeholder.svg',
  class: '10th Grade',
  level: 15,
  xp: 3450,
  language: 'English',
  theme: 'light',
  lastLogin: '2023-05-12T14:32:00Z',
};

export const subjects: Subject[] = [
  {
    id: 's1',
    name: 'Mathematics',
    icon: 'calculator',
    color: '#33C3F0',
    progress: 68,
    lessonsCompleted: 12,
    totalLessons: 18,
  },
  {
    id: 's2',
    name: 'Science',
    icon: 'flask',
    color: '#F9E559',
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
  },
  {
    id: 's3',
    name: 'English',
    icon: 'book',
    color: '#FF7E67',
    progress: 82,
    lessonsCompleted: 14,
    totalLessons: 17,
  },
  {
    id: 's4',
    name: 'History',
    icon: 'landmark',
    color: '#89B0AE',
    progress: 30,
    lessonsCompleted: 6,
    totalLessons: 20,
  },
];

export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Algebra Fundamentals',
    subjectId: 's1',
    status: 'Completed',
    duration: '45 min',
    content: `
      <h2>Algebra Fundamentals</h2>
      <p>In this lesson, we will cover the basics of algebraic expressions and equations.</p>
      <h3>Topics covered:</h3>
      <ul>
        <li>Variables and constants</li>
        <li>Expressions vs. equations</li>
        <li>Solving simple equations</li>
        <li>Real-world applications</li>
      </ul>
      <p>Algebra is all about finding the unknown. When we have an equation like x + 5 = 12, we can solve for x by subtracting 5 from both sides: x = 7.</p>
      <h3>Key Points to Remember:</h3>
      <ol>
        <li>Always perform the same operation on both sides of an equation</li>
        <li>Isolate the variable to find its value</li>
        <li>Check your answer by substituting it back into the original equation</li>
      </ol>
    `,
  },
  {
    id: 'l2',
    title: 'Fractions and Decimals',
    subjectId: 's1',
    status: 'In Progress',
    duration: '40 min',
    content: `
      <h2>Fractions and Decimals</h2>
      <p>This lesson covers the relationship between fractions and decimals, and how to convert between them.</p>
      <h3>Converting Fractions to Decimals:</h3>
      <p>To convert a fraction to a decimal, divide the numerator by the denominator. For example, 3/4 = 0.75</p>
      <h3>Converting Decimals to Fractions:</h3>
      <p>To convert a decimal to a fraction:</p>
      <ol>
        <li>Write the decimal as a fraction with 1 in the denominator</li>
        <li>Multiply both the numerator and denominator by the power of 10 needed to remove the decimal point</li>
        <li>Simplify the fraction if possible</li>
      </ol>
      <p>For example: 0.25 = 25/100 = 1/4</p>
    `,
  },
  {
    id: 'l3',
    title: 'Cells and Organelles',
    subjectId: 's2',
    status: 'Completed',
    duration: '50 min',
    content: `
      <h2>Cells and Organelles</h2>
      <p>This lesson explores the structure of cells and the functions of various organelles.</p>
      <h3>Cell Structure:</h3>
      <p>Cells are the basic units of life. They contain various organelles that perform specific functions to keep the cell alive.</p>
      <h3>Key Organelles:</h3>
      <ul>
        <li><strong>Nucleus:</strong> Controls the cell's activities and contains genetic material</li>
        <li><strong>Mitochondria:</strong> Produces energy through cellular respiration</li>
        <li><strong>Ribosomes:</strong> Synthesizes proteins</li>
        <li><strong>Endoplasmic Reticulum:</strong> Transports materials within the cell</li>
      </ul>
      <p>Plant cells also have chloroplasts for photosynthesis and a cell wall for structure.</p>
    `,
  },
  {
    id: 'l4',
    title: 'Shakespeare Introduction',
    subjectId: 's3',
    status: 'Not Started',
    duration: '55 min',
    content: `
      <h2>Introduction to Shakespeare</h2>
      <p>William Shakespeare is one of the most influential writers in the English language. This lesson introduces his life and major works.</p>
      <h3>Shakespeare's Life:</h3>
      <p>Born in 1564 in Stratford-upon-Avon, England, Shakespeare became a prominent playwright and poet. He wrote approximately 37 plays and 154 sonnets.</p>
      <h3>Major Works:</h3>
      <ul>
        <li>Romeo and Juliet</li>
        <li>Hamlet</li>
        <li>Macbeth</li>
        <li>A Midsummer Night's Dream</li>
      </ul>
      <p>His works are known for their complex characters, insightful commentary on human nature, and beautiful language.</p>
    `,
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Algebra Basics Quiz',
    subjectId: 's1',
    completed: true,
    score: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 'qst1',
        text: 'Solve for x: 3x + 7 = 22',
        options: ['x = 5', 'x = 7', 'x = 15', 'x = 3'],
        correctAnswer: 0,
      },
      {
        id: 'qst2',
        text: 'What is the value of y in the equation 2y - 3 = 9?',
        options: ['y = 3', 'y = 6', 'y = 12', 'y = 4.5'],
        correctAnswer: 1,
      },
      {
        id: 'qst3',
        text: 'Simplify the expression: 4(2x + 3) - 5x',
        options: ['3x + 12', '8x + 12', '3x + 7', '7x + 12'],
        correctAnswer: 0,
      },
      {
        id: 'qst4',
        text: 'If f(x) = 2x² + 3x - 4, what is f(2)?',
        options: ['6', '8', '10', '12'],
        correctAnswer: 2,
      },
      {
        id: 'qst5',
        text: 'Solve the inequality: -3x < 15',
        options: ['x < -5', 'x > -5', 'x < 5', 'x > 5'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'q2',
    title: 'Cell Biology Quiz',
    subjectId: 's2',
    completed: true,
    score: 60,
    totalQuestions: 5,
    questions: [
      {
        id: 'qst6',
        text: 'Which organelle is known as the "powerhouse of the cell"?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
        correctAnswer: 1,
      },
      {
        id: 'qst7',
        text: 'Which of the following is NOT found in plant cells?',
        options: ['Cell Wall', 'Chloroplast', 'Centrioles', 'Vacuole'],
        correctAnswer: 2,
      },
      {
        id: 'qst8',
        text: 'What is the primary function of ribosomes?',
        options: ['Energy production', 'Protein synthesis', 'Lipid storage', 'Waste disposal'],
        correctAnswer: 1,
      },
      {
        id: 'qst9',
        text: 'The cell membrane is composed primarily of:',
        options: ['Proteins', 'Carbohydrates', 'Phospholipids', 'Nucleic acids'],
        correctAnswer: 2,
      },
      {
        id: 'qst10',
        text: 'Which type of cell does NOT contain DNA?',
        options: ['Animal cell', 'Plant cell', 'Mature red blood cell', 'Bacterial cell'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'q3',
    title: 'English Grammar Challenge',
    subjectId: 's3',
    completed: false,
    totalQuestions: 5,
    questions: [
      {
        id: 'qst11',
        text: 'Which of these is a proper noun?',
        options: ['teacher', 'city', 'London', 'house'],
        correctAnswer: 2,
      },
      {
        id: 'qst12',
        text: 'Which sentence uses correct punctuation?',
        options: [
          'The movie, which was three hours long ended at midnight.',
          'The movie which was three hours long, ended at midnight.',
          'The movie which was three hours long ended at midnight.',
          'The movie, which was three hours long, ended at midnight.',
        ],
        correctAnswer: 3,
      },
      {
        id: 'qst13',
        text: 'Identify the verb in the sentence: "The dog barked loudly at the mailman."',
        options: ['dog', 'barked', 'loudly', 'mailman'],
        correctAnswer: 1,
      },
      {
        id: 'qst14',
        text: 'Which word is an adverb in the sentence: "She quickly solved the difficult puzzle."',
        options: ['She', 'quickly', 'difficult', 'puzzle'],
        correctAnswer: 1,
      },
      {
        id: 'qst15',
        text: 'Which of these is a compound sentence?',
        options: [
          'The cat sat on the mat.',
          'The cat sat on the mat and the dog slept by the fire.',
          'The cat, which was black, sat on the mat.',
          'Sitting on the mat, the cat purred contentedly.',
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export const badges: Badge[] = [
  {
    id: 'b1',
    title: 'Math Master',
    description: 'Complete all mathematics lessons with at least 80% score',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2023-04-15T10:20:00Z',
  },
  {
    id: 'b2',
    title: 'Science Explorer',
    description: 'Complete 5 science experiments',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2023-03-22T14:15:00Z',
  },
  {
    id: 'b3',
    title: 'Bookworm',
    description: 'Read 10 literature pieces and complete their quizzes',
    imageUrl: '/placeholder.svg',
    earned: false,
  },
  {
    id: 'b4',
    title: 'History Buff',
    description: 'Score 90% or higher on all history quizzes',
    imageUrl: '/placeholder.svg',
    earned: false,
  },
  {
    id: 'b5',
    title: 'Dedicated Learner',
    description: 'Study for 10 days in a row',
    imageUrl: '/placeholder.svg',
    earned: true,
    earnedDate: '2023-05-01T09:30:00Z',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l1', name: 'Emma W.', avatar: '/placeholder.svg', xp: 4200, level: 18, class: '10th Grade' },
  { id: 'l2', name: 'Alex Johnson', avatar: '/placeholder.svg', xp: 3450, level: 15, class: '10th Grade' },
  { id: 'l3', name: 'Ryan T.', avatar: '/placeholder.svg', xp: 3300, level: 14, class: '10th Grade' },
  { id: 'l4', name: 'Sophia L.', avatar: '/placeholder.svg', xp: 3100, level: 13, class: '10th Grade' },
  { id: 'l5', name: 'Daniel K.', avatar: '/placeholder.svg', xp: 2800, level: 12, class: '10th Grade' },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 50 },
  { day: 'Sat', minutes: 10 },
  { day: 'Sun', minutes: 40 },
];
