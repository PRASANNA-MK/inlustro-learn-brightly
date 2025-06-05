
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';

interface TimetableEntry {
  id: string;
  subject: string;
  className: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  period: number;
}

interface TeacherTimetable {
  teacherId: string;
  teacherName: string;
  schedule: TimetableEntry[];
  academicYear: string;
  semester: string;
}

const TeacherTimetable = () => {
  const [timetable, setTimetable] = useState<TeacherTimetable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  // TODO: Connect to backend - Fetch teacher timetable
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const teacherId = getCurrentUserId(); // Get from auth context
        // const response = await fetch(`/api/teachers/${teacherId}/timetable`, {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch timetable');
        // const data = await response.json();
        // setTimetable(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock timetable data
        const mockTimetable: TeacherTimetable = {
          teacherId: 'teacher_001',
          teacherName: 'Prof. Sarah Johnson',
          academicYear: '2024-25',
          semester: 'First Semester',
          schedule: [
            // Monday
            { id: '1', subject: 'Mathematics', className: '10A', room: 'Room 101', startTime: '09:00', endTime: '09:45', day: 'Monday', period: 1 },
            { id: '2', subject: 'Mathematics', className: '10B', room: 'Room 101', startTime: '09:45', endTime: '10:30', day: 'Monday', period: 2 },
            { id: '3', subject: 'Mathematics', className: '9A', room: 'Room 101', startTime: '11:15', endTime: '12:00', day: 'Monday', period: 4 },
            
            // Tuesday
            { id: '4', subject: 'Mathematics', className: '10A', room: 'Room 101', startTime: '08:15', endTime: '09:00', day: 'Tuesday', period: 1 },
            { id: '5', subject: 'Mathematics', className: '10C', room: 'Room 101', startTime: '10:30', endTime: '11:15', day: 'Tuesday', period: 3 },
            { id: '6', subject: 'Mathematics', className: '9B', room: 'Room 101', startTime: '12:00', endTime: '12:45', day: 'Tuesday', period: 5 },
            
            // Wednesday
            { id: '7', subject: 'Mathematics', className: '10B', room: 'Room 101', startTime: '09:00', endTime: '09:45', day: 'Wednesday', period: 1 },
            { id: '8', subject: 'Mathematics', className: '9A', room: 'Room 101', startTime: '09:45', endTime: '10:30', day: 'Wednesday', period: 2 },
            { id: '9', subject: 'Mathematics', className: '10A', room: 'Room 101', startTime: '11:15', endTime: '12:00', day: 'Wednesday', period: 4 },
            
            // Thursday
            { id: '10', subject: 'Mathematics', className: '10C', room: 'Room 101', startTime: '08:15', endTime: '09:00', day: 'Thursday', period: 1 },
            { id: '11', subject: 'Mathematics', className: '9B', room: 'Room 101', startTime: '09:45', endTime: '10:30', day: 'Thursday', period: 2 },
            { id: '12', subject: 'Mathematics', className: '10B', room: 'Room 101', startTime: '12:00', endTime: '12:45', day: 'Thursday', period: 5 },
            
            // Friday
            { id: '13', subject: 'Mathematics', className: '10A', room: 'Room 101', startTime: '09:00', endTime: '09:45', day: 'Friday', period: 1 },
            { id: '14', subject: 'Mathematics', className: '9A', room: 'Room 101', startTime: '10:30', endTime: '11:15', day: 'Friday', period: 3 },
            { id: '15', subject: 'Mathematics', className: '10C', room: 'Room 101', startTime: '11:15', endTime: '12:00', day: 'Friday', period: 4 },
            
            // Saturday
            { id: '16', subject: 'Mathematics', className: '9B', room: 'Room 101', startTime: '09:00', endTime: '09:45', day: 'Saturday', period: 1 },
            { id: '17', subject: 'Mathematics', className: '10B', room: 'Room 101', startTime: '10:30', endTime: '11:15', day: 'Saturday', period: 3 }
          ]
        };
        
        setTimetable(mockTimetable);
      } catch (err) {
        console.error('Error fetching timetable:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const getEntryForSlot = (day: string, period: number): TimetableEntry | null => {
    if (!timetable) return null;
    return timetable.schedule.find(entry => entry.day === day && entry.period === period) || null;
  };

  const getClassStats = () => {
    if (!timetable) return { totalClasses: 0, uniqueClasses: 0, totalHours: 0 };
    
    const totalClasses = timetable.schedule.length;
    const uniqueClasses = new Set(timetable.schedule.map(entry => entry.className)).size;
    const totalHours = totalClasses * 0.75; // Assuming 45 minutes per period
    
    return { totalClasses, uniqueClasses, totalHours };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Timetable</h1>
          <p className="text-muted-foreground">Loading your timetable...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Timetable</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!timetable) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Timetable</h1>
          <p className="text-muted-foreground">No timetable found.</p>
        </div>
      </div>
    );
  }

  const stats = getClassStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Timetable</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
            {timetable.academicYear}
          </Badge>
          <Badge variant="outline">
            {timetable.semester}
          </Badge>
          <p className="text-muted-foreground">
            Welcome, {timetable.teacherName}
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold">{stats.totalClasses}</span>
            </div>
            <CardTitle className="text-base">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Per week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-2xl font-bold">{stats.uniqueClasses}</span>
            </div>
            <CardTitle className="text-base">Unique Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Different sections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-2xl font-bold">{stats.totalHours}</span>
            </div>
            <CardTitle className="text-base">Weekly Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Teaching time</p>
          </CardContent>
        </Card>
      </div>

      {/* Timetable Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>Your class schedule for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="font-medium text-center py-2 text-sm">Period</div>
                {days.map(day => (
                  <div key={day} className="font-medium text-center py-2 text-sm bg-slate-50 rounded">
                    {day}
                  </div>
                ))}
              </div>

              {/* Timetable Rows */}
              {periods.map(period => (
                <div key={period} className="grid grid-cols-7 gap-2 mb-2">
                  <div className="flex items-center justify-center py-4 text-sm font-medium bg-slate-50 rounded">
                    Period {period}
                  </div>
                  {days.map(day => {
                    const entry = getEntryForSlot(day, period);
                    return (
                      <div key={`${day}-${period}`} className="min-h-[80px] border rounded p-2">
                        {entry ? (
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <div className="font-medium text-sm text-inlustro-purple">
                                {entry.subject}
                              </div>
                              <div className="text-xs text-gray-600 mb-1">
                                {entry.className}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {entry.startTime}-{entry.endTime}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {entry.room}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                            Free
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Class Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Class Distribution</CardTitle>
          <CardDescription>Overview of your teaching assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from(new Set(timetable.schedule.map(entry => entry.className)))
              .map(className => {
                const classEntries = timetable.schedule.filter(entry => entry.className === className);
                const totalHours = classEntries.length * 0.75;
                return (
                  <div key={className} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-inlustro-purple/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-inlustro-purple" />
                      </div>
                      <div>
                        <h4 className="font-medium">Class {className}</h4>
                        <p className="text-sm text-muted-foreground">Mathematics</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{classEntries.length} periods/week</div>
                      <div className="text-sm text-muted-foreground">{totalHours} hours</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherTimetable;
