
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import Index from "./pages/Index";
import UploadPage from "./pages/Upload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
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
                    onMenuToggle={toggleSidebar}
                    onThemeToggle={toggleTheme}
                    isDark={isDark}
                  />
                  
                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/upload" element={<UploadPage />} />
                      {/* Placeholder routes - to be implemented */}
                      <Route path="/seed/:seedId" element={<div className="p-8">Results Dashboard - Coming Soon</div>} />
                      <Route path="/personas" element={<div className="p-8">My Personas - Coming Soon</div>} />
                      <Route path="/personas/:id" element={<div className="p-8">Persona Detail - Coming Soon</div>} />
                      <Route path="/search" element={<div className="p-8">Search - Coming Soon</div>} />
                      <Route path="/settings" element={<div className="p-8">Settings - Coming Soon</div>} />
                      <Route path="/demo" element={<div className="p-8">Demo - Coming Soon</div>} />
                      <Route path="/analytics" element={<div className="p-8">Analytics - Coming Soon</div>} />
                      <Route path="/reports" element={<div className="p-8">Reports - Coming Soon</div>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
