
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        ...formData
      });
    }
    
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100">Settings</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-gray-100">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="dark:text-gray-200">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-gray-100">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="dark:text-gray-200">Dark Mode</Label>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Toggle between light and dark themes</p>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  <SelectItem value="en" className="dark:text-gray-100 dark:focus:bg-gray-700">English</SelectItem>
                  <SelectItem value="es" className="dark:text-gray-100 dark:focus:bg-gray-700">Spanish</SelectItem>
                  <SelectItem value="fr" className="dark:text-gray-100 dark:focus:bg-gray-700">French</SelectItem>
                  <SelectItem value="de" className="dark:text-gray-100 dark:focus:bg-gray-700">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-gray-100">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="dark:text-gray-200">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Receive notifications about complaint updates</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="dark:text-gray-200">Email Updates</Label>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Get email notifications for important updates</p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium dark:text-gray-100">Preferences</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="dark:text-gray-200">Auto-save drafts</Label>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Automatically save complaint drafts</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button onClick={handleSave} className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
