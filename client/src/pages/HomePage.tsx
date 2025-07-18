import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, AlertTriangle, Clock, MapPin, Video } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-16 w-16 text-red-600 mr-3" />
          <h1 className="text-6xl font-bold text-red-600">S.O.S</h1>
        </div>
        <p className="text-2xl text-gray-700 mb-4">
          Your Personal Safety Guardian
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Protecting people from unjust tyranny, false accusations, crime, kidnapping and many other expected and unexpected life events. We're committed to saving lives one S.O.S. at a time.
        </p>
        <Button 
          onClick={handleGetStarted}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
        >
          Get Started - It's Free
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          title="Emergency Activation"
          description="Tap 3x or use voice command to activate S.O.S with screen going black to avoid detection"
        />
        <FeatureCard
          icon={<Video className="h-8 w-8 text-red-600" />}
          title="Live Recording"
          description="Automatic video recording with GPS tracking, stored safely for 96 hours"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-red-600" />}
          title="Community Alerts"
          description="Instant notifications to all app members worldwide for real-time help"
        />
        <FeatureCard
          icon={<MapPin className="h-8 w-8 text-red-600" />}
          title="GPS Tracking"
          description="Automatic location sharing with emergency contacts and community"
        />
        <FeatureCard
          icon={<Clock className="h-8 w-8 text-red-600" />}
          title="96-Hour Storage"
          description="All recordings automatically stored and accessible for 96 hours"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-red-600" />}
          title="No Ads, No Distractions"
          description="Clean, user-friendly interface focused solely on your safety"
        />
      </div>

      <div className="text-center bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Activate S.O.S</h3>
            <p className="text-gray-600">Triple tap the floating button or use your secret voice command</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Auto Protection</h3>
            <p className="text-gray-600">Phone goes silent, GPS activates, recording starts with black screen</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Community Response</h3>
            <p className="text-gray-600">Alerts sent to community and emergency contacts instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-red-200 hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}