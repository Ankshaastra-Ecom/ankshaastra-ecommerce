import React from 'react';
import { Gift, Copy, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const generateCode = () => `ANK${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

const ReferralProgram: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: referral } = useQuery({
    queryKey: ['my-referral', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('id, referral_code')
        .eq('referrer_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: referralStats } = useQuery({
    queryKey: ['my-referral-stats', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('id, referred_user_id, reward_claimed')
        .eq('referrer_id', user!.id);
      if (error) throw error;
      const successful = data.filter((r) => !!r.referred_user_id).length;
      const rewards = data.filter((r) => r.reward_claimed).length;
      return { total: data.length, successful, rewards };
    },
    enabled: !!user,
  });

  const createReferral = useMutation({
    mutationFn: async () => {
      const code = generateCode();
      const { error } = await supabase.from('referrals').insert({
        referrer_id: user!.id,
        referral_code: code,
      });
      if (error) throw error;
      return code;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-referral', user?.id] });
      toast({ title: 'Referral code created!' });
    },
  });

  if (!user) return null;

  const refCode = referral?.referral_code;
  const referralLink = refCode ? `${window.location.origin}/auth?ref=${refCode}` : '';

  const copyLink = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    toast({ title: 'Referral link copied' });
  };

  const shareWhatsApp = () => {
    if (!referralLink) return;
    const message = encodeURIComponent(`Join Ankshaastra with my referral link and get special benefits: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="card-spiritual p-5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" /> Referral Program
          </h3>
          <p className="text-sm text-muted-foreground">Invite friends and earn rewards on successful referrals.</p>
        </div>
      </div>

      {!refCode ? (
        <Button onClick={() => createReferral.mutate()} disabled={createReferral.isPending}>
          Create Referral Link
        </Button>
      ) : (
        <>
          <div className="bg-muted/40 rounded-md p-3 mb-3">
            <p className="text-xs text-muted-foreground mb-1">Your referral code</p>
            <p className="font-semibold text-primary">{refCode}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={copyLink}>
              <Copy className="w-4 h-4 mr-1" /> Copy Link
            </Button>
            <Button variant="outline" size="sm" onClick={shareWhatsApp}>
              <Share2 className="w-4 h-4 mr-1" /> Share via WhatsApp
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/30 rounded-md p-2">
              <p className="text-lg font-bold">{referralStats?.total ?? 0}</p>
              <p className="text-xs text-muted-foreground">Links</p>
            </div>
            <div className="bg-muted/30 rounded-md p-2">
              <p className="text-lg font-bold">{referralStats?.successful ?? 0}</p>
              <p className="text-xs text-muted-foreground">Signups</p>
            </div>
            <div className="bg-muted/30 rounded-md p-2">
              <p className="text-lg font-bold">{referralStats?.rewards ?? 0}</p>
              <p className="text-xs text-muted-foreground">Rewards</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReferralProgram;
