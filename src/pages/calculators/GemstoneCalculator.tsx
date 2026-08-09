import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

// ─── GEMSTONE MASTER DATA ──────────────────────────────────────────────────────

interface GemstoneData {
  name: string;
  hindiName: string;
  colorHex: string;
  planet: string;
  wearDay: string;
  metal: string;
  finger: string;
  fingerHindi: string;
  benefits: string[];
  shopUrl: string;
}

const gemstoneData: Record<string, GemstoneData> = {
  ruby: {
    name: 'Ruby (Manik)',
    hindiName: 'माणिक्य',
    colorHex: '#9B1B30',
    planet: 'Sun',
    wearDay: 'Sunday',
    metal: 'Gold',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Boosts confidence & leadership',
      "Strengthens Sun's position in chart",
      'Good for government & authority jobs',
      'Improves health & vitality',
      'Brings name, fame & recognition',
    ],
    shopUrl: '/collections/ruby-manik',
  },
  pearl: {
    name: 'Pearl (Moti)',
    hindiName: 'मोती',
    colorHex: '#F0EDE8',
    planet: 'Moon',
    wearDay: 'Monday',
    metal: 'Silver',
    finger: 'Little Finger',
    fingerHindi: 'कनिष्ठ',
    benefits: [
      'Calms emotions & reduces stress',
      'Improves memory & concentration',
      'Good for sleep & mental peace',
      'Strengthens Moon — good for mothers',
      'Brings emotional stability',
    ],
    shopUrl: '/collections/pearl-moti',
  },
  redCoral: {
    name: 'Red Coral (Moonga)',
    hindiName: 'मूंगा',
    colorHex: '#C0392B',
    planet: 'Mars',
    wearDay: 'Tuesday',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Boosts courage & physical energy',
      'Good for blood-related health issues',
      'Strengthens Mars energy',
      'Helps with property & real estate matters',
      'Removes obstacles & enemies',
    ],
    shopUrl: '/collections/red-coral-moonga',
  },
  emerald: {
    name: 'Emerald (Panna)',
    hindiName: 'पन्ना',
    colorHex: '#1A6B3A',
    planet: 'Mercury',
    wearDay: 'Wednesday',
    metal: 'Gold',
    finger: 'Little Finger',
    fingerHindi: 'कनिष्ठ',
    benefits: [
      'Enhances intelligence & communication',
      'Excellent for students & writers',
      'Good for business & trade',
      'Improves nervous system health',
      'Brings clarity of thought',
    ],
    shopUrl: '/collections/emerald-panna',
  },
  yellowSapphire: {
    name: 'Yellow Sapphire (Pukhraj)',
    hindiName: 'पुखराज',
    colorHex: '#E8B84B',
    planet: 'Jupiter',
    wearDay: 'Thursday',
    metal: 'Gold',
    finger: 'Index Finger',
    fingerHindi: 'तर्जनी',
    benefits: [
      'Attracts wealth & prosperity',
      'Blesses with wisdom & knowledge',
      'Good for marriage prospects',
      'Strengthens Jupiter — guru planet',
      'Brings good luck & fortune',
    ],
    shopUrl: '/collections/yellow-sapphire-pukhraj',
  },
  diamond: {
    name: 'Diamond / Opal',
    hindiName: 'हीरा / दूधिया',
    colorHex: '#E8E8F0',
    planet: 'Venus',
    wearDay: 'Friday',
    metal: 'Silver or White Gold',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Attracts love & luxury',
      'Good for creative arts & fashion',
      'Brings marital happiness',
      'Enhances beauty & charm',
      'Strengthens Venus energy',
    ],
    shopUrl: '/collections/opal',
  },
  blueSapphire: {
    name: 'Blue Sapphire (Neelam)',
    hindiName: 'नीलम',
    colorHex: '#1A3A6B',
    planet: 'Saturn',
    wearDay: 'Saturday',
    metal: 'Silver',
    finger: 'Middle Finger',
    fingerHindi: 'मध्यमा',
    benefits: [
      'Fast-acting powerful gemstone',
      'Brings sudden wealth & success',
      "Removes Saturn's malefic effects",
      'Good for discipline & hard work',
      'Protects from accidents & losses',
    ],
    shopUrl: '/collections/blue-sapphire-neelam',
  },
  hessonite: {
    name: 'Hessonite (Gomed)',
    hindiName: 'गोमेध',
    colorHex: '#8B4513',
    planet: 'Rahu',
    wearDay: 'Saturday',
    metal: 'Silver',
    finger: 'Middle Finger',
    fingerHindi: 'मध्यमा',
    benefits: [
      'Removes Rahu dosha effects',
      'Brings clarity & removes confusion',
      'Good for lawyers & politicians',
      'Protects from black magic & evil eye',
      'Improves concentration & focus',
    ],
    shopUrl: '/collections/gomed',
  },
  catsEye: {
    name: "Cat's Eye (Lehsuniya)",
    hindiName: 'लहसुनिया',
    colorHex: '#B8860B',
    planet: 'Ketu',
    wearDay: 'Thursday',
    metal: 'Silver',
    finger: 'Middle Finger',
    fingerHindi: 'मध्यमा',
    benefits: [
      'Removes Ketu dosha',
      'Protects from hidden enemies',
      'Good for speculation & gambling luck',
      'Brings moksha & spiritual liberation',
      'Removes sudden losses & mishaps',
    ],
    shopUrl: '/collections/lehsuniya-cats-eye',
  },
  moonstone: {
    name: 'Moonstone',
    hindiName: 'चन्द्रकान्त',
    colorHex: '#C8D8E8',
    planet: 'Moon',
    wearDay: 'Monday',
    metal: 'Silver',
    finger: 'Little Finger',
    fingerHindi: 'कनिष्ठ',
    benefits: [
      'Affordable substitute for Pearl',
      'Calms emotions & mood swings',
      'Good for intuition & psychic ability',
      'Supports fertility & feminine energy',
      'Brings emotional balance',
    ],
    shopUrl: '/collections/moonstone-blue-sheen',
  },
  amethyst: {
    name: 'Amethyst / Iolite',
    hindiName: 'नीली',
    colorHex: '#6B3FA0',
    planet: 'Saturn',
    wearDay: 'Saturday',
    metal: 'Silver',
    finger: 'Middle Finger',
    fingerHindi: 'मध्यमा',
    benefits: [
      'Affordable substitute for Blue Sapphire',
      'Calms overthinking & anxiety',
      'Enhances intuition & wisdom',
      'Good for meditation & spiritual growth',
      "Removes Saturn's negative effects gently",
    ],
    shopUrl: '/collections/amethyst',
  },
  citrine: {
    name: 'Citrine / Yellow Topaz',
    hindiName: 'सुनेला',
    colorHex: '#F4C430',
    planet: 'Jupiter',
    wearDay: 'Thursday',
    metal: 'Gold',
    finger: 'Index Finger',
    fingerHindi: 'तर्जनी',
    benefits: [
      'Affordable substitute for Yellow Sapphire',
      'Attracts abundance & positivity',
      'Boosts confidence & self-esteem',
      'Good for business growth',
      'Brings joy & optimism',
    ],
    shopUrl: '/collections/citrine',
  },
  peridot: {
    name: 'Peridot / Green Tourmaline',
    hindiName: 'हरा पत्थर',
    colorHex: '#6AB04C',
    planet: 'Mercury',
    wearDay: 'Wednesday',
    metal: 'Gold',
    finger: 'Little Finger',
    fingerHindi: 'कनिष्ठ',
    benefits: [
      'Affordable substitute for Emerald',
      'Boosts intelligence & communication',
      'Reduces stress & negativity',
      'Good for healing & health',
      'Brings clarity & focus',
    ],
    shopUrl: '/collections/peridot',
  },
  carnelian: {
    name: 'Carnelian',
    hindiName: 'गोमेदक',
    colorHex: '#B5651D',
    planet: 'Mars',
    wearDay: 'Tuesday',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Affordable substitute for Red Coral',
      'Boosts courage & motivation',
      'Enhances vitality & energy',
      'Good for physical strength',
      'Brings determination & focus',
    ],
    shopUrl: '/collections/carnelian',
  },
  whiteSapphire: {
    name: 'White Sapphire',
    hindiName: 'सफेद पुखराज',
    colorHex: '#E0E0E8',
    planet: 'Venus',
    wearDay: 'Friday',
    metal: 'Silver or White Gold',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Affordable substitute for Diamond',
      'Attracts love & beauty',
      'Enhances creativity',
      'Brings luxury & comfort',
      'Strengthens Venus energy',
    ],
    shopUrl: '/collections/white-sapphire',
  },
  redGarnet: {
    name: 'Red Garnet / Sunstone',
    hindiName: 'लाल गारनेट',
    colorHex: '#8B0000',
    planet: 'Sun',
    wearDay: 'Sunday',
    metal: 'Gold',
    finger: 'Ring Finger',
    fingerHindi: 'अनामिका',
    benefits: [
      'Affordable substitute for Ruby',
      'Boosts confidence & energy',
      'Brings vitality & passion',
      'Good for leadership',
      'Enhances willpower',
    ],
    shopUrl: '/collections/red-garnet',
  },
};

