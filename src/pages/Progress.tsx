
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects, quizzes, lessons } from '@/data/mockData';

const Progress = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  
  // Calculate subject completion data
  const subjectData = subjects.map(subject => {
    const subjectLessons = lessons.filter(lesson => lesson.subjectId === subject.id);
    const completedLessons = subjectLessons.filter(lesson => lesson.status === 'Completed').length;
    const inProgressLessons = subjectLessons.filter(lesson => lesson.status === 'In Progress').length;
    const notStartedLessons = subjectLessons.filter(lesson => lesson.status === 'Not Started').length;
    
    return {
      name: subject.name,
      completed: completedLessons,
      inProgress: inProgressLessons,
      notStarted: notStartedLessons,
      total: subjectLessons.length
    };
  });
  
  // Calculate quiz performance data
  const quizData = subjects.map(subject => {
    const subjectQuizzes = quizzes.filter(quiz => quiz.subjectId === subject.id && quiz.completed && quiz.score !== undefined);
    const averageScore = subjectQuizzes.length > 0
      ? Math.round(subjectQuizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) / subjectQuizzes.length)
      : 0;
    
    return {
      name: subject.name,
      averageScore,
      quizzesTaken: subjectQuizzes.length
    };
  });
  
  // Sample progression data (in a real app, this would come from an API)
  const progressionData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
  ];
  
  // Sample lesson completion status for pie chart
  const allLessons = lessons;
  const completedCount = allLessons.filter(lesson => lesson.status === 'Completed').length;
  const inProgressCount = allLessons.filter(lesson => lesson.status === 'In Progress').length;
  const notStartedCount = allLessons.filter(lesson => lesson.status === 'Not Started').length;
  
  const lessonStatusData = [
    { name: 'Completed', value: completedCount, color: '#4BC0C0' },
    { name: 'In Progress', value: inProgressCount, color: '#FFCD56' },
    { name: 'Not Started', value: notStartedCount, color: '#E7E9ED' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracker</h1>
        <p className="text-muted-foreground">Monitor your learning progress across all subjects.</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Across all subjects</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lessonStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {lessonStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Average score by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#33C3F0" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Completion by Subject</CardTitle>
              <CardDescription>Number of lessons completed vs. total</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={subjectData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 'dataMax']} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#4BC0C0" name="Completed" />
                  <Bar dataKey="inProgress" stackId="a" fill="#FFCD56" name="In Progress" />
                  <Bar dataKey="notStarted" stackId="a" fill="#E7E9ED" name="Not Started" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance by Subject</CardTitle>
              <CardDescription>Average scores across all quizzes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={quizData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                  <Bar dataKey="averageScore" fill="#33C3F0" name="Average Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject Breakdown</CardTitle>
          <CardDescription>Detailed progress for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map(subject => {
              const subjectLessons = lessons.filter(lesson => lesson.subjectId === subject.id);
              const completedLessons = subjectLessons.filter(lesson => lesson.status === 'Completed').length;
              
              const subjectQuizzes = quizzes.filter(quiz => quiz.subjectId === subject.id && quiz.completed);
              const averageScore = subjectQuizzes.length > 0
                ? Math.round(subjectQuizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) / subjectQuizzes.length)
                : 0;
              
              return (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons}/{subjectLessons.length} lessons completed
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-value" 
                      style={{ 
                        width: `${(completedLessons / Math.max(subjectLessons.length, 1)) * 100}%`,
                        backgroundColor: subject.color
                      }} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Quiz Score:</span>
                    <span className="font-medium">{averageScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
