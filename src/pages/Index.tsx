import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TradelineCalculator from "@/components/TradelineCalculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <TradelineCalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
