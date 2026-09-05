import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrustBar from './TrustBar';
import heroShowcase from '@/assets/hero-showcase.jpg';

const HeroSection: React.FC = () => {
  return (

    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1a0d18]">
      {/* Temple-light gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, hsl(38 70% 45% / 0.28) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 15% 85%, hsl(300 45% 22% / 0.5) 0%, transparent 65%),
              radial-gradient(ellipse 70% 60% at 90% 60%, hsl(25 60% 32% / 0.3) 0%, transparent 60%),
              linear-gradient(165deg, #1f1020 0%, #17101f 45%, #120b14 100%)
            `,
          }}
        />
        {/* Soft drifting light veils */}
        <div
          className="absolute -top-1/3 left-1/4 w-[60%] h-[90%] rounded-full blur-[130px] animate-nebula-drift"
          style={{ background: 'hsl(38 75% 50% / 0.14)' }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/5 w-[70%] h-[80%] rounded-full blur-[140px] animate-nebula-drift"
          style={{ background: 'hsl(305 45% 32% / 0.22)', animationDelay: '-6s' }}
        />
      </div>

      {/* Fine silk weave texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 6px)`,
        }}
      />

      {/* Concentric halo rings */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className="w-[120vh] h-[120vh] rounded-full border border-gold/[0.06]" />
        <div className="absolute w-[85vh] h-[85vh] rounded-full border border-gold/[0.05]" />
        <div className="absolute w-[50vh] h-[50vh] rounded-full border border-gold/[0.04]" />
      </div>

      {/* Warm floor glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 z-[1]"
        style={{ background: 'linear-gradient(0deg, hsl(38 60% 40% / 0.12) 0%, transparent 100%)' }}
      />

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

            {/* Trust badges */}
            <div className="mt-8 max-w-xl mx-auto lg:mx-0">
              <TrustBar variant="dark" />
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="relative">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Radial Glow */}
              <div className="absolute inset-[5%] rounded-full bg-gradient-to-br from-gold/25 via-amethyst/20 to-transparent blur-3xl animate-glow" />

              {/* Image with decorative frame */}
              <div className="relative w-[88%] aspect-square rounded-full overflow-hidden border border-gold/25 shadow-[0_0_80px_hsl(42_85%_55%/0.25)]">
                <img
                  src={heroShowcase}
                  alt="Rudraksha mala, crystal bracelets and sacred yantra on silk"
                  className="w-full h-full object-cover scale-105"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                />
                {/* Soft inner vignette */}
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 60px 30px hsl(300 40% 8% / 0.55)' }} />
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
