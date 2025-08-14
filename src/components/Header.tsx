
import React, { useState } from 'react';
import { Search, Moon, Sun, User, Menu, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import OnboardingModal from '@/components/OnboardingModal';

interface HeaderProps {
  onMenuToggle?: () => void;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onThemeToggle, isDark = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
    // TODO: Implement global search functionality
  };

  const handleStartTour = () => {
    setShowOnboarding(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden"
              aria-label="Toggle sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
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
                className="pl-10 input-field"
                aria-label="Global search"
              />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
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
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="text-danger">
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
