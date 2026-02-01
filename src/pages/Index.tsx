import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen gradient-dark flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display text-glow text-primary tracking-wider">
          A1 TRADELINES
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Boost Your Credit Profile with Premium Authorized User Tradelines
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="font-display text-lg box-glow">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="font-display text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {[
            { title: "Fast Results", desc: "See improvements in as little as 30 days" },
            { title: "Secure Process", desc: "Your information is always protected" },
            { title: "Expert Support", desc: "Dedicated team to guide you" },
          ].map((item, i) => (
            <div key={i} className="gradient-card p-6 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="text-xl font-display text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
