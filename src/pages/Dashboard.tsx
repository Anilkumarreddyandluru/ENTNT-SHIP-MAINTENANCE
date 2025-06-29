
import React from 'react';
import { useData } from '@/contexts/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Anchor, 
  Settings, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const { ships, components, jobs, notifications } = useData();

  const stats = {
    totalShips: ships.length,
    activeShips: ships.filter(s => s.status === 'Active').length,
    shipsUnderMaintenance: ships.filter(s => s.status === 'Under Maintenance').length,
    totalComponents: components.length,
    componentsNeedingAttention: components.filter(c => c.status === 'Needs Attention' || c.status === 'Critical').length,
    totalJobs: jobs.length,
    openJobs: jobs.filter(j => j.status === 'Open').length,
    inProgressJobs: jobs.filter(j => j.status === 'In Progress').length,
    completedJobs: jobs.filter(j => j.status === 'Completed').length,
    highPriorityJobs: jobs.filter(j => j.priority === 'High' || j.priority === 'Critical').length,
    overdueMaintenance: components.filter(c => new Date(c.nextMaintenanceDate) < new Date()).length
  };

  const completionRate = stats.totalJobs > 0 ? (stats.completedJobs / stats.totalJobs) * 100 : 0;
  const maintenanceComplianceRate = stats.totalComponents > 0 ? ((stats.totalComponents - stats.overdueMaintenance) / stats.totalComponents) * 100 : 100;

  const recentActivity = [
    ...jobs.slice(0, 3).map(job => ({
      id: job.id,
      type: 'job',
      title: job.title,
      status: job.status,
      date: job.scheduledDate,
      priority: job.priority
    })),
    ...notifications.slice(0, 2).map(notif => ({
      id: notif.id,
      type: 'notification',
      title: notif.title,
      message: notif.message,
      date: notif.createdAt
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Maritime Operations Dashboard</h1>
        <p className="text-blue-100">
          Monitor your fleet, track maintenance schedules, and manage operations efficiently
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ships</CardTitle>
            <Anchor className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalShips}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeShips} active, {stats.shipsUnderMaintenance} under maintenance
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Components</CardTitle>
            <Settings className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComponents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.componentsNeedingAttention} need attention
            </p>
            {stats.componentsNeedingAttention > 0 && (
              <Badge variant="destructive" className="mt-1">
                {stats.componentsNeedingAttention} alerts
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Wrench className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openJobs + stats.inProgressJobs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.openJobs} open, {stats.inProgressJobs} in progress
            </p>
            {stats.highPriorityJobs > 0 && (
              <Badge variant="secondary" className="mt-1">
                {stats.highPriorityJobs} high priority
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdueMaintenance}</div>
            <p className="text-xs text-muted-foreground">
              Components past due date
            </p>
            {stats.overdueMaintenance > 0 && (
              <Badge variant="destructive" className="mt-1">
                Immediate attention required
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Job Completion Rate
            </CardTitle>
            <CardDescription>
              Overall completion rate of maintenance jobs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-green-600">
              {completionRate.toFixed(1)}%
            </div>
            <Progress value={completionRate} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{stats.completedJobs} completed</span>
              <span>{stats.totalJobs} total jobs</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Maintenance Compliance
            </CardTitle>
            <CardDescription>
              Components up to date with maintenance schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`text-3xl font-bold ${maintenanceComplianceRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>
              {maintenanceComplianceRate.toFixed(1)}%
            </div>
            <Progress value={maintenanceComplianceRate} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{stats.totalComponents - stats.overdueMaintenance} up to date</span>
              <span>{stats.overdueMaintenance} overdue</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest jobs and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    item.type === 'job' 
                      ? 'status' in item && item.status === 'Completed' ? 'bg-green-500' : 
                        'status' in item && item.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'
                      : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    {'message' in item && (
                      <p className="text-xs text-gray-500 mt-1">{item.message}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                      {'priority' in item && (
                        <Badge 
                          variant={item.priority === 'High' || item.priority === 'Critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {item.priority}
                        </Badge>
                      )}
                      {'status' in item && (
                        <Badge variant="outline" className="text-xs">
                          {item.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Fleet Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Ships</span>
                <span className="text-sm font-medium">{stats.activeShips}</span>
              </div>
              <Progress value={(stats.activeShips / stats.totalShips) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Under Maintenance</span>
                <span className="text-sm font-medium">{stats.shipsUnderMaintenance}</span>
              </div>
              <Progress 
                value={(stats.shipsUnderMaintenance / stats.totalShips) * 100} 
                className="[&>div]:bg-orange-500"
              />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Priority Jobs</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Critical</span>
                  <span>{jobs.filter(j => j.priority === 'Critical').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-600">High</span>
                  <span>{jobs.filter(j => j.priority === 'High').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-600">Medium</span>
                  <span>{jobs.filter(j => j.priority === 'Medium').length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
