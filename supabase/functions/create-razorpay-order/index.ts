import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  orderId: string;       // our internal orders.id (uuid)
  amount: number;        // rupees (not paise)
  receipt: string;       // our order_number, shown in Razorpay dashboard
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
  const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return new Response(
      JSON.stringify({ error: 'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET secrets.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfigured (missing Supabase service credentials)' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { orderId, amount, receipt }: CreateOrderRequest = await req.json();

    if (!orderId || !amount || !receipt) {
      return new Response(JSON.stringify({ error: 'orderId, amount and receipt are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Confirm the order actually exists and belongs to what the client claims,
    // and re-derive the amount from the DB rather than trusting the client blindly.
    const { data: dbOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id, total, order_number, payment_status')
      .eq('id', orderId)
      .single();

    if (fetchError || !dbOrder) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (dbOrder.payment_status === 'paid') {
      return new Response(JSON.stringify({ error: 'This order has already been paid' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Always use the amount stored in our own DB (in rupees) — never trust client-supplied amount for the charge.
    const amountInPaise = Math.round(Number(dbOrder.total) * 100);

    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: dbOrder.order_number,
        notes: { order_id: dbOrder.id, order_number: dbOrder.order_number },
      }),
    });

    const razorpayOrder = await razorpayRes.json();

    if (!razorpayRes.ok) {
      return new Response(JSON.stringify({ error: razorpayOrder?.error?.description || 'Razorpay order creation failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save the razorpay order id against our order so the webhook can find it later.
    const { error: updateError } = await supabase
      .from('orders')
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to store razorpay_order_id:', updateError);
    }

    return new Response(
      JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: RAZORPAY_KEY_ID, // public key id, safe to expose to the browser
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error: unknown) {
    console.error('create-razorpay-order error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
