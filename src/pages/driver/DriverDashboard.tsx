import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, DollarSign, CheckCircle, Navigation, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/driver", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Available", path: "/driver/available", icon: <Package className="w-4 h-4" /> },
  { label: "My Deliveries", path: "/driver/deliveries", icon: <Navigation className="w-4 h-4" /> },
  { label: "Earnings", path: "/driver/earnings", icon: <DollarSign className="w-4 h-4" /> },
];

const DriverDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Today's Deliveries", value: "8", icon: <Package className="w-5 h-5" />, color: "text-primary" },
    { label: "Active Shipment", value: "1", icon: <Navigation className="w-5 h-5" />, color: "text-amber-500" },
    { label: "Today's Earnings", value: "₹2,840", icon: <DollarSign className="w-5 h-5" />, color: "text-emerald-500" },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hey, {user?.name}! 🚛</h1>
          <p className="text-muted-foreground mt-1">Ready to deliver? Here's your overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" /> Active Shipment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground">TF-4501</p>
                <p className="text-sm text-muted-foreground">Bridgestone 205/55R16 x4 → AutoCare Workshop, Sector 22</p>
                <p className="text-xs text-muted-foreground mt-1">Customer: Rajesh Kumar • 📞 +91 98765 43210</p>
              </div>
              <Button variant="hero" size="lg">
                <CheckCircle className="w-4 h-4" /> Mark Delivered
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader><CardTitle className="text-lg">Recent Deliveries</CardTitle></CardHeader>
          <CardContent className="p-0">
            {[
              { id: "TF-4500", item: "MRF ZLX x2 → Highway Motors", earned: "₹380", time: "45 min" },
              { id: "TF-4499", item: "Brake Pads → Sharma Garage", earned: "₹220", time: "1 hr" },
              { id: "TF-4497", item: "CEAT Milaze x4 → Gupta Tire House", earned: "₹450", time: "30 min" },
            ].map((d) => (
              <div key={d.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{d.id}</p>
                    <p className="text-xs text-muted-foreground">{d.item}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{d.earned}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {d.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
