import React, { useState, useEffect, useCallback } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EXIT_INTENT_KEY = 'ankshaastra_exit_shown';

const ExitIntentPopup: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !sessionStorage.getItem(EXIT_INTENT_KEY)) {
      setShow(true);
      sessionStorage.setItem(EXIT_INTENT_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-[90vw] p-8 text-center border border-border">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Gift className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Wait! Don't Go Empty-Handed 🙏
        </h2>
        <p className="text-muted-foreground mb-4">
          Use code <span className="font-bold text-primary">REVIEW</span> at checkout and get <span className="font-bold text-primary">10% OFF</span> on your first order!
        </p>

        <div className="bg-muted rounded-lg p-3 mb-6">
          <p className="text-lg font-bold tracking-widest text-primary">REVIEW</p>
          <p className="text-xs text-muted-foreground mt-1">Valid on all products</p>
        </div>

        <Button
          onClick={() => setShow(false)}
          className="w-full btn-gold py-5 text-base"
        >
          Continue Shopping
        </Button>

        <button
          onClick={() => setShow(false)}
          className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
