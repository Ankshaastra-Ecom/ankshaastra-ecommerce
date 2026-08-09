import React from 'react';
import { Shield, Award, Gem, FlaskConical } from 'lucide-react';

const certifications = [
  {
    icon: Shield,
    title: '100% Authentic',
    desc: 'Sourced from Nepal & Indonesia',
  },
  {
    icon: FlaskConical,
    title: 'Lab Certified',
    desc: 'Third-party tested & verified',
  },
  {
    icon: Award,
    title: 'Energized with Mantras',
    desc: 'Vedic rituals performed',
  },
  {
    icon: Gem,
    title: 'Premium Quality',
    desc: 'Hand-picked by experts',
  },
];

const AuthenticityBadge: React.FC = () => {
  return (
    <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
      <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        Authenticity Guarantee
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {certifications.map((cert, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <cert.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{cert.title}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{cert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthenticityBadge;
