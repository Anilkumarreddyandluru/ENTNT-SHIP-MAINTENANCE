
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Jobs from "./pages/Jobs";
import Components from "./pages/Components";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calender";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="ships" element={<Ships />} />
                <Route
                  path="components"
                  element={
                    <ProtectedRoute allowedRoles={['Admin', 'Engineer']}>
                      <Components />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="jobs"
                  element={
                    <ProtectedRoute allowedRoles={['Admin', 'Engineer']}>
                      <Jobs />
                    </ProtectedRoute>
                  }
                />
                <Route path="calendar" element={<Calendar />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
