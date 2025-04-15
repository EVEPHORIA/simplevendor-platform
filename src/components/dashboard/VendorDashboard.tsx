
import React from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Users, FileText, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 0 },
  { name: 'Apr', value: 0 },
  { name: 'May', value: 0 },
  { name: 'Jun', value: 0 },
  { name: 'Jul', value: 0 },
];

const recentEvents = [
  { id: 1, name: 'Event', date: '2023-10-25', client: 'Client', status: 'Upcoming' },
  
];

const VendorDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Vendor Dashboard</h1>
        <Button>+ Add New Service</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground">Upcoming Events</div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground">Revenue (MTD)</div>
                <div className="text-2xl font-bold">₹0</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground">Active Clients</div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-muted-foreground">Pending Approvals</div>
                <div className="text-2xl font-bold">0</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.filter(event => event.status === 'Upcoming').map((event) => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-md text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{event.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm">{event.client}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Events</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Your recent event activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        event.status === 'Completed' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {event.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasks & Approvals</CardTitle>
            <CardDescription>Your pending tasks and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Document Verification</div>
                  <div className="text-sm text-muted-foreground">0%</div>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Service Listing Completion</div>
                  <div className="text-sm text-muted-foreground">0%</div>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div className="pt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-md text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Insurance Documents Renewal</p>
                    <p className="text-sm text-muted-foreground">Due in 15 days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-md text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Service Agreement Pending</p>
                    <p className="text-sm text-muted-foreground">Review and sign the agreement</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Complete All Tasks</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
