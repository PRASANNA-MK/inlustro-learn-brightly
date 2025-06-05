
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Edit, Save, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  className: string;
  date: string;
  duration: string;
  objectives: string;
  materials: string;
  activities: string;
  assessment: string;
  homework: string;
  notes: string;
  createdAt: string;
}

const LessonPlan = () => {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    className: '',
    date: '',
    duration: '',
    objectives: '',
    materials: '',
    activities: '',
    assessment: '',
    homework: '',
    notes: ''
  });

  // Mock data for dropdowns
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const classes = ['10A', '10B', '10C', '9A', '9B', '8A', '8B'];

  // TODO: Connect to backend - Fetch lesson plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/lesson-plans', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch plans');
        // const data = await response.json();
        // setPlans(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockPlans: LessonPlan[] = [
          {
            id: '1',
            title: 'Quadratic Equations - Introduction',
            subject: 'Mathematics',
            className: '10A',
            date: '2024-06-06',
            duration: '45',
            objectives: 'Students will understand the basics of quadratic equations and be able to identify their standard form.',
            materials: 'Whiteboard, markers, textbook, practice worksheets',
            activities: '1. Review linear equations (10 min)\n2. Introduction to quadratic form (15 min)\n3. Examples and practice (20 min)',
            assessment: 'Quick quiz at the end, observe student participation during practice',
            homework: 'Complete exercises 1-10 from chapter 4',
            notes: 'Focus on visual representations using graphs',
            createdAt: '2024-06-05T14:30:00Z'
          }
        ];
        
        setPlans(mockPlans);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // TODO: Connect to backend - Save/update lesson plan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.className || !formData.objectives) {
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
      if (editingPlan) {
        // Update existing plan
        // const response = await fetch(`/api/lesson-plans/${editingPlan}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        setPlans(prev => prev.map(plan => 
          plan.id === editingPlan 
            ? { ...plan, ...formData, id: editingPlan }
            : plan
        ));
      } else {
        // Create new plan
        // const response = await fetch('/api/lesson-plans', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        const newPlan: LessonPlan = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        
        setPlans(prev => [newPlan, ...prev]);
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        className: '',
        date: '',
        duration: '',
        objectives: '',
        materials: '',
        activities: '',
        assessment: '',
        homework: '',
        notes: ''
      });
      
      setShowForm(false);
      setEditingPlan(null);
      
      toast({
        title: "Success",
        description: editingPlan ? "Lesson plan updated successfully." : "Lesson plan created successfully."
      });
    } catch (err) {
      console.error('Error saving plan:', err);
      toast({
        title: "Error",
        description: "Failed to save lesson plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: LessonPlan) => {
    setFormData({
      title: plan.title,
      subject: plan.subject,
      className: plan.className,
      date: plan.date,
      duration: plan.duration,
      objectives: plan.objectives,
      materials: plan.materials,
      activities: plan.activities,
      assessment: plan.assessment,
      homework: plan.homework,
      notes: plan.notes
    });
    setEditingPlan(plan.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      subject: '',
      className: '',
      date: '',
      duration: '',
      objectives: '',
      materials: '',
      activities: '',
      assessment: '',
      homework: '',
      notes: ''
    });
    setShowForm(false);
    setEditingPlan(null);
  };

  if (loading && plans.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plan</h1>
          <p className="text-muted-foreground">Loading lesson plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plan</h1>
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
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plan</h1>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>
        <p className="text-muted-foreground">
          Create and manage detailed lesson plans for your classes.
        </p>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {editingPlan ? 'Edit Lesson Plan' : 'New Lesson Plan'}
            </CardTitle>
            <CardDescription>
              Create a comprehensive plan for your lesson
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Quadratic Equations"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
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
                  <Label htmlFor="className">Class *</Label>
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
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="45"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives *</Label>
                <Textarea
                  id="objectives"
                  placeholder="What will students learn or be able to do after this lesson?"
                  value={formData.objectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                  required
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="materials">Materials Required</Label>
                <Textarea
                  id="materials"
                  placeholder="List all materials, resources, and equipment needed..."
                  value={formData.materials}
                  onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="activities">Lesson Activities</Label>
                <Textarea
                  id="activities"
                  placeholder="Describe the sequence of activities and timing..."
                  value={formData.activities}
                  onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assessment">Assessment Methods</Label>
                <Textarea
                  id="assessment"
                  placeholder="How will you assess student understanding?"
                  value={formData.assessment}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessment: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="homework">Homework/Follow-up</Label>
                <Textarea
                  id="homework"
                  placeholder="Any homework assignments or follow-up activities..."
                  value={formData.homework}
                  onChange={(e) => setFormData(prev => ({ ...prev, homework: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes or reminders..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : editingPlan ? 'Update Plan' : 'Save Plan'}
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
          <CardTitle>My Lesson Plans</CardTitle>
          <CardDescription>Your created lesson plans</CardDescription>
        </CardHeader>
        <CardContent>
          {plans.length > 0 ? (
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{plan.subject}</Badge>
                        <Badge variant="outline">{plan.className}</Badge>
                        {plan.date && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(plan.date).toLocaleDateString()}
                          </Badge>
                        )}
                        {plan.duration && (
                          <Badge variant="outline">{plan.duration} min</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Objectives</h4>
                      <p className="text-gray-600">{plan.objectives}</p>
                    </div>
                    
                    {plan.materials && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Materials</h4>
                        <p className="text-gray-600">{plan.materials}</p>
                      </div>
                    )}
                    
                    {plan.activities && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Activities</h4>
                        <p className="text-gray-600 whitespace-pre-line">{plan.activities}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No lesson plans found. Create your first lesson plan to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPlan;
