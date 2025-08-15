
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Seed = () => {
  const { seedId } = useParams<{ seedId: string }>();

  return (
    <>
      <Helmet>
        <title>Persona Analysis Results - AI Social Persona Finder</title>
        <meta name="description" content="View detailed personality analysis and behavioral insights." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Persona Analysis</h1>
                <p className="text-muted-foreground">Seed ID: {seedId}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    Personality Summary
                  </CardTitle>
                  <CardDescription>
                    AI-generated personality insights based on social media analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Analysis is being generated for seed: <code className="px-2 py-1 bg-muted rounded text-sm">{seedId}</code>
                    </p>
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Results will appear here</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-accent font-medium">Processing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span>Calculating...</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sources</span>
                    <span>Multiple platforms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seed;
