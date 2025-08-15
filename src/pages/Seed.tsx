
import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Seed = () => {
  const { seedId } = useParams<{ seedId: string }>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Persona Results</h1>
              <p className="text-muted-foreground">Seed ID: {seedId}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Personality Traits</CardTitle>
                <CardDescription>AI-analyzed personality dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Persona analysis results will appear here...
                  <br />
                  <span className="text-sm">TODO: Integrate with persona analysis API</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Identity Matches</CardTitle>
                <CardDescription>Cross-platform account connections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Identity matching results will appear here...
                  <br />
                  <span className="text-sm">TODO: Integrate with identity matching API</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Persona summary will appear here...
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
              <CardHeader>
                <CardTitle>Similar Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Similar profiles will appear here...
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seed;
