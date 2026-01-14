import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts, getBestSellers } from '@/data/products';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: ReturnType<typeof getFeaturedProducts>;
  viewAllLink: string;
  viewAllText?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  viewAllText = 'View All'
}) => {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-primary font-medium uppercase tracking-wider mb-2">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {title}
            </h2>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to={viewAllLink}>
              {viewAllText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();

  return (
    <>
      {/* Featured Products */}
      <div className="bg-background">
        <ProductSection
          title="Featured Collection"
          subtitle="Hand-picked for You"
          products={featuredProducts}
          viewAllLink="/shop"
        />
      </div>

      {/* Divider */}
      <div className="container-custom">
        <div className="divider-spiritual" />
      </div>

      {/* Best Sellers */}
      <div className="bg-muted/30">
        <ProductSection
          title="Best Sellers"
          subtitle="Most Loved Products"
          products={bestSellers}
          viewAllLink="/shop?sort=bestseller"
          viewAllText="Shop Best Sellers"
        />
      </div>
    </>
  );
};

export default FeaturedProducts;
