export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'AWS Cost Optimization: 10 Strategies That Actually Work',
    excerpt: 'Learn proven techniques to reduce your AWS bill by up to 40% without compromising performance or reliability.',
    content: '',
    author: 'Sarah Chen',
    publishedAt: '2024-01-15',
    readTime: 8,
    category: 'Cost Optimization',
    tags: ['AWS', 'Cost Management', 'Best Practices'],
    featured: true
  },
  {
    id: '2',
    title: 'Security Best Practices for Multi-Account AWS Environments',
    excerpt: 'A comprehensive guide to securing your AWS infrastructure across multiple accounts with practical examples.',
    content: '',
    author: 'Michael Rodriguez',
    publishedAt: '2024-01-12',
    readTime: 12,
    category: 'Security',
    tags: ['Security', 'Multi-Account', 'IAM'],
    featured: true
  },
  {
    id: '3',
    title: 'Automating AWS Resource Management with Infrastructure as Code',
    excerpt: 'Discover how to streamline your AWS operations using Terraform, CloudFormation, and modern DevOps practices.',
    content: '',
    author: 'David Kim',
    publishedAt: '2024-01-10',
    readTime: 15,
    category: 'Automation',
    tags: ['IaC', 'Terraform', 'CloudFormation', 'DevOps'],
    featured: false
  },
  {
    id: '4',
    title: 'Performance Monitoring: Beyond Basic CloudWatch Metrics',
    excerpt: 'Advanced monitoring strategies to gain deeper insights into your AWS application performance.',
    content: '',
    author: 'Lisa Wang',
    publishedAt: '2024-01-08',
    readTime: 10,
    category: 'Performance',
    tags: ['Monitoring', 'CloudWatch', 'Performance'],
    featured: false
  },
  {
    id: '5',
    title: 'The Complete Guide to AWS Backup Strategies',
    excerpt: 'Everything you need to know about protecting your data with comprehensive backup and disaster recovery plans.',
    content: '',
    author: 'James Thompson',
    publishedAt: '2024-01-05',
    readTime: 14,
    category: 'Backup & Recovery',
    tags: ['Backup', 'Disaster Recovery', 'Data Protection'],
    featured: false
  },
  {
    id: '6',
    title: 'Serverless Architecture Patterns for Enterprise Applications',
    excerpt: 'Learn how to design scalable, cost-effective serverless solutions using AWS Lambda and related services.',
    content: '',
    author: 'Emily Davis',
    publishedAt: '2024-01-03',
    readTime: 11,
    category: 'Architecture',
    tags: ['Serverless', 'Lambda', 'Architecture'],
    featured: false
  }
];