import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import WatermarkImage from '@/components/product/WatermarkImage';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isInCart } = useCart();

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
            {product.bestSeller && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Best Seller
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft">
              <Heart className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={handleAddToCart}
              className="w-full btn-gold text-sm"
              disabled={isInCart(product.id)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
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
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-xs mt-2 ${product.inStock ? 'text-sage' : 'text-destructive'}`}>
            {product.inStock ? '● In Stock' : '○ Out of Stock'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
