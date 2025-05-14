
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, User } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

const Header = () => {
  const { open, setOpen } = useSidebar();
  const [notifications] = useState([
    { id: 'n1', text: 'New quiz available!', time: '10m ago' },
    { id: 'n2', text: 'You earned a new badge', time: '1h ago' },
    { id: 'n3', text: 'Your progress report is ready', time: '2h ago' },
  ]);

  const user = currentUser;
  const userInitials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/780e4ace-8ec8-4138-8f5e-e69619c11190.png" alt="InLustro Logo" className="h-10 w-auto" />
          <span className="hidden text-xl font-bold md:inline-block">
            <span>InLustro</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-inlustro-blue"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                <span className="text-sm font-medium">{notification.text}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">{user.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
