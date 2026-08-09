import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SriYantra3D = lazy(() => import('./SriYantra3D'));

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0814]">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, hsl(270 50% 25% / 0.45) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, hsl(280 45% 22% / 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, hsl(260 40% 18% / 0.5) 0%, transparent 60%),
              radial-gradient(circle at 70% 20%, hsl(38 60% 30% / 0.25) 0%, transparent 45%),
              linear-gradient(180deg, #0a0814 0%, #120f1f 50%, #0d0b18 100%)
            `,
          }}
        />
        {/* Slow-moving nebula blobs */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full blur-[140px] animate-nebula-drift"
          style={{ background: 'hsl(270 50% 30% / 0.25)' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full blur-[120px] animate-nebula-drift"
          style={{ background: 'hsl(280 45% 28% / 0.2)', animationDelay: '-8s' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-1/2 h-1/2 rounded-full blur-[100px] animate-nebula-drift"
          style={{ background: 'hsl(38 55% 35% / 0.15)', animationDelay: '-4s' }}
        />
      </div>

      {/* Subtle star field */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Giant faded ॐ watermark */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[35rem] font-display font-bold text-cream/[0.02] leading-none"
          style={{ fontFamily: 'serif' }}
        >
          ॐ
        </span>
      </div>

      {/* Mandala pattern overlay */}
      <div className="absolute inset-0 z-[1] pattern-mandala opacity-[0.06]" />

      {/* Floating glowing orbs */}
      <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-gold/[0.08] blur-3xl animate-float z-[2]" />
      <div className="absolute bottom-32 right-[15%] w-40 h-40 rounded-full bg-amethyst/[0.07] blur-3xl animate-float z-[2]" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gold/[0.05] blur-2xl animate-float z-[2]" style={{ animationDelay: '4s' }} />

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
              <Button asChild size="lg" variant="outline" className="border-cream text-cream bg-cream/10 hover:bg-cream/20 text-base px-8 py-6 rounded-full backdrop-blur-sm">
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
                <p className="text-2xl md:text-3xl font-display font-bold text-gold">50+</p>
                <p className="text-cream/60 text-sm">Spiritual Products</p>
              </div>
            </div>
          </div>

          {/* Sri Yantra Sacred Geometry — 3D */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Radial Glow */}
              <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-gold/25 via-amethyst/20 to-transparent blur-3xl animate-glow" />

              {/* 3D Sri Yantra Canvas */}
              <div className="absolute inset-0">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gold/40 text-sm">Loading sacred geometry…</div>}>
                  <SriYantra3D />
                </Suspense>
              </div>

              {/* Center ॐ overlay */}
              <div className="relative z-[2] text-center pointer-events-none">
                <span className="block text-6xl text-gold drop-shadow-[0_0_20px_hsl(42_85%_55%/0.6)]">ॐ</span>
                <p className="text-cream/70 font-spiritual text-xs mt-3 tracking-widest">SHANTI • PEACE • HARMONY</p>
              </div>

              {/* Floating Product Cards */}
              <div className="absolute -left-6 top-[18%] p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-medium animate-float z-[3]">
                <p className="text-xs text-muted-foreground">Best Seller</p>
                <p className="font-display font-semibold text-sm">5 Mukhi Rudraksha</p>
                <p className="text-primary font-bold">₹800</p>
              </div>

              <div className="absolute -right-4 bottom-[20%] p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-medium animate-float z-[3]" style={{ animationDelay: '1s' }}>
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
