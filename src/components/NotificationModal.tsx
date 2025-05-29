
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onOpenChange }) => {
  const notifications = [
    {
      id: '1',
      title: 'Complaint Update',
      message: 'Your pothole complaint #12345 has been assigned to a maintenance team.',
      type: 'info',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Issue Resolved',
      message: 'The streetlight issue you reported has been marked as resolved.',
      type: 'success',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'High Priority Alert',
      message: 'Emergency maintenance scheduled in your area tomorrow.',
      type: 'warning',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM.',
      type: 'info',
      time: '2 days ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center dark:text-gray-100">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Stay updated with your complaints and system updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border rounded-lg ${
                !notification.read 
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700' 
                  : 'bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium dark:text-gray-100">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
