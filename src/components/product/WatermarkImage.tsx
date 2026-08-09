import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface WatermarkImageProps {
  src: string;
  alt: string;
  className?: string;
}

const WatermarkImage: React.FC<WatermarkImageProps> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white/20 font-display font-bold text-lg md:text-2xl tracking-[0.3em] uppercase rotate-[-25deg] whitespace-nowrap">
          Ankshaastra
        </span>
      </div>
    </div>
  );
};

export default WatermarkImage;
