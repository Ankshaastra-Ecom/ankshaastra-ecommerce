import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldCheck, Clock, PackageX, CreditCard, Globe, Gift, AlertTriangle } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Refund Policy</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="card-spiritual p-6 md:p-8 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-display font-bold text-foreground mb-2">Return & Replacement Policy</h2>
                <p className="text-muted-foreground">
                  At Ankshaastra, we take pride in offering handcrafted natural gemstones and jewelry, making each piece truly unique. However, due to the nature of the products we implore you to kindly refer to the below mentioned policy before requesting a return/exchange and/or refund.
                </p>
              </div>
            </div>
          </div>

          <Accordion type="multiple" className="space-y-4">
            {/* Return & Exchange Policy */}
            <AccordionItem value="return-exchange" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <PackageX className="w-5 h-5 text-primary" />
                  Return & Exchange Policy
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <p>While we want to ensure you are satisfied with your purchase we cannot guarantee that each request for return/refund and/or exchange will be accepted by us. We reserve the right to refuse and/or deny any such request if it is not aligned with the below mentioned conditions.</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Eligibility</h4>
                    <p>Returns or exchanges are only accepted if your order is damaged during transit or if you received an incorrect product.</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm"><strong>Note:</strong> The Customer acknowledges and agrees that, due to the nature of the products, the Company requires videographic proof to process any return or exchange request. This videographic evidence is mandatory for the Company to internally evaluate the condition of the product and make an informed decision regarding the return or exchange request. Failure to provide such proof, as requested, will render the Company unable to process the return or exchange request.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">Timeframe</h4>
                    <p>Requests for a refund or exchange must be made within <strong>seven (07) days</strong> of receiving your product. The item must be returned in its original condition with its original certification and packaging intact. Any tampering with the product and/or its certifications will be cause enough for us to deny your return request.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground">Exclusions</h4>
                    <p>Returns and exchanges will not be accepted after the 7-day period.</p>
                  </div>

                  <p>We at Ankshaastra take utmost pride in serving the best products, however should you have any doubts in regards to the quality of the product we implore you to kindly get the product verified for authenticity at a Government gemological institute (ISO certified or Internationally reputed). If any gemstone is proven to be synthetic or artificial by such an institute, you are entitled to a <strong>100% refund, return, or exchange</strong>; as you deem fit.</p>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm"><strong>Note:</strong> Please note that courier charges, VAT, and duties are non-refundable on any product you wish to return and/or exchange. The Company will not arrange for any pick up in case of any return/exchange. All charges including shipping charges for such return/exchange shall be borne by you and cannot be claimed, adjusted or issued as a credit note from our end.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Categories Not Eligible */}
            <AccordionItem value="not-eligible" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Categories Not Eligible for Return
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <p>Please note that returns are not possible for the following categories unless the product is damaged:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Customised Jewelry</li>
                  <li>Beads Bracelets</li>
                  <li>Crystal Trees</li>
                  <li>Rakhi</li>
                  <li>Products received exactly as ordered</li>
                  <li>Gift Cards</li>
                </ul>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm"><strong>Note:</strong> Due to the intrinsic nature of the products we sell on the website and the likelihood of these products being exchanged with fake/low quality counter products, we cannot accept any return requests for such products. Personalized rings/jewellery/bracelets or any kind of wearable made with specific fitting size for a person cannot be returned. We request you to kindly check the website and/or contact customer support to enquire about the returnability of the product.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Refund Process */}
            <AccordionItem value="refund-process" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Refund Process
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <p>If your return request is approved, then your refund will be processed and credited to your credit card or original/source method of payment, within <strong>10-12 working days</strong>, subject to unforeseeable delays from bank processes and/or public holidays, if applicable.</p>
                
                <p>Once your return is received and duly inspected by our team, we will send you an email to notify you acknowledging that we have received your returned item. We will also notify you of the approval or rejection of your refund based on our internal inspection.</p>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm"><strong>Note:</strong> We kindly request that you acknowledge our inability to process refunds to any account other than the original source of payment. This policy is in place to comply with applicable legal requirements and to avoid any potential legal or penal consequences. Refunds will only be issued to the payment method and/or original account initially used for the transaction.</p>
                </div>

                <p>For orders placed using the Cash on Delivery ("COD") payment method, the Company reserves the right to request additional details including but not limited to PAN Card, etc. for orders above Rupees Two Lakh, to process any refund. The Customer agrees to provide the necessary bank details, including but not limited to a copy of a canceled cheque, passbook details, or any other information required for processing the refund.</p>

                <p>For prepaid orders made via Credit Card, Debit Card, or Net Banking, the refunded amount will be credited back to the original account within <strong>5-7 working days</strong>.</p>

                <p>The Company will make reasonable efforts to process and issue refunds promptly. However, the Customer acknowledges and agrees that any delays in processing the refund due to circumstances beyond the Company's control, including but not limited to technical issues, third-party service delays, or other unforeseen events, shall not be the responsibility of the Company.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Exclusions */}
            <AccordionItem value="exclusions" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Exclusions for Returns or Exchanges
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-4">
                <p>The Company shall not accept returns or exchanges for the following reasons:</p>
                <ul className="space-y-3 ml-2">
                  <li><strong className="text-foreground">Change of Mind:</strong> If the Customer simply dislikes the product or no longer wishes to retain it.</li>
                  <li><strong className="text-foreground">Minor Flaws or Packaging Issues:</strong> If there are minor imperfections or issues with the packaging that do not affect the functionality or quality of the product.</li>
                  <li><strong className="text-foreground">Slight Color or Size Variations:</strong> If there are slight differences in color or size from what was perceived during the purchase, such variations may occur due to factors such as lighting, screen resolution, or manufacturing tolerances.</li>
                </ul>
                <p>The Customer is strongly encouraged to carefully review the size chart and product descriptions prior to making a purchase to ensure that the correct size and specifications are selected.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Cancellation Policy */}
            <AccordionItem value="cancellation" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Cancellation Policy
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>The Company strives to provide the best experience for its customers. However, once an order is placed, <strong>cancellations are not permitted</strong> under any circumstances.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Late or Missing Refunds */}
            <AccordionItem value="late-refunds" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Late or Missing Refunds
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>If you have not yet received your refund, we kindly request that you first verify your bank account for the transaction. If the refund is not reflected, please contact your credit card company, as it may take additional time for the refund to be officially posted.</p>
                <p>After checking with your credit card company, we advise you to contact your bank to inquire about the status of the credit for the refund.</p>
                <p>If, after completing the above steps, you still have not received your refund, please contact us directly at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a> for further assistance.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Sale Items */}
            <AccordionItem value="sale-items" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Sale Items
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>All items marked as "Sale" or purchased at a discounted price are <strong>final sale</strong>. These items are not eligible for return, exchange, or refund under any circumstances. By completing the purchase of a sale item, you acknowledge and agree that the sale is final.</p>
              </AccordionContent>
            </AccordionItem>

            {/* Exchanges */}
            <AccordionItem value="exchanges" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <PackageX className="w-5 h-5 text-primary" />
                  Exchanges
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>We will only replace items if they are defective or damaged upon receipt. If you wish to exchange a defective or damaged item for the same item, you must contact us via email at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a> within 7 days from the date of receipt.</p>
                <p>Exchanges are subject to availability, and all items must be returned in their original condition, including packaging and tags. If approved for exchange, you must return the item to: <strong>Unit No. O-622, Block E, Eye of Noida, Sector-140A, Noida-201305, India</strong>.</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm"><strong>Note:</strong> The Company requires videographic proof to process any return or exchange request. Failure to provide such proof will render the Company unable to process the request.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Gifts */}
            <AccordionItem value="gifts" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Gifts
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>If the item was marked as a gift when purchased and shipped directly to you, you'll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
                <p>If the item wasn't marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver only as we only refund to the source account of payment.</p>
              </AccordionContent>
            </AccordionItem>

            {/* International Orders */}
            <AccordionItem value="international" className="card-spiritual px-6 border-none">
              <AccordionTrigger className="text-lg font-display font-bold hover:no-underline">
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  International Orders Refund Policy
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3">
                <p>In the event of an issue with the delivery of an international order, we will process a refund to the original payment method within <strong>40 to 45 days</strong>. This refund policy applies exclusively to international orders.</p>
                <p>We are not responsible for any custom charges, duties, VAT, etc. that your country may be charging as these vary from case-to-case basis and are beyond our control.</p>
                <p>For international orders, if the shipment is either refused by the customer or cancelled after dispatch, the customer will be responsible for all customs duties, VAT, and other charges imposed by their country for the return of the items to us. Refunds will only be processed upon receipt of the returned items.</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm"><strong>Note:</strong> At the time of shipping the return item to Ankshaastra, you are responsible for filling correct information regarding the product, including purchase price and particulars of the product being returned. Failure to comply may result in non-fulfillment of return due to discrepancies in order particulars.</p>
                </div>
                <p>For any further queries, please contact us at <a href="mailto:social@ankshaastra.com" className="text-primary hover:underline">social@ankshaastra.com</a>. We're here to assist you.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
