import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Basic from "./pages/Basic";
import Medium from "./pages/Medium";
import Advanced from "./pages/Advanced";
import Calculator from "./pages/Calculator";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a page reload (not initial load)
    const isReload = window.performance
      .getEntriesByType('navigation')
      .map((nav: any) => nav.type)
      .includes('reload');
    
    // Only redirect to home if it's a reload and not already on home page
    if (isReload && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/medium" element={<Medium />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
