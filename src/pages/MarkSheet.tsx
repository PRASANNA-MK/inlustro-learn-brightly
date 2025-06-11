
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, RotateCcw, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
}

interface MarkEntry {
  studentId: string;
  subject: string;
  marks: number | '';
  remarks: string;
}

interface StudentComment {
  studentId: string;
  comment: string;
}

const MarkSheet = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for exam type and data
  const [examType, setExamType] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects] = useState(['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi']);
  const [markEntries, setMarkEntries] = useState<MarkEntry[]>([]);
  const [studentComments, setStudentComments] = useState<StudentComment[]>([]);

  // Mock data
  const mockStudents: Student[] = [
    { id: '1', name: 'Aarav Sharma', rollNo: '001', class: '10th', section: 'A' },
    { id: '2', name: 'Priya Patel', rollNo: '002', class: '10th', section: 'A' },
    { id: '3', name: 'Rohit Kumar', rollNo: '003', class: '10th', section: 'A' },
    { id: '4', name: 'Sneha Reddy', rollNo: '004', class: '10th', section: 'A' },
    { id: '5', name: 'Arjun Singh', rollNo: '005', class: '10th', section: 'A' },
  ];

  const remarksOptions = ['Excellent', 'Good', 'Average', 'Needs Improvement'];

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/students');
      // const data = await response.json();
      
      // Mock API simulation
      setTimeout(() => {
        setStudents(mockStudents);
        initializeMarkEntries(mockStudents);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch students data');
      setLoading(false);
    }
  };

  const initializeMarkEntries = (studentList: Student[]) => {
    const entries: MarkEntry[] = [];
    studentList.forEach(student => {
      subjects.forEach(subject => {
        entries.push({
          studentId: student.id,
          subject,
          marks: '',
          remarks: ''
        });
      });
    });
    setMarkEntries(entries);
  };

  const updateMarkEntry = (studentId: string, subject: string, field: 'marks' | 'remarks', value: string | number) => {
    setMarkEntries(prev => prev.map(entry => 
      entry.studentId === studentId && entry.subject === subject
        ? { ...entry, [field]: value }
        : entry
    ));
  };

  const getMarkEntry = (studentId: string, subject: string, field: 'marks' | 'remarks') => {
    const entry = markEntries.find(e => e.studentId === studentId && e.subject === subject);
    return entry ? entry[field] : '';
  };

  const validateMarks = (marks: string): boolean => {
    const num = parseInt(marks);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  const generateComment = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const studentEntries = markEntries.filter(e => e.studentId === studentId && e.marks !== '');
    
    if (studentEntries.length === 0) {
      toast({
        title: "Error",
        description: "Please enter marks for all subjects before generating comment",
        variant: "destructive",
      });
      return;
    }

    const subjectPerformance: { [key: string]: string[] } = {
      'Excellent': [],
      'Good': [],
      'Average': [],
      'Needs Improvement': []
    };

    studentEntries.forEach(entry => {
      if (entry.remarks) {
        subjectPerformance[entry.remarks].push(entry.subject);
      }
    });

    let comment = `${student.name} has `;
    const commentParts: string[] = [];

    Object.entries(subjectPerformance).forEach(([performance, subjectList]) => {
      if (subjectList.length > 0) {
        const subjectText = subjectList.length === 1 
          ? subjectList[0] 
          : `${subjectList.slice(0, -1).join(', ')} and ${subjectList[subjectList.length - 1]}`;
        
        commentParts.push(`shown ${performance.toLowerCase()} performance in ${subjectText}`);
      }
    });

    comment += commentParts.join(', ') + '.';

    setStudentComments(prev => [
      ...prev.filter(c => c.studentId !== studentId),
      { studentId, comment }
    ]);

    toast({
      title: "Success",
      description: "Comment generated successfully",
    });
  };

  const getStudentComment = (studentId: string) => {
    const comment = studentComments.find(c => c.studentId === studentId);
    return comment ? comment.comment : '';
  };

  const handleDownloadAll = async () => {
    setLoading(true);
    try {
      // TODO: Integrate with backend API
      // const response = await fetch('/api/marksheets/download-all', {
      //   method: 'POST',
      //   body: JSON.stringify({ examType, markEntries, studentComments }),
      // });
      
      toast({
        title: "Download Started",
        description: "All mark sheets are being prepared for download",
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to download mark sheets');
      setLoading(false);
    }
  };

  const handleDownloadIndividual = async (studentId: string) => {
    try {
      // TODO: Integrate with backend API
      // const response = await fetch(`/api/marksheets/download/${studentId}`, {
      //   method: 'POST',
      //   body: JSON.stringify({ examType, markEntries, studentComments }),
      // });
      
      const student = students.find(s => s.id === studentId);
      toast({
        title: "Download Started",
        description: `Mark sheet for ${student?.name} is being prepared`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download individual mark sheet",
        variant: "destructive",
      });
    }
  };

  const handleShareAll = async () => {
    try {
      // TODO: Integrate with backend API
      // const response = await fetch('/api/marksheets/share-all', {
      //   method: 'POST',
      //   body: JSON.stringify({ examType, markEntries, studentComments }),
      // });
      
      toast({
        title: "Shared Successfully",
        description: "All mark sheets have been shared to student dashboards",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to share mark sheets",
        variant: "destructive",
      });
    }
  };

  const handleResetAll = () => {
    setMarkEntries(prev => prev.map(entry => ({ ...entry, marks: '', remarks: '' })));
    setStudentComments([]);
    setExamType('');
    toast({
      title: "Reset Complete",
      description: "All fields have been cleared",
    });
  };

  const isFormComplete = () => {
    return examType && markEntries.every(entry => 
      entry.marks !== '' && entry.remarks !== '' && validateMarks(entry.marks.toString())
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading students data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Mark Sheet Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleDownloadAll} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
          <Button onClick={handleShareAll} variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share All
          </Button>
          <Button onClick={handleResetAll} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Type Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={examType} onValueChange={setExamType}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit-test">Unit Test</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="half-yearly">Half-Yearly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {examType && (
        <Card>
          <CardHeader>
            <CardTitle>Student Mark Sheet - {examType.replace('-', ' ').toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">S.No</TableHead>
                    <TableHead className="w-48">Student Name</TableHead>
                    <TableHead className="w-24">Roll No</TableHead>
                    <TableHead className="w-32">Class & Section</TableHead>
                    {subjects.map(subject => (
                      <TableHead key={subject} className="text-center min-w-32">
                        {subject}
                        <div className="text-xs text-gray-500">Marks | Remarks</div>
                      </TableHead>
                    ))}
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <React.Fragment key={student.id}>
                      <TableRow className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>{student.class} - {student.section}</TableCell>
                        {subjects.map(subject => (
                          <TableCell key={subject} className="text-center">
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="0-100"
                                value={getMarkEntry(student.id, subject, 'marks')}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === '' || validateMarks(value)) {
                                    updateMarkEntry(student.id, subject, 'marks', value === '' ? '' : parseInt(value));
                                  }
                                }}
                                className="w-20 h-8 text-center"
                                min="0"
                                max="100"
                              />
                              <Select 
                                value={getMarkEntry(student.id, subject, 'remarks').toString()} 
                                onValueChange={(value) => updateMarkEntry(student.id, subject, 'remarks', value)}
                              >
                                <SelectTrigger className="w-32 h-8 text-xs">
                                  <SelectValue placeholder="Remarks" />
                                </SelectTrigger>
                                <SelectContent>
                                  {remarksOptions.map(remark => (
                                    <SelectItem key={remark} value={remark}>{remark}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => generateComment(student.id)}
                              className="text-xs"
                            >
                              Generate Comment
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadIndividual(student.id)}
                              className="text-xs"
                            >
                              <FileDown className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {getStudentComment(student.id) && (
                        <TableRow className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <TableCell colSpan={subjects.length + 5} className="text-sm italic text-gray-700 bg-blue-50 p-4">
                            <strong>Comment:</strong> {getStudentComment(student.id)}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!isFormComplete() && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Please ensure all marks are between 0-100 and all remarks are selected before downloading or sharing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarkSheet;
