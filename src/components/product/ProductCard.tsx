import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import WatermarkImage from '@/components/product/WatermarkImage';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to add items to your wishlist." });
      return;
    }
    toggleWishlist(product.id);
    toast({
      title: isInWishlist(product.id) ? "Removed from Wishlist" : "Added to Wishlist",
      description: isInWishlist(product.id) ? `${product.name} removed from wishlist.` : `${product.name} added to your wishlist.`,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card-spiritual overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <WatermarkImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">
                -{discount}%
              </Badge>
            )}
            {product.comingSoon && (
              <Badge className="bg-secondary text-secondary-foreground text-xs">
                Coming Soon
              </Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Best Seller
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={handleToggleWishlist}
              className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors shadow-soft ${
                isInWishlist(product.id)
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-background/90 hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
            <button className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Overlay - Desktop hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto hidden md:block">
            {product.sizeOptions?.length ? (
              <Button className="w-full btn-gold text-sm" disabled={product.comingSoon}>
                {product.comingSoon ? 'Coming Soon' : 'Choose Size & Frame'}
              </Button>
            ) : (
              <Button 
                onClick={handleAddToCart}
                className="w-full btn-gold text-sm"
                disabled={isInCart(product.id)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
              </Button>
            )}
          </div>

          {/* Quick Add - Mobile: always-visible small button */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart(product.id) || !product.inStock || !!product.sizeOptions?.length}
            className={`absolute bottom-2 right-2 md:hidden w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isInCart(product.id) 
                ? 'bg-primary/50 text-primary-foreground cursor-default' 
                : 'bg-primary text-primary-foreground active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-gold fill-gold' 
                      : 'text-muted-foreground'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {product.sizeOptions?.length ? 'From ' : ''}₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.comingSoon ? (
            <p className="text-xs mt-2 text-muted-foreground">○ Launching soon</p>
          ) : !product.inStock ? (
            <p className="text-xs mt-2 text-destructive">○ Out of Stock</p>
          ) : product.stock !== undefined && product.stock <= 5 ? (
            <p className="text-xs mt-2 text-amber-600 font-semibold">🔥 Only {product.stock} left!</p>
          ) : (
            <p className="text-xs mt-2 text-sage">● In Stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
