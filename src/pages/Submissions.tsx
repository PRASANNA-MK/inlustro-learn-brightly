
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  ClipboardEdit, 
  Plus, 
  Upload, 
  Eye, 
  CheckCircle, 
  Clock,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';
import { homework, teacherClasses } from '@/data/teacherMockData';

const Submissions = () => {
  const [assignments, setAssignments] = useState(homework);
  const [loading, setLoading] = useState(false);
  const [newAssignmentOpen, setNewAssignmentOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    class: '',
    subject: 'Mathematics',
    deadline: '',
    instructions: '',
    maxMarks: 100
  });

  const [filters, setFilters] = useState({
    class: '',
    status: '',
    subject: 'Mathematics'
  });

  const [feedback, setFeedback] = useState({
    score: '',
    comments: '',
    status: 'reviewed'
  });

  // Mock student submissions
  const [submissions] = useState([
    {
      id: 'sub-001',
      studentName: 'Emma Davis',
      studentId: 'student-001',
      assignmentId: 'hw-001',
      assignmentTitle: 'Chapter 5 Practice Problems',
      class: '10A',
      submittedDate: '2024-06-04',
      status: 'submitted',
      score: null,
      feedback: '',
      fileUrl: '/submissions/emma-chapter5.pdf'
    },
    {
      id: 'sub-002',
      studentName: 'Alex Thompson',
      studentId: 'student-002',
      assignmentId: 'hw-001',
      assignmentTitle: 'Chapter 5 Practice Problems',
      class: '10A',
      submittedDate: '2024-06-03',
      status: 'reviewed',
      score: 85,
      feedback: 'Good work! Pay attention to step 3 in problem 5.',
      fileUrl: '/submissions/alex-chapter5.pdf'
    },
    {
      id: 'sub-003',
      studentName: 'Michael Brown',
      studentId: 'student-003',
      assignmentId: 'hw-002',
      assignmentTitle: 'Algebra Worksheet',
      class: '10B',
      submittedDate: '2024-06-02',
      status: 'late',
      score: 78,
      feedback: 'Late submission. Work on time management.',
      fileUrl: '/submissions/michael-algebra.pdf'
    }
  ]);

  // TODO: Connect to backend API
  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/teacher/assignments');
        // const data = await response.json();
        // setAssignments(data);
        setAssignments(homework);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignments();
  }, []);

  const handleCreateAssignment = async () => {
    if (!assignmentForm.title || !assignmentForm.class || !assignmentForm.deadline) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to create assignment
      // const response = await fetch('/api/teacher/assignments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(assignmentForm)
      // });

      const newAssignment = {
        id: `hw-${Date.now()}`,
        ...assignmentForm,
        status: 'active',
        submittedCount: 0,
        totalStudents: teacherClasses.find(c => c.name === assignmentForm.class)?.totalStudents || 30,
        fileUrl: ''
      };

      setAssignments(prev => [newAssignment, ...prev]);
      setNewAssignmentOpen(false);
      setAssignmentForm({
        title: '',
        class: '',
        subject: 'Mathematics',
        deadline: '',
        instructions: '',
        maxMarks: 100
      });

      toast({
        title: "Assignment created",
        description: "Your assignment has been posted successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.score || !feedback.comments) {
      toast({
        title: "Error",
        description: "Please provide score and feedback comments.",
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: API call to submit feedback
      // await fetch(`/api/teacher/submissions/${selectedSubmission.id}/feedback`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedback)
      // });

      toast({
        title: "Feedback submitted",
        description: `Feedback sent to ${selectedSubmission.studentName}.`
      });

      setFeedbackOpen(false);
      setFeedback({ score: '', comments: '', status: 'reviewed' });
      setSelectedSubmission(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (filters.class && sub.class !== filters.class) return false;
    if (filters.status && sub.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homework & Assignments</h1>
          <p className="text-muted-foreground">Manage assignments and track student submissions</p>
        </div>
        
        <Dialog open={newAssignmentOpen} onOpenChange={setNewAssignmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Assignment Title *</Label>
                  <Input 
                    value={assignmentForm.title}
                    onChange={e => setAssignmentForm({...assignmentForm, title: e.target.value})}
                    placeholder="Enter assignment title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={assignmentForm.class} onValueChange={value => setAssignmentForm({...assignmentForm, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherClasses.map(cls => (
                        <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Deadline *</Label>
                  <Input 
                    type="date"
                    value={assignmentForm.deadline}
                    onChange={e => setAssignmentForm({...assignmentForm, deadline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Marks</Label>
                  <Input 
                    type="number"
                    value={assignmentForm.maxMarks}
                    onChange={e => setAssignmentForm({...assignmentForm, maxMarks: parseInt(e.target.value) || 100})}
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea 
                  value={assignmentForm.instructions}
                  onChange={e => setAssignmentForm({...assignmentForm, instructions: e.target.value})}
                  placeholder="Enter detailed instructions for students"
                  rows={4}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Assignment File (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Drop assignment file here or click to browse</p>
                  <p className="text-xs text-gray-400">Supports PDF, DOC, images</p>
                  <Button variant="outline" className="mt-2">Choose File</Button>
                </div>
              </div>
              
              <Button 
                onClick={handleCreateAssignment} 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Assignment'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create Assignment</TabsTrigger>
          <TabsTrigger value="review">Review Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Active Assignments */}
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardEdit className="h-5 w-5 text-blue-600" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription>
                        Class {assignment.class} • Due: {new Date(assignment.deadline).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge 
                      className={assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{assignment.instructions}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Submissions: {assignment.submittedCount}/{assignment.totalStudents} students
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {assignment.fileUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
              <CardDescription>Set up a new homework or assignment for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Click the "New Assignment" button in the header to create a new assignment.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Class</Label>
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
                  <Label>Status</Label>
                  <Select value={filters.status} onValueChange={value => setFilters({...filters, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">Apply Filters</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">{submission.studentName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {submission.assignmentTitle} • Class {submission.class}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                        {submission.score && <span>Score: {submission.score}/100</span>}
                      </div>
                      {submission.feedback && (
                        <p className="text-sm text-blue-600">"{submission.feedback}"</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setFeedbackOpen(true);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {submission.status === 'reviewed' ? 'Edit Feedback' : 'Add Feedback'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Submissions Reviewed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'reviewed').length}
                </div>
                <p className="text-sm text-muted-foreground">Out of {submissions.length} total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'submitted').length}
                </div>
                <p className="text-sm text-muted-foreground">Awaiting feedback</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(submissions.filter(s => s.score).reduce((acc, s) => acc + s.score, 0) / submissions.filter(s => s.score).length) || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Class performance</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedSubmission ? `Feedback for ${selectedSubmission.studentName}` : 'Add Feedback'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Score (out of 100) *</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={feedback.score}
                onChange={e => setFeedback({...feedback, score: e.target.value})}
                placeholder="85"
              />
            </div>
            <div className="space-y-2">
              <Label>Comments *</Label>
              <Textarea
                value={feedback.comments}
                onChange={e => setFeedback({...feedback, comments: e.target.value})}
                placeholder="Provide detailed feedback for the student..."
                rows={4}
              />
            </div>
            <Button onClick={handleSubmitFeedback} className="w-full">
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;
