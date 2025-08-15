
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from "@/components/ui/sidebar";
import { PlanProvider } from "@/lib/plan";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import Index from "./pages/Index";
import UploadPage from "./pages/Upload";
import Seed from "./pages/Seed";
import Privacy from "./pages/Privacy";
import RemovalRequest from "./pages/RemovalRequest";
import Analytics from "./pages/Analytics";
import Demo from "./pages/Demo";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PlanProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className={isDark ? 'dark' : ''}>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background text-foreground">
                    <AppSidebar />
                    
                    <div className="flex-1 flex flex-col">
                      <Header
                        onThemeToggle={toggleTheme}
                        isDark={isDark}
                      />
                      
                      <main className="flex-1 overflow-auto">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/upload" element={<UploadPage />} />
                          <Route path="/seed/:seedId" element={<Seed />} />
                          <Route path="/demo" element={<Demo />} />
                          <Route path="/analytics" element={<Analytics />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/support/remove" element={<RemovalRequest />} />
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </PlanProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
