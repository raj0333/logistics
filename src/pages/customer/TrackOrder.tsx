import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Plus, TrendingUp, Search, CheckCircle, Truck, Box } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/customer", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "New Order", path: "/customer/new-order", icon: <Plus className="w-4 h-4" /> },
  { label: "My Orders", path: "/customer/orders", icon: <Package className="w-4 h-4" /> },
  { label: "Track", path: "/customer/track", icon: <MapPin className="w-4 h-4" /> },
];

const trackingSteps = [
  { label: "Order Confirmed", time: "10:00 AM", icon: <Box className="w-4 h-4" />, done: true },
  { label: "Dispatched from Warehouse", time: "10:45 AM", icon: <Package className="w-4 h-4" />, done: true },
  { label: "In Transit to Workshop", time: "11:30 AM", icon: <Truck className="w-4 h-4" />, done: true },
  { label: "Delivered", time: "—", icon: <CheckCircle className="w-4 h-4" />, done: false },
];

const TrackOrder = () => {
  const [searched, setSearched] = useState(false);

  return (
    <DashboardLayout navItems={navItems}>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Track Shipment</h1>

        <div className="flex gap-2">
          <Input placeholder="Enter order ID (e.g. TF-4501)" className="flex-1" />
          <Button variant="hero" onClick={() => setSearched(true)}>
            <Search className="w-4 h-4" /> Track
          </Button>
        </div>

        {searched && (
          <Card className="shadow-[var(--card-shadow)] animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="font-bold text-foreground">TF-4501</p>
                  <p className="text-sm text-muted-foreground">Bridgestone 205/55R16 x4 → AutoCare Workshop</p>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700">In Transit</span>
              </div>

              <div className="space-y-0">
                {trackingSteps.map((step, i) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {step.icon}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-10 ${step.done ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                    <div className="pb-10">
                      <p className={`font-medium text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrackOrder;
