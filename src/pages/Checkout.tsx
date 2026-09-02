import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, MapPin, ChevronRight, ShieldCheck, Loader2, Tag, FileText } from 'lucide-react';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import PincodeChecker from '@/components/checkout/PincodeChecker';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { downloadInvoice } from '@/utils/generateInvoice';
import { ORDER_STORAGE_KEY, type StoredOrder } from '@/pages/OrderConfirmation';


type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; flatAmount?: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [pincodeVerified, setPincodeVerified] = useState(false);
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

  const shipping = 0; // Always free shipping
  const discountAmount = appliedCoupon
    ? appliedCoupon.flatAmount ?? Math.round(state.total * appliedCoupon.discount / 100)
    : 0;
  const grandTotal = Math.max(0, state.total - discountAmount + shipping);

  // Load voucher from cart page if applied there
  React.useEffect(() => {
    if (appliedCoupon) return;
    const saved = localStorage.getItem('applied_voucher');
    if (saved) {
      try {
        const v = JSON.parse(saved);
        setAppliedCoupon({ code: v.code, discount: 0, flatAmount: v.discount });
      } catch {}
    }
  }, []);

  const handleApplyCoupon = async () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Hardcoded legacy code
    if (code === 'REVIEW') {
      setAppliedCoupon({ code, discount: 10 });
      toast({ title: 'Coupon Applied!', description: `10% off — you save ₹${Math.round(state.total * 0.1).toLocaleString()}` });
      return;
    }

    // Validate against database vouchers
    const { data, error } = await supabase
      .from('vouchers')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (data.valid_until && new Date(data.valid_until) < new Date()) {
      setCouponError('This voucher has expired');
      return;
    }
    if (state.total < Number(data.min_order_amount)) {
      setCouponError(`Minimum order ₹${Number(data.min_order_amount).toLocaleString()} required`);
      return;
    }

    let flat = 0;
    if (data.discount_type === 'percentage') {
      flat = Math.round((state.total * Number(data.discount_value)) / 100);
      if (data.max_discount) flat = Math.min(flat, Number(data.max_discount));
    } else {
      flat = Number(data.discount_value);
    }

    setAppliedCoupon({ code, discount: 0, flatAmount: flat });
    localStorage.setItem('applied_voucher', JSON.stringify({ code, discount: flat, description: data.description }));
    toast({ title: '🎉 Coupon Applied!', description: `You save ₹${flat.toLocaleString()}` });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    localStorage.removeItem('applied_voucher');
  };

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

  const buildWhatsAppOrderMessage = (orderNum: string) => {
    const itemsList = state.items
      .map(item => `• ${item.product.name} x${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = `🙏 *New Order from Ankshaastra*\n\n` +
      `*Order #${orderNum}*\n\n` +
      `*Customer:* ${shippingInfo.firstName} ${shippingInfo.lastName}\n` +
      `*Phone:* ${shippingInfo.phone}\n` +
      `*Email:* ${shippingInfo.email}\n\n` +
      `*Shipping Address:*\n${shippingInfo.address}\n${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ₹${state.total.toLocaleString()}\n` +
      (appliedCoupon ? `*Discount (${appliedCoupon.code}):* -₹${discountAmount.toLocaleString()}\n` : '') +
      `*Shipping:* ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n` +
      `*Total:* ₹${grandTotal.toLocaleString()}\n\n` +
      `*Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card'}`;

    return encodeURIComponent(message);
  };

  // Called once payment is placed/confirmed (COD immediately, or Razorpay after verification)
  const finalizeOrderUi = (orderNum: string) => {
    setOrderNumber(orderNum);
    const whatsappMessage = buildWhatsAppOrderMessage(orderNum);
    window.open(`https://wa.me/919667305577?text=${whatsappMessage}`, '_blank');

    const snapshot: StoredOrder = {
      orderNumber: orderNum,
      orderDate: new Date().toISOString(),
      customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      email: shippingInfo.email,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: shippingInfo.pincode,
      paymentMethod,
      subtotal: state.total,
      discount: discountAmount,
      shipping,
      total: grandTotal,
      items: state.items.map((i) => ({ name: i.product.name, price: i.product.price, quantity: i.quantity })),
    };
    try {
      sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      /* storage may be unavailable */
    }

    clearCart();
    localStorage.removeItem('applied_voucher');
    navigate(`/order-confirmation/${orderNum}`);
  };


  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderNum = `GM${Date.now().toString().slice(-8)}`;
    const shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`;

    try {
      // 1. Insert order into database (always starts as pending)
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNum,
          user_id: user?.id || null,
          shipping_first_name: shippingInfo.firstName,
          shipping_last_name: shippingInfo.lastName,
          shipping_email: shippingInfo.email,
          shipping_phone: shippingInfo.phone,
          shipping_address: shippingInfo.address,
          shipping_city: shippingInfo.city,
          shipping_state: shippingInfo.state,
          shipping_pincode: shippingInfo.pincode,
          payment_method: paymentMethod as 'cod' | 'upi' | 'card',
          subtotal: state.total,
          shipping,
          total: grandTotal,
          notes: appliedCoupon ? `Coupon: ${appliedCoupon.code} (${appliedCoupon.discount}% off, -₹${discountAmount})` : null,
          status: 'pending',
          payment_status: 'pending',
        })
        .select('id')
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        product_id: null,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // --- Cash on Delivery: no payment gateway needed, confirm immediately ---
      if (paymentMethod === 'cod') {
        supabase.functions.invoke('send-order-email', {
          body: {
            to: shippingInfo.email,
            customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            customerPhone: shippingInfo.phone,
            orderNumber: orderNum,
            orderDate: new Date().toISOString(),
            items: state.items.map(item => ({
              product_name: item.product.name,
              product_price: item.product.price,
              quantity: item.quantity,
              total: item.product.price * item.quantity,
            })),
            subtotal: state.total,
            shipping,
            total: grandTotal,
            paymentMethod,
            shippingAddress,
            shippingCity: shippingInfo.city,
            shippingState: shippingInfo.state,
            shippingPincode: shippingInfo.pincode,
          },
        }).catch(err => console.error('Email send failed:', err));

        finalizeOrderUi(orderNum);
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${orderNum} has been confirmed.`,
        });
        setIsSubmitting(false);
        return;
      }

      // --- UPI / Card: pay via Razorpay Checkout ---
      const { data: rzpOrder, error: rzpError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { orderId: order.id, amount: grandTotal, receipt: orderNum },
      });

      if (rzpError || !rzpOrder || rzpOrder.error) {
        throw new Error(rzpOrder?.error || rzpError?.message || 'Could not start payment. Please try again.');
      }

      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway failed to load. Please check your internet connection and try again.');
      }

      const razorpay = new window.Razorpay({
        key: rzpOrder.keyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: 'Ankshaastra',
        description: `Order ${orderNum}`,
        order_id: rzpOrder.razorpayOrderId,
        prefill: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        notes: { order_number: orderNum },
        theme: { color: '#b8860b' },
        handler: async (response) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
              body: {
                orderId: order.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (verifyError || !verifyData || verifyData.error) {
              throw new Error(verifyData?.error || verifyError?.message || 'Payment verification failed');
            }

            finalizeOrderUi(orderNum);
            toast({
              title: "Payment Successful!",
              description: `Your order ${orderNum} has been confirmed.`,
            });
          } catch (verifyErr: any) {
            console.error('Payment verification error:', verifyErr);
            toast({
              title: "Payment received, confirmation pending",
              description: "We're verifying your payment. If this doesn't resolve shortly, please contact support with your order number: " + orderNum,
              variant: "destructive",
            });
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            toast({
              title: "Payment Cancelled",
              description: "Your order is saved as pending. You can retry payment anytime.",
            });
          },
        },
      });

      razorpay.on('payment.failed', () => {
        setIsSubmitting(false);
        toast({
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again or choose a different method.",
          variant: "destructive",
        });
      });

      razorpay.open();
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
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

          <CheckoutProgress currentStep={currentStep} />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="card-spiritual p-6">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Shipping Information
                  </h2>
                  {!user && (
                    <p className="mb-6 text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      Checkout as guest — no account needed.
                    </p>
                  )}
                  {user && <div className="mb-6" />}

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
                    
                    {/* Pincode Serviceability Check */}
                    <PincodeChecker 
                      defaultPincode={shippingInfo.pincode}
                      onPincodeVerified={(pin, isServiceable) => {
                        setPincodeVerified(isServiceable);
                        if (isServiceable && pin !== shippingInfo.pincode) {
                          setShippingInfo({ ...shippingInfo, pincode: pin });
                        }
                      }}
                    />

                    <Button 
                      type="submit" 
                      className="w-full btn-gold py-6 text-base mt-6"
                      disabled={!pincodeVerified && shippingInfo.pincode.length === 6}
                    >
                      Continue to Payment
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                    {!pincodeVerified && shippingInfo.pincode.length === 6 && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Please verify delivery availability for your pincode
                      </p>
                    )}
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
                      <Button type="submit" className="flex-1 btn-gold py-6 text-base" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 w-5 h-5 animate-spin" /> : null}
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        {!isSubmitting && <ChevronRight className="ml-2 w-5 h-5" />}
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

                  {/* Download Invoice Button */}
                  <Button
                    variant="outline"
                    className="mb-6"
                    onClick={() => {
                      downloadInvoice({
                        orderNumber,
                        orderDate: new Date().toISOString(),
                        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                        customerEmail: shippingInfo.email,
                        customerPhone: shippingInfo.phone,
                        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
                        items: state.items.map(item => ({
                          name: item.product.name,
                          price: item.product.price,
                          quantity: item.quantity,
                          total: item.product.price * item.quantity,
                        })),
                        subtotal: state.total,
                        shipping: 0,
                        discount: discountAmount || undefined,
                        couponCode: appliedCoupon?.code,
                        total: grandTotal,
                        paymentMethod,
                      });
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download GST Invoice
                  </Button>

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

                  {/* Coupon Code */}
                  <div className="border-t border-border pt-4 mb-4">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Coupon Code
                    </label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-primary/10 rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-primary">{appliedCoupon.code} ({appliedCoupon.discount}% off)</span>
                        <button onClick={handleRemoveCoupon} className="text-xs text-destructive hover:underline">Remove</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                          placeholder="Enter code"
                          className="flex-1 text-sm"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={handleApplyCoupon}>
                          Apply
                        </Button>
                      </div>
                    )}
                    {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{state.total.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sage">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-sage font-medium">FREE</span>
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


