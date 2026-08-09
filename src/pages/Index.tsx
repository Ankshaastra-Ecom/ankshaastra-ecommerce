import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BenefitsSection from '@/components/home/BenefitsSection';
import AboutPreview from '@/components/home/AboutPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SEO from '@/components/SEO';

const Index: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ankshaastra',
    url: 'https://shop.ankshaastra.com',
    description: 'Shop authentic Rudraksha, healing crystal bracelets, sacred Yantras & spiritual products energized with Vedic mantras.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shop.ankshaastra.com/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Ankshaastra — Authentic Rudraksha, Crystals & Spiritual Products"
        description="Shop lab-certified Rudraksha, healing crystal bracelets, sacred Yantras, gemstones & spiritual products. Energized with Vedic mantras. Free shipping on all orders."
        canonical="/"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <CategoriesSection />
        <FeaturedProducts />
        <AboutPreview />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
