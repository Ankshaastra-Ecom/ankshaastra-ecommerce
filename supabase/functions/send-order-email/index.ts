// import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// interface OrderItem {
//   product_name: string;
//   product_price: number;
//   quantity: number;
//   total: number;
// }

// interface OrderEmailRequest {
//   to: string;
//   customerName: string;
//   orderNumber: string;
//   items: OrderItem[];
//   subtotal: number;
//   shipping: number;
//   total: number;
//   paymentMethod: string;
//   shippingAddress: string;
// }

// Deno.serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { headers: corsHeaders });
//   }

//   const ZOHO_SMTP_EMAIL = Deno.env.get('ZOHO_SMTP_EMAIL');
//   const ZOHO_SMTP_PASSWORD = Deno.env.get('ZOHO_SMTP_PASSWORD');
//   const ZOHO_SMTP_HOST = Deno.env.get('ZOHO_SMTP_HOST') || 'smtp.zoho.in';
//   const ZOHO_FROM_EMAIL = Deno.env.get('ZOHO_FROM_EMAIL') || ZOHO_SMTP_EMAIL;
//   const ZOHO_SMTP_PORT = Number(Deno.env.get('ZOHO_SMTP_PORT')) || 465;
//   const ZOHO_SMTP_TLS = ZOHO_SMTP_PORT === 465;

//   if (!ZOHO_SMTP_EMAIL || !ZOHO_SMTP_PASSWORD) {
//     return new Response(JSON.stringify({ error: 'ZOHO_SMTP_EMAIL / ZOHO_SMTP_PASSWORD not configured' }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     const body: OrderEmailRequest = await req.json();
//     const { to, customerName, orderNumber, items, subtotal, shipping, total, paymentMethod, shippingAddress } = body;

//     const paymentLabel = paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Payment' : 'Credit / Debit Card';

//     const itemRows = items.map(item => `
//       <tr>
//         <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; font-family: 'Lato', sans-serif; color: #3d2e1a; font-size: 14px;">
//           ${item.product_name}
//         </td>
//         <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; text-align: center; font-family: 'Lato', sans-serif; color: #6b5a47; font-size: 14px;">
//           ${item.quantity}
//         </td>
//         <td style="padding: 12px 16px; border-bottom: 1px solid #f0ebe4; text-align: right; font-family: 'Lato', sans-serif; color: #3d2e1a; font-size: 14px; font-weight: 600;">
//           ₹${item.total.toLocaleString('en-IN')}
//         </td>
//       </tr>
//     `).join('');

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     </head>
//     <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Lato', Arial, sans-serif;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: #faf8f5;">
//         <div style="background: linear-gradient(135deg, #b8860b, #cd9b1d); padding: 32px 24px; text-align: center;">
//           <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
//             🙏 Ankshaastra
//           </h1>
//           <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Sacred Crystals & Spiritual Treasures</p>
//         </div>

//         <div style="padding: 32px 24px 16px;">
//           <h2 style="margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; color: #3d2e1a; font-size: 22px;">
//             Thank You, ${customerName}!
//           </h2>
//           <p style="margin: 0; color: #6b5a47; font-size: 15px; line-height: 1.6;">
//             Your order has been placed successfully. Here are your order details:
//           </p>
//         </div>

//         <div style="padding: 0 24px 24px;">
//           <div style="background: linear-gradient(135deg, #f5f0e8, #ede4d4); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #d4c5a9;">
//             <p style="margin: 0 0 4px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
//             <p style="margin: 0; color: #b8860b; font-size: 22px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif;">${orderNumber}</p>
//           </div>
//         </div>

//         <div style="padding: 0 24px 24px;">
//           <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
//             <thead>
//               <tr style="background: #3d2e1a;">
//                 <th style="padding: 12px 16px; text-align: left; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
//                 <th style="padding: 12px 16px; text-align: center; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
//                 <th style="padding: 12px 16px; text-align: right; color: #ffffff; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${itemRows}
//             </tbody>
//           </table>
//         </div>

