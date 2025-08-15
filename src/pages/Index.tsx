
import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import OnboardingModal from '@/components/OnboardingModal';
import PrivacyBanner from '@/components/PrivacyBanner';
import PaywallDialog from '@/components/PaywallDialog';
import { Helmet } from 'react-helmet-async';
import { usePlan } from '@/lib/plan';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { isPro } = usePlan();

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    if (!onboardingCompleted) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Demo function to show paywall
  const handleFeatureClick = (feature: string) => {
    if (!isPro) {
      setShowPaywall(true);
    } else {
      console.log(`Accessing ${feature} feature`);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Social Persona Finder - Know Anyone. Instantly.</title>
        <meta 
          name="description" 
          content="Enter a public handle and get a cross-platform persona summary, evidence-backed insights, and 'look-alike' matches. Powered by advanced AI analysis." 
        />
        <meta name="keywords" content="social media analysis, personality insights, AI persona finder, cross-platform analysis" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="AI Social Persona Finder - Know Anyone. Instantly." />
        <meta property="og:description" content="Enter a public handle and get a cross-platform persona summary, evidence-backed insights, and 'look-alike' matches." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="/placeholder.svg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Social Persona Finder - Know Anyone. Instantly." />
        <meta name="twitter:description" content="Advanced AI-powered social media persona analysis across platforms." />
        <meta name="twitter:image" content="/placeholder.svg" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Hero onFeatureClick={handleFeatureClick} />
        
        <OnboardingModal 
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
        />

        <PaywallDialog
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          feature="Advanced Analysis"
        />
        
        <PrivacyBanner />
      </div>
    </>
  );
};

export default Index;
