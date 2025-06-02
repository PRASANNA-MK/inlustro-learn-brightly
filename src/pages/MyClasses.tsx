
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentUser, students } from '@/data/mockData';
import { Users, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const MyClasses = () => {
  const [selectedClass, setSelectedClass] = useState('10A');

  const getStudentsInClass = (className: string) => {
    return students.filter(student => student.class === className);
  };

  const getClassStats = (className: string) => {
    const classStudents = getStudentsInClass(className);
    const avgScore = Math.round(classStudents.reduce((acc, student) => acc + student.performance.averageScore, 0) / classStudents.length);
    const avgCompletion = Math.round(classStudents.reduce((acc, student) => acc + (student.performance.lessonsCompleted / student.performance.totalLessons * 100), 0) / classStudents.length);
    const totalPending = classStudents.reduce((acc, student) => acc + student.performance.pendingSubmissions, 0);
    
    return { avgScore, avgCompletion, totalPending };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
        <p className="text-muted-foreground">
          Manage your assigned classes and track student performance
        </p>
      </div>

      {/* Class Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentUser.classes.map((className) => {
          const classStudents = getStudentsInClass(className);
          const stats = getClassStats(className);
          
          return (
            <Card key={className} className="rounded-3xl shadow-inlustro border-0 hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-inlustro-purple/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-inlustro-purple" />
                  </div>
                  <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
                    {classStudents.length} Students
                  </Badge>
                </div>
                <CardTitle className="mt-2">Class {className}</CardTitle>
                <CardDescription>{currentUser.subject} • {currentUser.grade}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-inlustro-purple">{stats.avgScore}%</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.avgCompletion}%</p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                </div>
                
                {stats.totalPending > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-orange-700">{stats.totalPending} pending submissions</span>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={selectedClass === className ? "default" : "outline"}
                  onClick={() => setSelectedClass(className)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Class View */}
      <Card className="rounded-3xl shadow-inlustro border-0">
        <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent rounded-t-3xl">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Class {selectedClass} - Student Details
          </CardTitle>
          <CardDescription>
            Individual student performance and progress tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4">
                {getStudentsInClass(selectedClass).map((student) => (
                  <Card key={student.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-inlustro-purple">
                            {student.performance.averageScore}%
                          </p>
                          <p className="text-xs text-muted-foreground">Average Score</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">
                            {student.performance.submissionsCompleted}
                          </p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-bold text-orange-500">
                            {student.performance.pendingSubmissions}
                          </p>
                          <p className="text-xs text-muted-foreground">Pending</p>
                        </div>
                        
                        <Badge 
                          variant={student.performance.pendingSubmissions === 0 ? "default" : "destructive"}
                          className={student.performance.pendingSubmissions === 0 ? "bg-green-100 text-green-800" : ""}
                        >
                          {student.performance.pendingSubmissions === 0 ? 'Up to date' : 'Behind'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <div className="grid gap-4">
                {getStudentsInClass(selectedClass).map((student) => (
                  <Card key={student.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last active: {new Date(student.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">
                          {student.performance.lessonsCompleted}/{student.performance.totalLessons} Lessons
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lesson Progress</span>
                        <span>{Math.round((student.performance.lessonsCompleted / student.performance.totalLessons) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(student.performance.lessonsCompleted / student.performance.totalLessons) * 100} 
                        className="h-2"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyClasses;
