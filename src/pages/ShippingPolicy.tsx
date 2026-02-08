import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, Clock, MapPin, CreditCard, Globe, ShieldCheck, PackageX, AlertTriangle } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shipping Policy</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Shipping Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="card-spiritual p-6 md:p-8 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-display font-bold text-foreground mb-2">Safe & Secure Delivery</h2>
                <p className="text-muted-foreground">
                  At Ankshaastra, your trust in us is paramount, and we're committed to delivering your treasures with the utmost care and reliability. Here's everything you need to know about our shipping process.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Secure Packaging</h4>
                <p className="text-xs text-muted-foreground mt-1">Carefully packaged to ensure pristine condition</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Fully Insured</h4>
                <p className="text-xs text-muted-foreground mt-1">Every order insured during transit</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground text-sm">Trusted Couriers</h4>
                <p className="text-xs text-muted-foreground mt-1">Shiprocket, Bluedart & Aftership</p>
              </div>
            </div>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Shipping Timeline */}
            <AccordionItem value="timeline" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Shipping Timeline
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Dispatch Time</h4>
                    <p>Orders are processed and dispatched within <strong>4 business days</strong> of confirmation. For customized or personalized items, please allow extra time; we'll keep you informed every step of the way.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Delivery Duration</h4>
                    <p>Standard delivery time is typically <strong>7-15 days</strong> from the date of dispatch. International orders may take longer due to customs procedures.</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm"><strong>Note:</strong> The timelines mentioned may be subject to change due to factors beyond our control, including but not limited to shipping delays, customs processing, or unforeseen circumstances.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Order Tracking */}
            <AccordionItem value="tracking" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Order Tracking
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Real-Time Tracking:</strong> Once your order is on its way, you'll receive a confirmation email with tracking details. Follow your package's journey with ease through the provided link.</p>
                <p><strong className="text-foreground">Stay Updated:</strong> We'll keep you informed throughout the shipping process with regular updates via email or SMS.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Delivery Timelines */}
            <AccordionItem value="delivery-timelines" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Delivery Timelines
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>Delivery typically takes <strong>7 to 15 days</strong> from the date of dispatch. While we strive to ensure timely deliveries, actual shipping times may vary based on factors such as location, courier efficiency, customs clearance, and unforeseen circumstances.</p>
                <p>For orders placed from outside India, delivery is typically expected to take <strong>20 to 30 days</strong> from the date of dispatch. In the event of any issues that prevent successful delivery, we will process a refund to the original payment method within 30 to 40 days.</p>
                <p>We currently offer delivery to over <strong>150 countries worldwide</strong>.</p>
                <p className="text-sm italic">Please note that these timeframes are estimates and may vary based on factors such as location, customs clearance, and other circumstances beyond our control.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping Costs */}
            <AccordionItem value="costs" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Shipping Costs
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Transparent Pricing:</strong> Shipping charges are calculated based on the destination and weight of your order. Free shipping may be available on orders above a certain value, and we'll communicate any such promotions on our website.</p>
                <p>You can also contact us at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a> to enquire about any offers and we shall be happy to assist you.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Delivery Location */}
            <AccordionItem value="location" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Location
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Accurate Address:</strong> Please ensure that your delivery information is complete and accurate at checkout. For your security, we deliver to residential or business addresses only, and not to PO Boxes or public places like malls or hotels.</p>
                <p><strong className="text-foreground">Address Changes:</strong> If you need to update your delivery address, contact our customer support promptly.</p>
                <p>You acknowledge that the accuracy of the delivery address provided is essential for the successful fulfillment of the order. The Company shall not be held liable for any delays or issues arising from inaccurate or incomplete delivery information provided by you.</p>
              </AccordionContent>
            </AccordionItem>

            {/* What to Expect at Delivery */}
            <AccordionItem value="expect" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  What to Expect at Delivery
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">ID Verification:</strong> For high-value orders, we may require a signature and ID verification upon delivery to ensure the package reaches you safely. If you're unavailable, someone you trust can receive it on your behalf.</p>
                <p><strong className="text-foreground">Missed Delivery:</strong> Our courier partner will make up to <strong>three attempts</strong> to deliver your package. If delivery fails after these attempts, the package will be returned to us. For any queries, please contact us at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a>.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Handling Delays */}
            <AccordionItem value="delays" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Handling Delays
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Unforeseen Circumstances:</strong> While the Company makes every effort to meet delivery timelines, delivery may be delayed due to circumstances beyond our control, including natural disasters, public holidays, acts of government, strikes, transportation disruptions, or other unforeseen events ("Force Majeure Events").</p>
                <p>In the event of such delays, the Company shall notify you as soon as reasonably practicable and will provide updates on the revised delivery schedule. The Company shall not be held liable for any failure or delay arising from Force Majeure Events.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Non-Delivery & Returns */}
            <AccordionItem value="non-delivery" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <PackageX className="w-5 h-5 text-primary" />
                  Non-Delivery & Returns
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Missed Delivery:</strong> If your package is not delivered within the expected timeframe, please contact our customer support at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a> within 30 days of purchase for assistance.</p>
                <p><strong className="text-foreground">Return Policy:</strong> In case of delivery discrepancies, such as damaged or missing items, kindly refuse the delivery and contact us immediately with supporting details. For more information, please refer to our <Link to="/refund-policy" className="text-primary hover:underline">Return Policy</Link>.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Cancellation */}
            <AccordionItem value="cancellation" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Cancellation Policy
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>The Company strives to provide the best experience for its customers. However, once an order is placed, <strong>cancellations are not permitted</strong> under any circumstances.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Closing */}
          <div className="card-spiritual p-6 md:p-8 mt-8 text-center">
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Our Commitment to You</h3>
            <p className="text-muted-foreground mb-4">We aim to make your shopping experience as seamless and delightful as the gemstones we offer. If you have any questions or concerns, please don't hesitate to reach out.</p>
            <p className="text-muted-foreground font-medium">Happy shopping! ✨</p>
            <p className="text-primary font-display font-bold mt-2">The Ankshaastra Team</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
