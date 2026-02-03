import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Star, CheckCircle2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wider uppercase">About A1 Tradelines</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">
              Tradelines Guidance for Real Credit Goals
            </h1>
            <p className="text-xl text-[hsl(var(--on-dark))] opacity-80 max-w-3xl mx-auto leading-relaxed">
              We help individuals understand tradelines, evaluate whether they're the right fit, 
              and navigate the process with transparency—no hype, just honest guidance.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-12 text-center">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="gradient-card border-border">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display text-primary mb-3">Education First</h3>
                  <p className="text-foreground/80">
                    We believe in empowering you with knowledge. Understanding how tradelines work 
                    helps you make informed decisions about your credit journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display text-primary mb-3">Personalized Assessment</h3>
                  <p className="text-foreground/80">
                    Every credit profile is unique. We evaluate your specific situation to determine 
                    if tradelines may help strengthen your credit profile.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display text-primary mb-3">Transparent Process</h3>
                  <p className="text-foreground/80">
                    No hidden fees, no unrealistic promises. We set clear expectations and keep you 
                    informed every step of the way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Free Assessment", desc: "Tell us about your credit goals and current situation." },
                { step: "2", title: "Profile Review", desc: "We analyze your credit profile to determine the best approach." },
                { step: "3", title: "Custom Recommendation", desc: "Receive a tailored plan based on your specific needs." },
                { step: "4", title: "Ongoing Support", desc: "We guide you through the process and answer your questions." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-display text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-display text-primary mb-2">{item.title}</h3>
                  <p className="text-[hsl(var(--on-dark))] opacity-70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-12 text-center">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Marcus T.",
                  location: "New Jersey",
                  text: "A1 Tradelines was upfront about what to expect. No crazy promises—just real guidance that helped me understand my options.",
                  rating: 5,
                },
                {
                  name: "Sarah M.",
                  location: "Florida",
                  text: "I appreciated how they took time to explain everything. The process was smooth and they kept me updated throughout.",
                  rating: 5,
                },
                {
                  name: "David L.",
                  location: "Texas",
                  text: "Finally, a company that doesn't overpromise. They were honest about timelines and what tradelines could realistically do for my situation.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="gradient-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t border-border pt-4">
                      <p className="font-display text-primary">{testimonial.name}</p>
                      <p className="text-foreground/60 text-sm">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Help */}
        <section className="py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-12 text-center">
              Who We Help
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="gradient-card border-border">
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary text-xl mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    Good Fit For Tradelines
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Thin credit files (few or no accounts)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Young credit profiles needing age
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      High utilization on existing cards
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Preparing for a mortgage or auto loan
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Rebuilding after paid-off collections
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border">
                <CardContent className="pt-6">
                  <h3 className="font-display text-destructive text-xl mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    May Not Be Right For
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      Active bankruptcies or recent charge-offs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      Multiple unpaid collections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      Those seeking instant results
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      Already excellent credit (750+)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      Looking for guaranteed outcomes
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-foreground/80 mb-8">
              Get a free assessment to see if tradelines may help your credit situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="font-display box-glow" data-cta="assessment">
                  Start Free Assessment
                </Button>
              </Link>
              <a href="tel:9087675309">
                <Button size="lg" variant="outline" className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-cta="call">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (908) 767-5309
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
