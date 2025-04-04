
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addDocument, queryDocuments } from '@/lib/firestore';
import { toast } from 'sonner';

interface EventData {
  name: string;
  type: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  expectedGuests: string;
  location: string;
  description: string;
  budget: string;
  selectedVendors: number[];
}

export const useEventRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const registerEvent = async (eventData: EventData) => {
    if (!user) {
      toast.error("You must be logged in to register an event");
      return null;
    }

    setLoading(true);
    try {
      // Format date for Firestore
      const formattedEvent = {
        ...eventData,
        date: eventData.date ? eventData.date.toISOString() : null,
        userId: user.uid,
        userEmail: user.email,
        userDisplayName: user.displayName,
        status: 'pending', // pending, confirmed, cancelled
      };

      // Save to Firestore
      const result = await addDocument('events', formattedEvent);
      
      toast.success("Event registration successful!");
      return result;
    } catch (error) {
      console.error("Error registering event:", error);
      toast.error("Failed to register event");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getVendorsByCategory = async (category: string) => {
    try {
      return await queryDocuments('vendors', 'category', '==', category);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      return [];
    }
  };

  return {
    registerEvent,
    getVendorsByCategory,
    loading
  };
};
