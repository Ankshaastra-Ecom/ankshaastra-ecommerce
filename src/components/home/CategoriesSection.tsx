import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

import rudrakshaImg from '@/assets/categories/rudraksha.png';
import crystalsImg from '@/assets/categories/crystals.png';
import malaImg from '@/assets/categories/mala.png';
import gemstonesImg from '@/assets/categories/gemstones.png';
import yantraImg from '@/assets/categories/yantra.png';
import miscellaneousImg from '@/assets/categories/miscellaneous.png';

const categoryImages: Record<string, string> = {
  rudraksha: rudrakshaImg,
  crystals: crystalsImg,
  mala: malaImg,
  gemstones: gemstonesImg,
  yantra: yantraImg,
  miscellaneous: miscellaneousImg,
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
              <div className="card-spiritual overflow-hidden text-center h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-gold">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={categoryImages[category.id]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  {/* Name */}
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {category.name}
                  </h3>

                  {/* Item Count */}
                  <p className="text-sm text-muted-foreground">
                    {category.items.length > 0 ? `${category.items.length} Products` : 'Coming Soon'}
                  </p>

                  {/* Arrow */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 mx-auto text-primary" />
                  </div>
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
