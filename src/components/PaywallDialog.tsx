
import React from 'react';
import { Lock, Zap, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
    onClose();
  };

  const proFeatures = [
    'Unlimited persona scans',
    'Advanced identity matching',
    'Detailed contradiction analysis',
    'Priority processing',
    'PDF report downloads',
    'API access'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-white/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Unlock {feature}
          </DialogTitle>
          <DialogDescription className="text-base">
            This feature requires a Pro plan to access advanced persona analysis capabilities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Pro Features Include:
            </h4>
            <ul className="space-y-2">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white border-0"
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
