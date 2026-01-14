import React from 'react';
import { Shield, Truck, Award, RefreshCw, Headphones, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Lab-certified genuine products with authenticity guarantee',
  },
  {
    icon: Award,
    title: 'Energized Products',
    description: 'Each item is blessed with Vedic mantras for maximum benefits',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary shipping on orders above ₹2,000',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy for your peace of mind',
  },
  {
    icon: Headphones,
    title: 'Expert Guidance',
    description: 'Free consultation with our spiritual experts',
  },
  {
    icon: Heart,
    title: 'Trusted by 10K+',
    description: 'Join thousands of satisfied spiritual seekers',
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-gold transition-all duration-300">
                <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1 text-sm md:text-base">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
