import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import NewOrder from "./pages/customer/NewOrder";
import MyOrders from "./pages/customer/MyOrders";
import TrackOrder from "./pages/customer/TrackOrder";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AvailableDeliveries from "./pages/driver/AvailableDeliveries";
import MyDeliveries from "./pages/driver/MyDeliveries";
import Earnings from "./pages/driver/Earnings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to={user?.role === "driver" ? "/driver" : "/customer"} />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
    <Route path="/customer/new-order" element={<ProtectedRoute role="customer"><NewOrder /></ProtectedRoute>} />
    <Route path="/customer/orders" element={<ProtectedRoute role="customer"><MyOrders /></ProtectedRoute>} />
    <Route path="/customer/track" element={<ProtectedRoute role="customer"><TrackOrder /></ProtectedRoute>} />
    <Route path="/driver" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
    <Route path="/driver/available" element={<ProtectedRoute role="driver"><AvailableDeliveries /></ProtectedRoute>} />
    <Route path="/driver/deliveries" element={<ProtectedRoute role="driver"><MyDeliveries /></ProtectedRoute>} />
    <Route path="/driver/earnings" element={<ProtectedRoute role="driver"><Earnings /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
