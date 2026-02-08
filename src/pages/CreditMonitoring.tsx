import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileSearch, CheckCircle, ArrowRight, AlertTriangle, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

const CreditMonitoring = () => {
  const affiliateLink = "https://beastcreditmonitoring.com/redirect.asp?guid=FANE0CE1RV2J";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="gradient-dark py-12 md:py-24 px-4 sm:px-8">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Our Trusted Partner</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-primary mb-6">
              Credit Monitoring & Disputes
            </h1>
            <p className="text-[hsl(var(--on-dark))] opacity-90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Before adding tradelines to your credit profile, it's important to address any inaccurate or incorrectly reported items. 
              We've partnered with Beast Credit Monitoring & Dispute Beast to help our clients clean up their reports first.
            </p>
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-display box-glow text-lg px-8 py-6" data-cta="dispute-beast">
                Visit Beast Credit Monitoring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </AnimatedSection>
        </section>

        {/* Why Disputes First Section */}
        <section className="py-12 md:py-24 px-4 sm:px-8 gradient-dark">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-4xl text-primary mb-4">
                Why Address Disputes First?
              </h2>
              <p className="text-[hsl(var(--on-dark))] opacity-80 text-lg max-w-2xl mx-auto">
                A clean foundation leads to better results when strengthening your credit profile.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedSection delay={100}>
                <Card className="gradient-card border-border h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <AlertTriangle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-primary mb-3">Remove Inaccuracies</h3>
                    <p className="text-[hsl(var(--on-dark))] opacity-80">
                      Incorrect information on your credit report can unfairly impact your profile. 
                      Disputing these items may help correct your report.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <Card className="gradient-card border-border h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-primary mb-3">Better Foundation</h3>
                    <p className="text-[hsl(var(--on-dark))] opacity-80">
                      Addressing negative items first creates a cleaner base for any credit-building 
                      strategies you pursue afterward.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <Card className="gradient-card border-border h-full">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-primary mb-3">Maximize Results</h3>
                    <p className="text-[hsl(var(--on-dark))] opacity-80">
                      When your report is accurate, tradelines and other credit strategies 
                      may have a more meaningful impact on your profile.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* About Our Partner Section */}
        <section className="py-12 md:py-24 px-4 sm:px-8 gradient-dark border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="font-display text-2xl md:text-4xl text-primary mb-6">
                  Beast Credit Monitoring & Dispute Beast
                </h2>
                <div className="space-y-4 text-[hsl(var(--on-dark))] opacity-90">
                  <p className="text-lg leading-relaxed">
                    We've partnered with Beast Credit Monitoring and Dispute Beast to provide our clients 
                    with professional credit monitoring and dispute services.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Their platform helps you monitor all three credit bureaus and provides tools to 
                    dispute inaccurate, outdated, or unverifiable information on your credit reports.
                  </p>
                  <p className="text-lg leading-relaxed">
                    <strong className="text-primary">Our recommendation:</strong> If you have items on your 
                    credit report that are not reporting correctly, we suggest working with our partners 
                    first, then coming back to us to strengthen your credit profile with tradelines.
                  </p>
                </div>
              </div>

              <Card className="gradient-card border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardContent className="p-8">
                  <h3 className="font-display text-xl text-primary mb-6">What They Offer</h3>
                  <ul className="space-y-4">
                    {[
                      "3-Bureau Credit Monitoring",
                      "Dispute Letter Generation",
                      "Credit Report Analysis",
                      "Progress Tracking Dashboard",
                      "Educational Resources",
                      "Expert Support Team"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-[hsl(var(--on-dark))] opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="block mt-8">
                    <Button className="w-full font-display box-glow" size="lg" data-cta="dispute-beast">
                      Get Started with Beast
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Process Section */}
        <section className="py-12 md:py-24 px-4 sm:px-8 gradient-dark border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-display text-2xl md:text-4xl text-primary mb-4">
                Our Recommended Process
              </h2>
              <p className="text-[hsl(var(--on-dark))] opacity-80 text-lg">
                A step-by-step approach to strengthening your credit profile
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Review Your Credit Reports",
                  description: "Get your credit reports from all three bureaus and identify any items that may be inaccurate, outdated, or unverifiable."
                },
                {
                  step: "2",
                  title: "Work with Beast Credit Monitoring",
                  description: "Use our partner's dispute services to address any problematic items. Their tools help generate dispute letters and track your progress."
                },
                {
                  step: "3",
                  title: "Wait for Results",
                  description: "Credit bureaus typically have 30-45 days to investigate disputes. Be patient and monitor your progress through the platform."
                },
                {
                  step: "4",
                  title: "Come Back to A1 Tradelines",
                  description: "Once your credit report is cleaned up, contact us for a free assessment to discuss how tradelines may help strengthen your profile further."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-primary text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-primary mb-2">{item.title}</h3>
                    <p className="text-[hsl(var(--on-dark))] opacity-80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 px-4 sm:px-8 gradient-dark border-t border-border">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-4xl text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-[hsl(var(--on-dark))] opacity-80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you need to dispute items first or you're ready to explore tradelines, we're here to help guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="font-display box-glow w-full sm:w-auto" data-cta="dispute-beast">
                  <FileSearch className="w-5 h-5 mr-2" />
                  Start with Disputes
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto" data-cta="assessment">
                  Free Tradeline Assessment
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreditMonitoring;
