
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X, Trophy } from 'lucide-react';
import { subjects, quizzes as allQuizzes, Quiz, Question } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(allQuizzes);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(-1));
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (activeQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    
    let correctAnswers = 0;
    activeQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / activeQuiz.questions.length) * 100);
    setScore(calculatedScore);
    
    const updatedQuizzes = quizzes.map(q => 
      q.id === activeQuiz.id 
        ? { ...q, completed: true, score: calculatedScore }
        : q
    );
    
    setQuizzes(updatedQuizzes);
    setShowResults(true);
    
    toast({
      title: "Quiz completed!",
      description: `You scored ${calculatedScore}% on this quiz.`,
    });
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getSubjectName = (id: string) => {
    const subject = subjects.find(subject => subject.id === id);
    return subject ? subject.name : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with interactive quizzes.</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium text-inlustro-blue">
                {getSubjectName(quiz.subjectId)}
              </CardDescription>
              <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{quiz.totalQuestions} questions</Badge>
                {quiz.completed ? (
                  <Badge className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100">
                    Not taken
                  </Badge>
                )}
              </div>
              {quiz.completed && quiz.score !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Score</span>
                    <span className="font-medium">{quiz.score}%</span>
                  </div>
                  <Progress value={quiz.score} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant={quiz.completed ? "outline" : "default"}
                className="w-full"
                onClick={() => startQuiz(quiz)}
              >
                {quiz.completed ? "Retake Quiz" : "Start Quiz"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!activeQuiz} onOpenChange={open => !open && resetQuiz()}>
        {activeQuiz && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{activeQuiz.title}</DialogTitle>
              <DialogDescription>
                {getSubjectName(activeQuiz.subjectId)} - {activeQuiz.questions.length} questions
              </DialogDescription>
            </DialogHeader>

            {showResults ? (
              <div className="space-y-6 py-4">
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="rounded-full bg-inlustro-yellow-light p-3">
                    <Trophy className="h-8 w-8 text-inlustro-yellow-dark" />
                  </div>
                  <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                  <p>You scored:</p>
                  <div className="text-4xl font-bold">{score}%</div>
                  <Progress value={score} className="h-2 w-full max-w-md" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Review your answers:</h4>
                  {activeQuiz.questions.map((question, idx) => (
                    <div key={idx} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <p className="font-medium">{idx + 1}. {question.text}</p>
                        {selectedAnswers[idx] === question.correctAnswer ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Your answer: <span className="font-medium">{question.options[selectedAnswers[idx]]}</span>
                        </p>
                        {selectedAnswers[idx] !== question.correctAnswer && (
                          <p className="text-sm text-green-600">
                            Correct answer: <span className="font-medium">{question.options[question.correctAnswer]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                  </span>
                  <Progress 
                    value={((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100} 
                    className="h-2 w-40" 
                  />
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">
                    {activeQuiz.questions[currentQuestionIndex].text}
                  </h3>
                  <RadioGroup 
                    value={selectedAnswers[currentQuestionIndex]?.toString()} 
                    onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                    className="space-y-3"
                  >
                    {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                        <Label htmlFor={`option-${idx}`} className="flex-grow cursor-pointer rounded-md p-2 hover:bg-muted">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              {!showResults ? (
                <>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                      <Button 
                        onClick={nextQuestion}
                        disabled={selectedAnswers[currentQuestionIndex] === -1}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmitQuiz}
                        disabled={selectedAnswers.includes(-1)}
                      >
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                  <Button variant="ghost" onClick={resetQuiz}>Cancel</Button>
                </>
              ) : (
                <Button onClick={resetQuiz} className="w-full sm:w-auto">
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Quizzes;
