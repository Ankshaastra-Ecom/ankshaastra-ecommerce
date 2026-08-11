// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

// // NOTE: This endpoint is called by Razorpay's servers directly (not by the browser),
// // so it must NOT require a Supabase JWT. Security instead comes from verifying the
// // X-Razorpay-Signature header against RAZORPAY_WEBHOOK_SECRET below.
// // Configure this URL in Razorpay Dashboard -> Settings -> Webhooks:
// //   https://<project-ref>.supabase.co/functions/v1/razorpay-webhook
// // Events to enable: payment.captured, payment.failed, order.paid

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
// };

// async function hmacSha256Hex(secret: string, message: string): Promise<string> {
//   const enc = new TextEncoder();
//   const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
//   const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(message));
//   return Array.from(new Uint8Array(sigBuf))
//     .map((b) => b.toString(16).padStart(2, '0'))
//     .join('');
// }

// async function sendConfirmationEmailIfNeeded(
//   supabase: ReturnType<typeof createClient>,
//   SUPABASE_URL: string,
//   SUPABASE_SERVICE_ROLE_KEY: string,
//   order: any,
// ) {
//   if (order.confirmation_email_sent) return;

//   const { data: items } = await supabase
//     .from('order_items')
//     .select('product_name, product_price, quantity, total')
//     .eq('order_id', order.id);

//   const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-order-email`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
//     },
//     body: JSON.stringify({
//       to: order.shipping_email,
//       customerName: `${order.shipping_first_name} ${order.shipping_last_name}`,
//       orderNumber: order.order_number,
//       items: items || [],
//       subtotal: order.subtotal,
//       shipping: order.shipping,
//       total: order.total,
//       paymentMethod: order.payment_method,
//       shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`,
//     }),
//   });

//   if (emailRes.ok) {
//     await supabase.from('orders').update({ confirmation_email_sent: true }).eq('id', order.id);
//   } else {
//     console.error('send-order-email failed from razorpay-webhook:', await emailRes.text());
//   }
// }

// Deno.serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { headers: corsHeaders });
//   }

//   const RAZORPAY_WEBHOOK_SECRET = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
//   const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
//   const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

//   if (!RAZORPAY_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
//     console.error('razorpay-webhook: missing RAZORPAY_WEBHOOK_SECRET or Supabase service credentials');
//     return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     // IMPORTANT: verify against the raw body text, not a re-serialized JSON object,
//     // or the signature will never match.
//     const rawBody = await req.text();
//     const signature = req.headers.get('x-razorpay-signature') || '';

//     const expectedSignature = await hmacSha256Hex(RAZORPAY_WEBHOOK_SECRET, rawBody);
//     if (expectedSignature !== signature) {
//       console.error('razorpay-webhook: signature mismatch, rejecting');
//       return new Response(JSON.stringify({ error: 'Invalid signature' }), {
//         status: 400,
//         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//       });
//     }

//     const payload = JSON.parse(rawBody);
//     const event = payload.event as string;
//     const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

//     console.log('razorpay-webhook received event:', event);

//     if (event === 'payment.captured' || event === 'order.paid') {
//       const paymentEntity = payload.payload?.payment?.entity;
//       const razorpayOrderId: string | undefined = paymentEntity?.order_id ?? payload.payload?.order?.entity?.id;
//       const razorpayPaymentId: string | undefined = paymentEntity?.id;

//       if (!razorpayOrderId) {
//         return new Response(JSON.stringify({ received: true, note: 'no order id in payload' }), {
//           status: 200,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         });
//       }

//       const { data: order, error } = await supabase
//         .from('orders')
//         .update({
//           payment_status: 'paid',
//           status: 'confirmed',
//           payment_id: razorpayPaymentId || null,
//           razorpay_payment_id: razorpayPaymentId || null,
//         })
//         .eq('razorpay_order_id', razorpayOrderId)
//         .select('*')
//         .maybeSingle();

//       if (error) {
//         console.error('razorpay-webhook: failed to update order', error);
//       } else if (order) {
//         await sendConfirmationEmailIfNeeded(supabase, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, order);
//       } else {
//         console.error('razorpay-webhook: no order found for razorpay_order_id', razorpayOrderId);
//       }
//     } else if (event === 'payment.failed') {
//       const paymentEntity = payload.payload?.payment?.entity;
//       const razorpayOrderId: string | undefined = paymentEntity?.order_id;
//       const errorDescription: string | undefined = paymentEntity?.error_description;

//       if (razorpayOrderId) {
//         await supabase
//           .from('orders')
//           .update({ payment_status: 'failed', payment_error: errorDescription || 'Payment failed' })
//           .eq('razorpay_order_id', razorpayOrderId);
//       }
//     }

//     // Always acknowledge quickly with 200 so Razorpay doesn't keep retrying.
//     return new Response(JSON.stringify({ received: true }), {
//       status: 200,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   } catch (error: unknown) {
//     console.error('razorpay-webhook error:', error);
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return new Response(JSON.stringify({ error: message }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });



import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
};

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sendConfirmationEmailIfNeeded(
  supabase: ReturnType<typeof createClient>,
  SUPABASE_URL: string,
  SUPABASE_SERVICE_ROLE_KEY: string,
  order: any,
) {
  const { data: claimed } = await supabase
    .from('orders')
    .update({ confirmation_email_sent: true })
    .eq('id', order.id)
    .eq('confirmation_email_sent', false)
    .select('id')
    .maybeSingle();

  if (!claimed) return;

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
      customerPhone: order.shipping_phone,
      orderNumber: order.order_number,
      orderDate: order.created_at,
      items: items || [],
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      paymentMethod: order.payment_method,
      shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`,
      shippingCity: order.shipping_city,
      shippingState: order.shipping_state,
      shippingPincode: order.shipping_pincode,
    }),
  });

  if (!emailRes.ok) {
    console.error('send-order-email failed from razorpay-webhook:', await emailRes.text());
    await supabase.from('orders').update({ confirmation_email_sent: false }).eq('id', order.id);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RAZORPAY_WEBHOOK_SECRET = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!RAZORPAY_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('razorpay-webhook: missing RAZORPAY_WEBHOOK_SECRET or Supabase service credentials');
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    const expectedSignature = await hmacSha256Hex(RAZORPAY_WEBHOOK_SECRET, rawBody);
    if (expectedSignature !== signature) {
      console.error('razorpay-webhook: signature mismatch, rejecting');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event as string;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('razorpay-webhook received event:', event);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const razorpayOrderId: string | undefined = paymentEntity?.order_id ?? payload.payload?.order?.entity?.id;
      const razorpayPaymentId: string | undefined = paymentEntity?.id;

      if (!razorpayOrderId) {
        return new Response(JSON.stringify({ received: true, note: 'no order id in payload' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: order, error } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
          payment_id: razorpayPaymentId || null,
          razorpay_payment_id: razorpayPaymentId || null,
        })
        .eq('razorpay_order_id', razorpayOrderId)
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('razorpay-webhook: failed to update order', error);
      } else if (order) {
        await sendConfirmationEmailIfNeeded(supabase, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, order);
      } else {
        console.error('razorpay-webhook: no order found for razorpay_order_id', razorpayOrderId);
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload.payload?.payment?.entity;
      const razorpayOrderId: string | undefined = paymentEntity?.order_id;
      const errorDescription: string | undefined = paymentEntity?.error_description;

      if (razorpayOrderId) {
        await supabase
          .from('orders')
          .update({ payment_status: 'failed', payment_error: errorDescription || 'Payment failed' })
          .eq('razorpay_order_id', razorpayOrderId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('razorpay-webhook error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
