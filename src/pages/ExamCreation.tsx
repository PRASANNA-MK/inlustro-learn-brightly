
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, Download, Settings, Plus, Share2 } from 'lucide-react';
import ExamPreview from '@/components/ExamPreview';
import ManualQuestionForm from '@/components/ManualQuestionForm';

interface Question {
  id: string;
  text: string;
  marks: number;
  type: 'mcq' | 'short' | 'long';
  explanation?: string;
}

interface ExamData {
  title: string;
  className: string;
  duration: string;
  questions: Question[];
  totalMarks: number;
}

const ExamCreation = () => {
  // Form states
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [notesFile, setNotesFile] = useState<File | null>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examDuration, setExamDuration] = useState('');
  
  // Question pattern state
  const [questionPattern, setQuestionPattern] = useState({
    '1-mark': 0,
    '2-mark': 0,
    '5-mark': 0,
    '15-mark': 0,
  });

  // Generated exam states
  const [generatedExam, setGeneratedExam] = useState<ExamData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Backend integration states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentExams, setRecentExams] = useState<ExamData[]>([]);

  const classes = ['10A', '10B', '10C', '9A', '9B', '8A', '8B'];

  // TODO: Connect to backend API
  useEffect(() => {
    // Fetch recent exams from backend
    const fetchRecentExams = async () => {
      try {
        // const response = await fetch('/api/exams/recent');
        // const data = await response.json();
        // setRecentExams(data);
        
        // Mock data for now
        setRecentExams([
          {
            title: 'Mid-term Mathematics Exam',
            className: '10A',
            duration: '180',
            questions: [],
            totalMarks: 100
          },
          {
            title: 'Quadratic Equations Quiz',
            className: '10B',
            duration: '60',
            questions: [],
            totalMarks: 60
          }
        ]);
      } catch (err) {
        console.error('Error fetching recent exams:', err);
      }
    };

    fetchRecentExams();
  }, []);

  const calculateTotalMarks = () => {
    return Object.entries(questionPattern).reduce((total, [mark, count]) => {
      const markValue = parseInt(mark.split('-')[0]);
      return total + (markValue * count);
    }, 0);
  };

  const calculateTotalQuestions = () => {
    return Object.values(questionPattern).reduce((total, count) => total + count, 0);
  };

  const handleFileUpload = (file: File, type: 'syllabus' | 'notes') => {
    if (type === 'syllabus') {
      setSyllabusFile(file);
    } else {
      setNotesFile(file);
    }
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`
    });
  };

  const generateMockQuestions = (pattern: typeof questionPattern): Question[] => {
    const questions: Question[] = [];
    let questionId = 1;

    Object.entries(pattern).forEach(([markType, count]) => {
      const marks = parseInt(markType.split('-')[0]);
      for (let i = 0; i < count; i++) {
        questions.push({
          id: `q${questionId++}`,
          text: `Sample ${marks}-mark question ${i + 1}. This is a generated question based on the uploaded content.`,
          marks,
          type: marks <= 2 ? 'short' : marks <= 5 ? 'short' : 'long',
        });
      }
    });

    return questions;
  };

  const handleCreateExam = async (type: 'syllabus' | 'notes') => {
    const file = type === 'syllabus' ? syllabusFile : notesFile;
    if (!file || !examTitle || !selectedClass || calculateTotalQuestions() === 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields and set question pattern.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // TODO: Connect to backend API
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('title', examTitle);
      // formData.append('class', selectedClass);
      // formData.append('duration', examDuration);
      // formData.append('pattern', JSON.stringify(questionPattern));
      // 
      // const response = await fetch('/api/exams/generate', {
      //   method: 'POST',
      //   body: formData
      // });
      // 
      // if (!response.ok) throw new Error('Failed to generate exam');
      // const data = await response.json();

      // Mock generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock generated exam data
      const mockExam: ExamData = {
        title: examTitle,
        className: selectedClass,
        duration: examDuration,
        questions: generateMockQuestions(questionPattern),
        totalMarks: calculateTotalMarks()
      };

      setGeneratedExam(mockExam);
      setShowPreview(true);

      toast({
        title: "Exam generated successfully",
        description: "Review your exam and make any necessary changes."
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate exam');
      toast({
        title: "Error",
        description: "Failed to generate exam. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddManualQuestion = (question: Omit<Question, 'id'>) => {
    if (!generatedExam) return;

    const newQuestion: Question = {
      ...question,
      id: `manual-${Date.now()}`
    };

    const updatedExam = {
      ...generatedExam,
      questions: [...generatedExam.questions, newQuestion],
      totalMarks: generatedExam.totalMarks + question.marks
    };

    setGeneratedExam(updatedExam);
    setShowManualForm(false);

    toast({
      title: "Question added",
      description: "Manual question has been added to the exam."
    });
  };

  const handleDownloadPDF = async () => {
    if (!generatedExam) return;

    try {
      // TODO: Connect to backend API
      // const response = await fetch('/api/exams/download', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(generatedExam)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to download PDF');
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${generatedExam.title}.pdf`;
      // a.click();

      toast({
        title: "Download started",
        description: "Your exam PDF is being prepared for download."
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleShareToClass = async () => {
    if (!generatedExam) return;

    try {
      // TODO: Connect to backend API
      // const response = await fetch('/api/exams/share', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...generatedExam,
      //     shareToClass: selectedClass
      //   })
      // });
      // 
      // if (!response.ok) throw new Error('Failed to share exam');

      toast({
        title: "Exam shared",
        description: `Exam has been shared with class ${generatedExam.className}.`
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to share exam. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBackToCreation = () => {
    setShowPreview(false);
    setGeneratedExam(null);
    setShowManualForm(false);
  };

  const PatternSelector = () => (
    <div className="space-y-4">
      <Label className="text-base font-medium">Question Pattern</Label>
      {Object.entries(questionPattern).map(([mark, count]) => (
        <div key={mark} className="flex items-center gap-3">
          <Label className="w-24 text-sm">{mark} questions</Label>
          <Input
            type="number"
            min="0"
            className="w-20"
            value={count}
            onChange={e => setQuestionPattern(prev => ({
              ...prev,
              [mark]: parseInt(e.target.value) || 0
            }))}
          />
        </div>
      ))}
      
      {calculateTotalQuestions() > 0 && (
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Questions:</span>
            <Badge variant="outline">{calculateTotalQuestions()}</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Marks:</span>
            <Badge variant="outline">{calculateTotalMarks()}</Badge>
          </div>
        </div>
      )}
    </div>
  );

  if (showPreview && generatedExam) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Exam Preview</h1>
          <p className="text-muted-foreground">Review and customize your generated exam.</p>
        </div>

        {showManualForm && (
          <ManualQuestionForm
            onAddQuestion={handleAddManualQuestion}
            onCancel={() => setShowManualForm(false)}
          />
        )}

        {!showManualForm && (
          <div className="flex gap-2 mb-4">
            <Button variant="outline" onClick={() => setShowManualForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Manual Question
            </Button>
          </div>
        )}

        <ExamPreview
          examTitle={generatedExam.title}
          className={generatedExam.className}
          duration={generatedExam.duration}
          questions={generatedExam.questions}
          totalMarks={generatedExam.totalMarks}
          onDownload={handleDownloadPDF}
          onShare={handleShareToClass}
          onEdit={() => setShowManualForm(true)}
          onBack={handleBackToCreation}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Creation</h1>
        <p className="text-muted-foreground">Generate exams from syllabus content or lesson notes with customizable question patterns.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Tabs defaultValue="syllabus" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="syllabus">Syllabus Based</TabsTrigger>
          <TabsTrigger value="notes">Notes Based</TabsTrigger>
        </TabsList>
        
        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Syllabus
                </CardTitle>
                <CardDescription>Upload syllabus PDF or text file to generate questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">Exam Title</Label>
                  <Input
                    id="exam-title"
                    placeholder="e.g., Mid-term Mathematics Exam"
                    value={examTitle}
                    onChange={e => setExamTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class-select">Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
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

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 180"
                    value={examDuration}
                    onChange={e => setExamDuration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Syllabus File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {syllabusFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{syllabusFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop syllabus file here or click to browse</p>
                        <p className="text-xs text-gray-400">Supports PDF, DOC, TXT</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'syllabus')}
                      id="syllabus-upload"
                    />
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById('syllabus-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Question Pattern
                </CardTitle>
                <CardDescription>Define the structure of your exam questions</CardDescription>
              </CardHeader>
              <CardContent>
                <PatternSelector />
                <Button 
                  onClick={() => handleCreateExam('syllabus')} 
                  className="w-full mt-6"
                  disabled={!syllabusFile || !examTitle || calculateTotalQuestions() === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Exam from Syllabus
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Lesson Notes
                </CardTitle>
                <CardDescription>Upload detailed lesson notes to generate targeted questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-title-notes">Exam Title</Label>
                  <Input
                    id="exam-title-notes"
                    placeholder="e.g., Quadratic Equations Test"
                    value={examTitle}
                    onChange={e => setExamTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class-select-notes">Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
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

                <div className="space-y-2">
                  <Label htmlFor="duration-notes">Duration (minutes)</Label>
                  <Input
                    id="duration-notes"
                    type="number"
                    placeholder="e.g., 60"
                    value={examDuration}
                    onChange={e => setExamDuration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lesson Notes File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {notesFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{notesFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop lesson notes here or click to browse</p>
                        <p className="text-xs text-gray-400">Supports PDF, DOC, TXT</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'notes')}
                      id="notes-upload"
                    />
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById('notes-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Question Pattern
                </CardTitle>
                <CardDescription>Define the structure of your exam questions</CardDescription>
              </CardHeader>
              <CardContent>
                <PatternSelector />
                <Button 
                  onClick={() => handleCreateExam('notes')} 
                  className="w-full mt-6"
                  disabled={!notesFile || !examTitle || calculateTotalQuestions() === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Exam from Notes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Exams</CardTitle>
          <CardDescription>Your recently created exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Class {exam.className} • {exam.questions.length} questions • {exam.totalMarks} marks
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {index === 0 ? '2 days ago' : '1 week ago'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamCreation;
