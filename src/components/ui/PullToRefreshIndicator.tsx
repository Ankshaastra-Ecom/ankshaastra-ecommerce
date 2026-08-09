import React from 'react';
import { Loader2, ArrowDown } from 'lucide-react';

interface Props {
  pullDistance: number;
  refreshing: boolean;
  threshold?: number;
}

const PullToRefreshIndicator: React.FC<Props> = ({ pullDistance, refreshing, threshold = 80 }) => {
  if (pullDistance <= 0 && !refreshing) return null;

  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className="flex items-center justify-center overflow-hidden transition-all"
      style={{ height: refreshing ? 48 : pullDistance }}
    >
      {refreshing ? (
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      ) : (
        <ArrowDown
          className="w-5 h-5 text-primary transition-transform"
          style={{ transform: `rotate(${progress >= 1 ? 180 : 0}deg)`, opacity: progress }}
        />
      )}
    </div>
  );
};

export default PullToRefreshIndicator;
