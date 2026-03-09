import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Package, MapPin, Plus, TrendingUp } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/customer", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "New Order", path: "/customer/new-order", icon: <Plus className="w-4 h-4" /> },
  { label: "My Orders", path: "/customer/orders", icon: <Package className="w-4 h-4" /> },
  { label: "Track", path: "/customer/track", icon: <MapPin className="w-4 h-4" /> },
];

const orders = [
  { id: "TF-4501", item: "Bridgestone 205/55R16 x4", drop: "AutoCare Workshop, Sector 22", status: "In Transit", date: "Mar 7, 2026", amount: "₹18,400" },
  { id: "TF-4500", item: "MRF ZLX 185/65R15 x2", drop: "Highway Motors, Ring Road", status: "Delivered", date: "Mar 6, 2026", amount: "₹7,200" },
  { id: "TF-4499", item: "Brake Pads + Oil Filter", drop: "Sharma Garage, Old City", status: "Delivered", date: "Mar 5, 2026", amount: "₹3,800" },
  { id: "TF-4498", item: "Alloy Rims 17\" Set", drop: "City Auto Hub", status: "Cancelled", date: "Mar 4, 2026", amount: "₹0" },
  { id: "TF-4497", item: "CEAT Milaze 155/80R13 x4", drop: "Gupta Tire House", status: "Delivered", date: "Mar 3, 2026", amount: "₹12,600" },
];

const statusColor: Record<string, string> = {
  "In Transit": "bg-amber-100 text-amber-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-destructive/10 text-destructive",
  Pending: "bg-blue-100 text-blue-700",
};

const MyOrders = () => (
  <DashboardLayout navItems={navItems}>
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
      <Card className="shadow-[var(--card-shadow)]">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg"><Package className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.item}</p>
                    <p className="text-xs text-muted-foreground">→ {o.drop} • {o.date}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[o.status]}`}>{o.status}</span>
                  <p className="text-sm font-semibold text-foreground">{o.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default MyOrders;
