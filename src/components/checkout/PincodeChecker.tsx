import React, { useState } from 'react';
import { MapPin, Check, X, Loader2, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PincodeCheckerProps {
  onPincodeVerified?: (pincode: string, isServiceable: boolean) => void;
  defaultPincode?: string;
  compact?: boolean;
}

// Indian serviceable pincodes - major cities and regions
// In production, this would be an API call to a shipping provider
const SERVICEABLE_PINCODE_RANGES = [
  // Delhi NCR
  { start: 110001, end: 110099 },
  // Noida / Greater Noida
  { start: 201301, end: 201320 },
  // Gurgaon / Gurugram
  { start: 122001, end: 122099 },
  // Mumbai
  { start: 400001, end: 400099 },
  // Bangalore
  { start: 560001, end: 560099 },
  // Chennai
  { start: 600001, end: 600099 },
  // Kolkata
  { start: 700001, end: 700099 },
  // Hyderabad
  { start: 500001, end: 500099 },
  // Pune
  { start: 411001, end: 411099 },
  // Ahmedabad
  { start: 380001, end: 380099 },
  // Jaipur
  { start: 302001, end: 302099 },
  // Lucknow
  { start: 226001, end: 226099 },
  // Chandigarh
  { start: 160001, end: 160099 },
  // All India general (for demo - most 6-digit pincodes)
  { start: 100000, end: 899999 },
];

const METRO_PINCODES = [
  // Delhi
  110001, 110002, 110003, 110004, 110005,
  // Mumbai
  400001, 400002, 400003, 400004, 400005,
  // Bangalore
  560001, 560002, 560003, 560004, 560005,
];

const checkPincodeServiceability = (pincode: string): { serviceable: boolean; deliveryDays: string; express: boolean } => {
  const pin = parseInt(pincode, 10);
  
  if (isNaN(pin) || pincode.length !== 6) {
    return { serviceable: false, deliveryDays: '', express: false };
  }

  const isMetro = METRO_PINCODES.some(metro => Math.abs(metro - pin) < 100);
  
  const isServiceable = SERVICEABLE_PINCODE_RANGES.some(
    range => pin >= range.start && pin <= range.end
  );

  if (!isServiceable) {
    return { serviceable: false, deliveryDays: '', express: false };
  }

  if (isMetro) {
    return { serviceable: true, deliveryDays: '2-3 days', express: true };
  }

  return { serviceable: true, deliveryDays: '5-7 days', express: false };
};

const PincodeChecker: React.FC<PincodeCheckerProps> = ({ 
  onPincodeVerified, 
  defaultPincode = '',
  compact = false 
}) => {
  const [pincode, setPincode] = useState(defaultPincode);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    checked: boolean;
    serviceable: boolean;
    deliveryDays: string;
    express: boolean;
  } | null>(null);

  const handleCheck = async () => {
    if (pincode.length !== 6) return;
    
    setChecking(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const serviceability = checkPincodeServiceability(pincode);
    setResult({
      checked: true,
      ...serviceability,
    });
    
    onPincodeVerified?.(pincode, serviceability.serviceable);
    setChecking(false);
  };

  const handlePincodeChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    setPincode(cleaned);
    setResult(null);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              placeholder="Enter pincode"
              className="pl-10"
              maxLength={6}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleCheck}
            disabled={pincode.length !== 6 || checking}
          >
            {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
          </Button>
        </div>
        
        {result && (
          <div className={`flex items-center gap-2 text-sm ${result.serviceable ? 'text-sage' : 'text-destructive'}`}>
            {result.serviceable ? (
              <>
                <Check className="w-4 h-4" />
                <span>Delivery available — {result.deliveryDays}</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span>Delivery not available at this pincode</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="w-5 h-5 text-primary" />
        <span className="font-medium text-foreground">Check Delivery Availability</span>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            placeholder="Enter 6-digit pincode"
            className="pl-10"
            maxLength={6}
          />
        </div>
        <Button 
          onClick={handleCheck}
          disabled={pincode.length !== 6 || checking}
          className="min-w-[100px]"
        >
          {checking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Check'
          )}
        </Button>
      </div>

      {result && (
        <div className={`mt-3 p-3 rounded-md ${
          result.serviceable 
            ? 'bg-sage/10 border border-sage/20' 
            : 'bg-destructive/10 border border-destructive/20'
        }`}>
          {result.serviceable ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sage font-medium">
                <Check className="w-4 h-4" />
                <span>Delivery Available!</span>
              </div>
              <div className="text-sm text-muted-foreground pl-6">
                <p>Estimated delivery: <span className="font-medium text-foreground">{result.deliveryDays}</span></p>
                {result.express && (
                  <p className="text-sage">🚀 Express delivery available for this location</p>
                )}
                <p className="mt-1">✓ Free shipping on all orders</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-destructive">
              <X className="w-4 h-4" />
              <div>
                <p className="font-medium">Delivery not available</p>
                <p className="text-sm text-muted-foreground">
                  We currently don't deliver to this pincode. Please try a different address.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;
