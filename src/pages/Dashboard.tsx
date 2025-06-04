import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { currentUser, weeklyActivity, lessons, submissions, students } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Book, Users, ClipboardEdit, CheckCircle2, Clock, AlertTriangle, Upload, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: students.length,
    completedLessons: lessons.filter(lesson => lesson.status === 'Completed').length,
    pendingSubmissions: submissions.reduce((acc, sub) => acc + sub.pendingReview, 0),
    activeClasses: currentUser.classes.length,
    weeklyActivity: weeklyActivity,
    pendingEvaluations: [
      { id: 1, title: 'Algebra Quiz - 10A', submissions: 25, dueDate: '2024-06-04' },
      { id: 2, title: 'Geometry Assignment - 10B', submissions: 18, dueDate: '2024-06-05' },
      { id: 3, title: 'Trigonometry Test - 10C', submissions: 22, dueDate: '2024-06-06' }
    ],
    recentActivity: [
      { action: 'Created lesson', details: 'Quadratic Equations', time: '2 hours ago' },
      { action: 'Graded submissions', details: '15 homework papers', time: 'Yesterday' },
      { action: 'Scheduled live class', details: 'Algebra Review - 10A', time: '2 days ago' },
      { action: 'Sent announcement', details: 'Test postponement notice', time: '3 days ago' }
    ]
  });

  // TODO: Connect to backend - Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API calls
        // const response = await fetch('/api/dashboard', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch dashboard data');
        // const data = await response.json();
        // setDashboardData(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Using existing mock data
        setDashboardData({
          totalStudents: students.length,
          completedLessons: lessons.filter(lesson => lesson.status === 'Completed').length,
          pendingSubmissions: submissions.reduce((acc, sub) => acc + sub.pendingReview, 0),
          activeClasses: currentUser.classes.length,
          weeklyActivity: weeklyActivity,
          pendingEvaluations: [
            { id: 1, title: 'Algebra Quiz - 10A', submissions: 25, dueDate: '2024-06-04' },
            { id: 2, title: 'Geometry Assignment - 10B', submissions: 18, dueDate: '2024-06-05' },
            { id: 3, title: 'Trigonometry Test - 10C', submissions: 22, dueDate: '2024-06-06' }
          ],
          recentActivity: [
            { action: 'Created lesson', details: 'Quadratic Equations', time: '2 hours ago' },
            { action: 'Graded submissions', details: '15 homework papers', time: 'Yesterday' },
            { action: 'Scheduled live class', details: 'Algebra Review - 10A', time: '2 days ago' },
            { action: 'Sent announcement', details: 'Test postponement notice', time: '3 days ago' }
          ]
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Upload Content',
      description: 'Add new lessons and resources',
      icon: <Upload className="h-6 w-6" />,
      link: '/lesson-manager',
      color: 'blue'
    },
    {
      title: 'Assign Homework',
      description: 'Create new assignments',
      icon: <ClipboardEdit className="h-6 w-6" />,
      link: '/submissions',
      color: 'green'
    },
    {
      title: 'Create Exam',
      description: 'Generate from syllabus or notes',
      icon: <Book className="h-6 w-6" />,
      link: '/exam-creation',
      color: 'purple'
    },
    {
      title: 'Schedule Class',
      description: 'Set up live sessions',
      icon: <Calendar className="h-6 w-6" />,
      link: '/live-scheduler',
      color: 'orange'
    },
    {
      title: 'Send Notice',
      description: 'Communicate with students',
      icon: <MessageSquare className="h-6 w-6" />,
      link: '/messages',
      color: 'red'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Error</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
              {currentUser.subject} Teacher
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          Teaching {currentUser.grade} • Classes: {currentUser.classes.join(', ')} • Last login: {new Date(currentUser.lastLogin).toLocaleDateString()}
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-2xl font-bold">{dashboardData.totalStudents}</span>
            </div>
            <CardTitle className="text-base">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Across {dashboardData.activeClasses} classes</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-2xl font-bold">{dashboardData.completedLessons}</span>
            </div>
            <CardTitle className="text-base">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-orange-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <ClipboardEdit className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-2xl font-bold">{dashboardData.pendingSubmissions}</span>
            </div>
            <CardTitle className="text-base">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Need grading</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-purple-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Book className="h-6 w-6 text-purple-500" />
              </div>
              <span className="text-2xl font-bold">{dashboardData.activeClasses}</span>
            </div>
            <CardTitle className="text-base">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-3xl shadow-inlustro border-0">
        <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for efficient teaching</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="block">
                <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-inlustro-purple/20">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-${action.color}-500/10`}>
                      <div className={`text-${action.color}-500`}>
                        {action.icon}
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Evaluations */}
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Evaluations
            </CardTitle>
            <CardDescription>Submissions waiting for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.pendingEvaluations.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.submissions} submissions • Due: {new Date(item.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
            <Link to="/submissions">
              <Button variant="ghost" className="w-full mt-2 text-inlustro-purple hover:text-inlustro-purple/80 hover:bg-inlustro-purple/10">
                View All Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Weekly Activity Chart */}
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your teaching activity this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'lessons' ? 'Lessons' : 'Submissions']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="lessons" fill="#5F65D9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="submissions" fill="#A855F7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.details}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Classes Overview */}
      <Card className="rounded-3xl shadow-inlustro border-0">
        <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
          <CardTitle>My Classes & Subjects</CardTitle>
          <CardDescription>Overview of your teaching assignments</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentUser.classes.map((className, index) => (
              <Link key={className} to="/my-classes" className="block">
                <Card className="hover:shadow-lg transition-all border-2 hover:border-inlustro-purple/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{className}</h3>
                      <Badge variant="outline">{currentUser.subject}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>Students: {Math.floor(Math.random() * 10) + 25}</p>
                      <p>Lessons: {Math.floor(Math.random() * 5) + 8} completed</p>
                      <p>Avg Performance: {Math.floor(Math.random() * 20) + 75}%</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
