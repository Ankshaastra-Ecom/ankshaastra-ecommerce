import React from 'react';
import { Ticket, Copy, Calendar, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Vouchers: React.FC = () => {
  const { data: vouchers, isLoading } = useQuery({
    queryKey: ['active-vouchers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast({ title: '📋 Copied!', description: `Code "${code}" copied to clipboard` });
  };

  const getDiscountText = (v: any) => {
    if (v.discount_type === 'percentage') {
      return `${v.discount_value}% OFF`;
    }
    return `₹${Number(v.discount_value).toLocaleString()} OFF`;
  };

  const isExpiringSoon = (date: string | null) => {
    if (!date) return false;
    const days = (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days < 14 && days > 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Vouchers & Coupons — Ankshaastra"
        description="Discover the latest discount vouchers and coupon codes for spiritual products at Ankshaastra."
        canonical="/vouchers"
      />
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Ticket className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Vouchers & Coupons</h1>
            <p className="text-muted-foreground">Save more on your spiritual journey with our exclusive offers</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading offers...</div>
          ) : !vouchers || vouchers.length === 0 ? (
            <Card className="p-12 text-center">
              <Tag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No active vouchers right now. Check back soon!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {vouchers.map((v) => (
                <Card
                  key={v.id}
                  className="relative overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary transition-all group"
                >
                  {/* Left perforation */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-dashed border-primary/30" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-background border-2 border-dashed border-primary/30" />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge className="bg-gradient-to-r from-primary to-gold text-primary-foreground border-0 mb-2">
                          {getDiscountText(v)}
                        </Badge>
                        <h3 className="font-display font-bold text-lg leading-tight">
                          {v.description || 'Special Offer'}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground mb-4">
                      {Number(v.min_order_amount) > 0 && (
                        <p>• Min order: ₹{Number(v.min_order_amount).toLocaleString()}</p>
                      )}
                      {v.max_discount && (
                        <p>• Max discount: ₹{Number(v.max_discount).toLocaleString()}</p>
                      )}
                      {v.valid_until && (
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Valid till: {new Date(v.valid_until).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {isExpiringSoon(v.valid_until) && (
                            <span className="text-destructive font-semibold ml-1">• Expiring Soon!</span>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-muted/40 rounded-md p-2 border border-dashed border-primary/40">
                      <code className="flex-1 font-mono font-bold text-primary text-sm">{v.code}</code>
                      <Button size="sm" variant="ghost" onClick={() => copyCode(v.code)}>
                        <Copy className="w-3 h-3 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Apply your code at checkout</p>
            <Button asChild size="lg" className="btn-gold">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vouchers;
