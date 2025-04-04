
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addDocument } from '@/lib/firestore';
import { toast } from 'sonner';

interface VendorData {
  businessName: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const useVendorRegistration = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const registerVendor = async (vendorData: VendorData) => {
    if (!user) {
      toast.error("You must be logged in to register as a vendor");
      return null;
    }

    setLoading(true);
    try {
      // Add user ID to vendor data
      const vendorWithUserId = {
        ...vendorData,
        userId: user.uid,
        userEmail: user.email,
        userDisplayName: user.displayName,
        status: 'pending', // pending, approved, rejected
      };

      // Save to Firestore
      const result = await addDocument('vendors', vendorWithUserId);
      
      toast.success("Vendor registration successful!");
      return result;
    } catch (error) {
      console.error("Error registering vendor:", error);
      toast.error("Failed to register vendor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerVendor,
    loading
  };
};
