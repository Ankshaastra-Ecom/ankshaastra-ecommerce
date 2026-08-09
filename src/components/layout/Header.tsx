import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, ChevronDown, LogOut, Package, Shield, Heart, Gift, Ticket, Award } from 'lucide-react';
import SearchDialog from '@/components/search/SearchDialog';
import { Button } from '@/components/ui/button';
import MiniCart from '@/components/cart/MiniCart';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import logo from '@/assets/logo.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { wishlistIds } = useWishlist();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop', hasDropdown: true },
    { name: 'Calculators', href: '/calculators', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const calculatorItems = [
    { name: 'Rudraksha Recommendation', href: '/calculators/rudraksha' },
    { name: 'Crystal Bracelet Guide', href: '/calculators/bracelet' },
    { name: 'Gemstone Recommendation', href: '/calculators/gemstone' },
    { name: 'Carat to Ratti Converter', href: '/calculators/gemstone-converter' },
    { name: 'Yantra Finder', href: '/calculators/yantra' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground py-2 text-center text-sm hidden md:block">
        <span className="font-spiritual">✨ Free Shipping on All Orders | Authentic & Energized Products ✨</span>
      </div>

      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Ankshaastra - Empower Your Name" 
              className="h-12 md:h-16 w-auto rounded-md mix-blend-multiply dark:mix-blend-screen object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown && item.name === 'Shop' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-card shadow-medium">
                      <DropdownMenuItem asChild>
                        <Link to="/shop" className="font-medium">All Products</Link>
                      </DropdownMenuItem>
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link to={`/shop/${category.id}`}>{category.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : item.hasDropdown && item.name === 'Calculators' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-medium">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-card shadow-medium">
                      {calculatorItems.map((calc) => (
                        <DropdownMenuItem key={calc.name} asChild>
                          <Link to={calc.href}>{calc.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden xl:flex items-center space-x-2">
            <a href="https://www.ankshaastra.com/consultation" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="btn-gold text-xs px-3 py-1 h-8 rounded-full">
                📞 Lal Kitab Consultation
              </Button>
            </a>
            <a href="https://www.ankshaastra.com/services/name-correction" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs px-3 py-1 h-8 rounded-full">
                ✍️ Name Correction
              </Button>
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hidden md:flex"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {wishlistIds.length}
                </span>
              )}
            </Button>

            {/* User account dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card shadow-medium">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-orders" className="flex items-center gap-2">
                      <Package className="w-4 h-4" /> My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate('/auth')}>
                <User className="w-5 h-5" />
              </Button>
            )}
            
            {/* Cart */}
            <MiniCart />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <SheetHeader>
                  <SheetTitle className="text-gradient-gold font-display text-2xl">Ankshaastra</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {user && (
                    <div className="py-3 border-b border-border text-sm text-muted-foreground">
                      Signed in as {user.email}
                    </div>
                  )}
                  <Link to="/" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <div className="py-3 border-b border-border">
                    <p className="text-lg font-medium mb-2">Shop</p>
                    <div className="ml-4 space-y-2">
                      <Link to="/shop" className="block py-1 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
                      {categories.map((category) => (
                        <Link key={category.id} to={`/shop/${category.id}`} className="block py-1 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>{category.name}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="py-3 border-b border-border">
                    <p className="text-lg font-medium mb-2">Calculators</p>
                    <div className="ml-4 space-y-2">
                      {calculatorItems.map((calc) => (
                        <Link key={calc.name} to={calc.href} className="block py-1 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>{calc.name}</Link>
                      ))}
                    </div>
                  </div>
                  <Link to="/about" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                  <Link to="/contact" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                  {user ? (
                    <>
                      <Link to="/wishlist" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>My Wishlist</Link>
                      <Link to="/my-orders" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                      <Link to="/rewards" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>My Rewards</Link>
                      <Link to="/gift-cards" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Gift Cards</Link>
                      <Link to="/vouchers" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Vouchers</Link>
                      {isAdmin && <Link to="/admin" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>}
                      <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="block py-3 text-lg font-medium text-destructive w-full text-left">Sign Out</button>
                    </>
                  ) : (
                  <Link to="/auth" className="block py-3 text-lg font-medium border-b border-border" onClick={() => setMobileMenuOpen(false)}>Sign In / Sign Up</Link>
                  )}
                  {/* CTA Links */}
                  <a href="https://www.ankshaastra.com/consultation" target="_blank" rel="noopener noreferrer" className="block py-3 text-lg font-medium text-primary border-b border-border" onClick={() => setMobileMenuOpen(false)}>📞 Lal Kitab Consultation</a>
                  <a href="https://www.ankshaastra.com/services/name-correction" target="_blank" rel="noopener noreferrer" className="block py-3 text-lg font-medium text-primary border-b border-border" onClick={() => setMobileMenuOpen(false)}>✍️ Name Correction</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
