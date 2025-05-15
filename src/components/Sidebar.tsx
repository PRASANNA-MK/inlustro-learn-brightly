
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { Home, Book, User, MessageSquare, ChevronLeft, FileText, Users, ClipboardEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const { open, setOpen } = useSidebar();
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
    },
    {
      path: '/exam-preparation',
      label: 'Exam Preparation',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      path: '/teachers',
      label: 'Teachers',
      icon: <Users className="h-4 w-4" />,
    },
    {
      path: '/submissions',
      label: 'Submissions',
      icon: <ClipboardEdit className="h-4 w-4" />,
    },
    {
      path: '/ai-tutor',
      label: 'AI Voice Tutor',
      icon: <Book className="h-4 w-4" />,
    },
    {
      path: '/chatbot',
      label: 'Chatbot',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-64"
        )}
      >
        <div className="h-full w-64 bg-white border-r shadow-sm overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" className="font-bold text-xl">InLustro Admin</Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setOpen(false)}
              className="md:flex hidden" 
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: active }) =>
                    cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      "hover:bg-gray-100 hover:text-gray-900",
                      (active || isActive(item.path))
                        ? "bg-primary text-white"
                        : "text-gray-700"
                    )
                  }
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} InLustro Admin
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Main content adjustment based on sidebar state */}
      <div 
        className={cn(
          "transition-all duration-300",
          open ? "md:ml-64" : "ml-0"
        )}
      />
    </>
  );
};

export default AppSidebar;
