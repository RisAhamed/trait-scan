
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-xl text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
          <CardHeader>
            <CardTitle>What would you like to do?</CardTitle>
            <CardDescription>
              Choose an option below to continue exploring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="flex-1 gap-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white border-0"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
