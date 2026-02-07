import React from 'react';

interface WatermarkImageProps {
  src: string;
  alt: string;
  className?: string;
}

const WatermarkImage: React.FC<WatermarkImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className="relative w-full h-full">
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white/20 font-display font-bold text-lg md:text-2xl tracking-[0.3em] uppercase rotate-[-25deg] whitespace-nowrap">
          Ankshaastra
        </span>
      </div>
    </div>
  );
};

export default WatermarkImage;
