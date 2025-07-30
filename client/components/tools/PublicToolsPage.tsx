'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  ArrowRight
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
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

// Mock tools data for public view
const MOCK_TOOLS: Tool[] = [
  {
    id: 'cost-optimizer',
    name: 'cost-optimizer',
    displayName: 'Cost Optimizer',
    description: 'Identify and eliminate wasteful AWS spending with AI-powered recommendations',
    category: 'cost-optimization',
    icon: 'DollarSign',
    features: [
      'Unused resource detection',
      'Right-sizing recommendations',
      'Reserved instance optimization',
      'Automated cost alerts',
      'Cost trend analysis',
      'Budget forecasting',
      'Multi-account cost tracking',
      'Custom cost reports'
    ],
    requiredPermissions: [
      'ec2:DescribeInstances',
      'rds:DescribeDBInstances',
      'cloudwatch:GetMetricStatistics',
      'ce:GetCostAndUsage',
      'ce:GetDimensionValues',
      'ce:GetReservationCoverage'
    ],
    estimatedSavings: 'Up to 40%',
    complexity: 'beginner',
    status: 'available'
  },
  {
    id: 'security-auditor',
    name: 'security-auditor',
    displayName: 'Security Auditor',
    description: 'Comprehensive security scanning and compliance monitoring',
    category: 'security',
    icon: 'Shield',
    features: [
      'IAM policy analysis',
      'Security group auditing',
      'Compliance reporting',
      'Vulnerability scanning',
      'Access key rotation tracking',
      'MFA enforcement monitoring',
      'Encryption status checks',
      'Security best practices validation'
    ],
    requiredPermissions: [
      'iam:ListPolicies',
      'ec2:DescribeSecurityGroups',
      'config:GetComplianceDetailsByConfigRule',
      'inspector:DescribeFindings',
      'iam:GetAccountSummary',
      'kms:ListKeys'
    ],
    estimatedSavings: 'Risk reduction',
    complexity: 'intermediate',
    status: 'available'
  }
];

export function PublicToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(MOCK_TOOLS.map(tool => tool.category)));
    return cats.map(cat => ({
      value: cat,
      label: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      count: MOCK_TOOLS.filter(tool => tool.category === cat).length
    }));
  }, []);

  const filteredTools = useMemo(() => {
    let filtered = MOCK_TOOLS.filter(tool => {
      const matchesSearch = tool.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || tool.complexity === selectedComplexity;
      
      let matchesStatus = true;
      if (selectedStatus === 'available') {
        matchesStatus = tool.status === 'available';
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
  }, [searchQuery, selectedCategory, selectedComplexity, selectedStatus, sortBy]);

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
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AWS Tools</h1>
          <p className="text-slate-400">
            Discover powerful tools to optimize your AWS infrastructure - cloud tools that just work
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
              Showing {filteredTools.length} of {MOCK_TOOLS.length} tools
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                {MOCK_TOOLS.filter(t => t.status === 'available').length} Available
              </Badge>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Cloud;

            return (
              <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tool.status)}
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
                    <Link href={`/tools/public/${tool.name}`} className="flex-1">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
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
        
        <ScrollToTop />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">AWS Dev Tools</span>
              </div>
              <p className="text-slate-400 text-sm">
                Cloud tools that just work. Essential AWS management tools for developers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/tools/public" className="hover:text-white transition-colors">Tools</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-400 text-sm">
            © 2025 AWS Dev Tools. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}