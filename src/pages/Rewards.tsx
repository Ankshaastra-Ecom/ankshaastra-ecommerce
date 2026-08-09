import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoyaltyPoints from '@/components/account/LoyaltyPoints';
import ReferralProgram from '@/components/account/ReferralProgram';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Rewards: React.FC = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="My Rewards — Loyalty Points" description="View your loyalty points balance, tier status, and rewards history at Ankshaastra." canonical="/rewards" />
      <Header />
      <main className="flex-1 py-8">
        <div className="container-custom max-w-2xl">
          <h1 className="text-3xl font-display font-bold text-foreground mb-6 text-center">My Rewards</h1>
          {isLoading ? null : !user ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Sign in to view your loyalty points and rewards.</p>
              <Button asChild><Link to="/auth">Sign In</Link></Button>
            </div>
          ) : (
            <>
              <LoyaltyPoints />
              <ReferralProgram />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
