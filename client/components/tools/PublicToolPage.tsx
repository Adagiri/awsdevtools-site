'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  DollarSign,
  Shield,
  BarChart3,
  Cloud,
  CheckCircle,
  Star,
  Users,
  Clock,
  Zap,
  ArrowRight,
  Lock,
  Play
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Tool } from '@/types/tools';
import Link from 'next/link';

const iconMap = {
  DollarSign,
  Shield,
  BarChart3,
  Cloud
};

const categoryColors = {
  'cost-optimization': 'text-green-400 bg-green-400/10',
  'security': 'text-red-400 bg-red-400/10',
  'performance': 'text-blue-400 bg-blue-400/10',
  'management': 'text-purple-400 bg-purple-400/10'
};

// Mock tool data
const MOCK_TOOLS: Record<string, Tool> = {
  'cost-optimizer': {
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
  'security-auditor': {
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
  },
  'performance-monitor': {
    id: 'performance-monitor',
    name: 'performance-monitor',
    displayName: 'Performance Monitor',
    description: 'Real-time performance insights and optimization suggestions',
    category: 'performance',
    icon: 'BarChart3',
    features: [
      'Real-time metrics',
      'Performance bottleneck detection',
      'Auto-scaling recommendations',
      'Custom dashboards',
      'Alert configuration',
      'Historical trend analysis',
      'Resource utilization tracking',
      'Performance optimization suggestions'
    ],
    requiredPermissions: [
      'cloudwatch:GetMetricStatistics',
      'cloudwatch:ListMetrics',
      'autoscaling:DescribeAutoScalingGroups',
      'elasticloadbalancing:DescribeLoadBalancers',
      'ec2:DescribeInstances',
      'rds:DescribeDBInstances'
    ],
    estimatedSavings: 'Faster response',
    complexity: 'intermediate',
    status: 'available'
  }
};

export function PublicToolPage({ slug }: { slug: string }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTool = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setTool(MOCK_TOOLS[slug] || null);
      setIsLoading(false);
    };

    loadTool();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <PublicHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-64 bg-slate-700 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <PublicHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-white mb-4">Tool Not Found</h1>
            <p className="text-slate-400 mb-6">The tool you're looking for doesn't exist.</p>
            <Link href="/tools/public">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Cloud;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/tools/public">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tool Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge className={`${categoryColors[tool.category] || 'text-slate-400 bg-slate-400/10'}`}>
                {tool.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                {tool.complexity}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {tool.displayName}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              {tool.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                  <Play className="w-5 h-5 mr-2" />
                  Start Using This Tool
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-3">
                  Sign In to Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Tool Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Features */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-orange-500" />
                  Key Features
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Everything this tool can do for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-900/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tool Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-orange-500" />
                  Tool Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Technical details and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Complexity Level</span>
                  <Badge className="bg-slate-700 text-slate-300">
                    {tool.complexity}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estimated Impact</span>
                  <span className="text-green-400 font-medium">{tool.estimatedSavings}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    Available
                  </Badge>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Required AWS Permissions</h4>
                  <div className="space-y-2">
                    {tool.requiredPermissions.slice(0, 4).map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <code className="text-xs text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                          {permission}
                        </code>
                      </div>
                    ))}
                    {tool.requiredPermissions.length > 4 && (
                      <p className="text-xs text-slate-500">
                        +{tool.requiredPermissions.length - 4} more permissions
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="bg-slate-800/50 border-slate-700 mb-12">
            <CardHeader>
              <CardTitle className="text-white">How It Works</CardTitle>
              <CardDescription className="text-slate-400">
                Simple steps to get started with {tool.displayName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-500 font-bold">1</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Connect Your AWS Account</h3>
                  <p className="text-sm text-slate-400">
                    Securely connect your AWS account using cross-account role assumption
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-500 font-bold">2</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Enable the Tool</h3>
                  <p className="text-sm text-slate-400">
                    Configure the tool settings and grant necessary permissions
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-500 font-bold">3</span>
                  </div>
                  <h3 className="font-medium text-white mb-2">Get Insights</h3>
                  <p className="text-sm text-slate-400">
                    View detailed reports and actionable recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final CTA */}
          <div className="text-center py-12 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl border border-orange-500/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to optimize your AWS infrastructure?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join developers who trust our cloud tools that just work to manage their AWS infrastructure efficiently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/tools/public">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-3">
                  View All Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
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