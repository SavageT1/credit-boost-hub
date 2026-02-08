import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-8">
              Terms of Service
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-foreground/80 text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Agreement to Terms</h2>
                <p className="text-foreground/80">
                  By accessing or using the A1 Tradelines website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Description of Services</h2>
                <p className="text-foreground/80">
                  A1 Tradelines provides educational information and consultation services related to authorized user tradelines. We help clients understand how tradelines work and may facilitate connections between clients and tradeline providers.
                </p>
                <p className="text-foreground/80">
                  Our services are for informational and educational purposes. We do not guarantee any specific credit score improvements or outcomes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">No Guarantees</h2>
                <p className="text-foreground/80">
                  A1 Tradelines makes no guarantees regarding:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Credit score increases or specific point improvements</li>
                  <li>Loan or credit approvals</li>
                  <li>Posting times or tradeline performance</li>
                  <li>Any specific financial outcomes</li>
                </ul>
                <p className="text-foreground/80">
                  Results vary significantly based on individual credit profiles, lender criteria, and other factors outside our control.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">User Responsibilities</h2>
                <p className="text-foreground/80">
                  By using our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not misrepresent your identity or credit situation</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Limitation of Liability</h2>
                <p className="text-foreground/80">
                  To the fullest extent permitted by law, A1 Tradelines shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Intellectual Property</h2>
                <p className="text-foreground/80">
                  All content on this website, including text, graphics, logos, and images, is the property of A1 Tradelines and is protected by applicable intellectual property laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Modifications</h2>
                <p className="text-foreground/80">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of any modifications.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Governing Law</h2>
                <p className="text-foreground/80">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Contact Information</h2>
                <p className="text-foreground/80">
                  For questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
