import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Loader2, ChevronDown, Info } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

// ============== BRACELET MASTER DATA ==============

interface BraceletInfo {
  name: string;
  color: string;
  colorHex: string;
  element: string;
  planet: string;
  chakra: string;
  benefits: string[];
  bestFor: string;
  wearingHand: string;
  productId: string;
}

const braceletData: Record<string, BraceletInfo> = {
  'Amethyst Bracelet': {
    name: 'Amethyst Bracelet',
    color: 'Purple',
    colorHex: '#9b59b6',
    element: 'Air',
    planet: 'Saturn/Jupiter',
    chakra: 'Crown & Third Eye',
    benefits: ['Calms overthinking & anxiety', 'Enhances intuition', 'Promotes restful sleep', 'Spiritual protection', 'Helps break negative patterns'],
    bestFor: 'Mental health, stress relief, spiritual seekers',
    wearingHand: 'Left hand',
    productId: 'cry-32',
  },
  'Green Aventurine Bracelet': {
    name: 'Green Aventurine Bracelet',
    color: 'Green',
    colorHex: '#27ae60',
    element: 'Earth',
    planet: 'Venus',
    chakra: 'Heart',
    benefits: ['Attracts luck & opportunities', 'Boosts confidence', 'Promotes emotional calm', 'Good for new beginnings', 'Enhances prosperity'],
    bestFor: 'Luck, growth, financial abundance',
    wearingHand: 'Left hand',
    productId: 'cry-27',
  },
  'Rose Quartz Bracelet': {
    name: 'Rose Quartz Bracelet',
    color: 'Pink',
    colorHex: '#e8a0bf',
    element: 'Water',
    planet: 'Venus',
    chakra: 'Heart',
    benefits: ['Attracts love & romance', 'Heals emotional wounds', 'Promotes self-love', 'Strengthens relationships', 'Brings inner peace'],
    bestFor: 'Love, relationships, emotional healing',
    wearingHand: 'Left hand',
    productId: 'cry-28',
  },
  'Citrine Bracelet': {
    name: 'Citrine Bracelet',
    color: 'Yellow/Golden',
    colorHex: '#f1c40f',
    element: 'Fire',
    planet: 'Sun/Jupiter',
    chakra: 'Solar Plexus',
    benefits: ['Manifests abundance & wealth', 'Boosts motivation', 'Clears negative energy', 'Enhances creativity', 'Brings joy & positivity'],
    bestFor: 'Wealth, creativity, confidence',
    wearingHand: 'Right hand',
    productId: 'cry-35',
  },
  'Pyrite Premium Bracelet': {
    name: 'Pyrite Premium Bracelet',
    color: 'Gold/Metallic',
    colorHex: '#d4a017',
    element: 'Earth/Fire',
    planet: 'Sun/Mars',
    chakra: 'Solar Plexus',
    benefits: ['Powerful money magnet', 'Shields from negative energy', 'Boosts willpower & confidence', 'Attracts business success', 'Stimulates intellect'],
    bestFor: 'Financial growth, business, ambition',
    wearingHand: 'Right hand',
    productId: 'cry-34',
  },
  'Moonstone Bracelet': {
    name: 'Moonstone Bracelet',
    color: 'White/Iridescent',
    colorHex: '#bdc3c7',
    element: 'Water',
    planet: 'Moon',
    chakra: 'Crown & Sacral',
    benefits: ['Enhances intuition', 'Balances emotions', 'Supports fertility & pregnancy', 'Good for new beginnings', 'Calming & soothing energy'],
    bestFor: 'Emotional balance, intuition, feminine energy',
    wearingHand: 'Left hand',
    productId: 'cry-20',
  },
  'Sunstone Bracelet': {
    name: 'Sunstone Bracelet',
    color: 'Orange/Gold',
    colorHex: '#e67e22',
    element: 'Fire',
    planet: 'Sun',
    chakra: 'Sacral & Solar Plexus',
    benefits: ['Boosts confidence & leadership', 'Brings joy & vitality', 'Removes self-doubt', 'Attracts good fortune', 'Energizes & motivates'],
    bestFor: 'Confidence, leadership, positivity',
    wearingHand: 'Right hand',
    productId: 'cry-36',
  },
  'Clear Quartz Bracelet': {
    name: 'Clear Quartz Bracelet',
    color: 'Clear/White',
    colorHex: '#ecf0f1',
    element: 'All elements',
    planet: 'Sun/Moon',
    chakra: 'Crown (amplifies all)',
    benefits: ['Master healer & amplifier', 'Enhances clarity of thought', 'Boosts all other crystals', 'Removes mental fog', 'Aligns all energies'],
    bestFor: 'Clarity, focus, amplifying intentions',
    wearingHand: 'Either hand',
    productId: 'cry-25', // using 7 Chakra as proxy since no clear quartz product exists
  },
  'Turquoise Bracelet': {
    name: 'Turquoise Bracelet',
    color: 'Blue-Green',
    colorHex: '#1abc9c',
    element: 'Air/Water',
    planet: 'Venus/Neptune',
    chakra: 'Throat',
    benefits: ['Promotes communication skills', 'Brings good fortune', 'Protects during travel', 'Enhances leadership', 'Balances all energies'],
    bestFor: 'Communication, travel, protection',
    wearingHand: 'Left hand',
    productId: 'cry-22',
  },
  'Bloodstone Bracelet': {
    name: 'Bloodstone Bracelet',
    color: 'Dark Green with Red',
    colorHex: '#1a5e2a',
    element: 'Earth',
    planet: 'Mars',
    chakra: 'Root',
    benefits: ['Boosts courage & strength', 'Enhances physical energy', 'Removes negative energy', 'Good for health & vitality', 'Brings determination'],
    bestFor: 'Courage, health, vitality',
    wearingHand: 'Right hand',
    productId: 'cry-18',
  },
  'Mother of Pearl Bracelet': {
    name: 'Mother of Pearl Bracelet',
    color: 'Iridescent White',
    colorHex: '#f5f0e8',
    element: 'Water',
    planet: 'Moon',
    chakra: 'Crown & Heart',
    benefits: ['Brings calming energy', 'Enhances intuition', 'Promotes prosperity', 'Strengthens emotional clarity', 'Good for family harmony'],
    bestFor: 'Calm, intuition, family harmony',
    wearingHand: 'Left hand',
    productId: 'cry-20', // using moonstone as proxy
  },
  'Golden Obsidian Bracelet': {
    name: 'Golden Obsidian Bracelet',
    color: 'Gold/Black',
    colorHex: '#2c2c2c',
    element: 'Fire/Earth',
    planet: 'Saturn/Sun',
    chakra: 'Root & Solar Plexus',
    benefits: ['Powerful protection stone', 'Reflects negative energy', 'Reveals truth & clarity', 'Boosts self-confidence', 'Grounds scattered energy'],
    bestFor: 'Protection, confidence, grounding',
    wearingHand: 'Left hand',
    productId: 'cry-30', // cats eye black as proxy
  },
  'Dragon Vein Agate Bracelet': {
    name: 'Dragon Vein Agate Bracelet',
    color: 'Multi-color veined',
    colorHex: '#8e44ad',
    element: 'Earth',
    planet: 'Mercury',
    chakra: 'Root & Sacral',
    benefits: ['Brings stability & grounding', 'Enhances creativity', 'Promotes strength & courage', 'Balances energy', 'Attracts good luck'],
    bestFor: 'Stability, creativity, grounding',
    wearingHand: 'Either hand',
    productId: 'cry-29',
  },
  'Azurite Bracelet': {
    name: 'Azurite Bracelet',
    color: 'Deep Blue',
    colorHex: '#2980b9',
    element: 'Air/Water',
    planet: 'Jupiter/Venus',
    chakra: 'Third Eye & Throat',
    benefits: ['Enhances intellectual power', 'Stimulates creativity', 'Improves communication', 'Deepens meditation', 'Brings mental clarity'],
    bestFor: 'Study, intellect, creativity',
    wearingHand: 'Left hand',
    productId: 'cry-31',
  },
  'Smile Bracelet (Green Jade)': {
    name: 'Smile Bracelet (Green Jade)',
    color: 'Green',
    colorHex: '#2ecc71',
    element: 'Earth',
    planet: 'Venus/Mercury',
    chakra: 'Heart',
    benefits: ['Symbol of purity & harmony', 'Attracts good luck & prosperity', 'Promotes wisdom', 'Brings emotional balance', 'Protective & nurturing energy'],
    bestFor: 'Luck, harmony, wisdom',
    wearingHand: 'Left hand',
    productId: 'cry-26',
  },
  'Red Jasper Bracelet': {
    name: 'Red Jasper Bracelet',
    color: 'Red/Brown',
    colorHex: '#c0392b',
    element: 'Earth',
    planet: 'Mars',
    chakra: 'Root',
    benefits: ['Boosts stamina & endurance', 'Grounding energy', 'Emotional stability', 'Physical vitality', 'Courage & determination'],
    bestFor: 'Stamina, grounding, courage',
    wearingHand: 'Right hand',
    productId: 'cry-33',
  },
};

