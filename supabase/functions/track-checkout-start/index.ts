// Deploy this as a NEW Supabase Edge Function named "track-checkout-start".
// It does ONE thing: pushes a "Checkout Started" row into the same Google
// Sheet that confirmed orders go into — no email is sent from here. This is
// called the moment a customer clicks "Pay" (before payment succeeds), so
// if they then abandon/fail payment, their details are still visible in
// the Sheet with status "Checkout Started" — the client can follow up.
//
// If the customer DOES complete payment, the existing send-order-email
// function still pushes a SECOND row with status "confirmed" for the same
// Order Number — so in the Sheet, a completed order shows twice (once
// "Checkout Started", once "confirmed"), and a genuine drop only shows the
// "Checkout Started" row with no matching "confirmed" row.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Same Google Apps Script Web App URL used in send-order-email.
const GOOGLE_SHEET_WEBHOOK =
  'https://script.google.com/macros/s/AKfycby_XJcWxJDPSuxusQ6T81ZrFLgot1xm3bvHH7g7QBKEMtwrsanDi2BXjlSs3RqCqIDn/exec';

interface CheckoutStartRequest {
  orderNumber: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { product_name: string; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: CheckoutStartRequest = await req.json();

    const itemsSummary = body.items.map((item) => `${item.product_name} x${item.quantity}`).join(', ');

    // Fire-and-forget-ish: we still await it here since this function's
    // ONLY job is this push, but any failure is just logged, never thrown,
    // so it can never break the checkout flow that called it.
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: body.orderNumber,
          customerName: body.customerName,
          email: body.email,
          phone: body.phone || '',
          items: itemsSummary,
          subtotal: body.subtotal,
          shipping: body.shipping,
          total: body.total,
          paymentMethod: body.paymentMethod,
          address: body.address || '',
          city: body.city || '',
          state: body.state || '',
          pincode: body.pincode || '',
          status: 'Checkout Started',
          createdAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[track-checkout-start] failed to push row:', err instanceof Error ? err.message : err);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('track-checkout-start error:', error);
    // Still return 200 — this must never surface as an error to the checkout UI.
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
