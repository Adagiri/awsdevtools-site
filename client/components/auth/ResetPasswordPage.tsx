'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/auth/login');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AWS Dev Tools</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
          <p className="text-slate-400">
            Enter your new password below
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white">Create new password</CardTitle>
            <CardDescription className="text-slate-400">
              Your new password must be different from your previous password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center space-x-2 ${passwordRequirements.length ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordRequirements.uppercase ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordRequirements.lowercase ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordRequirements.number ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordRequirements.special ? 'text-green-400' : 'text-slate-400'}`}>
                      <CheckCircle className="w-3 h-3" />
                      <span>One special character</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !isPasswordValid || formData.password !== formData.confirmPassword}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Resetting password...
                  </>
                ) : (
                  <>
                    Reset password
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
              <p className="text-xs text-slate-400">
                After resetting your password, you'll be signed out of all devices. 
                You'll need to sign in again with your new password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}