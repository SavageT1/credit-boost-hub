import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TradelineCalculator from "@/components/TradelineCalculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HomeFaqSection, { faqs } from "@/components/HomeFaqSection";
import Seo from "@/components/Seo";

const Index = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  useEffect(() => {
    if (window.location.hash === "#calculator") {
      const el = document.getElementById("calculator");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Seo
          title="A1 Tradelines | Authorized User Tradelines & Credit Guidance"
          description="Learn how authorized user tradelines work, who they may help, and what realistic outcomes to expect. Get transparent guidance and a free assessment."
          path="/"
          jsonLd={faqSchema}
        />
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <TradelineCalculator />
        <HomeFaqSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
