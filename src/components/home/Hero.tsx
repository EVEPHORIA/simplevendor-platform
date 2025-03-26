
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="absolute inset-y-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-20 transform translate-x-1/3 translate-y-1/4"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-20 transform -translate-x-1/3 -translate-y-1/4"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div ref={heroRef} className="stagger-children max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            <span className="block">Effortless Event Management</span>
            <span className="block mt-2 gradient-text">For Vendors and Organizers</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Simplify your event management process with our all-in-one platform. Connect with vendors, organize events, and manage everything seamlessly.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vendor-registration">
              <Button size="lg" className="w-full sm:w-auto group">
                Register as Vendor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/event-registration">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Plan Your Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="animate-on-scroll mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center glass-morphism m-8 rounded-xl border border-white/40 shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-sm text-gray-600 font-medium">SimpleVendor Platform</div>
              </div>
              <div className="pt-12 pb-4 px-4 w-full h-full grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm animate-pulse-soft"></div>
                <div className="col-span-2 grid grid-rows-3 gap-4">
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm animate-pulse-soft delay-100"></div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm animate-pulse-soft delay-200"></div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm animate-pulse-soft delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
