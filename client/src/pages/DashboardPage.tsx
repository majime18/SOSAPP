import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Settings, Users, AlertTriangle, MapPin, Clock, Video } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeAlerts] = useState([
    {
      id: 1,
      location: 'Downtown, NYC',
      time: '2 mins ago',
      status: 'active',
      distance: '0.5 miles'
    },
    {
      id: 2,
      location: 'Central Park',
      time: '15 mins ago',
      status: 'resolved',
      distance: '1.2 miles'
    }
  ]);

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-red-600">S.O.S Dashboard</h1>
        </div>
        <Button
          variant="outline"
          onClick={handleSettings}
          className="border-red-200 hover:bg-red-50"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-8 w-8 text-blue-600" />}
          title="Community Members"
          value="2,847"
          description="Active in your area"
        />
        <StatCard
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          title="Active Alerts"
          value="3"
          description="Requiring assistance"
        />
        <StatCard
          icon={<Video className="h-8 w-8 text-green-600" />}
          title="Your Recordings"
          value="0"
          description="No active recordings"
        />
        <StatCard
          icon={<Clock className="h-8 w-8 text-orange-600" />}
          title="Response Time"
          value="< 2 min"
          description="Average in your area"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              S.O.S alerts from your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{alert.location}</p>
                      <p className="text-sm text-gray-500">{alert.distance} away</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                      {alert.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              Your Safety Status
            </CardTitle>
            <CardDescription>
              Emergency contacts and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">All Systems Active</p>
                  <p className="text-sm text-green-600">S.O.S is ready to protect you</p>
                </div>
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Emergency Contacts</h4>
                <div className="text-sm text-gray-600">
                  <p>✓ 3 of 6 contacts configured</p>
                  <p>✓ Voice command set</p>
                  <p>✓ GPS permissions enabled</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleSettings}
              >
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use S.O.S</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Emergency Activation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Triple tap the floating S.O.S button</li>
                <li>• Say your secret voice command</li>
                <li>• Screen will go black to avoid detection</li>
                <li>• Recording starts automatically</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">What Happens Next</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Phone switches to vibrate mode</li>
                <li>• GPS location shared with community</li>
                <li>• Emergency contacts receive alarm</li>
                <li>• 96-hour recording storage begins</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, description }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}