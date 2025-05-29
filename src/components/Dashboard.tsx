
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  User, 
  Settings, 
  History, 
  Bell, 
  Search,
  Menu,
  X,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import UserPortal from './portals/UserPortal';
import GovernmentPortal from './portals/GovernmentPortal';
import EmployeePortal from './portals/EmployeePortal';
import ComplaintHistory from './ComplaintHistory';
import HelpCenter from './HelpCenter';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, complaints } = useUser();

  const stats = [
    { title: 'Total Complaints', value: '156', icon: FileText, color: 'blue' },
    { title: 'Pending', value: '23', icon: Clock, color: 'yellow' },
    { title: 'In Progress', value: '45', icon: AlertCircle, color: 'orange' },
    { title: 'Resolved', value: '88', icon: CheckCircle, color: 'green' }
  ];

  const recentComplaints = [
    { id: '1', title: 'Pothole on Main Street', status: 'pending', area: 'Downtown', time: '2 hours ago' },
    { id: '2', title: 'Broken Streetlight', status: 'in-progress', area: 'Sector 5', time: '5 hours ago' },
    { id: '3', title: 'Garbage Overflow', status: 'resolved', area: 'Park Avenue', time: '1 day ago' },
    { id: '4', title: 'Traffic Signal Issue', status: 'pending', area: 'City Center', time: '3 hours ago' }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'user-portal', label: 'Report Issue', icon: FileText },
    { id: 'history', label: 'My Complaints', icon: History },
    { id: 'government-portal', label: 'Government Portal', icon: User, roles: ['government'] },
    { id: 'employee-portal', label: 'Employee Portal', icon: User, roles: ['employee'] },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'user-portal':
        return <UserPortal />;
      case 'government-portal':
        return <GovernmentPortal />;
      case 'employee-portal':
        return <EmployeePortal />;
      case 'history':
        return <ComplaintHistory />;
      case 'help':
        return <HelpCenter />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="opacity-90">Track community issues and help make your neighborhood better.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Complaints */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Complaints in Your Area</CardTitle>
                <CardDescription>Stay updated with community issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium">{complaint.title}</h3>
                        <p className="text-sm text-gray-600">{complaint.area} • {complaint.time}</p>
                      </div>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CC</span>
                </div>
                <span className="font-bold text-gray-900">Community Connect</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems
            .filter(item => !item.roles || item.roles.includes(user?.userType || ''))
            .map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {sidebarOpen && <span className="ml-2">{item.label}</span>}
              </Button>
            ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600 space-y-1">
              <p>Emergency: 100</p>
              <p>Support: testprofilecode@gmail.com</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user?.name?.[0]}</span>
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
