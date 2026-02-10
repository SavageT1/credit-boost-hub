import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do authorized user tradelines work?",
    answer:
      "An authorized user tradeline is created when you are added to an existing credit card account. That account history may appear on your credit report and can affect factors like average age and utilization.",
  },
  {
    question: "How long does it take for a tradeline to report?",
    answer:
      "Reporting timelines vary by card issuer and credit bureau, but many tradelines show within one to two billing cycles. Exact timing is never guaranteed.",
  },
  {
    question: "Will a tradeline guarantee a credit score increase?",
    answer:
      "No. Score changes depend on your total credit profile, including utilization, payment history, negative items, and lender scoring models. Tradelines are one factor, not a guarantee.",
  },
  {
    question: "What if I have collections or charge-offs?",
    answer:
      "You may benefit from resolving inaccurate negative items first. We recommend reviewing your full report and fixing reporting issues before adding new credit-building strategies.",
  },
  {
    question: "Is a tradeline the same as credit repair?",
    answer:
      "No. Tradelines add positive account history as an authorized user. Credit repair focuses on disputing inaccurate or unverifiable report items. They are different services.",
  },
];

const HomeFaqSection = () => {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-8 gradient-dark border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display text-primary text-glow mb-4 text-center">Tradelines FAQ</h2>
        <p className="text-[hsl(var(--on-dark))] opacity-80 text-center mb-8 max-w-2xl mx-auto">
          Answers to common questions about authorized user tradelines and realistic expectations.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-5 bg-secondary/20">
              <AccordionTrigger className="text-left text-[hsl(var(--on-dark))] hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-[hsl(var(--on-dark))] opacity-80">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { faqs };
export default HomeFaqSection;
