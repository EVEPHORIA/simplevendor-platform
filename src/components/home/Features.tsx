
import React, { useEffect, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart4, 
  ShieldCheck 
} from 'lucide-react';

const features = [
  {
    name: 'Vendor Registration',
    description: 'Easily register as a vendor, list your services, and upload required documents.',
    icon: Users,
  },
  {
    name: 'Event Registration',
    description: 'Quickly register events and select services from our network of qualified vendors.',
    icon: Calendar,
  },
  {
    name: 'Automated Agreements',
    description: 'Generate and manage vendor agreements and contracts automatically.',
    icon: FileText,
  },
  {
    name: 'AI-Powered Chatbot',
    description: 'Get instant assistance with our ChatGPT-powered chatbot, available 24/7.',
    icon: MessageSquare,
  },
  {
    name: 'Comprehensive Dashboard',
    description: 'Track all your bookings, services, and business analytics in one place.',
    icon: BarChart4,
  },
  {
    name: 'Secure & Reliable',
    description: 'Enterprise-grade security ensures your data and transactions are always protected.',
    icon: ShieldCheck,
  },
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-One Event Management Solution
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform offers a comprehensive suite of tools to streamline every aspect of event planning and vendor management.
          </p>
        </div>

        <div ref={featuresRef} className="stagger-children grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="ml-20">
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
