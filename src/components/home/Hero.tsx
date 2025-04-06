
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
            <span className="block gradient-text pb-2">Where Every Soul Comes Alive</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to EVEPHORIA — where every event becomes an experience. We blend innovation with emotion, style with strategy, and detail with drama to create unforgettable moments. Whether it's a grand corporate affair, a luxury private gathering, or an electrifying youth celebration — we don't just plan events, we create EVEPHORIA.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link to={user ? "/event-registration" : "/login"}>
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                Plan Your Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="aspect-video relative">
            <iframe
              src="https://www.youtube.com/embed/TazDN6D9pl4"
              title="EVEPHORIA Platform Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Hero;
