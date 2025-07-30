'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

interface NotificationSettings {
  emailNotifications: boolean;
  costAlerts: boolean;
  securityAlerts: boolean;
  toolUpdates: boolean;
  weeklyReports: boolean;
  maintenanceNotices: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  showTooltips: boolean;
  animationsEnabled: boolean;
}

interface PrivacySettings {
  shareUsageData: boolean;
  allowAnalytics: boolean;
  marketingEmails: boolean;
}

export function SettingsPage() {
  const { user, logout } = useAuth();
  const { accounts } = useAccount();
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    costAlerts: true,
    securityAlerts: true,
    toolUpdates: false,
    weeklyReports: true,
    maintenanceNotices: true
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'dark',
    compactMode: false,
    showTooltips: true,
    animationsEnabled: true
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    shareUsageData: false,
    allowAnalytics: true,
    marketingEmails: false
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      user: user,
      accounts: accounts.length,
      settings: { notifications, appearance, privacy },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'awsdevtools-data-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Simulate account deletion
    await new Promise(resolve => setTimeout(resolve, 2000));
    await logout();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400">
              Manage your account preferences and application settings
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="notifications" className="space-y-6">
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="data" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Data
                </TabsTrigger>
                <TabsTrigger value="account" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-orange-400" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Email Notifications</div>
                          <div className="text-sm text-slate-400">
                            Receive notifications via email
                          </div>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Cost Alerts</div>
                          <div className="text-sm text-slate-400">
                            Get notified when spending thresholds are exceeded
                          </div>
                        </div>
                        <Switch
                          checked={notifications.costAlerts}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, costAlerts: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Security Alerts</div>
                          <div className="text-sm text-slate-400">
                            Important security notifications and findings
                          </div>
                        </div>
                        <Switch
                          checked={notifications.securityAlerts}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, securityAlerts: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Tool Updates</div>
                          <div className="text-sm text-slate-400">
                            New features and tool updates
                          </div>
                        </div>
                        <Switch
                          checked={notifications.toolUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, toolUpdates: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Weekly Reports</div>
                          <div className="text-sm text-slate-400">
                            Summary of your AWS infrastructure
                          </div>
                        </div>
                        <Switch
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, weeklyReports: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Maintenance Notices</div>
                          <div className="text-sm text-slate-400">
                            Scheduled maintenance and downtime alerts
                          </div>
                        </div>
                        <Switch
                          checked={notifications.maintenanceNotices}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, maintenanceNotices: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-orange-400" />
                      Appearance Settings
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300 mb-3 block">Theme</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'light', label: 'Light', icon: Sun },
                            { value: 'dark', label: 'Dark', icon: Moon },
                            { value: 'system', label: 'System', icon: Monitor }
                          ].map(({ value, label, icon: Icon }) => (
                            <button
                              key={value}
                              onClick={() => setAppearance(prev => ({ ...prev, theme: value as any }))}
                              className={`p-3 rounded-lg border-2 transition-colors ${
                                appearance.theme === value
                                  ? 'border-orange-500 bg-orange-500/10'
                                  : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
                              }`}
                            >
                              <Icon className={`w-5 h-5 mx-auto mb-2 ${
                                appearance.theme === value ? 'text-orange-400' : 'text-slate-400'
                              }`} />
                              <div className={`text-sm ${
                                appearance.theme === value ? 'text-white' : 'text-slate-300'
                              }`}>
                                {label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Compact Mode</div>
                          <div className="text-sm text-slate-400">
                            Reduce spacing and padding for more content
                          </div>
                        </div>
                        <Switch
                          checked={appearance.compactMode}
                          onCheckedChange={(checked) => 
                            setAppearance(prev => ({ ...prev, compactMode: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Show Tooltips</div>
                          <div className="text-sm text-slate-400">
                            Display helpful tooltips on hover
                          </div>
                        </div>
                        <Switch
                          checked={appearance.showTooltips}
                          onCheckedChange={(checked) => 
                            setAppearance(prev => ({ ...prev, showTooltips: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Animations</div>
                          <div className="text-sm text-slate-400">
                            Enable smooth transitions and animations
                          </div>
                        </div>
                        <Switch
                          checked={appearance.animationsEnabled}
                          onCheckedChange={(checked) => 
                            setAppearance(prev => ({ ...prev, animationsEnabled: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-orange-400" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Control how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Share Usage Data</div>
                          <div className="text-sm text-slate-400">
                            Help improve the platform by sharing anonymous usage data
                          </div>
                        </div>
                        <Switch
                          checked={privacy.shareUsageData}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, shareUsageData: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Analytics</div>
                          <div className="text-sm text-slate-400">
                            Allow analytics to help us understand how you use the platform
                          </div>
                        </div>
                        <Switch
                          checked={privacy.allowAnalytics}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, allowAnalytics: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Marketing Emails</div>
                          <div className="text-sm text-slate-400">
                            Receive emails about new features and promotions
                          </div>
                        </div>
                        <Switch
                          checked={privacy.marketingEmails}
                          onCheckedChange={(checked) => 
                            setPrivacy(prev => ({ ...prev, marketingEmails: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Tab */}
              <TabsContent value="data" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Database className="w-5 h-5 mr-2 text-orange-400" />
                      Data Management
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Export, import, or delete your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg">
                        <div>
                          <div className="font-medium text-white">Export Data</div>
                          <div className="text-sm text-slate-400">
                            Download all your account data and settings
                          </div>
                        </div>
                        <Button
                          onClick={handleExportData}
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-lg">
                        <div>
                          <div className="font-medium text-white">Import Settings</div>
                          <div className="text-sm text-slate-400">
                            Import settings from a previous export
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Import
                        </Button>
                      </div>

                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                          <div>
                            <div className="font-medium text-white mb-1">Data Retention</div>
                            <div className="text-sm text-slate-400">
                              Your data is automatically backed up and retained for 90 days after account deletion.
                              AWS credentials are never stored and are only used for temporary role assumption.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <SettingsIcon className="w-5 h-5 mr-2 text-orange-400" />
                      Account Management
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Account ID</Label>
                        <Input
                          value={user?.id || ''}
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white opacity-60 font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Account Type</Label>
                        <Input
                          value="Individual"
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">MFA Status</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          Enabled
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Connected AWS Accounts</span>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {accounts.length} accounts
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="bg-red-500/5 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Irreversible actions that will permanently affect your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Delete Account</div>
                        <div className="text-sm text-slate-400">
                          Permanently delete your account and all associated data
                        </div>
                      </div>
                      <Button
                        onClick={handleDeleteAccount}
                        variant="outline"
                        className={`border-red-500/50 text-red-400 hover:bg-red-500/10 ${
                          showDeleteConfirm ? 'bg-red-500/20' : ''
                        }`}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {showDeleteConfirm ? 'Confirm Delete' : 'Delete Account'}
                      </Button>
                    </div>
                    {showDeleteConfirm && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="text-sm text-red-400 mb-3">
                          ⚠️ This action cannot be undone. This will permanently delete your account,
                          remove all AWS account connections, and delete all associated data.
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setShowDeleteConfirm(false)}
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}