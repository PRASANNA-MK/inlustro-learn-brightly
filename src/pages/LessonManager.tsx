
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  Book, 
  Plus, 
  Upload, 
  Clock, 
  Users, 
  FileText, 
  Video, 
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { teacherLessons, teacherClasses } from '@/data/teacherMockData';

const LessonManager = () => {
  const [lessons, setLessons] = useState(teacherLessons);
  const [loading, setLoading] = useState(false);
  const [newLessonOpen, setNewLessonOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    subject: 'Mathematics',
    duration: '',
    objectives: '',
    fileType: 'pdf'
  });

  // TODO: Connect to backend API
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/teacher/lessons');
        // const data = await response.json();
        // setLessons(data);
        setLessons(teacherLessons);
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLessons();
  }, []);

  const handleCreateLesson = async () => {
    if (!formData.title || !formData.class || !formData.duration) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to create lesson
      // const response = await fetch('/api/teacher/lessons', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      const newLesson = {
        id: `lesson-${Date.now()}`,
        ...formData,
        status: 'in-progress',
        uploadDate: new Date().toISOString().split('T')[0],
        objectives: formData.objectives.split(',').map(obj => obj.trim()),
        studentsCompleted: 0,
        totalStudents: teacherClasses.find(c => c.name === formData.class)?.totalStudents || 30
      };

      setLessons(prev => [newLesson, ...prev]);
      setNewLessonOpen(false);
      setFormData({
        title: '',
        description: '',
        class: '',
        subject: 'Mathematics',
        duration: '',
        objectives: '',
        fileType: 'pdf'
      });

      toast({
        title: "Lesson created",
        description: "Your lesson has been uploaded successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create lesson. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (lessonId: string) => {
    try {
      // TODO: API call to update lesson status
      // await fetch(`/api/teacher/lessons/${lessonId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: 'completed' })
      // });

      setLessons(prev => prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, status: 'completed' }
          : lesson
      ));

      toast({
        title: "Lesson marked complete",
        description: "Students can now access this lesson."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lesson status.",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'link':
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Manager</h1>
          <p className="text-muted-foreground">Upload and manage your lesson content</p>
        </div>
        
        <Dialog open={newLessonOpen} onOpenChange={setNewLessonOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Lesson</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lesson Title *</Label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter lesson title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
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
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the lesson"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration (minutes) *</Label>
                  <Input 
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="45"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select value={formData.fileType} onValueChange={(value) => setFormData({...formData, fileType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Learning Objectives</Label>
                <Textarea 
                  value={formData.objectives}
                  onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                  placeholder="Enter objectives separated by commas"
                  rows={2}
                />
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <Label>Upload Content</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-400">Supports PDF, DOC, PPT, MP4</p>
                  <Button variant="outline" className="mt-2">Choose File</Button>
                </div>
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

      {/* Lessons List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p>Loading lessons...</p>
          </div>
        ) : lessons.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Book className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No Lessons Yet</h3>
              <p className="text-muted-foreground mb-4">Start by uploading your first lesson</p>
              <Button onClick={() => setNewLessonOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Lesson
              </Button>
            </CardContent>
          </Card>
        ) : (
          lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-blue-600" />
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
                      <span className="flex items-center gap-1">
                        {getFileIcon(lesson.fileType)}
                        {lesson.fileType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={lesson.status === 'completed' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(lesson.status)}
                      {lesson.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {lesson.objectives && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Learning Objectives</h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.objectives.map((objective, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {objective}
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
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {lesson.status !== 'completed' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleMarkComplete(lesson.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonManager;
