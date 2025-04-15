import React, { useRef, useEffect } from 'react';
import { Building2, ShoppingBag, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Building2,
    title: 'CORPORATE EVENTS',
    description: 'Professional event solutions for businesses including conferences, seminars, team building activities, and corporate celebrations.'
  },
  {
    icon: ShoppingBag,
    title: 'COMMERCIAL EVENTS',
    description: 'Strategic event planning for product launches, trade shows, exhibitions, and marketing campaigns that drive business growth.'
  },
  {
    icon: Crown,
    title: 'CROWNED EVENTS',
    description: 'Luxury event services for high-profile occasions, VIP gatherings, and exclusive celebrations that demand exceptional attention to detail.'
  }
];

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

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

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <div className="py-24 bg-black" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At EVEPHORIA: The Event Planners, we don't just plan events—we craft immersive realities that evoke emotion, spark connections, and leave lasting impressions. Our signature 3C Model represents the essence of what we do best—Crowned Events, Corporate Events, Commercial Events
          </p>
        </div>

        <div
          ref={servicesRef}
          className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-secondary/50 border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-foreground/70">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;