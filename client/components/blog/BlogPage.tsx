'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  TrendingUp,
  BookOpen,
  Filter,
  Cloud
} from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { BlogPost, mockPosts } from '@/lib/blog/blog-data';
import Link from 'next/link';

const categories = [
  'All Categories',
  'Cost Optimization',
  'Security',
  'Performance',
  'Automation',
  'Architecture',
  'Backup & Recovery'
];

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterPosts(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterPosts(searchQuery, category);
  };

  const filterPosts = (query: string, category: string) => {
    let filtered = mockPosts;

    if (category !== 'All Categories') {
      filtered = filtered.filter(post => post.category === category);
    }

    if (query) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Blog</h1>
            <p className="text-slate-400">
              Insights, tutorials, and best practices for AWS development and operations
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-md px-3 py-2 text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-slate-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-white">Featured Articles</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-500/20 text-orange-400">
                          Featured
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-white hover:text-orange-400 transition-colors">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-white">Latest Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {post.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-white hover:text-orange-400 transition-colors text-lg">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 p-1">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
              <p className="text-slate-400 mb-4">
                Try adjusting your search terms or category filter
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setFilteredPosts(mockPosts);
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