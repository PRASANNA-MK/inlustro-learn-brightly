
// Mock data specifically for teacher dashboard
export const teacherProfile = {
  id: 'teacher-001',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@school.edu',
  subject: 'Mathematics',
  classes: ['10A', '10B', '10C'],
  employeeId: 'T001',
  avatar: '/avatars/teacher-sarah.png',
  joinedDate: '2021-08-15',
  preferences: {
    theme: 'light',
    language: 'en'
  }
};

export const teacherClasses = [
  {
    id: 'class-10a',
    name: '10A',
    subject: 'Mathematics',
    totalStudents: 30,
    lessonsCompleted: 15,
    lessonsPending: 5,
    avgPerformance: 85,
    recentActivity: 'Quiz submitted by 25 students'
  },
  {
    id: 'class-10b',
    name: '10B',
    subject: 'Mathematics',
    totalStudents: 28,
    lessonsCompleted: 12,
    lessonsPending: 8,
    avgPerformance: 78,
    recentActivity: 'Assignment deadline extended'
  },
  {
    id: 'class-10c',
    name: '10C',
    subject: 'Mathematics',
    totalStudents: 32,
    lessonsCompleted: 18,
    lessonsPending: 2,
    avgPerformance: 92,
    recentActivity: 'New lesson uploaded'
  }
];

export const teacherLessons = [
  {
    id: 'lesson-001',
    title: 'Introduction to Quadratic Equations',
    description: 'Basic concepts and solving methods',
    class: '10A',
    subject: 'Mathematics',
    duration: 45,
    status: 'completed',
    uploadDate: '2024-06-01',
    fileType: 'pdf',
    objectives: ['Understand quadratic equations', 'Learn solving methods'],
    studentsCompleted: 28,
    totalStudents: 30
  },
  {
    id: 'lesson-002',
    title: 'Algebraic Expressions',
    description: 'Simplification and factorization',
    class: '10B',
    subject: 'Mathematics',
    duration: 50,
    status: 'in-progress',
    uploadDate: '2024-06-03',
    fileType: 'video',
    objectives: ['Master algebraic manipulation', 'Apply factorization'],
    studentsCompleted: 15,
    totalStudents: 28
  }
];

export const examBlueprints = [
  {
    id: 'blueprint-001',
    name: 'Mathematics Mid-term Pattern',
    marks: {
      '1-mark': 10,
      '2-mark': 8,
      '5-mark': 6,
      '15-mark': 2
    },
    totalMarks: 100,
    duration: 180
  }
];

export const generatedExams = [
  {
    id: 'exam-001',
    title: 'Quadratic Equations Test',
    class: '10A',
    subject: 'Mathematics',
    totalMarks: 100,
    duration: 180,
    status: 'draft',
    createdDate: '2024-06-03',
    questions: [
      {
        id: 'q1',
        text: 'Solve: x² + 5x + 6 = 0',
        marks: 5,
        type: 'solve'
      },
      {
        id: 'q2',
        text: 'Find the discriminant of 2x² - 3x + 1 = 0',
        marks: 2,
        type: 'calculate'
      }
    ]
  }
];

export const homework = [
  {
    id: 'hw-001',
    title: 'Chapter 5 Practice Problems',
    class: '10A',
    subject: 'Mathematics',
    deadline: '2024-06-10',
    status: 'active',
    submittedCount: 25,
    totalStudents: 30,
    fileUrl: '/assignments/chapter5.pdf',
    instructions: 'Complete all odd-numbered problems'
  },
  {
    id: 'hw-002',
    title: 'Algebra Worksheet',
    class: '10B',
    subject: 'Mathematics',
    deadline: '2024-06-08',
    status: 'completed',
    submittedCount: 28,
    totalStudents: 28,
    fileUrl: '/assignments/algebra.pdf',
    instructions: 'Show complete working for all solutions'
  }
];

export const announcements = [
  {
    id: 'ann-001',
    title: 'Test Postponement',
    message: 'The mathematics test has been moved to next Friday.',
    class: '10A',
    date: '2024-06-03',
    viewedBy: 28,
    totalStudents: 30
  },
  {
    id: 'ann-002',
    title: 'Extra Class Tomorrow',
    message: 'Additional revision class at 3 PM in room 205.',
    class: '10B',
    date: '2024-06-02',
    viewedBy: 25,
    totalStudents: 28
  }
];

export const studentPerformance = [
  {
    id: 'student-001',
    name: 'Emma Davis',
    class: '10A',
    assignmentScore: 92,
    quizScore: 88,
    overallGrade: 'A',
    remarks: 'Excellent performance, consistent improvement',
    trend: 'up'
  },
  {
    id: 'student-002',
    name: 'Alex Thompson',
    class: '10A',
    assignmentScore: 78,
    quizScore: 82,
    overallGrade: 'B+',
    remarks: 'Good work, needs practice in algebra',
    trend: 'stable'
  },
  {
    id: 'student-003',
    name: 'Michael Brown',
    class: '10A',
    assignmentScore: 65,
    quizScore: 70,
    overallGrade: 'B-',
    remarks: 'Improving gradually, requires extra attention',
    trend: 'up'
  }
];

export const liveClasses = [
  {
    id: 'live-001',
    title: 'Quadratic Equations Review',
    class: '10A',
    subject: 'Mathematics',
    date: '2024-06-05',
    time: '10:00',
    duration: 60,
    meetingLink: 'https://meet.google.com/abc-def-ghi',
    status: 'scheduled'
  },
  {
    id: 'live-002',
    title: 'Doubt Clearing Session',
    class: '10B',
    subject: 'Mathematics',
    date: '2024-06-06',
    time: '15:00',
    duration: 45,
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'scheduled'
  }
];

export const activityFeed = [
  {
    id: 'activity-001',
    type: 'lesson',
    message: 'New lesson "Quadratic Equations" uploaded to 10A',
    timestamp: '2024-06-03T10:30:00Z'
  },
  {
    id: 'activity-002',
    type: 'submission',
    message: '25 students submitted homework for 10A',
    timestamp: '2024-06-03T09:15:00Z'
  },
  {
    id: 'activity-003',
    type: 'exam',
    message: 'Mathematics test created for 10B',
    timestamp: '2024-06-02T14:20:00Z'
  }
];
