
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { announcements as initialAnnouncements } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Megaphone, Plus, Calendar, Users } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    classes: [] as string[]
  });

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      date: new Date().toISOString(),
      priority: newAnnouncement.priority,
      classes: newAnnouncement.classes.length > 0 ? newAnnouncement.classes : ['All Classes']
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({
      title: '',
      message: '',
      priority: 'Medium',
      classes: []
    });
    setShowCreateForm(false);

    toast({
      title: "Announcement created",
      description: "Your announcement has been posted successfully."
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allClasses = ['10A', '10B', '10C'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
            <p className="text-muted-foreground">Share important updates with your students and classes.</p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Create Announcement
            </CardTitle>
            <CardDescription>Share important information with your classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={newAnnouncement.title}
                onChange={e => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Write your announcement message here..."
                rows={4}
                value={newAnnouncement.message}
                onChange={e => setNewAnnouncement(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select 
                  value={newAnnouncement.priority} 
                  onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                    setNewAnnouncement(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Classes</Label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                  {allClasses.map(cls => (
                    <Badge
                      key={cls}
                      variant={newAnnouncement.classes.includes(cls) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setNewAnnouncement(prev => ({
                          ...prev,
                          classes: prev.classes.includes(cls)
                            ? prev.classes.filter(c => c !== cls)
                            : [...prev.classes, cls]
                        }));
                      }}
                    >
                      {cls}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {newAnnouncement.classes.length === 0 ? 'Will be sent to all classes' : `Selected: ${newAnnouncement.classes.join(', ')}`}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateAnnouncement}>
                <Megaphone className="h-4 w-4 mr-2" />
                Post Announcement
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <Card key={announcement.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{announcement.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{announcement.classes.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No Announcements Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first announcement to share important updates with your classes.</p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Announcement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Announcements;
