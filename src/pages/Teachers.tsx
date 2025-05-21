
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Users, Search, Plus, Mail, Phone, Calendar, Award, MapPin, School, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data for teachers
const teachersMockData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@inlustro.edu',
    phone: '+1 (555) 123-4567',
    avatar: null,
    subject: 'Mathematics',
    qualifications: 'Ph.D. in Mathematics',
    university: 'Stanford University',
    experience: '10+ years',
    location: 'New York, NY',
    joinDate: '2021-05-15',
    classes: ['10A', '11B', '12A'],
    publications: 3,
    bio: 'Dr. Johnson specializes in advanced calculus and has published several research papers on mathematical theory. She brings a wealth of knowledge from her academic background to help students understand complex mathematical concepts.',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@inlustro.edu',
    phone: '+1 (555) 234-5678',
    avatar: null,
    subject: 'Physics',
    qualifications: 'M.Sc. in Physics',
    university: 'MIT',
    experience: '8 years',
    location: 'Boston, MA',
    joinDate: '2020-08-10',
    classes: ['9A', '10B', '12C'],
    publications: 2,
    bio: 'Professor Chen is passionate about making physics accessible to all students. His hands-on approach to teaching and real-world examples help students grasp challenging physics concepts.',
  },
  {
    id: 3,
    name: 'Mrs. Emily Rodriguez',
    email: 'emily.rodriguez@inlustro.edu',
    phone: '+1 (555) 345-6789',
    avatar: null,
    subject: 'English Literature',
    qualifications: 'M.A. in English Literature',
    university: 'Columbia University',
    experience: '6 years',
    location: 'Chicago, IL',
    joinDate: '2022-01-20',
    classes: ['9C', '10A', '11A'],
    publications: 1,
    bio: 'Mrs. Rodriguez brings literature to life in her classroom. Her teaching philosophy centers on encouraging critical thinking and helping students connect with the human experiences portrayed in literary works.',
  },
  {
    id: 4,
    name: 'Dr. Robert Williams',
    email: 'robert.williams@inlustro.edu',
    phone: '+1 (555) 456-7890',
    avatar: null,
    subject: 'Chemistry',
    qualifications: 'Ph.D. in Chemistry',
    university: 'Harvard University',
    experience: '12 years',
    location: 'San Francisco, CA',
    joinDate: '2019-11-05',
    classes: ['10C', '11C', '12B'],
    publications: 5,
    bio: 'Dr. Williams is known for his engaging laboratory sessions and ability to explain complex chemical reactions. His background in industrial research brings practical applications to the classroom.',
  },
  {
    id: 5,
    name: 'Ms. Jennifer Lee',
    email: 'jennifer.lee@inlustro.edu',
    phone: '+1 (555) 567-8901',
    avatar: null,
    subject: 'History',
    qualifications: 'B.Ed. in History',
    university: 'University of Chicago',
    experience: '4 years',
    location: 'Seattle, WA',
    joinDate: '2023-03-15',
    classes: ['9B', '10B', '11B'],
    publications: 0,
    bio: 'Ms. Lee makes history relevant by connecting past events to current affairs. Her engaging storytelling approach and multimedia presentations help students understand historical contexts and their impact on the modern world.',
  },
  {
    id: 6,
    name: 'Mr. David Patel',
    email: 'david.patel@inlustro.edu',
    phone: '+1 (555) 678-9012',
    avatar: null,
    subject: 'Computer Science',
    qualifications: 'M.S. in Computer Science',
    university: 'Carnegie Mellon University',
    experience: '7 years',
    location: 'Austin, TX',
    joinDate: '2021-09-01',
    classes: ['10D', '11D', '12D'],
    publications: 1,
    bio: 'Mr. Patel brings industry experience in software development to his teaching. His project-based learning approach helps students develop practical programming skills while understanding computer science theory.',
  },
  {
    id: 7,
    name: 'Dr. Maria González',
    email: 'maria.gonzalez@inlustro.edu',
    phone: '+1 (555) 789-0123',
    avatar: null,
    subject: 'Biology',
    qualifications: 'Ph.D. in Molecular Biology',
    university: 'UCLA',
    experience: '9 years',
    location: 'Miami, FL',
    joinDate: '2020-06-15',
    classes: ['9D', '10E', '11E'],
    publications: 4,
    bio: 'Dr. González specializes in genetics and cellular biology. Her lessons incorporate the latest scientific discoveries and research methodologies, preparing students for further studies in biological sciences.',
  },
];

// Subject options for dropdown
const subjectOptions = [
  "Mathematics", 
  "Physics", 
  "Chemistry", 
  "Biology", 
  "English", 
  "History", 
  "Geography", 
  "Computer Science", 
  "Art", 
  "Music", 
  "Physical Education"
];

