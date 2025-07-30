'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Shield,
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Bell,
  Mail,
  Trash2,
  Key,
  Lock
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useTools } from '@/hooks/useTools';
import { useAccount } from '@/lib/aws/AccountProvider';
import Link from 'next/link';

export function SecurityAuditorSettings() {
  const { currentAccount } = useAccount();
  const { updateToolConfig, disableTool } = useTools();
  const [isSaving, setIsSaving] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);

  const [config, setConfig] = useState({
    complianceFrameworks: ['SOC2', 'PCI-DSS'],
    alertSeverity: 'medium',
    includeCompliance: true,
    scanDepth: 'comprehensive',
    excludeRegions: [],
    customRules: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    slack: true,
    webhook: false,
    frequency: 'immediate'
  });

  const [schedule, setSchedule] = useState({
    enabled: true,
    frequency: 'daily',
    time: '02:00',
    timezone: 'UTC'
  });

  const permissions = [
    'iam:ListPolicies',
    'ec2:DescribeSecurityGroups',
    'config:GetComplianceDetailsByConfigRule',
    'inspector:DescribeFindings',
    'iam:GetAccountSummary',
    'kms:ListKeys'
  ];

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      await updateToolConfig('security-auditor', config);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisableTool = async () => {
    if (!showDisableConfirm) {
      setShowDisableConfirm(true);
      return;
    }
    
    try {
      setIsDisabling(true);
      await disableTool('security-auditor');
      window.location.href = '/my-tools';
    } catch (error) {
      console.error('Failed to disable tool:', error);
    } finally {
      setIsDisabling(false);
    }
  };

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateNotifications = (key: string, value: any) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updateSchedule = (key: string, value: any) => {
    setSchedule(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/tools/security-auditor/dashboard">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Security Auditor Settings</h1>
                  <p className="text-slate-400">Configure security scanning and compliance monitoring</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
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
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="configuration" className="space-y-6">
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="configuration" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Configuration
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="schedule" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="permissions" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Permissions
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Advanced
                </TabsTrigger>
              </TabsList>

              {/* Configuration Tab */}
              <TabsContent value="configuration" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <SettingsIcon className="w-5 h-5 mr-2 text-orange-400" />
                      Security Scanning Configuration
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Customize security analysis and compliance monitoring
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Compliance Frameworks</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {['SOC2', 'PCI-DSS', 'HIPAA', 'ISO-27001'].map((framework) => (
                          <div key={framework} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={framework}
                              checked={config.complianceFrameworks.includes(framework)}
                              onChange={(e) => {
                                const frameworks = config.complianceFrameworks;
                                if (e.target.checked) {
                                  updateConfig('complianceFrameworks', [...frameworks, framework]);
                                } else {
                                  updateConfig('complianceFrameworks', frameworks.filter((f: string) => f !== framework));
                                }
                              }}
                              className="w-4 h-4 text-orange-500 bg-slate-900 border-slate-600 rounded focus:ring-orange-500"
                            />
                            <Label htmlFor={framework} className="text-slate-300">{framework}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300">Alert Severity</Label>
                      <select
                        value={config.alertSeverity}
                        onChange={(e) => updateConfig('alertSeverity', e.target.value)}
                        className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                      >
                        <option value="low">Low - All findings</option>
                        <option value="medium">Medium - Medium and high severity</option>
                        <option value="high">High - Only critical findings</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Include Compliance Checks</div>
                          <div className="text-sm text-slate-400">
                            Run compliance checks against selected frameworks
                          </div>
                        </div>
                        <Switch
                          checked={config.includeCompliance}
                          onCheckedChange={(checked) => updateConfig('includeCompliance', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300">Scan Depth</Label>
                      <select
                        value={config.scanDepth}
                        onChange={(e) => updateConfig('scanDepth', e.target.value)}
                        className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                      >
                        <option value="basic">Basic - Core security checks</option>
                        <option value="standard">Standard - Comprehensive scan</option>
                        <option value="comprehensive">Comprehensive - Deep analysis</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300">Custom Rules (Optional)</Label>
                      <Textarea
                        placeholder="Enter custom security rules or policies to check"
                        value={config.customRules}
                        onChange={(e) => updateConfig('customRules', e.target.value)}
                        className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-orange-400" />
                      Security Alert Settings
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Configure how and when you receive security alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Email Notifications</div>
                          <div className="text-sm text-slate-400">
                            Receive security alerts via email
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => updateNotifications('email', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Slack Integration</div>
                          <div className="text-sm text-slate-400">
                            Send security alerts to Slack channel
                          </div>
                        </div>
                        <Switch
                          checked={notifications.slack}
                          onCheckedChange={(checked) => updateNotifications('slack', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Webhook Notifications</div>
                          <div className="text-sm text-slate-400">
                            Send alerts to custom webhook endpoint
                          </div>
                        </div>
                        <Switch
                          checked={notifications.webhook}
                          onCheckedChange={(checked) => updateNotifications('webhook', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300">Alert Frequency</Label>
                      <select
                        value={notifications.frequency}
                        onChange={(e) => updateNotifications('frequency', e.target.value)}
                        className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                      >
                        <option value="immediate">Immediate - As findings occur</option>
                        <option value="hourly">Hourly - Hourly digest</option>
                        <option value="daily">Daily - Daily summary</option>
                        <option value="weekly">Weekly - Weekly report</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <RefreshCw className="w-5 h-5 mr-2 text-orange-400" />
                      Automated Security Scans
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Configure automatic security scanning schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">Enable Scheduled Scans</div>
                        <div className="text-sm text-slate-400">
                          Automatically run security scans on a schedule
                        </div>
                      </div>
                      <Switch
                        checked={schedule.enabled}
                        onCheckedChange={(checked) => updateSchedule('enabled', checked)}
                      />
                    </div>

                    {schedule.enabled && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-slate-300">Frequency</Label>
                            <select
                              value={schedule.frequency}
                              onChange={(e) => updateSchedule('frequency', e.target.value)}
                              className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                            >
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300">Time</Label>
                            <Input
                              type="time"
                              value={schedule.time}
                              onChange={(e) => updateSchedule('time', e.target.value)}
                              className="bg-slate-900/50 border-slate-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-300">Timezone</Label>
                          <select
                            value={schedule.timezone}
                            onChange={(e) => updateSchedule('timezone', e.target.value)}
                            className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                          >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                          </select>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Key className="w-5 h-5 mr-2 text-orange-400" />
                      Required Permissions
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      AWS permissions required for security analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <code className="text-sm text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
                              {permission}
                            </code>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400">
                            Active
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <div className="font-medium text-white mb-1">Permission Status</div>
                          <div className="text-sm text-slate-400">
                            All required permissions are currently active for your connected AWS account.
                            These permissions are read-only and follow security best practices.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <SettingsIcon className="w-5 h-5 mr-2 text-orange-400" />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Advanced configuration and tool management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Tool Version</Label>
                        <Input
                          value="v1.8.0"
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Last Updated</Label>
                        <Input
                          value="2025-01-15"
                          disabled
                          className="bg-slate-900/50 border-slate-600 text-white opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Debug Mode</div>
                          <div className="text-sm text-slate-400">
                            Enable detailed logging for troubleshooting
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Beta Features</div>
                          <div className="text-sm text-slate-400">
                            Enable experimental security features (may be unstable)
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700">
                      <h4 className="font-medium text-white mb-4">Tool Management</h4>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reset to Default Settings
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Export Configuration
                        </Button>
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
                      Irreversible actions that will affect this tool
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Disable Tool</div>
                        <div className="text-sm text-slate-400">
                          Permanently disable Security Auditor for the current AWS account
                        </div>
                      </div>
                      <Button
                        onClick={handleDisableTool}
                        disabled={isDisabling}
                        variant="outline"
                        className={`border-red-500/50 text-red-400 hover:bg-red-500/10 ${
                          showDisableConfirm ? 'bg-red-500/20' : ''
                        }`}
                      >
                        {isDisabling ? (
                          <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        {showDisableConfirm ? 'Confirm Disable' : 'Disable Tool'}
                      </Button>
                    </div>
                    {showDisableConfirm && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="text-sm text-red-400 mb-3">
                          ⚠️ This action cannot be undone. This will permanently disable the tool
                          for this AWS account and remove all associated configurations.
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setShowDisableConfirm(false)}
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
          </div>
        </main>
      </div>
    </div>
  );
}