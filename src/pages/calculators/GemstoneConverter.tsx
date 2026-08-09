import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Copy, RotateCcw, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

// Conversion constants (base: Carat)
const CARAT_TO_RATTI = 1.09;
const CARAT_TO_GRAM = 0.20;
const CARAT_TO_MG = 200;

const RATTI_TO_CARAT = 0.91;
const GRAM_TO_CARAT = 5;
const MG_TO_CARAT = 0.005;

type ActiveField = 'carat' | 'ratti' | 'gram' | 'mg' | null;

const formatValue = (v: number): string => {
  if (v === 0) return '';
  const fixed = v.toFixed(4);
  return parseFloat(fixed).toString();
};

const gemstones = [
  { name: 'Red Coral (Moonga)', color: '#C0392B', link: '/collections/red-coral-moonga' },
  { name: 'Ruby (Manik)', color: '#9B1B30', link: '/collections/ruby-manik' },
  { name: 'Pearl (Moti)', color: '#F5F5F0', link: '/collections/pearl-moti', border: true },
  { name: 'Blue Sapphire (Neelam)', color: '#1A3A6B', link: '/collections/blue-sapphire-neelam' },
  { name: 'Emerald (Panna)', color: '#1A6B3A', link: '/collections/emerald-panna' },
  { name: 'Yellow Sapphire (Pukhraj)', color: '#E8B84B', link: '/collections/yellow-sapphire-pukhraj' },
];

const referenceCards = [
  { title: 'Ratti & Carat Converter', rows: [['1 Carat', '1.09 Ratti'], ['1 Ratti', '0.91 Carat']] },
  { title: 'Carat to Gram Converter', rows: [['1 Carat', '0.20 g']] },
  { title: 'Carat to Milligram Converter', rows: [['1 Carat', '200 mg']] },
  { title: 'Ratti to Gram Converter', rows: [['1 Ratti', '0.18 g']] },
  { title: 'Gram to Carat Converter', rows: [['1 g', '5 Carat']] },
  { title: 'Gram to Ratti Converter', rows: [['1 g', '5.49 Ratti']] },
];

