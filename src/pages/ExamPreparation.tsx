
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { FileText, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const subjects = [
  { id: 'math', name: 'Mathematics' },
  { id: 'science', name: 'Science' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
];

const ExamPreparation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [examTitle, setExamTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('60');
  const [difficultyDistribution, setDifficultyDistribution] = useState({
    easy: 30,
    medium: 40,
    hard: 30,
  });
  
  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is the formula for calculating the area of a circle?', difficulty: 'easy' },
    { id: 2, text: 'Solve for x: 3x + 7 = 22', difficulty: 'easy' },
    { id: 3, text: 'If a car travels at 60 mph, how long will it take to travel 150 miles?', difficulty: 'medium' },
    { id: 4, text: 'Find the derivative of f(x) = x³ + 4x² - 2x + 7', difficulty: 'medium' },
    { id: 5, text: 'Prove that the sequence defined by a₁ = 1, aₙ₊₁ = aₙ/2 + 1/aₙ converges to √2.', difficulty: 'hard' }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionDifficulty, setNewQuestionDifficulty] = useState('medium');
  
  const addQuestion = () => {
    if (newQuestion.trim() === '') {
      toast({
        title: "Error",
        description: "Question text cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    setQuestions([
      ...questions,
      { id: newId, text: newQuestion, difficulty: newQuestionDifficulty }
    ]);
    
    setNewQuestion('');
    setNewQuestionDifficulty('medium');
    
    toast({
      title: "Question Added",
      description: "Your question has been added to the exam.",
    });
  };
  
  const handleDifficultyChange = (type: 'easy' | 'medium' | 'hard', value: number[]) => {
    const newValue = value[0];
    
    // Calculate adjustments for other difficulties to ensure total is 100%
    const others = ['easy', 'medium', 'hard'].filter(d => d !== type) as ('easy' | 'medium' | 'hard')[];
    const currentTotal = difficultyDistribution.easy + difficultyDistribution.medium + difficultyDistribution.hard;
    const currentTypeValue = difficultyDistribution[type];
    const diff = newValue - currentTypeValue;
    
    // Distribute the difference proportionally among other difficulties
    const newDistribution = {...difficultyDistribution, [type]: newValue};
    
    if (diff !== 0) {
      const otherTotal = currentTotal - currentTypeValue;
      if (otherTotal > 0) {
        others.forEach(other => {
          const proportion = difficultyDistribution[other] / otherTotal;
          const adjustment = Math.round(diff * proportion * -1);
          newDistribution[other] = Math.max(0, Math.min(100, difficultyDistribution[other] + adjustment));
        });
      } else {
        // If other values were zero, distribute equally
        others.forEach(other => {
          newDistribution[other] = Math.max(0, Math.min(100, (100 - newValue) / others.length));
        });
      }
    }
    
    // Ensure total is exactly 100%
    const newTotal = newDistribution.easy + newDistribution.medium + newDistribution.hard;
    if (newTotal !== 100) {
      const lastAdjustment = 100 - newTotal;
      // Add the remainder to the last difficulty that's not the one being changed
      newDistribution[others[others.length - 1]] += lastAdjustment;
    }
    
    setDifficultyDistribution(newDistribution);
  };
  
  const handleCreateExam = () => {
    if (!examTitle || !subject || !grade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (questions.length < 3) {
      toast({
        title: "Not Enough Questions",
        description: "Please add at least 3 questions to create an exam.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Exam Created",
      description: "Your exam has been created successfully.",
    });
    
    setActiveTab('preview');
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Exam",
      description: "Your exam is being prepared for download.",
    });
    
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your exam has been downloaded successfully.",
      });
    }, 1500);
  };
  
  const handleShare = () => {
    toast({
      title: "Exam Shared",
      description: "Your exam has been shared with students.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Preparation</h1>
        <p className="text-muted-foreground">Create, preview, and share exam papers.</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>Enter the basic information about your exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">Exam Title</Label>
                  <Input 
                    id="exam-title" 
                    value={examTitle} 
                    onChange={(e) => setExamTitle(e.target.value)} 
                    placeholder="e.g., Mid-Term Mathematics Exam" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum) => (
                        <SelectItem key={gradeNum} value={gradeNum.toString()}>
                          Grade {gradeNum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                    type="number" 
                    min="15" 
                    max="180" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Difficulty Distribution</CardTitle>
              <CardDescription>Set the percentage of questions at each difficulty level.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Easy</Label>
                    <span className="text-sm text-muted-foreground">{difficultyDistribution.easy}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.easy]}
                    onValueChange={(value) => handleDifficultyChange('easy', value)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Medium</Label>
                    <span className="text-sm text-muted-foreground">{difficultyDistribution.medium}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.medium]}
                    onValueChange={(value) => handleDifficultyChange('medium', value)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Hard</Label>
                    <span className="text-sm text-muted-foreground">{difficultyDistribution.hard}%</span>
                  </div>
                  <Slider
                    value={[difficultyDistribution.hard]}
                    onValueChange={(value) => handleDifficultyChange('hard', value)}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Add questions to your exam.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {questions.map((question) => (
                  <div 
                    key={question.id} 
                    className="p-4 border rounded-md flex flex-col space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Question {question.id}</span>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          question.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800' 
                            : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm">{question.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="new-question">Add New Question</Label>
                  <Textarea
                    id="new-question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter your question here..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select 
                      value={newQuestionDifficulty} 
                      onValueChange={setNewQuestionDifficulty}
                    >
                      <SelectTrigger id="difficulty" className="w-[180px]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={addQuestion}>Add Question</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateExam} className="ml-auto">Create Exam</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-6">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Exam Preview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Preview how your exam will appear to students.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 space-y-6 bg-white">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    {examTitle || "Exam Title"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {subjects.find(s => s.id === subject)?.name || "Subject"} - Grade {grade || "X"}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration: {duration || "60"} minutes</p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium border-b pb-2">Instructions</h3>
                  <p className="text-sm">
                    Answer all questions. Show your work where applicable. 
                    Each question is marked with its difficulty level.
                  </p>
                </div>
                
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        <span 
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            question.difficulty === 'easy' 
                              ? 'bg-green-100 text-green-800' 
                              : question.difficulty === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm">{question.text}</p>
                      <div className="h-8 border-b border-dotted" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Exam</CardTitle>
              <CardDescription>Share your exam with students or classes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Exam Link</Label>
                <div className="flex">
                  <Input value="https://inlustro.edu/exams/math-midterm-2025" readOnly />
                  <Button className="ml-2">Copy</Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label>Share with Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class-10a">Class 10A</SelectItem>
                    <SelectItem value="class-10b">Class 10B</SelectItem>
                    <SelectItem value="class-10c">Class 10C</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="mt-2">Share with Class</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamPreparation;
