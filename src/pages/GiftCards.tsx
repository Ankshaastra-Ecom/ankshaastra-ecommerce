import React, { useState } from 'react';
import { Gift, Sparkles, Mail, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000];

const generateGiftCode = () =>
  `GIFT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase()}`;

const GiftCards: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: myGiftCards } = useQuery({
    queryKey: ['my-gift-cards', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .or(`purchaser_id.eq.${user!.id},recipient_email.eq.${user!.email}`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  const handlePurchase = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (!recipientName || !recipientEmail || !senderName || !finalAmount || finalAmount < 100) {
      toast({ title: 'Please fill all fields', description: 'Minimum amount is ₹100', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const code = generateGiftCode();
    const { error } = await supabase.from('gift_cards').insert({
      code,
      amount: finalAmount,
      balance: finalAmount,
      purchaser_id: user.id,
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      sender_name: senderName,
      message: message || null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: 'Failed to create gift card', description: error.message, variant: 'destructive' });
      return;
    }

    toast({
      title: '🎁 Gift Card Created!',
      description: `Code: ${code} — Worth ₹${finalAmount.toLocaleString()}`,
    });
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setCustomAmount('');
    queryClient.invalidateQueries({ queryKey: ['my-gift-cards'] });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Gift Cards — Ankshaastra"
        description="Send the gift of spirituality. Buy and send digital gift cards instantly."
        canonical="/gift-cards"
      />
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Gift Cards</h1>
            <p className="text-muted-foreground">Send the gift of spirituality to your loved ones</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Purchase Form */}
            <Card className="p-6">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Buy a Gift Card
              </h2>

              <div className="space-y-5">
                <div>
                  <Label className="mb-2 block">Choose Amount</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-3 rounded-md border-2 text-sm font-semibold transition ${
                          !customAmount && amount === amt
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Or enter custom amount (min ₹100)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min={100}
                  />
                </div>

                <div>
                  <Label htmlFor="sender">Your Name</Label>
                  <Input id="sender" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="John Doe" />
                </div>

                <div>
                  <Label htmlFor="recName">Recipient Name</Label>
                  <Input id="recName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jane Doe" />
                </div>

                <div>
                  <Label htmlFor="recEmail">Recipient Email</Label>
                  <Input
                    id="recEmail"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="msg">Personal Message (optional)</Label>
                  <Textarea
                    id="msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Wishing you peace and prosperity..."
                    rows={3}
                  />
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-lg p-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{(finalAmount || 0).toLocaleString()}</span>
                  </div>
                </div>

                <Button onClick={handlePurchase} disabled={submitting} className="w-full btn-gold py-6">
                  <Gift className="w-4 h-4 mr-2" />
                  {submitting ? 'Creating...' : user ? 'Create Gift Card' : 'Sign In to Continue'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Gift cards are valid for 1 year. Recipient receives a unique code via email.
                </p>
              </div>
            </Card>

            {/* My Gift Cards */}
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-gold/5">
                <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" /> Why Gift Cards?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✨ Instant digital delivery</li>
                  <li>🎁 Perfect for birthdays, festivals & special occasions</li>
                  <li>💝 Recipient chooses what they love</li>
                  <li>📅 Valid for 1 full year</li>
                  <li>🔄 Can be used in multiple orders till balance lasts</li>
                </ul>
              </Card>

              {user && myGiftCards && myGiftCards.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" /> My Gift Cards
                  </h3>
                  <div className="space-y-3">
                    {myGiftCards.map((gc) => (
                      <div key={gc.id} className="border border-border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-mono text-sm font-bold text-primary">{gc.code}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted capitalize">{gc.status}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          To: {gc.recipient_name} ({gc.recipient_email})
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">
                            Balance: <strong className="text-primary">₹{Number(gc.balance).toLocaleString()}</strong>
                          </span>
                          <span className="text-xs text-muted-foreground">of ₹{Number(gc.amount).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GiftCards;
