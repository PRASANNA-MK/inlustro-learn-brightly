
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Megaphone, 
  Plus, 
  Calendar, 
  Users, 
  Eye,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';
import { announcements as initialAnnouncements, teacherClasses } from '@/data/teacherMockData';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [loading, setLoading] = useState(false);
  const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);
  
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    class: '',
    attachmentFile: null
  });

  // TODO: Connect to backend API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/teacher/announcements');
        // const data = await response.json();
        // setAnnouncements(data);
        setAnnouncements(initialAnnouncements);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async () => {
    if (!announcementForm.title.trim() || !announcementForm.message.trim() || !announcementForm.class) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to create announcement
      // const formData = new FormData();
      // formData.append('title', announcementForm.title);
      // formData.append('message', announcementForm.message);
      // formData.append('class', announcementForm.class);
      // if (announcementForm.attachmentFile) {
      //   formData.append('attachment', announcementForm.attachmentFile);
      // }
      // const response = await fetch('/api/teacher/announcements', {
      //   method: 'POST',
      //   body: formData
      // });

      const classData = teacherClasses.find(c => c.name === announcementForm.class);
      const newAnnouncement = {
        id: `ann-${Date.now()}`,
        title: announcementForm.title,
        message: announcementForm.message,
        class: announcementForm.class,
        date: new Date().toISOString().split('T')[0],
        viewedBy: 0,
        totalStudents: classData?.totalStudents || 30
      };

      setAnnouncements(prev => [newAnnouncement, ...prev]);
      setAnnouncementForm({
        title: '',
        message: '',
        class: '',
        attachmentFile: null
      });
      setNewAnnouncementOpen(false);

      toast({
        title: "Announcement posted",
        description: "Your announcement has been shared with the class."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post announcement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      // TODO: API call to delete announcement
      // await fetch(`/api/teacher/announcements/${announcementId}`, {
      //   method: 'DELETE'
      // });

      setAnnouncements(prev => prev.filter(ann => ann.id !== announcementId));
      
      toast({
        title: "Announcement deleted",
        description: "The announcement has been removed."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (file) => {
    setAnnouncementForm({...announcementForm, attachmentFile: file});
    toast({
      title: "File attached",
      description: `${file.name} has been attached to the announcement.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Share important updates and notices with your students</p>
        </div>
        
        <Dialog open={newAnnouncementOpen} onOpenChange={setNewAnnouncementOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={announcementForm.title}
                    onChange={e => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select 
                    value={announcementForm.class} 
                    onValueChange={value => setAnnouncementForm({...announcementForm, class: value})}
                  >
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
                <Label>Message *</Label>
                <Textarea
                  value={announcementForm.message}
                  onChange={e => setAnnouncementForm({...announcementForm, message: e.target.value})}
                  placeholder="Write your announcement message here..."
                  rows={4}
                />
              </div>

              {/* File Attachment */}
              <div className="space-y-2">
                <Label>Attachment (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {announcementForm.attachmentFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{announcementForm.attachmentFile.name}</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Drop file here or click to browse</p>
                      <p className="text-xs text-gray-400">Supports PDF, images, documents</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    id="attachment-upload"
                  />
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('attachment-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleCreateAnnouncement} 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Announcement'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-blue-500" />
              Total Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-sm text-muted-foreground">Posted this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(announcements.reduce((acc, ann) => acc + (ann.viewedBy / ann.totalStudents * 100), 0) / announcements.length) || 0}%
            </div>
            <p className="text-sm text-muted-foreground">Student engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {announcements.filter(ann => {
                const announcementDate = new Date(ann.date);
                const threeDaysAgo = new Date();
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                return announcementDate >= threeDaysAgo;
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Posted this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="text-center py-12">
              <p>Loading announcements...</p>
            </CardContent>
          </Card>
        ) : announcements.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No Announcements Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first announcement to share updates with your students.</p>
              <Button onClick={() => setNewAnnouncementOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Announcement
              </Button>
            </CardContent>
          </Card>
        ) : (
          announcements.map(announcement => (
            <Card key={announcement.id} className="hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-blue-600" />
                      {announcement.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Class {announcement.class}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {announcement.viewedBy}/{announcement.totalStudents} viewed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{announcement.message}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Engagement: {Math.round((announcement.viewedBy / announcement.totalStudents) * 100)}%
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
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

export default Announcements;
