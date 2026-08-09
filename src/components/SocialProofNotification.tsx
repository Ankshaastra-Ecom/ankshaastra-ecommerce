import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { products } from '@/data/products';

interface PurchaseNotification {
  id: number;
  productName: string;
  location: string;
  timeAgo: string;
}

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Noida', 'Gurgaon',
  'Chandigarh', 'Indore', 'Bhopal', 'Coimbatore', 'Kochi', 'Vadodara',
  'Surat', 'Nagpur', 'Visakhapatnam', 'Patna', 'Ludhiana', 'Agra'
];

const TIME_PHRASES = [
  'just now', '2 minutes ago', '5 minutes ago', '8 minutes ago', 
  '12 minutes ago', '15 minutes ago', '20 minutes ago', '30 minutes ago'
];

const getRandomCity = () => INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
const getRandomTime = () => TIME_PHRASES[Math.floor(Math.random() * TIME_PHRASES.length)];
const getRandomProduct = () => {
  const inStockProducts = products.filter(p => p.inStock);
  return inStockProducts[Math.floor(Math.random() * inStockProducts.length)];
};

const SocialProofNotification: React.FC = () => {
  const [notification, setNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed notifications this session
    const dismissed = sessionStorage.getItem('socialProofDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Show first notification after 10 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 10000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    // Show subsequent notifications every 30-60 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 30000 + 30000; // 30-60 seconds
      setTimeout(showNotification, randomDelay);
    }, 60000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  const showNotification = () => {
    if (isDismissed) return;

    const product = getRandomProduct();
    if (!product) return;

    setNotification({
      id: Date.now(),
      productName: product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name,
      location: getRandomCity(),
      timeAgo: getRandomTime(),
    });
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('socialProofDismissed', 'true');
  };

  if (isDismissed) return null;

  if (!isVisible || !notification) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 left-4 z-50 max-w-[320px] animate-in slide-in-from-left-10 fade-in duration-300">
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground font-medium leading-tight">
            Someone in <span className="text-primary">{notification.location}</span> purchased
          </p>
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {notification.productName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.timeAgo}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-muted rounded-full transition-colors flex-shrink-0"
          aria-label="Dismiss notifications"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SocialProofNotification;
