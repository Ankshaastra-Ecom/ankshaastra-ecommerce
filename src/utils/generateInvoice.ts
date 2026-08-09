interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface InvoiceData {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  couponCode?: string;
  total: number;
  paymentMethod: string;
}

// GST rates for spiritual/religious items (typically 5% or exempt)
const GST_RATE = 0.05; // 5% GST

export const calculateGST = (amount: number) => {
  const gstAmount = amount * GST_RATE;
  const baseAmount = amount - gstAmount;
  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    cgst: Math.round((gstAmount / 2) * 100) / 100, // Central GST
    sgst: Math.round((gstAmount / 2) * 100) / 100, // State GST
    totalGst: Math.round(gstAmount * 100) / 100,
  };
};

export const generateInvoiceHTML = (data: InvoiceData): string => {
  const gstBreakdown = calculateGST(data.subtotal);
  const invoiceDate = new Date(data.orderDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const itemsHTML = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">₹${item.total.toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Tax Invoice - ${data.orderNumber}</title>
      <style>
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .invoice-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 3px solid #8B5CF6; padding-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #8B5CF6; }
        .logo span { color: #D4AF37; }
        .invoice-title { text-align: right; }
        .invoice-title h1 { margin: 0; color: #333; font-size: 24px; }
        .invoice-title p { margin: 5px 0; color: #666; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
        .detail-section h3 { margin: 0 0 10px; color: #8B5CF6; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .detail-section p { margin: 4px 0; color: #333; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #8B5CF6; color: white; padding: 12px; text-align: left; font-size: 14px; }
        th:nth-child(2), th:nth-child(3), th:nth-child(4) { text-align: center; }
        th:last-child { text-align: right; }
        .totals { display: flex; justify-content: flex-end; }
        .totals-table { width: 300px; }
        .totals-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
        .totals-row.total { border-top: 2px solid #8B5CF6; border-bottom: none; font-weight: bold; font-size: 18px; color: #8B5CF6; padding-top: 12px; }
        .gst-box { background: #f8f4ff; border: 1px solid #8B5CF6; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
        .gst-box h4 { margin: 0 0 10px; color: #8B5CF6; font-size: 14px; }
        .gst-row { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin: 4px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #666; font-size: 12px; }
        .footer p { margin: 4px 0; }
        .stamp { text-align: right; margin-top: 30px; }
        .stamp-box { display: inline-block; border: 2px solid #8B5CF6; padding: 10px 20px; border-radius: 4px; color: #8B5CF6; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div>
            <div class="logo">Anksha<span>astra</span></div>
            <p style="margin: 5px 0 0; color: #666; font-size: 12px;">Authentic Spiritual Products</p>
          </div>
          <div class="invoice-title">
            <h1>TAX INVOICE</h1>
            <p><strong>Invoice No:</strong> INV-${data.orderNumber}</p>
            <p><strong>Date:</strong> ${invoiceDate}</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-section">
            <h3>Bill To</h3>
            <p><strong>${data.customerName}</strong></p>
            <p>${data.shippingAddress}</p>
            <p>Phone: ${data.customerPhone}</p>
            <p>Email: ${data.customerEmail}</p>
          </div>
          <div class="detail-section">
            <h3>Sold By</h3>
            <p><strong>Ankshaastra Enterprises</strong></p>
            <p>Sector 6-C, Block-C7</p>
            <p>Noida, Uttar Pradesh - 201301</p>
            <p>GSTIN: 09XXXXX1234X1ZX</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="gst-box">
          <h4>GST Breakup (5%)</h4>
          <div class="gst-row">
            <span>Taxable Amount</span>
            <span>₹${gstBreakdown.baseAmount.toLocaleString('en-IN')}</span>
          </div>
          <div class="gst-row">
            <span>CGST @ 2.5%</span>
            <span>₹${gstBreakdown.cgst.toLocaleString('en-IN')}</span>
          </div>
          <div class="gst-row">
            <span>SGST @ 2.5%</span>
            <span>₹${gstBreakdown.sgst.toLocaleString('en-IN')}</span>
          </div>
          <div class="gst-row" style="font-weight: bold; border-top: 1px solid #8B5CF6; padding-top: 8px; margin-top: 8px;">
            <span>Total GST</span>
            <span>₹${gstBreakdown.totalGst.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="totals">
          <div class="totals-table">
            <div class="totals-row">
              <span>Subtotal</span>
              <span>₹${data.subtotal.toLocaleString('en-IN')}</span>
            </div>
            ${data.discount ? `
            <div class="totals-row">
              <span>Discount ${data.couponCode ? `(${data.couponCode})` : ''}</span>
              <span style="color: #22c55e;">-₹${data.discount.toLocaleString('en-IN')}</span>
            </div>
            ` : ''}
            <div class="totals-row">
              <span>Shipping</span>
              <span>${data.shipping === 0 ? 'FREE' : `₹${data.shipping}`}</span>
            </div>
            <div class="totals-row total">
              <span>Grand Total</span>
              <span>₹${data.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div class="stamp">
          <div class="stamp-box">
            ${data.paymentMethod === 'cod' ? 'CASH ON DELIVERY' : 'PAID'}
          </div>
        </div>

        <div class="footer">
          <p><strong>Thank you for shopping with Ankshaastra!</strong></p>
          <p>For any queries, contact us at support@ankshaastra.com | +91 96673 05577</p>
          <p style="margin-top: 10px; font-size: 11px;">This is a computer generated invoice and does not require a signature.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const downloadInvoice = (data: InvoiceData) => {
  const invoiceHTML = generateInvoiceHTML(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the invoice');
    return;
  }

  printWindow.document.write(invoiceHTML);
  printWindow.document.close();

  // Wait for content to load then trigger print
  printWindow.onload = () => {
    printWindow.print();
  };
};

export default downloadInvoice;
