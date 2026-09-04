import React, { useState } from 'react';
import { Star, ThumbsUp, User, Camera, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  productName: string;
  productImages?: string[];
}

const baseReviews = [
  {
    id: 1,
    name: 'Priya S.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Absolutely beautiful quality! The energy from this product is genuinely positive. Packaging was also very thoughtful and secure.',
    helpful: 12,
    verified: true,
    photoCount: 2,
  },
  {
    id: 2,
    name: 'Rahul M.',
    rating: 5,
    date: '1 month ago',
    comment: 'Authentic product with great craftsmanship. I have been using it daily for my puja and meditation. Highly recommend Ankshaastra!',
    helpful: 8,
    verified: true,
    photoCount: 1,
  },
  {
    id: 3,
    name: 'Anita K.',
    rating: 4,
    date: '1 month ago',
    comment: 'Good quality product. Delivery was a bit slow but the product itself exceeded my expectations. Will order again.',
    helpful: 5,
    verified: true,
    photoCount: 0,
  },
  {
    id: 4,
    name: 'Vikram D.',
    rating: 5,
    date: '2 months ago',
    comment: 'Received exactly what was shown in the photos. The finish and detailing are premium. Looks stunning on the wall of my office.',
    helpful: 15,
    verified: true,
    photoCount: 2,
  },
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ rating, reviewCount, productName }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const ratingDistribution = [
    { stars: 5, percent: 68 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 1 },
  ];

  const allPhotos = sampleReviews.flatMap(r => r.photos);

  const openLightbox = (img: string) => {
    setLightboxImage(img);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-display font-bold mb-8 text-center">Customer Reviews</h3>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div className="text-center sm:text-left">
          <div className="text-5xl font-bold text-foreground mb-2">{rating.toFixed(1)}</div>
          <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on {reviewCount} reviews</p>
        </div>
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, percent }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-12">{stars} star</span>
              <Progress value={percent} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-10 text-right">{percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Strip */}
      {allPhotos.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            Customer Photos ({allPhotos.length})
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allPhotos.map((photo, i) => (
              <button
                key={i}
                onClick={() => openLightbox(photo)}
                className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
              >
                <img src={photo} alt={`Customer photo ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Individual Reviews */}
      <div className="space-y-6">
        {sampleReviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg p-5 shadow-soft border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{review.name}</span>
                    {review.verified && (
                      <span className="text-xs bg-sage/10 text-sage px-2 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">{review.comment}</p>

            {/* Review Photos */}
            {review.photos.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(photo)}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border border-border hover:border-primary transition-colors"
                  >
                    <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>

      {/* Photo Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-lg p-2 bg-background/95 backdrop-blur-md">
          <img src={lightboxImage} alt="Review photo" className="w-full h-auto rounded-lg" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
