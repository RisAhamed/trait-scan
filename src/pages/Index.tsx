
import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, BarChart3, Users, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputHandle from '@/components/InputHandle';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [showQuickInput, setShowQuickInput] = useState(false);

  const handleQuickAnalysis = (seedId: string) => {
    navigate(`/seed/${seedId}`);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze personality traits across multiple platforms.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is processed securely with full control over retention and sharing settings.'
    },
    {
      icon: BarChart3,
      title: 'Deep Insights',
      description: 'Comprehensive personality profiles with Big Five traits, interests, and behavioral patterns.'
    },
    {
      icon: Users,
      title: 'Identity Matching',
      description: 'Find connected accounts across platforms with confidence scoring and evidence.'
    }
  ];

  const useCases = [
    'Personal brand analysis',
    'Social media research',
    'Digital identity verification',
    'Personality assessment',
    'Behavioral insights',
    'Content strategy optimization'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-secondary/5 to-background" />
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Social Analysis</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Discover Digital Personas
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Uncover personality traits, behavioral patterns, and connected identities across social media platforms using advanced AI analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => setShowQuickInput(!showQuickInput)}
                className="btn-primary text-lg px-8 py-4"
              >
                Try Quick Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/upload')}
                className="text-lg px-8 py-4"
              >
                Full Upload Suite
              </Button>
            </div>

            {/* Quick Input */}
            {showQuickInput && (
              <div className="animate-slide-up max-w-2xl mx-auto p-8 card-surface rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Quick Analysis</h3>
                <InputHandle onSubmit={handleQuickAnalysis} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful AI Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive personality profiling with advanced machine learning and privacy-first approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover text-center p-6">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-accent/10">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Perfect for Multiple Use Cases</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're analyzing your own digital presence or researching social behavior patterns, 
                our platform provides the insights you need.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="card-surface p-8 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary" />
                    <div>
                      <div className="font-semibold">Digital Marketing Specialist</div>
                      <div className="text-sm text-muted-foreground">@sarah_marketing</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Openness</span>
                      <span className="confidence-high">87%</span>
                    </div>
                    <div className="trait-bar h-2">
                      <div className="trait-fill bg-accent w-[87%]" />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Conscientiousness</span>
                      <span className="confidence-high">92%</span>
                    </div>
                    <div className="trait-bar h-2">
                      <div className="trait-fill bg-secondary w-[92%]" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground mb-2">Top Interests</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs">Marketing</span>
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">AI Tools</span>
                      <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs">Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Digital Personas?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your first analysis today and unlock deep insights into digital personalities and behavior patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/upload')}
              className="btn-primary text-lg px-8 py-4"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Analysis
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/demo')}
              className="text-lg px-8 py-4"
            >
              View Demo Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
