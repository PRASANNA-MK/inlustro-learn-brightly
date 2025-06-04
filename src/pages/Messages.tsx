
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Send, MessageSquare, Bell, Users, Calendar } from 'lucide-react';

const Messages = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [priority, setPriority] = useState('');

  const classes = ['10A', '10B', '10C', 'All Classes'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const recentMessages = [
    {
      id: 1,
      title: 'Homework Reminder',
      content: 'Please complete Chapter 5 exercises by tomorrow.',
      classes: ['10A'],
      priority: 'Medium',
      date: '2024-06-03',
      status: 'sent'
    },
    {
      id: 2,
      title: 'Test Postponed',
      content: 'The mathematics test scheduled for Friday has been postponed to next Monday.',
      classes: ['10A', '10B'],
      priority: 'High',
      date: '2024-06-02',
      status: 'sent'
    }
  ];

  const studentMessages = [
    {
      id: 1,
      student: 'Emma Davis',
      class: '10A',
      message: 'Could you please explain the quadratic formula once more?',
      date: '2024-06-03T14:30:00Z',
      status: 'unread'
    },
    {
      id: 2,
      student: 'Alex Thompson',
      class: '10A',
      message: 'I submitted my assignment but it\'s not showing as received.',
      date: '2024-06-03T12:15:00Z',
      status: 'read'
    }
  ];

  const handleSendMessage = () => {
    if (!selectedClass || !messageTitle || !messageContent) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedClass}.`
    });

    // Reset form
    setSelectedClass('');
    setMessageTitle('');
    setMessageContent('');
    setPriority('');
  };

  const handleReplyToStudent = (studentName: string) => {
    toast({
      title: "Reply sent",
      description: `Your reply has been sent to ${studentName}.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Messages & Notices</h1>
        <p className="text-muted-foreground">Communicate with your students and manage class announcements.</p>
      </div>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Notice</TabsTrigger>
          <TabsTrigger value="inbox">Student Messages</TabsTrigger>
          <TabsTrigger value="sent">Sent Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Compose Notice
                </CardTitle>
                <CardDescription>Send announcements to your classes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="class-select">Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message-title">Subject</Label>
                  <Input
                    id="message-title"
                    placeholder="e.g., Important Announcement"
                    value={messageTitle}
                    onChange={e => setMessageTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message-content">Message</Label>
                  <Textarea
                    id="message-content"
                    placeholder="Type your message here..."
                    rows={6}
                    value={messageContent}
                    onChange={e => setMessageContent(e.target.value)}
                  />
                </div>

                <Button onClick={handleSendMessage} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notice
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Quick Templates
                </CardTitle>
                <CardDescription>Use pre-made message templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMessageTitle('Homework Reminder');
                    setMessageContent('Please remember to complete your assigned homework and submit it by the due date.');
                  }}
                >
                  Homework Reminder
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMessageTitle('Test Announcement');
                    setMessageContent('A test is scheduled for [Date]. Please prepare the following topics: [Topics]');
                  }}
                >
                  Test Announcement
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMessageTitle('Class Schedule Change');
                    setMessageContent('There has been a change in the class schedule. Please check the updated timetable.');
                  }}
                >
                  Schedule Change
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setMessageTitle('Holiday Notice');
                    setMessageContent('Please note that classes will be suspended on [Date] due to [Reason]. Classes will resume on [Date].');
                  }}
                >
                  Holiday Notice
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inbox" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Student Messages
              </CardTitle>
              <CardDescription>Messages received from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentMessages.map(msg => (
                  <div key={msg.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{msg.student}</h4>
                        <p className="text-sm text-muted-foreground">{msg.class}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {msg.status === 'unread' && (
                          <Badge variant="destructive">New</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{msg.message}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleReplyToStudent(msg.student)}
                      >
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">Mark as Read</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Sent Messages
              </CardTitle>
              <CardDescription>Your message history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map(msg => (
                  <div key={msg.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{msg.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {msg.classes.map(cls => (
                            <Badge key={cls} variant="outline">{cls}</Badge>
                          ))}
                          <Badge variant={
                            msg.priority === 'High' ? 'destructive' : 
                            msg.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {msg.priority}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
