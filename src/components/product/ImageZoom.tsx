import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageZoomProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ images, currentIndex, isOpen, onClose, productName }) => {
  const [index, setIndex] = useState(currentIndex);
  const [zoomed, setZoomed] = useState(false);

  React.useEffect(() => {
    setIndex(currentIndex);
    setZoomed(false);
  }, [currentIndex, isOpen]);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none overflow-hidden">
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <X className="w-5 h-5" />
          </button>

          {/* Zoom toggle */}
          <button onClick={() => setZoomed(!zoomed)} className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image */}
          <div className={`overflow-auto w-full h-full flex items-center justify-center ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setZoomed(!zoomed)}>
            <img
              src={images[index]}
              alt={`${productName} - Image ${index + 1}`}
              className={`transition-transform duration-300 ${zoomed ? 'scale-150 max-w-none' : 'max-w-full max-h-full object-contain'}`}
              loading="lazy"
            />
          </div>

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoom;
