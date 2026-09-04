import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '@/data/products';

import rudrakshaImg from '@/assets/categories/rudraksha.png';
import crystalsImg from '@/assets/categories/crystals.png';
import malaImg from '@/assets/categories/mala.png';
import gemstonesImg from '@/assets/categories/gemstones.png';
import yantraImg from '@/assets/categories/yantra.png';
import miscellaneousImg from '@/assets/categories/miscellaneous.png';
import vastuPaintingsImg from '@/assets/paintings/vastu-category-hero.webp';

const categoryImages: Record<string, string> = {
  rudraksha: rudrakshaImg,
  crystals: crystalsImg,
  mala: malaImg,
  gemstones: gemstonesImg,
  yantra: yantraImg,
  miscellaneous: miscellaneousImg,
  'vastu-paintings': vastuPaintingsImg,
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

        {/* Categories Grid — mobile-first: snap-scroll row on small screens */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-6 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="snap-start shrink-0 w-[70vw] max-w-[280px] sm:w-[45vw] md:w-auto md:max-w-none md:shrink"
            >
              <Link
                to={`/shop/${category.id}`}
                  className="group relative block active:scale-[0.97] transition-transform duration-150 min-h-[44px]"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="card-spiritual overflow-hidden text-center h-full relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.2), 0 10px 40px hsl(var(--primary) / 0.1)' }} />

                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={categoryImages[category.id]}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      loading="lazy"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-4 relative">
                    {/* Name */}
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                      {category.name}
                    </h3>

                    {/* Item Count */}
                    <p className="text-sm text-muted-foreground">
                      {category.items.length > 0 ? `${category.items.length} Products` : 'Coming Soon'}
                    </p>

                    {/* Arrow with slide animation */}
                    <div className="mt-2 overflow-hidden h-5">
                      <motion.div
                        className="flex items-center justify-center gap-1 text-primary"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
