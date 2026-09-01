import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Package, MessageCircle, FileText, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import TrustBar from '@/components/home/TrustBar';
import { Button } from '@/components/ui/button';
import { downloadInvoice } from '@/utils/generateInvoice';

export interface StoredOrder {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: { name: string; price: number; quantity: number }[];
}

export const ORDER_STORAGE_KEY = 'ankshaastra_last_order';

/** Fires the standard Purchase conversion event to any analytics layer present. */
export const trackPurchase = (order: StoredOrder) => {
  const w = window as unknown as Record<string, any>;
  const payload = {
    value: order.total,
    currency: 'INR',
    transaction_id: order.orderNumber,
    contents: order.items.map((i) => ({ id: i.name, quantity: i.quantity, item_price: i.price })),
    num_items: order.items.reduce((s, i) => s + i.quantity, 0),
  };
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'purchase', ecommerce: payload });
    if (typeof w.fbq === 'function') w.fbq('track', 'Purchase', payload);
    if (typeof w.gtag === 'function') w.gtag('event', 'purchase', payload);
  } catch {
    /* analytics is optional */
  }
};

const OrderConfirmation: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
      if (raw) {
        const parsed: StoredOrder = JSON.parse(raw);
        if (!orderNumber || parsed.orderNumber === orderNumber) {
          setOrder(parsed);
          if (!sessionStorage.getItem(`${ORDER_STORAGE_KEY}_tracked_${parsed.orderNumber}`)) {
            trackPurchase(parsed);
            sessionStorage.setItem(`${ORDER_STORAGE_KEY}_tracked_${parsed.orderNumber}`, '1');
          }
        }
      }
    } catch {
      /* ignore malformed snapshot */
    }
  }, [orderNumber]);

  const eta = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 6);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
  }, []);

  const handleInvoice = () => {
    if (!order) return;
    downloadInvoice({
      orderNumber: order.orderNumber,
      orderDate: order.orderDate,
      customerName: order.customerName,
      customerEmail: order.email,
      customerPhone: order.phone,
      shippingAddress: order.address,
      shippingCity: order.city,
      shippingState: order.state,
      shippingPincode: order.pincode,
      items: order.items.map((i) => ({
        product_name: i.name,
        product_price: i.price,
        quantity: i.quantity,
        total: i.price * i.quantity,
      })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      paymentMethod: order.paymentMethod,
    } as never);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Order Confirmed — Thank You"
        description="Your Ankshaastra order is confirmed. Track your order, download your GST invoice and see estimated delivery."
        canonical={`/order-confirmation/${orderNumber ?? ''}`}
      />
      <Header />
      <main className="flex-1 py-10 md:py-16">
        <div className="container-custom max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
              <CheckCircle2 className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Thank you for your order 🙏</h1>
            <p className="text-muted-foreground">
              {order
                ? `Order #${order.orderNumber} is confirmed. A confirmation email is on its way to ${order.email}.`
                : orderNumber
                ? `Order #${orderNumber} is confirmed. A confirmation email is on its way.`
                : 'Your order is confirmed. A confirmation email is on its way.'}
            </p>
          </div>

          <div className="mt-8 card-spiritual p-5 md:p-6">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Estimated delivery by {eta}</p>
                <p className="text-sm text-muted-foreground">
                  Your items are energized with Vedic mantras before dispatch. You'll get tracking details on WhatsApp
                  and email once shipped.
                </p>
              </div>
            </div>

            {order && (
              <div className="mt-5 pt-5 border-t border-border/60 space-y-2.5">
                {order.items.map((i) => (
                  <div key={i.name} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {i.name} × {i.quantity}
                    </span>
                    <span className="font-medium">₹{(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border/60">
                  <span>Total paid</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Button asChild className="btn-gold rounded-full">
              <Link to="/my-orders">
                <Package className="w-4 h-4 mr-2" /> Track order
              </Link>
            </Button>
            {order && (
              <Button variant="outline" className="rounded-full" onClick={handleInvoice}>
                <FileText className="w-4 h-4 mr-2" /> GST invoice
              </Button>
            )}
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://wa.me/919667305577" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Need help?
              </a>
            </Button>
          </div>

          <div className="mt-8">
            <TrustBar variant="light" />
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="ghost">
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" /> Continue shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
