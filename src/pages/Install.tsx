import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, Apple, Chrome, Share, PlusSquare, MoreVertical } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">
              Install Our App
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get quick access to A1 Tradelines right from your home screen. No app store needed—install directly from your browser.
            </p>
          </div>
        </section>

        {/* Install Options */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            {isInstalled ? (
              <Card className="gradient-card border-border text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display text-primary mb-2">Already Installed!</h2>
                  <p className="text-gray-300">
                    You're already using the installed version of A1 Tradelines. Enjoy the full app experience!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Android / Chrome Install */}
                <Card className="gradient-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Chrome className="w-8 h-8 text-primary" />
                      <CardTitle className="font-display text-primary">Android / Chrome</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Install using Chrome browser on Android
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deferredPrompt ? (
                      <Button 
                        onClick={handleInstallClick}
                        className="w-full font-display box-glow"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Install Now
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">1</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Tap the menu icon <MoreVertical className="w-4 h-4 inline" /> in Chrome
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">2</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Select "Add to Home screen" or "Install app"
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">3</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Tap "Install" to add the app to your home screen
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* iOS / Safari Install */}
                <Card className="gradient-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Apple className="w-8 h-8 text-primary" />
                      <CardTitle className="font-display text-primary">iPhone / iPad</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Install using Safari browser on iOS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Open this page in Safari (not Chrome or other browsers)
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Tap the Share button <Share className="w-4 h-4 inline" /> at the bottom
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Scroll down and tap "Add to Home Screen" <PlusSquare className="w-4 h-4 inline" />
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">4</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Tap "Add" in the top right corner
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display text-primary mb-8">Why Install?</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-white mb-2">Quick Access</h3>
                <p className="text-gray-400 text-sm">Launch instantly from your home screen like any other app</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-white mb-2">Works Offline</h3>
                <p className="text-gray-400 text-sm">Access content even without an internet connection</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Chrome className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-white mb-2">No App Store</h3>
                <p className="text-gray-400 text-sm">Install directly from your browser—no downloads needed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Install;