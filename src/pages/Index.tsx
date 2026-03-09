import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Zap, Shield, Clock, Wrench, Truck, MapPin, 
  Package, CheckCircle2, Star, Users, Timer, Award, ChevronLeft, ChevronRight
} from "lucide-react";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

const StatsCounter = () => {
  const stats = [
    { icon: <Package className="w-8 h-8" />, value: 50000, suffix: "+", label: "Deliveries Completed", display: "K+" },
    { icon: <Users className="w-8 h-8" />, value: 10000, suffix: "+", label: "Happy Customers", display: "K+" },
    { icon: <Truck className="w-8 h-8" />, value: 500, suffix: "+", label: "Fleet Drivers", display: "+" },
    { icon: <Timer className="w-8 h-8" />, value: 2, suffix: "hr", label: "Avg Delivery Time", display: "hr" },
  ];

  return (
    <section className="bg-secondary py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ icon, value, suffix, label, display }: { icon: React.ReactNode; value: number; suffix: string; label: string; display: string }) => {
  const { count, ref } = useCountUp(value, value > 1000 ? 2000 : 1500);

  const formatCount = (n: number) => {
    if (value >= 1000) return Math.floor(n / 1000) + display;
    return n + display;
  };

  return (
    <div ref={ref} className="group">
      <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-white">{formatCount(count)}</div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  );
};

const testimonials = [
  { name: "Rajesh Kumar", role: "Auto Workshop Owner", quote: "TireFleet has transformed how we receive our parts. Deliveries are always on time!", rating: 5 },
  { name: "Amit Sharma", role: "Fleet Manager", quote: "Real-time tracking gives us complete visibility. Our operations are so much smoother now.", rating: 5 },
  { name: "Priya Singh", role: "Car Dealer", quote: "The variety of tires available and the quick delivery makes TireFleet our go-to supplier.", rating: 5 },
  { name: "Vikram Patel", role: "Tire Shop Owner", quote: "Best logistics partner we've ever had. Their fleet is reliable and professional.", rating: 5 },
  { name: "Sunita Devi", role: "Transport Company", quote: "Bulk tire orders delivered on schedule every single time. Highly recommended!", rating: 5 },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % testimonials.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + testimonials.length) % testimonials.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-secondary py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What Our Customers Say</h2>
        </div>

        <div className="relative">
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 border border-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 border border-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10 text-center">
                    <div className="flex justify-center gap-1 mb-5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-white/90 text-lg italic mb-8 max-w-xl mx-auto">"{t.quote}"</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold text-lg">{t.name}</div>
                        <div className="text-white/60 text-sm">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Wrench className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-white">TireFleet</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="hero">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero with background image */}
      <section
        className="relative min-h-[600px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6 border border-primary/30 animate-[pulse_3s_ease-in-out_infinite]">
            <Zap className="w-4 h-4" /> Vehicle & Tire Logistics Platform
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Tires & Vehicle Parts,{" "}
            <span className="text-primary">Delivered Fast</span>
          </h1>
          <p className="text-lg text-white/70 mt-6 max-w-xl mx-auto">
            Order tires, spare parts & vehicle accessories. Track shipments in real-time with our trusted fleet of logistics drivers.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="hover-scale">
                Start Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white/20 hover-scale">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            Fast, Reliable & Secure Logistics
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We specialize in tire and vehicle parts delivery with state-of-the-art tracking and verified drivers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Wrench className="w-8 h-8 text-primary" />, title: "Parts & Tires Catalog", desc: "Browse and order from a wide range of tires, rims, and vehicle spare parts" },
            { icon: <Clock className="w-8 h-8 text-primary" />, title: "Real-time Fleet Tracking", desc: "Track your shipment live from warehouse to your workshop or doorstep" },
            { icon: <Shield className="w-8 h-8 text-primary" />, title: "Verified Logistics Fleet", desc: "Trained drivers with specialized vehicles for safe tire & parts transport" },
          ].map((f, index) => (
            <div 
              key={f.title} 
              className="bg-card p-8 rounded-2xl shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 text-center hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">{f.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            
            {[
              { step: "01", icon: <Package className="w-6 h-6" />, title: "Place Order", desc: "Select tires or parts from our catalog and place your order" },
              { step: "02", icon: <MapPin className="w-6 h-6" />, title: "Confirm Location", desc: "Enter delivery address for your workshop or doorstep" },
              { step: "03", icon: <Truck className="w-6 h-6" />, title: "Track Shipment", desc: "Watch your delivery in real-time on our live tracking map" },
              { step: "04", icon: <CheckCircle2 className="w-6 h-6" />, title: "Receive Delivery", desc: "Get your parts delivered safely by our verified drivers" },
            ].map((item, index) => (
              <div 
                key={item.step} 
                className="text-center animate-fade-in relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mt-6 mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            What We Deliver
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "All-Season Tires", icon: "🚗" },
            { name: "Performance Tires", icon: "🏎️" },
            { name: "Truck Tires", icon: "🚚" },
            { name: "Rims & Wheels", icon: "⚙️" },
            { name: "Brake Parts", icon: "🔧" },
            { name: "Engine Parts", icon: "🔩" },
            { name: "Batteries", icon: "🔋" },
            { name: "Accessories", icon: "🎯" },
          ].map((service, index) => (
            <div 
              key={service.name}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 text-center group cursor-pointer animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300 inline-block">{service.icon}</span>
              <h3 className="text-sm font-semibold text-foreground mt-3">{service.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialSlider />

      {/* Trust Badges */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { icon: <Shield className="w-8 h-8" />, label: "Secure Payments" },
            { icon: <Award className="w-8 h-8" />, label: "Quality Guaranteed" },
            { icon: <Truck className="w-8 h-8" />, label: "Free Shipping 5K+" },
            { icon: <Clock className="w-8 h-8" />, label: "24/7 Support" },
          ].map((badge, index) => (
            <div 
              key={badge.label} 
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {badge.icon}
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-secondary via-secondary to-secondary/90 rounded-3xl p-12 text-center relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join thousands of workshops and dealers who trust TireFleet for their tire and parts delivery needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="hover-scale">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white/20 hover-scale">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
