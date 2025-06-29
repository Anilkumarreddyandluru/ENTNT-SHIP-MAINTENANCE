
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import NotFound from "./pages/NotFound";

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
                <Route path="components" element={
                  <ProtectedRoute allowedRoles={['Admin', 'Engineer']}>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Components Management</h1>
                      <p className="text-gray-600 mt-2">Components page coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="jobs" element={
                  <ProtectedRoute allowedRoles={['Admin', 'Engineer']}>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Jobs Management</h1>
                      <p className="text-gray-600 mt-2">Jobs page coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="calendar" element={
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Maintenance Calendar</h1>
                    <p className="text-gray-600 mt-2">Calendar page coming soon...</p>
                  </div>
                } />
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
