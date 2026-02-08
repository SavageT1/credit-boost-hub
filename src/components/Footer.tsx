import { Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="A1 Tradelines" className="h-20 md:h-24 w-auto" />
          </a>
          
          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61575227498498" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} A1 Tradelines. All rights reserved.
            </p>
          </div>
        </div>

        {/* Disclaimer - At the very bottom */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-foreground/60 text-center">
            <strong className="text-foreground/80">Disclaimer:</strong> A1 Tradelines is not affiliated with any credit bureaus or lenders. 
            Results vary depending on your credit report and individual circumstances. No score increase is guaranteed. 
            Becoming an authorized user may help strengthen a credit profile, but outcomes depend on multiple factors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
