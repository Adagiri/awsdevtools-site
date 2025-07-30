'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Cloud,
  Mail,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const email = searchParams.get('email') || 'user@example.com';
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const verifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    setError('');

    try {
      // Simulate email verification API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure based on token
      if (verificationToken === 'valid-token') {
        setIsVerified(true);
      } else {
        setError('Invalid or expired verification link. Please request a new one.');
      }
    } catch (err) {
      setError('Failed to verify email. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerification = async () => {
    setIsResending(true);
    setError('');

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResendCooldown(60); // 60 second cooldown
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    router.push('/auth/setup-mfa');
  };

  if (isVerifying) {
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
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verifying your email</h1>
            <p className="text-slate-400">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isVerified) {
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
            <h1 className="text-2xl font-bold text-white mb-2">Email verified!</h1>
            <p className="text-slate-400">
              Your email address has been successfully verified
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-white">Verification Complete</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Your account is now verified and ready for the next step
                  </p>
                </div>
                
                <Button
                  onClick={handleContinue}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Continue to Security Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-slate-400">
            We've sent a verification link to <strong className="text-white">{email}</strong>
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Verify your email address</CardTitle>
            <CardDescription className="text-slate-400">
              Click the verification link in your email to continue
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

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">What to do next:</h4>
              <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                <li>Check your email inbox for a message from AWS Dev Tools</li>
                <li>Click the "Verify Email Address" button in the email</li>
                <li>You'll be redirected back here to continue setup</li>
              </ol>
            </div>

            {/* Resend Section */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Didn't receive it?</span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-slate-400">
                  Check your spam folder, or request a new verification email
                </p>
                
                <Button
                  onClick={resendVerification}
                  disabled={isResending || resendCooldown > 0}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  {isResending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend verification email
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center pt-4">
              <Link
                href="/auth/login"
                className="text-sm text-slate-400 hover:text-white"
              >
                ← Back to login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Need help?</h3>
              <p className="text-xs text-slate-400">
                If you continue to have issues receiving the verification email, 
                please contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}