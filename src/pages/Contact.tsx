import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // HubSpot Form Configuration
  const HUBSPOT_PORTAL_ID = "244921424";
  const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

  const submitToBackend = async () => {
    try {
      await supabase.functions.invoke("submit-contact-lead", {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          notes: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ""}${formData.message}`,
          source: "contact-page",
        },
      });
    } catch {
      // Silently fail - HubSpot is the primary destination
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to both HubSpot and backend in parallel
      const hubspotPromise = fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: formData.firstName },
              { name: "lastname", value: formData.lastName },
              { name: "email", value: formData.email },
              { name: "phone", value: formData.phone },
              { name: "message", value: `${formData.subject ? `Subject: ${formData.subject}\n\n` : ""}${formData.message}` },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "Contact Page",
            },
          }),
        }
      );

      // Fire backend submission without blocking
      submitToBackend();

      const response = await hubspotPromise;

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      toast({
        title: "Submission Error",
        description: "There was an issue sending your message. Please try again or call us at (908) 767-5309.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-32">
        <Seo
          title="Contact A1 Tradelines | Free Credit Assessment"
          description="Contact A1 Tradelines for a free assessment. Ask questions about tradelines, credit profile strategy, and next steps."
          path="/contact"
        />
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display text-primary text-glow mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-[hsl(var(--on-dark))] opacity-80 max-w-2xl mx-auto">
              Have questions about improving your credit? Our team is here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <a href="tel:9087675309" className="block h-full animate-fade-in" style={{ animationDelay: '100ms' }}>
                <Card className="h-full gradient-card border-border text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6 h-full flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-primary mb-2">Text or Call</h3>
                    <p className="text-sm leading-6 text-[hsl(var(--on-dark))] opacity-90">(908) 767-5309</p>
                  </CardContent>
                </Card>
              </a>

              <a href="mailto:info@a1tradelines.com" className="block h-full animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Card className="h-full gradient-card border-border text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6 h-full flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-primary mb-2">Email</h3>
                    <p className="text-sm leading-6 text-[hsl(var(--on-dark))] opacity-90">info@a1tradelines.com</p>
                  </CardContent>
                </Card>
              </a>

              <Card className="h-full gradient-card border-border text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardContent className="pt-6 h-full flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-primary mb-2">Hours</h3>
                  <p className="text-sm leading-6 text-[hsl(var(--on-dark))] opacity-90">Mon–Fri: 9 AM – 6 PM EST</p>
                </CardContent>
              </Card>

              <Card className="h-full gradient-card border-border text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <CardContent className="pt-6 h-full flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-primary mb-2">Location</h3>
                  <p className="text-sm leading-6 text-[hsl(var(--on-dark))] opacity-90">Nationwide Service</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-16 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 animate-fade-in" style={{ animationDelay: '150ms' }}>
              {/* Left Side - Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-display text-primary mb-4">Let's Talk</h2>
                  <p className="text-[hsl(var(--on-dark))] opacity-80">
                    Whether you're ready to get started or just have questions, we're here to help you understand your options.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-[hsl(var(--on-dark))]">Free Consultation</h4>
                      <p className="text-sm text-[hsl(var(--on-dark))] opacity-70">Get a personalized assessment of your credit situation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-[hsl(var(--on-dark))]">Quick Response</h4>
                      <p className="text-sm text-[hsl(var(--on-dark))] opacity-70">We respond to all inquiries within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <Card className="lg:col-span-3 gradient-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-primary">Send a Message</CardTitle>
                  <CardDescription>Fill out the form and we'll be in touch shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-muted-foreground">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-muted-foreground">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(908) 767-5309"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-muted-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-muted-foreground">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-muted-foreground">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your credit goals and any questions you have..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full font-display box-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display text-primary text-center mb-12 animate-fade-in">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="gradient-card border-border animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary mb-2">How long does it take to see results?</h3>
                  <p className="text-muted-foreground text-sm">Most clients see their tradeline appear on their credit report within 15–30 days after being added.</p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary mb-2">Is this legal?</h3>
                  <p className="text-muted-foreground text-sm">Yes, becoming an authorized user on someone else's credit card is completely legal and a common credit-building strategy.</p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary mb-2">What information do you need from me?</h3>
                  <p className="text-muted-foreground text-sm">We only collect basic contact details here so we can follow up. We’ll explain any required information privately during your consultation.</p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border animate-fade-in" style={{ animationDelay: '400ms' }}>
                <CardContent className="pt-6">
                  <h3 className="font-display text-primary mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground text-sm">Yes, we offer a full refund if your tradeline doesn't post to your credit report within 60 days.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
