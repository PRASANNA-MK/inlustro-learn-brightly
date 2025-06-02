
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Math Quiz - Class 10A',
      date: '2024-06-03',
      time: '10:00 AM',
      type: 'quiz',
      class: '10A'
    },
    {
      id: 2,
      title: 'Homework Submission Deadline',
      date: '2024-06-04',
      time: '11:59 PM',
      type: 'deadline',
      class: '10A, 10B'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-06-05',
      time: '2:00 PM',
      type: 'meeting',
      class: 'All Classes'
    },
    {
      id: 4,
      title: 'Mid-term Exam Preparation',
      date: '2024-06-10',
      time: '9:00 AM',
      type: 'exam',
      class: '10A, 10B, 10C'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      case 'exam':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate > today;
  }).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage your class schedule and important dates.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today's Events
            </CardTitle>
            <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map(event => (
                  <div key={event.id} className="p-3 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{event.class}</p>
                      </div>
                      <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">No events scheduled for today.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled events for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition-shadow">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.class}</p>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No upcoming events scheduled.</p>
                <p className="text-sm">Add your first event to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Overview of your schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{events.filter(e => e.type === 'quiz').length}</div>
              <div className="text-sm text-muted-foreground">Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{events.filter(e => e.type === 'deadline').length}</div>
              <div className="text-sm text-muted-foreground">Deadlines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{events.filter(e => e.type === 'meeting').length}</div>
              <div className="text-sm text-muted-foreground">Meetings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{events.filter(e => e.type === 'exam').length}</div>
              <div className="text-sm text-muted-foreground">Exams</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
