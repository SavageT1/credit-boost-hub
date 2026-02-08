import { Clock, Shield, Users, TrendingUp, CreditCard, HeadphonesIcon } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const features = [
  {
    icon: Clock,
    title: "Fast Results",
    description: "See improvements in as little as 30 days. Our tradelines post quickly to help you reach your goals faster.",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Your personal information is always protected with bank-level encryption and privacy protocols.",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our dedicated team of credit specialists is here to guide you through every step of the process.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Join hundreds of satisfied clients who have successfully improved their credit profiles with us.",
  },
  {
    icon: CreditCard,
    title: "Premium Tradelines",
    description: "Access high-limit, aged tradelines from established accounts with perfect payment histories.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Availability",
    description: "Get answers to your questions anytime. Our support team is always ready to help.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
            Why Choose A1 Tradelines?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We provide the highest quality tradelines with transparent pricing and exceptional service.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="gradient-card p-8 rounded-lg border border-border hover:border-primary transition-all duration-300 group hover:box-glow h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display text-primary mb-3">{feature.title}</h3>
                <p className="text-[hsl(var(--on-dark))] opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
