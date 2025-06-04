
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Edit } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  marks: number;
  type: 'mcq' | 'short' | 'long';
  explanation?: string;
}

interface ExamPreviewProps {
  examTitle: string;
  className: string;
  duration: string;
  questions: Question[];
  totalMarks: number;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onBack: () => void;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({
  examTitle,
  className,
  duration,
  questions,
  totalMarks,
  onDownload,
  onShare,
  onEdit,
  onBack
}) => {
  const groupedQuestions = questions.reduce((acc, question) => {
    const key = `${question.marks}-mark`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Creation
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Questions
          </Button>
          <Button variant="outline" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share to Class
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl">{examTitle}</CardTitle>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>Class: {className}</span>
            <span>Duration: {duration} minutes</span>
            <span>Total Marks: {totalMarks}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {Object.entries(groupedQuestions).map(([markType, questionList]) => (
              <div key={markType} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {markType} questions ({questionList.length} questions)
                  </Badge>
                </div>
                <div className="space-y-3">
                  {questionList.map((question, index) => (
                    <div key={question.id} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-sm">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <p className="text-sm">{question.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {question.marks} marks
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.type}
                            </Badge>
                          </div>
                          {question.explanation && (
                            <p className="text-xs text-muted-foreground mt-1">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamPreview;
