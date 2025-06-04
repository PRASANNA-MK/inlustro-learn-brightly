import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { lessons, currentUser } from '@/data/mockData';
import { Book, Plus, Clock, Users, FileText, Video, Link as LinkIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LessonManager = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newLessonOpen, setNewLessonOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonsData, setLessonsData] = useState(lessons);
  const [lessonData, setLessonData] = useState({
    title: '',
    class: '',
    description: '',
    duration: '',
    content: '',
  });

  // TODO: Connect to backend - Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/lessons', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch lessons');
        // const data = await response.json();
        // setLessonsData(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setLessonsData(lessons);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // TODO: Connect to backend - Create new lesson
  const handleCreateLesson = async () => {
    if (!lessonData.title || !lessonData.class || !lessonData.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/lessons', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(lessonData)
      // });
      // if (!response.ok) throw new Error('Failed to create lesson');
      // const newLesson = await response.json();
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Lesson created",
        description: "Your new lesson has been created successfully.",
      });
      
      setNewLessonOpen(false);
      setLessonData({ title: '', class: '', description: '', duration: '', content: '' });
      
      // Refresh lessons list
      // TODO: Refetch lessons or add new lesson to state
    } catch (err) {
      console.error('Error creating lesson:', err);
      setError(err instanceof Error ? err.message : 'Failed to create lesson');
      toast({
        title: "Error",
        description: "Failed to create lesson. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: Connect to backend - Mark lesson as complete
  const handleMarkComplete = async (lessonId: string) => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/lessons/${lessonId}/complete`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // if (!response.ok) throw new Error('Failed to update lesson status');
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Lesson marked as complete",
        description: "Students can now view this lesson.",
      });
    } catch (err) {
      console.error('Error marking lesson complete:', err);
      toast({
        title: "Error",
        description: "Failed to update lesson status.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Lesson Manager</h1>
          <Dialog open={newLessonOpen} onOpenChange={setNewLessonOpen}>
            <DialogTrigger asChild>
              <Button className="bg-inlustro-purple hover:bg-inlustro-purple/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Lesson</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Lesson Title</label>
                    <Input 
                      value={lessonData.title}
                      onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                      placeholder="Enter lesson title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Class</label>
                    <Select value={lessonData.class} onValueChange={(value) => setLessonData({...lessonData, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentUser.classes.map(className => (
                          <SelectItem key={className} value={className}>{className}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={lessonData.description}
                    onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                    placeholder="Brief description of the lesson"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input 
                    type="number"
                    value={lessonData.duration}
                    onChange={(e) => setLessonData({...lessonData, duration: e.target.value})}
                    placeholder="45"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Lesson Content</label>
                  <Textarea 
                    className="min-h-[100px]"
                    value={lessonData.content}
                    onChange={(e) => setLessonData({...lessonData, content: e.target.value})}
                    placeholder="Enter detailed lesson content..."
                  />
                </div>
                
                <Button 
                  onClick={handleCreateLesson} 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Lesson'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Create, manage, and track your lesson plans</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Lessons</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading lessons...</div>
          ) : (
            <div className="grid gap-4">
              {lessonsData.map((lesson) => (
                <Card key={lesson.id} className="rounded-xl shadow-sm hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          <Book className="h-5 w-5 text-inlustro-purple" />
                          {lesson.title}
                        </CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {lesson.duration} mins
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Class {lesson.class}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusClass(lesson.status)}>
                          {getStatusIcon(lesson.status)}
                          <span className="ml-1">{lesson.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {lesson.resources && lesson.resources.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Resources</h4>
                          <div className="flex flex-wrap gap-2">
                            {lesson.resources.map((resource, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                {resource.type === 'document' && <FileText className="h-3 w-3" />}
                                {resource.type === 'video' && <Video className="h-3 w-3" />}
                                {resource.type === 'link' && <LinkIcon className="h-3 w-3" />}
                                {resource.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Progress: {lesson.studentsCompleted}/{lesson.totalStudents} students completed
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {lesson.status !== 'Completed' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleMarkComplete(lesson.id)}
                              disabled={loading}
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        
        <TabsContent value="completed">
          <div className="grid gap-4">
            {lessonsData.filter(lesson => lesson.status === 'Completed').map((lesson) => (
              <Card key={lesson.id} className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Completed on: {lesson.completedDate ? new Date(lesson.completedDate).toLocaleDateString() : 'N/A'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="grid gap-4">
            {lessonsData.filter(lesson => lesson.status === 'In Progress').map((lesson) => (
              <Card key={lesson.id} className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Clock className="h-5 w-5" />
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {lesson.studentsCompleted}/{lesson.totalStudents} students completed
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="grid gap-4">
            {lessonsData.filter(lesson => lesson.status === 'Pending').map((lesson) => (
              <Card key={lesson.id} className="rounded-xl shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <AlertCircle className="h-5 w-5" />
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Scheduled: {lesson.scheduledDate ? new Date(lesson.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonManager;
