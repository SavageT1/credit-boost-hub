import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="w-10 h-10 text-primary" />
                <h1 className="text-3xl md:text-5xl font-display text-primary text-glow">
                  Disclaimer
                </h1>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <p className="text-foreground/80 mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </AnimatedSection>

            <div className="space-y-8 text-foreground/80">
              <AnimatedSection delay={150}>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                    Important Notice
                  </h2>
                  <p className="text-lg">
                    A1 Tradelines is not affiliated with any credit bureaus (Equifax, Experian, TransUnion) 
                    or lenders. We are an independent service provider offering educational information 
                    and consultation services related to tradelines.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  No Guaranteed Results
                </h2>
                <p>
                  We do not guarantee any specific credit score increase, approval for credit products, 
                  or particular outcomes. Results vary significantly depending on your individual credit report, 
                  the specific tradeline(s), lender criteria, and numerous other factors beyond our control.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={250}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Educational Purpose
                </h2>
                <p>
                  The information provided on this website is for educational and informational purposes only. 
                  It should not be construed as financial, legal, or credit advice. We recommend consulting 
                  with qualified financial professionals before making decisions about your credit.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Authorized User Tradelines
                </h2>
                <p className="mb-4">
                  Becoming an authorized user on a credit account may help strengthen a credit profile, 
                  but outcomes depend on multiple factors including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your current credit profile and history</li>
                  <li>The specific tradeline characteristics (age, limit, utilization)</li>
                  <li>How credit bureaus report the account</li>
                  <li>Lender-specific scoring models and criteria</li>
                  <li>Timing and reporting cycles</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={350}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  No Credit Bureau Affiliation
                </h2>
                <p>
                  A1 Tradelines has no affiliation, partnership, or special relationship with any credit 
                  reporting agency. We cannot guarantee how or when tradelines will be reported, or how 
                  they will be scored by different credit models.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Individual Circumstances
                </h2>
                <p>
                  Every individual's credit situation is unique. What works for one person may not work 
                  for another. We provide personalized assessments to help determine if our services 
                  may be appropriate for your specific situation, but we cannot predict or guarantee outcomes.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={450}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Legal Compliance
                </h2>
                <p>
                  Authorized user tradelines are a legal practice. However, misrepresenting your credit 
                  history to lenders is illegal. Our services are designed to be used in compliance with 
                  all applicable laws and regulations.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have questions about this disclaimer or our services, please contact us at 
                  (908) 767-5309 or through our contact form.
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

export default Disclaimer;
