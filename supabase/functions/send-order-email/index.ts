const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderItem {
  product_name: string;
  product_price: number;
  quantity: number;
  total: number;
}

interface OrderEmailRequest {
  to: string;
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
}

function buildAdminNotificationHtml(params: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
}): string {
  const { orderNumber, customerName, customerEmail, items, subtotal, shipping, total, paymentMethod, shippingAddress } = params;
  const paymentLabel = paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Payment' : paymentMethod === 'razorpay' ? 'Razorpay (Card/UPI/Netbanking)' : 'Card';

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #eee; font-family: Arial, sans-serif; font-size: 14px;">${item.product_name}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #eee; text-align: center; font-family: Arial, sans-serif; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #eee; text-align: right; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600;">₹${item.total.toLocaleString('en-IN')}</td>
      </tr>`,
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial, sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:#3d2e1a;padding:20px 24px;">
        <h2 style="margin:0;color:#fff;font-size:20px;">🛍️ New Order Received</h2>
      </div>
      <div style="padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:14px;color:#555;">Order Number</p>
        <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#b8860b;">${orderNumber}</p>

        <p style="margin:0 0 4px;font-size:14px;color:#555;">Customer</p>
        <p style="margin:0 0 16px;font-size:15px;color:#222;">${customerName} &lt;${customerEmail}&gt;</p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="background:#f0ebe4;">
              <th style="padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;">Item</th>
              <th style="padding:10px 14px;text-align:center;font-size:12px;text-transform:uppercase;">Qty</th>
              <th style="padding:10px 14px;text-align:right;font-size:12px;text-transform:uppercase;">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="border-top:1px solid #eee;padding-top:12px;">
          <p style="margin:0 0 4px;font-size:14px;">Subtotal: ₹${subtotal.toLocaleString('en-IN')}</p>
          <p style="margin:0 0 4px;font-size:14px;">Shipping: ${shipping === 0 ? 'FREE' : `₹${shipping}`}</p>
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;">Total: ₹${total.toLocaleString('en-IN')}</p>
          <p style="margin:0 0 4px;font-size:14px;">Payment Method: <strong>${paymentLabel}</strong></p>
          <p style="margin:0 0 4px;font-size:14px;">Shipping Address: ${shippingAddress}</p>
        </div>
      </div>
      <div style="background:#3d2e1a;padding:14px 24px;text-align:center;">
        <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;">Ankshaastra order notification system</p>
      </div>
    </div>
  </body>
  </html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: OrderEmailRequest = await req.json();
    const { to, customerName, orderNumber, items, subtotal, shipping, total, paymentMethod, shippingAddress } = body;

    const paymentLabel = paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Payment' : 'Credit / Debit Card';

    const itemRows = items.map(item => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; font-family: 'Lato', sans-serif; color: #3d2e1a; font-size: 14px;">
          ${item.product_name}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; text-align: center; font-family: 'Lato', sans-serif; color: #6b5a47; font-size: 14px;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; text-align: right; font-family: 'Lato', sans-serif; color: #3d2e1a; font-size: 14px; font-weight: 600;">
          ₹${item.total.toLocaleString('en-IN')}
        </td>
      </tr>
    `).join('');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Lato', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #faf8f5;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #b8860b, #cd9b1d); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
            🙏 Ankshaastra
          </h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Sacred Crystals & Spiritual Treasures</p>
        </div>

        <!-- Greeting -->
        <div style="padding: 32px 24px 16px;">
          <h2 style="margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; color: #3d2e1a; font-size: 22px;">
            Thank You, ${customerName}!
          </h2>
          <p style="margin: 0; color: #6b5a47; font-size: 15px; line-height: 1.6;">
            Your order has been placed successfully. Here are your order details:
          </p>
        </div>

        <!-- Order Number Badge -->
        <div style="padding: 0 24px 24px;">
          <div style="background: linear-gradient(135deg, #f5f0e8, #ede4d4); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #d4c5a9;">
            <p style="margin: 0 0 4px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
            <p style="margin: 0; color: #b8860b; font-size: 22px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif;">${orderNumber}</p>
          </div>
        </div>

        <!-- Items Table -->
        <div style="padding: 0 24px 24px;">
          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <thead>
              <tr style="background: #3d2e1a;">
                <th style="padding: 12px 16px; text-align: left; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                <th style="padding: 12px 16px; text-align: center; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                <th style="padding: 12px 16px; text-align: right; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div style="padding: 0 24px 24px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0ebe4;">
              <span style="color: #6b5a47; font-size: 14px;">Subtotal</span>
              <span style="color: #3d2e1a; font-size: 14px;">₹${subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0ebe4;">
              <span style="color: #6b5a47; font-size: 14px;">Shipping</span>
              <span style="color: #3d2e1a; font-size: 14px;">${shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px 0 4px;">
              <span style="color: #3d2e1a; font-size: 18px; font-weight: 700;">Total</span>
              <span style="color: #b8860b; font-size: 18px; font-weight: 700;">₹${total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- Payment & Shipping -->
        <div style="padding: 0 24px 24px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Payment Method</p>
            <p style="margin: 0 0 16px; color: #3d2e1a; font-size: 14px; font-weight: 600;">${paymentLabel}</p>
            <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</p>
            <p style="margin: 0; color: #3d2e1a; font-size: 14px; line-height: 1.5;">${shippingAddress}</p>
          </div>
        </div>

        <!-- Delivery Note -->
        <div style="padding: 0 24px 24px;">
          <div style="background: linear-gradient(135deg, #f0f7f0, #e8f5e8); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #c5e1c5;">
            <p style="margin: 0; color: #2d5a2d; font-size: 14px;">
              📦 Estimated delivery: <strong>5-7 business days</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #3d2e1a; padding: 24px; text-align: center;">
          <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 14px;">
            Questions? Contact us on WhatsApp
          </p>
          <a href="https://wa.me/919667305577" style="color: #cd9b1d; font-size: 14px; text-decoration: none;">
            +91 96673 05577
          </a>
          <p style="margin: 16px 0 0; color: rgba(255,255,255,0.5); font-size: 12px;">
            © ${new Date().getFullYear()} Ankshaastra. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    // FROM_EMAIL must be on a domain verified in Resend (Domains tab) once you go live,
    // otherwise Resend's shared onboarding@resend.dev sender will not reliably deliver
    // to real customer inboxes. Falls back to the Resend sandbox sender if not set.
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'Ankshaastra <onboarding@resend.dev>';

    // The address that should receive a copy of every order notification -
    // set this to your Zoho order-notifications mailbox address.
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject: `Order Confirmed - ${orderNumber} | Ankshaastra`,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    // Send a separate internal notification copy to the admin/Zoho order mailbox.
    // This is best-effort - if it fails we still return success for the customer email,
    // but we log it clearly so it's easy to spot in Supabase function logs.
    let adminEmailResult: { sent: boolean; error?: string } = { sent: false };
    if (ADMIN_EMAIL) {
      const adminHtml = buildAdminNotificationHtml({
        orderNumber,
        customerName,
        customerEmail: to,
        items,
        subtotal,
        shipping,
        total,
        paymentMethod,
        shippingAddress,
      });

      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          subject: `🛍️ New Order - ${orderNumber} | ₹${total.toLocaleString('en-IN')}`,
          html: adminHtml,
        }),
      });

      if (adminRes.ok) {
        adminEmailResult = { sent: true };
      } else {
        const adminData = await adminRes.json().catch(() => ({}));
        console.error('Admin notification email failed:', adminData);
        adminEmailResult = { sent: false, error: JSON.stringify(adminData) };
      }
    } else {
      console.warn('ADMIN_EMAIL secret not set - skipping admin/Zoho order notification email');
    }

    return new Response(JSON.stringify({ success: true, data, adminEmail: adminEmailResult }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Email send error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
