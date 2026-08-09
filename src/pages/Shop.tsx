import React, { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Grid3X3, LayoutList, SlidersHorizontal, X } from 'lucide-react';
import allProductsBanner from '@/assets/banners/all-products-banner.jpg';
import rudrakshaBanner from '@/assets/banners/rudraksha-banner.jpg';
import crystalsBanner from '@/assets/banners/crystals-banner.jpg';
import malaBanner from '@/assets/banners/mala-banner.jpg';
import gemstonesBanner from '@/assets/banners/gemstones-banner.jpg';
import yantraBanner from '@/assets/banners/yantra-banner.jpg';
import miscellaneousBanner from '@/assets/banners/miscellaneous-banner.jpg';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { products, categories } from '@/data/products';
import SEO from '@/components/SEO';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import PullToRefreshIndicator from '@/components/ui/PullToRefreshIndicator';

const categoryBanners: Record<string, string> = {
  all: allProductsBanner,
  rudraksha: rudrakshaBanner,
  crystals: crystalsBanner,
  mala: malaBanner,
  gemstones: gemstonesBanner,
  yantra: yantraBanner,
  miscellaneous: miscellaneousBanner,
};

const Shop: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(async () => {
    await new Promise(r => setTimeout(r, 600));
    setRefreshKey(k => k + 1);
  }, []);

  const { containerRef, pullDistance, refreshing } = usePullToRefresh({ onRefresh: handleRefresh });

  const currentCategory = categories.find(c => c.id === category);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    } else if (category) {
      result = result.filter(p => p.category === category);
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by stock
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [category, selectedCategories, priceRange, inStockOnly, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 60000]);
    setInStockOnly(false);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => handleCategoryChange(cat.id)}
              />
              <span className="text-sm text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                ({products.filter(p => p.category === cat.id).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={60000}
            step={500}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-4">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <span className="text-sm text-foreground">In Stock Only</span>
        </label>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  const shopTitle = currentCategory ? `Buy ${currentCategory.name} Online` : 'Shop All Spiritual Products';
  const shopDesc = currentCategory
    ? `Browse authentic ${currentCategory.name} at Ankshaastra. ${currentCategory.description}. Free shipping on all orders.`
    : 'Browse 50+ authentic Rudraksha, crystal bracelets, Yantras & spiritual products. Lab-certified, energized with Vedic mantras. Free shipping on all orders.';

  return (
    <div className="min-h-screen flex flex-col" ref={containerRef}>
      <PullToRefreshIndicator pullDistance={pullDistance} refreshing={refreshing} />
      <SEO
        title={shopTitle}
        description={shopDesc}
        canonical={category ? `/shop/${category}` : '/shop'}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative py-16 md:py-24 overflow-hidden min-h-[220px] md:min-h-[280px]">
          {/* Banner Image */}
          <img 
            src={categoryBanners[category || 'all']} 
            alt={currentCategory ? currentCategory.name : 'All Products'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 pattern-mandala opacity-10" />
          
          <div className="container-custom relative z-10">
            <nav className="text-sm text-cream/60 mb-4">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
              {currentCategory && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-cream">{currentCategory.name}</span>
                </>
              )}
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-cream drop-shadow-lg">
              {currentCategory ? currentCategory.name : 'All Products'}
            </h1>
            {currentCategory && (
              <p className="text-cream/80 mt-3 max-w-2xl text-lg drop-shadow">{currentCategory.description}</p>
            )}
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </h2>
                </div>
                <FiltersContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:w-80">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <SlidersHorizontal className="w-5 h-5" />
                          Filters
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="bestseller">Best Selling</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 60000) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedCategories.map(catId => {
                    const cat = categories.find(c => c.id === catId);
                    return (
                      <button
                        key={catId}
                        onClick={() => handleCategoryChange(catId)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                      >
                        {cat?.name}
                        <X className="w-3 h-3" />
                      </button>
                    );
                  })}
                  {inStockOnly && (
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                    >
                      In Stock
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No products found</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
