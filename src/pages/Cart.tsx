import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = React.useState('');

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any spiritual products to your cart yet. 
              Start your spiritual journey today!
            </p>
            <Button asChild size="lg" className="btn-gold">
              <Link to="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = state.total >= 2000 ? 0 : 99;
  const grandTotal = state.total + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Shopping Cart</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card-spiritual overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-border">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product */}
                      <div className="col-span-6 flex gap-4 mb-4 md:mb-0">
                        <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-muted"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-display font-semibold text-foreground hover:text-primary line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground capitalize mt-1">
                            {item.product.category}
                          </p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex items-center gap-1 text-sm text-destructive hover:underline mt-2 md:hidden"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center hidden md:block">
                        <span className="font-medium">₹{item.product.price.toLocaleString()}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center mb-4 md:mb-0">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 flex items-center justify-between md:justify-end">
                        <span className="md:hidden text-muted-foreground">Total:</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-primary">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="hidden md:block p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                  <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-spiritual p-6 sticky top-24">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                {/* Summary Details */}
                <div className="space-y-4 border-t border-border pt-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-sage">
                      ✓ You qualify for free shipping!
                    </p>
                  )}
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(2000 - state.total).toLocaleString()} more for free shipping
                    </p>
                  )}
                  <div className="divider-spiritual" />
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full mt-6 btn-gold py-6 text-base"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Trust Text */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  🔒 Secure checkout powered by trusted payment providers
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