// ============== RASHI MAPPING ==============

const rashiToBracelet: Record<string, { primary: string; alternative: string }> = {
  'Aries': { primary: 'Red Jasper Bracelet', alternative: 'Bloodstone Bracelet' },
  'Taurus': { primary: 'Rose Quartz Bracelet', alternative: 'Green Aventurine Bracelet' },
  'Gemini': { primary: 'Citrine Bracelet', alternative: 'Clear Quartz Bracelet' },
  'Cancer': { primary: 'Moonstone Bracelet', alternative: 'Mother of Pearl Bracelet' },
  'Leo': { primary: 'Sunstone Bracelet', alternative: 'Golden Obsidian Bracelet' },
  'Virgo': { primary: 'Green Aventurine Bracelet', alternative: 'Azurite Bracelet' },
  'Libra': { primary: 'Rose Quartz Bracelet', alternative: 'Turquoise Bracelet' },
  'Scorpio': { primary: 'Amethyst Bracelet', alternative: 'Bloodstone Bracelet' },
  'Sagittarius': { primary: 'Turquoise Bracelet', alternative: 'Sunstone Bracelet' },
  'Capricorn': { primary: 'Pyrite Premium Bracelet', alternative: 'Dragon Vein Agate Bracelet' },
  'Aquarius': { primary: 'Amethyst Bracelet', alternative: 'Clear Quartz Bracelet' },
  'Pisces': { primary: 'Moonstone Bracelet', alternative: 'Smile Bracelet (Green Jade)' },
};

