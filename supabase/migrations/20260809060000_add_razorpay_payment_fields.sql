-- Razorpay payment gateway integration fields on orders
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_signature TEXT,
  ADD COLUMN IF NOT EXISTS payment_error TEXT,
  ADD COLUMN IF NOT EXISTS confirmation_email_sent BOOLEAN NOT NULL DEFAULT false;

-- Fast lookup when the Razorpay webhook arrives (it only gives us the razorpay order id)
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id ON public.orders(razorpay_payment_id);

-- Allow the edge functions (using the service role key) to update payment fields.
-- Service role already bypasses RLS, so no policy change is strictly required,
-- but we keep this comment as documentation of intent.
