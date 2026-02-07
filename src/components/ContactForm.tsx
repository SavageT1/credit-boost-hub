import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // HubSpot Form Configuration (same as ContactFormModal)
  const HUBSPOT_PORTAL_ID = "244921424";
  const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

  const submitToBackend = async () => {
    try {
      const { error } = await supabase.functions.invoke("submit-contact-lead", {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          notes: formData.message,
          source: "contact-page",
        },
      });
      if (error) {
        console.error("Backend submission failed");
      }
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
              { name: "message", value: formData.message },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
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
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error");
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
    <section className="py-24 px-4 sm:px-8 gradient-dark" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-[hsl(var(--on-dark))] opacity-80 max-w-2xl mx-auto">
            Ready to improve your credit? Contact us today for a free consultation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display text-primary mb-6">Contact Information</h3>
                  <p className="text-[hsl(var(--on-dark))] opacity-80 mb-8">
                Our team is ready to answer your questions and help you get started on your credit journey.
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="tel:9087675309" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Text or Call</p>
                  <p className="text-[hsl(var(--on-dark))] font-medium group-hover:text-primary transition-colors">(908) 767-5309</p>
                </div>
              </a>
              
              <a href="mailto:info@a1tradelines.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-[hsl(var(--on-dark))] font-medium group-hover:text-primary transition-colors">info@a1tradelines.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-[hsl(var(--on-dark))] font-medium">Serving Clients Nationwide</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-primary">Free Expert Consultation</CardTitle>
              <CardDescription>Fill out the form below and we'll respond promptly.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="message" className="text-muted-foreground">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your credit goals..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
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
  );
};

export default ContactForm;
