'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield,
  Lock,
  Key,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Server,
  Zap
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

const securityFeatures = [
  {
    icon: Key,
    title: 'Temporary Credentials',
    description: 'We use short-lived AWS credentials that automatically expire, reducing security risks.',
    details: [
      'Credentials expire within 1 hour',
      'No permanent storage of AWS keys',
      'Automatic credential rotation'
    ]
  },
  {
    icon: Eye,
    title: 'Read-Only by Default',
    description: 'All tools operate with read-only permissions unless write access is explicitly required.',
    details: [
      'Minimal required permissions',
      'Principle of least privilege',
      'Clear permission documentation'
    ]
  },
  {
    icon: Shield,
    title: 'MFA for Write Operations',
    description: 'Any operation that modifies your AWS resources requires multi-factor authentication.',
    details: [
      'TOTP-based authentication',
      'Backup codes available',
      'Session-based MFA verification'
    ]
  },
  {
    icon: Lock,
    title: 'Cross-Account Role Assumption',
    description: 'Secure access to your AWS account through IAM roles, not access keys.',
    details: [
      'External ID validation',
      'Role-based access control',
      'No direct credential sharing'
    ]
  }
];

const complianceStandards = [
  {
    name: 'SOC 2 Type II',
    status: 'Compliant',
    description: 'Audited security controls for service organizations'
  },
  {
    name: 'ISO 27001',
    status: 'In Progress',
    description: 'International standard for information security management'
  },
  {
    name: 'GDPR',
    status: 'Compliant',
    description: 'European data protection and privacy regulation'
  },
  {
    name: 'CCPA',
    status: 'Compliant',
    description: 'California Consumer Privacy Act compliance'
  }
];

const dataHandling = [
  {
    icon: Server,
    title: 'Data Processing',
    description: 'Your AWS data is processed in real-time and not stored permanently on our servers.',
    practices: [
      'In-memory processing only',
      'No persistent data storage',
      'Automatic data purging'
    ]
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'All data is encrypted in transit and at rest using industry-standard encryption.',
    practices: [
      'TLS 1.3 for data in transit',
      'AES-256 encryption at rest',
      'End-to-end encryption'
    ]
  },
  {
    icon: Users,
    title: 'Access Controls',
    description: 'Strict access controls ensure only authorized personnel can access systems.',
    practices: [
      'Role-based access control',
      'Multi-factor authentication',
      'Regular access reviews'
    ]
  }
];

export function SecurityPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Security & Privacy
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Your security is our top priority. Learn how we protect your AWS credentials, 
            data, and privacy with industry-leading security measures.
          </p>
          
          <Badge className="bg-green-500/20 text-green-400 text-sm px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            SOC 2 Type II Compliant
          </Badge>
        </div>

        {/* Security Architecture */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Security Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How We Protect Your Data */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            How We Protect Your Data
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {dataHandling.map((item, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-slate-300">
                        <div className="w-1 h-1 bg-orange-400 rounded-full flex-shrink-0" />
                        <span className="text-sm">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Compliance & Certifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{standard.name}</CardTitle>
                    <Badge className={
                      standard.status === 'Compliant' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }>
                      {standard.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-400">
                    {standard.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Security Best Practices</CardTitle>
              <CardDescription className="text-slate-400">
                Our commitment to maintaining the highest security standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Infrastructure Security</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">AWS-hosted infrastructure</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Network segmentation</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">DDoS protection</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Regular security assessments</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Application Security</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Secure coding practices</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Regular security testing</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Dependency scanning</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Automated security monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Response */}
        <div className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-orange-500" />
                Incident Response
              </CardTitle>
              <CardDescription className="text-slate-400">
                How we handle security incidents and keep you informed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-white mb-2">Detection</h3>
                  <p className="text-sm text-slate-400">
                    24/7 monitoring and automated alerting systems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-white mb-2">Response</h3>
                  <p className="text-sm text-slate-400">
                    Immediate containment and mitigation procedures
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-white mb-2">Communication</h3>
                  <p className="text-sm text-slate-400">
                    Transparent communication with affected users
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Security Team */}
        <div className="text-center py-12 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl border border-orange-500/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Security Questions?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Our security team is here to answer any questions about our security practices, 
            compliance, or how we protect your data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="mailto:security@awsdevtools.com">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base cursor-pointer">
                <Mail className="w-4 h-4 mr-2" />
                security@awsdevtools.com
              </Badge>
            </a>
            <Badge variant="outline" className="border-slate-600 text-slate-400 px-6 py-3 text-base">
              <FileText className="w-4 h-4 mr-2" />
              Security Documentation
            </Badge>
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