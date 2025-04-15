
import React, { useEffect, useRef } from 'react';
import { 
  Target, 
  BookOpen, 
  Award,
  Heart,
  Users,
  HandshakeIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUs = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const coreValues = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Passion",
      description: "We put our heart into every event, infusing creativity and enthusiasm into every detail."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaboration",
      description: "We believe in working closely with our clients and vendors to create harmonious event experiences."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect, from planning to execution, ensuring memorable events."
    },
    {
      icon: <HandshakeIcon className="h-8 w-8 text-primary" />,
      title: "Integrity",
      description: "We maintain transparency, honesty, and ethical practices in all our business dealings."
    }
  ];

  return (
    <div className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At EVEPHORIA, we don't just plan events— we create moments that live forever. We blend artistry, innovation, and precision to craft experiences that are nothing short of magical. From lavish weddings to high-profile corporate affairs, every detail is designed to inspire, engage, and mesmerize. With a tech-driven approach, elite vendor partnerships, and round-the-clock dedication, we transform visions into breathtaking realities. No idea is too bold, no dream too big— if you can imagine it, we can create it.
          </p>
        </div>

        <div ref={aboutRef} className="stagger-children grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <Card className="bg-secondary/50 border-border shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">
                To revolutionize event planning by connecting passionate event organizers with skilled vendors through our innovative platform. We aim to streamline the entire event management process, making it more efficient, transparent, and enjoyable for all stakeholders.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-border shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-foreground/80">
                To be the leading global platform for event management, where every celebration, conference, and gathering is curated with excellence and delivered with precision. We envision a world where creating memorable events is accessible to everyone, regardless of scale or complexity.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Our Core Values
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <Card key={index} className="bg-secondary/30 border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  {value.icon}
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-foreground/70 text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
