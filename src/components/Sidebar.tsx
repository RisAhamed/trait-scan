
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
  useSidebar,
} from '@/components/ui/sidebar';
import { usePlan } from '@/lib/plan';
import UsageMeter from '@/components/UsageMeter';

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
  const { isPro } = usePlan();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium shadow-sm" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-border`}
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

        {!collapsed && (
          <div className="mt-auto pt-8 space-y-4">
            {/* Usage meter for free users */}
            {!isPro && (
              <UsageMeter used={3} limit={5} />
            )}

            {/* Upgrade CTA */}
            {!isPro && (
              <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-50/90 via-violet-50/90 to-cyan-50/90 dark:from-indigo-950/40 dark:via-violet-950/40 dark:to-cyan-950/40 border border-indigo-200/50 dark:border-indigo-800/50 p-4 text-center rounded-2xl shadow-[0_6px_30px_-12px_rgba(0,0,0,.25)]">
                <Crown className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Unlock unlimited scans
                </p>
                <NavLink to="/pricing">
                  <button className="w-full text-sm py-2 px-4 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-600 hover:via-violet-600 hover:to-cyan-600 text-white rounded-lg border-0 font-medium">
                    Upgrade to Pro
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
