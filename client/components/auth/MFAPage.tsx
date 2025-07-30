'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Cloud,
  Shield,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Smartphone
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function MFAPage() {
  const { verifyMFA } = useAuth();
  const router = useRouter();
  const [mfaCode, setMfaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await verifyMFA(mfaCode);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // Simulate resend functionality
    setError('');
    // In real implementation, this would trigger a new code
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
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h1>
          <p className="text-slate-400">
            Enter the verification code from your authenticator app
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-orange-500" />
              Verify Your Identity
            </CardTitle>
            <CardDescription className="text-slate-400">
              {useBackupCode 
                ? 'Enter one of your backup codes'
                : 'Open your authenticator app and enter the 6-digit code'
              }
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

            {/* MFA Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mfaCode" className="text-slate-300">
                  {useBackupCode ? 'Backup Code' : 'Verification Code'}
                </Label>
                <Input
                  id="mfaCode"
                  type="text"
                  placeholder={useBackupCode ? 'XXXX-XXXX' : '000000'}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="text-center text-2xl tracking-widest bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                  maxLength={useBackupCode ? 9 : 6}
                  required
                />
                <p className="text-xs text-slate-400 text-center">
                  {useBackupCode 
                    ? 'Enter the backup code including the dash'
                    : 'Enter the 6-digit code from your authenticator app'
                  }
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || mfaCode.length < (useBackupCode ? 9 : 6)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Alternative Options */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Having trouble?</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setUseBackupCode(!useBackupCode)}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {useBackupCode ? 'Use authenticator app instead' : 'Use backup code instead'}
                </Button>

                {!useBackupCode && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend code
                  </Button>
                )}
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

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
              <p className="text-xs text-slate-400">
                Two-factor authentication adds an extra layer of security to your account. 
                Never share your verification codes with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}