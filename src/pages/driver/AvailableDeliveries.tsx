import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MapPin, DollarSign, Navigation, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", path: "/driver", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "Available", path: "/driver/available", icon: <Package className="w-4 h-4" /> },
  { label: "My Deliveries", path: "/driver/deliveries", icon: <Navigation className="w-4 h-4" /> },
  { label: "Earnings", path: "/driver/earnings", icon: <DollarSign className="w-4 h-4" /> },
];

const deliveries = [
  { id: "TF-4505", item: "Apollo Alnac 4G x4", pickup: "Central Warehouse", drop: "Malik Tire Center, GT Road", distance: "12 km", pay: "₹480", weight: "Heavy" },
  { id: "TF-4506", item: "Disc Brake Rotor Set", pickup: "Parts Depot B", drop: "SpeedFix Garage, MG Road", distance: "5 km", pay: "₹180", weight: "Light" },
  { id: "TF-4507", item: "Alloy Wheels 16\" x4", pickup: "Rim Hub Store", drop: "AutoZone Workshop, Airport Rd", distance: "18 km", pay: "₹650", weight: "Heavy" },
  { id: "TF-4508", item: "Engine Oil 5W-30 x12", pickup: "Lubricant Warehouse", drop: "Quick Service, Sector 8", distance: "7 km", pay: "₹280", weight: "Medium" },
];

const AvailableDeliveries = () => (
  <DashboardLayout navItems={navItems}>
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Available Shipments</h1>
        <p className="text-muted-foreground mt-1">Accept tire & parts deliveries nearby</p>
      </div>

      <div className="grid gap-4">
        {deliveries.map((d) => (
          <Card key={d.id} className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{d.id}</p>
                  <p className="text-sm text-muted-foreground">{d.item}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {d.pickup} → {d.drop}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Navigation className="w-3 h-3" /> {d.distance}</span>
                    <span className="text-xs text-muted-foreground">⚖️ {d.weight}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary">{d.pay}</span>
                <Button variant="hero" onClick={() => toast.success(`Accepted ${d.id}! Navigate to pickup.`)}>
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default AvailableDeliveries;
