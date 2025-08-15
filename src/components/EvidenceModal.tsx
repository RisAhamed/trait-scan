
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Evidence {
  text: string;
  url: string;
  platform?: string;
}

interface EvidenceModalProps {
  open: boolean;
  onClose: () => void;
  evidence: Evidence[];
}

const EvidenceModal: React.FC<EvidenceModalProps> = ({
  open,
  onClose,
  evidence
}) => {
  const { toast } = useToast();

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Evidence text copied successfully"
    });
  };

  const getPlatformColor = (platform: string = 'unknown') => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'bg-blue-500';
      case 'linkedin': return 'bg-blue-700';
      case 'medium': return 'bg-green-600';
      case 'github': return 'bg-gray-800';
      default: return 'bg-accent';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl backdrop-blur-xl bg-background/95 border border-border/50 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Supporting Evidence
          </DialogTitle>
          <DialogDescription>
            Evidence snippets that support the personality analysis and connections.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {evidence.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No evidence available for this item.</p>
            </div>
          ) : (
            evidence.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  {item.platform && (
                    <Badge className={`${getPlatformColor(item.platform)} text-white`}>
                      {item.platform}
                    </Badge>
                  )}
                  <div className="flex gap-2 ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyText(item.text)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    {item.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(item.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Source
                      </Button>
                    )}
                  </div>
                </div>
                
                <blockquote className="text-sm leading-relaxed border-l-2 border-accent/30 pl-4 italic">
                  "{item.text}"
                </blockquote>
                
                {item.url && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Source:</span>{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {item.url}
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvidenceModal;