//         <div style="padding: 0 24px 24px;">
//           <div style="background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
//             <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0ebe4;">
//               <span style="color: #6b5a47; font-size: 14px;">Subtotal</span>
//               <span style="color: #3d2e1a; font-size: 14px;">₹${subtotal.toLocaleString('en-IN')}</span>
//             </div>
//             <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0ebe4;">
//               <span style="color: #6b5a47; font-size: 14px;">Shipping</span>
//               <span style="color: #3d2e1a; font-size: 14px;">${shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
//             </div>
//             <div style="display: flex; justify-content: space-between; padding: 12px 0 4px;">
//               <span style="color: #3d2e1a; font-size: 18px; font-weight: 700;">Total</span>
//               <span style="color: #b8860b; font-size: 18px; font-weight: 700;">₹${total.toLocaleString('en-IN')}</span>
//             </div>
//           </div>
//         </div>

//         <div style="padding: 0 24px 24px;">
//           <div style="background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
//             <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Payment Method</p>
//             <p style="margin: 0 0 16px; color: #3d2e1a; font-size: 14px; font-weight: 600;">${paymentLabel}</p>
//             <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</p>
//             <p style="margin: 0; color: #3d2e1a; font-size: 14px; line-height: 1.5;">${shippingAddress}</p>
//           </div>
//         </div>

//         <div style="padding: 0 24px 24px;">
//           <div style="background: linear-gradient(135deg, #f0f7f0, #e8f5e8); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #c5e1c5;">
//             <p style="margin: 0; color: #2d5a2d; font-size: 14px;">
//               📦 Estimated delivery: <strong>5-7 business days</strong>
//             </p>
//           </div>
//         </div>

//         <div style="background: #3d2e1a; padding: 24px; text-align: center;">
//           <p style="margin: 0 0 8px; color: rgba(255,255,255,0.9); font-size: 14px;">
//             Questions? Contact us on WhatsApp
//           </p>
//           <a href="https://wa.me/919667305577" style="color: #cd9b1d; font-size: 14px; text-decoration: none;">
//             +91 96673 05577
//           </a>
//           <p style="margin: 16px 0 0; color: rgba(255,255,255,0.5); font-size: 12px;">
//             © ${new Date().getFullYear()} Ankshaastra. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//     `;

//     const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || ZOHO_SMTP_EMAIL;

//     const client = new SMTPClient({
//       connection: {
//         hostname: ZOHO_SMTP_HOST,
//         port: ZOHO_SMTP_PORT,
//         tls: ZOHO_SMTP_TLS,
//         auth: {
//           username: ZOHO_SMTP_EMAIL,
//           password: ZOHO_SMTP_PASSWORD,
//         },
//       },
//     });

//     let customerEmailError: string | null = null;
//     let adminEmailResult: { sent: boolean; error?: string } = { sent: false };
//     const recipients = ADMIN_EMAIL && ADMIN_EMAIL !== to ? [to, ADMIN_EMAIL] : to;
//     try {
//       await client.send({
//         from: `Ankshaastra <${ZOHO_FROM_EMAIL}>`,
//         to: recipients,
//         subject: `Order Confirmed - ${orderNumber} | Ankshaastra`,
//         html: html,
//       });
//       if (ADMIN_EMAIL) adminEmailResult = { sent: true };
//     } catch (sendErr: unknown) {
//       customerEmailError = sendErr instanceof Error ? sendErr.message : 'Unknown SMTP error';
//       console.error('Customer email send error:', customerEmailError);
//       if (ADMIN_EMAIL) adminEmailResult = { sent: false, error: customerEmailError };
//     }

//     await client.close();

//     if (customerEmailError) {
//       throw new Error(`Customer email failed: ${customerEmailError}`);
//     }

//     return new Response(JSON.stringify({ success: true, adminEmail: adminEmailResult }), {
//       status: 200,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   } catch (error: unknown) {
//     console.error('Email send error:', error);
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return new Response(JSON.stringify({ error: message }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });

import nodemailer from 'npm:nodemailer@6.9.16';
import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib@1.17.1';
import { Buffer } from 'node:buffer';

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
  customerPhone?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPincode?: string;
  orderDate?: string;
}

const GST_STATE_CODES: Record<string, string> = {
  'JAMMU AND KASHMIR': '01', 'HIMACHAL PRADESH': '02', PUNJAB: '03', CHANDIGARH: '04',
  UTTARAKHAND: '05', HARYANA: '06', DELHI: '07', RAJASTHAN: '08', 'UTTAR PRADESH': '09',
  BIHAR: '10', SIKKIM: '11', 'ARUNACHAL PRADESH': '12', NAGALAND: '13', MANIPUR: '14',
  MIZORAM: '15', TRIPURA: '16', MEGHALAYA: '17', ASSAM: '18', 'WEST BENGAL': '19',
  JHARKHAND: '20', ODISHA: '21', CHATTISGARH: '22', 'MADHYA PRADESH': '23', GUJARAT: '24',
  MAHARASHTRA: '27', 'ANDHRA PRADESH': '28', KARNATAKA: '29', GOA: '30', KERALA: '32',
  'TAMIL NADU': '33', PUDUCHERRY: '34', TELANGANA: '36',
};

