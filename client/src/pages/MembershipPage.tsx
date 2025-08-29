
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Shield, ArrowLeft, Check } from 'lucide-react';

export function MembershipPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings');
  };

  const handleSelectPlan = (plan: string) => {
    alert(`You have selected the ${plan} plan. Proceeding to checkout... (demo)`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-2" />
            <h1 className="text-3xl font-bold text-red-600">Membership</h1>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Choose Your Protection Plan</h2>
          <p className="text-gray-600 mt-2">Upgrade for enhanced safety features and support our mission.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription>Community-based protection</CardDescription>
              <p className="text-4xl font-bold pt-4">$0<span className="text-lg font-normal">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-3">
              <FeatureListItem>S.O.S Activation (Tap & Voice)</FeatureListItem>
              <FeatureListItem>LIVE Stream to Global Community</FeatureListItem>
              <FeatureListItem>GPS Sharing with ALL Users</FeatureListItem>
              <FeatureListItem>Automatic Silent Mode</FeatureListItem>
              <FeatureListItem>96-Hour Video & Location Access</FeatureListItem>
              <FeatureListItem>Up to 3 Emergency Contacts</FeatureListItem>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Your Current Plan
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-red-500 border-2 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full">
              Most Popular
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>Enhanced protection & features</CardDescription>
              <p className="text-4xl font-bold pt-4 text-red-600">$9.99<span className="text-lg font-normal">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-3">
              <FeatureListItem><strong>Everything in Free, plus:</strong></FeatureListItem>
              <FeatureListItem>24/7 Professional Monitoring</FeatureListItem>
              <FeatureListItem>Permanent Video & Location Storage</FeatureListItem>
              <FeatureListItem>Unlimited Emergency Contacts</FeatureListItem>
              <FeatureListItem>Family Sharing (up to 5 members)</FeatureListItem>
              <FeatureListItem>Incident Reports for Authorities</FeatureListItem>
              <FeatureListItem>Priority Support</FeatureListItem>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleSelectPlan('Premium')}>
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
      <span className="text-sm">{children}</span>
    </div>
  );
}
