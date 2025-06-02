
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { currentUser } from '@/data/mockData';
import { User, Mail, BookOpen, GraduationCap, Calendar, LogOut } from 'lucide-react';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOpenChange }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-2xl bg-inlustro-purple text-white">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">{currentUser.name}</h3>
            <Badge variant="outline" className="bg-inlustro-purple/10 text-inlustro-purple">
              Teacher
            </Badge>
          </div>
          
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Subject</p>
                <p className="text-sm text-gray-600">{currentUser.subject}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Grade Level</p>
                <p className="text-sm text-gray-600">{currentUser.grade}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Employee ID</p>
                <p className="text-sm text-gray-600">{currentUser.employeeId}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Joined</p>
                <p className="text-sm text-gray-600">
                  {new Date(currentUser.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full mt-6 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
