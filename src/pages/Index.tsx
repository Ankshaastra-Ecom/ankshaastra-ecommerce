import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BenefitsSection from '@/components/home/BenefitsSection';
import AboutPreview from '@/components/home/AboutPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
