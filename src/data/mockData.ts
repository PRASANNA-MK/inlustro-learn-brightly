export const currentUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  profilePicture: '/avatars/avatar-1.png',
  lastLogin: '2024-05-15T10:30:00Z',
  preferences: {
    theme: 'light',
    notificationsEnabled: true,
  },
};

export const weeklyActivity = [
  { day: 'Mon', minutes: 35 },
  { day: 'Tue', minutes: 50 },
  { day: 'Wed', minutes: 40 },
  { day: 'Thu', minutes: 65 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 20 },
  { day: 'Sun', minutes: 15 },
];

// Export types and mock data from other files
export { quizzes, type Quiz, type Question } from './mockQuizzesData';
export { lessons, type Lesson } from './mockLessonsData';
export { leaderboardData, badgeTypes, pointsHistory, achievements, type LeaderboardItem } from './mockGamificationData';
