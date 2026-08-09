import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, Copy } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const Wishlist: React.FC = () => {
  const { wishlistIds, loading } = useWishlist();
  const { user } = useAuth();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const shareText = wishlistProducts.map((p) => `• ${p.name} - ₹${p.price.toLocaleString()}`).join('\n');
  const shareMessage = `My Ankshaastra Wishlist:\n\n${shareText}\n\nExplore: ${window.location.origin}/wishlist`;

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const copyWishlist = async () => {
    await navigator.clipboard.writeText(shareMessage);
    toast({ title: 'Wishlist copied', description: 'Share it anywhere you like.' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
          My Wishlist
        </h1>

        {!user ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">Sign in to view your wishlist</h2>
            <p className="text-muted-foreground mb-6">Save your favorite products and access them anytime.</p>
            <Button asChild className="btn-gold">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading your wishlist...</p>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Browse our collection and save items you love.</p>
            <Button asChild className="btn-gold">
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Button variant="outline" size="sm" onClick={shareOnWhatsApp}>
                <Share2 className="w-4 h-4 mr-1" /> Share on WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={copyWishlist}>
                <Copy className="w-4 h-4 mr-1" /> Copy Wishlist
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
