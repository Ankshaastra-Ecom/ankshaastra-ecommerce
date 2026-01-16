import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RefreshCw, Minus, Plus, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = id ? getProductById(id) : undefined;

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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col">
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
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={product.images?.[selectedImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      -{discount}% OFF
                    </Badge>
                  )}
                  {product.bestSeller && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Best Seller
                    </Badge>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
                    ₹{product.price.toLocaleString()}
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
                <div className="flex items-center gap-2 mb-6">
                  {product.inStock ? (
                    <>
                      <Check className="w-5 h-5 text-sage" />
                      <span className="text-sage font-medium">In Stock - Ready to Ship</span>
                    </>
                  ) : (
                    <span className="text-destructive font-medium">Out of Stock</span>
                  )}
                </div>

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
                    disabled={!product.inStock || isInCart(product.id)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
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
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">100% Authentic</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">7-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 mb-8">
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-display font-bold mb-4">Customer Reviews</h3>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(product.rating)
                              ? 'text-gold fill-gold'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{product.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-muted-foreground">
                    Reviews are being collected. Be the first to review this product!
                  </p>
                </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
