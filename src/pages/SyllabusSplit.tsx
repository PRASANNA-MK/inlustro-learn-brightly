
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SplitSquareHorizontal, Upload, Save, Download, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SyllabusSection {
  id: string;
  title: string;
  content: string;
  timeframe: string;
  topics: string[];
  estimatedHours: number;
}

interface SyllabusSplit {
  id: string;
  title: string;
  subject: string;
  className: string;
  splitType: 'monthly' | 'weekly' | 'custom';
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
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    className: '',
    splitType: 'monthly' as 'monthly' | 'weekly' | 'custom',
    syllabusContent: '',
    customSections: '12'
  });

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
              },
              {
                id: '2',
                title: 'Month 2: Polynomials',
                content: 'Introduction to polynomials, degree, coefficients, algebraic identities',
                timeframe: 'February 2024',
                topics: ['Polynomials', 'Degree of Polynomial', 'Algebraic Identities'],
                estimatedHours: 22
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
  const handleGenerateSplit = async () => {
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
      //   body: JSON.stringify({
      //     ...formData,
      //     sectionsCount: formData.splitType === 'custom' ? parseInt(formData.customSections) : 
      //                   formData.splitType === 'monthly' ? 12 : 52
      //   })
      // });
      // if (!response.ok) throw new Error('Failed to generate split');
      // const data = await response.json();
      
      // Mock API delay and generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock sections based on split type
      const sectionsCount = formData.splitType === 'custom' ? parseInt(formData.customSections) : 
                           formData.splitType === 'monthly' ? 12 : 52;
      
      const mockSections: SyllabusSection[] = Array.from({ length: Math.min(sectionsCount, 6) }, (_, i) => ({
        id: (i + 1).toString(),
        title: `${formData.splitType === 'monthly' ? 'Month' : formData.splitType === 'weekly' ? 'Week' : 'Section'} ${i + 1}: Topic ${i + 1}`,
        content: `Content for ${formData.splitType} ${i + 1} covering key concepts from the syllabus.`,
        timeframe: formData.splitType === 'monthly' ? 
          new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) :
          `Week ${i + 1}`,
        topics: [`Topic ${i + 1}A`, `Topic ${i + 1}B`, `Topic ${i + 1}C`],
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
      setSplits(prev => [newSplit, ...prev]);
      
      toast({
        title: "Success",
        description: "Syllabus split generated successfully!"
      });
    } catch (err) {
      console.error('Error generating split:', err);
      toast({
        title: "Error",
        description: "Failed to generate syllabus split. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // TODO: Connect to backend - Save syllabus split
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
      // if (!response.ok) throw new Error('Failed to save split');
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Success",
        description: "Syllabus split saved successfully!"
      });
      
      setCurrentSplit(null);
      setShowForm(false);
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        className: '',
        splitType: 'monthly',
        syllabusContent: '',
        customSections: '12'
      });
    } catch (err) {
      console.error('Error saving split:', err);
      toast({
        title: "Error",
        description: "Failed to save syllabus split. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSplit = async (split: SyllabusSplit) => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/syllabus-splits/${split.id}/download`, {
      //   method: 'GET'
      // });
      // if (!response.ok) throw new Error('Failed to download split');
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${split.title}.pdf`;
      // a.click();
      
      // Mock download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Download started",
        description: "Your syllabus split is being prepared for download."
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download syllabus split.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && splits.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Syllabus Split</h1>
          <p className="text-muted-foreground">Loading syllabus splits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Syllabus Split</h1>
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
          <h1 className="text-3xl font-bold tracking-tight">Syllabus Split</h1>
          <Button onClick={() => setShowForm(true)} disabled={showForm}>
            <SplitSquareHorizontal className="h-4 w-4 mr-2" />
            Create Split
          </Button>
        </div>
        <p className="text-muted-foreground">
          Break down your syllabus into manageable monthly, weekly, or custom time periods.
        </p>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Create Syllabus Split
            </CardTitle>
            <CardDescription>
              Upload your syllabus content and split it into manageable sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Split Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mathematics Grade 10 - Annual Plan"
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
                <Label htmlFor="splitType">Split Type</Label>
                <Select value={formData.splitType} onValueChange={(value: 'monthly' | 'weekly' | 'custom') => setFormData(prev => ({ ...prev, splitType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly (12 sections)</SelectItem>
                    <SelectItem value="weekly">Weekly (52 sections)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.splitType === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customSections">Number of Sections</Label>
                  <Input
                    id="customSections"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.customSections}
                    onChange={(e) => setFormData(prev => ({ ...prev, customSections: e.target.value }))}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="syllabusContent">Syllabus Content *</Label>
              <Textarea
                id="syllabusContent"
                placeholder="Paste your complete syllabus content here..."
                value={formData.syllabusContent}
                onChange={(e) => setFormData(prev => ({ ...prev, syllabusContent: e.target.value }))}
                required
                rows={8}
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleGenerateSplit} disabled={loading}>
                <SplitSquareHorizontal className="h-4 w-4 mr-2" />
                {loading ? 'Generating...' : 'Generate Split'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
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
                  {loading ? 'Saving...' : 'Save Split'}
                </Button>
                <Button variant="outline" onClick={() => handleDownloadSplit(currentSplit)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Review and customize your generated syllabus split
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentSplit.sections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">{section.title}</h4>
                    <Badge variant="outline">{section.estimatedHours} hours</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {section.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Timeframe: {section.timeframe}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Saved Syllabus Splits</CardTitle>
          <CardDescription>Your previously created syllabus splits</CardDescription>
        </CardHeader>
        <CardContent>
          {splits.length > 0 ? (
            <div className="space-y-4">
              {splits.map((split) => (
                <div key={split.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{split.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{split.subject}</Badge>
                        <Badge variant="outline">{split.className}</Badge>
                        <Badge variant="outline">{split.splitType}</Badge>
                        <Badge variant="outline">{split.totalSections} sections</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(split.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentSplit(split)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadSplit(split)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No syllabus splits found. Create your first split to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SyllabusSplit;
