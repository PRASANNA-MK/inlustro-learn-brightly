
export const currentUser = {
  id: 'teacher-1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@school.edu',
  role: 'teacher',
  profilePicture: '/avatars/teacher-sarah.png',
  avatar: '/avatars/teacher-sarah.png',
  lastLogin: '2024-06-02T08:30:00Z',
  subject: 'Mathematics',
  grade: '10th Grade',
  classes: ['10A', '10B', '10C'],
  employeeId: 'T001',
  joinedDate: '2021-08-15',
  xp: 2850,
  level: 12,
  preferences: {
    theme: 'light',
    notificationsEnabled: true,
  },
};

export const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
];

export const weeklyActivity = [
  { day: 'Mon', lessons: 3, submissions: 12 },
  { day: 'Tue', lessons: 4, submissions: 8 },
  { day: 'Wed', lessons: 2, submissions: 15 },
  { day: 'Thu', lessons: 3, submissions: 10 },
  { day: 'Fri', lessons: 4, submissions: 6 },
  { day: 'Sat', lessons: 0, submissions: 2 },
  { day: 'Sun', lessons: 0, submissions: 1 },
];

export const students = [
  {
    id: 'student-1',
    name: 'Alex Thompson',
    class: '10A',
    rollNumber: 'A001',
    avatar: '/avatars/alex.png',
    performance: {
      averageScore: 85,
      lessonsCompleted: 24,
      totalLessons: 28,
      submissionsCompleted: 15,
      pendingSubmissions: 3,
    },
    lastActive: '2024-06-01T14:30:00Z',
  },
  {
    id: 'student-2',
    name: 'Emma Davis',
    class: '10A',
    rollNumber: 'A002',
    avatar: '/avatars/emma.png',
    performance: {
      averageScore: 92,
      lessonsCompleted: 27,
      totalLessons: 28,
      submissionsCompleted: 18,
      pendingSubmissions: 0,
    },
    lastActive: '2024-06-01T16:20:00Z',
  },
  {
    id: 'student-3',
    name: 'Michael Brown',
    class: '10B',
    rollNumber: 'B001',
    avatar: '/avatars/michael.png',
    performance: {
      averageScore: 78,
      lessonsCompleted: 22,
      totalLessons: 28,
      submissionsCompleted: 14,
      pendingSubmissions: 4,
    },
    lastActive: '2024-05-31T11:45:00Z',
  },
  {
    id: 'student-4',
    name: 'Sophie Wilson',
    class: '10B',
    rollNumber: 'B002',
    avatar: '/avatars/sophie.png',
    performance: {
      averageScore: 88,
      lessonsCompleted: 26,
      totalLessons: 28,
      submissionsCompleted: 17,
      pendingSubmissions: 1,
    },
    lastActive: '2024-06-01T13:15:00Z',
  },
];

