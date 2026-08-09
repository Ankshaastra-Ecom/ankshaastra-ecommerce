import { useState, useEffect } from 'react';
import { Product, getProductById } from '@/data/products';

const STORAGE_KEY = 'ankshaastra_recently_viewed';
const MAX_ITEMS = 8;

export const useRecentlyViewed = (currentProductId?: string) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];

    // Add current product to the front
    if (currentProductId) {
      const filtered = ids.filter(id => id !== currentProductId);
      filtered.unshift(currentProductId);
      const trimmed = filtered.slice(0, MAX_ITEMS + 1); // +1 because we exclude current
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    }

    // Load products excluding current
    const allIds: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const products = allIds
      .filter(id => id !== currentProductId)
      .map(id => getProductById(id))
      .filter((p): p is Product => !!p)
      .slice(0, 8);

    setRecentProducts(products);
  }, [currentProductId]);

  return recentProducts;
};
