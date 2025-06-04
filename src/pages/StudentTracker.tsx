
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Search,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { studentPerformance, teacherClasses } from '@/data/teacherMockData';

const StudentTracker = () => {
  const [students, setStudents] = useState(studentPerformance);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    grade: '',
    trend: ''
  });

  // TODO: Connect to backend API
  useEffect(() => {
    const fetchStudentPerformance = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/teacher/student-performance');
        // const data = await response.json();
        // setStudents(data);
        setStudents(studentPerformance);
      } catch (error) {
        console.error('Failed to fetch student performance:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentPerformance();
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'bg-green-100 text-green-800';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-800';
    if (grade === 'B-' || grade === 'C+') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredStudents = students.filter(student => {
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.class && student.class !== filters.class) return false;
    if (filters.grade && student.overallGrade !== filters.grade) return false;
    if (filters.trend && student.trend !== filters.trend) return false;
    return true;
  });

  const topPerformers = students
    .sort((a, b) => (b.assignmentScore + b.quizScore) / 2 - (a.assignmentScore + a.quizScore) / 2)
    .slice(0, 3);

  const lowPerformers = students
    .sort((a, b) => (a.assignmentScore + a.quizScore) / 2 - (b.assignmentScore + b.quizScore) / 2)
    .slice(0, 3);

  const handleExportReport = async () => {
    try {
      // TODO: API call to generate performance report
      // const response = await fetch('/api/teacher/reports/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ students: filteredStudents })
      // });

      // Simulate file download
      console.log('Generating performance report...');
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Performance Tracker</h1>
          <p className="text-muted-foreground">Monitor and track student performance across subjects</p>
        </div>
        <Button onClick={handleExportReport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-sm text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((acc, s) => acc + (s.assignmentScore + s.quizScore) / 2, 0) / students.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Overall class average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-bold">
                {students.filter(s => s.trend === 'up').length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Students improving</p>
          </CardContent>
        </Card>
      </div>

      {/* Top and Low Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with highest scores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Class {student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{Math.round((student.assignmentScore + student.quizScore) / 2)}%</p>
                  <Badge className={getGradeColor(student.overallGrade)}>
                    {student.overallGrade}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Needs Attention
            </CardTitle>
            <CardDescription>Students requiring extra support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Class {student.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{Math.round((student.assignmentScore + student.quizScore) / 2)}%</p>
                  <Badge className={getGradeColor(student.overallGrade)}>
                    {student.overallGrade}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Select value={filters.class} onValueChange={value => setFilters({...filters, class: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  {teacherClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select value={filters.grade} onValueChange={value => setFilters({...filters, grade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Grades</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="C+">C+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select value={filters.trend} onValueChange={value => setFilters({...filters, trend: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All trends" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Trends</SelectItem>
                  <SelectItem value="up">Improving</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="down">Declining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance View</CardTitle>
          <CardDescription>Subject-wise performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading student data...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students found matching the filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatars/${student.name.toLowerCase().replace(' ', '-')}.png`} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Class {student.class}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Assignment</p>
                        <p className="font-medium">{student.assignmentScore}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Quiz</p>
                        <p className="font-medium">{student.quizScore}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <Badge className={getGradeColor(student.overallGrade)}>
                          {student.overallGrade}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Trend</p>
                        {getTrendIcon(student.trend)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  {student.remarks && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Remarks:</strong> {student.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTracker;
