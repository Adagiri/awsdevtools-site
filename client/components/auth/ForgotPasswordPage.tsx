'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AWS Dev Tools</span>
            </Link>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-slate-400">
              We've sent a password reset link to {email}
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center space-y-4">
                <p className="text-slate-300">
                  Click the link in the email to reset your password. 
                  If you don't see it, check your spam folder.
                </p>
                
                <div className="space-y-2">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Try different email
                  </Button>
                  
                  <Link href="/auth/login">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Back to login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-white mb-2">Forgot your password?</h1>
          <p className="text-slate-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white">Reset password</CardTitle>
            <CardDescription className="text-slate-400">
              We'll send you a secure link to reset your password
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
                <Label htmlFor="email" className="text-slate-300">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
              <p className="text-xs text-slate-400">
                For security reasons, we'll only send the reset link to the email address 
                associated with your account. The link will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}