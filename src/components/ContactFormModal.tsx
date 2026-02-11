import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

const ContactFormModal = ({ open, onOpenChange, title = "Get Started" }: ContactFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // HubSpot Form Configuration
  const HUBSPOT_PORTAL_ID = "244921424";
  const HUBSPOT_FORM_ID = "f738963e-9243-43e3-848c-df584038fa1a";

  const buildTrackingData = () => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || "";
    const utmMedium = params.get("utm_medium") || "";
    const utmCampaign = params.get("utm_campaign") || "";
    const gclid = params.get("gclid") || "";
    const fbclid = params.get("fbclid") || "";
    const hutk = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hubspotutk="))
      ?.split("=")[1] || "";

    const trackingSummary = [
      utmSource ? `utm_source=${utmSource}` : "",
      utmMedium ? `utm_medium=${utmMedium}` : "",
      utmCampaign ? `utm_campaign=${utmCampaign}` : "",
      gclid ? `gclid=${gclid}` : "",
      fbclid ? `fbclid=${fbclid}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    return { hutk, trackingSummary };
  };

  const submitToBackend = async (messageForStorage: string) => {
    try {
      const { error } = await supabase.functions.invoke("submit-contact-lead", {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          notes: messageForStorage,
          source: "modal",
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
      const tracking = buildTrackingData();
      const messageWithTracking = tracking.trackingSummary
        ? `${formData.message}\n\nTracking: ${tracking.trackingSummary}`
        : formData.message;

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
              { name: "message", value: messageWithTracking },
            ],
            context: {
              hutk: tracking.hutk,
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      );

      // Fire backend submission without blocking
      submitToBackend(messageWithTracking);

      const response = await hubspotPromise;

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        onOpenChange(false);
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gradient-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">{title}</DialogTitle>
            <DialogDescription className="text-[hsl(var(--on-dark))] opacity-80">
            Fill out the form below and our team will reach out within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[hsl(var(--on-dark))] opacity-80">
                First Name *
              </Label>
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
              <Label htmlFor="lastName" className="text-[hsl(var(--on-dark))] opacity-80">
                Last Name *
              </Label>
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
            <Label htmlFor="modalEmail" className="text-[hsl(var(--on-dark))] opacity-80">
              Email Address *
            </Label>
            <Input
              id="modalEmail"
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
            <Label htmlFor="modalPhone" className="text-[hsl(var(--on-dark))] opacity-80">
              Phone Number
            </Label>
            <Input
              id="modalPhone"
              name="phone"
              type="tel"
              placeholder="(908) 767-5309"
              value={formData.phone}
              onChange={handleChange}
              className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalMessage" className="text-[hsl(var(--on-dark))] opacity-80">
              How can we help? *
            </Label>
            <Textarea
              id="modalMessage"
              name="message"
              placeholder="Tell us about your credit goals..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-background/50 text-foreground placeholder:text-muted-foreground/50 border-border"
            />
          </div>

          <Button type="submit" className="w-full font-display box-glow" disabled={isSubmitting}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
