
import React from 'react';
import Header from './Header';
import AppSidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1 w-full relative">
          <AppSidebar />
          <main className="flex-1 transition-all duration-300 p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