const Teachers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<null | any>(null);
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    qualifications: '',
    phone: '',
    university: '',
    experience: '',
  });
  
  const filteredTeachers = teachersMockData.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTeacher = () => {
    if (!formData.name || !formData.email || !formData.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Teacher Added",
        description: `${formData.name} has been added to the system.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        qualifications: '',
        phone: '',
        university: '',
        experience: '',
      });
    }, 1500);
  };
  
  const handleViewTeacherProfile = (teacher: any) => {
    setSelectedTeacher(teacher);
    setSelectedTab('profile');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
        <p className="text-muted-foreground">Manage teacher accounts and profiles.</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            className="pl-8 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the details of the new teacher. They will receive an email to set up their account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Dr. Jane Smith"
                  className="rounded-full"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane.smith@inlustro.edu"
                  className="rounded-full"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="rounded-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleSelectChange('subject', value)}
                >
                  <SelectTrigger id="subject" className="rounded-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {subjectOptions.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  placeholder="Ph.D. in Mathematics"
                  className="rounded-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="Stanford University"
                  className="rounded-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years"
                  className="rounded-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleAddTeacher} 
                className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Teacher"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {filteredTeachers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeachers.map(teacher => (
            <Card key={teacher.id} className="hover:shadow-md transition-all rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gradient-to-r from-inlustro-purple/10 to-transparent">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                  <AvatarImage src={teacher.avatar || ''} />
                  <AvatarFallback className="text-lg bg-inlustro-purple text-white">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <School className="h-3 w-3" /> {teacher.subject}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">{teacher.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Award className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">{teacher.qualifications}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Classes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.classes.map(cls => (
                      <Badge key={cls} variant="outline" className="bg-inlustro-purple/10">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full hover:bg-inlustro-purple/10 hover:text-inlustro-purple transition-colors"
                    onClick={() => handleViewTeacherProfile(teacher)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No teachers found</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            No teachers match your search criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSearchTerm('')} 
            className="rounded-full"
          >
            Clear filters
          </Button>
        </div>
      )}
      
      {selectedTeacher && (
        <Dialog open={!!selectedTeacher} onOpenChange={() => setSelectedTeacher(null)}>
          <DialogContent className="sm:max-w-[600px] rounded-xl">
            <DialogHeader>
              <DialogTitle>Teacher Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedTeacher.name}.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 rounded-full">
                <TabsTrigger value="profile" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="classes" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">
                  Classes
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-full data-[state=active]:bg-inlustro-purple data-[state=active]:text-white">
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                    <AvatarImage src={selectedTeacher.avatar || ''} />
                    <AvatarFallback className="text-xl bg-inlustro-purple text-white">
                      {selectedTeacher.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <h2 className="text-xl font-bold">{selectedTeacher.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
                      <School className="h-3.5 w-3.5" /> {selectedTeacher.subject} Teacher
                    </p>
                    <Badge variant="outline" className="bg-inlustro-purple/10">
                      {selectedTeacher.experience} Experience
                    </Badge>
                  </div>
                </div>
                
                <div className="grid gap-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-inlustro-purple" /> 
                        {selectedTeacher.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-inlustro-purple" /> 
                        {selectedTeacher.phone}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Qualifications</p>
                      <p className="text-sm flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-inlustro-purple" /> 
                        {selectedTeacher.qualifications}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Joined</p>
                      <p className="text-sm flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-inlustro-purple" /> 
                        {formatDate(selectedTeacher.joinDate)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">University</p>
                      <p className="text-sm">
                        {selectedTeacher.university}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-inlustro-purple" /> 
                        {selectedTeacher.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground">Bio</p>
                    <p className="text-sm">{selectedTeacher.bio}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="classes" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Assigned Classes</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full"
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" /> 
                            Assign Class
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Assign a new class</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="grid gap-2">
                    {selectedTeacher.classes.map((cls: string) => (
                      <div 
                        key={cls}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-inlustro-purple/10 rounded-full">
                            <Users className="h-4 w-4 text-inlustro-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Class {cls}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedTeacher.subject} - Academic Year 2024-25
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-inlustro-purple hover:text-inlustro-purple/80">
                          View Students
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Account Settings</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input 
                        id="display-name" 
                        defaultValue={selectedTeacher.name} 
                        className="rounded-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input 
                        id="contact-email" 
                        type="email" 
                        defaultValue={selectedTeacher.email}
                        className="rounded-full" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <h3 className="text-sm font-medium">Account Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Reset Password
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                        Suspend Account
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-between flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => setSelectedTeacher(null)}
              >
                Close
              </Button>
              <Button className="rounded-full bg-inlustro-purple hover:bg-inlustro-purple/90">
                <User className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Teachers;
