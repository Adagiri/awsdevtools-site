'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronRight,
  Eye,
  ThumbsUp,
  MessageCircle,
  Cloud
} from 'lucide-react';
import { List, X } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { BlogPost } from '@/lib/blog/blog-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

const mockPost: BlogPost = {
  id: '1',
  title: 'AWS Cost Optimization: 10 Strategies That Actually Work',
  excerpt: 'Learn proven techniques to reduce your AWS bill by up to 40% without compromising performance or reliability.',
  content: `
# Introduction

AWS cost optimization is one of the most critical aspects of cloud management. In this comprehensive guide, we'll explore 10 proven strategies that can help you reduce your AWS bill by up to 40% without compromising performance or reliability.

## Understanding AWS Pricing

Before diving into optimization strategies, it's essential to understand how AWS pricing works. AWS follows a pay-as-you-go model, which means you only pay for the resources you use.

### Key Pricing Components

- **Compute**: EC2 instances, Lambda functions, ECS tasks
- **Storage**: S3, EBS volumes, EFS file systems
- **Data Transfer**: Between regions, to internet, between services
- **Additional Services**: RDS, ElastiCache, CloudWatch, etc.

## Strategy 1: Right-Sizing Your Resources

Right-sizing is the process of matching instance types and sizes to your workload performance and capacity requirements at the lowest possible cost.

### How to Right-Size

1. **Monitor Resource Utilization**: Use CloudWatch metrics to track CPU, memory, and network utilization
2. **Identify Over-Provisioned Resources**: Look for instances with consistently low utilization
3. **Test Different Instance Types**: Experiment with different instance families and sizes
4. **Implement Gradual Changes**: Make changes incrementally to avoid performance issues

## Strategy 2: Reserved Instances and Savings Plans

Reserved Instances (RIs) and Savings Plans can provide significant cost savings for predictable workloads.

### Types of Reserved Instances

- **Standard RIs**: Up to 75% savings with 1 or 3-year commitment
- **Convertible RIs**: Up to 54% savings with flexibility to change instance attributes
- **Scheduled RIs**: For workloads that run on predictable schedules

## Strategy 3: Spot Instances for Fault-Tolerant Workloads

Spot Instances can provide up to 90% cost savings compared to On-Demand prices.

### Best Use Cases for Spot Instances

- Batch processing jobs
- Data analysis and machine learning training
- CI/CD pipelines
- Development and testing environments

## Strategy 4: Auto Scaling

Auto Scaling helps you maintain application availability and allows you to scale your Amazon EC2 capacity up or down automatically.

### Auto Scaling Benefits

- **Cost Optimization**: Scale down during low demand periods
- **Performance**: Scale up during high demand periods
- **Availability**: Replace unhealthy instances automatically

## Strategy 5: Storage Optimization

Storage costs can quickly add up, especially for data-intensive applications.

### S3 Storage Classes

- **Standard**: For frequently accessed data
- **Intelligent-Tiering**: Automatic cost optimization
- **Standard-IA**: For infrequently accessed data
- **Glacier**: For long-term archival

## Strategy 6: Data Transfer Optimization

Data transfer costs can be significant, especially for applications with high bandwidth requirements.

### Optimization Techniques

- Use CloudFront CDN to reduce data transfer costs
- Optimize data transfer between regions
- Implement data compression
- Use VPC endpoints for AWS services

## Strategy 7: Monitoring and Alerting

Continuous monitoring is essential for maintaining cost optimization.

### Key Metrics to Monitor

- **Cost and Usage Reports**: Detailed billing information
- **CloudWatch Metrics**: Resource utilization
- **AWS Cost Explorer**: Cost analysis and forecasting
- **AWS Budgets**: Cost and usage budgets with alerts

## Strategy 8: Serverless Architecture

Serverless computing can significantly reduce costs for certain workloads.

### Serverless Benefits

- **Pay-per-execution**: Only pay when your code runs
- **Automatic Scaling**: No need to provision capacity
- **Reduced Operational Overhead**: Less infrastructure to manage

## Strategy 9: Database Optimization

Database costs can be substantial, especially for data-intensive applications.

### RDS Optimization

- Choose the right instance type and size
- Use Multi-AZ only when necessary
- Implement read replicas for read-heavy workloads
- Consider Aurora Serverless for variable workloads

## Strategy 10: Regular Cost Reviews

Regular cost reviews help identify new optimization opportunities.

### Review Process

1. **Monthly Cost Analysis**: Review monthly spending patterns
2. **Resource Utilization Review**: Identify underutilized resources
3. **Architecture Review**: Evaluate current architecture for optimization opportunities
4. **Implement Changes**: Make necessary adjustments based on findings

## Conclusion

Implementing these 10 strategies can help you achieve significant cost savings on your AWS bill. Remember that cost optimization is an ongoing process, not a one-time activity. Regular monitoring and continuous improvement are key to maintaining optimal costs.

The key to successful AWS cost optimization is to start with the strategies that will have the biggest impact on your specific use case and gradually implement others over time.
  `,
  author: 'Sarah Chen',
  publishedAt: '2024-01-15',
  readTime: 8,
  category: 'Cost Optimization',
  tags: ['AWS', 'Cost Management', 'Best Practices'],
  featured: true,
  views: 1247,
  likes: 89,
  comments: 23
};

