
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

interface UsageMeterProps {
  used: number;
  limit: number;
}

const UsageMeter: React.FC<UsageMeterProps> = ({ used, limit }) => {
  const percentage = Math.min((used / limit) * 100, 100);
  const isNearLimit = percentage >= 80;

  return (
    <div className="p-4 backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
      <div className="flex items-center gap-2 mb-3">
        <Zap className={`h-4 w-4 ${isNearLimit ? 'text-warning' : 'text-accent'}`} />
        <span className="text-sm font-medium">Daily Usage</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{used} used</span>
          <span>{limit} limit</span>
        </div>
        <Progress 
          value={percentage} 
          className={`h-2 ${isNearLimit ? 'text-warning' : 'text-accent'}`}
        />
      </div>
      
      {isNearLimit && (
        <p className="text-xs text-warning mt-2">
          You're running low on scans. Consider upgrading to Pro for unlimited access.
        </p>
      )}
    </div>
  );
};

export default UsageMeter;
