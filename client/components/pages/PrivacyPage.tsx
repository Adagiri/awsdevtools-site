'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield,
  Eye,
  Users,
  FileText,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

const privacyPrinciples = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We are clear about what data we collect, how we use it, and who we share it with.'
  },
  {
    icon: Shield,
    title: 'Data Minimization',
    description: 'We only collect and process the minimum data necessary to provide our services.'
  },
  {
    icon: Users,
    title: 'User Control',
    description: 'You have control over your data and can request access, correction, or deletion at any time.'
  },
  {
    icon: CheckCircle,
    title: 'Security First',
    description: 'We implement strong security measures to protect your personal information.'
  }
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <p className="text-sm text-slate-400">
            Last updated: January 15, 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Privacy Principles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Our Privacy Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyPrinciples.map((principle, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <principle.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <CardTitle className="text-white">{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Information We Collect */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Account Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Email address and name for account creation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Authentication credentials (encrypted)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Multi-factor authentication settings</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">AWS Integration Data</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>AWS account IDs and role ARNs (for secure access)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>AWS resource metadata (processed in real-time, not stored)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Tool configuration and preferences</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Usage Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Application usage patterns and feature interactions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>Error logs and performance metrics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span>IP addresses and browser information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Service Provision</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Provide AWS management tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Generate reports and insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Maintain account security</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Communication</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Send service notifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Provide customer support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Share product updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-2">We Do Not Sell Your Data</h3>
                    <p className="text-slate-300 text-sm">
                      We never sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Limited Sharing Scenarios</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Service Providers:</strong> Trusted third parties who help us operate our service (e.g., hosting, analytics)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and users</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Business Transfers:</strong> In the event of a merger or acquisition (with user notification)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Account Data</h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Retained while your account is active and for 90 days after deletion.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">AWS Resource Data</h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Processed in real-time and not permanently stored on our servers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Usage Logs</h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Retained for 12 months for security and service improvement purposes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Support Communications</h3>
                  <p className="text-slate-300 text-sm mb-2">
                    Retained for 3 years to provide ongoing support and service improvements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-white">Access</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Request a copy of the personal information we have about you.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-white">Correction</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Request correction of inaccurate or incomplete information.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-white">Deletion</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Request deletion of your personal information (subject to legal requirements).
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-white">Portability</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Request your data in a portable format to transfer to another service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="w-5 h-5 mr-2 text-orange-500" />
                Contact Us About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                If you have questions about this privacy policy or want to exercise your privacy rights, 
                please contact us:
              </p>
              <div className="space-y-2 text-slate-300">
                <div><strong>Email:</strong> privacy@awsdevtools.com</div>
                <div><strong>Address:</strong> AWS Dev Tools Inc., 123 Cloud Street, San Francisco, CA 94105</div>
                <div><strong>Response Time:</strong> We respond to privacy requests within 30 days</div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                We may update this privacy policy from time to time. When we make significant changes, 
                we will notify you by email and post a notice on our website. The "Last updated" date 
                at the top of this policy indicates when it was last revised.
              </p>
            </CardContent>
          </Card>
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