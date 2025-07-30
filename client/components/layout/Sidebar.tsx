'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wrench,
  Settings,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Shield,
  BarChart3,
  Cloud,
  HardDrive,
  Network,
  Zap,
  Database,
  Globe,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTools } from '@/hooks/useTools';

const iconMap = {
  DollarSign,
  Shield,
  BarChart3,
  Cloud,
  HardDrive,
  Network,
  Zap,
  Database,
  Globe,
  Lock
};

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'All Tools',
    href: '/tools',
    icon: Wrench,
  },
  {
    name: 'My Tools',
    href: '/my-tools',
    icon: Plus,
  },
];

const categories = [
  { name: 'Cost Optimization', key: 'cost-optimization', color: 'text-green-400' },
  { name: 'Security', key: 'security', color: 'text-red-400' },
  { name: 'Performance', key: 'performance', color: 'text-blue-400' },
  { name: 'Management', key: 'management', color: 'text-purple-400' },
  { name: 'Storage', key: 'storage', color: 'text-orange-400' },
  { name: 'Networking', key: 'networking', color: 'text-cyan-400' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { tools, enabledTools, getEnabledToolsCount } = useTools();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const enabledCount = getEnabledToolsCount();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div className={cn(
        "border-r border-slate-800/50 flex flex-col transition-all duration-300",
        "fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto",
        collapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )} style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}>
      {/* Collapse Toggle */}
      <div className="p-4 border-b border-slate-800/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                  isActive && "bg-slate-800 text-white",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="w-4 h-4" />
                {!collapsed && (
                  <>
                    <span className="ml-2">{item.name}</span>
                    {item.name === 'My Tools' && enabledCount > 0 && (
                      <Badge variant="secondary" className="ml-auto bg-orange-500/20 text-orange-300">
                        {enabledCount}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}

        {/* Quick Access - Enabled Tools */}
        {!collapsed && enabledTools.length > 0 && (
          <div className="pt-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Access
            </h3>
            <div className="space-y-1">
              {enabledTools.slice(0, 5).map((enabledTool) => {
                const tool = tools.find(t => t.name === enabledTool.toolName);
                if (!tool) return null;

                const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Cloud;
                const isActive = pathname === `/tools/${tool.name}/dashboard`;

                return (
                  <Link key={tool.name} href={`/tools/${tool.name}`}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50",
                        isActive && "bg-slate-800 text-white"
                      )}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      <span className="text-sm truncate">{tool.displayName}</span>
                      <div className={cn(
                        "w-2 h-2 rounded-full ml-auto",
                        enabledTool.status === 'active' ? 'bg-green-400' :
                        enabledTool.status === 'error' ? 'bg-red-400' : 'bg-yellow-400'
                      )} />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800/50 space-y-2">
        <Link href="/profile">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
              collapsed && "justify-center px-2"
            )}
          >
            <User className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Profile</span>}
          </Button>
        </Link>
        
        <Link href="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
              collapsed && "justify-center px-2"
            )}
          >
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Button>
        </Link>
      </div>
    </div>
    </>
  );
}