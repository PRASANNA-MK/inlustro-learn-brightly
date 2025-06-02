
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { students, lessons, submissions } from '@/data/mockData';
import { TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

const StudentTracker = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const filteredStudents = students.filter(student => {
    const classMatch = selectedClass === 'all' || student.class === selectedClass;
    const studentMatch = selectedStudent === 'all' || student.id === selectedStudent;
    return classMatch && studentMatch;
  });

  const classes = ['10A', '10B', '10C'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Student Tracker</h1>
        <p className="text-muted-foreground">Monitor individual student progress across lessons and assignments.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Student" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            {students.map(student => (
              <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map(student => (
          <Card key={student.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>{student.class} - {student.rollNumber}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Performance</span>
                  <span className="text-sm text-muted-foreground">{student.performance.averageScore}%</span>
                </div>
                <Progress value={student.performance.averageScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Lessons</span>
                  </div>
                  <p className="text-2xl font-bold">{student.performance.lessonsCompleted}</p>
                  <p className="text-xs text-muted-foreground">of {student.performance.totalLessons}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Submissions</span>
                  </div>
                  <p className="text-2xl font-bold">{student.performance.submissionsCompleted}</p>
                  <p className="text-xs text-muted-foreground">{student.performance.pendingSubmissions} pending</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">Last active</span>
                <span className="text-xs">{new Date(student.lastActive).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStudent !== 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Progress</CardTitle>
            <CardDescription>Lesson and assignment breakdown for selected student</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lessons" className="w-full">
              <TabsList>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="lessons" className="space-y-4">
                <div className="space-y-3">
                  {lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground">{lesson.class} - {lesson.duration} min</p>
                      </div>
                      <Badge variant={lesson.status === 'Completed' ? 'default' : 'secondary'}>
                        {lesson.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="submissions" className="space-y-4">
                <div className="space-y-3">
                  {submissions.map(submission => (
                    <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{submission.title}</h4>
                        <p className="text-sm text-muted-foreground">{submission.type} - Due: {new Date(submission.dueDate).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={submission.status === 'Completed' ? 'default' : 'secondary'}>
                        {submission.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentTracker;
