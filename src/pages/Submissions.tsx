
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText, Download, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data for submissions
const submissionsMockData = [
  {
    id: 's001',
    student: 'John Smith',
    class: '10A',
    exam: 'Mathematics Mid-Term',
    subject: 'Mathematics',
    score: 85,
    maxScore: 100,
    submitDate: '2025-04-10T14:30:00',
    status: 'graded',
  },
  {
    id: 's002',
    student: 'Emma Johnson',
    class: '10A',
    exam: 'Mathematics Mid-Term',
    subject: 'Mathematics',
    score: 92,
    maxScore: 100,
    submitDate: '2025-04-10T15:15:00',
    status: 'graded',
  },
  {
    id: 's003',
    student: 'Michael Brown',
    class: '10B',
    exam: 'Physics Quiz',
    subject: 'Physics',
    score: 78,
    maxScore: 100,
    submitDate: '2025-04-12T10:45:00',
    status: 'graded',
  },
  {
    id: 's004',
    student: 'Sophia Garcia',
    class: '10B',
    exam: 'Physics Quiz',
    subject: 'Physics',
    score: 88,
    maxScore: 100,
    submitDate: '2025-04-12T11:20:00',
    status: 'graded',
  },
  {
    id: 's005',
    student: 'William Davis',
    class: '11A',
    exam: 'Chemistry Test',
    subject: 'Chemistry',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-14T09:10:00',
    status: 'pending',
  },
  {
    id: 's006',
    student: 'Olivia Martinez',
    class: '11A',
    exam: 'Chemistry Test',
    subject: 'Chemistry',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-14T09:30:00',
    status: 'pending',
  },
  {
    id: 's007',
    student: 'James Wilson',
    class: '9C',
    exam: 'History Mid-Term',
    subject: 'History',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-15T13:45:00',
    status: 'pending',
  },
  {
    id: 's008',
    student: 'Isabella Moore',
    class: '9C',
    exam: 'History Mid-Term',
    subject: 'History',
    score: null,
    maxScore: 100,
    submitDate: '2025-04-15T14:10:00',
    status: 'pending',
  },
];

// Get unique subject classes
const subjects = [...new Set(submissionsMockData.map(item => item.subject))];
const classes = [...new Set(submissionsMockData.map(item => item.class))];

const Submissions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredSubmissions = submissionsMockData.filter(submission => {
    const matchesSearch = searchTerm === '' || 
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      submission.exam.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject ? submission.subject === selectedSubject : true;
    const matchesClass = selectedClass ? submission.class === selectedClass : true;
    
    return matchesSearch && matchesSubject && matchesClass;
  });
  
  const pendingSubmissions = filteredSubmissions.filter(s => s.status === 'pending');
  const gradedSubmissions = filteredSubmissions.filter(s => s.status === 'graded');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleDownload = (submission: any) => {
    toast({
      title: "Downloading Submission",
      description: `Downloading ${submission.student}'s submission for ${submission.exam}.`,
    });
  };
  
  const handleGrade = (submission: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Grading Interface Open",
        description: `Now grading ${submission.student}'s submission for ${submission.exam}.`,
      });
    }, 1000);
  };

  const handleViewDetails = (submission: any) => {
    toast({
      title: "Viewing Submission Details",
      description: `Viewing detailed results for ${submission.student}'s ${submission.exam}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
        <p className="text-muted-foreground">View and grade student exam submissions.</p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={selectedSubject || ''} onValueChange={(val) => setSelectedSubject(val || null)}>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={selectedClass || ''} onValueChange={(val) => setSelectedClass(val || null)}>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Classes</SelectItem>
              {classes.map(className => (
                <SelectItem key={className} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="rounded-full bg-muted p-1">
          <TabsTrigger value="pending" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">
            Pending
            <Badge variant="outline" className="ml-2 bg-inlustro-purple/10">{pendingSubmissions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="graded" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">
            Graded
            <Badge variant="outline" className="ml-2 bg-inlustro-purple/10">{gradedSubmissions.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent">
              <CardTitle>Pending Submissions</CardTitle>
              <CardDescription>Submissions that need to be graded.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ))}
                </div>
              ) : pendingSubmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No pending submissions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    All submissions have been graded
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{submission.student}</TableCell>
                        <TableCell>{submission.class}</TableCell>
                        <TableCell>{submission.exam}</TableCell>
                        <TableCell>{formatDate(submission.submitDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDownload(submission)}
                                    className="h-8 rounded-full"
                                  >
                                    <Download className="h-3.5 w-3.5 mr-1" />
                                    Download
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download submission</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleGrade(submission)}
                                    className="h-8 rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
                                  >
                                    Grade
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Grade this submission</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="graded">
          <Card className="rounded-3xl shadow-inlustro border-0">
            <CardHeader className="bg-gradient-to-r from-inlustro-purple/10 to-transparent">
              <CardTitle>Graded Submissions</CardTitle>
              <CardDescription>Submissions that have been graded.</CardDescription>
            </CardHeader>
            <CardContent>
              {gradedSubmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No graded submissions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Grade some submissions to see them here
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Exam</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradedSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{submission.student}</TableCell>
                        <TableCell>{submission.class}</TableCell>
                        <TableCell>{submission.exam}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${submission.score! >= 80 ? "text-green-600" : submission.score! >= 70 ? "text-amber-600" : "text-red-600"}`}>
                            {submission.score} / {submission.maxScore}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(submission.submitDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDownload(submission)}
                                    className="h-8 rounded-full"
                                  >
                                    <Download className="h-3.5 w-3.5 mr-1" />
                                    Download
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download submission</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(submission)}
                                    className="h-8 rounded-full"
                                  >
                                    <Eye className="h-3.5 w-3.5 mr-1" />
                                    View
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Submissions;
