
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
    <div className="relative overflow-hidden bg-black pt-16 pb-32">
      

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div ref={heroRef} className="stagger-children max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            <span className="block gradient-text pb-2">Where Every Soul Comes Alive</span>
          </h1>
          <p className="mt-6 text-xl text-white max-w-2xl mx-auto">
            At EVEPHORIA, we don't just plan events—we create moments that live forever. We blend artistry, innovation, and precision to craft experiences that are nothing short of magical. From lavish weddings to high-profile corporate affairs, every detail is designed to inspire, engage, and mesmerize. With a tech-driven approach, elite vendor partnerships, and round-the-clock dedication, we transform visions into breathtaking realities. No idea is too bold, no dream too big—if you can imagine it, we can create it.
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
