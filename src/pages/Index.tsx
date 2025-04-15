
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Services from '@/components/home/Services';
import AboutUs from '@/components/home/AboutUs';
import Contact from '@/components/home/Contact';
import ChatbotInterface from '@/components/shared/ChatbotInterface';

const Index = () => {
  return (
    <div className="dark min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutUs />
        <Services />
        <Features />
        <Contact />
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Index;
