import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, RotateCcw, FileDown, User, BookOpen, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import MarksheetTemplateSetup from '@/components/MarksheetTemplateSetup';
import { MarksheetTemplate, StudentMarksheetData, generateMarksheetPDF, generateBulkMarksheetPDF } from '@/utils/pdfGenerator';

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

interface TeacherData {
  name: string;
  subject: string;
  class: string;
  isInCharge: boolean;
}

const MarkSheet = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Teacher role simulation - can be changed to test different scenarios
  const [currentTeacher, setCurrentTeacher] = useState<TeacherData>({
    name: "Teacher A",
    subject: "Mathematics",
    class: "10A",
    isInCharge: true
  });
  
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

  // Mock teacher data for testing different scenarios
  const mockTeacherTypes = [
    { name: "Teacher A", subject: "Mathematics", class: "10A", isInCharge: true },
    { name: "Teacher B", subject: "Science", class: "10A", isInCharge: false },
    { name: "Teacher C", subject: "", class: "10A", isInCharge: true }
  ];

  const remarksOptions = ['Excellent', 'Good', 'Average', 'Needs Improvement'];

  // Add template state
  const [marksheetTemplate, setMarksheetTemplate] = useState<MarksheetTemplate>({
    schoolName: 'Delhi Public School',
    academicYear: '2024-2025',
    classTeacherName: currentTeacher.name,
    classSection: currentTeacher.class,
    headerTitle: 'Academic Report Card',
    gradingSystem: 'A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: Below 60',
    footerNotes: 'This is to certify that the above marks are correct.\n\nPrincipal Signature: ________________'
  });

  // Determine teacher type for conditional rendering
  const getTeacherType = () => {
    if (currentTeacher.isInCharge && currentTeacher.subject) {
      return 'incharge-and-subject'; // Can see all, edit own subject
    } else if (!currentTeacher.isInCharge && currentTeacher.subject) {
      return 'subject-only'; // Can see/edit only own subject
    } else if (currentTeacher.isInCharge && !currentTeacher.subject) {
      return 'incharge-only'; // Can see all, edit none
    }
    return 'none';
  };

  const teacherType = getTeacherType();

  // Get subjects to display based on teacher role
  const getDisplaySubjects = () => {
    if (teacherType === 'subject-only') {
      return [currentTeacher.subject];
    }
    return subjects;
  };

  // Check if teacher can edit a specific subject
  const canEditSubject = (subject: string) => {
    if (teacherType === 'incharge-only') return false;
    if (teacherType === 'subject-only') return subject === currentTeacher.subject;
    if (teacherType === 'incharge-and-subject') return subject === currentTeacher.subject;
    return false;
  };

  // Check if teacher can access download/share features
  const canDownloadShare = () => {
    return currentTeacher.isInCharge;
  };

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/classes/${currentTeacher.class}/students`);
      // const data = await response.json();
      
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
      getDisplaySubjects().forEach(subject => {
        entries.push({
          studentId: student.id,
          subject,
          marks: Math.floor(Math.random() * 40) + 60, // Mock marks between 60-100
          remarks: remarksOptions[Math.floor(Math.random() * remarksOptions.length)]
        });
      });
    });
    setMarkEntries(entries);
  };

  const updateMarkEntry = (studentId: string, subject: string, field: 'marks' | 'remarks', value: string | number) => {
    if (!canEditSubject(subject)) {
      toast({
        title: "Access Denied",
        description: "You can only edit marks for your subject",
        variant: "destructive",
      });
      return;
    }

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
    if (!canDownloadShare()) {
      toast({
        title: "Access Denied",
        description: "Only class in-charge can generate comments",
        variant: "destructive",
      });
      return;
    }

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

  // Updated download functions with PDF generation
  const handleDownloadAll = async () => {
    if (!canDownloadShare()) {
      toast({
        title: "Access Denied",
        description: "Only class in-charge can download mark sheets",
        variant: "destructive",
      });
      return;
    }

    if (!examType) {
      toast({
        title: "Error",
        description: "Please select an exam type first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare student data for PDF generation
      const studentsData: StudentMarksheetData[] = students.map(student => {
        const marks: { [subject: string]: number | string } = {};
        const remarks: { [subject: string]: string } = {};
        
        getDisplaySubjects().forEach(subject => {
          marks[subject] = getMarkEntry(student.id, subject, 'marks');
          remarks[subject] = getMarkEntry(student.id, subject, 'remarks').toString();
        });

        return {
          id: student.id,
          name: student.name,
          rollNo: student.rollNo,
          class: student.class,
          section: student.section,
          marks,
          remarks,
          comment: getStudentComment(student.id)
        };
      });

      await generateBulkMarksheetPDF(marksheetTemplate, studentsData, examType);
      
      toast({
        title: "Download Started",
        description: `Downloading ${students.length} report cards...`,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to download mark sheets');
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to generate mark sheets",
        variant: "destructive",
      });
    }
  };

  const handleDownloadIndividual = async (studentId: string) => {
    if (!canDownloadShare()) {
      toast({
        title: "Access Denied",
        description: "Only class in-charge can download mark sheets",
        variant: "destructive",
      });
      return;
    }

    if (!examType) {
      toast({
        title: "Error",
        description: "Please select an exam type first",
        variant: "destructive",
      });
      return;
    }

    try {
      const student = students.find(s => s.id === studentId);
      if (!student) return;

      // Prepare student data for PDF generation
      const marks: { [subject: string]: number | string } = {};
      const remarks: { [subject: string]: string } = {};
      
      getDisplaySubjects().forEach(subject => {
        marks[subject] = getMarkEntry(student.id, subject, 'marks');
        remarks[subject] = getMarkEntry(student.id, subject, 'remarks').toString();
      });

      const studentData: StudentMarksheetData = {
        id: student.id,
        name: student.name,
        rollNo: student.rollNo,
        class: student.class,
        section: student.section,
        marks,
        remarks,
        comment: getStudentComment(student.id)
      };

      await generateMarksheetPDF(marksheetTemplate, studentData, examType);
      
      toast({
        title: "Download Started",
        description: `Mark sheet for ${student.name} is being prepared`,
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
    if (!canDownloadShare()) {
      toast({
        title: "Access Denied",
        description: "Only class in-charge can share mark sheets",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Integrate with backend API
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
    if (teacherType === 'incharge-only') {
      toast({
        title: "Access Denied",
        description: "You cannot edit or reset mark entries",
        variant: "destructive",
      });
      return;
    }

    setMarkEntries(prev => prev.map(entry => ({ ...entry, marks: '', remarks: '' })));
    setStudentComments([]);
    setExamType('');
    toast({
      title: "Reset Complete",
      description: "All fields have been cleared",
    });
  };

  const handleSaveTemplate = (template: MarksheetTemplate) => {
    setMarksheetTemplate(template);
    // TODO: Save template to backend
    console.log('Saving template:', template);
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mark Sheet Management</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{currentTeacher.name}</span>
            </div>
            {currentTeacher.subject && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{currentTeacher.subject}</span>
              </div>
            )}
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {teacherType === 'incharge-and-subject' ? 'Class In-charge & Subject Teacher' :
               teacherType === 'subject-only' ? 'Subject Teacher' :
               teacherType === 'incharge-only' ? 'Class In-charge' : 'Teacher'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Demo: Teacher Type Switcher */}
          <Select 
            value={`${currentTeacher.name}`} 
            onValueChange={(value) => {
              const teacher = mockTeacherTypes.find(t => t.name === value);
              if (teacher) setCurrentTeacher(teacher);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Switch Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Teacher A">Teacher A (In-charge + Math)</SelectItem>
              <SelectItem value="Teacher B">Teacher B (Science only)</SelectItem>
              <SelectItem value="Teacher C">Teacher C (In-charge only)</SelectItem>
            </SelectContent>
          </Select>
          
          {canDownloadShare() && (
            <>
              <Button onClick={handleDownloadAll} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download All
              </Button>
              <Button onClick={handleShareAll} variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share All
              </Button>
            </>
          )}
          <Button onClick={handleResetAll} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        </div>
      </div>

      {canDownloadShare() && (
        <MarksheetTemplateSetup
          template={marksheetTemplate}
          onSaveTemplate={handleSaveTemplate}
          currentTeacher={currentTeacher}
        />
      )}

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
            <CardTitle>
              Student Mark Sheet - {examType.replace('-', ' ').toUpperCase()}
              {teacherType === 'subject-only' && (
                <span className="text-sm font-normal text-gray-600 ml-2">
                  (Showing {currentTeacher.subject} only)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 min-w-12">S.No</TableHead>
                    <TableHead className="min-w-[180px] max-w-[220px]">Student Name</TableHead>
                    <TableHead className="w-20 min-w-20">Roll No</TableHead>
                    <TableHead className="w-24 min-w-24 text-center">Class</TableHead>
                    {getDisplaySubjects().map(subject => (
                      <TableHead key={subject} className="text-center min-w-[140px] max-w-[160px]">
                        <div className="flex flex-col">
                          <span className="font-medium">{subject}</span>
                          <div className="text-xs text-gray-500 mt-1">
                            Marks | Grade
                            {canEditSubject(subject) && <span className="text-green-600"> ✓</span>}
                          </div>
                        </div>
                      </TableHead>
                    ))}
                    {canDownloadShare() && <TableHead className="w-16 min-w-16 text-center">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <React.Fragment key={student.id}>
                      <TableRow className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          <div className="truncate pr-2">{student.name}</div>
                        </TableCell>
                        <TableCell className="text-center">{student.rollNo}</TableCell>
                        <TableCell className="text-center text-sm">
                          <div>{student.class}</div>
                          <div className="text-xs text-gray-500">{student.section}</div>
                        </TableCell>
                        {getDisplaySubjects().map(subject => (
                          <TableCell key={subject} className="text-center p-2">
                            <div className="flex flex-col gap-1.5">
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
                                className="w-full h-8 text-center text-sm"
                                min="0"
                                max="100"
                                disabled={!canEditSubject(subject)}
                              />
                              <Select 
                                value={getMarkEntry(student.id, subject, 'remarks').toString()} 
                                onValueChange={(value) => updateMarkEntry(student.id, subject, 'remarks', value)}
                                disabled={!canEditSubject(subject)}
                              >
                                <SelectTrigger className="w-full h-7 text-xs">
                                  <SelectValue placeholder="Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                  {remarksOptions.map(remark => (
                                    <SelectItem key={remark} value={remark} className="text-xs">
                                      {remark}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        ))}
                        {canDownloadShare() && (
                          <TableCell className="text-center p-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={() => generateComment(student.id)}
                                  className="cursor-pointer"
                                >
                                  <FileDown className="h-4 w-4 mr-2" />
                                  Generate Comment
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDownloadIndividual(student.id)}
                                  className="cursor-pointer"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        )}
                      </TableRow>
                      {getStudentComment(student.id) && canDownloadShare() && (
                        <TableRow className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <TableCell colSpan={getDisplaySubjects().length + 5} className="text-sm italic text-gray-700 bg-blue-50 p-4">
                            <strong>Comment:</strong> {getStudentComment(student.id)}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {teacherType === 'subject-only' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> As a subject teacher, you can only view and edit marks for {currentTeacher.subject}. 
                  Contact the class in-charge for download and sharing options.
                </p>
              </div>
            )}

            {teacherType === 'incharge-only' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> As class in-charge, you can view all marks and download/share mark sheets, 
                  but cannot edit marks. Contact subject teachers for mark entry.
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
