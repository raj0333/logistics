import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, Navigation, TrendingUp, Wallet, Calendar } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/driver", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Available", path: "/driver/available", icon: <Package className="w-4 h-4" /> },
  { label: "My Deliveries", path: "/driver/deliveries", icon: <Navigation className="w-4 h-4" /> },
  { label: "Earnings", path: "/driver/earnings", icon: <DollarSign className="w-4 h-4" /> },
];

const Earnings = () => {
  const earningsData = [
    { period: "Today", amount: "₹2,840", deliveries: 8 },
    { period: "This Week", amount: "₹14,500", deliveries: 42 },
    { period: "This Month", amount: "₹52,300", deliveries: 156 },
  ];

  const weeklyBreakdown = [
    { day: "Mon", amount: "₹1,980", count: 6 },
    { day: "Tue", amount: "₹2,120", count: 7 },
    { day: "Wed", amount: "₹1,850", count: 5 },
    { day: "Thu", amount: "₹2,540", count: 9 },
    { day: "Fri", amount: "₹2,170", count: 8 },
    { day: "Sat", amount: "₹2,840", count: 8 },
    { day: "Sun", amount: "—", count: 0 },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Earnings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {earningsData.map((e) => (
            <Card key={e.period} className="shadow-[var(--card-shadow)]">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {e.period}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">{e.amount}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.deliveries} shipments</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" /> Weekly Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyBreakdown.map((d) => (
                <div key={d.day} className="text-center">
                  <div className={`h-24 rounded-lg flex items-end justify-center pb-2 ${
                    d.count > 0 ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <div className="w-6 bg-primary rounded-md" style={{ height: `${Math.max(d.count * 8, 4)}px` }} />
                  </div>
                  <p className="text-xs font-medium text-foreground mt-2">{d.day}</p>
                  <p className="text-xs text-muted-foreground">{d.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
