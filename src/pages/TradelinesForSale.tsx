import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TradelinesForSale = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://a1tradelines.lovable.app/" },
        { "@type": "ListItem", position: 2, name: "Tradelines for Sale", item: "https://a1tradelines.lovable.app/tradelines-for-sale" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are tradelines guaranteed to raise my score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tradelines can help some profiles, but score changes depend on payment history, utilization, negatives, and lender scoring models.",
          },
        },
        {
          "@type": "Question",
          name: "How long does posting usually take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many accounts report within one to two billing cycles, but timing varies by issuer and bureau and is not guaranteed.",
          },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <Seo
          title="Tradelines for Sale | A1 Tradelines"
          description="Explore authorized user tradelines for sale with transparent guidance, realistic expectations, and a free profile assessment from A1 Tradelines."
          path="/tradelines-for-sale"
          jsonLd={jsonLd}
        />

        <section className="py-14 md:py-20 px-4 sm:px-8 gradient-dark">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">Tradelines for Sale</h1>
            <p className="text-[hsl(var(--on-dark))] opacity-85 text-lg max-w-3xl mx-auto">
              We help clients evaluate and purchase authorized-user tradelines based on their profile goals. No hype, no guarantees—just a clear process and realistic planning.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <Card className="gradient-card border-border"><CardContent className="pt-6"><h2 className="font-display text-primary text-xl mb-2">Profile Review First</h2><p className="text-foreground/85">We review your score range, utilization, negatives, and timeline before recommending options.</p></CardContent></Card>
            <Card className="gradient-card border-border"><CardContent className="pt-6"><h2 className="font-display text-primary text-xl mb-2">Transparent Matching</h2><p className="text-foreground/85">Get guidance on aged account options that may align with your goals and risk profile.</p></CardContent></Card>
            <Card className="gradient-card border-border"><CardContent className="pt-6"><h2 className="font-display text-primary text-xl mb-2">Compliance Focus</h2><p className="text-foreground/85">We set realistic expectations and explain factors that can limit results before you buy.</p></CardContent></Card>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-8 gradient-dark border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display text-primary mb-4">Ready to See Your Options?</h2>
            <p className="text-[hsl(var(--on-dark))] opacity-80 mb-6">Start with a free assessment so we can recommend the right path for your profile.</p>
            <Link to="/contact"><Button className="font-display box-glow" size="lg">Get My Free Assessment</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TradelinesForSale;
