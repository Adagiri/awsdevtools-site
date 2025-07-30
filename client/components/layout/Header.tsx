'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Cloud, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Bell,
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useAccount } from '@/lib/aws/AccountProvider';
import { AWSAccount } from '@/types/aws';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();
  const { accounts, currentAccount, switchAccount } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAccountSwitch = async (account: AWSAccount) => {
    try {
      await switchAccount(account);
    } catch (error) {
      console.error('Failed to switch account:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <AlertCircle className="w-3 h-3" />;
      case 'error': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50" style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline text-xl font-bold text-white">AWS Dev Tools</span>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tools and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Account Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <div className="flex items-center space-x-2">
                  {currentAccount && (
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(currentAccount.status)}`} />
                  )}
                  <span className="hidden sm:inline">
                    {currentAccount?.accountName || 'Select Account'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-slate-800 border-slate-700">
              <DropdownMenuLabel className="text-slate-300">AWS Accounts</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              
              {accounts.filter(account => account.status === 'active').map((account) => (
                <DropdownMenuItem
                  key={account.accountId}
                  onClick={() => handleAccountSwitch(account)}
                  className="text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(account.status)}`} />
                      <div>
                        <div className="font-medium">{account.accountName}</div>
                        <div className="text-xs text-slate-400">{account.accountId}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(account.status)}
                      {currentAccount?.accountId === account.accountId && (
                        <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem asChild>
                <Link href="/accounts/add" className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add Account</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-slate-800 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-slate-700">
              <DropdownMenuLabel className="text-slate-300">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              
              <div className="p-3 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-300">Cost Alert</div>
                    <div className="text-xs text-slate-400">
                      Production account spending exceeded $5,000 threshold
                    </div>
                    <div className="text-xs text-slate-500 mt-1">2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-slate-300">Security Finding</div>
                    <div className="text-xs text-slate-400">
                      3 security groups with overly permissive rules detected
                    </div>
                    <div className="text-xs text-slate-500 mt-1">4 hours ago</div>
                  </div>
                </div>
              </div>
              
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem asChild>
                <Link href="/notifications" className="text-slate-300 hover:bg-slate-700 cursor-pointer justify-center">
                  View All Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-slate-800 p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:inline">{user?.email}</span>
                  <ChevronDown className="w-4 h-4 hidden md:inline" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
              <DropdownMenuLabel className="text-slate-300">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>MFA Enabled</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              
              <DropdownMenuItem asChild>
                <Link href="/profile" className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/settings" className="text-slate-300 hover:bg-slate-700 cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-700" />
              
              <DropdownMenuItem
                onClick={logout}
                className="text-red-400 hover:bg-slate-700 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}