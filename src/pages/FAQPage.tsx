import React from "react"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/Accordion"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"

export const FAQPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/" />
      
      <Breadcrumbs items={[{ label: "Help Center" }]} />

      <div className="border-b pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-foreground">Help Center</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Instant clarity on common inquiries, shipping, payments, returns, and warranties.
        </p>
      </div>

      <div className="space-y-6 mt-4">
        
        {/* Accordion List */}
        <div className="border rounded-2xl bg-card shadow-sm p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            
            {/* FAQ Item 1 */}
            <AccordionItem value="item-1">
              <AccordionTrigger>What are your shipping rates and speed policies?</AccordionTrigger>
              <AccordionContent>
                We offer free shipping on all orders over $150. For orders below $150, we charge a flat shipping rate of $15. Most standard orders are processed within 24 hours and delivered within 3-5 business days. Express shipping options are available during checkout.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ Item 2 */}
            <AccordionItem value="item-2">
              <AccordionTrigger>What is your returns policy?</AccordionTrigger>
              <AccordionContent>
                We support a 30-day hassle-free return policy. If you are unsatisfied with your product size or quality, you can submit a return request directly from your dashboard order history. Return shipping labels will be generated for qualified submissions.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ Item 3 */}
            <AccordionItem value="item-3">
              <AccordionTrigger>Are payments processed securely on Nexus?</AccordionTrigger>
              <AccordionContent>
                Yes. All transactions are processed through encrypted SSL payment gateway portals. We adhere to PCI-DSS standards to ensure your card details are never saved in plaintext or accessed by unauthorized third parties.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ Item 4 */}
            <AccordionItem value="item-4">
              <AccordionTrigger>Do your products come with warranties?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Electronics like the AeroPulse ANC Headphones feature a 2-year warranty covering manufacturing flaws. Other categories (fashion, home) carry 1-year product quality warranties. Check product specifications for warranty details.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ Item 5 */}
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I cancel my order?</AccordionTrigger>
              <AccordionContent>
                Orders can be cancelled before carrier shipping dispatch. Navigate to your Order History in the dashboard panel and click "Cancel Order" if visible. Once the package is marked as Shipped, you will need to trigger a Return Request upon package delivery.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* Support contact note */}
        <div className="flex items-center gap-3 bg-muted/40 p-5 rounded-2xl border text-xs text-muted-foreground leading-relaxed">
          <HelpCircle className="h-5 w-5 text-primary shrink-0" />
          <span>Still need assistance? Drop us a query on our <a href="/contact" className="text-primary hover:underline font-bold">Contact Page</a>. Our team is available 24/7.</span>
        </div>

      </div>

    </div>
  )
}
