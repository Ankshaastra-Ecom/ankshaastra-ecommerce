import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Award, Heart, Globe } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-mandala opacity-30" />
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                About <span className="text-gradient-gold">GemsMantra</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your trusted partner in spiritual wellness since 2008
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Our Journey
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  GemsMantra was born from a deep passion for authentic spiritual products and a desire to make 
                  genuine Vedic remedies accessible to seekers worldwide. Our founder, a devoted practitioner 
                  of ancient Indian spirituality, recognized the challenge many faced in finding truly authentic 
                  products in a market flooded with imitations.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Starting from a small shop in Varanasi, we have grown into a trusted name serving thousands 
                  of customers across India and beyond. Our commitment to authenticity, quality, and customer 
                  satisfaction remains unchanged.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every Rudraksha, gemstone, crystal, and yantra we offer is carefully sourced, verified, and 
                  energized according to Vedic traditions. We believe that these sacred items carry the power 
                  to transform lives when they are genuine and properly consecrated.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-secondary overflow-hidden">
                  <div className="absolute inset-0 pattern-mandala opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl text-gold/60">ॐ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-display font-bold text-foreground mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Authenticity',
                  description: 'Every product is genuine, lab-certified, and sourced from trusted suppliers.'
                },
                {
                  icon: Heart,
                  title: 'Devotion',
                  description: 'Products are energized with proper Vedic mantras by qualified priests.'
                },
                {
                  icon: Users,
                  title: 'Customer First',
                  description: 'Personalized guidance and support for your spiritual journey.'
                },
                {
                  icon: Globe,
                  title: 'Accessibility',
                  description: 'Making authentic spiritual products available worldwide.'
                },
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
                Why Choose GemsMantra?
              </h2>
              <div className="space-y-4">
                {[
                  'Products sourced directly from Nepal, India, and certified international suppliers',
                  'Lab certification for all gemstones with authenticity guarantee',
                  'Energization performed by qualified Vedic priests',
                  'Free expert consultation for product selection',
                  'Secure packaging ensuring safe delivery',
                  '7-day hassle-free return policy',
                  'Pan-India free shipping on orders above ₹2,000',
                  'Dedicated customer support team',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg shadow-soft">
                    <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection of authentic spiritual products and transform your life with 
              the power of ancient Vedic wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gold">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
