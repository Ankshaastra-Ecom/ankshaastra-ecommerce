
-- Fix permissive INSERT policy on order_items
DROP POLICY "Users can create order items" ON public.order_items;

CREATE POLICY "Users can create order items" ON public.order_items 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  )
);
