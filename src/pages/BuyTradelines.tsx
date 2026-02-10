import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BuyTradelines = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://a1tradelines.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Buy Tradelines", item: "https://a1tradelines.lovable.app/buy-tradelines" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <Seo
          title="Buy Tradelines | Authorized User Tradelines with A1"
          description="Looking to buy tradelines? Get a profile-first recommendation from A1 Tradelines with transparent pricing guidance and realistic score expectations."
          path="/buy-tradelines"
          jsonLd={jsonLd}
        />

        <section className="py-14 md:py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">Buy Tradelines</h1>
            <p className="text-[hsl(var(--on-dark))] opacity-85 text-lg max-w-3xl mx-auto">
              If you want to buy tradelines, start with a strategy first. We help you decide whether tradelines are the right move and how many may be needed based on your credit profile.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-5 text-foreground/90 text-lg">
            <p><strong className="text-primary">Step 1:</strong> Complete a free profile assessment.</p>
            <p><strong className="text-primary">Step 2:</strong> Identify negatives/utilization issues that should be handled first.</p>
            <p><strong className="text-primary">Step 3:</strong> Match with tradeline options that fit your timeline and target range.</p>
            <p><strong className="text-primary">Step 4:</strong> Monitor reporting and next-step strategy.</p>
          </div>
          <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/contact"><Button className="font-display box-glow w-full sm:w-auto" size="lg">Start Free Assessment</Button></Link>
            <Link to="/tradelines-101"><Button variant="outline" className="w-full sm:w-auto">Learn Tradelines 101</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyTradelines;
