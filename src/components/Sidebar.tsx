
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Book,
  FileQuestion,
  Home,
  Award,
  User,
  MessageSquare,
  Mic,
} from 'lucide-react';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Lessons', url: '/lessons', icon: Book },
  { title: 'Quizzes', url: '/quizzes', icon: FileQuestion },
  { title: 'AI Voice Tutor', url: '/ai-tutor', icon: Mic },
  { title: 'Chatbot', url: '/chatbot', icon: MessageSquare },
  { title: 'Gamification', url: '/gamification', icon: Award },
  { title: 'Profile', url: '/profile', icon: User },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };
  
  const isExpanded = items.some(i => isActive(i.url));

  return (
    <SidebarComponent
      className={collapsed ? "w-14 border-r" : "w-64 border-r"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : "block"}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/'} 
                      className={({ isActive }) => 
                        isActive 
                          ? "flex items-center gap-2 rounded-md bg-inlustro-blue/10 p-2 text-inlustro-blue font-medium"
                          : "flex items-center gap-2 rounded-md p-2 hover:bg-accent"
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default AppSidebar;
