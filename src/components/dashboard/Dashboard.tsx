
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import VendorSidebar from './VendorSidebar';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const userInitials = user?.displayName 
    ? user.displayName.split(' ').map(name => name[0].toUpperCase()).join('')
    : 'U';

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
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {/* Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1">
                      <Avatar>
                        <AvatarImage src={user?.photoURL || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuLabel>
                      <div className="font-normal">
                        <div className="text-sm font-medium">{user?.displayName}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{user?.email}</div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
