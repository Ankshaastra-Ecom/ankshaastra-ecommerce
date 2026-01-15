import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const { state } = useCart();
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
    { name: 'Yantra Finder', href: '/calculators/yantra' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground py-2 text-center text-sm hidden md:block">
        <span className="font-spiritual">✨ Free Shipping on Orders Above ₹2,000 | Authentic & Energized Products ✨</span>
      </div>

      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">ॐ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-display font-bold text-gradient-gold">Ankshaastra</h1>
              <p className="text-xs text-muted-foreground -mt-1">Spiritual Wellness</p>
            </div>
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

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Button>

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
                  <Link 
                    to="/" 
                    className="block py-3 text-lg font-medium border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="py-3 border-b border-border">
                    <p className="text-lg font-medium mb-2">Shop</p>
                    <div className="ml-4 space-y-2">
                      <Link 
                        to="/shop" 
                        className="block py-1 text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Products
                      </Link>
                      {categories.map((category) => (
                        <Link 
                          key={category.id}
                          to={`/shop/${category.id}`}
                          className="block py-1 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="py-3 border-b border-border">
                    <p className="text-lg font-medium mb-2">Calculators</p>
                    <div className="ml-4 space-y-2">
                      {calculatorItems.map((calc) => (
                        <Link 
                          key={calc.name}
                          to={calc.href}
                          className="block py-1 text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {calc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to="/about" 
                    className="block py-3 text-lg font-medium border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block py-3 text-lg font-medium border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
