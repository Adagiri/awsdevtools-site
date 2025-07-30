'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Shield,
  Play,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  Calendar,
  Clock,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Lock
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useTools } from '@/hooks/useTools';
import { useAccount } from '@/lib/aws/AccountProvider';
import Link from 'next/link';

export function SecurityAuditorDashboard() {
  const { currentAccount } = useAccount();
  const { runTool } = useTools();
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState(new Date(Date.now() - 7200000).toISOString());

  const metrics = [
    { name: 'Security Score', value: 85, unit: '%', trend: 'up', change: 3 },
    { name: 'Critical Findings', value: 2, unit: 'count', trend: 'down', change: -1 },
    { name: 'Medium Findings', value: 5, unit: 'count', trend: 'stable', change: 0 },
    { name: 'Compliance Rate', value: 92, unit: '%', trend: 'up', change: 2 }
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Enable MFA for root account',
      description: 'Root account does not have multi-factor authentication enabled',
      impact: 'high',
      effort: 'low',
      category: 'identity',
      actionUrl: 'https://console.aws.amazon.com/iam/home#/security_credentials'
    },
    {
      id: '2',
      title: 'Rotate old access keys',
      description: '3 IAM users have access keys older than 90 days',
      impact: 'medium',
      effort: 'medium',
      category: 'identity'
    },
    {
      id: '3',
      title: 'Update security group rules',
      description: 'Remove overly permissive 0.0.0.0/0 rules from production security groups',
      impact: 'high',
      effort: 'medium',
      category: 'network'
    },
    {
      id: '4',
      title: 'Enable CloudTrail logging',
      description: 'CloudTrail is not enabled in 2 regions',
      impact: 'medium',
      effort: 'low',
      category: 'logging'
    }
  ];

  const reports = [
    {
      id: '1',
      name: 'Security Assessment Report',
      description: 'Comprehensive security posture analysis',
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Compliance Report',
      description: 'SOC2 and PCI-DSS compliance status',
      generatedAt: new Date(Date.now() - 259200000).toISOString(),
      downloadUrl: '#'
    }
  ];

  const handleRunTool = async () => {
    try {
      setIsRunning(true);
      await runTool('security-auditor');
      setLastRun(new Date().toISOString());
    } catch (error) {
      console.error('Failed to run tool:', error);
    } finally {
      setIsRunning(false);
    }
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
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
              <Link href="/tools/security-auditor">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tool
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Security Auditor Dashboard</h1>
                  <p className="text-slate-400">Monitor your AWS security posture and compliance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/tools/security-auditor/settings">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button
                onClick={handleRunTool}
                disabled={isRunning}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Active</span>
                  </div>
                  <div className="text-slate-400">
                    Last scan: {formatTimeAgo(lastRun)}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-500/20 text-green-400">
                    {currentAccount?.accountName}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    {currentAccount?.region}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-slate-800/50 border-slate-700">
              <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                Overview
              </TabsTrigger>
              <TabsTrigger value="findings" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                Security Findings
              </TabsTrigger>
              <TabsTrigger value="compliance" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                Reports
              </TabsTrigger>
              <TabsTrigger value="history" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                History
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">{metric.name}</span>
                        {metric.trend && (
                          <div className="flex items-center space-x-1">
                            {metric.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-400" />
                            ) : metric.trend === 'down' ? (
                              <TrendingDown className="w-3 h-3 text-red-400" />
                            ) : (
                              <Activity className="w-3 h-3 text-slate-400" />
                            )}
                            {metric.change && (
                              <span className={`text-xs ${
                                metric.trend === 'up' ? 'text-green-400' : 
                                metric.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                              }`}>
                                {metric.change > 0 ? '+' : ''}{metric.change}%
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {metric.value.toLocaleString()} {metric.unit}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Security Score Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-orange-400" />
                      Security Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Identity & Access</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-white text-sm">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Network Security</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-white text-sm">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Data Protection</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-white text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Logging & Monitoring</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-white text-sm">88%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-orange-400" />
                      Findings by Severity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-slate-900/30 rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-400">Security findings chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Findings Tab */}
            <TabsContent value="findings" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className={`w-4 h-4 ${
                              rec.impact === 'high' ? 'text-red-400' : 
                              rec.impact === 'medium' ? 'text-yellow-400' : 'text-green-400'
                            }`} />
                            <h3 className="font-semibold text-white">{rec.title}</h3>
                          </div>
                          <p className="text-slate-400 mb-3">{rec.description}</p>
                          <div className="flex items-center space-x-3">
                            <Badge className={`text-xs ${getImpactColor(rec.impact)}`}>
                              {rec.impact} impact
                            </Badge>
                            <Badge className={`text-xs ${getEffortColor(rec.effort)}`}>
                              {rec.effort} effort
                            </Badge>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {rec.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {rec.actionUrl && (
                            <a href={rec.actionUrl} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Fix Now
                              </Button>
                            </a>
                          )}
                          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">SOC2 Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Overall Score</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={94} className="w-20 h-2" />
                        <span className="text-white text-sm">94%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Security</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Availability</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Processing Integrity</span>
                        <span className="text-yellow-400">⚠ Partial</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Confidentiality</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">PCI-DSS Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Overall Score</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={89} className="w-20 h-2" />
                        <span className="text-white text-sm">89%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Network Security</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Data Protection</span>
                        <span className="text-yellow-400">⚠ Partial</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Access Control</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Monitoring</span>
                        <span className="text-green-400">✓ Compliant</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {reports.map((report) => (
                  <Card key={report.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white mb-2">{report.name}</h3>
                          <p className="text-slate-400 mb-2">{report.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" />
                            <span>Generated {formatTimeAgo(report.generatedAt)}</span>
                          </div>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Scan History</CardTitle>
                  <CardDescription className="text-slate-400">
                    Recent security scans and their results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '4 hours ago', status: 'success', duration: '3.2s', findings: 7 },
                      { time: '1 day ago', status: 'success', duration: '2.9s', findings: 9 },
                      { time: '3 days ago', status: 'success', duration: '3.1s', findings: 5 },
                      { time: '1 week ago', status: 'success', duration: '3.5s', findings: 12 }
                    ].map((run, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-white font-medium">Security scan completed</div>
                            <div className="text-sm text-slate-400">{run.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{run.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{run.findings} findings</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}