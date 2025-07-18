import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, AlertTriangle, Clock, MapPin, Video, Upload, Smartphone, Globe, Eye } from 'lucide-react';

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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          🌍 WORLDWIDE COMMUNITY RESPONSE 🌍
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-blue-800">ALL USERS WORLDWIDE</h3>
            <p className="text-sm text-gray-700">Every S.O.S member gets instant alert</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-blue-800">LIVE STREAM VIEWING</h3>
            <p className="text-sm text-gray-700">Watch real-time video as it unfolds</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-blue-800">INSTANT MOBILIZATION</h3>
            <p className="text-sm text-gray-700">Global community mobilizes for help</p>
          </div>
        </div>
        <p className="text-center mt-4 font-bold text-blue-700">
          🔴 LIVE: Your emergency becomes everyone's priority instantly!
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
          title="LIVE Global Broadcasting"
          description="🔴 LIVE stream to ALL users worldwide → Everyone watches in real-time → Victim does nothing!"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-red-600" />}
          title="Worldwide Community Alerts"
          description="🌍 ALL app members globally notified → LIVE viewing enabled → Real-time help mobilized"
        />
        <FeatureCard
          icon={<MapPin className="h-8 w-8 text-red-600" />}
          title="Auto GPS Tracking"
          description="Location shared with ENTIRE global community → Everyone knows where you are → No user action needed"
        />
        <FeatureCard
          icon={<Clock className="h-8 w-8 text-red-600" />}
          title="96-Hour Global Access"
          description="🌍 All users worldwide can view recording → Available 24/7 for 96 hours → Self-deletes after"
        />
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-red-600" />}
          title="Zero Ads, Pure Safety"
          description="No distractions → Clean interface → 100% focused on saving lives globally"
        />
      </div>

      <div className="text-center bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🔴 LIVE GLOBAL RESPONSE - COMPLETELY AUTOMATIC
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
            <h3 className="font-semibold mb-2">🔴 LIVE to WORLD</h3>
            <p className="text-gray-600">Screen turns BLACK, recording starts, 🌍 ALL users worldwide get LIVE stream - ALL AUTOMATIC</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 className="font-semibold mb-2">Global Help Arrives</h3>
            <p className="text-gray-600">🌍 Entire world watching & helping - you do NOTHING more!</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ✅ GLOBAL LIVE PROTECTION GUARANTEED
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-green-700">🔴 LIVE STREAM = GLOBAL WITNESSES</h4>
            <p className="text-sm text-gray-700">🌍 Everyone worldwide watching your situation unfold LIVE</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700">🌍 GLOBAL RESPONSE = INSTANT HELP</h4>
            <p className="text-sm text-gray-700">Thousands of people worldwide mobilizing to help you</p>
          </div>
        </div>
        <p className="mt-4 font-bold text-green-800">
          🔴 LIVE: Your emergency = World's priority. Everyone watching, everyone helping!
        </p>
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