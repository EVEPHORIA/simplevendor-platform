
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventRegistrationForm from '@/components/events/EventRegistration';
import ChatbotInterface from '@/components/shared/ChatbotInterface';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const EventRegistration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to register an event");
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="dark min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="dark min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Event Registration</h1>
            <p className="text-muted-foreground mb-8">Register your event and connect with our professional vendors</p>
            <EventRegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default EventRegistration;
