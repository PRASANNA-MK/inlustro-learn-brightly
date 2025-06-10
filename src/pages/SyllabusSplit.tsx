
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SplitSquareHorizontal, Upload, Save, Download, Edit, Move, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SyllabusSection {
  id: string;
  title: string;
  content: string;
  timeframe: string;
  topics: string[];
  estimatedHours: number;
  monthsSpan?: number;
}

interface SyllabusSplit {
  id: string;
  title: string;
  subject: string;
  className: string;
  splitType: 'monthly' | 'weekly' | 'manual';
  totalSections: number;
  sections: SyllabusSection[];
  createdAt: string;
}

const SyllabusSplit = () => {
  const [splits, setSplits] = useState<SyllabusSplit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentSplit, setCurrentSplit] = useState<SyllabusSplit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splitMode, setSplitMode] = useState<'auto' | 'manual'>('auto');
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    className: '',
    splitType: 'monthly' as 'monthly' | 'weekly' | 'manual',
    syllabusContent: '',
    customSections: '12'
  });

  // Manual split states
  const [manualSections, setManualSections] = useState<SyllabusSection[]>([]);

  // Mock data for dropdowns
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
  const classes = ['10A', '10B', '10C', '9A', '9B', '8A', '8B'];

  // TODO: Connect to backend - Fetch syllabus splits
  useEffect(() => {
    const fetchSplits = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/syllabus-splits', {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // if (!response.ok) throw new Error('Failed to fetch splits');
        // const data = await response.json();
        // setSplits(data);
        
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockSplits: SyllabusSplit[] = [
          {
            id: '1',
            title: 'Mathematics Grade 10 - Annual Plan',
            subject: 'Mathematics',
            className: '10A',
            splitType: 'monthly',
            totalSections: 12,
            sections: [
              {
                id: '1',
                title: 'Month 1: Number Systems',
                content: 'Real numbers, irrational numbers, representation on number line',
                timeframe: 'January 2024',
                topics: ['Real Numbers', 'Irrational Numbers', 'Number Line'],
                estimatedHours: 20
              }
            ],
            createdAt: '2024-06-05T10:00:00Z'
          }
        ];
        
        setSplits(mockSplits);
      } catch (err) {
        console.error('Error fetching splits:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch splits');
      } finally {
        setLoading(false);
      }
    };

    fetchSplits();
  }, []);

  // TODO: Connect to backend - Generate syllabus split
  const handleAutoGenerateSplit = async () => {
    if (!formData.title || !formData.subject || !formData.className || !formData.syllabusContent) {
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
      // const response = await fetch('/api/syllabus-splits/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock sections
      const sectionsCount = formData.splitType === 'monthly' ? 12 : 52;
      const mockSections: SyllabusSection[] = Array.from({ length: Math.min(sectionsCount, 6) }, (_, i) => ({
        id: (i + 1).toString(),
        title: `${formData.splitType === 'monthly' ? 'Month' : 'Week'} ${i + 1}: Topic ${i + 1}`,
        content: `Content for ${formData.splitType} ${i + 1} covering key concepts.`,
        timeframe: formData.splitType === 'monthly' ? 
          new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
          `Week ${i + 1}`,
        topics: [`Topic ${i + 1}A`, `Topic ${i + 1}B`],
        estimatedHours: Math.floor(Math.random() * 10) + 15
      }));

      const newSplit: SyllabusSplit = {
        id: Date.now().toString(),
        title: formData.title,
        subject: formData.subject,
        className: formData.className,
        splitType: formData.splitType,
        totalSections: sectionsCount,
        sections: mockSections,
        createdAt: new Date().toISOString()
      };

      setCurrentSplit(newSplit);
      
      toast({
        title: "Success",
        description: "Auto syllabus split generated successfully!"
      });
    } catch (err) {
      console.error('Error generating split:', err);
      toast({
        title: "Error",
        description: "Failed to generate syllabus split.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addManualSection = () => {
    const newSection: SyllabusSection = {
      id: Date.now().toString(),
      title: '',
      content: '',
      timeframe: '',
      topics: [],
      estimatedHours: 0,
      monthsSpan: 1
    };
    setManualSections([...manualSections, newSection]);
  };

  const updateManualSection = (id: string, field: string, value: any) => {
    setManualSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const removeManualSection = (id: string) => {
    setManualSections(prev => prev.filter(section => section.id !== id));
  };

  const handleManualSplit = async () => {
    if (!formData.title || !formData.subject || !formData.className || manualSections.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in basic details and add at least one section.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/syllabus-splits/manual', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, sections: manualSections })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newSplit: SyllabusSplit = {
        id: Date.now().toString(),
        title: formData.title,
        subject: formData.subject,
        className: formData.className,
        splitType: 'manual',
        totalSections: manualSections.length,
        sections: manualSections,
        createdAt: new Date().toISOString()
      };

      setCurrentSplit(newSplit);
      
      toast({
        title: "Success",
        description: "Manual syllabus split created successfully!"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create manual split.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: Connect to backend - Save split
  const handleSaveSplit = async () => {
    if (!currentSplit) return;

    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/syllabus-splits', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(currentSplit)
      // });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSplits(prev => [currentSplit, ...prev]);
      setCurrentSplit(null);
      setShowForm(false);
      setManualSections([]);
      
      toast({
        title: "Success",
        description: "Syllabus split saved successfully!"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save split.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && splits.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Syllabus Split</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Syllabus Split</h1>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <SplitSquareHorizontal className="h-4 w-4 mr-2" />
            Create Split
          </Button>
        </div>
        <p className="text-muted-foreground">
          Break down your syllabus into manageable time periods automatically or manually.
        </p>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Syllabus Split</CardTitle>
            <CardDescription>Choose between automatic or manual splitting</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={splitMode} onValueChange={(value: 'auto' | 'manual') => setSplitMode(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto">Auto Split</TabsTrigger>
                <TabsTrigger value="manual">Manual Split</TabsTrigger>
              </TabsList>
              
              <TabsContent value="auto" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Split Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Mathematics Grade 10 - Annual Plan"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                    <Label>Split Type</Label>
                    <Select value={formData.splitType} onValueChange={(value: 'monthly' | 'weekly') => setFormData(prev => ({ ...prev, splitType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Syllabus Content *</Label>
                  <Textarea
                    placeholder="Paste your complete syllabus content here..."
                    value={formData.syllabusContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, syllabusContent: e.target.value }))}
                    rows={8}
                  />
                </div>
                
                <Button onClick={handleAutoGenerateSplit} disabled={loading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {loading ? 'Generating...' : 'Auto Generate Split'}
                </Button>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="Manual Split Title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Manual Sections</h3>
                    <Button onClick={addManualSection} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Section
                    </Button>
                  </div>
                  
                  {manualSections.map((section, index) => (
                    <Card key={section.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Section Title</Label>
                          <Input
                            placeholder={`Section ${index + 1} title`}
                            value={section.title}
                            onChange={(e) => updateManualSection(section.id, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Timeframe</Label>
                          <Input
                            placeholder="e.g., January-February 2024"
                            value={section.timeframe}
                            onChange={(e) => updateManualSection(section.id, 'timeframe', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Estimated Hours</Label>
                          <Input
                            type="number"
                            placeholder="20"
                            value={section.estimatedHours}
                            onChange={(e) => updateManualSection(section.id, 'estimatedHours', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Span (Months)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="12"
                            value={section.monthsSpan || 1}
                            onChange={(e) => updateManualSection(section.id, 'monthsSpan', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        
                        <div className="md:col-span-2 space-y-2">
                          <Label>Content Description</Label>
                          <Textarea
                            placeholder="Describe what will be covered in this section..."
                            value={section.content}
                            onChange={(e) => updateManualSection(section.id, 'content', e.target.value)}
                            rows={2}
                          />
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end">
                          <Button 
                            onClick={() => removeManualSection(section.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Minus className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Button onClick={handleManualSplit} disabled={loading || manualSections.length === 0}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Manual Split'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {currentSplit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Split: {currentSplit.title}</span>
              <div className="flex gap-2">
                <Button onClick={handleSaveSplit} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Split
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSplit.sections.map((section) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">{section.title}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline">{section.estimatedHours} hours</Badge>
                      {section.monthsSpan && (
                        <Badge variant="secondary">{section.monthsSpan} month(s)</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                  <p className="text-xs text-muted-foreground">Timeframe: {section.timeframe}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Saved Syllabus Splits</CardTitle>
          <CardDescription>Your previously created splits</CardDescription>
        </CardHeader>
        <CardContent>
          {splits.length > 0 ? (
            <div className="space-y-4">
              {splits.map((split) => (
                <div key={split.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{split.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{split.subject}</Badge>
                        <Badge variant="outline">{split.className}</Badge>
                        <Badge variant="outline">{split.splitType}</Badge>
                        <Badge variant="outline">{split.totalSections} sections</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentSplit(split)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No splits found. Create your first split to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SyllabusSplit;
