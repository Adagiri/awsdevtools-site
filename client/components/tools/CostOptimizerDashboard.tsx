'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  DollarSign,
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
  LineChart
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { useTools } from '@/hooks/useTools';
import { useAccount } from '@/lib/aws/AccountProvider';
import Link from 'next/link';

export function CostOptimizerDashboard() {
  const { currentAccount } = useAccount();
  const { runTool } = useTools();
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState(new Date(Date.now() - 3600000).toISOString());

  const metrics = [
    { name: 'Monthly Spend', value: 5200, unit: 'USD', trend: 'down', change: -12 },
    { name: 'Potential Savings', value: 2450, unit: 'USD', trend: 'up', change: 8 },
    { name: 'Unused Resources', value: 8, unit: 'count', trend: 'down', change: -3 },
    { name: 'Optimization Score', value: 87, unit: '%', trend: 'up', change: 5 }
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Terminate unused EC2 instances',
      description: '3 EC2 instances have been idle for over 7 days in us-east-1',
      impact: 'high',
      effort: 'low',
      estimatedSavings: '$1,200/month',
      category: 'compute',
      actionUrl: 'https://console.aws.amazon.com/ec2/v2/home#Instances'
    },
    {
      id: '2',
      title: 'Right-size RDS instances',
      description: 'Database instances are over-provisioned based on usage patterns',
      impact: 'medium',
      effort: 'medium',
      estimatedSavings: '$800/month',
      category: 'database'
    },
    {
      id: '3',
      title: 'Purchase Reserved Instances',
      description: 'Save 40% on consistent workloads with 1-year Reserved Instances',
      impact: 'medium',
      effort: 'low',
      estimatedSavings: '$450/month',
      category: 'compute'
    }
  ];

  const reports = [
    {
      id: '1',
      name: 'Monthly Cost Analysis',
      description: 'Detailed breakdown of AWS costs by service and region',
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Optimization Opportunities',
      description: 'Comprehensive list of cost optimization recommendations',
      generatedAt: new Date(Date.now() - 172800000).toISOString(),
      downloadUrl: '#'
    }
  ];

  const handleRunTool = async () => {
    try {
      setIsRunning(true);
      await runTool('cost-optimizer');
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
              <Link href="/tools/cost-optimizer">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tool
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Cost Optimizer Dashboard</h1>
                  <p className="text-slate-400">Monitor and optimize your AWS spending</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/tools/cost-optimizer/settings">
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
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Analysis
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
                    Last run: {formatTimeAgo(lastRun)}
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
              <TabsTrigger value="recommendations" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                Recommendations
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

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LineChart className="w-5 h-5 mr-2 text-orange-400" />
                      Cost Trend Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-slate-900/30 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-400">Cost trend chart visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-orange-400" />
                      Cost Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-slate-900/30 rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-400">Service cost breakdown</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-2">{rec.title}</h3>
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
                            {rec.estimatedSavings && (
                              <span className="text-sm font-medium text-green-400">
                                {rec.estimatedSavings}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {rec.actionUrl && (
                            <a href={rec.actionUrl} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Take Action
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
                  <CardTitle className="text-white">Execution History</CardTitle>
                  <CardDescription className="text-slate-400">
                    Recent tool runs and their results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '2 hours ago', status: 'success', duration: '2.3s', findings: 12 },
                      { time: '1 day ago', status: 'success', duration: '1.8s', findings: 15 },
                      { time: '3 days ago', status: 'success', duration: '2.1s', findings: 8 },
                      { time: '1 week ago', status: 'success', duration: '2.5s', findings: 18 }
                    ].map((run, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-white font-medium">Cost analysis completed</div>
                            <div className="text-sm text-slate-400">{run.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{run.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>{run.findings} recommendations</span>
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