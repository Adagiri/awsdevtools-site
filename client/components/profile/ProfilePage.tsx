'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Mail,
  Calendar,
  Shield,
  Key,
  Activity,
  Clock,
  MapPin,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

interface ProfileData {
  displayName: string;
  email: string;
  timezone: string;
  location: string;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  success: boolean;
}

export function ProfilePage() {
  const { user } = useAuth();
  const { accounts } = useAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    timezone: 'UTC-5 (Eastern)',
    location: 'United States'
  });

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'Account login',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      success: true
    },
    {
      id: '2',
      action: 'AWS account connected',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      success: true
    },
    {
      id: '3',
      action: 'Tool enabled: Cost Optimizer',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      success: true
    },
    {
      id: '4',
      action: 'Failed login attempt',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      ip: '203.0.113.1',
      userAgent: 'Unknown',
      success: false
    }
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setProfileData({
      displayName: user?.email?.split('@')[0] || '',
      email: user?.email || '',
      timezone: 'UTC-5 (Eastern)',
      location: 'United States'
    });
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-slate-400">
              Manage your account information and view activity
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="profile" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Security
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center">
                          <User className="w-5 h-5 mr-2 text-orange-400" />
                          Personal Information
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          Update your personal details and preferences
                        </CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {isSaving ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-slate-300">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          value={profileData.email}
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white opacity-60"
                        />
                        <p className="text-xs text-slate-400">
                          Email cannot be changed. Contact support if needed.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-slate-300">
                          Timezone
                        </Label>
                        <select
                          id="timezone"
                          value={profileData.timezone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white disabled:opacity-60"
                        >
                          <option value="UTC-8 (Pacific)">UTC-8 (Pacific)</option>
                          <option value="UTC-7 (Mountain)">UTC-7 (Mountain)</option>
                          <option value="UTC-6 (Central)">UTC-6 (Central)</option>
                          <option value="UTC-5 (Eastern)">UTC-5 (Eastern)</option>
                          <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                          <option value="UTC+1 (CET)">UTC+1 (CET)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-slate-300">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-slate-900/50 border-slate-600 text-white disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span className="text-sm text-slate-400">Member Since</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-slate-400">AWS Accounts</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {accounts.length}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-slate-400">Last Login</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {formatTimeAgo(user?.lastLogin || new Date().toISOString())}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-slate-400">Location</span>
                        </div>
                        <div className="text-lg font-semibold text-white">
                          {profileData.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-orange-400" />
                      Multi-Factor Authentication
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Secure your account with two-factor authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="font-medium text-white">MFA Enabled</div>
                          <div className="text-sm text-slate-400">
                            Your account is protected with two-factor authentication
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        Active
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Backup Codes</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          View Codes
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">MFA for Mutations</span>
                        <Badge className="bg-orange-500/20 text-orange-400">
                          {user?.mfaForMutations ? 'Required' : 'Optional'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Key className="w-5 h-5 mr-2 text-orange-400" />
                      Password & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Password</div>
                        <div className="text-sm text-slate-400">
                          Last changed 30 days ago
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">GitHub Connection</div>
                        <div className="text-sm text-slate-400">
                          Connected as {user?.githubId || 'Not connected'}
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        Connected
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-orange-400" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      View your recent account activity and login history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLogs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3 p-3 bg-slate-900/30 rounded-lg">
                          <div className="flex-shrink-0 mt-1">
                            {log.success ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-white">
                                {log.action}
                              </h4>
                              <span className="text-xs text-slate-500">
                                {formatTimeAgo(log.timestamp)}
                              </span>
                            </div>
                            <div className="text-sm text-slate-400 space-y-1">
                              <div>IP: {log.ip}</div>
                              <div>User Agent: {log.userAgent}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}