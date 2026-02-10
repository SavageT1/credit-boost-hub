import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button - Left on mobile */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo - Centered on mobile */}
          <Link to="/" aria-label="Go to home page" className="flex items-center gap-2 md:order-first absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src={logo} alt="A1 Tradelines" className="h-16 md:h-20 w-auto" />
          </Link>
          
          {/* Spacer for mobile layout balance */}
          <div className="w-6 md:hidden" />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/tradelines-101"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Tradelines 101
            </Link>
            <Link 
              to="/credit-monitoring"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Credit Monitoring
            </Link>
            <Link 
              to="/blog"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Calculator
            </button>
            <Link 
              to="/contact"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
            <a href="tel:9087675309">
              <Button variant="outline" className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-cta="call">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </a>
            <Link to="/contact">
              <Button className="font-display box-glow" data-cta="assessment">Get Started</Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-white">
            <Link 
              to="/"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/tradelines-101"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Tradelines 101
            </Link>
            <Link 
              to="/credit-monitoring"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Credit Monitoring
            </Link>
            <Link 
              to="/blog"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
            >
              Calculator
            </button>
            <Link 
              to="/contact"
              className="block w-full text-left text-gray-700 hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <a href="tel:9087675309" className="block">
              <Button variant="outline" className="w-full font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-cta="call">
                <Phone className="w-4 h-4 mr-2" />
                Call (908) 767-5309
              </Button>
            </a>
            <Link to="/contact" className="block" onClick={() => setIsOpen(false)}>
              <Button className="w-full font-display box-glow" data-cta="assessment">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
