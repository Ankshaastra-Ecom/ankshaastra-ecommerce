/// <reference types="vite/client" />

// Razorpay Checkout is loaded globally via <script src="https://checkout.razorpay.com/v1/checkout.js">
// in index.html, so it isn't an npm package - declare just enough of its shape to use it safely.
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
