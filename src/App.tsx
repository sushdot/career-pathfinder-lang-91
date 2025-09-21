import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProvider } from "@/contexts/UserContext";
import MainLayout from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import CollegeMap from "./components/CollegeMap";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Scholarships from "./pages/Scholarships";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component loaded with UserProfile route");
  return (
  <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                  <Route path="/auth" element={<MainLayout showNav={false} showFooter={false}><Auth /></MainLayout>} />
                  <Route path="/profile" element={<MainLayout><UserProfile /></MainLayout>} />
                  <Route path="/quiz" element={<MainLayout><Quiz /></MainLayout>} />
                  <Route path="/results" element={<MainLayout><Results /></MainLayout>} />
                  <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
                  <Route path="/colleges" element={<MainLayout><CollegeMap /></MainLayout>} />
                  <Route path="/scholarships" element={<MainLayout><Scholarships /></MainLayout>} />
                  <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                  <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </UserProvider>
  </QueryClientProvider>
  );
};

export default App;
