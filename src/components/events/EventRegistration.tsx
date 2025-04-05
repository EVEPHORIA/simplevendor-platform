
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, ChevronRight, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Conference',
  'Concert',
  'Exhibition',
  'Trade Show',
  'Seminar',
  'Other',
];

const mockVendors = [
  { id: 1, name: 'Delicious Catering Co.', category: 'Catering', rating: 4.8 },
  { id: 2, name: 'Perfect Moments Photography', category: 'Photography', rating: 4.9 },
  { id: 3, name: 'Grand Plaza', category: 'Venue', rating: 4.7 },
  { id: 4, name: 'Elegant Decor', category: 'Decoration', rating: 4.6 },
  { id: 5, name: 'Rhythm Band', category: 'Entertainment', rating: 4.9 },
  { id: 6, name: 'Safe Rides', category: 'Transportation', rating: 4.5 },
  { id: 7, name: 'Security Plus', category: 'Security', rating: 4.7 },
  { id: 8, name: 'Clean Team', category: 'Cleaning', rating: 4.6 },
];

// Add these imports at the top with other imports
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const EventRegistration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [eventData, setEventData] = useState({
    name: '',
    type: '',
    date: undefined as Date | undefined,
    startTime: '',
    endTime: '',
    expectedGuests: '',
    location: '',
    description: '',
    budget: '',
    selectedVendors: [] as number[],
  });

  const updateEventData = (field: string, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const toggleVendorSelection = (vendorId: number) => {
    setEventData(prev => {
      const isSelected = prev.selectedVendors.includes(vendorId);
      return {
        ...prev,
        selectedVendors: isSelected
          ? prev.selectedVendors.filter(id => id !== vendorId)
          : [...prev.selectedVendors, vendorId]
      };
    });
  };

  const isStepValid = () => {
    if (step === 1) {
      return eventData.name && 
             eventData.type && 
             eventData.date && 
             eventData.startTime && 
             eventData.location;
    } else if (step === 2) {
      return eventData.selectedVendors.length > 0;
    }
    
    return false;
  };

  const nextStep = () => {
    if (isStepValid()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const db = getFirestore();
      const doc = await addDoc(collection(db, "events"), {
        ...eventData,
        date: eventData.date ? eventData.date.toISOString() : null, // Convert Date to ISO string
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      console.log('Event added with ID: ', doc.id);
      setLoading(false);
      toast.success('Event registration successful!');
      setStep(3);
    } catch (error: any) {
      setLoading(false);
      toast.error('Failed to register event. Please try again.');
      console.error('Error registering event:', error.message);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  step >= i 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > i ? <Check size={18} /> : i}
              </div>
              {i < 2 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    step > i ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-gray-500">
          <span>Event Details</span>
          <span>Select Vendors</span>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Name of your event" 
                    value={eventData.name}
                    onChange={(e) => updateEventData('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type *</Label>
                  <Select 
                    onValueChange={(value) => updateEventData('type', value)}
                    value={eventData.type}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventData.date ? format(eventData.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventData.date}
                        onSelect={(date) => updateEventData('date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <div className="relative">
                    <Input 
                      id="startTime" 
                      type="time"
                      value={eventData.startTime}
                      onChange={(e) => updateEventData('startTime', e.target.value)}
                      className="pl-10"
                    />
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Input 
                      id="endTime" 
                      type="time"
                      value={eventData.endTime}
                      onChange={(e) => updateEventData('endTime', e.target.value)}
                      className="pl-10"
                    />
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location *</Label>
                  <Input 
                    id="location" 
                    placeholder="Address or venue name" 
                    value={eventData.location}
                    onChange={(e) => updateEventData('location', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedGuests">Expected Number of Guests</Label>
                  <Input 
                    id="expectedGuests" 
                    type="number" 
                    placeholder="e.g., 100" 
                    value={eventData.expectedGuests}
                    onChange={(e) => updateEventData('expectedGuests', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event..." 
                  rows={3}
                  value={eventData.description}
                  onChange={(e) => updateEventData('description', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <Input 
                  id="budget" 
                  placeholder="Enter your budget" 
                  value={eventData.budget}
                  onChange={(e) => updateEventData('budget', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Select Vendors for Your Event</h2>
            
            <div className="mb-6">
              <p className="text-gray-600">
                Choose the vendors you'd like to work with for your event. 
                You can select multiple vendors across different categories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {mockVendors.map((vendor) => (
                <Card 
                  key={vendor.id} 
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    eventData.selectedVendors.includes(vendor.id) 
                      ? "border-primary shadow-md" 
                      : "hover:border-gray-300"
                  )}
                  onClick={() => toggleVendorSelection(vendor.id)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <p className="text-sm text-gray-500">{vendor.category}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(vendor.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.585l-7.07 3.77 1.35-7.854L.636 7.02l7.91-1.15L10 0l2.455 5.868 7.91 1.15-4.644 4.482 1.35 7.854L10 15.585z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">{vendor.rating}</span>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "h-6 w-6 rounded-full border flex items-center justify-center transition-colors",
                      eventData.selectedVendors.includes(vendor.id)
                        ? "bg-primary border-primary text-white"
                        : "border-gray-300"
                    )}>
                      {eventData.selectedVendors.includes(vendor.id) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Selected vendors: {eventData.selectedVendors.length}
              </p>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in text-center py-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-8">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Registration Complete!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Your event has been registered successfully. The selected vendors will be notified about your event.
            </p>
            <div className="space-y-4">
              <Button className="px-8">Go to Dashboard</Button>
              <p className="text-sm text-gray-500">
                You should receive a confirmation email shortly with your event details.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {step < 3 && renderStepIndicator()}
      {renderForm()}
      
      {step < 3 && (
        <div className="mt-8 pt-6 border-t flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 2 ? (
            <Button onClick={nextStep}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepValid() || loading}>
              {loading ? 'Submitting...' : 'Complete Registration'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistration;
