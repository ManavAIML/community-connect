
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Phone, 
  FileText,
  Construction,
  Lightbulb,
  Trash,
  Car,
  Users,
  Search,
  Shield,
  Building
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const UserPortal = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [complaintForm, setComplaintForm] = useState({
    streetName: '',
    location: '',
    description: '',
    priority: '',
    contactInfo: '',
    images: []
  });
  const { user, complaints, setComplaints } = useUser();

  const categories = [
    { id: 'road-safety', label: 'Road Safety & Potholes', icon: Construction, color: 'red' },
    { id: 'street-light', label: 'Street Light', icon: Lightbulb, color: 'yellow' },
    { id: 'garbage', label: 'Garbage Waste', icon: Trash, color: 'green' },
    { id: 'traffic', label: 'Traffic Problems', icon: Car, color: 'blue' },
    { id: 'vendors', label: 'Street Vendor Issues', icon: Users, color: 'purple' },
    { id: 'missing-person', label: 'Missing Person', icon: Search, color: 'orange' },
    { id: 'public-safety', label: 'Public Safety', icon: Shield, color: 'red' },
    { id: 'infrastructure', label: 'Infrastructure Issue', icon: Building, color: 'gray' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (complaintForm.description.split(' ').length < 40) {
      toast({
        title: "Description too short",
        description: "Please provide at least 40 words describing the issue.",
        variant: "destructive"
      });
      return;
    }

    const newComplaint = {
      id: Date.now().toString(),
      title: categories.find(c => c.id === selectedCategory)?.label || 'New Complaint',
      category: selectedCategory,
      description: complaintForm.description,
      location: `${complaintForm.streetName}, ${complaintForm.location}`,
      priority: complaintForm.priority as 'low' | 'medium' | 'high',
      status: 'pending' as const,
      dateCreated: new Date().toISOString(),
      images: complaintForm.images
    };

    setComplaints([...complaints, newComplaint]);
    
    // Generate mock complaint ID
    const complaintId = `CC${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Complaint Submitted Successfully!",
      description: `Your complaint ID is: ${complaintId}. We'll resolve this within 10 working days.`
    });

    // Reset form
    setComplaintForm({
      streetName: '',
      location: '',
      description: '',
      priority: '',
      contactInfo: '',
      images: []
    });
    setSelectedCategory('');
  };

  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Report a Community Issue</h2>
          <p className="text-gray-600">Select the category that best describes your issue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <category.icon className={`w-12 h-12 mx-auto mb-4 text-${category.color}-600`} />
                <h3 className="font-medium text-sm">{category.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Important Notice</p>
                <p className="text-blue-700">
                  Please ensure your complaint is genuine. False complaints may result in a 15-day suspension of your account.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setSelectedCategory('')}>
          ← Back to Categories
        </Button>
        <div className="flex items-center space-x-2">
          <selectedCategoryData!.icon className={`w-6 h-6 text-${selectedCategoryData!.color}-600`} />
          <h2 className="text-xl font-bold">{selectedCategoryData!.label}</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Complaint Details</CardTitle>
          <CardDescription>
            Please provide detailed information about the issue. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComplaint} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="streetName">Street Name *</Label>
                <Input
                  id="streetName"
                  placeholder="e.g., MG Road"
                  value={complaintForm.streetName}
                  onChange={(e) => setComplaintForm({ ...complaintForm, streetName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Exact Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Near City Mall, Landmark"
                  value={complaintForm.location}
                  onChange={(e) => setComplaintForm({ ...complaintForm, location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Issue Description * (Minimum 40 words)</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail. Include when you noticed it, how it affects the community, and any other relevant information..."
                className="min-h-32"
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500">
                Word count: {complaintForm.description.split(' ').filter(w => w.length > 0).length} / 40 minimum
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level *</Label>
                <Select onValueChange={(value) => setComplaintForm({ ...complaintForm, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Can wait a few days</SelectItem>
                    <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                    <SelectItem value="high">High - Urgent attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information *</Label>
                <Input
                  id="contactInfo"
                  placeholder="Phone or email for updates"
                  value={complaintForm.contactInfo}
                  onChange={(e) => setComplaintForm({ ...complaintForm, contactInfo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Upload Images (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload photos of the issue</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">
                <p>• Your complaint will receive a unique ID</p>
                <p>• Expected resolution: 10 working days</p>
                <p>• You'll receive updates via SMS/Email</p>
              </div>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={complaintForm.description.split(' ').filter(w => w.length > 0).length < 40}
              >
                <FileText className="w-4 h-4 mr-2" />
                Submit Complaint
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPortal;
