
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, Users, Eye } from 'lucide-react';
import { usePlan } from '@/lib/plan';
import PaywallDialog from './PaywallDialog';

interface Connection {
  platform: string;
  handle: string;
  url: string;
  relation?: string;
  confidence: number;
  bio?: string;
  evidence?: Array<{ text: string; url: string }>;
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

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'bg-blue-500';
      case 'linkedin': return 'bg-blue-700';
      case 'medium': return 'bg-green-600';
      case 'github': return 'bg-gray-800';
      default: return 'bg-accent';
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-success/10 text-success border-success/20';
    if (confidence >= 0.6) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-danger/10 text-danger border-danger/20';
  };

  const handleRowClick = (connection: Connection) => {
    if (!isPro) {
      setShowPaywall(true);
      return;
    }
    
    if (connection.evidence && onEvidenceClick) {
      onEvidenceClick(connection.evidence);
    }
  };

  const displayConnections = isPro ? connections : connections.slice(0, 2);

  return (
    <>
      <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            {title}
            {!isPro && (
              <Badge variant="outline" className="ml-auto">
                Limited Preview
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Handle</TableHead>
                  <TableHead>Relation</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayConnections.map((connection, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleRowClick(connection)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPlatformColor(connection.platform)}`} />
                        <span className="text-sm font-medium">{connection.platform}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{connection.handle}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {connection.relation || 'Connected'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getConfidenceBadge(connection.confidence)}>
                        {Math.round(connection.confidence * 100)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {connection.evidence && (
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {!isPro && connections.length > 2 && (
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent flex items-end justify-center pb-4">
                <Button
                  onClick={() => setShowPaywall(true)}
                  className="bg-gradient-to-r from-accent via-secondary to-primary text-white"
                >
                  Unlock {connections.length - 2} More
                </Button>
              </div>
            )}
          </div>
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
