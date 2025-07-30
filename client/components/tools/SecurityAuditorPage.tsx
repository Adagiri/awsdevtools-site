'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield,
  CheckCircle,
  Star,
  Users,
  Clock,
  Zap,
  ArrowRight,
  Lock,
  Play,
  Settings,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Eye
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { useTools } from '@/hooks/useTools';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SecurityAuditorPage() {
  const { isAuthenticated } = useAuth();
  const { currentAccount } = useAccount();
  const { enableTool, isToolEnabled } = useTools();
  const [isEnabling, setIsEnabling] = useState(false);
  const router = useRouter();

  const toolEnabled = isToolEnabled('security-auditor');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleEnableTool = async () => {
    if (!currentAccount) return;
    
    try {
      setIsEnabling(true);
      await enableTool('security-auditor', {
        complianceFrameworks: ['SOC2', 'PCI-DSS'],
        alertSeverity: 'medium',
        includeCompliance: true
      });
    } catch (error) {
      console.error('Failed to enable tool:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  const features = [
    'IAM policy analysis',
    'Security group auditing',
    'Compliance reporting',
    'Vulnerability scanning',
    'Access key rotation tracking',
    'MFA enforcement monitoring',
    'Encryption status checks',
    'Security best practices validation'
  ];

  const permissions = [
    'iam:ListPolicies',
    'ec2:DescribeSecurityGroups',
    'config:GetComplianceDetailsByConfigRule',
    'inspector:DescribeFindings',
    'iam:GetAccountSummary',
    'kms:ListKeys'
  ];

  const complianceFrameworks = ['SOC2', 'PCI-DSS', 'HIPAA', 'ISO-27001'];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Security Auditor
                </h1>
                <p className="text-lg text-slate-300">
                  Comprehensive security scanning and compliance monitoring for your AWS infrastructure
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Badge className="bg-red-500/20 text-red-400">
                Security
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Intermediate
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400">
                Risk reduction
              </Badge>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-3">
                {toolEnabled ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium text-white">Tool Enabled</div>
                      <div className="text-sm text-slate-400">
                        Active on {currentAccount?.accountName}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="font-medium text-white">Tool Not Enabled</div>
                      <div className="text-sm text-slate-400">
                        Configure and enable to start security monitoring
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {toolEnabled ? (
                  <>
                    <Link href="/tools/security-auditor/dashboard">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                    </Link>
                    <Link href="/tools/security-auditor/settings">
                      <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    onClick={handleEnableTool}
                    disabled={isEnabling || !currentAccount}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {isEnabling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Enabling...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Enable Tool
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Features and Benefits */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-500" />
                    Security Features
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Comprehensive security analysis and monitoring capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-slate-900/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Frameworks */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Supported Compliance Frameworks</CardTitle>
                  <CardDescription className="text-slate-400">
                    Monitor compliance against industry standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {complianceFrameworks.map((framework) => (
                      <div key={framework} className="p-4 bg-slate-900/30 rounded-lg text-center">
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-4 h-4 text-red-400" />
                        </div>
                        <div className="font-medium text-white text-sm">{framework}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">How It Works</CardTitle>
                  <CardDescription className="text-slate-400">
                    Automated security monitoring and compliance checking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Configure Security Policies</h3>
                        <p className="text-sm text-slate-400">
                          Set up compliance frameworks and security policies that match your requirements
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Continuous Monitoring</h3>
                        <p className="text-sm text-slate-400">
                          Automated scanning of your AWS infrastructure for security vulnerabilities and compliance issues
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Actionable Reports</h3>
                        <p className="text-sm text-slate-400">
                          Receive detailed security reports with prioritized recommendations and remediation steps
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Benefits */}
              <Card className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-400" />
                    Security Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">24/7</div>
                      <div className="text-sm text-slate-400">Continuous monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">99%</div>
                      <div className="text-sm text-slate-400">Threat detection rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">5min</div>
                      <div className="text-sm text-slate-400">Alert response time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Configuration and Info */}
            <div className="space-y-6">
              {/* Tool Information */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-500" />
                    Tool Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Complexity Level</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      Intermediate
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Security Impact</span>
                    <span className="text-red-400 font-medium">Risk reduction</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    <Badge className="bg-green-500/20 text-green-400">
                      Available
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Account</span>
                    <span className="text-white text-sm">
                      {currentAccount?.accountName || 'None selected'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Required Permissions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-orange-500" />
                    Required Permissions
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    AWS permissions needed for security analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {permissions.slice(0, 4).map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Shield className="w-3 h-3 text-slate-400" />
                        <code className="text-xs text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                          {permission}
                        </code>
                      </div>
                    ))}
                    {permissions.length > 4 && (
                      <p className="text-xs text-slate-500 mt-2">
                        +{permissions.length - 4} more permissions
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div className="text-xs text-slate-400">
                        All permissions are read-only and follow security best practices
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              {toolEnabled && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Security Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Last Scan</span>
                      <span className="text-white text-sm">4 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Security Score</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-16 h-2" />
                        <span className="text-white text-sm">85/100</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Critical Findings</span>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-medium">2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Compliance Rate</span>
                      <span className="text-green-400 font-medium">92%</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}