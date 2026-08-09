import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GemstonesComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center">
              <span className="text-5xl">💎</span>
            </div>

            {/* Heading */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Coming Soon</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Gemstones Collection
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're carefully curating an exquisite collection of certified gemstones including 
              Ruby, Pearl, Emerald, Yellow Sapphire, Blue Sapphire, and more. Each gemstone will 
              be lab-certified and energized for astrological purposes.
            </p>

            {/* Notify Form */}
            <div className="max-w-md mx-auto mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to know when we launch!
              </p>
              <div className="flex gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button className="btn-gold">
                  <Bell className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <Button asChild variant="outline">
              <Link to="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GemstonesComingSoon;
