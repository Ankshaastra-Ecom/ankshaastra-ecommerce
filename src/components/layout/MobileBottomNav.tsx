import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import SearchDialog from '@/components/search/SearchDialog';

const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Home', path: '/', action: () => navigate('/') },
    { icon: Search, label: 'Search', path: '', action: () => setSearchOpen(true) },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', action: () => navigate('/cart'), badge: state.itemCount },
    { icon: User, label: 'Account', path: user ? '/my-orders' : '/auth', action: () => navigate(user ? '/my-orders' : '/auth') },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`relative flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors ${
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default MobileBottomNav;
