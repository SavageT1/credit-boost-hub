import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16 px-4 sm:px-8">
        <Seo
          title="Disclaimer | A1 Tradelines"
          description="Important disclaimers for A1 Tradelines, including no guaranteed score outcomes and third-party limitations."
          path="/disclaimer"
        />
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-8">
              Disclaimer
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="prose prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">General Disclaimer</h2>
                <p className="text-foreground/80">
                  A1 Tradelines is not affiliated with any credit bureaus (Equifax, Experian, TransUnion) or lenders. We are an independent service provider offering educational information and consultation services related to authorized user tradelines.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">No Guaranteed Results</h2>
                <p className="text-foreground/80">
                  <strong>No credit score increase is guaranteed.</strong> Results vary significantly depending on your individual credit report, the specific tradelines used, and numerous other factors including but not limited to:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Your current credit profile and history</li>
                  <li>The number and type of existing accounts</li>
                  <li>Payment history and credit utilization</li>
                  <li>Derogatory items on your credit report</li>
                  <li>Credit bureau algorithms and scoring models</li>
                  <li>Lender-specific underwriting criteria</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Authorized User Tradelines</h2>
                <p className="text-foreground/80">
                  Becoming an authorized user on an existing credit account may help strengthen a credit profile, but outcomes depend on multiple factors and are not guaranteed. The practice of adding authorized users to credit accounts is legal and has been utilized by families for generations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Not Financial or Legal Advice</h2>
                <p className="text-foreground/80">
                  The information provided on this website and through our services is for educational and informational purposes only. It should not be construed as financial, legal, or credit repair advice. We recommend consulting with qualified professionals for advice specific to your situation.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Third-Party Services</h2>
                <p className="text-foreground/80">
                  A1 Tradelines may reference or recommend third-party services, including credit monitoring services. We are not responsible for the accuracy, reliability, or performance of any third-party services. Use of such services is at your own discretion and risk.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Credit Bureau Reporting</h2>
                <p className="text-foreground/80">
                  We cannot guarantee that tradelines will post to all three credit bureaus or within any specific timeframe. Reporting practices are determined by the primary account holder's financial institution and are outside our control.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Calculator Estimates</h2>
                <p className="text-foreground/80">
                  Any credit score estimates or projections provided through our website calculators or tools are for illustrative purposes only. They are not predictions of actual results and should not be relied upon for financial decisions.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Contact Us</h2>
                <p className="text-foreground/80">
                  If you have questions about this Disclaimer, please contact us at:
                </p>
                <p className="text-foreground/80">
                  Email: info@a1tradelines.com<br />
                  Phone: (908) 767-5309
                </p>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
