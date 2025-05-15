
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
    position: 1
  },
  {
    id: 'u2',
    name: 'James L.',
    avatar: null,
    score: 4120,
    position: 2
  },
  {
    id: 'u3',
    name: 'Alex M.',
    avatar: null,
    score: 3890,
    position: 3
  },
  {
    id: 'u4',
    name: 'Sophia R.',
    avatar: null,
    score: 3700,
    position: 4
  },
  {
    id: 'u5',
    name: 'Daniel K.',
    avatar: null,
    score: 3650,
    position: 5
  }
];
