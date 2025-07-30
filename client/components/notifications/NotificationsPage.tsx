'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, AlertTriangle, CheckCircle, Clock, DollarSign, Shield, Trash2, BookMarked as MarkAsRead, Settings } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

interface Notification {
  id: string;
  type: 'cost' | 'security' | 'system' | 'tool';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'cost',
      title: 'Cost Alert',
      message: 'Production account spending exceeded $5,000 threshold',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'security',
      title: 'Security Finding',
      message: '3 security groups with overly permissive rules detected',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'tool',
      title: 'Tool Update',
      message: 'Cost Optimizer has new features available',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'cost': return <DollarSign className="w-5 h-5 text-green-400" />;
      case 'security': return <Shield className="w-5 h-5 text-red-400" />;
      case 'system': return <Settings className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-orange-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Notifications</h1>
                <p className="text-slate-400">
                  Stay updated with your AWS infrastructure alerts and updates
                </p>
              </div>
              <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                {unreadCount} Unread
              </Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-slate-800/50 border-slate-700">
                <TabsTrigger value="all" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="cost" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Cost
                </TabsTrigger>
                <TabsTrigger value="security" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-orange-500">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {notifications.map((notification) => (
                  <Card key={notification.id} className={`bg-slate-800/50 border-slate-700 ${!notification.read ? 'border-orange-500/30' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-white">{notification.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              )}
                            </div>
                          </div>
                          <p className="text-slate-400 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="unread" className="space-y-4">
                {notifications.filter(n => !n.read).map((notification) => (
                  <Card key={notification.id} className="bg-slate-800/50 border-slate-700 border-orange-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-white">{notification.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                          </div>
                          <p className="text-slate-400 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="text-slate-400 hover:text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark as read
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="cost" className="space-y-4">
                {notifications.filter(n => n.type === 'cost').map((notification) => (
                  <Card key={notification.id} className={`bg-slate-800/50 border-slate-700 ${!notification.read ? 'border-orange-500/30' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-white">{notification.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              )}
                            </div>
                          </div>
                          <p className="text-slate-400 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                {notifications.filter(n => n.type === 'security').map((notification) => (
                  <Card key={notification.id} className={`bg-slate-800/50 border-slate-700 ${!notification.read ? 'border-orange-500/30' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-white">{notification.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              )}
                            </div>
                          </div>
                          <p className="text-slate-400 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}