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
  const HUBSPOT_REGION = "na2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
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
      console.error("HubSpot form submission error:", error);
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
          <DialogDescription className="text-gray-400">
            Fill out the form below and our team will reach out within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-300">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-background/50 text-white placeholder:text-gray-500 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-300">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-background/50 text-white placeholder:text-gray-500 border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalEmail" className="text-gray-300">
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
              className="bg-background/50 text-white placeholder:text-gray-500 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalPhone" className="text-gray-300">
              Phone Number
            </Label>
            <Input
              id="modalPhone"
              name="phone"
              type="tel"
              placeholder="(908) 767-5309"
              value={formData.phone}
              onChange={handleChange}
              className="bg-background/50 text-white placeholder:text-gray-500 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalMessage" className="text-gray-300">
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
              className="bg-background/50 text-white placeholder:text-gray-500 border-border"
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
