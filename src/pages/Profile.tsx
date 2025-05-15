
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Calendar, Globe, Moon, Sun, ShieldCheck, Key } from 'lucide-react';
import { currentUser as initialUser } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

// Sample teachers data for admin view
const adminTeachersList = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@inlustro.edu',
    role: 'Department Head',
    subject: 'Mathematics',
    avatar: null,
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@inlustro.edu',
    role: 'Senior Teacher',
    subject: 'Physics',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mrs. Emily Rodriguez',
    email: 'emily.rodriguez@inlustro.edu',
    role: 'Teacher',
    subject: 'English Literature',
    avatar: null,
  }
];

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    ...initialUser,
    role: 'admin' // Setting the user as an admin
  });
  const [isDarkMode, setIsDarkMode] = useState(user.theme === 'dark');
  const [selectedTeacher, setSelectedTeacher] = useState<null | number>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    setUser(prev => ({ ...prev, theme: checked ? 'dark' : 'light' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSwitchToTeacher = (teacherId: number) => {
    setSelectedTeacher(teacherId);
    toast({
      title: "Teacher View",
      description: `You are now viewing as ${adminTeachersList.find(t => t.id === teacherId)?.name}`,
    });
  };
  
  // Format the last login date
  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get user initials for avatar fallback
  const userInitials = user.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="account">Account Security</TabsTrigger>
          {user.role === 'admin' && (
            <TabsTrigger value="admin">Admin Options</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="personal">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-4 md:space-y-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user.role} {user.role === 'admin' ? '(Administrator)' : ''}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={user.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={user.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Title/Position
                    </Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={user.role === 'admin' ? 'School Administrator' : user.class}
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="flex gap-4">
                    <Input type="password" value="••••••••" disabled />
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </Label>
                  <Select
                    value={user.language}
                    onValueChange={(value) => handleSelectChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch 
                    checked={isDarkMode}
                    onCheckedChange={handleThemeChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {user.role === 'admin' && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Options</CardTitle>
                <CardDescription>Advanced administrative options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-4">View as Teacher</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Switch to a teacher's view to help troubleshoot issues or provide assistance.
                  </p>
                  
                  <div className="space-y-4">
                    {adminTeachersList.map((teacher) => (
                      <div 
                        key={teacher.id}
                        className={`p-4 border rounded-lg flex justify-between items-center ${
                          selectedTeacher === teacher.id ? 'border-primary bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={teacher.avatar || ''} />
                            <AvatarFallback>
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-xs text-muted-foreground">{teacher.role} - {teacher.subject}</p>
                          </div>
                        </div>
                        <Button 
                          variant={selectedTeacher === teacher.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSwitchToTeacher(teacher.id)}
                        >
                          {selectedTeacher === teacher.id ? 'Current View' : 'Switch View'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-2">System Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure global system settings for all users.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Teacher Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow teachers to self-register on the platform
                        </p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Put the system into maintenance mode
                        </p>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">User ID</p>
              <p className="text-lg">ADM-{user.id || '001'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Account Type</p>
              <p className="text-lg capitalize">{user.role || 'Admin'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Last Login</p>
              <p className="text-lg">{formatLastLogin(user.lastLogin)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
