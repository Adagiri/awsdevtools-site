'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud,
  Shield,
  Smartphone,
  QrCode,
  Copy,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function MFASetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mfaCode, setMfaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  // Mock MFA setup data
  const [mfaSetup] = useState({
    secret: 'JBSWY3DPEHPK3PXP',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    backupCodes: [
      'A1B2-C3D4',
      'E5F6-G7H8',
      'I9J0-K1L2',
      'M3N4-O5P6',
      'Q7R8-S9T0',
      'U1V2-W3X4',
      'Y5Z6-A7B8',
      'C9D0-E1F2'
    ]
  });

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate MFA verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mfaCode === '123456') {
        setStep(3);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadBackupCodes = () => {
    const content = `AWS Dev Tools - Backup Codes\nGenerated: ${new Date().toLocaleString()}\n\n${mfaSetup.backupCodes.join('\n')}\n\nKeep these codes safe and secure!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aws-dev-tools-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <h1 className="text-2xl font-bold text-white mb-2">Setup Two-Factor Authentication</h1>
          <p className="text-slate-400">
            Secure your account with an additional layer of protection
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-slate-700'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-slate-700'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Download App */}
        {step === 1 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-orange-500" />
                Install Authenticator App
              </CardTitle>
              <CardDescription className="text-slate-400">
                Download an authenticator app to generate verification codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Recommended Apps:</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Google Authenticator</div>
                      <div className="text-sm text-slate-400">Free • iOS & Android</div>
                    </div>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Popular
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Authy</div>
                      <div className="text-sm text-slate-400">Free • iOS & Android</div>
                    </div>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      Backup
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Microsoft Authenticator</div>
                      <div className="text-sm text-slate-400">Free • iOS & Android</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Smartphone className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-white mb-1">Setup Instructions</div>
                    <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                      <li>Download and install one of the apps above</li>
                      <li>Open the app and set up your account</li>
                      <li>Click "Continue" when ready to scan the QR code</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Scan QR Code */}
        {step === 2 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-orange-500" />
                Scan QR Code
              </CardTitle>
              <CardDescription className="text-slate-400">
                Use your authenticator app to scan this QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <div className="w-48 h-48 bg-slate-200 rounded flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Manual Entry */}
              <div className="space-y-3">
                <h4 className="font-medium text-white">Can't scan? Enter manually:</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    value={mfaSetup.secret}
                    readOnly
                    className="bg-slate-900/50 border-slate-600 text-white font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mfaSetup.secret)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-400">
                  Enter this code manually in your authenticator app
                </p>
              </div>

              {/* Verification */}
              <div className="space-y-4">
                <h4 className="font-medium text-white">Verify Setup:</h4>
                
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                )}

                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mfaCode" className="text-slate-300">
                      Enter 6-digit code from your app
                    </Label>
                    <Input
                      id="mfaCode"
                      type="text"
                      placeholder="000000"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      className="text-center text-2xl tracking-widest bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || mfaCode.length !== 6}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify & Continue'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Backup Codes */}
        {step === 3 && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Save Backup Codes
              </CardTitle>
              <CardDescription className="text-slate-400">
                Store these codes safely - you'll need them if you lose access to your phone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-white mb-1">Important!</div>
                    <p className="text-sm text-slate-400">
                      Each backup code can only be used once. Store them in a secure location 
                      like a password manager or safe place.
                    </p>
                  </div>
                </div>
              </div>

              {/* Backup Codes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Your Backup Codes</h4>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowBackupCodes(!showBackupCodes)}
                      className="text-slate-400 hover:text-white"
                    >
                      {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={downloadBackupCodes}
                      className="text-slate-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 p-4 bg-slate-900/30 rounded-lg">
                  {mfaSetup.backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="p-2 bg-slate-800/50 rounded text-center font-mono text-sm text-white"
                    >
                      {showBackupCodes ? code : '••••-••••'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    id="saved"
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 bg-slate-900 border-slate-600 rounded focus:ring-orange-500"
                    required
                  />
                  <Label htmlFor="saved" className="text-sm text-slate-300">
                    I have saved my backup codes in a secure location
                  </Label>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Security Notice</h3>
              <p className="text-xs text-slate-400">
                Two-factor authentication significantly improves your account security. 
                Keep your authenticator app and backup codes safe and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}