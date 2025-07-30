'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { 
  Shield, 
  DollarSign, 
  BarChart3, 
  Cloud, 
  Zap, 
  Lock,
  Github,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    name: 'Cost Optimizer',
    description: 'Identify and eliminate wasteful AWS spending with AI-powered recommendations',
    icon: DollarSign,
    category: 'Cost Management',
    savings: 'Up to 40% savings'
  },
  {
    name: 'Security Auditor',
    description: 'Comprehensive security scanning and compliance monitoring',
    icon: Shield,
    category: 'Security',
    savings: 'Risk reduction'
  },
  {
    name: 'Performance Monitor',
    description: 'Real-time performance insights and optimization suggestions',
    icon: BarChart3,
    category: 'Performance',
    savings: 'Faster response'
  },
  {
    name: 'Resource Manager',
    description: 'Centralized AWS resource management and automation',
    icon: Cloud,
    category: 'Management',
    savings: 'Time savings'
  }
];

const features = [
  'Cross-account role assumption',
  'Real-time monitoring',
  'Automated reporting',
  'Interactive architecture diagrams',
  'MFA security',
  'Dark mode interface'
];

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">100+ AWS Tools Available</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Comprehensive
            <span className="text-orange-500">
              {' '}AWS Management
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your AWS operations with our comprehensive suite of tools. 
            Starting with 3 essential tools, expanding to 100+ specialized AWS management solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                <Github className="w-5 h-5 mr-2" />
                Start with GitHub
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-3">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-orange-500/30 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: 'rgba(26, 26, 26, 0.3)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular AWS Tools
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Get started with our most popular tools that help thousands of developers optimize their AWS infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {tool.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{tool.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-400 font-medium">
                      {tool.savings}
                    </span>
                    <Button size="sm" variant="ghost" className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/10">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8">
                Your AWS credentials and data are protected with industry-leading security measures, 
                using temporary short-lived credentials with read-only access by default. Write operations require MFA confirmation for enhanced security.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">MFA required for write operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Temporary short-lived credentials</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Read-only access by default</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-xl"></div>
              <Card className="relative bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Security Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">MFA Status</span>
                    <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Last Login</span>
                    <span className="text-slate-400">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Active Sessions</span>
                    <span className="text-slate-400">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Account Access</span>
                    <Badge className="bg-orange-500/20 text-orange-500">3 Accounts</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4" style={{ backgroundColor: 'rgba(255, 140, 0, 0.1)' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your AWS Infrastructure?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join developers who trust our cloud tools that just work to manage their AWS infrastructure efficiently and securely.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white">AWS Dev Tools</span>
                  <span className="text-xs text-slate-400">Cloud tools that just work</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Essential AWS management tools that streamline your cloud operations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/tools" className="hover:text-white transition-colors">Tools</Link></li>
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
        <ScrollToTop />
      </footer>
    </div>
  );
}