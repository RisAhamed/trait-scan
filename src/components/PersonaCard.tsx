
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonaData } from '@/lib/api';
import { User, Sparkles } from 'lucide-react';

interface PersonaCardProps {
  personaData: PersonaData;
  name?: string;
  platform?: string;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ 
  personaData, 
  name = "Anonymous User",
  platform = "Multi-platform"
}) => {
  const topTraits = personaData.traits
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  const getConfidenceBadgeClass = (confidence: number) => {
    if (confidence >= 0.8) return 'confidence-high';
    if (confidence >= 0.6) return 'confidence-medium';
    return 'confidence-low';
  };

  const overallConfidence = personaData.traits.reduce((sum, trait) => sum + trait.confidence, 0) / personaData.traits.length;

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <p className="text-sm text-muted-foreground">{platform}</p>
            </div>
          </div>
          <Badge className={getConfidenceBadgeClass(overallConfidence)}>
            {Math.round(overallConfidence * 100)}% confident
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Personality Summary</p>
          <p className="text-sm leading-relaxed">{personaData.summary}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Top Traits</p>
          <div className="space-y-2">
            {topTraits.map((trait, index) => (
              <div key={trait.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{trait.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 trait-bar h-2">
                    <div 
                      className="trait-fill bg-accent" 
                      style={{ width: `${trait.score * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {Math.round(trait.score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Top Interests</p>
          <div className="flex flex-wrap gap-1">
            {personaData.top_interests.slice(0, 4).map((interest, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {personaData.top_interests.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{personaData.top_interests.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {personaData.sample_quotes.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Sample Quote
            </p>
            <blockquote className="text-xs italic text-muted-foreground border-l-2 border-accent/30 pl-3">
              "{personaData.sample_quotes[0]}"
            </blockquote>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonaCard;
