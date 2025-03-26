
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventRegistrationForm from '@/components/events/EventRegistration';
import ChatbotInterface from '@/components/shared/ChatbotInterface';

const EventRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Event Registration</h1>
            <p className="text-gray-600 mb-8">Register your event and connect with our professional vendors</p>
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
