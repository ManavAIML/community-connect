
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
  Building,
  X,
  Upload
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
    images: [] as File[]
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB. Please choose a smaller file.`,
          variant: "destructive"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file. Please upload PNG or JPG files only.`,
          variant: "destructive"
        });
        return;
      }

      validFiles.push(file);
    });

    setComplaintForm(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles].slice(0, 5) // Limit to 5 images
    }));

    if (validFiles.length > 0) {
      toast({
        title: "Images uploaded",
        description: `${validFiles.length} image(s) uploaded successfully.`
      });
    }
  };

  const removeImage = (index: number) => {
    setComplaintForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (complaintForm.description.split(' ').length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide at least 10 words describing the issue.",
        variant: "destructive"
      });
      return;
    }

    if (complaintForm.images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image to support your complaint.",
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
      images: complaintForm.images.map(file => file.name)
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
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Report a Community Issue</h2>
          <p className="text-gray-600 dark:text-gray-400">Select the category that best describes your issue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <category.icon className={`w-12 h-12 mx-auto mb-4 text-${category.color}-600 dark:text-${category.color}-400`} />
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{category.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">Important Notice</p>
                <p className="text-blue-700 dark:text-blue-300">
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
  const IconComponent = selectedCategoryData?.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setSelectedCategory('')} className="dark:border-gray-600 dark:text-gray-300">
          ← Back to Categories
        </Button>
        <div className="flex items-center space-x-2">
          {IconComponent && <IconComponent className={`w-6 h-6 text-${selectedCategoryData!.color}-600 dark:text-${selectedCategoryData!.color}-400`} />}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedCategoryData!.label}</h2>
        </div>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Submit Complaint Details</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Please provide detailed information about the issue. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComplaint} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="streetName" className="text-gray-700 dark:text-gray-300">Street Name *</Label>
                <Input
                  id="streetName"
                  placeholder="e.g., MG Road"
                  value={complaintForm.streetName}
                  onChange={(e) => setComplaintForm({ ...complaintForm, streetName: e.target.value })}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Exact Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Near City Mall, Landmark"
                  value={complaintForm.location}
                  onChange={(e) => setComplaintForm({ ...complaintForm, location: e.target.value })}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Issue Description * (Minimum 10 words)</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail. Include when you noticed it, how it affects the community, and any other relevant information..."
                className="min-h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Word count: {complaintForm.description.split(' ').filter(w => w.length > 0).length} / 10 minimum
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-gray-700 dark:text-gray-300">Priority Level *</Label>
                <Select onValueChange={(value) => setComplaintForm({ ...complaintForm, priority: value })}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Select priority" className="dark:placeholder-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    <SelectItem value="low" className="dark:text-gray-100 dark:focus:bg-gray-700">Low - Can wait a few days</SelectItem>
                    <SelectItem value="medium" className="dark:text-gray-100 dark:focus:bg-gray-700">Medium - Should be addressed soon</SelectItem>
                    <SelectItem value="high" className="dark:text-gray-100 dark:focus:bg-gray-700">High - Urgent attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo" className="text-gray-700 dark:text-gray-300">Contact Information *</Label>
                <Input
                  id="contactInfo"
                  placeholder="Phone or email for updates"
                  value={complaintForm.contactInfo}
                  onChange={(e) => setComplaintForm({ ...complaintForm, contactInfo: e.target.value })}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-gray-700 dark:text-gray-300">Upload Images * (Required - At least 1 image)</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload photos of the issue</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 5MB each (Max 5 images)</p>
                </label>
              </div>
              
              {complaintForm.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Uploaded Images ({complaintForm.images.length}/5):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {complaintForm.images.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-32">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t dark:border-gray-600">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• Your complaint will receive a unique ID</p>
                <p>• Expected resolution: 10 working days</p>
                <p>• You'll receive updates via SMS/Email</p>
                <p>• At least one image is required</p>
              </div>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={
                  complaintForm.description.split(' ').filter(w => w.length > 0).length < 10 ||
                  complaintForm.images.length === 0
                }
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
