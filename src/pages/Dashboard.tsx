
import React from 'react';
import DashboardLayout from '@/components/dashboard/Dashboard';
import VendorDashboard from '@/components/dashboard/VendorDashboard';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <VendorDashboard />
    </DashboardLayout>
  );
};

export default Dashboard;
