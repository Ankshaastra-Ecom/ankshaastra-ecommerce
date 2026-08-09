
-- Create loyalty_points table to track user points
CREATE TABLE public.loyalty_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL, -- 'earned', 'redeemed', 'bonus'
  description TEXT,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;

-- Users can view own points
CREATE POLICY "Users can view own points"
ON public.loyalty_points
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert own points (for earning)
CREATE POLICY "Users can earn points"
ON public.loyalty_points
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all points
CREATE POLICY "Admins can manage points"
ON public.loyalty_points
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Index for fast lookups
CREATE INDEX idx_loyalty_points_user_id ON public.loyalty_points(user_id);
