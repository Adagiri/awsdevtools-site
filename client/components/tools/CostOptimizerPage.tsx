'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  CheckCircle,
  Star,
  Users,
  Clock,
  Zap,
  ArrowRight,
  Lock,
  Play,
  Settings,
  Shield,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { useTools } from '@/hooks/useTools';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function CostOptimizerPage() {
  const { isAuthenticated } = useAuth();
  const { currentAccount } = useAccount();
  const { enableTool, isToolEnabled } = useTools();
  const [isEnabling, setIsEnabling] = useState(false);
  const router = useRouter();

  const toolEnabled = isToolEnabled('cost-optimizer');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleEnableTool = async () => {
    if (!currentAccount) return;
    
    try {
      setIsEnabling(true);
      await enableTool('cost-optimizer', {
        alertThreshold: 100,
        includeReservedInstances: true,
        regions: ['us-east-1', 'us-west-2']
      });
    } catch (error) {
      console.error('Failed to enable tool:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  const features = [
    'Unused resource detection',
    'Right-sizing recommendations',
    'Reserved instance optimization',
    'Automated cost alerts',
    'Cost trend analysis',
    'Budget forecasting',
    'Multi-account cost tracking',
    'Custom cost reports'
  ];

  const permissions = [
    'ec2:DescribeInstances',
    'rds:DescribeDBInstances',
    'cloudwatch:GetMetricStatistics',
    'ce:GetCostAndUsage',
    'ce:GetDimensionValues',
    'ce:GetReservationCoverage'
  ];

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
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Cost Optimizer
                </h1>
                <p className="text-lg text-slate-300">
                  Identify and eliminate wasteful AWS spending with AI-powered recommendations
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Badge className="bg-green-500/20 text-green-400">
                Cost Optimization
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Beginner
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400">
                Up to 40% savings
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
                        Configure and enable to start optimizing costs
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {toolEnabled ? (
                  <>
                    <Link href="/tools/cost-optimizer/dashboard">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                    </Link>
                    <Link href="/tools/cost-optimizer/settings">
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
                    Key Features
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Everything this tool can do to optimize your AWS costs
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

              {/* How It Works */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">How It Works</CardTitle>
                  <CardDescription className="text-slate-400">
                    Simple steps to start optimizing your AWS costs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Enable the Tool</h3>
                        <p className="text-sm text-slate-400">
                          Configure the tool settings and grant necessary permissions for your AWS account
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Automated Analysis</h3>
                        <p className="text-sm text-slate-400">
                          The tool continuously monitors your AWS resources and identifies optimization opportunities
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">Get Recommendations</h3>
                        <p className="text-sm text-slate-400">
                          Receive detailed reports with actionable recommendations to reduce your AWS costs
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expected Results */}
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Expected Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
                      <div className="text-sm text-slate-400">Average cost reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                      <div className="text-sm text-slate-400">Continuous monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">5min</div>
                      <div className="text-sm text-slate-400">Setup time</div>
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
                    <Badge className="bg-green-500/20 text-green-400">
                      Beginner
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estimated Impact</span>
                    <span className="text-green-400 font-medium">Up to 40% savings</span>
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
                    AWS permissions needed for this tool
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
                        All permissions are read-only and follow the principle of least privilege
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              {toolEnabled && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Last Analysis</span>
                      <span className="text-white text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Potential Savings</span>
                      <span className="text-green-400 font-medium">$2,450/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Recommendations</span>
                      <span className="text-white text-sm">12 active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Optimization Score</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={87} className="w-16 h-2" />
                        <span className="text-white text-sm">87%</span>
                      </div>
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