
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Captcha from '../Captcha';
import { supabase } from '@/integrations/supabase/client';

interface SignUpProps {
  onAuth: (isAuthenticated: boolean) => void;
  onSwitchToSignIn?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onAuth, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '',
    governmentId: '',
    officialNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast({
        title: "Security Check Required",
        description: "Please complete the captcha verification.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Validate government/employee specific fields
    if ((formData.userType === 'government' || formData.userType === 'employee')) {
      if (!formData.governmentId) {
        toast({
          title: "Government ID Required",
          description: "Please enter your government ID.",
          variant: "destructive"
        });
        return;
      }

      if (!formData.officialNumber) {
        toast({
          title: "Official Number Required",
          description: "Please enter your official number.",
          variant: "destructive"
        });
        return;
      }

      if (!/^\d{8}$/.test(formData.officialNumber)) {
        toast({
          title: "Invalid Official Number",
          description: "Official number must be exactly 8 digits.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            user_type: formData.userType,
            government_id: formData.governmentId,
            official_number: formData.officialNumber,
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Update the profile with additional information
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: formData.name,
            phone: formData.phone,
            user_type: formData.userType,
            government_id: formData.governmentId,
            official_number: formData.officialNumber,
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }

        toast({
          title: "Account Created!",
          description: "Your account has been successfully created. Please check your email to verify your account.",
        });
        
        onAuth(true);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during signup.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isGovernmentOrEmployee = formData.userType === 'government' || formData.userType === 'employee';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Account</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Join Community Connect today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-gray-700 dark:text-gray-300">Account Type *</Label>
              <Select onValueChange={(value) => handleInputChange('userType', value)}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue placeholder="Select account type" className="dark:text-gray-400" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  <SelectItem value="user" className="dark:text-gray-100 dark:focus:bg-gray-700">Citizen</SelectItem>
                  <SelectItem value="government" className="dark:text-gray-100 dark:focus:bg-gray-700">Government Official</SelectItem>
                  <SelectItem value="employee" className="dark:text-gray-100 dark:focus:bg-gray-700">Municipal Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isGovernmentOrEmployee && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="governmentId" className="text-gray-700 dark:text-gray-300">Government ID *</Label>
                  <Input
                    id="governmentId"
                    type="text"
                    placeholder="Enter your government ID"
                    value={formData.governmentId}
                    onChange={(e) => handleInputChange('governmentId', e.target.value)}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officialNumber" className="text-gray-700 dark:text-gray-300">Official Number *</Label>
                  <Input
                    id="officialNumber"
                    type="text"
                    placeholder="Enter 8-digit official number"
                    value={formData.officialNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                      handleInputChange('officialNumber', value);
                    }}
                    required
                    maxLength={8}
                    pattern="\d{8}"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Must be exactly 8 digits</p>
                </div>
              </>
            )}

            <Captcha 
              onVerify={setIsCaptchaVerified}
              isVerified={isCaptchaVerified}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              disabled={isLoading || !isCaptchaVerified}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal text-blue-600 dark:text-blue-400"
              onClick={onSwitchToSignIn}
            >
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
