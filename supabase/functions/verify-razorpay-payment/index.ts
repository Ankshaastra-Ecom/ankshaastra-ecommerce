import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyRequest {
  orderId: string; // our internal orders.id
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!RAZORPAY_KEY_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }: VerifyRequest = await req.json();

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const expectedSignature = await hmacSha256Hex(RAZORPAY_KEY_SECRET, `${razorpay_order_id}|${razorpay_payment_id}`);

    if (expectedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Payment verification failed (signature mismatch)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        payment_id: razorpay_payment_id,
        razorpay_payment_id,
        razorpay_signature,
      })
      .eq('id', orderId)
      .eq('razorpay_order_id', razorpay_order_id)
      .select('*')
      .single();

    if (updateError || !order) {
      console.error('Order update failed after verification:', updateError);
      return new Response(JSON.stringify({ error: 'Could not update order after verification' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fire the confirmation emails now (fast path). The razorpay-webhook function
    // does the same thing as a durable fallback, guarded by confirmation_email_sent
    // so the customer/admin never gets duplicate emails.
    if (!order.confirmation_email_sent) {
      const { data: items } = await supabase
        .from('order_items')
        .select('product_name, product_price, quantity, total')
        .eq('order_id', order.id);

      const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          to: order.shipping_email,
          customerName: `${order.shipping_first_name} ${order.shipping_last_name}`,
          orderNumber: order.order_number,
          items: items || [],
          subtotal: order.subtotal,
          shipping: order.shipping,
          total: order.total,
          paymentMethod: order.payment_method,
          shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`,
        }),
      });

      if (emailRes.ok) {
        await supabase.from('orders').update({ confirmation_email_sent: true }).eq('id', order.id);
      } else {
        console.error('send-order-email failed from verify-razorpay-payment:', await emailRes.text());
      }
    }

    return new Response(JSON.stringify({ success: true, orderNumber: order.order_number }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('verify-razorpay-payment error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
