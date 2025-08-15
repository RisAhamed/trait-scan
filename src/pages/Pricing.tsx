
import React from 'react';
import { Check, Crown, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { usePlan } from '@/lib/plan';

const Pricing = () => {
  const { plan, setPlan } = usePlan();

  const handlePlanSelect = (selectedPlan: 'free' | 'pro') => {
    setPlan(selectedPlan);
  };

  const features = {
    free: [
      '5 persona scans per day',
      'Basic personality insights',
      'Public data analysis only',
      'Standard support'
    ],
    pro: [
      'Unlimited persona scans',
      'Advanced AI analysis',
      'Cross-platform deep scanning',
      'Detailed behavioral patterns',
      'Priority support',
      'Export reports (PDF, JSON)',
      'API access',
      'Custom retention settings'
    ]
  };

  return (
    <>
      <Helmet>
        <title>Pricing Plans - AI Social Persona Finder</title>
        <meta name="description" content="Choose the perfect plan for your persona analysis needs. Free and Pro options available." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Crown className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl font-bold">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you need more power. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] relative">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="py-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan === 'free' ? 'default' : 'outline'}
                className="w-full"
                onClick={() => handlePlanSelect('free')}
              >
                {plan === 'free' ? 'Current Plan' : 'Choose Free'}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="backdrop-blur-xl bg-background/60 border border-accent/30 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-secondary to-primary text-white">
              Most Popular
            </Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                Pro <Crown className="h-5 w-5 text-accent" />
              </CardTitle>
              <CardDescription>For power users and professionals</CardDescription>
              <div className="py-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan === 'pro' ? '' : 'bg-gradient-to-r from-accent via-secondary to-primary text-white hover:opacity-90'}`}
                variant={plan === 'pro' ? 'default' : undefined}
                onClick={() => handlePlanSelect('pro')}
              >
                {plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] p-6 text-left">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </Card>
            <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] p-6 text-left">
              <h3 className="font-semibold mb-2">What data sources do you analyze?</h3>
              <p className="text-sm text-muted-foreground">
                We analyze publicly available data from major social platforms using advanced AI algorithms.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