// ─── RASHI MAPPING ─────────────────────────────────────────────────────────────

interface RashiInfo {
  name: string;
  planet: string;
  primaryKey: string;
  substituteKey: string;
}

const rashiMap: Record<string, RashiInfo> = {
  Aries: { name: 'Aries', planet: 'Mars', primaryKey: 'redCoral', substituteKey: 'carnelian' },
  Taurus: { name: 'Taurus', planet: 'Venus', primaryKey: 'diamond', substituteKey: 'whiteSapphire' },
  Gemini: { name: 'Gemini', planet: 'Mercury', primaryKey: 'emerald', substituteKey: 'peridot' },
  Cancer: { name: 'Cancer', planet: 'Moon', primaryKey: 'pearl', substituteKey: 'moonstone' },
  Leo: { name: 'Leo', planet: 'Sun', primaryKey: 'ruby', substituteKey: 'redGarnet' },
  Virgo: { name: 'Virgo', planet: 'Mercury', primaryKey: 'emerald', substituteKey: 'peridot' },
  Libra: { name: 'Libra', planet: 'Venus', primaryKey: 'diamond', substituteKey: 'whiteSapphire' },
  Scorpio: { name: 'Scorpio', planet: 'Mars', primaryKey: 'redCoral', substituteKey: 'carnelian' },
  Sagittarius: { name: 'Sagittarius', planet: 'Jupiter', primaryKey: 'yellowSapphire', substituteKey: 'citrine' },
  Capricorn: { name: 'Capricorn', planet: 'Saturn', primaryKey: 'blueSapphire', substituteKey: 'amethyst' },
  Aquarius: { name: 'Aquarius', planet: 'Saturn', primaryKey: 'blueSapphire', substituteKey: 'amethyst' },
  Pisces: { name: 'Pisces', planet: 'Jupiter', primaryKey: 'yellowSapphire', substituteKey: 'citrine' },
};

