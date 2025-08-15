
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ResultsDashboard from '@/components/ResultsDashboard';
import sampleSeedData from '@/mock-data/sample-seed.json';

const Seed = () => {
  const { seedId } = useParams<{ seedId: string }>();
  const [loading, setLoading] = useState(true);
  const [seedData, setSeedData] = useState<any>(null);

  useEffect(() => {
    // Simulate loading and use mock data
    const timer = setTimeout(() => {
      setSeedData(sampleSeedData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [seedId]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Analysis - AI Social Persona Finder</title>
        </Helmet>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
              <h2 className="text-2xl font-semibold">Analyzing Persona</h2>
              <p className="text-muted-foreground max-w-md">
                Our AI is processing the social data and building a comprehensive personality profile...
              </p>
              <div className="text-sm text-muted-foreground">
                Seed ID: <code className="px-2 py-1 bg-muted rounded">{seedId}</code>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Persona Analysis Results - AI Social Persona Finder</title>
        <meta name="description" content="View detailed personality analysis and behavioral insights." />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Persona Analysis</h1>
                <p className="text-muted-foreground">
                  Seed ID: <code className="px-2 py-1 bg-muted rounded text-sm">{seedId}</code>
                </p>
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <ResultsDashboard seedData={seedData} />
        </div>
      </div>
    </>
  );
};

export default Seed;
