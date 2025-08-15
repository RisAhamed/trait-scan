
import React, { useState } from 'react';
import { Search, Moon, Sun, User, HelpCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { usePlan } from '@/lib/plan';
import { useNavigate } from 'react-router-dom';
import OnboardingModal from '@/components/OnboardingModal';

interface HeaderProps {
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDark = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { plan, setPlan, isPro } = usePlan();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
    // TODO: Implement global search functionality
  };

  const handleStartTour = () => {
    setShowOnboarding(true);
  };

  const togglePlan = () => {
    setPlan(isPro ? 'free' : 'pro');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-xl bg-background/90 supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Social Persona Finder</h1>
                <p className="text-xs text-muted-foreground">Discover digital identities</p>
              </div>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search personas, traits, or platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Global search"
              />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Plan Badge & Dev Toggle */}
            <div className="flex items-center gap-2">
              <Badge 
                variant={isPro ? "default" : "outline"}
                className={isPro ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white border-0" : ""}
              >
                {isPro && <Crown className="h-3 w-3 mr-1" />}
                {plan.toUpperCase()}
              </Badge>
              
              {/* Dev-only plan toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlan}
                className="text-xs hidden md:flex"
              >
                Switch to {isPro ? 'Free' : 'Pro'}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleStartTour}
              aria-label="Start tour"
              title="Take a tour"
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <User className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/pricing')}>
                  <Crown className="mr-2 h-4 w-4" />
                  Pricing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
