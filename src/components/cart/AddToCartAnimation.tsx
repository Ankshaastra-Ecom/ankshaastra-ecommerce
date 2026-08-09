import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';

interface AddToCartAnimationProps {
  show: boolean;
  productName: string;
  onComplete: () => void;
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({ show, productName, onComplete }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', damping: 10, stiffness: 400 }}
            >
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
            </motion.div>
            <div className="text-sm font-medium">
              <span className="font-bold">{productName}</span> added to cart
            </div>
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToCartAnimation;
