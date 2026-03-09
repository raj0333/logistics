import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle, MapPin, Plus, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/customer", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "New Order", path: "/customer/new-order", icon: <Plus className="w-4 h-4" /> },
  { label: "My Orders", path: "/customer/orders", icon: <Package className="w-4 h-4" /> },
  { label: "Track", path: "/customer/track", icon: <MapPin className="w-4 h-4" /> },
];

const CustomerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Total Orders", value: "24", icon: <Package className="w-5 h-5" />, color: "text-primary" },
    { label: "In Transit", value: "3", icon: <Clock className="w-5 h-5" />, color: "text-amber-500" },
    { label: "Delivered", value: "21", icon: <CheckCircle className="w-5 h-5" />, color: "text-emerald-500" },
  ];

  const recentOrders = [
    { id: "TF-4501", item: "Bridgestone 205/55R16 x4", drop: "AutoCare Workshop, Sector 22", status: "In Transit", time: "2 hrs ago" },
    { id: "TF-4500", item: "MRF ZLX 185/65R15 x2", drop: "Highway Motors, Ring Road", status: "Delivered", time: "5 hrs ago" },
    { id: "TF-4499", item: "Brake Pads Set + Oil Filter", drop: "Sharma Garage, Old City", status: "Delivered", time: "Yesterday" },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name}! 🔧</h1>
          <p className="text-muted-foreground mt-1">Track your tire & parts orders</p>
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
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Need tires or spare parts?</h3>
              <p className="text-muted-foreground text-sm">Place a new order and get it delivered to your workshop</p>
            </div>
            <Link to="/customer/new-order">
              <Button variant="hero" size="lg">
                <Plus className="w-4 h-4" /> New Order
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.item}</p>
                      <p className="text-xs text-muted-foreground">→ {order.drop}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "In Transit" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
