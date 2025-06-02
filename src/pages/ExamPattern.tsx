
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { examPatterns } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Save } from 'lucide-react';

const ExamPattern = () => {
  const [patterns, setPatterns] = useState(examPatterns);
  const [newPattern, setNewPattern] = useState({
    name: '',
    questions: {
      '1-mark': 0,
      '2-mark': 0,
      '5-mark': 0,
      '7-mark': 0,
      '15-mark': 0,
    }
  });

  const calculateTotals = (questions: typeof newPattern.questions) => {
    const totalQuestions = Object.values(questions).reduce((sum, count) => sum + count, 0);
    const totalMarks = Object.entries(questions).reduce((sum, [mark, count]) => {
      const markValue = parseInt(mark.split('-')[0]);
      return sum + (markValue * count);
    }, 0);
    return { totalQuestions, totalMarks };
  };

  const handleSavePattern = () => {
    if (!newPattern.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a pattern name.",
        variant: "destructive"
      });
      return;
    }

    const { totalQuestions, totalMarks } = calculateTotals(newPattern.questions);
    
    if (totalQuestions === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question to the pattern.",
        variant: "destructive"
      });
      return;
    }

    const pattern = {
      id: `pattern-${Date.now()}`,
      name: newPattern.name,
      questions: newPattern.questions,
      totalMarks,
      totalQuestions,
      duration: 180
    };

    setPatterns(prev => [...prev, pattern]);
    setNewPattern({
      name: '',
      questions: {
        '1-mark': 0,
        '2-mark': 0,
        '5-mark': 0,
        '7-mark': 0,
        '15-mark': 0,
      }
    });

    toast({
      title: "Pattern saved",
      description: "Exam pattern has been successfully created."
    });
  };

  const handleDeletePattern = (id: string) => {
    setPatterns(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Pattern deleted",
      description: "Exam pattern has been removed."
    });
  };

  const { totalQuestions: newTotalQuestions, totalMarks: newTotalMarks } = calculateTotals(newPattern.questions);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Exam Pattern</h1>
        <p className="text-muted-foreground">Create and manage exam question patterns for different subjects.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Pattern
            </CardTitle>
            <CardDescription>Define the structure for your exam questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pattern-name">Pattern Name</Label>
              <Input
                id="pattern-name"
                placeholder="e.g., Standard Mathematics Pattern"
                value={newPattern.name}
                onChange={e => setNewPattern(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Question Distribution</Label>
              {Object.entries(newPattern.questions).map(([mark, count]) => (
                <div key={mark} className="flex items-center gap-3">
                  <Label className="w-24 text-sm">{mark} questions</Label>
                  <Input
                    type="number"
                    min="0"
                    className="w-20"
                    value={count}
                    onChange={e => setNewPattern(prev => ({
                      ...prev,
                      questions: {
                        ...prev.questions,
                        [mark]: parseInt(e.target.value) || 0
                      }
                    }))}
                  />
                </div>
              ))}
            </div>

            {(newTotalQuestions > 0 || newTotalMarks > 0) && (
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Questions:</span>
                  <Badge variant="outline">{newTotalQuestions}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Marks:</span>
                  <Badge variant="outline">{newTotalMarks}</Badge>
                </div>
              </div>
            )}

            <Button onClick={handleSavePattern} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Pattern
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Patterns</CardTitle>
            <CardDescription>Your existing exam patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {patterns.length > 0 ? (
              <div className="space-y-4">
                {patterns.map(pattern => (
                  <div key={pattern.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{pattern.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">{pattern.totalQuestions} questions</Badge>
                          <Badge variant="secondary">{pattern.totalMarks} marks</Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePattern(pattern.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {Object.entries(pattern.questions).map(([mark, count]) => (
                        count > 0 && (
                          <div key={mark} className="flex justify-between">
                            <span>{mark} questions:</span>
                            <span>{count}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No patterns created yet.</p>
                <p className="text-sm">Create your first exam pattern to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamPattern;
