
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
      <div className="min-h-screen w-full bg-gray-50">
        <Header />
        <div className="flex pt-16 min-h-[calc(100vh-4rem)]"> {/* Fixed height calculation */}
          <AppSidebar />
          <main className="flex-1 p-4 md:p-6 overflow-auto"> {/* Added overflow handling */}
            <div className="mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
