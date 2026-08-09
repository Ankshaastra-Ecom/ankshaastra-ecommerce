import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'ankshaastra_cookie_consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[90] animate-fade-in">
      <div className="bg-card rounded-xl shadow-2xl border border-border p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground mb-1">We value your privacy 🍪</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleAccept} size="sm" className="btn-gold flex-1">
                Accept
              </Button>
              <Button onClick={handleDecline} size="sm" variant="outline" className="flex-1">
                Decline
              </Button>
            </div>
          </div>
          <button onClick={handleDecline} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
