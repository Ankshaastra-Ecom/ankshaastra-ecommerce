import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import founderImg from '@/assets/founder.jpg';

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
          <div className="relative space-y-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={founderImg} 
                alt="Founder of Ankshaastra" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>


            {/* Floating Card */}
            <div className="absolute -bottom-4 right-3 md:-right-8 bg-card px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-elevated z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center text-primary-foreground font-display text-sm md:text-base font-bold">
                  10+
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-xs md:text-sm leading-tight">Years of Experience</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">In spiritual products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <p className="text-primary font-medium uppercase tracking-wider mb-2">About Ankshaastra</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Your Trusted Partner in
              <span className="text-gradient-gold"> Spiritual Wellness</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At Ankshaastra, we believe in the transformative power of authentic spiritual products. 
              For over 10 years, we have been sourcing the finest Rudraksha beads from Nepal, 
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