export const lessons = [
  {
    id: 'lesson-1',
    title: 'Introduction to Quadratic Equations',
    subject: 'math',
    grade: '10th Grade',
    class: '10A',
    description: 'Understanding the basics of quadratic equations and their applications',
    duration: 45,
    status: 'Completed',
    completedDate: '2024-05-28T10:00:00Z',
    studentsCompleted: 28,
    totalStudents: 30,
    content: '<h2>Introduction to Quadratic Equations</h2><p>A quadratic equation is a polynomial equation of degree 2...</p>',
    resources: [
      { type: 'document', title: 'Quadratic Equations Worksheet', url: '/resources/quadratic-worksheet.pdf' },
      { type: 'video', title: 'Introduction Video', url: 'https://example.com/quadratic-intro' },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Solving Quadratic Equations',
    subject: 'math',
    grade: '10th Grade',
    class: '10A',
    description: 'Different methods to solve quadratic equations',
    duration: 50,
    status: 'In Progress',
    scheduledDate: '2024-06-03T10:00:00Z',
    studentsCompleted: 15,
    totalStudents: 30,
    content: '<h2>Solving Quadratic Equations</h2><p>There are several methods to solve quadratic equations...</p>',
    resources: [
      { type: 'document', title: 'Solving Methods Guide', url: '/resources/solving-methods.pdf' },
    ],
  },
  {
    id: 'lesson-3',
    title: 'Graphing Quadratic Functions',
    subject: 'math',
    grade: '10th Grade',
    class: '10B',
    description: 'Visual representation of quadratic functions',
    duration: 45,
    status: 'Not Started',
    scheduledDate: '2024-06-05T11:00:00Z',
    studentsCompleted: 0,
    totalStudents: 28,
    content: '<h2>Graphing Quadratic Functions</h2><p>Learn to graph quadratic functions and understand their properties...</p>',
    resources: [],
  },
];

export type Lesson = typeof lessons[0];

export const submissions = [
  {
    id: 'submission-1',
    title: 'Quadratic Equations Homework',
    type: 'Homework',
    subject: 'Mathematics',
    class: '10A',
    dueDate: '2024-06-04T23:59:00Z',
    createdDate: '2024-05-30T08:00:00Z',
    totalStudents: 30,
    submittedCount: 25,
    reviewedCount: 20,
    pendingReview: 5,
    averageScore: 82,
    status: 'Active',
  },
  {
    id: 'submission-2',
    title: 'Algebra Practice Test',
    type: 'Assignment',
    subject: 'Mathematics',
    class: '10B',
    dueDate: '2024-06-06T23:59:00Z',
    createdDate: '2024-06-01T09:00:00Z',
    totalStudents: 28,
    submittedCount: 12,
    reviewedCount: 8,
    pendingReview: 4,
    averageScore: 78,
    status: 'Active',
  },
  {
    id: 'submission-3',
    title: 'Chapter 5 Quiz',
    type: 'Quiz',
    subject: 'Mathematics',
    class: '10C',
    dueDate: '2024-05-30T23:59:00Z',
    createdDate: '2024-05-25T08:00:00Z',
    totalStudents: 25,
    submittedCount: 25,
    reviewedCount: 25,
    pendingReview: 0,
    averageScore: 85,
    status: 'Completed',
  },
];

export const quizzes = [
  {
    id: 'quiz-1',
    title: 'Algebra Basics Quiz',
    subject: 'math',
    description: 'Test your understanding of basic algebraic concepts',
    totalQuestions: 15,
    timeLimit: 30,
    completed: true,
    score: 85,
    difficultyBreakdown: {
      easy: 60,
      medium: 30,
      hard: 10,
    },
    questions: [
      {
        id: 'q1',
        text: 'Solve for x: 2x + 5 = 11',
        difficulty: 'easy',
        points: 2,
      },
      {
        id: 'q2',
        text: 'Factor the expression: x² - 9',
        difficulty: 'medium',
        points: 3,
      },
    ],
  },
  {
    id: 'quiz-2',
    title: 'Quadratic Equations Quiz',
    subject: 'math',
    description: 'Advanced quiz on quadratic equations',
    totalQuestions: 20,
    timeLimit: 45,
    completed: false,
    score: undefined,
    difficultyBreakdown: {
      easy: 20,
      medium: 50,
      hard: 30,
    },
    questions: [
      {
        id: 'q3',
        text: 'Solve using the quadratic formula: x² + 3x - 4 = 0',
        difficulty: 'hard',
        points: 5,
      },
    ],
  },
];

export type Quiz = typeof quizzes[0];

export const badges = [
  {
    id: 'badge-1',
    title: 'First Lesson',
    description: 'Complete your first lesson',
    imageUrl: '/badges/first-lesson.png',
    earned: true,
    earnedDate: '2024-05-15T10:00:00Z',
  },
  {
    id: 'badge-2',
    title: 'Quiz Master',
    description: 'Score 90% or higher on 5 quizzes',
    imageUrl: '/badges/quiz-master.png',
    earned: true,
    earnedDate: '2024-05-20T14:30:00Z',
  },
  {
    id: 'badge-3',
    title: 'Streak Runner',
    description: 'Log in for 7 consecutive days',
    imageUrl: '/badges/streak-runner.png',
    earned: false,
    earnedDate: null,
  },
];

export const leaderboard = [
  {
    id: 'student-2',
    name: 'Emma Davis',
    class: '10A',
    xp: 3200,
    level: 15,
    avatar: '/avatars/emma.png',
  },
  {
    id: 'teacher-1',
    name: 'Sarah Johnson',
    class: 'Teacher',
    xp: 2850,
    level: 12,
    avatar: '/avatars/teacher-sarah.png',
  },
  {
    id: 'student-4',
    name: 'Sophie Wilson',
    class: '10B',
    xp: 2650,
    level: 11,
    avatar: '/avatars/sophie.png',
  },
  {
    id: 'student-1',
    name: 'Alex Thompson',
    class: '10A',
    xp: 2400,
    level: 10,
    avatar: '/avatars/alex.png',
  },
];

export const announcements = [
  {
    id: 'ann-1',
    title: 'Upcoming Mid-term Exams',
    message: 'Mid-term examinations will be held from June 15-20. Please prepare accordingly.',
    date: '2024-06-01T09:00:00Z',
    priority: 'High',
    classes: ['10A', '10B', '10C'],
  },
  {
    id: 'ann-2',
    title: 'Math Olympiad Registration',
    message: 'Interested students can register for the Math Olympiad by June 10th.',
    date: '2024-05-29T14:00:00Z',
    priority: 'Medium',
    classes: ['10A', '10B'],
  },
];

export const examPatterns = [
  {
    id: 'pattern-1',
    name: 'Standard Mathematics Pattern',
    questions: {
      '1-mark': 10,
      '2-mark': 8,
      '5-mark': 6,
      '7-mark': 4,
      '15-mark': 2,
    },
    totalMarks: 100,
    totalQuestions: 30,
    duration: 180, // minutes
  },
];
