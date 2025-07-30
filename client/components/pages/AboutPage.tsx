'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud,
  Users,
  Target,
  Zap,
  Shield,
  Heart,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import Link from 'next/link';

const values = [
  {
    icon: Zap,
    title: 'Simplicity First',
    description: 'We believe cloud tools should just work. No complex setup, no steep learning curves.'
  },
  {
    icon: Shield,
    title: 'Security by Design',
    description: 'Your AWS credentials and data are protected with industry-leading security measures.'
  },
  {
    icon: Heart,
    title: 'Developer Focused',
    description: 'Built by developers, for developers. We understand your pain points and solve them.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every tool is designed to deliver measurable improvements to your AWS infrastructure.'
  }
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former AWS Solutions Architect with 8+ years of cloud experience.',
    image: '👩‍💻'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    bio: 'Security expert and former AWS Security Specialist.',
    image: '👨‍💻'
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer',
    bio: 'Full-stack developer passionate about developer experience.',
    image: '👨‍🔬'
  }
];

export function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About AWS Dev Tools
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            We're on a mission to make AWS management simple and accessible for every developer. 
            Our cloud tools just work, so you can focus on building amazing products.
          </p>
          
          <Badge className="bg-orange-500/20 text-orange-400 text-sm px-4 py-2">
            Cloud tools that just work
          </Badge>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                AWS Dev Tools was born out of frustration. As developers and AWS practitioners, 
                we spent countless hours building custom scripts and tools to manage our cloud infrastructure. 
                Every team was solving the same problems over and over again.
              </p>
              <p>
                We realized there had to be a better way. Why should every developer have to build 
                their own cost optimization scripts? Why should security auditing be so complex? 
                Why can't cloud tools just work out of the box?
              </p>
              <p>
                So we built AWS Dev Tools - a platform that provides essential AWS management 
                capabilities that are secure, simple to use, and deliver immediate value. 
                No complex setup, no vendor lock-in, just tools that work.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <CardTitle className="text-white">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We're a small but passionate team of AWS experts and developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <CardDescription className="text-orange-400">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border-orange-500/20">
            <CardContent className="py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <div className="text-slate-400">Essential Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-slate-400">Secure by Design</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-slate-400">Support Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Target className="w-6 h-6 mr-3 text-orange-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                To democratize AWS management by providing simple, secure, and effective tools 
                that help developers optimize their cloud infrastructure without the complexity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Make AWS management accessible to all</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Reduce cloud complexity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Deliver immediate value</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Maintain highest security standards</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to simplify your AWS management?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join us in making cloud tools that just work. Start optimizing your AWS infrastructure today.
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
                Explore Tools
              </Button>
            </Link>
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