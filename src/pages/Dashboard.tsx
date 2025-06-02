
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { currentUser, weeklyActivity, lessons, submissions, students } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Book, Users, ClipboardEdit, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const completedLessons = lessons.filter(lesson => lesson.status === 'Completed').length;
  const pendingSubmissions = submissions.reduce((acc, sub) => acc + sub.pendingReview, 0);
  const totalStudents = students.length;
  const activeClasses = currentUser.classes.length;

  const upcomingTasks = [
    { id: 1, title: 'Grade Quadratic Equations Homework', type: 'Review', dueDate: '2024-06-03', priority: 'High' },
    { id: 2, title: 'Prepare Lesson: Graphing Functions', type: 'Lesson Prep', dueDate: '2024-06-04', priority: 'Medium' },
    { id: 3, title: 'Parent Meeting - Emma Davis', type: 'Meeting', dueDate: '2024-06-05', priority: 'Low' },
  ];

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
          Teaching {currentUser.grade} • Classes: {currentUser.classes.join(', ')}
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
              <span className="text-2xl font-bold">{totalStudents}</span>
            </div>
            <CardTitle className="text-base">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Across {activeClasses} classes</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-2xl font-bold">{completedLessons}</span>
            </div>
            <CardTitle className="text-base">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="pb-2 bg-gradient-to-r from-orange-500/10 to-transparent rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <ClipboardEdit className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-2xl font-bold">{pendingSubmissions}</span>
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
              <span className="text-2xl font-bold">{activeClasses}</span>
            </div>
            <CardTitle className="text-base">Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/lesson-manager" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <Book className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Manage Lessons</CardTitle>
              <CardDescription>Create and organize lesson plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add new lessons, upload resources, and track student progress.
              </p>
              <div className="mt-4">
                <Button className="w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
                  Go to Lessons
                </Button>
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
              <CardTitle className="mt-2">Review Submissions</CardTitle>
              <CardDescription>Grade assignments and homework</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View student submissions and provide feedback.
              </p>
              <div className="mt-4">
                <Button className="w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
                  Review Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/exam-preparation" className="block">
          <Card className="h-full hover:shadow-lg transition-all rounded-3xl shadow-inlustro border-0">
            <CardHeader className="pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
              <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-inlustro-purple" />
              </div>
              <CardTitle className="mt-2">Prepare Exams</CardTitle>
              <CardDescription>Create and manage examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate exams from syllabus or lesson notes.
              </p>
              <div className="mt-4">
                <Button className="w-full rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
                  Create Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Activity Chart and Upcoming Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Lessons taught and submissions reviewed</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
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

        <Card className="rounded-3xl shadow-inlustro border-0">
          <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {task.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <Badge 
                  variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2 text-inlustro-purple hover:text-inlustro-purple/80 hover:bg-inlustro-purple/10">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-3xl shadow-inlustro border-0">
        <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your recent teaching activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
            <p className="text-sm font-medium">Completed lesson: Quadratic Equations</p>
            <p className="text-xs text-muted-foreground">2 hours ago • Class 10A</p>
          </div>
          <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
            <p className="text-sm font-medium">Graded 15 homework submissions</p>
            <p className="text-xs text-muted-foreground">Yesterday • Class 10B</p>
          </div>
          <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
            <p className="text-sm font-medium">Created new assignment: Algebra Practice</p>
            <p className="text-xs text-muted-foreground">2 days ago • Class 10C</p>
          </div>
          <div className="space-y-2 border-l-2 border-inlustro-purple pl-4 py-2">
            <p className="text-sm font-medium">Uploaded lesson resources</p>
            <p className="text-xs text-muted-foreground">3 days ago • Quadratic Functions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
