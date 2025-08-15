
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UsageMeterProps {
  used: number;
  limit: number;
  label?: string;
}

const UsageMeter: React.FC<UsageMeterProps> = ({ 
  used, 
  limit, 
  label = "Daily scans" 
}) => {
  const percentage = Math.min((used / limit) * 100, 100);
  const isNearLimit = percentage >= 80;

  return (
    <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/20 rounded-2xl p-4 shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
      <div className="flex items-center gap-3 mb-3">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{used} used</span>
          <span>{limit} limit</span>
        </div>
        
        <Progress 
          value={percentage} 
          className={`h-2 ${isNearLimit ? 'text-warning' : 'text-primary'}`}
        />
        
        {isNearLimit && (
          <p className="text-xs text-warning">
            You're approaching your daily limit
          </p>
        )}
      </div>
    </div>
  );
};

export default UsageMeter;
