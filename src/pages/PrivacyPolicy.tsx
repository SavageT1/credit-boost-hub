import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-16 px-4 sm:px-8">
        <Seo
          title="Privacy Policy | A1 Tradelines"
          description="Read the A1 Tradelines privacy policy and how we collect, use, and protect your information."
          path="/privacy-policy"
        />
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-8">
              Privacy Policy
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-foreground/80 text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Information We Collect</h2>
                <p className="text-foreground/80">
                  A1 Tradelines collects information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Information about your credit goals and inquiries</li>
                  <li>Communications you send to us</li>
                </ul>
                <p className="text-foreground/80">
                  We do not collect Social Security numbers, full dates of birth, or complete credit reports through our website forms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">How We Use Your Information</h2>
                <p className="text-foreground/80">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Provide information about our tradeline services</li>
                  <li>Send you updates and marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Information Sharing</h2>
                <p className="text-foreground/80">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Professional advisors as required by law</li>
                  <li>Law enforcement when legally required</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Data Security</h2>
                <p className="text-foreground/80">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Cookies and Tracking</h2>
                <p className="text-foreground/80">
                  Our website may use cookies and similar tracking technologies to improve user experience and analyze website traffic. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Your Rights</h2>
                <p className="text-foreground/80">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-display text-primary">Contact Us</h2>
                <p className="text-foreground/80">
                  If you have questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
