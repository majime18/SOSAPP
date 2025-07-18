import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, AlertTriangle, Clock, MapPin, Video, Upload, Smartphone } from 'lucide-react';

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

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">
          🚨 ZERO EFFORT PROTECTION 🚨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <Smartphone className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-bold text-red-800">VICTIM'S SCREEN GOES BLACK</h3>
            <p className="text-sm text-gray-700">Completely stealth - attackers see nothing</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Upload className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-bold text-red-800">AUTO-UPLOAD TO CLOUD</h3>
            <p className="text-sm text-gray-700">Videos instantly saved - victim does NOTHING</p>
          </div>
        </div>
        <p className="text-center mt-4 font-bold text-red-700">
          Just activate once - everything else happens automatically!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          title="Stealth Activation"
          description="Tap 3x or voice command → Screen goes BLACK instantly → Zero detection by attackers"
        />
        <FeatureCard
          icon={<Video className="h-8 w-8 text-red-600" />}
          title="Automatic Recording"
          description="Video records with BLACK screen → Auto-uploads to secure servers → Victim does nothing!"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-red-600" />}
          title="Instant Community Alerts"
          description="All app members worldwide notified automatically → Real-time help mobilized"
        />
        <FeatureCard
          icon={<MapPin className="h-8 w-8 text-red-600" />}
          title="Auto GPS Tracking"
          description="Location automatically shared → Emergency contacts get exact position → No user action needed"
        />
        <FeatureCard
          icon={<Clock className="h-8 w-8 text-red-600" />}
          title="96-Hour Auto Storage"
          description="All videos automatically stored and accessible → Self-deletes after 96 hours"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-red-600" />}
          title="Zero Ads, Pure Safety"
          description="No distractions → Clean interface → 100% focused on saving lives"
        />
      </div>

      <div className="text-center bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How It Works - COMPLETELY AUTOMATIC
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">1</span>
            </div>
            <h3 className="font-semibold mb-2">Activate S.O.S</h3>
            <p className="text-gray-600">Triple tap floating button or say your secret voice command</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
            <h3 className="font-semibold mb-2">Everything Goes AUTO</h3>
            <p className="text-gray-600">Screen turns BLACK, recording starts, GPS activates, uploads begin - ALL AUTOMATIC</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Help Arrives</h3>
            <p className="text-gray-600">Community & emergency contacts alerted instantly - you do NOTHING more!</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ✅ VICTIM PROTECTION GUARANTEED
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-green-700">BLACK SCREEN = INVISIBLE RECORDING</h4>
            <p className="text-sm text-gray-700">Attackers see nothing - phone appears off</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700">AUTO-UPLOAD = EVIDENCE SECURED</h4>
            <p className="text-sm text-gray-700">Even if phone is destroyed, video is safe in cloud</p>
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