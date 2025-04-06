
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Contact from '@/components/home/Contact';
import ChatbotInterface from '@/components/shared/ChatbotInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Index;
