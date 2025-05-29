
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

const ComplaintHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const mockComplaints = [
    {
      id: 'CC001234',
      title: 'Pothole on Main Street',
      category: 'road-safety',
      description: 'Large pothole causing traffic issues near the city center.',
      location: 'Main Street, Near City Mall',
      priority: 'high',
      status: 'resolved',
      dateCreated: '2024-01-10',
      dateResolved: '2024-01-18',
      assignedEmployee: 'John Smith',
      timeline: [
        { date: '2024-01-10', event: 'Complaint submitted', status: 'pending' },
        { date: '2024-01-12', event: 'Assigned to John Smith', status: 'assigned' },
        { date: '2024-01-15', event: 'Work started', status: 'in-progress' },
        { date: '2024-01-18', event: 'Issue resolved', status: 'resolved' }
      ]
    },
    {
      id: 'CC001235',
      title: 'Broken Street Light',
      category: 'street-light',
      description: 'Street light has been non-functional for the past week.',
      location: 'Sector 5, Near Park',
      priority: 'medium',
      status: 'in-progress',
      dateCreated: '2024-01-14',
      assignedEmployee: 'Mary Johnson',
      timeline: [
        { date: '2024-01-14', event: 'Complaint submitted', status: 'pending' },
        { date: '2024-01-16', event: 'Assigned to Mary Johnson', status: 'assigned' },
        { date: '2024-01-18', event: 'Work started', status: 'in-progress' }
      ]
    },
    {
      id: 'CC001236',
      title: 'Garbage Overflow',
      category: 'garbage',
      description: 'Garbage bins overflowing, creating unhygienic conditions.',
      location: 'Park Avenue, Sector 12',
      priority: 'medium',
      status: 'pending',
      dateCreated: '2024-01-19',
      timeline: [
        { date: '2024-01-19', event: 'Complaint submitted', status: 'pending' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'assigned': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedComplaint) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
            ← Back to History
          </Button>
          <Badge className={getStatusColor(selectedComplaint.status)}>
            {selectedComplaint.status.replace('-', ' ')}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{selectedComplaint.title}</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  Complaint ID: {selectedComplaint.id}
                </CardDescription>
              </div>
              <Badge className={getPriorityColor(selectedComplaint.priority)}>
                {selectedComplaint.priority} priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedComplaint.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Submitted: {selectedComplaint.dateCreated}</span>
                  </div>
                  {selectedComplaint.dateResolved && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Resolved: {selectedComplaint.dateResolved}</span>
                    </div>
                  )}
                  {selectedComplaint.assignedEmployee && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Assigned to:</span>
                      <span className="font-medium">{selectedComplaint.assignedEmployee}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-gray-700">{selectedComplaint.description}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Timeline</h3>
              <div className="space-y-4">
                {selectedComplaint.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(event.status).replace('text-', 'bg-').replace('bg-', 'bg-')}`}>
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search complaints..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge className={getStatusColor(complaint.status)}>
                  {complaint.status.replace('-', ' ')}
                </Badge>
                <Badge className={getPriorityColor(complaint.priority)} variant="outline">
                  {complaint.priority}
                </Badge>
              </div>
              
              <h3 className="font-semibold mb-2">{complaint.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{complaint.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{complaint.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{complaint.dateCreated}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>ID: {complaint.id}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedComplaint(complaint)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No complaints found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplaintHistory;
