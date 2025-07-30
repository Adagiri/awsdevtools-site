'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Shield, 
  BarChart3, 
  Cloud, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Users,
  Server,
  Database,
  Zap,
  ArrowRight,
  RefreshCw,
  Bell,
  Eye
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { useTools } from '@/hooks/useTools';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import Link from 'next/link';

interface DashboardStats {
  totalSavings: number;
  monthlyCost: number;
  securityScore: number;
  activeTools: number;
  totalResources: number;
  criticalAlerts: number;
}

interface ActivityItem {
  id: string;
  type: 'tool_run' | 'alert' | 'optimization' | 'security';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  toolName?: string;
}

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  estimatedSavings?: string;
  category: string;
  toolName: string;
}

export function DashboardPage() {
  const { user } = useAuth();
  const { currentAccount } = useAccount();
  const { tools, enabledTools, isLoading } = useTools();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      loadDashboardData();
    }
  }, [currentAccount]);

  const loadDashboardData = async () => {
    try {
      // Simulate API calls to load dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockStats: DashboardStats = {
        totalSavings: 12450,
        monthlyCost: 8200,
        securityScore: 87,
        activeTools: enabledTools.length,
        totalResources: 156,
        criticalAlerts: 3
      };

      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'optimization',
          title: 'Cost optimization completed',
          description: 'Identified $1,200 in monthly savings from unused EC2 instances',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'success',
          toolName: 'cost-optimizer'
        },
        {
          id: '2',
          type: 'alert',
          title: 'Security vulnerability detected',
          description: 'Overly permissive security group rules found in us-east-1',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'warning',
          toolName: 'security-auditor'
        },
        {
          id: '3',
          type: 'tool_run',
          title: 'Performance analysis completed',
          description: 'Generated performance report for 23 resources',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          status: 'success',
          toolName: 'performance-monitor'
        },
        {
          id: '4',
          type: 'security',
          title: 'Compliance scan finished',
          description: 'SOC2 compliance check completed with 2 findings',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          status: 'warning',
          toolName: 'security-auditor'
        }
      ];

      const mockRecommendations: RecommendationItem[] = [
        {
          id: '1',
          title: 'Terminate unused EC2 instances',
          description: '3 EC2 instances have been idle for over 7 days in us-east-1',
          impact: 'high',
          effort: 'low',
          estimatedSavings: '$1,200/month',
          category: 'Cost Optimization',
          toolName: 'cost-optimizer'
        },
        {
          id: '2',
          title: 'Update security group rules',
          description: 'Remove overly permissive 0.0.0.0/0 rules from production security groups',
          impact: 'high',
          effort: 'medium',
          category: 'Security',
          toolName: 'security-auditor'
        },
        {
          id: '3',
          title: 'Enable RDS automated backups',
          description: '2 RDS instances missing automated backup configuration',
          impact: 'medium',
          effort: 'low',
          category: 'Backup & Recovery',
          toolName: 'backup-manager'
        },
        {
          id: '4',
          title: 'Right-size RDS instances',
          description: 'Database instances are over-provisioned based on usage patterns',
          impact: 'medium',
          effort: 'medium',
          estimatedSavings: '$800/month',
          category: 'Cost Optimization',
          toolName: 'cost-optimizer'
        }
      ];

      setStats(mockStats);
      setActivities(mockActivities);
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-400" />;
      case 'tool_run':
        return <Activity className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
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

  if (!currentAccount) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-96">
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <CardHeader>
                  <CardTitle className="text-white">No AWS Account Selected</CardTitle>
                  <CardDescription className="text-slate-400">
                    Please select an AWS account to view your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/accounts/add">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Add AWS Account
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.email?.split('@')[0]}
              </h1>
              <p className="text-slate-400">
                Here's what's happening with your AWS infrastructure
              </p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Link href="/tools">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Browse Tools
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    Total Savings
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${stats.totalSavings.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    Monthly Cost
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${stats.monthlyCost.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    Security Score
                  </CardTitle>
                  <Shield className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stats.securityScore}/100
                  </div>
                  <Progress 
                    value={stats.securityScore} 
                    className="mt-2 h-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    Active Tools
                  </CardTitle>
                  <Zap className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {stats.activeTools}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    of {tools.length} available
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Activity & Recommendations */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Recommendations */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Top Recommendations</CardTitle>
                    <Link href="/recommendations">
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                        View All
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription className="text-slate-400">
                    AI-powered suggestions to optimize your AWS infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white">{rec.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getImpactColor(rec.impact)}`}>
                            {rec.impact} impact
                          </Badge>
                          <Badge className={`text-xs ${getEffortColor(rec.effort)}`}>
                            {rec.effort} effort
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {rec.category}
                          </Badge>
                          {rec.estimatedSavings && (
                            <span className="text-sm font-medium text-green-400">
                              {rec.estimatedSavings}
                            </span>
                          )}
                        </div>
                        <Link href={`/tools/${rec.toolName}/dashboard`}>
                          <Button size="sm" variant="ghost" className="text-orange-500 hover:text-orange-400">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-400">
                    Latest updates from your enabled tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-slate-900/30 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type, activity.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-white truncate">
                              {activity.title}
                            </h4>
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(activity.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-2">
                            {activity.description}
                          </p>
                          {activity.toolName && (
                            <Link href={`/tools/${activity.toolName}/dashboard`}>
                              <Badge variant="outline" className="text-xs border-slate-600 text-slate-400 hover:border-orange-500 hover:text-orange-400 cursor-pointer">
                                {tools.find(t => t.name === activity.toolName)?.displayName || activity.toolName}
                              </Badge>
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Stats & Tools */}
            <div className="space-y-6 md:space-y-8">
              {/* Account Overview */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Account Overview</CardTitle>
                  <CardDescription className="text-slate-400">
                    {currentAccount.accountName} ({currentAccount.accountId})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Region</span>
                    <span className="text-sm text-white">{currentAccount.region}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Resources</span>
                    <span className="text-sm text-white">{stats?.totalResources || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Active Tools</span>
                    <span className="text-sm text-white">{stats?.activeTools || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Critical Alerts</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-white">{stats?.criticalAlerts || 0}</span>
                      {(stats?.criticalAlerts || 0) > 0 && (
                        <Bell className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/tools">
                    <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800">
                      <Cloud className="w-4 h-4 mr-2" />
                      Browse All Tools
                    </Button>
                  </Link>
                  <Link href="/accounts/add">
                    <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800">
                      <Server className="w-4 h-4 mr-2" />
                      Add AWS Account
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800">
                      <Users className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Enabled Tools */}
              {enabledTools.length > 0 && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Your Active Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {enabledTools.slice(0, 4).map((enabledTool) => {
                      const tool = tools.find(t => t.name === enabledTool.toolName);
                      if (!tool) return null;

                      const IconComponent = tool.icon === 'DollarSign' ? DollarSign :
                                          tool.icon === 'Shield' ? Shield :
                                          tool.icon === 'BarChart3' ? BarChart3 :
                                          Cloud;

                      return (
                        <Link key={tool.name} href={`/tools/${tool.name}/dashboard`}>
                          <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-purple-400" />
                              <IconComponent className="w-5 h-5 text-orange-400" />
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {tool.displayName}
                                </div>
                                <div className="text-xs text-slate-400">
                                  Last run: {enabledTool.lastRun ? formatTimeAgo(enabledTool.lastRun) : 'Never'}
                                </div>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              enabledTool.status === 'active' ? 'bg-green-400' :
                              enabledTool.status === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                            }`} />
                          </div>
                        </Link>
                      );
                    })}
                    {enabledTools.length > 4 && (
                      <Link href="/my-tools">
                        <Button variant="ghost" className="w-full text-orange-500 hover:text-orange-400">
                          View All ({enabledTools.length})
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
}