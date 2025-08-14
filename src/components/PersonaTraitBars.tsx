
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PersonaTrait } from '@/lib/api';
import { HelpCircle, TrendingUp } from 'lucide-react';

interface PersonaTraitBarsProps {
  traits: PersonaTrait[];
}

const PersonaTraitBars: React.FC<PersonaTraitBarsProps> = ({ traits }) => {
  const getTraitColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'openness': return 'bg-purple-500';
      case 'conscientiousness': return 'bg-blue-500';
      case 'extraversion': return 'bg-green-500';
      case 'agreeableness': return 'bg-yellow-500';
      case 'neuroticism': return 'bg-red-500';
      default: return 'bg-accent';
    }
  };

  const getTraitDescription = (name: string) => {
    switch (name.toLowerCase()) {
      case 'openness':
        return 'Reflects creativity, curiosity, and willingness to try new experiences.';
      case 'conscientiousness':
        return 'Indicates organization, responsibility, and goal-oriented behavior.';
      case 'extraversion':
        return 'Measures sociability, assertiveness, and energy levels.';
      case 'agreeableness':
        return 'Shows cooperation, trust, and consideration for others.';
      case 'neuroticism':
        return 'Represents emotional stability and stress management.';
      default:
        return 'Personality trait measured through behavioral analysis.';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-success';
    if (confidence >= 0.6) return 'text-warning';
    return 'text-danger';
  };

  return (
    <Card className="card-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Personality Traits
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Big Five personality dimensions with confidence scores
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {traits.map((trait) => (
          <div key={trait.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{trait.name}</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-xs">{getTraitDescription(trait.name)}</p>
                      {trait.evidence.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-xs font-medium mb-1">Evidence:</p>
                          <p className="text-xs italic">"{trait.evidence[0]}"</p>
                        </div>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">
                  {Math.round(trait.score * 100)}%
                </span>
                <span className={`text-xs ${getConfidenceColor(trait.confidence)}`}>
                  {Math.round(trait.confidence * 100)}% confidence
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="trait-bar h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`trait-fill h-full rounded-full ${getTraitColor(trait.name)} transition-all duration-1000 ease-out`}
                  style={{ width: `${trait.score * 100}%` }}
                />
              </div>
              
              {/* Confidence indicator overlay */}
              <div 
                className="absolute top-0 h-full w-1 bg-white rounded-full shadow-sm"
                style={{ left: `${trait.confidence * 100}%` }}
                title={`${Math.round(trait.confidence * 100)}% confidence`}
              />
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        ))}
        
        <div className="pt-4 mt-6 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1 h-3 bg-white rounded-full" />
            <span>Confidence indicator shows reliability of each measurement</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaTraitBars;
