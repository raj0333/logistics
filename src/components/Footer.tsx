import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Wrench, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-primary/50 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 animate-bounce" />
    </button>
  );
};

const Footer = () => (
  <>
    <BackToTop />
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">TireFleet</span>
            </div>
            <p className="text-sm text-secondary-foreground/60">
              Your trusted platform for vehicle tires, spare parts & logistics delivery across India.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Get Started</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">Services</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Tire Delivery</li>
              <li>Spare Parts Logistics</li>
              <li>Fleet Management</li>
              <li>Express Shipping</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@tirefleet.in</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 1800-TIRE-00</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/50">© {new Date().getFullYear()} TireFleet. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-secondary-foreground/50">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
