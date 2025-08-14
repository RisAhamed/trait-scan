
import React from 'react';
import { ArrowRight, Play, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketer",
      avatar: "SC",
      quote: "Found my brand voice patterns across 5 platforms instantly."
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      avatar: "MR", 
      quote: "Discovered audience overlap I never knew existed."
    },
    {
      name: "Dr. Jane Walsh",
      role: "Researcher",
      avatar: "JW",
      quote: "Powerful insights for social media research projects."
    }
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-secondary/5 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Cross-Platform Analysis</span>
          </div>
          
          {/* Main Headlines */}
          <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Know Anyone.
            <br />
            Instantly.
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Enter a public handle and get a cross-platform persona summary, evidence-backed insights, and 'look-alike' matches.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => navigate('/demo')}
              className="btn-primary text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              Try Demo
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/upload')}
              className="text-lg px-8 py-4"
            >
              Analyze Your Handle
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Illustration Placeholder */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full mx-auto flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <p className="text-muted-foreground">Interactive Demo Visualization</p>
                <p className="text-sm text-muted-foreground">GIF/SVG illustration placeholder</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                Trusted by 10,000+ users
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-surface p-6">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-semibold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
