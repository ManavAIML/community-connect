
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOpenChange }) => {
  const { user } = useUser();

  if (!user) return null;

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'government':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'employee':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center dark:text-gray-100">
            <User className="w-5 h-5 mr-2" />
            Profile
          </DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Your account information and details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">{user.name?.[0]?.toUpperCase()}</span>
            </div>
            <h3 className="text-xl font-semibold dark:text-gray-100">{user.name}</h3>
            <Badge className={getUserTypeColor(user.userType)}>
              {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
            </Badge>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.phone}</p>
                  </div>
                </div>
              )}
              
              {user.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Account Details</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">User ID</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{user.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-200">Member Since</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">January 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
