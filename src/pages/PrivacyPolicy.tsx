import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Database, Lock, Users, Globe, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SEO from '@/components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Privacy Policy" description="Ankshaastra privacy policy. Learn how we collect, use, and protect your personal information when you shop with us." canonical="/privacy-policy" />
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/30 py-8 md:py-12">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Privacy Policy</span>
            </nav>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground mt-2">Last updated: March 2026</p>
          </div>
        </div>

        <div className="container-custom py-8 md:py-12 max-w-4xl">
          <p className="text-muted-foreground mb-8">
            At Ankshaastra, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="collection" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Database className="w-5 h-5 text-primary" /> Information We Collect</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p><strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address, and payment details provided during checkout.</p>
                <p><strong>Automatically Collected:</strong> IP address, browser type, device information, pages visited, and cookies for analytics and site improvement.</p>
                <p><strong>Order Information:</strong> Products purchased, transaction amounts, and order history to process and fulfill your orders.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="usage" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Eye className="w-5 h-5 text-primary" /> How We Use Your Information</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Process and fulfill orders, including shipping and payment processing</li>
                  <li>Communicate about orders, promotions, and customer support inquiries</li>
                  <li>Improve our website, products, and customer experience</li>
                  <li>Prevent fraud and ensure website security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sharing" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Information Sharing</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We do not sell your personal information. We may share information with:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Service Providers:</strong> Payment processors, shipping couriers (Shiprocket, Bluedart), and analytics providers</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Cookies & Tracking</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.</p>
                <p>Third-party services such as Google Analytics may also collect data to help us understand website usage patterns.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Data Security</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We implement industry-standard security measures including SSL encryption, secure payment gateways, and restricted data access to protect your personal information.</p>
                <p>However, no method of electronic transmission or storage is 100% secure. We encourage you to protect your account credentials and contact us immediately if you suspect unauthorized access.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rights" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Your Rights</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Request a copy of the data we hold about you</li>
                  <li>Withdraw consent for data processing where applicable</li>
                </ul>
                <p>To exercise these rights, contact us at <strong>social@ankshaastra.com</strong>.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="children" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Children's Privacy</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such data, we will take steps to delete it promptly.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes" className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-display font-semibold">
                <span className="flex items-center gap-2"><Eye className="w-5 h-5 text-primary" /> Policy Updates</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-10 p-6 bg-secondary/30 rounded-lg flex items-start gap-3">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Questions About Your Privacy?</h3>
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

export default PrivacyPolicy;
