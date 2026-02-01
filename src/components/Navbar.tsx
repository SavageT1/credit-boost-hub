import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display text-primary tracking-wider">
              A1 TRADELINES
            </span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="text-secondary hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="text-secondary hover:text-primary transition-colors"
            >
              Calculator
            </button>
            <a 
              href="/contact"
              className="text-secondary hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button className="font-display box-glow">Get Started</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-secondary hover:text-primary transition-colors py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="block w-full text-left text-secondary hover:text-primary transition-colors py-2"
            >
              Calculator
            </button>
            <a 
              href="/contact"
              className="block w-full text-left text-secondary hover:text-primary transition-colors py-2"
            >
              Contact
            </a>
            <Button className="w-full font-display box-glow">Get Started</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
