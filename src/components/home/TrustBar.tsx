import React from 'react';
import { ShieldCheck, Truck, Star, BadgeIndianRupee } from 'lucide-react';

const items = [
  { icon: Star, title: '4.8/5 Rated', sub: '2,400+ reviews' },
  { icon: ShieldCheck, title: '100% Authentic', sub: 'Certified & energized' },
  { icon: Truck, title: 'Free Shipping', sub: 'Worldwide, always' },
  { icon: BadgeIndianRupee, title: 'COD & UPI', sub: 'Pay your way' },
];

const TrustBar: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant = 'dark' }) => {
  const isDark = variant === 'dark';
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-3 rounded-xl p-3 md:p-4 border ${
        isDark
          ? 'bg-cream/[0.06] border-cream/10 backdrop-blur-sm'
          : 'bg-card border-border/60 shadow-soft'
      }`}
    >
      {items.map(({ icon: Icon, title, sub }) => (
        <div key={title} className="flex items-center gap-2.5">
          <span
            className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 ${
              isDark ? 'bg-gold/15' : 'bg-primary/10'
            }`}
          >
            <Icon className={`w-4 h-4 ${isDark ? 'text-gold' : 'text-primary'}`} />
          </span>
          <div className="min-w-0">
            <p className={`text-xs md:text-sm font-semibold leading-tight ${isDark ? 'text-cream' : 'text-foreground'}`}>
              {title}
            </p>
            <p className={`text-[11px] leading-tight ${isDark ? 'text-cream/60' : 'text-muted-foreground'}`}>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBar;
