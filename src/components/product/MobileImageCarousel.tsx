import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ZoomIn } from 'lucide-react';
import WatermarkImage from '@/components/product/WatermarkImage';
import useEmblaCarousel from 'embla-carousel-react';

interface MobileImageCarouselProps {
  images: string[];
  productName: string;
  discount: number;
  bestSeller?: boolean;
  onImageClick: () => void;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const MobileImageCarousel: React.FC<MobileImageCarouselProps> = ({
  images,
  productName,
  discount,
  bestSeller,
  onImageClick,
  selectedIndex,
  onSelect,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: selectedIndex });

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelectHandler = () => {
      onSelect(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelectHandler);
    return () => { emblaApi.off('select', onSelectHandler); };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== selectedIndex) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, selectedIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 aspect-square relative cursor-pointer group/zoom"
              onClick={onImageClick}
            >
              <WatermarkImage
                src={img}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/zoom:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/zoom:opacity-80 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      {discount > 0 && (
        <Badge className="absolute top-2 left-2 text-xs bg-destructive text-destructive-foreground">
          -{discount}% OFF
        </Badge>
      )}
      {bestSeller && (
        <Badge className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground">
          Best Seller
        </Badge>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-5'
                  : 'bg-muted-foreground/30'
              }`}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileImageCarousel;
