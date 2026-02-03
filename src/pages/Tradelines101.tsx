import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Phone,
  ExternalLink,
  CreditCard,
  Calendar,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Tradelines101 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wider uppercase">Education Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">
              Tradelines 101
            </h1>
            <p className="text-xl text-[hsl(var(--on-dark))] opacity-80 max-w-3xl mx-auto leading-relaxed">
              Learn what tradelines are, who they may help, and what to realistically expect. 
              No hype—just the facts you need to make an informed decision.
            </p>
          </div>
        </section>

        {/* What Are Tradelines */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-8">
              What Is a Tradeline?
            </h2>
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                A <span className="text-primary font-semibold">tradeline</span> is any credit account 
                that appears on your credit report. This includes credit cards, auto loans, mortgages, 
                and other lines of credit. Each tradeline contains information like:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, text: "Account open date (age)" },
                  { icon: CreditCard, text: "Credit limit or loan amount" },
                  { icon: BarChart3, text: "Current balance" },
                  { icon: CheckCircle2, text: "Payment history" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/20">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <p>
                An <span className="text-primary font-semibold">authorized user tradeline</span> is 
                when someone adds you to their existing credit card as an authorized user. Their 
                account history may then appear on your credit report, potentially benefiting your 
                credit profile.
              </p>
            </div>
          </div>
        </section>

        {/* Young vs Established Profiles */}
        <section className="py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-12 text-center">
              Young vs. Established Credit Profiles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    Young/Thin Credit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[hsl(var(--on-dark))] opacity-80">
                  <p>
                    If you're new to credit (under 2 years of history) or have very few accounts, 
                    you likely have a "thin file." Credit scoring models have limited data to 
                    evaluate you.
                  </p>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-primary font-semibold mb-2">Potential Tradeline Benefit:</p>
                      <p className="text-[hsl(var(--on-dark))] opacity-70">
                      Adding an aged tradeline may help by contributing years of positive history, 
                      increasing your average account age, and adding to your credit mix.
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                      <span>Often sees more noticeable impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                      <span>Helps establish credit foundation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Established Credit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[hsl(var(--on-dark))] opacity-80">
                  <p>
                    If you have 5+ years of credit history with multiple accounts, you already 
                    have a solid foundation. Your score is influenced by many factors already 
                    on your report.
                  </p>
                  <div className="p-4 bg-secondary/20 rounded-lg border border-border">
                    <p className="text-white font-semibold mb-2">Potential Tradeline Benefit:</p>
                      <p className="text-[hsl(var(--on-dark))] opacity-70">
                      May still help with utilization or adding positive accounts, but impact is 
                      typically more modest since existing history already provides most factors.
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1" />
                      <span>Results vary depending on profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1" />
                      <span>Focus on other factors may be better</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Credit Utilization */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-8">
              Understanding Credit Utilization
            </h2>
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                <span className="text-primary font-semibold">Credit utilization</span> is the 
                percentage of your available credit that you're currently using. It's one of the 
                most important factors in your credit score.
              </p>
              
              <Card className="gradient-card border-border">
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary text-xl mb-4">Example:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-destructive font-semibold mb-2">High Utilization (Bad)</p>
                      <p className="text-foreground/70 text-base">
                        Credit Limit: $5,000<br />
                        Balance: $4,500<br />
                        <span className="text-destructive font-bold">Utilization: 90%</span>
                      </p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-primary font-semibold mb-2">Low Utilization (Good)</p>
                      <p className="text-foreground/70 text-base">
                        Credit Limit: $5,000<br />
                        Balance: $500<br />
                        <span className="text-primary font-bold">Utilization: 10%</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="p-6 bg-secondary/20 rounded-lg border border-border">
                <h3 className="font-display text-primary text-xl mb-3">Best Practice</h3>
                <p className="text-foreground/80">
                  Most experts recommend keeping utilization <span className="text-primary font-semibold">below 30%</span>,
                  with <span className="text-primary font-semibold">under 10%</span> being ideal. 
                  High-limit tradelines may help improve your overall utilization ratio by adding 
                  available credit to your profile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Negative Items */}
        <section className="py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-8">
              Negative Items on Your Credit Report
            </h2>
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                Negative items like late payments, collections, charge-offs, and bankruptcies can 
                significantly impact your credit score. While tradelines can add positive history, 
                they don't remove or offset negative items directly.
              </p>
              
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Common Negative Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3 text-foreground/80">
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Late payments (30, 60, 90+ days)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Collections accounts
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Charge-offs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Bankruptcies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Tax liens
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-destructive">•</span> Civil judgments
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-display text-primary text-xl mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Remove Incorrect Negative Items
                </h3>
                <p className="text-foreground/80 mb-4">
                  If you have items on your credit report that are inaccurate, outdated, or 
                  reporting incorrectly, you have the right to dispute them. We recommend 
                  <span className="text-primary font-semibold"> Dispute Beast</span>—a powerful 
                  tool for identifying and disputing errors on your credit report.
                </p>
                <a 
                  href="https://www.disputebeast.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="font-display" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Dispute Beast
                  </Button>
                </a>
                <p className="text-foreground/60 text-sm mt-3">
                  *This is an affiliate link. We may earn a commission at no extra cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Expectations */}
        <section className="py-20 px-4 sm:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-8">
              Timeline & Expectations
            </h2>
            <div className="space-y-6">
              <Card className="gradient-card border-border">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-display font-bold">1-2</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Weeks</p>
                      <p className="text-foreground/70 text-sm">Account added as authorized user</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-display font-bold">1-2</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Statement Cycles</p>
                      <p className="text-foreground/70 text-sm">Tradeline reports to bureaus</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-display font-bold">30-60</span>
                      </div>
                      <p className="text-white font-semibold mb-1">Days</p>
                      <p className="text-foreground/70 text-sm">Visible on your credit report</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="p-6 bg-secondary/20 rounded-lg border border-border">
                <h3 className="font-display text-white text-xl mb-3">Important Note</h3>
                <p className="text-foreground/70">
                  Results vary depending on your credit profile, the specific tradeline, and how 
                  lenders evaluate your application. Tradelines are just one factor among many 
                  that influence credit decisions. We cannot guarantee specific score increases 
                  or approval outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-6">
              Ready to See If Tradelines Are Right for You?
            </h2>
            <p className="text-[hsl(var(--on-dark))] opacity-80 mb-8">
              Get a free assessment to evaluate your credit situation and learn your options.
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

export default Tradelines101;
