
import React, { useState, useEffect } from 'react';
import { BarChart3, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnalyticsEvents, clearAnalyticsEvents } from '@/lib/analytics';

const Analytics = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setEvents(getAnalyticsEvents(20));
  }, []);

  const handleClearEvents = () => {
    clearAnalyticsEvents();
    setEvents([]);
  };

  const handleDownloadEvents = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-events-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatPayload = (payload: any) => {
    if (typeof payload === 'object') {
      return JSON.stringify(payload, null, 2);
    }
    return String(payload);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-accent" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              View recent user interactions and system events.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadEvents}>
              <Download className="h-4 w-4 mr-2" />
              Export Events
            </Button>
            <Button variant="outline" onClick={handleClearEvents}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Events
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="card-surface">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="card-surface">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {events.filter(e => e.name === 'seed_created').length}
              </div>
              <p className="text-xs text-muted-foreground">Seeds Created</p>
            </CardContent>
          </Card>
          <Card className="card-surface">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {events.filter(e => e.name === 'report_downloaded').length}
              </div>
              <p className="text-xs text-muted-foreground">Reports Downloaded</p>
            </CardContent>
          </Card>
          <Card className="card-surface">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {events.filter(e => e.name === 'tour_completed').length}
              </div>
              <p className="text-xs text-muted-foreground">Tours Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card className="card-surface">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>
              Last 20 user interactions and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No analytics events recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="border border-border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {event.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {event.userId?.slice(-8)}
                      </span>
                    </div>
                    {Object.keys(event.payload).length > 0 && (
                      <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                        {formatPayload(event.payload)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
