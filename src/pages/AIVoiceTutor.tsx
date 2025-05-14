
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for lesson content
const lessonData = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations.',
    transcript: 'Welcome to the introduction to algebra. Algebra is a branch of mathematics that uses symbols and letters to represent numbers, quantities, and operations in formulas and equations. In this lesson, we\'ll explore the basic concepts of algebraic expressions and how to manipulate them. We\'ll start with understanding variables, constants, and coefficients...',
    audioLength: 180, // seconds
    subject: 'Math'
  },
  {
    id: '2',
    title: 'Photosynthesis Explained',
    description: 'Discover how plants convert sunlight into energy.',
    transcript: 'In this lesson, we\'ll explore photosynthesis, the process by which plants convert sunlight into chemical energy. Plants are unique organisms that can create their own food using light energy from the sun, carbon dioxide from the air, and water from the soil. Through a series of complex chemical reactions, these simple ingredients are transformed into glucose and oxygen...',
    audioLength: 210, // seconds
    subject: 'Science'
  },
  {
    id: '3',
    title: 'Understanding Shakespeare',
    description: 'Explore the themes and language in Shakespeare\'s works.',
    transcript: 'William Shakespeare is considered one of the greatest writers in the English language. His plays and sonnets continue to be studied and performed centuries after his death. In this lesson, we\'ll examine some of the common themes in Shakespeare\'s works, including love, power, ambition, and fate. We\'ll also look at the unique language and poetic devices Shakespeare employed...',
    audioLength: 195, // seconds
    subject: 'English'
  }
];

const AIVoiceTutor = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentLesson = lessonData[currentLessonIndex];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would trigger TTS playback
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessonData.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  // For demo purposes, simulate progress when playing
  React.useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, currentLesson.audioLength * 10); // Speed up for demo
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentLesson]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Voice Tutor</h1>
        <p className="text-muted-foreground">Learn through interactive voice lessons</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentLesson.title}</CardTitle>
              <CardDescription>
                {currentLesson.subject} • {Math.floor(currentLesson.audioLength / 60)}:{(currentLesson.audioLength % 60).toString().padStart(2, '0')} minutes
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentLessonIndex === 0}>
                <SkipBack className="h-4 w-4" />
                <span className="sr-only">Previous lesson</span>
              </Button>
              <Button variant="outline" size="icon" onClick={togglePlayback}>
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'} lesson</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext} disabled={currentLessonIndex === lessonData.length - 1}>
                <SkipForward className="h-4 w-4" />
                <span className="sr-only">Next lesson</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Progress</div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Description</div>
            <p>{currentLesson.description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Transcript</div>
            <div className="max-h-[300px] overflow-y-auto rounded-md border p-4 bg-muted/50">
              <p className="text-sm">{currentLesson.transcript}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={handleNext} disabled={currentLessonIndex === lessonData.length - 1} className="ml-auto">
            Next Lesson
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Lessons</CardTitle>
          <CardDescription>Browse other voice lessons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lessonData.map((lesson, index) => (
              <Card 
                key={lesson.id}
                className={`cursor-pointer ${currentLessonIndex === index ? 'border-inlustro-blue' : ''}`}
                onClick={() => {
                  setCurrentLessonIndex(index);
                  setProgress(0);
                  setIsPlaying(false);
                }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{lesson.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIVoiceTutor;
