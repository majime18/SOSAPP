import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Settings, Users, AlertTriangle, MapPin, Clock, Video, Upload, Smartphone, Globe, Eye, Radio } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeAlerts] = useState([
    {
      id: 1,
      location: 'Downtown, NYC',
      time: '2 mins ago',
      status: 'active',
      distance: '0.5 miles',
      viewers: '2,847',
      isLive: true
    },
    {
      id: 2,
      location: 'Central Park',
      time: '15 mins ago',
      status: 'resolved',
      distance: '1.2 miles',
      viewers: '1,234',
      isLive: false
    }
  ]);

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleWatchLive = (alertId) => {
    alert('🔴 LIVE STREAM\n\nConnecting you to live video feed...\n\n🌍 You are one of thousands watching worldwide!\n\nHelp mobilize local authorities and provide real-time support.');
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
        <h2 className="font-bold text-green-800 mb-2">🔴 GLOBAL LIVE PROTECTION ACTIVE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <Smartphone className="h-4 w-4 text-green-600 mr-2" />
            <span>BLACK screen recording ready</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 text-green-600 mr-2" />
            <span>🌍 LIVE stream to ALL users worldwide</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-green-600 mr-2" />
            <span>Real-time global viewing enabled</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="font-bold text-blue-800 mb-2">🌍 WORLDWIDE COMMUNITY: 2,847 ACTIVE MEMBERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Radio className="h-4 w-4 text-blue-600 mr-2" />
            <span>🔴 LIVE alerts broadcast globally</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-blue-600 mr-2" />
            <span>Every member gets instant notifications</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Globe className="h-8 w-8 text-blue-600" />}
          title="Global Community"
          value="2,847"
          description="🌍 Worldwide active members"
        />
        <StatCard
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          title="🔴 LIVE Alerts"
          value="3"
          description="Streaming globally now"
        />
        <StatCard
          icon={<Video className="h-8 w-8 text-green-600" />}
          title="Your Recordings"
          value="0"
          description="96-hour global access"
        />
        <StatCard
          icon={<Clock className="h-8 w-8 text-orange-600" />}
          title="Global Response"
          value="< 30 sec"
          description="Worldwide notification speed"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="h-5 w-5 text-red-600 mr-2" />
              🔴 LIVE Global S.O.S Alerts
            </CardTitle>
            <CardDescription>
              Real-time emergencies broadcast to all users worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">{alert.location}</p>
                        <p className="text-sm text-gray-500">{alert.distance} away</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                        {alert.isLive ? '🔴 LIVE' : alert.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">🌍 {alert.viewers} viewers worldwide</span>
                    </div>
                    {alert.isLive && (
                      <Button
                        size="sm"
                        onClick={() => handleWatchLive(alert.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        🔴 Watch LIVE
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2">
                    📤 Video auto-uploaded • 🌍 Global community responding • 📍 GPS location shared
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              Your Global Protection Status
            </CardTitle>
            <CardDescription>
              Automatic systems connected to worldwide network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">🟢 Connected to Global Network</p>
                  <p className="text-sm text-green-600">🌍 2,847 users worldwide ready to help</p>
                </div>
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">🔴 LIVE Global Broadcasting Ready:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>BLACK screen recording (stealth mode)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>🔴 LIVE stream to ALL users worldwide</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>🌍 Global community instant alerts</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Real-time worldwide viewing access</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Auto-upload to secure cloud servers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>3 emergency contacts configured</span>
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
          <CardTitle>🌍 GLOBAL LIVE S.O.S PROTECTION</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-red-700">🔴 LIVE Global Response When You Activate:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">📱</span>
                  <div>
                    <strong>Screen Goes BLACK Instantly</strong>
                    <p className="text-xs text-gray-600">Appears off to attackers - completely stealth</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">🔴</span>
                  <div>
                    <strong>LIVE Stream to ENTIRE WORLD</strong>
                    <p className="text-xs text-gray-600">🌍 ALL 2,847+ users worldwide get instant LIVE access</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">👥</span>
                  <div>
                    <strong>Global Community Watches LIVE</strong>
                    <p className="text-xs text-gray-600">Thousands of people worldwide viewing your situation in real-time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">☁️</span>
                  <div>
                    <strong>Auto-Upload + Global Access</strong>
                    <p className="text-xs text-gray-600">Video saved to cloud, accessible worldwide for 96 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-700">🌍 What the GLOBAL Community Does:</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-bold text-blue-800 mb-2">🔴 LIVE GLOBAL RESPONSE!</p>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• 🌍 ALL users worldwide get instant alert</p>
                  <p>• 👁️ Everyone can watch your LIVE stream</p>
                  <p>• 📞 Community calls local authorities</p>
                  <p>• 📍 Your GPS location shared globally</p>
                  <p>• 🚨 Thousands mobilize to help you</p>
                  <p>• 📹 LIVE evidence preserved forever</p>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm font-bold text-orange-800">YOU DO ABSOLUTELY NOTHING!</p>
                <p className="text-xs text-orange-700">Just activate once - the entire world takes over</p>
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