import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Compass } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';

const zodiacData: Record<string, { rudraksha: string[]; description: string }> = {
  aries: { rudraksha: ['3 Mukhi Rudraksha', '9 Mukhi Rudraksha'], description: 'For Mars-ruled Aries, these Rudrakshas enhance courage and vitality.' },
  taurus: { rudraksha: ['6 Mukhi Rudraksha', '13 Mukhi Rudraksha'], description: 'Venus-ruled Taurus benefits from these for luxury and emotional balance.' },
  gemini: { rudraksha: ['4 Mukhi Rudraksha', '10 Mukhi Rudraksha'], description: 'Mercury-ruled Gemini gains communication skills and protection.' },
  cancer: { rudraksha: ['2 Mukhi Rudraksha', '15 Mukhi Rudraksha'], description: 'Moon-ruled Cancer finds emotional healing and inner peace.' },
  leo: { rudraksha: ['1 Mukhi Rudraksha', '12 Mukhi Rudraksha'], description: 'Sun-ruled Leo achieves leadership and radiance.' },
  virgo: { rudraksha: ['4 Mukhi Rudraksha', '16 Mukhi Rudraksha'], description: 'Mercury-ruled Virgo gains wisdom and victory over obstacles.' },
  libra: { rudraksha: ['6 Mukhi Rudraksha', '13 Mukhi Rudraksha'], description: 'Venus-ruled Libra achieves balance and harmony.' },
  scorpio: { rudraksha: ['3 Mukhi Rudraksha', '14 Mukhi Rudraksha'], description: 'Mars-ruled Scorpio gains transformation and divine intuition.' },
  sagittarius: { rudraksha: ['5 Mukhi Rudraksha', '7 Mukhi Rudraksha'], description: 'Jupiter-ruled Sagittarius finds wisdom and prosperity.' },
  capricorn: { rudraksha: ['8 Mukhi Rudraksha', '11 Mukhi Rudraksha'], description: 'Saturn-ruled Capricorn achieves success and adventure.' },
  aquarius: { rudraksha: ['8 Mukhi Rudraksha', '17 Mukhi Rudraksha'], description: 'Saturn-ruled Aquarius gains obstacle removal and fortune.' },
  pisces: { rudraksha: ['5 Mukhi Rudraksha', '7 Mukhi Rudraksha'], description: 'Jupiter-ruled Pisces finds peace and prosperity.' },
};

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const RudrakshaCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [recommendation, setRecommendation] = useState<typeof zodiacData['aries'] | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);

  const getZodiacFromDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    return 'pisces';
  };

  const handleCalculate = () => {
    let selectedZodiac = zodiac;
    if (birthDate && !zodiac) {
      selectedZodiac = getZodiacFromDate(birthDate);
      setZodiac(selectedZodiac);
    }

    if (selectedZodiac && zodiacData[selectedZodiac.toLowerCase()]) {
      const data = zodiacData[selectedZodiac.toLowerCase()];
      setRecommendation(data);
      
      // Find matching products
      const matchedProducts = products.filter(p => 
        p.category === 'rudraksha' && 
        data.rudraksha.some(r => p.name.toLowerCase().includes(r.toLowerCase().replace(' rudraksha', '')))
      );
      setRecommendedProducts(matchedProducts);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-mandala opacity-30" />
          <div className="container-custom relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Free Recommendation</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Find Your Perfect <span className="text-gradient-gold">Rudraksha</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover which Rudraksha bead is best suited for you based on your birth date and zodiac sign. 
              Our ancient Vedic wisdom will guide you to the right choice.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="card-spiritual p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
                  Enter Your Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="birthDate" className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Birth Date
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="text-center text-muted-foreground">— OR —</div>

                  <div>
                    <Label htmlFor="zodiac" className="flex items-center gap-2 mb-2">
                      <Compass className="w-4 h-4 text-primary" />
                      Select Your Zodiac Sign
                    </Label>
                    <Select value={zodiac} onValueChange={setZodiac}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your zodiac sign" />
                      </SelectTrigger>
                      <SelectContent>
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign.toLowerCase()} value={sign.toLowerCase()}>
                            {sign}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleCalculate} className="w-full btn-gold py-6 text-base">
                    Get My Recommendation
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Results */}
              {recommendation && (
                <div className="mt-8 animate-fade-in">
                  <div className="card-spiritual p-8 text-center mb-8">
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                      Your Recommended Rudrakshas
                    </h3>
                    <p className="text-muted-foreground mb-6">{recommendation.description}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {recommendation.rudraksha.map((rud) => (
                        <span key={rud} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                          {rud}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Products */}
                  {recommendedProducts.length > 0 && (
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-6 text-center">
                        Shop Your Recommendations
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {recommendedProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Other Calculators */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Explore Other Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/calculators/bracelet" className="card-spiritual p-6 text-center hover:shadow-gold transition-all">
                <span className="text-4xl mb-4 block">💎</span>
                <h3 className="font-display font-bold text-foreground mb-2">Crystal Bracelet Guide</h3>
                <p className="text-sm text-muted-foreground">Find the perfect healing crystal based on your intentions</p>
              </Link>
              <Link to="/calculators/gemstone" className="card-spiritual p-6 text-center hover:shadow-gold transition-all">
                <span className="text-4xl mb-4 block">💍</span>
                <h3 className="font-display font-bold text-foreground mb-2">Gemstone Recommendation</h3>
                <p className="text-sm text-muted-foreground">Discover your astrological gemstone</p>
              </Link>
              <Link to="/calculators/yantra" className="card-spiritual p-6 text-center hover:shadow-gold transition-all">
                <span className="text-4xl mb-4 block">🕉️</span>
                <h3 className="font-display font-bold text-foreground mb-2">Yantra Finder</h3>
                <p className="text-sm text-muted-foreground">Find the right Yantra for your purpose</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RudrakshaCalculator;