function getStateCode(stateName?: string): string {
  if (!stateName) return '';
  const code = GST_STATE_CODES[stateName.trim().toUpperCase()];
  return code ? `${code}-${stateName.toUpperCase()}` : stateName.toUpperCase();
}

const GST_RATE = 0.05;

async function buildInvoicePdfBytes(params: {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}): Promise<Uint8Array> {
  const { orderNumber, orderDate, customerName, customerPhone, shippingCity, shippingState, shippingPincode, items, subtotal, shipping, total } = params;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 40;
  const pageWidth = 595.28;
  let y = 800;

  const drawText = (text: string, x: number, yPos: number, size = 10, useBold = false, color = rgb(0.13, 0.13, 0.13)) => {
    page.drawText(text, { x, y: yPos, size, font: useBold ? bold : font, color });
  };

  drawText('TAX INVOICE', marginX, y, 22, true, rgb(0.1, 0.32, 0.55));
  drawText('1', pageWidth - marginX - 10, y + 4, 10, false);
  y -= 30;

  drawText('ANKSHAASTRA OCCULT EXPERTS LLP', marginX, y, 13, true);
  y -= 15;
  drawText('GSTIN 09AAFFE7583B1ZD', marginX, y, 9);
  y -= 13;
  drawText('Registered Address: 5/56 A, Agarwal Marg, Behind Sarsol Police Chowki, Aligarh-202001.', marginX, y, 9);
  y -= 12;
  drawText('Corporate Address: Unit No. O-622, Block-E, Eye of Noida, Sector 140A, Noida-201305', marginX, y, 9);
  y -= 12;
  drawText('Website: Ankshaastra.in', marginX, y, 9);
  y -= 22;

  const invoiceDateFormatted = new Date(orderDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  drawText('Invoice #', marginX, y, 9, true);
  drawText('Invoice Date', 250, y, 9, true);
  drawText('Due Date', 420, y, 9, true);
  y -= 14;
  drawText(orderNumber, marginX, y, 10);
  drawText(invoiceDateFormatted, 250, y, 10);
  drawText(invoiceDateFormatted, 420, y, 10);
  y -= 24;

  drawText('Customer Details', marginX, y, 9, true);
  drawText('Billing Address', 300, y, 9, true);
  y -= 14;
  drawText(`Purchased By ${customerName}`, marginX, y, 10);
  drawText(`City: ${shippingCity}, State: ${shippingState}`, 300, y, 9);
  y -= 13;
  drawText(`Phone ${customerPhone}`, marginX, y, 10);
  drawText(`Pincode: ${shippingPincode}`, 300, y, 9);
  y -= 13;
  drawText(`Place of Supply: ${getStateCode(shippingState)}`, marginX, y, 9);
  y -= 24;

  const colX = { idx: marginX, item: marginX + 20, rate: 300, qty: 360, taxable: 400, tax: 460, amount: 520 };
  drawText('#', colX.idx, y, 9, true);
  drawText('Item', colX.item, y, 9, true);
  drawText('Rate', colX.rate, y, 9, true);
  drawText('Qty', colX.qty, y, 9, true);
  drawText('Taxable', colX.taxable, y, 9, true);
  drawText('Tax', colX.tax, y, 9, true);
  drawText('Amount', colX.amount, y, 9, true);
  y -= 6;
  page.drawLine({ start: { x: marginX, y }, end: { x: pageWidth - marginX, y }, thickness: 0.5, color: rgb(0.7, 0.7, 0.7) });
  y -= 14;

  let taxableTotal = 0;
  let taxTotal = 0;

  items.forEach((item, i) => {
    if (y < 120) return;
    const lineTotal = item.total;
    const base = Math.round((lineTotal / (1 + GST_RATE)) * 100) / 100;
    const tax = Math.round((lineTotal - base) * 100) / 100;
    taxableTotal += base;
    taxTotal += tax;

    drawText(`${i + 1}`, colX.idx, y, 9);
    drawText(item.product_name.slice(0, 32), colX.item, y, 9);
    drawText(`₹${(base / item.quantity).toFixed(2)}`, colX.rate, y, 9);
    drawText(`${item.quantity}`, colX.qty, y, 9);
    drawText(`₹${base.toFixed(2)}`, colX.taxable, y, 9);
    drawText(`₹${tax.toFixed(2)} (${(GST_RATE * 100).toFixed(0)}%)`, colX.tax, y, 8);
    drawText(`₹${lineTotal.toFixed(2)}`, colX.amount, y, 9);
    y -= 16;
  });

  y -= 8;
  page.drawLine({ start: { x: marginX, y }, end: { x: pageWidth - marginX, y }, thickness: 0.5, color: rgb(0.7, 0.7, 0.7) });
  y -= 20;

  drawText('Taxable Amount', 380, y, 9);
  drawText(`₹${taxableTotal.toFixed(2)}`, 520, y, 9);
  y -= 14;
  drawText(`CGST @ ${(GST_RATE * 50).toFixed(1)}%`, 380, y, 9);
  drawText(`₹${(taxTotal / 2).toFixed(2)}`, 520, y, 9);
  y -= 14;
  drawText(`SGST @ ${(GST_RATE * 50).toFixed(1)}%`, 380, y, 9);
  drawText(`₹${(taxTotal / 2).toFixed(2)}`, 520, y, 9);
  y -= 14;
  drawText('Shipping', 380, y, 9);
  drawText(shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`, 520, y, 9);
  y -= 16;
  drawText('Total', 380, y, 11, true);
  drawText(`₹${total.toFixed(2)}`, 520, y, 11, true);
  y -= 30;

  drawText(`Total amount (in words): INR ${total.toLocaleString('en-IN')} Only.`, marginX, y, 9);
  y -= 30;

  drawText('Bank Details', marginX, y, 9, true);
  y -= 14;
  drawText('Bank Name: Axis Bank', marginX, y, 9);
  y -= 12;
  drawText('Account Holder Name: ANKSHAASTRA OCCULT EXPERTS LLP', marginX, y, 9);
  y -= 12;
  drawText('Account #: 925020055368236', marginX, y, 9);
  y -= 12;
  drawText('IFSC Code: UTIB0001837', marginX, y, 9);
  y -= 12;
  drawText('Branch: Agra Road', marginX, y, 9);
  y -= 30;

  drawText('Thank you for choosing Ankshaastra Occult Experts LLP.', marginX, y, 9, true);
  y -= 20;
  drawText('This is a computer generated invoice electronically valid without a physical signature or company seal.', marginX, y, 8, false, rgb(0.4, 0.4, 0.4));
  y -= 11;
  drawText('Payment once made is non-refundable and non-transferable unless otherwise stated in writing.', marginX, y, 8, false, rgb(0.4, 0.4, 0.4));
  y -= 11;
  drawText('All applicable taxes have been charged in accordance with prevailing GST regulations.', marginX, y, 8, false, rgb(0.4, 0.4, 0.4));

  return pdfDoc.save();
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
        <h2 style="margin:0;color:#fff;font-size:20px;">New Order Received</h2>
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

        <div style="margin-top:16px;background:#f0f7f0;border-radius:8px;padding:14px 16px;text-align:center;border:1px solid #c5e1c5;">
          <p style="margin:0;color:#2d5a2d;font-size:14px;">
            Estimated delivery: <strong>5-7 business days</strong>
          </p>
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

  const ZOHO_SMTP_EMAIL = Deno.env.get('ZOHO_SMTP_EMAIL');
  const ZOHO_SMTP_PASSWORD = Deno.env.get('ZOHO_SMTP_PASSWORD');
  const ZOHO_SMTP_HOST = Deno.env.get('ZOHO_SMTP_HOST') || 'smtp.zoho.in';
  const ZOHO_FROM_EMAIL = Deno.env.get('ZOHO_FROM_EMAIL') || ZOHO_SMTP_EMAIL;

  if (!ZOHO_SMTP_EMAIL || !ZOHO_SMTP_PASSWORD) {
    return new Response(JSON.stringify({ error: 'ZOHO_SMTP_EMAIL / ZOHO_SMTP_PASSWORD not configured' }), {
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
        <div style="background: linear-gradient(135deg, #b8860b, #cd9b1d); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
            Ankshaastra
          </h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Sacred Crystals & Spiritual Treasures</p>
        </div>

        <div style="padding: 32px 24px 16px;">
          <h2 style="margin: 0 0 8px; font-family: 'Playfair Display', Georgia, serif; color: #3d2e1a; font-size: 22px;">
            Thank You, ${customerName}!
          </h2>
          <p style="margin: 0; color: #6b5a47; font-size: 15px; line-height: 1.6;">
            Your order has been placed successfully. Here are your order details:
          </p>
        </div>

        <div style="padding: 0 24px 24px;">
          <div style="background: linear-gradient(135deg, #f5f0e8, #ede4d4); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #d4c5a9;">
            <p style="margin: 0 0 4px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
            <p style="margin: 0; color: #b8860b; font-size: 22px; font-weight: 700; font-family: 'Playfair Display', Georgia, serif;">${orderNumber}</p>
          </div>
        </div>

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

        <div style="padding: 0 24px 24px;">
          <div style="background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Payment Method</p>
            <p style="margin: 0 0 16px; color: #3d2e1a; font-size: 14px; font-weight: 600;">${paymentLabel}</p>
            <p style="margin: 0 0 8px; color: #6b5a47; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</p>
            <p style="margin: 0; color: #3d2e1a; font-size: 14px; line-height: 1.5;">${shippingAddress}</p>
          </div>
        </div>

        <div style="padding: 0 24px 24px;">
          <div style="background: linear-gradient(135deg, #f0f7f0, #e8f5e8); border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #c5e1c5;">
            <p style="margin: 0; color: #2d5a2d; font-size: 14px;">
              Estimated delivery: <strong>5-7 business days</strong>
            </p>
          </div>
        </div>

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

    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || ZOHO_SMTP_EMAIL;

    const transporter = nodemailer.createTransport({
      host: ZOHO_SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: ZOHO_SMTP_EMAIL,
        pass: ZOHO_SMTP_PASSWORD,
      },
      textEncoding: 'base64',
    });

    let invoiceAttachment: { filename: string; content: Buffer; contentType: string } | null = null;
    try {
      const pdfBytes = await buildInvoicePdfBytes({
        orderNumber,
        orderDate: body.orderDate || new Date().toISOString(),
        customerName,
        customerPhone: body.customerPhone || '',
        shippingAddress,
        shippingCity: body.shippingCity || '',
        shippingState: body.shippingState || '',
        shippingPincode: body.shippingPincode || '',
        items,
        subtotal,
        shipping,
        total,
      });
      invoiceAttachment = {
        filename: `Invoice-${orderNumber}.pdf`,
        content: Buffer.from(pdfBytes),
        contentType: 'application/pdf',
      };
    } catch (pdfErr: unknown) {
      console.error('Invoice PDF generation failed:', pdfErr instanceof Error ? pdfErr.message : pdfErr);
    }

    let customerEmailError: string | null = null;
    try {
      await transporter.sendMail({
        from: `Ankshaastra <${ZOHO_FROM_EMAIL}>`,
        to: to,
        subject: `Order Confirmed - ${orderNumber} | Ankshaastra`,
        html: html,
        attachments: invoiceAttachment ? [invoiceAttachment] : [],
      });
    } catch (sendErr: unknown) {
      customerEmailError = sendErr instanceof Error ? sendErr.message : 'Unknown SMTP error';
      console.error('Customer email send error:', customerEmailError);
    }

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

      const adminSubjectLabel = items.length > 1
        ? `${items[0].product_name} +${items.length - 1} more`
        : (items[0]?.product_name || 'Order');

      try {
        await transporter.sendMail({
          from: `Ankshaastra <${ZOHO_FROM_EMAIL}>`,
          to: ADMIN_EMAIL,
          subject: `${adminSubjectLabel} - ${orderNumber}`,
          html: adminHtml,
          attachments: invoiceAttachment ? [invoiceAttachment] : [],
        });
        adminEmailResult = { sent: true };
      } catch (adminSendErr: unknown) {
        const msg = adminSendErr instanceof Error ? adminSendErr.message : 'Unknown SMTP error';
        console.error('Admin notification email failed:', msg);
        adminEmailResult = { sent: false, error: msg };
      }
    } else {
      console.warn('ADMIN_EMAIL / ZOHO_SMTP_EMAIL not set - skipping admin order notification email');
    }

    if (customerEmailError) {
      throw new Error(`Customer email failed: ${customerEmailError}`);
    }

    return new Response(JSON.stringify({ success: true, adminEmail: adminEmailResult }), {
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
