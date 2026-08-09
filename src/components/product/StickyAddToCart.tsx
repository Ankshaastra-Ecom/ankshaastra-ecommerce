import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyAddToCartProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({ product, onAddToCart, onBuyNow }) => {
  const { isInCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px (past the main CTA area)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-16 left-0 right-0 z-40 md:hidden safe-area-bottom"
        >
          <div className="bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
              <p className="text-base font-bold text-primary">₹{product.price.toLocaleString()}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-3"
              onClick={onBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </Button>
            <Button
              size="sm"
              className="btn-gold text-xs px-3"
              onClick={onAddToCart}
              disabled={!product.inStock || isInCart(product.id)}
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1" />
              {isInCart(product.id) ? 'In Cart' : 'Add'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyAddToCart;
