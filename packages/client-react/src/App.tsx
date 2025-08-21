
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import Import from "./pages/Import";
import Tags from "./pages/Tags";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-background">
                  <main className="container mx-auto px-4 py-4">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route
                        path="/transactions"
                        element={
                          <ProtectedRoute>
                            <Transactions />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/import"
                        element={
                          <ProtectedRoute>
                            <Import />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/tags"
                        element={
                          <ProtectedRoute>
                            <Tags />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
