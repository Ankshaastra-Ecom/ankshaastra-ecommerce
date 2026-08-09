import React from 'react';
import { Plus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { products, Product } from '@/data/products';
import WatermarkImage from './WatermarkImage';
import { Link } from 'react-router-dom';

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
}

// Logic to find complementary products
const getFrequentlyBoughtTogether = (product: Product): Product[] => {
  const complementaryProducts: Product[] = [];
  
  // Category-based recommendations
  const categoryMap: Record<string, string[]> = {
    'crystals': ['rudraksha', 'mala', 'miscellaneous'],
    'rudraksha': ['crystals', 'mala', 'yantra'],
    'mala': ['rudraksha', 'crystals'],
    'yantra': ['rudraksha', 'miscellaneous'],
    'miscellaneous': ['crystals', 'rudraksha'],
  };

  const relatedCategories = categoryMap[product.category] || [];
  
  // Get one product from each related category
  relatedCategories.forEach(category => {
    const categoryProducts = products.filter(
      p => p.category === category && p.id !== product.id && p.inStock
    );
    if (categoryProducts.length > 0) {
      // Pick a random product from this category for variety
      const randomIndex = Math.floor(Math.random() * Math.min(categoryProducts.length, 3));
      complementaryProducts.push(categoryProducts[randomIndex]);
    }
  });

  return complementaryProducts.slice(0, 2);
};

const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ currentProduct }) => {
  const { addItem, isInCart } = useCart();
  const [selectedProducts, setSelectedProducts] = React.useState<Set<string>>(new Set([currentProduct.id]));
  
  const frequentlyBought = React.useMemo(
    () => getFrequentlyBoughtTogether(currentProduct),
    [currentProduct.id]
  );

  if (frequentlyBought.length === 0) return null;

  const allProducts = [currentProduct, ...frequentlyBought];
  
  const toggleProduct = (productId: string) => {
    // Can't deselect the current product
    if (productId === currentProduct.id) return;
    
    setSelectedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const selectedItems = allProducts.filter(p => selectedProducts.has(p.id));
  const totalPrice = selectedItems.reduce((sum, p) => sum + p.price, 0);
  const originalTotal = selectedItems.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);
  const bundleDiscount = Math.round(originalTotal * 0.05); // 5% bundle discount
  const finalPrice = totalPrice - bundleDiscount;

  const handleAddBundle = () => {
    selectedItems.forEach(product => {
      addItem(product, 1);
    });
    toast({
      title: "🎁 Bundle Added to Cart!",
      description: `All ${selectedItems.length} items added. You saved ₹${bundleDiscount.toLocaleString()}!`,
    });
  };

  const handleAddAllToCart = () => {
    allProducts.forEach(product => {
      addItem(product, 1);
    });
    setSelectedProducts(new Set(allProducts.map(p => p.id)));
    const fullOriginalTotal = allProducts.reduce((s, p) => s + (p.originalPrice || p.price), 0);
    const fullDiscount = Math.round(fullOriginalTotal * 0.05);
    toast({
      title: "🛒 All Items Added!",
      description: `${allProducts.length} items added to cart. Bundle discount: ₹${fullDiscount.toLocaleString()}`,
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-gold/5 rounded-xl p-6 border border-primary/10">
      <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-xl">🎁</span>
        Frequently Bought Together
      </h3>
      
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        {allProducts.map((product, index) => (
          <React.Fragment key={product.id}>
            <div 
              className={`relative cursor-pointer transition-all ${
                selectedProducts.has(product.id) 
                  ? 'ring-2 ring-primary ring-offset-2 rounded-lg' 
                  : 'opacity-50'
              } ${product.id === currentProduct.id ? 'cursor-default' : ''}`}
              onClick={() => toggleProduct(product.id)}
            >
              <Link 
                to={`/product/${product.id}`} 
                onClick={(e) => product.id !== currentProduct.id && e.stopPropagation()}
                className="block"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted">
                  <WatermarkImage 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              {selectedProducts.has(product.id) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <p className="text-xs text-center mt-1 max-w-20 sm:max-w-24 truncate text-muted-foreground">
                {product.name.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
            {index < allProducts.length - 1 && (
              <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-background rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Bundle Total ({selectedItems.length} items)</span>
          <span className="line-through text-muted-foreground">₹{originalTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-sage">
          <span>Bundle Discount (5%)</span>
          <span>-₹{bundleDiscount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
          <span>Final Price</span>
          <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        <Button
          onClick={handleAddBundle}
          className="w-full btn-gold"
          disabled={selectedItems.length === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add Selected ({selectedItems.length})
        </Button>
        <Button
          onClick={handleAddAllToCart}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add ALL to Cart ({allProducts.length})
        </Button>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
