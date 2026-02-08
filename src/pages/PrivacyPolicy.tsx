import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-8">
                Privacy Policy
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
                  Information We Collect
                </h2>
                <p className="mb-4">
                  When you use our services or contact us, we may collect the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Information about your credit goals</li>
                  <li>Any additional notes or details you provide</li>
                  <li>Device and browser information for website analytics</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and provide consultations</li>
                  <li>Assess whether our services may be a good fit for your situation</li>
                  <li>Communicate with you about our services</li>
                  <li>Improve our website and user experience</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={250}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Information Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your personal information. 
                  We do not collect sensitive information such as Social Security Numbers through our website forms. 
                  Your data is stored securely and is only accessible to authorized personnel.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Third-Party Services
                </h2>
                <p>
                  We may use third-party services for analytics, form processing, and communication. 
                  These services have their own privacy policies and we encourage you to review them. 
                  We do not sell your personal information to third parties.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={350}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Your Rights
                </h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request access to your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h2 className="text-xl md:text-2xl font-display text-primary mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy or your personal information, 
                  please contact us at (908) 767-5309 or through our contact form.
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

export default PrivacyPolicy;
