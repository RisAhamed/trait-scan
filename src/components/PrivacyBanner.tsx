// src/components/PrivacyBanner.tsx
import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('privacy_banner_dismissed');
    if (!bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('privacy_banner_dismissed', 'true');
    setIsVisible(false);
  };

  const handleManagePreferences = () => {
    // FIX: Changed from `/settings/privacy` to `/settings`
    navigate('/settings');
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="card-surface p-4 shadow-lg border border-border">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-3">
            <p className="text-sm">
              We analyze public social media data to generate insights. Your privacy matters to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                size="sm" 
                onClick={handleManagePreferences}
                className="btn-primary"
              >
                Manage Preferences
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDismiss}
              >
                Dismiss
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyBanner;