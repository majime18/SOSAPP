import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Settings, Users, AlertTriangle, MapPin, Clock, Video, Upload, Smartphone } from 'lucide-react';

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

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="font-bold text-green-800 mb-2">🔴 AUTOMATIC PROTECTION ACTIVE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <Smartphone className="h-4 w-4 text-green-600 mr-2" />
            <span>BLACK screen recording ready</span>
          </div>
          <div className="flex items-center">
            <Upload className="h-4 w-4 text-green-600 mr-2" />
            <span>Auto-upload to cloud enabled</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-green-600 mr-2" />
            <span>Community alerts activated</span>
          </div>
        </div>
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
          description="Auto-uploading videos"
        />
        <StatCard
          icon={<Video className="h-8 w-8 text-green-600" />}
          title="Your Recordings"
          value="0"
          description="96-hour auto-storage"
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
              Live Community Alerts
            </CardTitle>
            <CardDescription>
              S.O.S alerts with automatic video uploads
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
                      <p className="text-xs text-blue-600">📤 Video auto-uploaded</p>
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
              Your Protection Status
            </CardTitle>
            <CardDescription>
              Automatic systems ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">🟢 All Systems AUTOMATIC</p>
                  <p className="text-sm text-green-600">BLACK screen + auto-upload ready</p>
                </div>
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Zero-Effort Protection Active:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>BLACK screen recording (stealth mode)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Auto-upload to secure cloud servers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>3 emergency contacts configured</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Voice command activation ready</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>GPS auto-tracking enabled</span>
                  </div>
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
          <CardTitle>🚨 AUTOMATIC S.O.S PROTECTION</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-red-700">What Happens When You Activate:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">📱</span>
                  <div>
                    <strong>Screen Goes BLACK Instantly</strong>
                    <p className="text-xs text-gray-600">Appears off to attackers - completely stealth</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">🎥</span>
                  <div>
                    <strong>Recording Starts Automatically</strong>
                    <p className="text-xs text-gray-600">Video captures everything while screen stays black</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">☁️</span>
                  <div>
                    <strong>Auto-Upload to Cloud</strong>
                    <p className="text-xs text-gray-600">Video instantly saved to secure servers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-700">What YOU Do:</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-bold text-blue-800 mb-2">ABSOLUTELY NOTHING!</p>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• Just activate once (3 taps or voice)</p>
                  <p>• Everything else is 100% automatic</p>
                  <p>• Videos upload by themselves</p>
                  <p>• Community gets alerted automatically</p>
                  <p>• Emergency contacts receive alarms</p>
                  <p>• You stay safe and hidden</p>
                </div>
              </div>
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