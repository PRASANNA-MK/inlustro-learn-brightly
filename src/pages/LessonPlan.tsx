
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Edit, Save, Calendar, Target, Play, Users, BarChart3, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  className: string;
  date: string;
  duration: string;
  // AAA Framework fields
  aim: string;           // Learning goal for the class
  action: string;        // What steps will the teacher take
  activity: string;      // What will students do
  analysis: string;      // How will outcome be reviewed/evaluated
  materials: string;
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
    aim: '',
    action: '',
    activity: '',
    analysis: '',
    materials: '',
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
        
        // Mock data with AAA framework
        const mockPlans: LessonPlan[] = [
          {
            id: '1',
            title: 'Quadratic Equations - Introduction',
            subject: 'Mathematics',
            className: '10A',
            date: '2024-06-06',
            duration: '45',
            aim: 'Students will understand the standard form of quadratic equations and identify their key components (a, b, c coefficients).',
            action: 'Start with review of linear equations, introduce quadratic form through visual examples, demonstrate coefficient identification, provide guided practice with examples.',
            activity: 'Students will work in pairs to identify coefficients in given quadratic equations, solve practice problems, and create their own quadratic equations.',
            analysis: 'Quick formative assessment through exit tickets, observe student discussions during pair work, review homework completion rates.',
            materials: 'Whiteboard, markers, textbook, practice worksheets, graphing calculator',
            notes: 'Focus on visual representations using graphs to help students understand the concept better.',
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
    
    if (!formData.title || !formData.subject || !formData.className || !formData.aim) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including the learning aim.",
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
        aim: '',
        action: '',
        activity: '',
        analysis: '',
        materials: '',
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
      aim: plan.aim,
      action: plan.action,
      activity: plan.activity,
      analysis: plan.analysis,
      materials: plan.materials,
      notes: plan.notes
    });
    setEditingPlan(plan.id);
    setShowForm(true);
  };

  // TODO: Connect to backend - Delete lesson plan
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/lesson-plans/${id}`, {
      //   method: 'DELETE'
      // });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPlans(prev => prev.filter(plan => plan.id !== id));
      
      toast({
        title: "Success",
        description: "Lesson plan deleted successfully."
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete lesson plan.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      subject: '',
      className: '',
      date: '',
      duration: '',
      aim: '',
      action: '',
      activity: '',
      analysis: '',
      materials: '',
      notes: ''
    });
    setShowForm(false);
    setEditingPlan(null);
  };

  if (loading && plans.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Lesson Plan</h1>
        <p className="text-muted-foreground">Loading lesson plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Lesson Plan</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
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
          Create comprehensive lesson plans using the modern AAA framework: Aim, Action, Activity, Analysis.
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
              Use the AAA framework to create effective lesson plans
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
                  <Label>Subject *</Label>
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
                  <Label>Class *</Label>
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
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="45"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
              </div>

              {/* AAA Framework Section */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold">AAA Framework</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="aim" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Aim - Learning Goal *
                  </Label>
                  <Textarea
                    id="aim"
                    placeholder="What is the specific learning goal for this class? What should students understand or be able to do by the end?"
                    value={formData.aim}
                    onChange={(e) => setFormData(prev => ({ ...prev, aim: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="action" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Action - Teacher Steps
                  </Label>
                  <Textarea
                    id="action"
                    placeholder="What specific steps will you take as the teacher? Include instruction methods, demonstrations, examples, etc."
                    value={formData.action}
                    onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Activity - Student Tasks
                  </Label>
                  <Textarea
                    id="activity"
                    placeholder="What will students actively do? Include tasks, projects, discussions, practice exercises, group work, etc."
                    value={formData.activity}
                    onChange={(e) => setFormData(prev => ({ ...prev, activity: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analysis" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analysis - Evaluation & Review
                  </Label>
                  <Textarea
                    id="analysis"
                    placeholder="How will you assess understanding and review outcomes? Include formative assessment, feedback methods, success indicators, etc."
                    value={formData.analysis}
                    onChange={(e) => setFormData(prev => ({ ...prev, analysis: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Materials Required</Label>
                <Textarea
                  placeholder="List all materials, resources, and equipment needed..."
                  value={formData.materials}
                  onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any additional notes, reminders, or special considerations..."
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
          <CardDescription>Your lesson plans using the AAA framework</CardDescription>
        </CardHeader>
        <CardContent>
          {plans.length > 0 ? (
            <div className="space-y-6">
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  {/* AAA Framework Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Aim
                      </h4>
                      <p className="text-gray-600">{plan.aim}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        Action
                      </h4>
                      <p className="text-gray-600">{plan.action}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Activity
                      </h4>
                      <p className="text-gray-600">{plan.activity}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        Analysis
                      </h4>
                      <p className="text-gray-600">{plan.analysis}</p>
                    </div>
                  </div>
                  
                  {plan.materials && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-1">Materials</h4>
                      <p className="text-sm text-gray-600">{plan.materials}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No lesson plans found. Create your first lesson plan using the AAA framework.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPlan;
