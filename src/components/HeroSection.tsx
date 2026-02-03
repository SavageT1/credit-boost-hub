import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import ContactFormModal from "./ContactFormModal";

const HeroSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
    <section className="min-h-screen gradient-dark flex flex-col items-center justify-center p-8 pt-32 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-glow text-primary tracking-wider">
          A1 TRADELINES
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[hsl(var(--on-dark))] opacity-80 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto leading-relaxed">
          Tradelines guidance for real credit goals. Learn what tradelines are, whether they fit 
          your situation, and what to expect—without hype.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="font-display text-lg box-glow group"
            onClick={() => setIsContactOpen(true)}
            data-cta="assessment"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a href="tel:9087675309">
            <Button 
              size="lg" 
              variant="outline" 
              className="font-display text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              data-cta="call"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call / Text Now
            </Button>
          </a>
        </div>
        
        <div className="pt-2 md:pt-4">
          <Link 
            to="/tradelines-101"
            className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4 text-sm md:text-base"
          >
            Learn more about how tradelines work →
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 text-[hsl(var(--on-dark))] opacity-70">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-sm md:text-base">500+ Happy Clients</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-sm md:text-base">100% Secure</span>
          </div>
        </div>
      </div>
    </section>

    <ContactFormModal 
      open={isContactOpen} 
      onOpenChange={setIsContactOpen} 
      title="Start Free Assessment"
    />
    </>
  );
};

export default HeroSection;
