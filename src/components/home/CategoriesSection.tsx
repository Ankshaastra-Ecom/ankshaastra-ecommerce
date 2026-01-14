import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

const categoryImages: Record<string, string> = {
  rudraksha: '🔮',
  crystals: '💎',
  mala: '📿',
  gemstones: '💍',
  yantra: '🕉️',
  miscellaneous: '✨',
};

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-wider mb-2">Explore Our Collections</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Sacred Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of spiritual products, each chosen for its authentic healing properties and divine energy.
          </p>
          <div className="divider-spiritual max-w-xs mx-auto mt-6" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop/${category.id}`}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-spiritual p-6 text-center h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-gold">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {categoryImages[category.id]}
                </div>

                {/* Name */}
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {category.name}
                </h3>

                {/* Item Count */}
                <p className="text-sm text-muted-foreground">
                  {category.items.length} Products
                </p>

                {/* Arrow */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 mx-auto text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
