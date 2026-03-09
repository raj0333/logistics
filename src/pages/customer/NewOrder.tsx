import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, MapPin, Plus, TrendingUp, Wrench } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { label: "Dashboard", path: "/customer", icon: <TrendingUp className="w-4 h-4" /> },
  { label: "New Order", path: "/customer/new-order", icon: <Plus className="w-4 h-4" /> },
  { label: "My Orders", path: "/customer/orders", icon: <Package className="w-4 h-4" /> },
  { label: "Track", path: "/customer/track", icon: <MapPin className="w-4 h-4" /> },
];

const NewOrder = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed! A fleet driver will be assigned for delivery.");
  };

  return (
    <DashboardLayout navItems={navItems}>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Place New Order</h1>
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="w-5 h-5 text-primary" /> Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Product Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tires">🛞 Tires</SelectItem>
                    <SelectItem value="rims">⚙️ Rims & Alloys</SelectItem>
                    <SelectItem value="brakes">🔧 Brake Parts</SelectItem>
                    <SelectItem value="engine">🏎️ Engine Parts</SelectItem>
                    <SelectItem value="accessories">🔩 Accessories & Misc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Item Description</Label>
                <Input placeholder="e.g. Bridgestone 205/55R16 x4" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Delivery Address</Label>
                  <Input placeholder="Workshop / garage address" required />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input placeholder="+91 9876543210" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">🚗 Car</SelectItem>
                      <SelectItem value="suv">🚙 SUV / MUV</SelectItem>
                      <SelectItem value="truck">🚛 Truck / Commercial</SelectItem>
                      <SelectItem value="bike">🏍️ Two-Wheeler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Urgency</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">📦 Standard (2-3 days)</SelectItem>
                      <SelectItem value="express">⚡ Express (Same day)</SelectItem>
                      <SelectItem value="urgent">🔥 Urgent (2-4 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea placeholder="Any specific brand, size, or handling notes..." />
              </div>
              <Button type="submit" variant="hero" className="w-full" size="lg">
                <Plus className="w-4 h-4" /> Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
