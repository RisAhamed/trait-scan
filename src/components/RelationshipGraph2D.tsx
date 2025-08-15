
import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Crown } from 'lucide-react';
import { usePlan } from '@/lib/plan';
import PaywallDialog from './PaywallDialog';

interface GraphNode {
  id: string;
  label: string;
  group: string;
  platform?: string;
  confidence?: number;
}

interface GraphLink {
  source: string;
  target: string;
  weight?: number;
}

interface RelationshipGraph2DProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeClick?: (node: GraphNode) => void;
}

const RelationshipGraph2D: React.FC<RelationshipGraph2DProps> = ({
  nodes,
  links,
  onNodeClick
}) => {
  const { isPro } = usePlan();
  const [showPaywall, setShowPaywall] = useState(false);
  const fgRef = useRef<any>();

  const getNodeColor = (node: GraphNode) => {
    switch (node.group?.toLowerCase()) {
      case 'twitter': return '#1DA1F2';
      case 'linkedin': return '#0077B5';
      case 'medium': return '#00AB6C';
      case 'github': return '#333333';
      default: return '#8B5CF6';
    }
  };

  const handleNodeClick = (node: any) => {
    if (!isPro) {
      setShowPaywall(true);
      return;
    }
    
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  return (
    <>
      <Card className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-accent" />
            Relationship Network
            {!isPro && (
              <Crown className="h-4 w-4 text-primary ml-auto" />
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="relative h-96 w-full">
            {isPro ? (
              <ForceGraph2D
                ref={fgRef}
                graphData={{ nodes, links }}
                nodeColor={getNodeColor}
                nodeLabel={(node: any) => `${node.label} (${node.group})`}
                linkColor={() => '#666666'}
                linkWidth={(link: any) => Math.sqrt(link.weight || 1) * 2}
                onNodeClick={handleNodeClick}
                nodeCanvasObject={(node: any, ctx: any, globalScale: any) => {
                  const label = node.label;
                  const fontSize = 12/globalScale;
                  ctx.font = `${fontSize}px Sans-Serif`;
                  const textWidth = ctx.measureText(label).width;
                  const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                  ctx.fillStyle = getNodeColor(node);
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
                  ctx.fill();

                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = '#333';
                  ctx.fillText(label, node.x, node.y + 15);
                }}
                cooldownTicks={100}
                onEngineStop={() => fgRef.current?.zoomToFit(400)}
              />
            ) : (
              <div className="relative h-full w-full">
                {/* Blurred background with mock data */}
                <div className="absolute inset-0 blur-sm opacity-50">
                  <div className="flex items-center justify-center h-full">
                    <div className="grid grid-cols-3 gap-8 text-center">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-accent rounded-full mb-2" />
                          <div className="w-16 h-3 bg-muted rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Crown className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Relationship Network</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Visualize connections between social profiles and discover relationship patterns
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
          </div>
        </CardContent>
      </Card>

      <PaywallDialog
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Relationship Network Analysis"
      />
    </>
  );
};

export default RelationshipGraph2D;