const GemstoneConverter: React.FC = () => {
  const [carat, setCarat] = useState('');
  const [ratti, setRatti] = useState('');
  const [gram, setGram] = useState('');
  const [mg, setMg] = useState('');
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [copied, setCopied] = useState(false);

  const isValidInput = (val: string) => {
    if (val === '' || val === '.') return true;
    return /^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0;
  };

  const updateFromCarat = useCallback((caratVal: number) => {
    setRatti(formatValue(caratVal * CARAT_TO_RATTI));
    setGram(formatValue(caratVal * CARAT_TO_GRAM));
    setMg(formatValue(caratVal * CARAT_TO_MG));
  }, []);

  const handleChange = (field: ActiveField, value: string) => {
    if (!isValidInput(value)) return;
    setActiveField(field);

    const num = parseFloat(value) || 0;
    const isEmpty = value === '' || value === '.';

    switch (field) {
      case 'carat':
        setCarat(value);
        if (isEmpty) { setRatti(''); setGram(''); setMg(''); }
        else { updateFromCarat(num); }
        break;
      case 'ratti':
        setRatti(value);
        if (isEmpty) { setCarat(''); setGram(''); setMg(''); }
        else {
          const c = num * RATTI_TO_CARAT;
          setCarat(formatValue(c));
          setGram(formatValue(c * CARAT_TO_GRAM));
          setMg(formatValue(c * CARAT_TO_MG));
        }
        break;
      case 'gram':
        setGram(value);
        if (isEmpty) { setCarat(''); setRatti(''); setMg(''); }
        else {
          const c = num * GRAM_TO_CARAT;
          setCarat(formatValue(c));
          setRatti(formatValue(c * CARAT_TO_RATTI));
          setMg(formatValue(num * 1000));
        }
        break;
      case 'mg':
        setMg(value);
        if (isEmpty) { setCarat(''); setRatti(''); setGram(''); }
        else {
          const c = num * MG_TO_CARAT;
          setCarat(formatValue(c));
          setRatti(formatValue(c * CARAT_TO_RATTI));
          setGram(formatValue(num * 0.001));
        }
        break;
    }
  };

  const clearAll = () => {
    setCarat(''); setRatti(''); setGram(''); setMg('');
    setActiveField(null);
  };

  const copyResults = () => {
    const text = `Carat: ${carat || '0'} | Ratti: ${ratti || '0'} | Gram: ${gram || '0'} | Milligram: ${mg || '0'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCard = (label: string, value: string, field: ActiveField, placeholder: string) => (
    <div
      className="rounded-xl p-5"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 2px 16px rgba(27,43,94,0.08)',
      }}
    >
      <label
        className="block text-sm font-semibold mb-2"
        style={{ fontFamily: "'Inter', sans-serif", color: '#1B2B5E' }}
      >
        {label}
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        onFocus={() => setActiveField(field)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-lg outline-none transition-all"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: '#1A1A2E',
          background: '#FBF8F2',
          border: activeField === field ? '2px solid #1B2B5E' : '2px solid transparent',
        }}
      />
    </div>
  );

  return (
    <>
      <SEO
        title="Carat to Ratti Calculator | Gemstone Weight Converter"
        description="Accurately convert gemstone weights between Carat, Ratti, Gram and Milligram. Trusted by gem buyers and sellers across India."
      />
      <Header />
      <main style={{ fontFamily: "'Inter', sans-serif", background: '#FFFFFF' }}>
        {/* Hero */}
        <section className="text-center py-12 md:py-16 px-4" style={{ background: '#FBF8F2' }}>
          <div className="text-3xl mb-3" style={{ color: '#C9920A' }}>◈</div>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
          >
            Carat to Ratti Calculator
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg" style={{ color: '#6B6B8A' }}>
            Accurately convert gemstone weights between Carat, Ratti, Gram and Milligram — trusted by gem buyers and sellers across India
          </p>
        </section>

        {/* Converter */}
        <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inputCard('Carat', carat, 'carat', 'Enter Carat')}
            {inputCard('Ratti', ratti, 'ratti', 'Enter Ratti')}
            {inputCard('Gram', gram, 'gram', 'Enter Gram')}
            {inputCard('Milligram', mg, 'mg', 'Enter Milligram')}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={clearAll}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{ border: '2px solid #1B2B5E', color: '#1B2B5E', background: 'transparent' }}
            >
              <RotateCcw size={16} /> Reset / Clear All
            </button>
            <button
              onClick={copyResults}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{ border: '2px solid #C9920A', color: '#C9920A', background: 'transparent' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Results'}
            </button>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
          >
            Quick Reference Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {referenceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-5"
                style={{
                  background: '#FFFFFF',
                  boxShadow: '0 2px 16px rgba(27,43,94,0.08)',
                  borderLeft: '4px solid #C9920A',
                }}
              >
                <h3
                  className="text-sm font-bold mb-3"
                  style={{ fontFamily: "'Inter', sans-serif", color: '#1B2B5E' }}
                >
                  {card.title}
                </h3>
                <table className="w-full text-sm" style={{ color: '#1A1A2E' }}>
                  <tbody>
                    {card.rows.map((row, i) => (
                      <tr key={i} className={i > 0 ? 'border-t' : ''} style={{ borderColor: '#F0EEE8' }}>
                        <td className="py-2 font-medium">{row[0]}</td>
                        <td className="py-2 text-right font-semibold" style={{ color: '#C9920A' }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* Top Selling Gemstones */}
        <section className="py-10 px-4" style={{ background: '#FBF8F2' }}>
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
          >
            Our Top Selling Gemstones
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
              {gemstones.map((gem) => (
                <Link
                  key={gem.name}
                  to={gem.link}
                  className="flex-shrink-0 w-40 lg:w-auto rounded-xl p-5 text-center transition-all hover:-translate-y-1"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 2px 16px rgba(27,43,94,0.08)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3"
                    style={{
                      background: gem.color,
                      border: gem.border ? '2px solid #D1D1D1' : 'none',
                    }}
                  />
                  <p className="text-sm font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: "'Inter', sans-serif" }}>
                    {gem.name}
                  </p>
                  <span className="text-xs font-semibold" style={{ color: '#C9920A' }}>
                    Shop Now →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
          >
            What is Carat & Ratti?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div
              className="rounded-xl p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(27,43,94,0.08)' }}
            >
              <div className="text-2xl mb-3" style={{ color: '#C9920A' }}>◆</div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
              >
                What is Carat?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B8A' }}>
                Carat is the internationally recognized standard unit of weight for gemstones and pearls. 1 Carat equals exactly 200 milligrams. The term originates from the carob seeds historically used as counterweights in gem trading.
              </p>
            </div>
            <div
              className="rounded-xl p-6"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(27,43,94,0.08)' }}
            >
              <div className="text-2xl mb-3" style={{ color: '#C9920A' }}>✦</div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1B2B5E' }}
              >
                What is Ratti?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B8A' }}>
                Ratti is the traditional Indian unit of gemstone weight, equal to approximately 182 milligrams. It has been used in Ayurveda and Vedic astrology for centuries, and remains the preferred measurement unit for gemstone recommendations by Indian astrologers.
              </p>
            </div>
          </div>
          <div
            className="rounded-xl p-5 text-sm text-center"
            style={{ background: '#FDF3DC', color: '#1A1A2E' }}
          >
            💡 <strong>Tip:</strong> When an astrologer recommends a gemstone weight in Ratti, use this calculator to find the exact Carat weight before purchasing.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GemstoneConverter;
