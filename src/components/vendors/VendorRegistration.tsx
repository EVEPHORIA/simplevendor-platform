
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Upload, Check, ChevronRight } from 'lucide-react';

const vendorCategories = [
  'Catering',
  'Photography',
  'Venue',
  'Decoration',
  'Entertainment',
  'Transportation',
  'Security',
  'Cleaning',
  'Other'
];

const VendorRegistration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    taxId: '',
    website: '',
    documents: [],
    services: [],
    serviceArea: '',
    acceptTerms: false
  });

  const updateVendorData = (field: string, value: any) => {
    setVendorData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (step === 1) {
      return vendorData.businessName && 
             vendorData.ownerName && 
             vendorData.email && 
             vendorData.phone && 
             vendorData.category;
    } else if (step === 2) {
      return vendorData.address && 
             vendorData.city && 
             vendorData.state && 
             vendorData.zipCode;
    } else if (step === 3) {
      return vendorData.description && vendorData.serviceArea;
    } else if (step === 4) {
      return vendorData.acceptTerms;
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const fileNames = newFiles.map(file => file.name);
      toast.success(`Uploaded: ${fileNames.join(', ')}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { addDocument } = await import('@/lib/firestore');
      await addDocument('vendors', {
        ...vendorData,
        status: 'pending',
        documents: [], // Reset documents array since we'll handle file upload separately
        registeredAt: new Date().toISOString()
      });

      setLoading(false);
      toast.success('Registration successful! Your account is being reviewed.');
      setStep(5); // Success step
    } catch (error: any) {
      setLoading(false);
      toast.error('Failed to register. Please try again.');
      console.error('Error registering vendor:', error.message);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((i) => (
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
              {i < 4 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${
                    step > i ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Business Info</span>
          <span>Location</span>
          <span>Services</span>
          <span>Review</span>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Business Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName" 
                    placeholder="Your business name" 
                    value={vendorData.businessName}
                    onChange={(e) => updateVendorData('businessName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input 
                    id="ownerName" 
                    placeholder="Full name" 
                    value={vendorData.ownerName}
                    onChange={(e) => updateVendorData('ownerName', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    value={vendorData.email}
                    onChange={(e) => updateVendorData('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    placeholder="(123) 456-7890" 
                    value={vendorData.phone}
                    onChange={(e) => updateVendorData('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Business Category *</Label>
                  <Select 
                    onValueChange={(value) => updateVendorData('category', value)}
                    value={vendorData.category}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendorCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    placeholder="https://www.example.com" 
                    value={vendorData.website}
                    onChange={(e) => updateVendorData('website', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / Business License Number (Optional)</Label>
                <Input 
                  id="taxId" 
                  placeholder="Tax ID or Business License" 
                  value={vendorData.taxId}
                  onChange={(e) => updateVendorData('taxId', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Business Location</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input 
                  id="address" 
                  placeholder="Street address" 
                  value={vendorData.address}
                  onChange={(e) => updateVendorData('address', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    placeholder="City" 
                    value={vendorData.city}
                    onChange={(e) => updateVendorData('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input 
                    id="state" 
                    placeholder="State" 
                    value={vendorData.state}
                    onChange={(e) => updateVendorData('state', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input 
                  id="zipCode" 
                  placeholder="Zip code" 
                  value={vendorData.zipCode}
                  onChange={(e) => updateVendorData('zipCode', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Services Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your business and services..." 
                  rows={4}
                  value={vendorData.description}
                  onChange={(e) => updateVendorData('description', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceArea">Service Area *</Label>
                <Input 
                  id="serviceArea" 
                  placeholder="Areas where you provide services" 
                  value={vendorData.serviceArea}
                  onChange={(e) => updateVendorData('serviceArea', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Documents (Business License, Insurance, etc.)</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Review Your Information</h2>
            
            <Tabs defaultValue="business" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="business">Business Info</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
              
              <TabsContent value="business" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                    <CardDescription>Review your business details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Business Name</p>
                        <p>{vendorData.businessName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Owner Name</p>
                        <p>{vendorData.ownerName}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{vendorData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p>{vendorData.phone}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Category</p>
                        <p>{vendorData.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Website</p>
                        <p>{vendorData.website || 'Not provided'}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Location Information</CardTitle>
                    <CardDescription>Review your address details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p>{vendorData.address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">City</p>
                        <p>{vendorData.city}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">State</p>
                        <p>{vendorData.state}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Zip Code</p>
                        <p>{vendorData.zipCode}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Services Information</CardTitle>
                    <CardDescription>Review your services details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Business Description</p>
                      <p>{vendorData.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service Area</p>
                      <p>{vendorData.serviceArea}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setStep(3)}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={vendorData.acceptTerms}
                  onCheckedChange={(checked) => 
                    updateVendorData('acceptTerms', checked === true)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms of service and privacy policy
                </label>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="animate-fade-in text-center py-8">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-8">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Registration Complete!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for registering as a vendor. We'll review your information and get back to you shortly.
            </p>
            <div className="space-y-4">
              <Button className="px-8">Go to Dashboard</Button>
              <p className="text-sm text-gray-500">
                You should receive a confirmation email shortly.
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
      {step < 5 && renderStepIndicator()}
      {renderForm()}
      
      {step < 5 && (
        <div className="mt-8 pt-6 border-t flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <Button onClick={nextStep}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isStepValid() || loading}
            >
              {loading ? 'Submitting...' : 'Complete Registration'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorRegistration;
