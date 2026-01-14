import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNumber, setOrderNumber] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = state.total >= 2000 ? 0 : 99;
  const grandTotal = state.total + shipping;

  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Invalid email address';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(shippingInfo.phone)) newErrors.phone = 'Invalid phone number';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(shippingInfo.pincode)) newErrors.pincode = 'Invalid pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate order number
    const orderNum = `GM${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setCurrentStep('confirmation');
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderNum} has been confirmed.`,
    });
  };

  const steps = [
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'confirmation', name: 'Confirmation', icon: Check },
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

  if (state.items.length === 0 && currentStep !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/cart" className="hover:text-primary">Cart</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Checkout</span>
          </nav>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= getCurrentStepIndex()
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < getCurrentStepIndex() ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`ml-2 hidden sm:inline font-medium ${
                      index <= getCurrentStepIndex() ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-24 h-0.5 mx-2 ${
                      index < getCurrentStepIndex() ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="card-spiritual p-6">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className={errors.address ? 'border-destructive' : ''}
                      />
                      {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className={errors.city ? 'border-destructive' : ''}
                        />
                        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className={errors.state ? 'border-destructive' : ''}
                        />
                        {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={shippingInfo.pincode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                          className={errors.pincode ? 'border-destructive' : ''}
                        />
                        {errors.pincode && <p className="text-sm text-destructive mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                    <Button type="submit" className="w-full btn-gold py-6 text-base mt-6">
                      Continue to Payment
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="card-spiritual p-6">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Payment Method
                  </h2>
                  <form onSubmit={handlePaymentSubmit}>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <span className="font-medium">Cash on Delivery (COD)</span>
                          <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex-1 cursor-pointer">
                          <span className="font-medium">UPI Payment</span>
                          <p className="text-sm text-muted-foreground">Pay using GPay, PhonePe, Paytm, etc.</p>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <span className="font-medium">Credit / Debit Card</span>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay accepted</p>
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2 mt-6 p-4 bg-muted/50 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-sage" />
                      <span className="text-sm text-muted-foreground">
                        Your payment information is secure and encrypted
                      </span>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep('shipping')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 btn-gold py-6 text-base">
                        Place Order
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="card-spiritual p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-sage" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Thank You for Your Order!
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    Your order has been placed successfully.
                  </p>
                  <p className="text-lg font-medium text-primary mb-6">
                    Order Number: {orderNumber}
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                    <p className="text-sm text-muted-foreground">
                      We've sent a confirmation email to <strong>{shippingInfo.email}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimated delivery: 5-7 business days
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild variant="outline">
                      <Link to="/shop">Continue Shopping</Link>
                    </Button>
                    <Button asChild className="btn-gold">
                      <Link to="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {currentStep !== 'confirmation' && (
              <div className="lg:col-span-1">
                <div className="card-spiritual p-6 sticky top-24">
                  <h2 className="text-xl font-display font-bold text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{state.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    <div className="divider-spiritual" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
