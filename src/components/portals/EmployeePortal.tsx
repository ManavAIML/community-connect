
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  AlertTriangle, 
  Camera, 
  CheckCircle, 
  Calendar,
  MapPin,
  Phone,
  FileText
} from 'lucide-react';

const EmployeePortal = () => {
  const mockAssignedTasks = [
    {
      id: 'CC001234',
      title: 'Fix Pothole on Main Street',
      description: 'Large pothole causing traffic issues near the city center.',
      location: 'Main Street, Near City Mall',
      priority: 'high',
      deadline: '2024-01-20',
      daysLeft: 3,
      citizenContact: '+91 9876543210',
      assignedDate: '2024-01-15'
    },
    {
      id: 'CC001235',
      title: 'Replace Broken Street Light',
      description: 'Street light has been non-functional for the past week.',
      location: 'Sector 5, Near Park',
      priority: 'medium',
      deadline: '2024-01-22',
      daysLeft: 5,
      citizenContact: '+91 9876543211',
      assignedDate: '2024-01-16'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 1) return 'text-red-600';
    if (daysLeft <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleMarkComplete = (taskId: string) => {
    console.log(`Marking task ${taskId} as complete`);
    // In real app, this would update the database
  };

  const handleUploadProof = (taskId: string) => {
    console.log(`Uploading proof for task ${taskId}`);
    // In real app, this would handle file upload
  };

  return (
    <div className="space-y-6">
      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Due Today</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Performance Notice</p>
              <p className="text-sm text-yellow-700">
                You have 1 overdue task. Please complete it to avoid warnings. Current warnings: 2/5
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Tasks</CardTitle>
          <CardDescription>Tasks assigned by government officials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockAssignedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm text-gray-600">{task.id}</span>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${getUrgencyColor(task.daysLeft)}`}>
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {task.daysLeft > 0 ? `${task.daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{task.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{task.citizenContact}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="flex items-center space-x-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUploadProof(task.id)}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Proof
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleMarkComplete(task.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tasks Completed On Time</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Average Resolution Time</span>
                  <span>4.2 days</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Performance Score:</span> Good (7.8/10)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              Request Extension
            </Button>
            <Button className="w-full" variant="outline">
              Report Equipment Issue
            </Button>
            <Button className="w-full" variant="outline">
              View Work Schedule
            </Button>
            <Button className="w-full" variant="outline">
              Contact Supervisor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePortal;
