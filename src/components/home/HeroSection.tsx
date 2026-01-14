import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-mandala opacity-30" />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(270 35% 15% / 0.95) 0%, hsl(270 40% 10% / 0.9) 50%, hsl(38 70% 25% / 0.85) 100%)'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gold/20 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-amethyst/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 right-1/4 w-16 h-16 rounded-full bg-gold/10 blur-lg animate-float" style={{ animationDelay: '4s' }} />

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Authentic & Energized Products</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-cream leading-tight mb-6">
              Awaken Your
              <span className="block text-gradient-gold">Spiritual Journey</span>
            </h1>

            <p className="text-lg md:text-xl text-cream/80 max-w-xl mx-auto lg:mx-0 mb-8 font-light">
              Discover authentic Rudraksha beads, healing crystals, sacred gemstones, and divine yantras. Each product is blessed and energized with Vedic mantras for your spiritual growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="btn-gold text-base px-8 py-6 rounded-full">
                <Link to="/shop">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10 text-base px-8 py-6 rounded-full">
                <Link to="/calculators/rudraksha">
                  Find Your Rudraksha
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">10K+</p>
                <p className="text-cream/60 text-sm">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">100%</p>
                <p className="text-cream/60 text-sm">Authentic Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">500+</p>
                <p className="text-cream/60 text-sm">Spiritual Products</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-amethyst/30 blur-3xl animate-glow" />
              
              {/* Main Circle */}
              <div className="relative w-full h-full rounded-full border-2 border-gold/30 overflow-hidden">
                <div className="absolute inset-4 rounded-full border border-gold/20" />
                <div className="absolute inset-8 rounded-full border border-gold/10" />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-9xl text-gold/80">ॐ</span>
                    <p className="text-cream/60 font-spiritual text-lg mt-2">Shanti • Peace • Harmony</p>
                  </div>
                </div>
              </div>

              {/* Floating Product Cards */}
              <div className="absolute -left-10 top-1/4 p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-medium animate-float">
                <p className="text-xs text-muted-foreground">Best Seller</p>
                <p className="font-display font-semibold text-sm">5 Mukhi Rudraksha</p>
                <p className="text-primary font-bold">₹800</p>
              </div>

              <div className="absolute -right-6 bottom-1/3 p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-medium animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-xs text-muted-foreground">Popular</p>
                <p className="font-display font-semibold text-sm">7 Chakra Bracelet</p>
                <p className="text-primary font-bold">₹1,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(30 30% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
