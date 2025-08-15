
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ExternalLink, Crown, Eye } from 'lucide-react';
import { usePlan } from '@/lib/plan';
import PaywallDialog from './PaywallDialog';

interface Connection {
  platform: string;
  handle: string;
  url: string;
  relation: string;
  confidence: number;
  bio?: string;
  evidence?: any[];
}

interface ConnectedPeopleListProps {
  connections: Connection[];
  title?: string;
  onEvidenceClick?: (evidence: any[]) => void;
}

const ConnectedPeopleList: React.FC<ConnectedPeopleListProps> = ({
  connections,
  title = "Connected Accounts",
  onEvidenceClick
}) => {
  const { isPro } = usePlan();
  const [showPaywall, setShowPaywall] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return '🐦';
      case 'linkedin': return '💼';
      case 'medium': return '📝';
      case 'github': return '🐙';
      default: return '🌐';
    }
  };

  const getConfidenceBadgeClass = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleRowClick = (connection: Connection) => {
    if (!isPro) {
      setShowPaywall(true);
      return;
    }
    
    if (onEvidenceClick && connection.evidence) {
      onEvidenceClick(connection.evidence);
    }
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <>
      <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            {title}
            {!isPro && (
              <Crown className="h-4 w-4 text-primary ml-auto" />
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {isPro ? (
            <div className="space-y-3">
              {connections.map((connection, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/40 hover:bg-background/60 transition-colors cursor-pointer group"
                  onClick={() => handleRowClick(connection)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-2xl flex-shrink-0">
                      {getPlatformIcon(connection.platform)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">
                          {connection.handle}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => handleExternalLink(e, connection.url)}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {connection.relation}
                        </Badge>
                        <Badge 
                          className={`text-xs text-white ${getConfidenceBadgeClass(connection.confidence)}`}
                        >
                          {Math.round(connection.confidence * 100)}%
                        </Badge>
                      </div>
                      
                      {connection.bio && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {connection.bio}
                        </p>
                      )}
                    </div>

                    {connection.evidence && connection.evidence.length > 0 && (
                      <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
              
              {connections.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No connected accounts found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              {/* Blurred background with mock data */}
              <div className="blur-sm opacity-50 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/40">
                    <div className="w-8 h-8 bg-accent rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-4 bg-muted rounded" />
                      <div className="w-16 h-3 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Crown className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">Connected Accounts</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Discover related social media profiles and connections across platforms
                  </p>
                  <Button
                    onClick={() => setShowPaywall(true)}
                    className="bg-gradient-to-r from-accent via-secondary to-primary text-white"
                  >
                    Unlock Pro Features
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <PaywallDialog
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Connected People Analysis"
      />
    </>
  );
};

export default ConnectedPeopleList;
