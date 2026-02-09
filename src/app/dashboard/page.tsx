'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UsersIcon, 
  ServerIcon, 
  BarChart3Icon, 
  SettingsIcon,
  LogOutIcon
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalAdmins: 0,
    activePanels: 0,
    totalTraffic: 0,
    systemUptime: 0,
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      // Fetch stats from API
      fetchDashboardStats();
    }
  }, [user, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <UsersIcon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            <p className="text-xs text-muted-foreground">Active administrators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Panels</CardTitle>
            <ServerIcon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePanels}</div>
            <p className="text-xs text-muted-foreground">Connected panels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <BarChart3Icon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalTraffic / (1024 ** 3)).toFixed(2)} GB</div>
            <p className="text-xs text-muted-foreground">Used this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <SettingsIcon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge variant="default">Online</Badge>
              <span className="ml-2 text-sm">{stats.systemUptime}% uptime</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your system with these quick actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button onClick={() => router.push('/admins')}>Manage Admins</Button>
            <Button onClick={() => router.push('/panels')} variant="outline">Manage Panels</Button>
            <Button onClick={() => router.push('/users')} variant="secondary">Manage Users</Button>
            <Button onClick={() => router.push('/settings')} variant="outline">System Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <div className="bg-green-100 w-2 h-2 rounded-full mr-2"></div>
                <span>New admin registered</span>
                <span className="ml-auto text-muted-foreground">2 min ago</span>
              </li>
              <li className="flex items-center text-sm">
                <div className="bg-blue-100 w-2 h-2 rounded-full mr-2"></div>
                <span>Panel connection established</span>
                <span className="ml-auto text-muted-foreground">15 min ago</span>
              </li>
              <li className="flex items-center text-sm">
                <div className="bg-yellow-100 w-2 h-2 rounded-full mr-2"></div>
                <span>Traffic threshold reached</span>
                <span className="ml-auto text-muted-foreground">1 hour ago</span>
              </li>
              <li className="flex items-center text-sm">
                <div className="bg-red-100 w-2 h-2 rounded-full mr-2"></div>
                <span>Panel connection lost</span>
                <span className="ml-auto text-muted-foreground">3 hours ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}