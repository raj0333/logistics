import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Package, DollarSign, Navigation, TrendingUp, CheckCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/driver", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Available", path: "/driver/available", icon: <Package className="w-4 h-4" /> },
  { label: "My Deliveries", path: "/driver/deliveries", icon: <Navigation className="w-4 h-4" /> },
  { label: "Earnings", path: "/driver/earnings", icon: <DollarSign className="w-4 h-4" /> },
];

const deliveries = [
  { id: "TF-4501", item: "Bridgestone 205/55R16 x4 → AutoCare Workshop", status: "Active", earned: "₹520", date: "Today" },
  { id: "TF-4500", item: "MRF ZLX x2 → Highway Motors", status: "Completed", earned: "₹380", date: "Today" },
  { id: "TF-4499", item: "Brake Pads → Sharma Garage", status: "Completed", earned: "₹220", date: "Yesterday" },
  { id: "TF-4497", item: "CEAT Milaze x4 → Gupta Tire House", status: "Completed", earned: "₹450", date: "Yesterday" },
  { id: "TF-4490", item: "Alloy Rims 17\" → City Auto Hub", status: "Completed", earned: "₹650", date: "Mar 5" },
];

const MyDeliveries = () => (
  <DashboardLayout navItems={navItems}>
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">My Deliveries</h1>
      <Card className="shadow-[var(--card-shadow)]">
        <CardContent className="p-0 divide-y divide-border">
          {deliveries.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${d.status === "Active" ? "bg-primary/10" : "bg-muted"}`}>
                  {d.status === "Active" ? <Navigation className="w-4 h-4 text-primary" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{d.id}</p>
                  <p className="text-xs text-muted-foreground">{d.item}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground text-sm">{d.earned}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default MyDeliveries;
