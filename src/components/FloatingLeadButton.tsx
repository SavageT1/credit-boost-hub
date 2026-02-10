import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "@/components/ContactFormModal";
import { MessageSquare } from "lucide-react";

const FloatingLeadButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="font-display box-glow shadow-lg"
          size="lg"
          onClick={() => setOpen(true)}
          data-cta="floating-assessment"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Free Assessment
        </Button>
      </div>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        title="Get Your Free Assessment"
      />
    </>
  );
};

export default FloatingLeadButton;
