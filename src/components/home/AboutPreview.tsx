import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPreview: React.FC = () => {
  const highlights = [
    'Authentic products sourced from Nepal & India',
    'Lab-certified gemstones with proper documentation',
    'Energized with Vedic mantras by qualified priests',
    'Expert guidance for product selection',
    'Secure packaging for safe delivery',
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-amethyst/20 to-primary/20" />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 pattern-mandala opacity-50" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-8xl md:text-9xl text-gold/50">ॐ</span>
                  <p className="font-spiritual text-xl text-secondary-foreground mt-4">
                    "Authentic Spiritual Products for Your Journey"
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-card p-6 rounded-xl shadow-elevated max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center text-primary-foreground font-display text-2xl font-bold">
                  15+
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Years of Experience</p>
                  <p className="text-sm text-muted-foreground">In spiritual products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <p className="text-primary font-medium uppercase tracking-wider mb-2">About GemsMantra</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Your Trusted Partner in
              <span className="text-gradient-gold"> Spiritual Wellness</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At GemsMantra, we believe in the transformative power of authentic spiritual products. 
              For over 15 years, we have been sourcing the finest Rudraksha beads from Nepal, 
              healing crystals from around the world, and precious gemstones certified for 
              astrological purposes.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our mission is to make genuine spiritual products accessible to seekers everywhere, 
              ensuring each item carries the divine energy needed for your spiritual journey.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="btn-gold rounded-full">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
