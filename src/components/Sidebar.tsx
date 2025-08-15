
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Upload,
  Users,
  Search,
  Settings,
  PlayCircle,
  BarChart3,
  FileText,
  Crown,
  CreditCard
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePlan } from '@/lib/plan';
import UsageMeter from '@/components/UsageMeter';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: 'Upload & Analyze', url: '/upload', icon: Upload },
  { title: 'My Personas', url: '/personas', icon: Users },
  { title: 'Search Library', url: '/search', icon: Search },
  { title: 'Demo Examples', url: '/demo', icon: PlayCircle },
];

const toolsItems = [
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Pricing', url: '/pricing', icon: CreditCard },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { isPro } = usePlan();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium shadow-sm" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-border backdrop-blur-xl bg-background/95`}
      collapsible="icon"
    >
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`}
                      aria-label={item.title}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`}
                      aria-label={item.title}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-4 space-y-4">
          {/* Usage meter for free users */}
          {!isPro && (
            <UsageMeter used={3} limit={5} />
          )}

          {/* Upgrade prompt */}
          <div className="backdrop-blur-xl bg-background/60 border border-border/20 rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)] p-4 text-center">
            <Crown className={`h-8 w-8 mx-auto mb-2 ${isPro ? 'text-accent' : 'text-muted-foreground'}`} />
            <p className="text-sm text-muted-foreground mb-2">
              {isPro ? 'You have Pro!' : 'Enjoying the insights?'}
            </p>
            <Button 
              className={`w-full text-sm py-2 ${isPro ? 'bg-accent text-accent-foreground' : 'bg-gradient-to-r from-accent via-secondary to-primary text-white hover:opacity-90'}`}
              onClick={() => window.location.href = '/pricing'}
            >
              {isPro ? 'Manage Plan' : 'Upgrade to Pro'}
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
