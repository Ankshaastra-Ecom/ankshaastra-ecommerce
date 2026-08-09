import React from 'react';
import { Shield, Truck, Award, Headphones, Heart } from 'lucide-react';

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
    description: 'Free shipping on all orders — no minimum required',
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
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(270 30% 15%) 0%, hsl(270 35% 20%) 50%, hsl(270 25% 12%) 100%)' }}>
      <div className="absolute inset-0 pattern-mandala opacity-5" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 50%, hsl(270 50% 40% / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(270 40% 50% / 0.15) 0%, transparent 50%)'
      }} />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amethyst/20 border border-amethyst/30 flex items-center justify-center group-hover:bg-amethyst group-hover:shadow-lg transition-all duration-300">
                <benefit.icon className="w-6 h-6 text-amethyst group-hover:text-cream transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-cream mb-1 text-sm md:text-base">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-cream/70 leading-tight">
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
