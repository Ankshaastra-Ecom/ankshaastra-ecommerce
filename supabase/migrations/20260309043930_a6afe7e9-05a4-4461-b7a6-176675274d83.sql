-- Allow referred users to claim a referral code exactly once
DROP POLICY IF EXISTS "System can update referrals" ON public.referrals;

CREATE POLICY "Referred users can claim open referral"
ON public.referrals
FOR UPDATE
USING (referred_user_id IS NULL)
WITH CHECK (referred_user_id = auth.uid());

CREATE POLICY "Referrers can update own referrals"
ON public.referrals
FOR UPDATE
USING (auth.uid() = referrer_id)
WITH CHECK (auth.uid() = referrer_id);