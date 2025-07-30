'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cloud, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-40" style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AWS Dev Tools</span>
        </Link>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
          <Link href="/tools/public" className="text-slate-300 hover:text-white transition-colors">
            Tools
          </Link>
          <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
        
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Get Started
            </Button>
          </Link>
        </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-800/50 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0 mt-0 pb-0'
        }`}>
          <div className="pt-4">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                href="/tools/public" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link 
                href="/blog" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/pricing" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-800/50">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-slate-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}