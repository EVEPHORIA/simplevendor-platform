
import React from 'react';
import VendorDashboard from '@/components/dashboard/VendorDashboard';
import DashboardLayout from '@/components/dashboard/Dashboard';

const Dashboard = () => {
  return (
    <div>
      <DashboardLayout>
        <VendorDashboard />
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
