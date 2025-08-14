
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { trackEvent } from '@/lib/analytics';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Enter a Handle",
      description: "Start by entering any public social media handle or profile URL.",
      illustration: "🔍",
      action: "Try entering @username or a profile URL"
    },
    {
      title: "Review Persona Report", 
      description: "Get AI-powered insights including personality traits, interests, and behavioral patterns.",
      illustration: "📊",
      action: "Explore the detailed persona analysis"
    },
    {
      title: "Save the Persona",
      description: "Keep interesting personas in your personal library for future reference.",
      illustration: "💾",
      action: "Click 'Save Persona' to add to your collection"
    },
    {
      title: "Share or Download",
      description: "Generate beautiful reports or share insights with your team.",
      illustration: "📤",
      action: "Use 'Download Report' or share links"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    trackEvent('tour_completed', { step: currentStep + 1 });
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    trackEvent('tour_skipped', { step: currentStep });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Welcome to AI Social Persona Finder</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleSkip}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Current Step */}
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">{steps[currentStep].illustration}</div>
            <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <strong>Next:</strong> {steps[currentStep].action}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
