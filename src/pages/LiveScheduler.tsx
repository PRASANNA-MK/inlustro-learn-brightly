
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, Video, Users, Link as LinkIcon, Plus } from 'lucide-react';

const LiveScheduler = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [duration, setDuration] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const classes = ['10A', '10B', '10C'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Quadratic Equations',
      class: '10A',
      subject: 'Mathematics',
      date: '2024-06-05',
      time: '10:00',
      duration: 60,
      students: 28,
      link: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: 2,
      title: 'Chemical Bonding',
      class: '10B',
      subject: 'Chemistry',
      date: '2024-06-06',
      time: '14:00',
      duration: 45,
      students: 25,
      link: 'https://zoom.us/j/123456789'
    }
  ];

  const handleScheduleSession = () => {
    if (!selectedClass || !selectedSubject || !sessionTitle || !sessionDate || !sessionTime || !duration) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Session scheduled",
      description: `Live class "${sessionTitle}" has been scheduled for ${selectedClass}.`
    });

    // Reset form
    setSelectedClass('');
    setSelectedSubject('');
    setSessionTitle('');
    setSessionDate('');
    setSessionTime('');
    setDuration('');
    setMeetingLink('');
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Meeting link has been copied to clipboard."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Live Class Scheduler</h1>
        <p className="text-muted-foreground">Schedule and manage live classes for your students.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Schedule New Session
            </CardTitle>
            <CardDescription>Create a new live class session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class-select">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-select">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-title">Session Title</Label>
              <Input
                id="session-title"
                placeholder="e.g., Introduction to Algebra"
                value={sessionTitle}
                onChange={e => setSessionTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-date">Date</Label>
                <Input
                  id="session-date"
                  type="date"
                  value={sessionDate}
                  onChange={e => setSessionDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-time">Time</Label>
                <Input
                  id="session-time"
                  type="time"
                  value={sessionTime}
                  onChange={e => setSessionTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g., 60"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-link">Meeting Link (Optional)</Label>
              <Input
                id="meeting-link"
                placeholder="https://meet.google.com/your-link"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
              />
            </div>

            <Button onClick={handleScheduleSession} className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your live sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Video className="h-4 w-4 mr-2" />
              Start Instant Session
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Attendance Reports
            </Button>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Today's Sessions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div>
                    <p className="text-sm font-medium">Quadratic Equations</p>
                    <p className="text-xs text-muted-foreground">10A • 10:00 AM</p>
                  </div>
                  <Badge>Upcoming</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled live classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{session.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {session.class} • {session.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time} • {session.duration}min
                    </span>
                  </div>
                  <Badge variant="outline">{session.subject}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyMeetingLink(session.link)}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                  <Button size="sm">
                    <Video className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveScheduler;
