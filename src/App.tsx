// C:/Users/riswa/Desktop/app/AI Persona Finder/trait-scan/src/App.tsx
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import { SidebarProvider } from "@/components/ui/sidebar";
import { PlanProvider } from "@/lib/plan";

import ProtectedRoute from '@/components/ProtectedRoute';
import { AppSidebar } from "@/components/Sidebar";
import Header from "@/components/Header";

// Public Pages
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import RemovalRequest from "./pages/RemovalRequest";
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import NotFound from "./pages/NotFound";

// Protected Pages
import UploadPage from "./pages/Upload";
import Seed from "./pages/Seed";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Personas from './pages/Personas';
import Search from './pages/Search';
import Reports from './pages/Reports';

const queryClient = new QueryClient();

const AppLayout = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <div className={isDark ? 'dark' : ''}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header onThemeToggle={toggleTheme} isDark={isDark} />
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};


const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PlanProvider>
              <Routes>
                {/* Standalone Auth Routes */}
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Main App Layout */}
                <Route element={<AppLayout />}>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/removal-request" element={<RemovalRequest />} />

                  {/* Protected Routes */}
                  <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
                  <Route path="/seed/:seedId" element={<ProtectedRoute><Seed /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/personas" element={<ProtectedRoute><Personas /></ProtectedRoute>} />
                  <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                </Route>
                
                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PlanProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
