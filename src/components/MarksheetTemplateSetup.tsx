
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MarksheetTemplate } from '@/utils/pdfGenerator';

interface MarksheetTemplateSetupProps {
  template: MarksheetTemplate;
  onSaveTemplate: (template: MarksheetTemplate) => void;
  currentTeacher: {
    name: string;
    class: string;
  };
}

const MarksheetTemplateSetup: React.FC<MarksheetTemplateSetupProps> = ({
  template,
  onSaveTemplate,
  currentTeacher
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<MarksheetTemplate>(template);

  const handleSave = () => {
    onSaveTemplate(formData);
    toast({
      title: "Template Saved",
      description: "Marksheet template has been saved successfully",
    });
    setIsExpanded(false);
  };

  const handleInputChange = (field: keyof MarksheetTemplate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isExpanded) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Marksheet Template Setup
            </CardTitle>
            <Button onClick={() => setIsExpanded(true)} variant="outline" size="sm">
              Configure Template
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Marksheet Template Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schoolName">School Name</Label>
            <Input
              id="schoolName"
              value={formData.schoolName}
              onChange={(e) => handleInputChange('schoolName', e.target.value)}
              placeholder="Enter school name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Input
              id="academicYear"
              value={formData.academicYear}
              onChange={(e) => handleInputChange('academicYear', e.target.value)}
              placeholder="e.g., 2024-2025"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classTeacherName">Class Teacher Name</Label>
            <Input
              id="classTeacherName"
              value={formData.classTeacherName}
              onChange={(e) => handleInputChange('classTeacherName', e.target.value)}
              placeholder="Teacher name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classSection">Class & Section</Label>
            <Input
              id="classSection"
              value={formData.classSection}
              onChange={(e) => handleInputChange('classSection', e.target.value)}
              placeholder="e.g., 10A"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="headerTitle">Header Title</Label>
          <Input
            id="headerTitle"
            value={formData.headerTitle}
            onChange={(e) => handleInputChange('headerTitle', e.target.value)}
            placeholder="e.g., Term 1 Report Card"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gradingSystem">Grading System (Optional)</Label>
          <Textarea
            id="gradingSystem"
            value={formData.gradingSystem}
            onChange={(e) => handleInputChange('gradingSystem', e.target.value)}
            placeholder="Enter grading rules or color codes..."
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="footerNotes">Footer Notes (Optional)</Label>
          <Textarea
            id="footerNotes"
            value={formData.footerNotes}
            onChange={(e) => handleInputChange('footerNotes', e.target.value)}
            placeholder="Comments, signature space, etc..."
            rows={3}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Template
          </Button>
          <Button onClick={() => setIsExpanded(false)} variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarksheetTemplateSetup;