export function BlogArticlePage({ slug }: { slug: string }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isTocVisible, setIsTocVisible] = useState(false);

  useEffect(() => {
    // Simulate loading post data
    const loadPost = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPost(mockPost);
      setIsLoading(false);
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    if (post?.content) {
      // Extract headings from content for table of contents
      const headings = extractHeadings(post.content);
      setTableOfContents(headings);
    }
  }, [post]);

  useEffect(() => {
    // Set up intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    // Observe all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [post]);

  const extractHeadings = (content: string): TableOfContentsItem[] => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      headings.push({ id, title, level });
    }

    return headings;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        break;
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering (in a real app, you'd use a proper MDX renderer)
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        const text = line.substring(2);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return <h1 key={index} id={id} className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">{text}</h1>;
      }
      if (line.startsWith('## ')) {
        const text = line.substring(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return <h2 key={index} id={id} className="text-2xl font-bold text-white mb-4 mt-8">{text}</h2>;
      }
      if (line.startsWith('### ')) {
        const text = line.substring(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return <h3 key={index} id={id} className="text-xl font-bold text-white mb-3 mt-6">{text}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="text-slate-300 mb-1">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-slate-300 mb-4 leading-relaxed">{line}</p>;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <PublicHeader />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              <div className="h-64 bg-slate-700 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <PublicHeader />
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-slate-400 mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <PublicHeader />
      <main>
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/blog">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents - Desktop */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-4">Table of Contents</h3>
                      <nav className="space-y-2">
                        {tableOfContents.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`block text-sm transition-colors ${
                              activeSection === item.id
                                ? 'text-orange-500 font-medium'
                                : 'text-slate-400 hover:text-white'
                            } text-left w-full`}
                            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                          >
                            {item.title}
                          </button>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Floating TOC Button - Mobile/Tablet */}
              <div className="lg:hidden">
                <div className="fixed bottom-20 right-4 z-40">
                  <div className="relative">
                    {/* TOC Panel */}
                    <div className={`absolute bottom-16 right-0 w-80 max-h-96 overflow-y-auto transition-all duration-300 ${
                      isTocVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                    }`}>
                      <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-sm shadow-xl">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">Table of Contents</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsTocVisible(false)}
                              className="text-slate-400 hover:text-white p-1"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <nav className="space-y-2">
                            {tableOfContents.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  scrollToSection(item.id);
                                  setIsTocVisible(false);
                                }}
                                className={`block text-sm transition-colors ${
                                  activeSection === item.id
                                    ? 'text-orange-500 font-medium'
                                    : 'text-slate-400 hover:text-white'
                                } text-left w-full`}
                                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                              >
                                {item.title}
                              </button>
                            ))}
                          </nav>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Floating Button */}
                    <Button
                      onClick={() => setIsTocVisible(!isTocVisible)}
                      className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                    >
                      <List className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="max-w-4xl">
                  {/* Article Header */}
                  <header className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className="bg-orange-500/20 text-orange-400">
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge className="bg-purple-500/20 text-purple-400">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {post.title}
                    </h1>

                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Author and Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      {/* Article Stats */}
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 mb-8">
                      <Button
                        onClick={() => setIsLiked(!isLiked)}
                        variant="outline"
                        className={`border-slate-700 ${
                          isLiked 
                            ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' 
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {isLiked ? 'Liked' : 'Like'}
                      </Button>

                      <Button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        variant="outline"
                        className={`border-slate-700 ${
                          isBookmarked 
                            ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' 
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        {isBookmarked ? 'Saved' : 'Save'}
                      </Button>

                      {/* Share Dropdown */}
                      <div className="relative group">
                        <Button
                          variant="outline"
                          className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                          <div className="p-2 space-y-1">
                            <button
                              onClick={() => handleShare('twitter')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded"
                            >
                              <Twitter className="w-4 h-4" />
                              <span>Share on Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span>Share on LinkedIn</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span>Copy Link</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </header>

                  {/* Article Content */}
                  <div className="prose prose-invert prose-orange max-w-none">
                    <div className="text-slate-300 leading-relaxed">
                      {renderContent(post.content)}
                    </div>
                  </div>

                  {/* Article Footer */}
                  <footer className="mt-12 pt-8 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => setIsLiked(!isLiked)}
                          variant="outline"
                          className={`border-slate-700 ${
                            isLiked 
                              ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {post.likes + (isLiked ? 1 : 0)}
                        </Button>
                        <span className="text-slate-400 text-sm">
                          Was this article helpful?
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        Last updated: {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </footer>
                </article>
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