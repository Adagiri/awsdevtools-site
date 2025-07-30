'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search,
  Filter,
  DollarSign,
  Shield,
  BarChart3,
  Cloud,
  HardDrive,
  Network,
  Zap,
  Database,
  Globe,
  Lock,
  Star,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useTools } from '@/hooks/useTools';
import { useAccount } from '@/lib/aws/AccountProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Tool } from '@/types/tools';
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

const categoryColors = {
  'cost-optimization': 'text-green-400 bg-green-400/10',
  'security': 'text-red-400 bg-red-400/10',
  'performance': 'text-blue-400 bg-blue-400/10',
  'management': 'text-purple-400 bg-purple-400/10',
  'storage': 'text-orange-400 bg-orange-400/10',
  'networking': 'text-cyan-400 bg-cyan-400/10',
  'monitoring': 'text-yellow-400 bg-yellow-400/10',
  'compliance': 'text-pink-400 bg-pink-400/10',
  'automation': 'text-indigo-400 bg-indigo-400/10',
  'compute': 'text-emerald-400 bg-emerald-400/10'
};

const complexityColors = {
  'beginner': 'text-green-400 bg-green-400/10',
  'intermediate': 'text-yellow-400 bg-yellow-400/10',
  'advanced': 'text-red-400 bg-red-400/10'
};

export function ToolsPage() {
  const { tools, enabledTools, isLoading, enableTool, isToolEnabled } = useTools();
  const { currentAccount } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [enablingTool, setEnablingTool] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tools.map(tool => tool.category)));
    return cats.map(cat => ({
      value: cat,
      label: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      count: tools.filter(tool => tool.category === cat).length
    }));
  }, [tools]);

  const filteredTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      const matchesSearch = tool.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || tool.complexity === selectedComplexity;
      
      let matchesStatus = true;
      if (selectedStatus === 'enabled') {
        matchesStatus = isToolEnabled(tool.name);
      } else if (selectedStatus === 'available') {
        matchesStatus = !isToolEnabled(tool.name) && tool.status === 'available';
      } else if (selectedStatus === 'beta') {
        matchesStatus = tool.status === 'beta';
      }

      return matchesSearch && matchesCategory && matchesComplexity && matchesStatus;
    });

    // Sort tools
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.displayName.localeCompare(b.displayName);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'complexity':
          const complexityOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tools, searchQuery, selectedCategory, selectedComplexity, selectedStatus, sortBy, isToolEnabled]);

  const handleEnableTool = async (toolName: string) => {
    if (!currentAccount) return;
    
    try {
      setEnablingTool(toolName);
      await enableTool(toolName);
    } catch (error) {
      console.error('Failed to enable tool:', error);
    } finally {
      setEnablingTool(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'beta':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'coming_soon':
        return <Clock className="w-4 h-4 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'beta':
        return 'Beta';
      case 'coming_soon':
        return 'Coming Soon';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AWS Tools</h1>
            <p className="text-slate-400">
              Discover and enable powerful tools to optimize your AWS infrastructure
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 md:mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search tools, features, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-300">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} className="text-slate-300">
                        {cat.label} ({cat.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                  <SelectTrigger className="w-full sm:w-40 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Complexity" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-300">All Levels</SelectItem>
                    <SelectItem value="beginner" className="text-slate-300">Beginner</SelectItem>
                    <SelectItem value="intermediate" className="text-slate-300">Intermediate</SelectItem>
                    <SelectItem value="advanced" className="text-slate-300">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-36 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-300">All Status</SelectItem>
                    <SelectItem value="enabled" className="text-slate-300">Enabled</SelectItem>
                    <SelectItem value="available" className="text-slate-300">Available</SelectItem>
                    <SelectItem value="beta" className="text-slate-300">Beta</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-36 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="name" className="text-slate-300">Name</SelectItem>
                    <SelectItem value="category" className="text-slate-300">Category</SelectItem>
                    <SelectItem value="complexity" className="text-slate-300">Complexity</SelectItem>
                    <SelectItem value="status" className="text-slate-300">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-slate-400">
                Showing {filteredTools.length} of {tools.length} tools
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  {enabledTools.length} Enabled
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  {tools.filter(t => t.status === 'available').length} Available
                </Badge>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTools.map((tool) => {
              const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Cloud;
              const isEnabled = isToolEnabled(tool.name);
              const isEnabling = enablingTool === tool.name;

              return (
                <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(tool.status)}
                        {isEnabled && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Enabled
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-lg">{tool.displayName}</CardTitle>
                    <CardDescription className="text-slate-400 text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`text-xs ${categoryColors[tool.category] || 'text-slate-400 bg-slate-400/10'}`}>
                        {tool.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                      <Badge className={`text-xs ${complexityColors[tool.complexity]}`}>
                        {tool.complexity}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {getStatusLabel(tool.status)}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-300">Key Features:</h4>
                      <ul className="text-xs text-slate-400 space-y-1">
                        {tool.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                        {tool.features.length > 3 && (
                          <li className="text-purple-400">+{tool.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>

                    {/* Estimated Savings */}
                    {tool.estimatedSavings && (
                      <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
                        <span className="text-xs text-slate-400">Potential Impact:</span>
                        <span className="text-sm font-medium text-green-400">
                          {tool.estimatedSavings}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {isEnabled ? (
                        <Link href={`/tools/${tool.name}/dashboard`} className="flex-1">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            Open Dashboard
                          </Button>
                        </Link>
                      ) : tool.status === 'available' ? (
                        <Button
                          onClick={() => handleEnableTool(tool.name)}
                          disabled={isEnabling || !currentAccount}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {isEnabling ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Enabling...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Enable Tool
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button disabled className="flex-1" variant="outline">
                          {tool.status === 'beta' ? 'Beta Access' : 'Coming Soon'}
                        </Button>
                      )}
                      
                      <Link href={`/tools/${tool.name}`} className="flex-1">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No tools found</h3>
              <p className="text-slate-400 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedComplexity('all');
                  setSelectedStatus('all');
                }}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
        
        <ScrollToTop />
      </div>
    </div>
  );
}