// ============== PURPOSE MAPPING ==============

const purposeToBracelet: Record<string, string[]> = {
  'General': ['Green Aventurine Bracelet', 'Clear Quartz Bracelet'],
  'For Stability': ['Dragon Vein Agate Bracelet', 'Bloodstone Bracelet'],
  'For Overall Growth': ['Citrine Bracelet', 'Green Aventurine Bracelet'],
  'For Educational Growth': ['Clear Quartz Bracelet', 'Azurite Bracelet'],
  'For Enhanced Financial Growth': ['Pyrite Premium Bracelet', 'Citrine Bracelet'],
  'For Enhanced Business Growth and Concentration': ['Pyrite Premium Bracelet', 'Golden Obsidian Bracelet'],
  'For Great Wealth': ['Pyrite Premium Bracelet', 'Citrine Bracelet', 'Green Aventurine Bracelet'],
  'For Love and Affection': ['Rose Quartz Bracelet', 'Moonstone Bracelet'],
  'For Creativity': ['Sunstone Bracelet', 'Citrine Bracelet'],
  'For Wealth and Prosperity': ['Pyrite Premium Bracelet', 'Citrine Bracelet'],
  'For Respect, Dignity & Confidence': ['Sunstone Bracelet', 'Golden Obsidian Bracelet'],
  'For Enhanced Mental Health': ['Amethyst Bracelet', 'Rose Quartz Bracelet'],
  'For Love & Relationship Matters': ['Rose Quartz Bracelet', 'Moonstone Bracelet'],
  'For Good Decision Making': ['Clear Quartz Bracelet', 'Azurite Bracelet'],
  'For Overcoming Deep Overthinking Issues': ['Amethyst Bracelet', 'Clear Quartz Bracelet'],
};

