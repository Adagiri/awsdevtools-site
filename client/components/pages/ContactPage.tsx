'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help with technical issues and account questions',
    contact: 'support@awsdevtools.com',
    availability: '24/7 response within 4 hours'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our team for quick questions',
    contact: 'Available in app',
    availability: 'Mon-Fri, 9 AM - 6 PM PST'
  },
  {
    icon: Phone,
    title: 'Enterprise Support',
    description: 'Dedicated support for enterprise customers',
    contact: '+1 (555) 123-4567',
    availability: 'Mon-Fri, 8 AM - 8 PM PST'
  }
];

const faqs = [
  {
    question: 'How do I connect my AWS account?',
    answer: 'You can connect your AWS account by creating a cross-account IAM role. We provide step-by-step instructions and CloudFormation templates to make this process simple and secure.'
  },
  {
    question: 'Is my AWS data secure?',
    answer: 'Yes, we use temporary short-lived credentials with read-only access by default. Write operations require MFA confirmation. We never store your AWS credentials permanently.'
  },
  {
    question: 'What AWS permissions do your tools need?',
    answer: 'Each tool requires specific read-only permissions to analyze your AWS resources. We follow the principle of least privilege and clearly document all required permissions.'
  },
  {
    question: 'Can I use the tools with multiple AWS accounts?',
    answer: 'Yes, you can connect multiple AWS accounts and switch between them easily. Each account is managed separately with its own security context.'
  }
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        <PublicHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Message Sent!</h1>
            <p className="text-slate-400 mb-8">
              Thank you for contacting us. We'll get back to you within 4 hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Send Another Message
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions about our tools? Need help with your AWS setup? 
            We're here to help you succeed.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Methods</h2>
              
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <method.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <CardTitle className="text-white text-lg">{method.title}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-400">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="font-medium text-white">{method.contact}</div>
                      <div className="text-sm text-slate-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {method.availability}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Office Info */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                    Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-300 space-y-1">
                    <div>AWS Dev Tools Inc.</div>
                    <div>123 Cloud Street</div>
                    <div>San Francisco, CA 94105</div>
                    <div>United States</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Send us a Message</CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-6">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-300">
                        Subject *
                      </Label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Question</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="enterprise">Enterprise Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-300">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
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