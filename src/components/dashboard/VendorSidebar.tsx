
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const VendorSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold gradient-text">SimpleVendor</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard" 
                    className={currentPath === '/dashboard' ? 'sidebar-active' : ''}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/events" 
                    className={currentPath === '/dashboard/events' ? 'sidebar-active' : ''}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/services" 
                    className={currentPath === '/dashboard/services' ? 'sidebar-active' : ''}
                  >
                    <ClipboardList className="h-4 w-4" />
                    <span>Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/clients" 
                    className={currentPath === '/dashboard/clients' ? 'sidebar-active' : ''}
                  >
                    <Users className="h-4 w-4" />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/documents" 
                    className={currentPath === '/dashboard/documents' ? 'sidebar-active' : ''}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/chat" 
                    className={currentPath === '/dashboard/chat' ? 'sidebar-active' : ''}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/dashboard/help" 
                    className={currentPath === '/dashboard/help' ? 'sidebar-active' : ''}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Help Center</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="grid grid-cols-2 gap-2">
          <Link 
            to="/dashboard/settings"
            className={`flex items-center justify-center space-x-2 rounded-md p-2 text-sm ${
              currentPath === '/dashboard/settings' 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          
          <Link 
            to="/logout"
            className="flex items-center justify-center space-x-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default VendorSidebar;
