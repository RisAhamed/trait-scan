
import React, { useState } from 'react';
import { Search, HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { createSeed } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface InputHandleProps {
  onSubmit?: (seedId: string) => void;
}

const InputHandle: React.FC<InputHandleProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sampleInputs = [
    '@johndoe',
    'https://twitter.com/username',
    'https://linkedin.com/in/profile',
    'username123',
    'https://instagram.com/account'
  ];

  const validateInput = (value: string): boolean => {
    if (!value.trim()) return false;
    
    // Basic validation for username or URL
    const urlPattern = /^https?:\/\//;
    const usernamePattern = /^@?[\w\-\.]+$/;
    
    return urlPattern.test(value) || usernamePattern.test(value);
  };

  const normalizeInput = (value: string): string => {
    return value.trim().replace(/\/$/, ''); // Remove trailing slash
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput(input)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid username or profile URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const normalizedInput = normalizeInput(input);
      const response = await createSeed(normalizedInput);
      
      toast({
        title: "Analysis Started",
        description: `Seed created: ${response.seed_id}`,
      });
      
      if (onSubmit) {
        onSubmit(response.seed_id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setInput(sample);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Enter username or profile URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-10 pr-12 py-4 text-lg input-field"
            disabled={isLoading}
            aria-label="Enter username or profile URL for analysis"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  aria-label="Help and examples"
                >
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-2">
                  <p className="font-medium">Supported formats:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Social media URLs</li>
                    <li>• Usernames (@username)</li>
                    <li>• Profile handles</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
          type="submit"
          className="w-full btn-primary py-4 text-lg"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Persona...
            </>
          ) : (
            'Analyze Persona'
          )}
        </Button>
      </form>

      {/* Sample inputs */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Try these examples:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {sampleInputs.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSampleClick(sample)}
              className="text-xs px-3 py-1 rounded-full hover:bg-muted"
              disabled={isLoading}
            >
              {sample}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputHandle;
