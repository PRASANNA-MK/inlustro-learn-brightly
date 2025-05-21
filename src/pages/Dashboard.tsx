
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { currentUser, weeklyActivity } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FileText, Users, ClipboardEdit, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample data
const upcomingExams = [
  { id: 'e1', title: 'Mid-Term Mathematics', date: '2025-06-10', subject: 'Mathematics', class: '10A', status: 'scheduled' },
  { id: 'e2', title: 'Science Quiz', date: '2025-06-05', subject: 'Science', class: '9B', status: 'scheduled' },
  { id: 'e3', title: 'English Literature', date: '2025-06-15', subject: 'English', class: '11A', status: 'draft' },
];

const topStudents = [
  { id: 's1', name: 'Alex Johnson', class: '10A', score: 95, avatar: '/avatars/alex.png' },
  { id: 's2', name: 'Sam Williams', class: '10A', score: 92, avatar: '/avatars/sam.png' },
  { id: 's3', name: 'Jordan Smith', class: '10C', score: 90, avatar: '/avatars/jordan.png' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
              {currentUser.role === 'admin' ? 'Administrator' : 'Teacher'}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          {currentUser.role === 'admin' ? 'Manage your school and teachers.' : 'Prepare exams and view student submissions.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/exam-preparation" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Create Exam</CardTitle>
              <CardDescription>Create and manage exam papers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create custom exams with different difficulty levels and share with students.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium">Recent exams: <span className="text-inlustro-purple">12</span></span>
                <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">Get Started</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/teachers" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Manage Teachers</CardTitle>
              <CardDescription>View and manage teacher accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View teacher profiles, manage permissions, and assign classes.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium">Active teachers: <span className="text-inlustro-purple">18</span></span>
                <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">View Teachers</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/submissions" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <ClipboardEdit className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">View Submissions</CardTitle>
              <CardDescription>Track student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and grade student exam submissions and track progress.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium">Pending grades: <span className="text-inlustro-purple">6</span></span>
                <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">Check Submissions</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl shadow-inlustro border-0 md:col-span-1">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Scheduled exams for the next 14 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{exam.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {exam.class}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <Badge variant={exam.status === 'scheduled' ? 'default' : 'outline'} className={exam.status === 'scheduled' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}>
                  {exam.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 text-inlustro-purple hover:text-inlustro-purple/80 hover:bg-inlustro-purple/10">
              View All Exams
            </Button>
          </CardContent>
        </Card>

        <Card className="h-full rounded-3xl shadow-inlustro border-0 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
              <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
                Last 7 Days
              </Badge>
            </div>
            <CardDescription>Minutes spent on platform this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} min`, 'Active Time']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="minutes" fill="#5F65D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Your activities in the past week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">Math Exam Created</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">Physics Exam Shared</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">New Teacher Added</p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
            <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
              <p className="text-sm font-medium">Student Submissions Graded</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
            <Button variant="ghost" className="w-full mt-2 text-inlustro-purple hover:text-inlustro-purple/80 hover:bg-inlustro-purple/10">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Highest scoring students this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {topStudents.map((student, index) => (
              <div key={student.id} className="flex items-center space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-inlustro-purple/10 text-sm font-medium text-inlustro-purple">
                  {index + 1}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{student.name}</p>
                  <p className="text-xs text-muted-foreground">Class {student.class}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{student.score}%</span>
                  <Progress value={student.score} className="h-1.5 w-24" />
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2 text-inlustro-purple hover:text-inlustro-purple/80 hover:bg-inlustro-purple/10">
              View Full Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
