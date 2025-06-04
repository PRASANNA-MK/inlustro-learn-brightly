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
  Upload, 
  FileText, 
  Download, 
  Settings, 
  Plus, 
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { teacherClasses, generatedExams, examBlueprints } from '@/data/teacherMockData';

const ExamCreation = () => {
  const [exams, setExams] = useState(generatedExams);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('syllabus');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);
  
  const [examForm, setExamForm] = useState({
    title: '',
    class: '',
    subject: 'Mathematics',
    duration: '',
    totalMarks: 0
  });

  const [questionPattern, setQuestionPattern] = useState({
    '1-mark': 0,
    '2-mark': 0,
    '5-mark': 0,
    '15-mark': 0
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    marks: 1,
    type: 'short'
  });

  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // TODO: Connect to backend API
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/teacher/exams');
        // const data = await response.json();
        // setExams(data);
        setExams(generatedExams);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExams();
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

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`
    });
  };

  const handleGenerateExam = async (source) => {
    if (!uploadedFile || !examForm.title || !examForm.class || calculateTotalQuestions() === 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields and set question pattern.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to generate exam from file
      // const formData = new FormData();
      // formData.append('file', uploadedFile);
      // formData.append('examData', JSON.stringify({...examForm, questionPattern}));
      // const response = await fetch('/api/teacher/exams/generate', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate exam generation
      const mockQuestions = [
        { id: 'q1', text: 'Define quadratic equation and give an example.', marks: 2, type: 'short' },
        { id: 'q2', text: 'Solve: x² + 5x + 6 = 0', marks: 5, type: 'solve' },
        { id: 'q3', text: 'Derive the quadratic formula from the general form ax² + bx + c = 0', marks: 15, type: 'long' }
      ];

      setGeneratedQuestions(mockQuestions);

      toast({
        title: "Exam generated successfully",
        description: "Review and edit questions before finalizing."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate exam. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddManualQuestion = () => {
    if (!newQuestion.text) {
      toast({
        title: "Error",
        description: "Please enter question text.",
        variant: "destructive"
      });
      return;
    }

    const question = {
      id: `manual-${Date.now()}`,
      ...newQuestion,
      manual: true
    };

    setGeneratedQuestions(prev => [...prev, question]);
    setNewQuestion({ text: '', marks: 1, type: 'short' });
    setAddQuestionOpen(false);

    toast({
      title: "Question added",
      description: "Manual question has been added to the exam."
    });
  };

  const handleSaveExam = async () => {
    if (generatedQuestions.length === 0) {
      toast({
        title: "Error",
        description: "Please generate or add questions first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to save exam
      // const examData = {
      //   ...examForm,
      //   questions: generatedQuestions,
      //   totalMarks: calculateTotalMarks()
      // };
      // const response = await fetch('/api/teacher/exams', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(examData)
      // });

      const newExam = {
        id: `exam-${Date.now()}`,
        ...examForm,
        questions: generatedQuestions,
        totalMarks: calculateTotalMarks(),
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0]
      };

      setExams(prev => [newExam, ...prev]);
      
      // Reset form
      setExamForm({ title: '', class: '', subject: 'Mathematics', duration: '', totalMarks: 0 });
      setQuestionPattern({ '1-mark': 0, '2-mark': 0, '5-mark': 0, '15-mark': 0 });
      setGeneratedQuestions([]);
      setUploadedFile(null);

      toast({
        title: "Exam saved",
        description: "Your exam has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save exam. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Creation</h1>
        <p className="text-muted-foreground">Generate exams from syllabus content or lesson notes with customizable question patterns.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="syllabus">Syllabus Based</TabsTrigger>
          <TabsTrigger value="notes">Notes Based</TabsTrigger>
        </TabsList>
        
        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Syllabus
                </CardTitle>
                <CardDescription>Upload syllabus PDF to generate questions automatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Title *</Label>
                    <Input
                      placeholder="e.g., Mid-term Mathematics Exam"
                      value={examForm.title}
                      onChange={e => setExamForm({...examForm, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Class *</Label>
                    <Select value={examForm.class} onValueChange={value => setExamForm({...examForm, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherClasses.map(cls => (
                          <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes) *</Label>
                  <Input
                    type="number"
                    placeholder="180"
                    value={examForm.duration}
                    onChange={e => setExamForm({...examForm, duration: e.target.value})}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Syllabus File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {uploadedFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{uploadedFile.name}</span>
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
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
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

            {/* Pattern Section */}
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
                  onClick={() => handleGenerateExam('syllabus')} 
                  className="w-full mt-6"
                  disabled={!uploadedFile || !examForm.title || calculateTotalQuestions() === 0 || loading}
                >
                  {loading ? 'Generating...' : 'Generate Questions'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          {/* Similar structure as syllabus tab but for notes */}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Exam Title *</Label>
                    <Input
                      placeholder="e.g., Mid-term Mathematics Exam"
                      value={examForm.title}
                      onChange={e => setExamForm({...examForm, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Class *</Label>
                    <Select value={examForm.class} onValueChange={value => setExamForm({...examForm, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose class" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherClasses.map(cls => (
                          <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes) *</Label>
                  <Input
                    type="number"
                    placeholder="180"
                    value={examForm.duration}
                    onChange={e => setExamForm({...examForm, duration: e.target.value})}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Lesson Notes File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {uploadedFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <span className="text-sm">{uploadedFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop lesson notes file here or click to browse</p>
                        <p className="text-xs text-gray-400">Supports PDF, DOC, TXT</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
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
                  onClick={() => handleGenerateExam('notes')} 
                  className="w-full mt-6"
                  disabled={!uploadedFile || !examForm.title || calculateTotalQuestions() === 0 || loading}
                >
                  {loading ? 'Generating...' : 'Generate from Notes'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Generated Questions Section */}
      {generatedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Questions</CardTitle>
                <CardDescription>Review and edit questions before finalizing</CardDescription>
              </div>
              <Dialog open={addQuestionOpen} onOpenChange={setAddQuestionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Manual Question</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Question Text *</Label>
                      <Textarea
                        placeholder="Enter your question here..."
                        value={newQuestion.text}
                        onChange={e => setNewQuestion({...newQuestion, text: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Marks</Label>
                        <Input
                          type="number"
                          min="1"
                          value={newQuestion.marks}
                          onChange={e => setNewQuestion({...newQuestion, marks: parseInt(e.target.value) || 1})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={newQuestion.type} onValueChange={value => setNewQuestion({...newQuestion, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short Answer</SelectItem>
                            <SelectItem value="long">Long Answer</SelectItem>
                            <SelectItem value="solve">Problem Solving</SelectItem>
                            <SelectItem value="mcq">Multiple Choice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleAddManualQuestion} className="w-full">
                      Add Question
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Q{index + 1}.</span>
                        <Badge variant="outline">{question.marks} marks</Badge>
                        <Badge variant={question.manual ? 'default' : 'secondary'}>
                          {question.manual ? 'Manual' : 'Generated'}
                        </Badge>
                      </div>
                      <p className="text-sm">{question.text}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSaveExam} disabled={loading}>
                {loading ? 'Saving...' : 'Save Exam'}
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Exams */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exams</CardTitle>
          <CardDescription>Your recently created exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Class {exam.class} • {exam.questions?.length || 0} questions • {exam.totalMarks} marks
                  </p>
                  <p className="text-xs text-muted-foreground">Created {exam.createdDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm">Publish</Button>
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
