'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ExternalLink,
  RefreshCw,
  DollarSign,
  Shield,
  Cloud,
  HardDrive,
  Network,
  Zap,
  Database,
  Globe,
  Lock,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { useTools } from '@/hooks/useTools';
import { useAccount } from '@/lib/aws/AccountProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { EnabledTool } from '@/types/tools';
import Link from 'next/link';

const iconMap = {
  DollarSign,
  Shield,
  BarChart3,
  Cloud,
  HardDrive,
  Network,
  Zap,
  Database,
  Globe,
  Lock
};

export function MyToolsPage() {
  const { tools, enabledTools, runTool, disableTool } = useTools();
  const { currentAccount } = useAccount();
  const [runningTool, setRunningTool] = useState<string | null>(null);
  const [disablingTool, setDisablingTool] = useState<string | null>(null);

  const handleRunTool = async (toolName: string) => {
    try {
      setRunningTool(toolName);
      await runTool(toolName);
    } catch (error) {
      console.error('Failed to run tool:', error);
    } finally {
      setRunningTool(null);
    }
  };

  const handleDisableTool = async (toolName: string) => {
    try {
      setDisablingTool(toolName);
      await disableTool(toolName);
    } catch (error) {
      console.error('Failed to disable tool:', error);
    } finally {
      setDisablingTool(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'disabled':
        return <Pause className="w-4 h-4 text-slate-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
      case 'disabled':
        return 'text-slate-400 bg-slate-400/10';
      default:
        return 'text-yellow-400 bg-yellow-400/10';
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

  const renderToolMetrics = (enabledTool: EnabledTool) => {
    if (!enabledTool.results?.metrics) return null;

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {enabledTool.results.metrics.map((metric, index) => (
          <div key={index} className="p-3 bg-slate-900/30 rounded-lg">
            <div className="flex items-center justify-between mb-1">
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
            <div className="text-lg font-semibold text-white">
              {metric.value.toLocaleString()} {metric.unit}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!currentAccount) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8">
            <div className="flex items-center justify-center h-96">
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <CardHeader>
                  <CardTitle className="text-white">No AWS Account Selected</CardTitle>
                  <CardDescription className="text-slate-400">
                    Please select an AWS account to view your enabled tools
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

  if (enabledTools.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Tools</h1>
              <p className="text-slate-400">
                Manage and monitor your enabled tools
              </p>
            </div>

            <div className="flex items-center justify-center h-96">
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center max-w-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-8 h-8 text-slate-400" />
                  </div>
                  <CardTitle className="text-white">No Tools Enabled</CardTitle>
                  <CardDescription className="text-slate-400">
                    You haven't enabled any tools yet. Browse our catalog to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/tools">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Browse Tools
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
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Tools</h1>
              <p className="text-slate-400">
                Manage and monitor your {enabledTools.length} enabled tools
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                {enabledTools.filter(t => t.status === 'active').length} Active
              </Badge>
              <Badge variant="outline" className="border-red-500/50 text-red-400">
                {enabledTools.filter(t => t.status === 'error').length} Errors
              </Badge>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {enabledTools.map((enabledTool) => {
              const tool = tools.find(t => t.name === enabledTool.toolName);
              if (!tool) return null;

              const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Cloud;
              const isRunning = runningTool === tool.name;
              const isDisabling = disablingTool === tool.name;

              return (
                <Card key={tool.name} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{tool.displayName}</CardTitle>
                          <CardDescription className="text-slate-400 text-sm">
                            {tool.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(enabledTool.status)}
                        <Badge className={`text-xs ${getStatusColor(enabledTool.status)}`}>
                          {enabledTool.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Last Run Info */}
                    <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-white">Last Run</div>
                        <div className="text-xs text-slate-400">
                          {enabledTool.lastRun ? formatTimeAgo(enabledTool.lastRun) : 'Never'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleRunTool(tool.name)}
                          disabled={isRunning}
                          className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        >
                          {isRunning ? (
                            <>
                              <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin mr-1" />
                              Running
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Run Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Tool Results Summary */}
                    {enabledTool.results?.summary && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-300">Summary</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(enabledTool.results.summary).map(([key, value]) => (
                            <div key={key} className="p-2 bg-slate-900/30 rounded">
                              <div className="text-xs text-slate-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-sm font-medium text-white">
                                {typeof value === 'number' ? value.toLocaleString() : String(value)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tool Metrics */}
                    {renderToolMetrics(enabledTool)}

                    {/* Recommendations Count */}
                    {enabledTool.results?.recommendations && (
                      <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {enabledTool.results.recommendations.length} Recommendations
                            </div>
                            <div className="text-xs text-slate-400">
                              {enabledTool.results.recommendations.filter(r => r.impact === 'high').length} high impact
                            </div>
                          </div>
                          <Link href={`/tools/${tool.name}/dashboard`}>
                            <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                              View Details
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link href={`/tools/${tool.name}/dashboard`} className="flex-1">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Open Dashboard
                        </Button>
                      </Link>
                      
                      <Link href={`/tools/${tool.name}/settings`}>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        onClick={() => handleDisableTool(tool.name)}
                        disabled={isDisabling}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        {isDisabling ? (
                          <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
}