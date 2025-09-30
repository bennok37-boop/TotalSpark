import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  city?: string;
  faqs?: FAQItem[];
}

export default function FAQSection({ city = "Newcastle", faqs }: FAQSectionProps) {
  const defaultFaqs: FAQItem[] = [
    {
      question: `Do you provide cleaning services throughout ${city}?`,
      answer: `Yes, we provide professional cleaning services across all areas of ${city} and surrounding neighborhoods. Our team is familiar with local properties and access requirements.`
    },
    {
      question: "What does your deposit-back guarantee include?",
      answer: "Our deposit-back guarantee means if your landlord deducts any amount from your deposit due to cleaning issues that we were hired to address, we'll refund the deducted amount. This applies to all our end-of-tenancy cleaning services."
    },
    {
      question: "Are your cleaners DBS checked and insured?",
      answer: "Yes, all our cleaning staff are DBS checked and we carry £2 million public liability insurance. We also provide copies of our insurance certificates upon request for your peace of mind."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 48 hours in advance, though we often accommodate same-day and next-day requests depending on availability. For end-of-tenancy cleans, we suggest booking a week ahead during busy periods."
    },
    {
      question: "What cleaning products and equipment do you use?",
      answer: "We bring all necessary professional-grade equipment and eco-friendly cleaning products. Our supplies are safe for children and pets, and we can accommodate specific requirements or allergies upon request."
    },
    {
      question: "What happens if I'm not satisfied with the cleaning?",
      answer: "If you're not completely satisfied, we offer a free re-clean within 48 hours. We also provide a full money-back guarantee if the re-clean doesn't meet your expectations. Your satisfaction is our priority."
    },
    {
      question: "Do you clean on weekends and evenings?",
      answer: "Yes, we offer flexible scheduling including weekends and evening appointments to accommodate your schedule. Weekend and evening services may include a small surcharge."
    },
    {
      question: "How do you calculate pricing?",
      answer: "Pricing depends on property size, type of cleaning required, and any additional services. We provide free, no-obligation quotes and our pricing is transparent with no hidden fees."
    }
  ];

  const faqsToDisplay = faqs || defaultFaqs;

  return (
    <section id="faq" className="py-16 bg-muted" data-testid="section-faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our cleaning services in {city}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqsToDisplay.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border rounded-lg px-6">
                <AccordionTrigger 
                  className="text-left font-semibold hover:no-underline py-6"
                  data-testid={`faq-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground leading-relaxed pb-6"
                  data-testid={`faq-content-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:03300432115" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                data-testid="button-call-faq"
              >
                Call Us: 03300432115
              </a>
              <a 
                href="mailto:info@cleanpro.co.uk" 
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                data-testid="button-email-faq"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}