import React from 'react';
import { Check, ShoppingCart, Truck, CreditCard, Package } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'cart' | 'shipping' | 'payment' | 'confirmation';
}

const steps = [
  { id: 'cart', name: 'Cart', icon: ShoppingCart },
  { id: 'shipping', name: 'Shipping', icon: Truck },
  { id: 'payment', name: 'Payment', icon: CreditCard },
  { id: 'confirmation', name: 'Confirmation', icon: Package },
];

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                index < currentIndex
                  ? 'bg-sage text-sage-foreground'
                  : index === currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentIndex ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={`ml-2 hidden sm:inline text-sm font-medium ${
                index <= currentIndex ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 md:w-16 h-0.5 mx-2 transition-colors ${
                index < currentIndex ? 'bg-sage' : 'bg-muted'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutProgress;
