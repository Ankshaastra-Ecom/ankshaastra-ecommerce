-- Orders previously only recorded discount as free text inside "notes"
-- (e.g. "Coupon: CODE (10% off, -₹50)"), so nothing downstream (invoice
-- generation after Razorpay payment) could read the actual discount amount.
-- This adds a proper numeric column so GST/invoice calculations can use it.
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS discount NUMERIC NOT NULL DEFAULT 0;