const fingerChartData = [
  { key: 'yellowSapphire', gemName: 'Yellow Sapphire', hindi: 'पुखराज', finger: 'Index Finger', fingerHindi: 'तर्जनी', color: '#E8B84B' },
  { key: 'catsEye', gemName: "Cat's Eye", hindi: 'लहसुनिया', finger: 'Middle Finger', fingerHindi: 'मध्यमा', color: '#B8860B' },
  { key: 'blueSapphire', gemName: 'Blue Sapphire', hindi: 'नीलम', finger: 'Middle Finger', fingerHindi: 'मध्यमा', color: '#1A3A6B' },
  { key: 'diamond', gemName: 'Opal', hindi: 'दूधिया पत्थर', finger: 'Middle Finger', fingerHindi: 'मध्यमा', color: '#E8E8F0' },
  { key: 'hessonite', gemName: 'Hessonite', hindi: 'गोमेध', finger: 'Middle Finger', fingerHindi: 'मध्यमा', color: '#8B4513' },
  { key: 'ruby', gemName: 'Ruby', hindi: 'माणिक्य', finger: 'Ring Finger', fingerHindi: 'अनामिका', color: '#9B1B30' },
  { key: 'redCoral', gemName: 'Red Coral', hindi: 'मूंगा', finger: 'Ring Finger', fingerHindi: 'अनामिका', color: '#C0392B' },
  { key: 'emerald', gemName: 'Emerald', hindi: 'पन्ना', finger: 'Little Finger', fingerHindi: 'कनिष्ठ', color: '#1A6B3A' },
  { key: 'pearl', gemName: 'Pearl', hindi: 'मोती', finger: 'Little Finger', fingerHindi: 'कनिष्ठ', color: '#F0EDE8' },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function getRashi(month: number, day: number): string {
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

function calcRatti(kg: number): number {
  return Math.ceil((kg / 10) * 2) / 2;
}

// ─── STYLES ────────────────────────────────────────────────────────────────────

const C = {
  green: '#1B5E3B',
  greenDark: '#154D31',
  bg: '#FDFAF4',
  card: '#FFFFFF',
  text: '#1A1A1A',
  muted: '#6B7280',
  gold: '#C9920A',
  goldLight: '#FEF9EC',
  greenLight: '#EDF7F1',
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

const GemstoneCalculator: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('');
  const [noTime, setNoTime] = useState(false);
  const [birthPlace, setBirthPlace] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    rashi: string;
    planet: string;
    primary: GemstoneData;
    substitute: GemstoneData;
    primaryKey: string;
    substituteKey: string;
    rattiWeight: number;
    caratWeight: number;
    bodyWeight: number;
    dobFormatted: string;
    firstName: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(phone)) e.phone = 'Must be exactly 10 digits';
    if (!gender) e.gender = 'Select gender';
    const w = parseFloat(weight);
    if (!weight.trim()) e.weight = 'Body weight is required';
    else if (isNaN(w) || w < 1 || w > 300) e.weight = 'Enter valid weight (1-300 kg)';
    if (!dob) e.dob = 'Date of birth is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const date = new Date(dob);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const rashi = getRashi(month, day);
      const info = rashiMap[rashi];
      const kg = parseFloat(weight);
      const ratti = calcRatti(kg);
      const carat = parseFloat((ratti * 0.91).toFixed(2));

      setResult({
        rashi: info.name,
        planet: info.planet,
        primary: gemstoneData[info.primaryKey],
        substitute: gemstoneData[info.substituteKey],
        primaryKey: info.primaryKey,
        substituteKey: info.substituteKey,
        rattiWeight: ratti,
        caratWeight: carat,
        bodyWeight: kg,
        dobFormatted: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        firstName: name.trim().split(' ')[0],
      });
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: C.text,
    background: C.card,
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '6px',
    color: C.text,
    fontFamily: "'Inter', sans-serif",
  };

  const errorStyle: React.CSSProperties = {
    color: '#DC2626',
    fontSize: '13px',
    marginTop: '4px',
    fontFamily: "'Inter', sans-serif",
  };

  const cardShadow = '0 2px 16px rgba(27,94,59,0.08)';

  const GemCard = ({ gem, gemKey, isPrimary, ratti, carat }: {
    gem: GemstoneData; gemKey: string; isPrimary: boolean; ratti: number; carat: number;
  }) => (
    <div
      className="rounded-xl p-6"
      style={{
        background: C.card,
        boxShadow: cardShadow,
        borderLeft: `4px solid ${isPrimary ? C.green : C.gold}`,
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 mt-1"
          style={{
            background: gem.colorHex,
            border: gem.colorHex === '#F0EDE8' || gem.colorHex === '#E8E8F0' || gem.colorHex === '#E0E0E8' || gem.colorHex === '#C8D8E8'
              ? '2px solid #D1D5DB' : 'none',
          }}
        />
        <div>
          <h3
            className="text-xl md:text-2xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: C.text }}
          >
            {gem.name}
          </h3>
          <p style={{ color: C.muted, fontSize: '14px' }}>{gem.hindiName}</p>
        </div>
      </div>

      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
        style={{
          background: isPrimary ? C.greenLight : C.goldLight,
          color: isPrimary ? C.green : C.gold,
        }}
      >
        {isPrimary ? 'Primary Recommendation' : 'Affordable Alternative'}
      </span>

      {!isPrimary && (
        <p className="text-sm mb-4" style={{ color: C.muted, fontStyle: 'italic' }}>
          A more affordable substitute with similar planetary benefits
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {[
          `🪐 ${gem.planet}`,
          `📅 ${gem.wearDay}`,
          `💍 ${gem.finger}`,
          `⚙️ ${gem.metal}`,
        ].map((pill) => (
          <span
            key={pill}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: C.bg, color: C.text, border: '1px solid #E5E7EB' }}
          >
            {pill}
          </span>
        ))}
      </div>

      <ul className="space-y-2 mb-4">
        {gem.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm" style={{ color: C.text }}>
            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: C.gold }} />
            {b}
          </li>
        ))}
      </ul>

      <p className="text-sm font-semibold mb-4" style={{ color: C.green }}>
        Recommended: {ratti} Ratti / {carat} Carat
      </p>

      <a
        href={gem.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-colors"
        style={{
          background: isPrimary ? C.green : C.gold,
          color: '#FFFFFF',
        }}
      >
        Shop Now <ExternalLink size={14} />
      </a>
    </div>
  );

  return (
    <>
      <SEO
        title="Gemstone Recommendation by Date of Birth | Free Kundali Calculator"
        description="Discover your ideal Rashi Ratna based on your birth chart — recommended by Vedic astrology for health, wealth, and spiritual harmony."
      />
      <Header />
      <main style={{ fontFamily: "'Inter', sans-serif", background: C.bg }}>
        {/* Hero */}
        <section className="text-center py-12 md:py-16 px-4" style={{ background: C.greenLight }}>
          <div className="text-3xl mb-3" style={{ color: C.gold }}>✦</div>
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: C.green }}
          >
            Gemstone Recommendation by Date of Birth & Kundali
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base" style={{ color: C.muted }}>
            Discover your ideal Rashi Ratna based on your birth chart — recommended by Vedic astrology for health, wealth, and spiritual harmony
          </p>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 py-10">
          <div className="rounded-xl p-6 md:p-8" style={{ background: C.card, boxShadow: cardShadow }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name */}
              <div>
                <label style={labelStyle}>Name *</label>
                <input style={fieldStyle} placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>
              {/* Email */}
              <div>
                <label style={labelStyle}>Email *</label>
                <input style={fieldStyle} type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone *</label>
                <div className="flex">
                  <span
                    className="flex items-center px-3 rounded-l-lg text-sm font-medium"
                    style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', borderRight: 'none', color: C.muted }}
                  >
                    +91
                  </span>
                  <input
                    style={{ ...fieldStyle, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => { if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) setPhone(e.target.value); }}
                  />
                </div>
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>
              {/* Gender */}
              <div>
                <label style={labelStyle}>Gender *</label>
                <div className="flex gap-2">
                  {(['Male', 'Female'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className="flex-1 py-2.5 rounded-full text-sm font-medium transition-colors"
                      style={{
                        background: gender === g ? C.green : C.card,
                        color: gender === g ? '#FFFFFF' : C.green,
                        border: `2px solid ${C.green}`,
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Body Weight */}
              <div>
                <label style={labelStyle}>Body Weight (kg) *</label>
                <input
                  style={fieldStyle}
                  type="number"
                  min={1}
                  max={300}
                  placeholder="Enter your body weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                {errors.weight && <p style={errorStyle}>{errors.weight}</p>}
              </div>
              {/* DOB */}
              <div>
                <label style={labelStyle}>Date of Birth *</label>
                <input
                  style={fieldStyle}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dob && <p style={errorStyle}>{errors.dob}</p>}
              </div>
            </div>

            {/* Birth Time */}
            <div className="mb-4">
              <label style={labelStyle}>Birth Time</label>
              {!noTime && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <select style={fieldStyle} value={hour} onChange={(e) => setHour(e.target.value)}>
                    <option value="">Hour</option>
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <select style={fieldStyle} value={minute} onChange={(e) => setMinute(e.target.value)}>
                    <option value="">Minute</option>
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select style={fieldStyle} value={ampm} onChange={(e) => setAmpm(e.target.value)}>
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              )}
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: C.muted }}>
                <input
                  type="checkbox"
                  checked={noTime}
                  onChange={(e) => setNoTime(e.target.checked)}
                  className="rounded"
                />
                I don't know the birth time
              </label>
            </div>

            {/* Birth Place */}
            <div className="mb-6">
              <label style={labelStyle}>Birth Place <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span></label>
              <input style={fieldStyle} placeholder="Enter your birth place (city)" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 rounded-full text-base font-semibold transition-colors"
              style={{ background: loading ? C.muted : C.green, color: '#FFFFFF' }}
            >
              {loading ? 'Analysing your birth chart…' : submitted ? 'Recalculate' : 'Find My Gemstone'}
            </button>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <div
              className="w-10 h-10 border-4 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: `${C.greenLight}`, borderTopColor: C.green }}
            />
            <p className="text-sm font-medium" style={{ color: C.green }}>Analysing your birth chart…</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <section ref={resultsRef} className="max-w-3xl mx-auto px-4 pb-10">
            <h2
              className="text-2xl md:text-3xl font-bold text-center mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: C.green }}
            >
              Your Gemstone Recommendation, {result.firstName}
            </h2>

            {/* Rashi Summary */}
            <div
              className="rounded-xl p-4 mb-4 flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm font-medium"
              style={{ background: C.goldLight, color: C.text }}
            >
              <span>Your Rashi: <strong>{result.rashi}</strong></span>
              <span>Ruling Planet: <strong>{result.planet}</strong></span>
              <span>Birth Date: <strong>{result.dobFormatted}</strong></span>
            </div>

            {/* Weight Card */}
            <div
              className="rounded-xl p-5 mb-6 text-center"
              style={{ background: C.greenLight, border: `1px solid ${C.green}20` }}
            >
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: C.green }}
              >
                {result.rattiWeight} Ratti
              </p>
              <p className="text-base font-medium" style={{ color: C.text }}>
                {result.caratWeight} Carat equivalent
              </p>
              <p className="text-xs mt-2" style={{ color: C.muted }}>
                Minimum recommended weight based on your body weight of {result.bodyWeight} kg
              </p>
            </div>

            {/* Gem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <GemCard gem={result.primary} gemKey={result.primaryKey} isPrimary={true} ratti={result.rattiWeight} carat={result.caratWeight} />
              <GemCard gem={result.substitute} gemKey={result.substituteKey} isPrimary={false} ratti={result.rattiWeight} carat={result.caratWeight} />
            </div>
          </section>
        )}

        {/* Finger Chart */}
        <section className="max-w-3xl mx-auto px-4 pb-10">
          <h2
            className="text-xl md:text-2xl font-bold text-center mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: C.green }}
          >
            Suggested Finger to Wear Gemstones
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ background: C.card, boxShadow: cardShadow }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <thead>
                  <tr style={{ background: C.greenLight }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.green }}></th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.green }}>Gemstone</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.green }}>Hindi</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.green }}>Finger</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.green }}>Hindi</th>
                  </tr>
                </thead>
                <tbody>
                  {fingerChartData.map((row) => {
                    const isHighlighted = result && (row.key === result.primaryKey);
                    return (
                      <tr
                        key={row.key}
                        style={{
                          background: isHighlighted ? C.goldLight : 'transparent',
                          borderBottom: '1px solid #F3F4F6',
                        }}
                      >
                        <td className="py-3 px-4">
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{
                              background: row.color,
                              border: row.color === '#F0EDE8' || row.color === '#E8E8F0' ? '1px solid #D1D5DB' : 'none',
                            }}
                          />
                        </td>
                        <td className="py-3 px-4 font-medium" style={{ color: C.text }}>{row.gemName}</td>
                        <td className="py-3 px-4" style={{ color: C.muted }}>{row.hindi}</td>
                        <td className="py-3 px-4 font-medium" style={{ color: C.text }}>{row.finger}</td>
                        <td className="py-3 px-4" style={{ color: C.muted }}>{row.fingerHindi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center" style={{ background: C.green }}>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFFFFF' }}
          >
            Still Confused? Talk to a Vedic Astrologer
          </h2>
          <p className="text-sm md:text-base mb-6" style={{ color: C.greenLight }}>
            One-on-One | 15 Minutes | 100% Personalized | ₹699 Only
          </p>
          <Link
            to="/pages/consultation"
            className="inline-block px-8 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ background: C.gold, color: C.text }}
          >
            Book Your Consultation Now →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GemstoneCalculator;
