import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, CreditCard, Truck, AlertTriangle, Scale, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SEO from '@/components/SEO';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Terms & Conditions" description="Read Ankshaastra's terms and conditions for shopping, payments, shipping, and product usage policies." canonical="/terms" />
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/30 py-8 md:py-12">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Terms & Conditions</span>
            </nav>
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">Terms & Conditions</h1>
            </div>
            <p className="text-muted-foreground mt-2">Last updated: March 2026</p>
          </div>
        </div>

        <div className="container-custom py-8 md:py-12 max-w-4xl">
          <p className="text-muted-foreground mb-8">
            Welcome to Ankshaastra. By accessing or using our website (www.ankshaastra.com) and purchasing products, you agree to be bound by these Terms & Conditions. Please read them carefully before placing an order.
          </p>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="general" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> General Terms</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>By using our website, you confirm that you are at least 18 years of age and have the legal capacity to enter into binding contracts.</p>
                <p>Ankshaastra reserves the right to modify, suspend, or discontinue any part of the website or services at any time without prior notice.</p>
                <p>All content on this website, including text, images, product descriptions, and logos, is the intellectual property of Ankshaastra and may not be reproduced without written consent.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary" /> Products & Descriptions</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>All products sold on Ankshaastra are handcrafted natural gemstones, Rudraksha beads, crystals, yantras, and spiritual accessories. Each piece is unique due to the nature of natural materials.</p>
                <p>We strive to display product colors and details as accurately as possible. However, slight variations in color, size, and appearance may occur due to natural variations, lighting, and screen settings.</p>
                <p>Product descriptions, including spiritual benefits and healing properties, are based on traditional beliefs and are not intended as medical advice. Please consult a healthcare professional for medical conditions.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Pricing & Payment</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.</p>
                <p>Ankshaastra reserves the right to modify prices at any time without prior notice. Prices at the time of order placement will be honored.</p>
                <p>We accept payments via Credit Card, Debit Card, Net Banking, UPI, and Cash on Delivery (COD) where available. For COD orders above ₹2,00,000, additional verification (PAN card) may be required.</p>
                <p>Payment processing is handled by secure third-party payment gateways. Ankshaastra does not store your credit/debit card information.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-primary" /> Shipping & Delivery</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>Orders are processed within 4 business days. Standard delivery takes 7–15 days domestically and 10–20 days internationally.</p>
                <p>Shipping charges are based on destination and order weight. Free shipping promotions may apply for qualifying orders.</p>
                <p>For detailed shipping information, please refer to our <Link to="/shipping-policy" className="text-primary hover:underline">Shipping Policy</Link>.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-primary" /> Returns, Refunds & Cancellations</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>Returns are accepted within 7 days of delivery for damaged or incorrect items only. Videographic proof is mandatory for all return/exchange requests.</p>
                <p>Once an order is placed, cancellations are not permitted under any circumstances.</p>
                <p>For detailed return and refund information, please refer to our <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> Limitation of Liability</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>Ankshaastra shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
                <p>Our total liability shall not exceed the amount paid by you for the product in question.</p>
                <p>We are not responsible for delays or failures caused by Force Majeure events including natural disasters, government actions, or transportation disruptions.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Governing Law & Jurisdiction</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>These Terms & Conditions are governed by the laws of India. Any disputes arising from the use of this website or purchase of products shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-10 p-6 bg-secondary/30 rounded-lg flex items-start gap-3">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Have Questions?</h3>
              <p className="text-muted-foreground text-sm">
                Contact us at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a> or visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
