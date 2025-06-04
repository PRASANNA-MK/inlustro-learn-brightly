
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Book, 
  Users, 
  ClipboardEdit, 
  FileText, 
  TrendingUp, 
  Clock,
  Plus,
  Upload,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { teacherProfile, teacherClasses, activityFeed } from '@/data/teacherMockData';

const Dashboard = () => {
  // Calculate summary stats
  const totalStudents = teacherClasses.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const totalLessons = teacherClasses.reduce((sum, cls) => sum + cls.lessonsCompleted, 0);
  const pendingLessons = teacherClasses.reduce((sum, cls) => sum + cls.lessonsPending, 0);
  const avgPerformance = Math.round(teacherClasses.reduce((sum, cls) => sum + cls.avgPerformance, 0) / teacherClasses.length);

  const quickActions = [
    {
      title: 'Add Lesson',
      description: 'Upload new lesson content',
      icon: <Upload className="h-5 w-5" />,
      link: '/lesson-manager',
      color: 'blue'
    },
    {
      title: 'Create Exam',
      description: 'Generate from syllabus/notes',
      icon: <FileText className="h-5 w-5" />,
      link: '/exam-creation',
      color: 'green'
    },
    {
      title: 'Post Homework',
      description: 'Assign new homework',
      icon: <ClipboardEdit className="h-5 w-5" />,
      link: '/submissions',
      color: 'purple'
    },
    {
      title: 'Schedule Class',
      description: 'Set up live session',
      icon: <Calendar className="h-5 w-5" />,
      link: '/live-scheduler',
      color: 'orange'
    },
    {
      title: 'Send Notice',
      description: 'Communicate with students',
      icon: <MessageSquare className="h-5 w-5" />,
      link: '/messages',
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {teacherProfile.name}!</h1>
        <p className="text-muted-foreground">
          {teacherProfile.subject} Teacher • Classes: {teacherProfile.classes.join(', ')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">{totalStudents}</span>
            </div>
            <CardTitle className="text-base">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Across {teacherClasses.length} classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Book className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">{totalLessons}</span>
            </div>
            <CardTitle className="text-base">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{pendingLessons} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold">{avgPerformance}%</span>
            </div>
            <CardTitle className="text-base">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Class average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Clock className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">{teacherClasses.length}</span>
            </div>
            <CardTitle className="text-base">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common teaching tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="block">
                <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-blue-50">
                      <div className="text-blue-600">
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

      {/* Classes Overview & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Subject-wise completion summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherClasses.map((classData) => (
              <div key={classData.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{classData.name}</h3>
                  <Badge variant="outline">{classData.subject}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Students: {classData.totalStudents}</p>
                    <p className="text-muted-foreground">Completed: {classData.lessonsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending: {classData.lessonsPending}</p>
                    <p className="text-muted-foreground">Avg: {classData.avgPerformance}%</p>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">{classData.recentActivity}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityFeed.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 border-l-2 border-blue-200 pl-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Overview</CardTitle>
          <CardDescription>Average performance across all classes</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teacherClasses}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgPerformance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
