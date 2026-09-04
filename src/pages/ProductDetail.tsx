import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, Minus, Plus, ZoomIn, Check, Share2, Copy, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import WatermarkImage from '@/components/product/WatermarkImage';
import ImageZoom from '@/components/product/ImageZoom';
import ProductReviews from '@/components/product/ProductReviews';
import StockWarning from '@/components/product/StockWarning';
import FrequentlyBoughtTogether from '@/components/product/FrequentlyBoughtTogether';
import ProductQuestions from '@/components/product/ProductQuestions';
import MobileImageCarousel from '@/components/product/MobileImageCarousel';
import AddToCartAnimation from '@/components/cart/AddToCartAnimation';
import { useIsMobile } from '@/hooks/use-mobile';
import StickyAddToCart from '@/components/product/StickyAddToCart';
import AuthenticityBadge from '@/components/product/AuthenticityBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/products';
import SEO from '@/components/SEO';
import { useCart } from '@/context/CartContext';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [frameId, setFrameId] = useState<'pinecone' | 'floating-black'>('pinecone');
  const isMobile = useIsMobile();
  const recentlyViewed = useRecentlyViewed(id);

  // Reset state when product ID changes (navigation to different product)
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setSizeIndex(0);
    setFrameId('pinecone');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const product = id ? getProductById(id) : undefined;

  const handleCartAnimationComplete = useCallback(() => {
    setShowCartAnimation(false);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const sizeOptions = product.sizeOptions;
  const frameOptions = product.frameOptions;
  const selectedSize = sizeOptions?.[sizeIndex];
  const frameExtra = selectedSize && frameId === 'floating-black' ? selectedSize.floatingFrameExtra : 0;
  const unitPrice = selectedSize ? selectedSize.price + frameExtra : product.price;
  const selectedFrameName = frameOptions?.find(f => f.id === frameId)?.name;

  // Each size + frame combination is a distinct cart line item
  const cartProduct = selectedSize
    ? {
        ...product,
        id: `${product.id}--${selectedSize.label.replace(/[^0-9x]/g, '')}--${frameId}`,
        name: `${product.name} — ${selectedSize.label}, ${selectedFrameName}`,
        price: unitPrice,
        originalPrice: undefined,
      }
    : product;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(cartProduct, quantity);
    setShowCartAnimation(true);
  };

  const handleBuyNow = () => {
    addItem(cartProduct, quantity);
    navigate('/cart');
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0] || product.image,
    brand: { '@type': 'Brand', name: 'Ankshaastra' },
    offers: {
      '@type': 'Offer',
      price: unitPrice,
      priceCurrency: 'INR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Ankshaastra' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviews,
    },
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: product.category.charAt(0).toUpperCase() + product.category.slice(1), url: `/shop/${product.category}` },
    { name: product.name, url: `/product/${product.id}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${product.name} — Buy Online`}
        description={product.description.slice(0, 155)}
        canonical={`/product/${product.id}`}
        ogType="product"
        jsonLd={productJsonLd}
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <span className="mx-2">/</span>
              <Link to={`/shop/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-3">
                {/* Mobile: Swipe Carousel | Desktop: Static Image */}
                {isMobile && product.images && product.images.length > 1 ? (
                  <MobileImageCarousel
                    images={product.images}
                    productName={product.name}
                    discount={discount}
                    bestSeller={product.bestSeller}
                    onImageClick={() => setZoomOpen(true)}
                    selectedIndex={selectedImageIndex}
                    onSelect={setSelectedImageIndex}
                  />
                ) : (
                  <>
                    {/* Main Image */}
                    <div
                      className="relative aspect-square max-h-[70vh] md:max-h-none rounded-xl md:rounded-2xl overflow-hidden bg-muted mx-auto w-full max-w-md md:max-w-none cursor-pointer group/zoom"
                      onClick={() => setZoomOpen(true)}
                    >
                      <WatermarkImage
                        src={product.images?.[selectedImageIndex] || product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/zoom:bg-black/10 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/zoom:opacity-80 transition-opacity" />
                      </div>
                      {discount > 0 && (
                        <Badge className="absolute top-2 left-2 md:top-4 md:left-4 text-xs md:text-sm bg-destructive text-destructive-foreground">
                          -{discount}% OFF
                        </Badge>
                      )}
                      {product.bestSeller && (
                        <Badge className="absolute top-2 right-2 md:top-4 md:right-4 text-xs md:text-sm bg-primary text-primary-foreground">
                          Best Seller
                        </Badge>
                      )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {product.images && product.images.length > 1 && (
                      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 px-1 justify-center md:justify-start">
                        {product.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index
                                ? 'border-primary ring-2 ring-primary/20'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${product.name} view ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Product Info */}
              <div>
                <p className="text-sm text-primary uppercase tracking-wider font-medium mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-gold fill-gold'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ₹{unitPrice.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge variant="secondary" className="text-sage">
                      You save ₹{(product.originalPrice! - product.price).toLocaleString()}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Status */}
                <div className="mb-6">
                  <StockWarning stock={product.stock} inStock={product.inStock} />
                </div>

                {/* Size & Frame Selection (Vastu Paintings) */}
                {sizeOptions && frameOptions && (
                  <div className="space-y-5 mb-6">
                    <div>
                      <p className="font-medium mb-2">Select Size <span className="text-muted-foreground text-sm font-normal">(inches)</span></p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {sizeOptions.map((size, i) => (
                          <button
                            key={size.label}
                            type="button"
                            onClick={() => setSizeIndex(i)}
                            className={`rounded-lg border px-3 py-2 text-left transition-colors min-h-[44px] ${
                              i === sizeIndex
                                ? 'border-primary bg-primary/10 text-foreground'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <span className="block text-sm font-medium">{size.label.replace(' inch', '')}</span>
                            <span className="block text-xs text-muted-foreground">₹{(size.price + (frameId === 'floating-black' ? size.floatingFrameExtra : 0)).toLocaleString()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Select Framing</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {frameOptions.map((frame) => {
                          const extra = frame.id === 'floating-black' ? (selectedSize?.floatingFrameExtra ?? 0) : 0;
                          return (
                            <button
                              key={frame.id}
                              type="button"
                              onClick={() => setFrameId(frame.id)}
                              className={`rounded-lg border px-3 py-3 text-left transition-colors min-h-[44px] ${
                                frame.id === frameId
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <span className="block text-sm font-medium">{frame.name}</span>
                              <span className="block text-xs text-muted-foreground">
                                {extra > 0 ? `+₹${extra.toLocaleString()}` : 'Included — no extra cost'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="btn-gold flex-1 py-6 text-base"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isInCart(cartProduct.id)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.comingSoon ? 'Coming Soon' : isInCart(cartProduct.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 py-6 text-base"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                  <Button size="lg" variant="outline" className="px-4">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" variant="outline" className="px-4">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => {
                        const url = `${window.location.origin}/product/${product.id}`;
                        const text = `Check out ${product.name} — ₹${product.price.toLocaleString()} on Ankshaastra!\n${url}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                      }}>
                        <MessageCircle className="w-4 h-4 mr-2" /> Share on WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        const url = `${window.location.origin}/product/${product.id}`;
                        if (navigator.share) {
                          try {
                            await navigator.share({ title: product.name, text: `${product.name} — ₹${product.price.toLocaleString()}`, url });
                          } catch {}
                        } else {
                          await navigator.clipboard.writeText(url);
                          toast({ title: 'Link copied!', description: 'Product link copied to clipboard.' });
                        }
                      }}>
                        <Share2 className="w-4 h-4 mr-2" /> {typeof navigator.share === 'function' ? 'Share via...' : 'Copy Link'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        await navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
                        toast({ title: 'Link copied!', description: 'Product link copied to clipboard.' });
                      }}>
                        <Copy className="w-4 h-4 mr-2" /> Copy Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Free Shipping on All Orders</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">100% Authentic</p>
                  </div>
                </div>

                {/* Frequently Bought Together */}
                {/* Authenticity Guarantee */}
                <AuthenticityBadge />

                <div className="mt-8">
                  <FrequentlyBoughtTogether currentProduct={product} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 mb-8">
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="animate-fade-in">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">Spiritual Benefits</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="animate-fade-in">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">Product Specifications</h3>
                  <div className="bg-card rounded-lg shadow-soft overflow-hidden">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={key}
                        className={`flex justify-between p-4 ${
                          index !== Object.entries(product.specifications).length - 1
                            ? 'border-b border-border'
                            : ''
                        }`}
                      >
                        <span className="font-medium text-foreground">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="animate-fade-in">
                <ProductReviews
                  rating={product.rating}
                  reviewCount={product.reviews}
                  productName={product.name}
                  productImages={product.images?.length ? product.images : [product.image]}
                />
              </TabsContent>

              <TabsContent value="qa" className="animate-fade-in">
                <ProductQuestions productId={product.id} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">
                Recently Viewed
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {recentlyViewed.map((p) => (
                  <div key={p.id} className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Image Zoom Modal */}
      <ImageZoom
        images={product.images || [product.image]}
        currentIndex={selectedImageIndex}
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
        productName={product.name}
      />

      {/* Add to Cart Animation */}
      <AddToCartAnimation
        show={showCartAnimation}
        productName={product.name}
        onComplete={handleCartAnimationComplete}
      />

      {/* Sticky Mobile Add to Cart */}
      <StickyAddToCart
        product={cartProduct}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
