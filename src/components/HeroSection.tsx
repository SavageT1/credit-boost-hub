import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

const HeroSection = () => {
  return (
    <section className="min-h-[100svh] md:min-h-screen gradient-dark flex flex-col items-center justify-start md:justify-center px-6 sm:px-8 pt-28 sm:pt-32 pb-16 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto px-4 relative z-10">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-glow text-primary tracking-wider">
            A1 Tradelines
          </h1>
        </AnimatedSection>
        
        <AnimatedSection delay={100}>
          <p className="text-lg sm:text-xl md:text-2xl text-[hsl(var(--on-dark))] opacity-80 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto leading-relaxed">
            A1 Tradelines helps you buy seasoned authorized-user tradelines to strengthen key credit profile factors like utilization and account age. Get transparent pricing, clear guidance, and realistic expectations from a trusted tradeline company.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="font-display text-lg box-glow group w-full sm:w-auto"
                data-cta="assessment"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:9087675309">
              <Button 
                size="lg" 
                variant="outline" 
                className="font-display text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
                data-cta="call"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call / Text Now
              </Button>
            </a>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={300}>
          <div className="pt-2 md:pt-4">
            <Link 
              to="/tradelines-101"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4 text-sm md:text-base"
            >
              Learn more about how tradelines work →
            </Link>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={400}>
          <div className="hidden md:flex items-center justify-center gap-8 pt-4 text-[hsl(var(--on-dark))] opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-base">100% Secure</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
