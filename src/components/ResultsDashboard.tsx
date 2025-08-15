
import React, { useState } from 'react';
import { Download, Share2, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PersonaCard from './PersonaCard';
import PersonaTraitBars from './PersonaTraitBars';
import ConnectedPeopleList from './ConnectedPeopleList';
import RelationshipGraph2D from './RelationshipGraph2D';
import EvidenceModal from './EvidenceModal';

interface ResultsDashboardProps {
  seedData: any;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ seedData }) => {
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any[]>([]);
  const { toast } = useToast();

  const handleRegenerateScan = () => {
    toast({
      title: "Regenerating Analysis",
      description: "Mock re-run queued successfully"
    });
  };

  const handleSavePersona = () => {
    toast({
      title: "Persona Saved",
      description: "Analysis saved to your local collection"
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Downloading Report",
      description: "PDF report generation started"
    });
  };

  const handleShare = () => {
    const mockShareUrl = `${window.location.origin}/seed/${seedData.seed_id}`;
    navigator.clipboard.writeText(mockShareUrl);
    toast({
      title: "Link Copied",
      description: "Share URL copied to clipboard"
    });
  };

  const handleEvidenceClick = (evidence: any[]) => {
    setSelectedEvidence(evidence);
    setEvidenceModalOpen(true);
  };

  // Transform data for graph
  const graphNodes = seedData.identity?.accounts?.map((acc: any, idx: number) => ({
    id: acc.handle,
    label: acc.handle,
    group: acc.platform,
    platform: acc.platform,
    confidence: acc.confidence
  })) || [];

  const graphLinks = seedData.similar?.map((sim: any, idx: number) => ({
    source: seedData.identity?.accounts?.[0]?.handle || 'user',
    target: sim.handle,
    weight: sim.similarity
  })) || [];

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end">
        <div className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] p-2 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRegenerateScan}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={handleSavePersona}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Persona Card */}
        <div className="lg:col-span-6">
          <PersonaCard
            personaData={seedData.persona}
            name="Analysis Subject"
            platform="Multi-platform"
          />
        </div>

        {/* Persona Traits */}
        <div className="lg:col-span-6">
          <PersonaTraitBars traits={seedData.persona?.traits || []} />
        </div>

        {/* Connected People */}
        <div className="lg:col-span-6">
          <ConnectedPeopleList
            connections={seedData.identity?.accounts || []}
            onEvidenceClick={handleEvidenceClick}
          />
        </div>

        {/* Similar Accounts */}
        <div className="lg:col-span-6">
          <ConnectedPeopleList
            title="Similar Profiles"
            connections={seedData.similar?.map((sim: any) => ({
              platform: sim.platform,
              handle: sim.handle,
              url: sim.url,
              relation: `${Math.round(sim.similarity * 100)}% similar`,
              confidence: sim.similarity,
              bio: sim.why
            })) || []}
            onEvidenceClick={handleEvidenceClick}
          />
        </div>

        {/* Relationship Graph */}
        <div className="lg:col-span-12">
          <RelationshipGraph2D
            nodes={graphNodes}
            links={graphLinks}
            onNodeClick={(node) => {
              const account = seedData.identity?.accounts?.find((acc: any) => acc.handle === node.id);
              if (account?.evidence) {
                handleEvidenceClick(account.evidence);
              }
            }}
          />
        </div>
      </div>

      {/* Evidence Modal */}
      <EvidenceModal
        open={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
        evidence={selectedEvidence}
      />
    </div>
  );
};

export default ResultsDashboard;
