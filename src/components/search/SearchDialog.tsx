import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import WatermarkImage from '@/components/product/WatermarkImage';
import { Badge } from '@/components/ui/badge';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RECENT_SEARCHES_KEY = 'ankshaastra_recent_searches';
const MAX_RECENT = 5;

const popularSearches = ['Rudraksha', 'Rose Quartz', 'Tiger Eye', 'Yantra', 'Bracelet'];

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    }
  }, [open]);

  const results = useMemo(() => {
    if (query.length < 1) return [];
    const q = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSelect = (productId: string, productName: string) => {
    saveRecentSearch(productName);
    onOpenChange(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSearchTerm = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search for Rudraksha, Bracelets, Yantras..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Autocomplete results */}
        {results.length > 0 && (
          <div className="border-t border-border max-h-80 overflow-y-auto">
            {results.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              return (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.id, product.name)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <WatermarkImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                      {product.bestSeller && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Best Seller</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">₹{product.price.toLocaleString()}</span>
                    {discount > 0 && (
                      <p className="text-[10px] text-muted-foreground line-through">₹{product.originalPrice!.toLocaleString()}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty state with suggestions */}
        {query.length === 0 && (
          <div className="border-t border-border p-4 space-y-4">
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Recent
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearchTerm(term)}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Popular searches */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Popular
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearchTerm(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {query.length >= 1 && results.length === 0 && (
          <div className="border-t border-border p-6 text-center text-muted-foreground text-sm">
            No products found for "{query}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
