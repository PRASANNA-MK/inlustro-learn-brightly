
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { Home, Book, GraduationCap, User, MessageSquare } from 'lucide-react';

const AppSidebar = () => {
  const { open, setOpen } = useSidebar();

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
    },
    {
      path: '/lessons',
      label: 'Lessons',
      icon: <Book className="h-4 w-4" />,
    },
    {
      path: '/quizzes',
      label: 'Quizzes',
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      path: '/ai-tutor',
      label: 'AI Voice Tutor',
      icon: <GraduationCap className="h-4 w-4" />,
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

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-full flex-col justify-between overflow-y-auto border-r bg-sidebar shadow-md transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : '-translate-x-full'
      } w-64`}
    >
      <div className="px-6 py-4">
        <Link to="/" className="mb-6 inline-block">
          <span className="font-bold text-xl">InLustro</span>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t px-6 py-4">
        <p className="text-xs text-sidebar-foreground">
          © {new Date().getFullYear()} InLustro
        </p>
      </div>
    </aside>
  );
};

export default AppSidebar;
