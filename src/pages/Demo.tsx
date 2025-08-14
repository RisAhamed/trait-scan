
import React, { useState } from 'react';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const Demo = () => {
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoSeeds = [
    {
      id: 's_demo_marketing_sarah',
      title: 'Digital Marketing Expert',
      handle: '@sarah_chen_ux',
      description: 'UX designer and startup founder with high creativity and conscientiousness',
      traits: ['Creative', 'Organized', 'Social'],
      platforms: ['Twitter', 'LinkedIn', 'Medium'],
      confidence: 87
    },
    {
      id: 's_demo_tech_alex',
      title: 'Tech Entrepreneur',
      handle: '@alex_codes',
      description: 'Full-stack developer and blockchain enthusiast',
      traits: ['Analytical', 'Independent', 'Innovative'],
      platforms: ['GitHub', 'Twitter', 'Reddit'],
      confidence: 92
    },
    {
      id: 's_demo_creator_maya',
      title: 'Content Creator',
      handle: '@maya_travels',
      description: 'Travel blogger and photographer with high extroversion',
      traits: ['Adventurous', 'Outgoing', 'Artistic'],
      platforms: ['Instagram', 'YouTube', 'TikTok'],
      confidence: 78
    }
  ];

  const handleTryDemo = (seedId: string, title: string) => {
    trackEvent('demo_selected', { seedId, title });
    navigate(`/seed/${seedId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Play className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Demo</span>
          </div>
          <h1 className="text-4xl font-bold">Try Our Demo Personas</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore pre-analyzed personas to see the depth of insights our AI can provide. 
            Each demo showcases different personality types and social media patterns.
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {demoSeeds.map((demo) => (
            <Card 
              key={demo.id} 
              className={`card-hover transition-all duration-200 ${
                selectedDemo === demo.id ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setSelectedDemo(selectedDemo === demo.id ? null : demo.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                  <div className="confidence-high">
                    {demo.confidence}%
                  </div>
                </div>
                <CardDescription className="font-mono text-accent">
                  {demo.handle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {demo.description}
                </p>

                {/* Traits */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Traits:</p>
                  <div className="flex flex-wrap gap-2">
                    {demo.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Analyzed Platforms:</p>
                  <div className="flex flex-wrap gap-2">
                    {demo.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTryDemo(demo.id, demo.title);
                  }}
                  className="w-full btn-primary mt-4"
                >
                  View Full Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="card-surface">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              How Our Analysis Works
            </CardTitle>
            <CardDescription>
              See what makes our AI persona analysis so powerful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-accent font-bold">1</span>
                </div>
                <h3 className="font-semibold">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We analyze public posts, interactions, and behavioral patterns across multiple platforms
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced NLP and personality models extract traits, interests, and behavioral insights
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-success font-bold">3</span>
                </div>
                <h3 className="font-semibold">Comprehensive Report</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed personality profiles, similar accounts, and evidence-backed insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to analyze your own profile?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/upload')}
              className="btn-primary px-8 py-3"
            >
              Start Your Analysis
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
