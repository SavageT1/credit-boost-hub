import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen gradient-dark flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="text-center space-y-8 max-w-5xl relative z-10">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Shield className="w-6 h-6" />
          <span className="text-sm font-medium tracking-wider uppercase">Trusted Credit Solutions</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-glow text-primary tracking-wider">
          A1 TRADELINES
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Boost Your Credit Profile with Premium Authorized User Tradelines. 
          Fast results, secure process, and expert support every step of the way.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button size="lg" className="font-display text-lg box-glow group">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="font-display text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Learn More
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 pt-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>500+ Happy Clients</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>100% Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
