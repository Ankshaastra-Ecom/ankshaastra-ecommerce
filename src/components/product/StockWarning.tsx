import React from 'react';
import { AlertTriangle, Flame } from 'lucide-react';

interface StockWarningProps {
  stock?: number;
  inStock: boolean;
}

const StockWarning: React.FC<StockWarningProps> = ({ stock, inStock }) => {
  if (!inStock) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-destructive/10 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <span className="text-sm font-medium text-destructive">Out of Stock</span>
      </div>
    );
  }

  if (stock !== undefined && stock <= 5) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 rounded-lg animate-pulse">
        <Flame className="w-4 h-4 text-amber-600" />
        <span className="text-sm font-semibold text-amber-700">
          Only {stock} left — Order soon!
        </span>
      </div>
    );
  }

  if (stock !== undefined && stock <= 15) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/5 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-600">
          Limited stock — {stock} remaining
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-sage" />
      <span className="text-sm font-medium text-sage">In Stock — Ready to Ship</span>
    </div>
  );
};

export default StockWarning;
