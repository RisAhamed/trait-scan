
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Zap } from 'lucide-react';

interface PaywallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  onUpgrade?: () => void;
}

const PaywallDialog: React.FC<PaywallDialogProps> = ({
  isOpen,
  onClose,
  feature,
  onUpgrade
}) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-background/95 border border-border/50">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-accent via-secondary to-primary flex items-center justify-center">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Unlock {feature}
          </DialogTitle>
          <DialogDescription className="text-base">
            This feature is available with our Pro plan. Upgrade now to access advanced persona analysis and unlimited scans.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Unlimited persona scans</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-4 w-4 text-secondary" />
              <span>Advanced AI analysis</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span>Priority support</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Maybe Later
            </Button>
            <Button 
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-accent via-secondary to-primary text-white hover:opacity-90"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallDialog;
