import React, { useEffect, useState } from 'react';
import { Gift, Star, TrendingUp, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface PointEntry {
  id: string;
  points: number;
  type: string;
  description: string | null;
  created_at: string;
}

const tierConfig = [
  { name: 'Bronze', min: 0, color: 'bg-amber-700', icon: '🥉' },
  { name: 'Silver', min: 500, color: 'bg-gray-400', icon: '🥈' },
  { name: 'Gold', min: 2000, color: 'bg-gold', icon: '🥇' },
  { name: 'Platinum', min: 5000, color: 'bg-primary', icon: '💎' },
];

const LoyaltyPoints: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<PointEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPoints = history.reduce((sum, e) => sum + e.points, 0);
  const currentTier = [...tierConfig].reverse().find(t => totalPoints >= t.min) || tierConfig[0];
  const nextTier = tierConfig.find(t => t.min > totalPoints);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      setHistory((data as PointEntry[]) || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">Loading points...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{totalPoints}</span>
                <span className="text-sm text-muted-foreground">points</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">≈ ₹{Math.floor(totalPoints / 10)} value</p>
            </div>
            <div className="text-center">
              <span className="text-3xl">{currentTier.icon}</span>
              <p className="text-xs font-bold text-foreground mt-1">{currentTier.name} Tier</p>
              {nextTier && (
                <p className="text-[10px] text-muted-foreground">{nextTier.min - totalPoints} pts to {nextTier.name}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* How to Earn */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            How to Earn Points
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Coins, label: 'Every ₹100 spent', points: '10 pts', desc: 'On all orders' },
            { icon: Star, label: 'Write a review', points: '25 pts', desc: 'With photo: 50 pts' },
            { icon: Gift, label: 'Refer a friend', points: '100 pts', desc: 'When they order' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-[10px]">{item.points}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Points History</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No points yet. Start shopping to earn rewards! 🎁
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{entry.description || entry.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${entry.points > 0 ? 'text-sage' : 'text-destructive'}`}>
                    {entry.points > 0 ? '+' : ''}{entry.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyPoints;
