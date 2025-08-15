
import React from 'react';
import { Check, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlan } from '@/lib/plan';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const { plan, setPlan, isPro } = usePlan();
  const { toast } = useToast();

  const handleUpgrade = () => {
    setPlan('pro');
    toast({
      title: "Upgraded to Pro!",
      description: "You now have access to all Pro features.",
    });
  };

  const handleDowngrade = () => {
    setPlan('free');
    toast({
      title: "Switched to Free",
      description: "You're now on the Free plan.",
    });
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out persona analysis',
      features: [
        '5 persona scans per day',
        'Basic personality traits',
        'Public data analysis only',
        'Standard processing speed',
        'Community support'
      ],
      cta: isPro ? 'Downgrade to Free' : 'Current Plan',
      ctaAction: isPro ? handleDowngrade : undefined,
      popular: false,
      icon: Zap
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'Unlimited analysis with advanced features',
      features: [
        'Unlimited persona scans',
        'Advanced personality insights',
        'Cross-platform identity matching',
        'Contradiction analysis',
        'Priority processing',
        'PDF report downloads',
        'API access',
        'Email support'
      ],
      cta: isPro ? 'Current Plan' : 'Upgrade to Pro',
      ctaAction: isPro ? undefined : handleUpgrade,
      popular: true,
      icon: Crown
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AI-powered persona analysis with our Pro plan
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((planInfo) => {
            const Icon = planInfo.icon;
            const isCurrentPlan = (planInfo.name.toLowerCase() === plan);
            
            return (
              <Card
                key={planInfo.name}
                className={`relative backdrop-blur-xl border rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] ${
                  planInfo.popular
                    ? 'bg-gradient-to-br from-indigo-50/90 via-violet-50/90 to-cyan-50/90 dark:from-indigo-950/40 dark:via-violet-950/40 dark:to-cyan-950/40 border-indigo-200 dark:border-indigo-800'
                    : 'bg-white/60 dark:bg-slate-900/40 border-white/20'
                }`}
              >
                {planInfo.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
                    planInfo.popular 
                      ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500' 
                      : 'bg-muted'
                  }`}>
                    <Icon className={`h-8 w-8 ${planInfo.popular ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div>
                    <CardTitle className="text-2xl font-bold">{planInfo.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      <span className="text-4xl font-bold">{planInfo.price}</span>
                      <span className="text-muted-foreground">/{planInfo.period}</span>
                    </div>
                    <CardDescription className="mt-2">{planInfo.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {planInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={planInfo.ctaAction}
                    disabled={isCurrentPlan}
                    className={`w-full ${
                      planInfo.popular
                        ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white border-0'
                        : 'variant-outline'
                    }`}
                  >
                    {planInfo.cta}
                  </Button>

                  {isCurrentPlan && (
                    <p className="text-center text-sm text-muted-foreground">
                      This is your current plan
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Need a custom plan? <a href="mailto:support@personafinder.ai" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
