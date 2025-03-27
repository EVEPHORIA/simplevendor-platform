
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import VendorSidebar from './VendorSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <VendorSidebar />
        <main className="flex-1 overflow-auto">
          <div className="flex items-center h-16 px-4 border-b bg-white">
            <SidebarTrigger />
            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </button>
                
                {/* Profile */}
                <div className="relative">
                  <button className="flex items-center space-x-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      JD
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