const purposes = Object.keys(purposeToBracelet);

// ============== RASHI CALCULATOR ==============

function getRashiFromDate(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return 'Aries';
  if ((month === 4 && day >= 21) || (month === 5 && day <= 21)) return 'Taurus';
  if ((month === 5 && day >= 22) || (month === 6 && day <= 21)) return 'Gemini';
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 23)) return 'Virgo';
  if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return 'Libra';
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return 'Scorpio';
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return 'Capricorn';
  if ((month === 1 && day >= 21) || (month === 2 && day <= 19)) return 'Aquarius';
  return 'Pisces';
}

// ============== CATALOGUE DATA ==============

const allBracelets = Object.values(braceletData);

// ============== COMPONENT ==============

const BraceletCalculator: React.FC = () => {
  // Lead capture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Tabs
  const [activeTab, setActiveTab] = useState<'birth' | 'purpose'>('birth');

  // Birth tab
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [noTime, setNoTime] = useState(false);
  const [birthPlace, setBirthPlace] = useState('');

  // Purpose tab
  const [purpose, setPurpose] = useState('');

  // Results
  const [results, setResults] = useState<{ bracelets: BraceletInfo[]; labels: string[]; isGreatWealth?: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const validateLead = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateLead()) return;

    if (activeTab === 'birth' && !dob) {
      return;
    }
    if (activeTab === 'purpose' && !purpose) {
      return;
    }

    setLoading(true);
    setResults(null);

    setTimeout(() => {
      let bracelets: BraceletInfo[] = [];
      let labels: string[] = [];
      let isGreatWealth = false;

      if (activeTab === 'birth') {
        const date = new Date(dob);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const rashi = getRashiFromDate(month, day);
        const mapping = rashiToBracelet[rashi];
        if (mapping) {
          bracelets = [braceletData[mapping.primary], braceletData[mapping.alternative]].filter(Boolean);
          labels = ['Primary Recommendation', 'Alternative Option'];
        }
      } else {
        const mapping = purposeToBracelet[purpose];
        if (mapping) {
          bracelets = mapping.map(b => braceletData[b]).filter(Boolean);
          if (mapping.length === 3) {
            labels = ['Primary', 'Secondary', 'Tertiary'];
            isGreatWealth = true;
          } else {
            labels = ['Primary Recommendation', 'Alternative Option'];
          }
        }
      }

      setResults({ bracelets, labels, isGreatWealth });
      setHasCalculated(true);
      setLoading(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  const handleTabSwitch = (tab: 'birth' | 'purpose') => {
    setActiveTab(tab);
    setResults(null);
  };

  return (
    <>
      <SEO
        title="Lucky Bracelet Calculator | Find Your Perfect Crystal Bracelet"
        description="Discover the crystal bracelet aligned with your birth chart or life purpose. Get personalized bracelet recommendations based on Vedic astrology."
      />
      <Header />
      <main
        className="min-h-screen"
        style={{
          background: '#FAF7FF',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Hero */}
        <section className="text-center pt-12 pb-6 px-4">
          <div className="text-4xl mb-3" style={{ color: '#6B3FA0' }}>✦</div>
          <h1
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1E1035' }}
          >
            Lucky Bracelet Calculator
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg" style={{ color: '#6B5E85' }}>
            Discover the bracelet that unlocks your luck, enhances your wisdom, and aligns your true purpose
          </p>
        </section>

        <div className="max-w-3xl mx-auto px-4 pb-16">
          {/* Lead Capture */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(107,63,160,0.08)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                  style={{ borderColor: errors.name ? '#e74c3c' : '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: '#e74c3c' }}>{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                  style={{ borderColor: errors.email ? '#e74c3c' : '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: '#e74c3c' }}>{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Phone</label>
                <div className="flex">
                  <span
                    className="flex items-center px-3 rounded-l-xl border border-r-0 text-sm"
                    style={{ borderColor: errors.phone ? '#e74c3c' : '#E0D6F0', background: '#F0EAF8', color: '#6B5E85' }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={e => { const v = e.target.value.replace(/\D/g, ''); if (v.length <= 10) setPhone(v); }}
                    className="w-full px-4 py-2.5 rounded-r-xl border text-sm outline-none"
                    style={{ borderColor: errors.phone ? '#e74c3c' : '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                  />
                </div>
                {errors.phone && <p className="text-xs mt-1" style={{ color: '#e74c3c' }}>{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {(['birth', 'purpose'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabSwitch(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab ? '#6B3FA0' : '#F0EAF8',
                  color: activeTab === tab ? '#fff' : '#6B3FA0',
                }}
              >
                {tab === 'birth' ? 'By Birth' : 'By Purpose'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(107,63,160,0.08)' }}
          >
            {activeTab === 'birth' ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Enter your birth date</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                  />
                </div>

                {!noTime && (
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Enter your birth time</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative">
                        <select
                          value={hour}
                          onChange={e => setHour(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none appearance-none"
                          style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                        >
                          <option value="" disabled>Hour</option>
                          {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6B5E85' }} />
                      </div>
                      <div className="relative">
                        <select
                          value={minute}
                          onChange={e => setMinute(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none appearance-none"
                          style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                        >
                          <option value="" disabled>Minute</option>
                          {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6B5E85' }} />
                      </div>
                      <div className="relative">
                        <select
                          value={ampm}
                          onChange={e => setAmpm(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none appearance-none"
                          style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6B5E85' }} />
                      </div>
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noTime}
                    onChange={e => setNoTime(e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#6B3FA0' }}
                  />
                  <span className="text-sm" style={{ color: '#6B5E85' }}>I don't know my birth time</span>
                </label>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Enter your birth place</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi, Mumbai"
                    value={birthPlace}
                    onChange={e => setBirthPlace(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                    style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: '#1E1035' }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E1035' }}>Select Purpose</label>
                <div className="relative">
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none appearance-none"
                    style={{ borderColor: '#E0D6F0', background: '#FAF7FF', color: purpose ? '#1E1035' : '#6B5E85' }}
                  >
                    <option value="" disabled>Select your purpose</option>
                    {purposes.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6B5E85' }} />
                </div>
              </div>
            )}

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full mt-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
              style={{ background: '#6B3FA0', color: '#fff' }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : hasCalculated ? 'Recalculate' : 'Find My Bracelet'}
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin" style={{ color: '#6B3FA0' }} />
              <p className="text-sm" style={{ color: '#6B5E85', fontStyle: 'italic' }}>Analyzing your cosmic energy…</p>
            </div>
          )}

          {/* Results */}
          {results && results.bracelets.length > 0 && (
            <div ref={resultsRef} className="space-y-6">
              {results.isGreatWealth && (
                <div
                  className="text-center py-3 px-4 rounded-xl text-sm font-medium"
                  style={{ background: '#F0EAF8', color: '#6B3FA0', border: '1px solid #D4C4F0' }}
                >
                  ✦ For Great Wealth — wear all three together for maximum effect
                </div>
              )}

              <div className={`grid gap-6 ${results.bracelets.length === 1 ? 'grid-cols-1' : results.bracelets.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {results.bracelets.map((bracelet, idx) => (
                  <React.Fragment key={bracelet.name + idx}>
                    {idx > 0 && results.bracelets.length === 2 && (
                      <div className="flex items-center justify-center md:hidden">
                        <span className="text-sm" style={{ color: '#6B5E85' }}>— or —</span>
                      </div>
                    )}
                    <div
                      className="rounded-2xl p-6 relative"
                      style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(107,63,160,0.08)' }}
                    >
                      {/* Color swatch + badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border-2"
                            style={{ background: bracelet.colorHex, borderColor: '#F0EAF8' }}
                          />
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ background: '#F0EAF8', color: '#6B3FA0' }}
                          >
                            {results.labels[idx]}
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3
                        className="text-xl md:text-2xl font-bold mb-4"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1E1035' }}
                      >
                        {bracelet.name}
                      </h3>

                      {/* Info pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[
                          { label: bracelet.planet, icon: '🪐' },
                          { label: bracelet.chakra, icon: '🔮' },
                          { label: bracelet.element, icon: '🌿' },
                          { label: bracelet.wearingHand, icon: '✋' },
                        ].map((pill) => (
                          <span
                            key={pill.label}
                            className="text-xs px-3 py-1.5 rounded-full"
                            style={{ background: '#F0EAF8', color: '#6B3FA0' }}
                          >
                            {pill.icon} {pill.label}
                          </span>
                        ))}
                      </div>

                      {/* Benefits */}
                      <ul className="space-y-2 mb-4">
                        {bracelet.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#1E1035' }}>
                            <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: '#6B3FA0' }} />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Best For */}
                      <p className="text-xs mb-5" style={{ color: '#6B5E85', fontStyle: 'italic' }}>
                        Best for: {bracelet.bestFor}
                      </p>

                      {/* Buy Now */}
                      <Link
                        to={`/product/${bracelet.productId}`}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                        style={{ background: '#6B3FA0', color: '#fff' }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Buy Now
                      </Link>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Info box */}
              <div
                className="rounded-xl p-5 flex items-start gap-3"
                style={{ background: '#F0EAF8', border: '1px solid #D4C4F0' }}
              >
                <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#6B3FA0' }} />
                <p className="text-sm" style={{ color: '#6B5E85' }}>
                  Crystal bracelets work best when worn consistently with positive intent. Cleanse your bracelet every 2 weeks under running water or moonlight to recharge its energy.
                </p>
              </div>

              {/* CTA */}
              <div
                className="rounded-2xl p-8 text-center"
                style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(107,63,160,0.08)' }}
              >
                <h3
                  className="text-xl md:text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1E1035' }}
                >
                  Want a personalized crystal consultation?
                </h3>
                <p className="text-sm mb-5" style={{ color: '#6B5E85' }}>
                  Our experts will analyze your full birth chart and recommend the perfect crystal combination for your goals
                </p>
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: '#6B3FA0', color: '#fff' }}
                >
                  Book a Free Consultation →
                </a>
              </div>
            </div>
          )}

          {/* Catalogue */}
          <section className="mt-16">
            <h2
              className="text-2xl md:text-3xl font-bold text-center mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1E1035' }}
            >
              Our Crystal Bracelet Collection
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allBracelets.map((b) => (
                <Link
                  key={b.name}
                  to={`/product/${b.productId}`}
                  className="rounded-2xl p-4 text-center transition-all hover:shadow-md"
                  style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(107,63,160,0.08)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full mx-auto mb-3 border-2"
                    style={{ background: b.colorHex, borderColor: '#F0EAF8' }}
                  />
                  <p className="text-xs font-medium" style={{ color: '#1E1035' }}>{b.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {/* Font import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');`}</style>
    </>
  );
};

export default BraceletCalculator;
