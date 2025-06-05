
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Edit, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DailyLogEntry {
  id: string;
  date: string;
  subject: string;
  className: string;
  period: string;
  summary: string;
  remarks: string;
  createdAt: string;
}

const DailyLog = () => {
  const [entries, setEntries] = useState<DailyLogEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    className: '',
    period: '',
    summary: '',
    remarks: ''
  });

  // Mock data for dropdowns
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const classes = ['10A', '10B', '10C', '9A', '9B', '8A', '8B'];
  const periods = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  // TODO: Connect to backend - Fetch daily log entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/daily-logs', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch entries');
        // const data = await response.json();
        // setEntries(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockEntries: DailyLogEntry[] = [
          {
            id: '1',
            date: '2024-06-05',
            subject: 'Mathematics',
            className: '10A',
            period: '3rd',
            summary: 'Completed quadratic equations chapter. Students showed good understanding.',
            remarks: 'Need to focus more on word problems next class.',
            createdAt: '2024-06-05T10:30:00Z'
          },
          {
            id: '2',
            date: '2024-06-04',
            subject: 'Mathematics',
            className: '10B',
            period: '2nd',
            summary: 'Introduction to trigonometry. Covered basic ratios.',
            remarks: 'Students need more practice with angle calculations.',
            createdAt: '2024-06-04T09:15:00Z'
          }
        ];
        
        setEntries(mockEntries);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch entries');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // TODO: Connect to backend - Save/update daily log entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.className || !formData.summary) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      if (editingEntry) {
        // Update existing entry
        // const response = await fetch(`/api/daily-logs/${editingEntry}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        setEntries(prev => prev.map(entry => 
          entry.id === editingEntry 
            ? { ...entry, ...formData, id: editingEntry }
            : entry
        ));
      } else {
        // Create new entry
        // const response = await fetch('/api/daily-logs', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        const newEntry: DailyLogEntry = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        
        setEntries(prev => [newEntry, ...prev]);
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        subject: '',
        className: '',
        period: '',
        summary: '',
        remarks: ''
      });
      
      setShowForm(false);
      setEditingEntry(null);
      
      toast({
        title: "Success",
        description: editingEntry ? "Entry updated successfully." : "Entry saved successfully."
      });
    } catch (err) {
      console.error('Error saving entry:', err);
      toast({
        title: "Error",
        description: "Failed to save entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry: DailyLogEntry) => {
    setFormData({
      date: entry.date,
      subject: entry.subject,
      className: entry.className,
      period: entry.period,
      summary: entry.summary,
      remarks: entry.remarks
    });
    setEditingEntry(entry.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      subject: '',
      className: '',
      period: '',
      summary: '',
      remarks: ''
    });
    setShowForm(false);
    setEditingEntry(null);
  };

  if (loading && entries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
          <p className="text-muted-foreground">Loading entries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
        <p className="text-muted-foreground">
          Record and track your daily teaching activities and observations.
        </p>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {editingEntry ? 'Edit Entry' : 'New Daily Log Entry'}
            </CardTitle>
            <CardDescription>
              Document your teaching activities for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
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
                
                <div className="space-y-2">
                  <Label htmlFor="className">Class</Label>
                  <Select value={formData.className} onValueChange={(value) => setFormData(prev => ({ ...prev, className: value }))}>
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
                  <Label htmlFor="period">Period</Label>
                  <Select value={formData.period} onValueChange={(value) => setFormData(prev => ({ ...prev, period: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map(period => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Describe what was covered in today's class..."
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  required
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  placeholder="Any additional observations or notes..."
                  value={formData.remarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : editingEntry ? 'Update Entry' : 'Save Entry'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your daily teaching log entries</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{entry.date}</Badge>
                        <Badge variant="secondary">{entry.subject}</Badge>
                        <Badge variant="outline">{entry.className}</Badge>
                        <Badge variant="outline">{entry.period} Period</Badge>
                      </div>
                      <h4 className="font-medium mb-2">Summary</h4>
                      <p className="text-sm text-muted-foreground mb-3">{entry.summary}</p>
                      {entry.remarks && (
                        <>
                          <h4 className="font-medium mb-1">Remarks</h4>
                          <p className="text-sm text-muted-foreground">{entry.remarks}</p>
                        </>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No entries found. Start by adding your first daily log entry.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyLog;
