
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { submissions, students } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Plus, Eye, CheckCircle, Clock, MessageSquare, Filter, Download } from 'lucide-react';

const Submissions = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDescription, setNewAssignmentDescription] = useState('');
  const [newAssignmentClass, setNewAssignmentClass] = useState('');
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('');

  const classes = ['10A', '10B', '10C'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry'];
  const statuses = ['Active', 'Completed', 'Overdue'];

  const filteredSubmissions = submissions.filter(submission => {
    const classMatch = selectedClass === 'all' || submission.class === selectedClass;
    const subjectMatch = selectedSubject === 'all' || submission.subject === selectedSubject;
    const statusMatch = selectedStatus === 'all' || submission.status === selectedStatus;
    return classMatch && subjectMatch && statusMatch;
  });

  const studentSubmissions = [
    {
      id: 1,
      studentName: 'Emma Davis',
      submissionTitle: 'Quadratic Equations Homework',
      class: '10A',
      submittedDate: '2024-06-02T14:30:00Z',
      status: 'submitted',
      grade: null,
      feedback: ''
    },
    {
      id: 2,
      studentName: 'Alex Thompson',
      submissionTitle: 'Algebra Practice Test',
      class: '10A',
      submittedDate: '2024-06-01T16:45:00Z',
      status: 'reviewed',
      grade: 85,
      feedback: 'Good work! Pay attention to step 3 in problem 5.'
    }
  ];

  const handleCreateAssignment = () => {
    if (!newAssignmentTitle || !newAssignmentDescription || !newAssignmentClass || !newAssignmentDueDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assignment created",
      description: `"${newAssignmentTitle}" has been assigned to ${newAssignmentClass}.`
    });

    // Reset form
    setNewAssignmentTitle('');
    setNewAssignmentDescription('');
    setNewAssignmentClass('');
    setNewAssignmentDueDate('');
  };

  const handleGradeSubmission = (submissionId: number, grade: number, feedback: string) => {
    toast({
      title: "Submission graded",
      description: "Grade and feedback have been saved."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'Overdue': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
        <p className="text-muted-foreground">Create assignments, track submissions, and provide feedback to students.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create Assignment</TabsTrigger>
          <TabsTrigger value="review">Review Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredSubmissions.map(submission => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{submission.title}</CardTitle>
                      <CardDescription>
                        {submission.type} • {submission.class} • Due: {new Date(submission.dueDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(submission.status)}>{submission.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{submission.submittedCount}</p>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{submission.reviewedCount}</p>
                      <p className="text-sm text-muted-foreground">Reviewed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{submission.pendingReview}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{submission.averageScore}%</p>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Submission Progress</span>
                      <span>{submission.submittedCount}/{submission.totalStudents}</span>
                    </div>
                    <Progress value={(submission.submittedCount / submission.totalStudents) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download All
                    </Button>
                    {submission.pendingReview > 0 && (
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Review ({submission.pendingReview})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Assignment
              </CardTitle>
              <CardDescription>Set up a new assignment or homework for your students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-title">Assignment Title</Label>
                  <Input
                    id="assignment-title"
                    placeholder="e.g., Chapter 5 Homework"
                    value={newAssignmentTitle}
                    onChange={e => setNewAssignmentTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignment-class">Select Class</Label>
                  <Select value={newAssignmentClass} onValueChange={setNewAssignmentClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignment-description">Description & Instructions</Label>
                <Textarea
                  id="assignment-description"
                  placeholder="Provide detailed instructions for the assignment..."
                  rows={4}
                  value={newAssignmentDescription}
                  onChange={e => setNewAssignmentDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="datetime-local"
                    value={newAssignmentDueDate}
                    onChange={e => setNewAssignmentDueDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-marks">Maximum Marks</Label>
                  <Input
                    id="max-marks"
                    type="number"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Submission Type</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="submission-type" value="file" defaultChecked />
                    File Upload
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="submission-type" value="text" />
                    Text Response
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="submission-type" value="both" />
                    Both
                  </label>
                </div>
              </div>

              <Button onClick={handleCreateAssignment} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Student Submissions
              </CardTitle>
              <CardDescription>Review and grade student work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentSubmissions.map(submission => (
                  <div key={submission.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{submission.studentName}</h4>
                        <p className="text-sm text-muted-foreground">{submission.submissionTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {submission.class} • Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={submission.status === 'reviewed' ? 'default' : 'secondary'}>
                        {submission.status}
                      </Badge>
                    </div>

                    {submission.status === 'reviewed' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Grade:</span>
                          <Badge variant="outline">{submission.grade}/100</Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Feedback:</span>
                          <p className="text-sm text-muted-foreground mt-1">{submission.feedback}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`grade-${submission.id}`}>Grade (out of 100)</Label>
                            <Input
                              id={`grade-${submission.id}`}
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Enter grade"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`feedback-${submission.id}`}>Feedback</Label>
                          <Textarea
                            id={`feedback-${submission.id}`}
                            placeholder="Provide feedback to the student..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => handleGradeSubmission(submission.id, 85, 'Good work!')}
                          >
                            Save Grade
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View File
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">78%</p>
                  <p className="text-sm text-muted-foreground">Average across all classes</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">82</p>
                  <p className="text-sm text-muted-foreground">Out of 100</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>On-Time Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">91%</p>
                  <p className="text-sm text-muted-foreground">Submitted before deadline</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Submissions;
