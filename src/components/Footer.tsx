import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display text-primary text-glow">A1 TRADELINES</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} A1 Tradelines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
