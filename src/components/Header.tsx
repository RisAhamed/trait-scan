// C:/Users/riswa/Desktop/app/AI Persona Finder/trait-scan/src/components/Header.tsx
import React from  'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Moon, Sun, Menu, HelpCircle, Crown, Settings,
} from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { usePlan } from '@/lib/plan';
import OnboardingModal from '@/components/OnboardingModal';

interface HeaderProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDark = false }) => {
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const { toggleSidebar } = useSidebar();
  const { isPro } = usePlan();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl bg-background/95 supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
              aria-label="Toggle sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Social Persona Finder</h1>
              </div>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowOnboarding(true)}
              aria-label="Start tour"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/signin" />
            </SignedIn>
          </div>
        </div>
      </header>

      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
};

export default Header;

