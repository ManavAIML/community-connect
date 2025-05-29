
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, MapPin, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const GovernmentPortal = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  
  const mockComplaints = [
    {
      id: 'CC001234',
      title: 'Pothole on Main Street',
      category: 'road-safety',
      description: 'Large pothole causing traffic issues near the city center. Multiple vehicles have been damaged and it poses a safety risk to commuters.',
      location: 'Main Street, Near City Mall',
      priority: 'high',
      status: 'pending',
      dateCreated: '2024-01-15',
      citizenContact: '+91 9876543210',
      assignedEmployee: null
    },
    {
      id: 'CC001235',
      title: 'Broken Street Light',
      category: 'street-light',
      description: 'Street light has been non-functional for the past week, creating safety concerns for pedestrians during night hours.',
      location: 'Sector 5, Near Park',
      priority: 'medium',
      status: 'assigned',
      dateCreated: '2024-01-14',
      citizenContact: '+91 9876543211',
      assignedEmployee: 'John Smith'
    }
  ];

  const mockEmployees = [
    { id: '1', name: 'John Smith', department: 'Electrical', workload: 3 },
    { id: '2', name: 'Mary Johnson', department: 'Roads', workload: 5 },
    { id: '3', name: 'David Wilson', department: 'Sanitation', workload: 2 },
    { id: '4', name: 'Sarah Brown', department: 'Traffic', workload: 4 }
  ];

  const handleAssignEmployee = (complaintId: string, employeeId: string) => {
    console.log(`Assigning employee ${employeeId} to complaint ${complaintId}`);
    // In real app, this would update the database
  };

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Complaints Requiring Action</CardTitle>
              <CardDescription>Review and assign complaints to employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{complaint.id}</span>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status}
                          </Badge>
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority} priority
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{complaint.title}</h3>
                      </div>
                      <span className="text-sm text-gray-500">{complaint.dateCreated}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{complaint.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{complaint.location}</span>
                      </div>
                    </div>

                    {complaint.status === 'pending' && (
                      <div className="flex items-center space-x-4">
                        <Select onValueChange={(value) => handleAssignEmployee(complaint.id, value)}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Assign to employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockEmployees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.name} ({employee.department}) - {employee.workload} tasks
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="sm">Assign</Button>
                      </div>
                    )}

                    {complaint.assignedEmployee && (
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600">Assigned to: {complaint.assignedEmployee}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Employee Workload</CardTitle>
              <CardDescription>Current task distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{employee.workload}</p>
                      <p className="text-sm text-gray-600">tasks</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Employees
              </Button>
              <Button className="w-full" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View Overdue Tasks
              </Button>
              <Button className="w-full" variant="outline">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GovernmentPortal;
