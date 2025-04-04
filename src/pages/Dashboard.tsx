
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorDashboard from '@/components/dashboard/VendorDashboard';
import DashboardLayout from '@/components/dashboard/Dashboard';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div>
      <DashboardLayout>
        <VendorDashboard />
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
