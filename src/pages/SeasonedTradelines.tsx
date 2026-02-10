import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SeasonedTradelines = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://a1tradelines.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Seasoned Tradelines", item: "https://a1tradelines.lovable.app/seasoned-tradelines" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <Seo
          title="Seasoned Tradelines | A1 Tradelines"
          description="Learn how seasoned tradelines may influence average age and utilization, when they are useful, and how to evaluate them responsibly."
          path="/seasoned-tradelines"
          jsonLd={jsonLd}
        />

        <section className="py-14 md:py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">Seasoned Tradelines</h1>
            <p className="text-[hsl(var(--on-dark))] opacity-85 text-lg max-w-3xl mx-auto">
              Seasoned tradelines are older accounts with established history. For certain profiles, they may help strengthen age and utilization factors—but they are never a guaranteed score increase.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="gradient-card border-border"><CardContent className="pt-6"><h2 className="font-display text-primary text-xl mb-2">Who May Benefit Most</h2><p className="text-foreground/85">Thin files, younger profiles, and high utilization cases may see more impact than mature profiles with heavy negatives.</p></CardContent></Card>
            <Card className="gradient-card border-border"><CardContent className="pt-6"><h2 className="font-display text-primary text-xl mb-2">What Limits Results</h2><p className="text-foreground/85">Recent late payments, open collections, and severe derogatories can reduce expected gains and may require repair-first steps.</p></CardContent></Card>
          </div>
          <div className="max-w-5xl mx-auto mt-8">
            <Link to="/contact"><Button className="font-display box-glow" size="lg">Get a Seasoned Tradeline Assessment</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonedTradelines;
