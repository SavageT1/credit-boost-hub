import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-8">
                Terms of Service
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <p className="text-foreground/80 mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </AnimatedSection>

            <div className="space-y-8 text-foreground/80">
              <AnimatedSection delay={150}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Agreement to Terms
                </h2>
                <p>
                  By accessing or using the A1 Tradelines website and services, you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Services Description
                </h2>
                <p>
                  A1 Tradelines provides educational information and consultation services related to tradelines 
                  and credit profile building. We help individuals understand tradelines, evaluate whether they 
                  may be suitable for their situation, and navigate the process with transparency.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={250}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  No Guarantees
                </h2>
                <p>
                  We do not guarantee any specific credit score increase or approval for credit products. 
                  Results vary depending on individual credit reports, lender criteria, and other factors 
                  beyond our control. Becoming an authorized user may help strengthen a credit profile, 
                  but outcomes depend on multiple factors.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  User Responsibilities
                </h2>
                <p className="mb-4">
                  By using our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services for lawful purposes only</li>
                  <li>Not misrepresent your identity or intentions</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={350}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and software, is the property 
                  of A1 Tradelines and is protected by copyright and other intellectual property laws. 
                  You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Limitation of Liability
                </h2>
                <p>
                  A1 Tradelines shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising from your use of our services. Our total liability shall not 
                  exceed the amount you paid for our services.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={450}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective 
                  immediately upon posting to our website. Your continued use of our services constitutes 
                  acceptance of the updated terms.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have questions about these Terms of Service, please contact us at (908) 767-5309 
                  or through our contact form.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
