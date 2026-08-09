import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Target, Clover, Sun, Moon, Shield, BookOpen, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  rudrakshaData,
  rashiToRudraksha,
  purposeToRudraksha,
  purposes,
  getZodiacFromDate,
  type RudrakshaInfo,
} from '@/data/rudrakshaData';

/* ─── Result Card ─── */
const RudrakshaCard: React.FC<{ data: RudrakshaInfo; highlight?: boolean }> = ({ data, highlight }) => (
  <div
    className={`rounded-xl p-6 shadow-soft transition-all ${
      highlight
        ? 'border-2 border-accent bg-accent/5'
        : 'border border-border bg-card'
    }`}
  >
    {highlight && (
      <span className="inline-block mb-3 text-xs font-bold uppercase tracking-wider text-accent">
        ✦ Most Powerful Option — Wear All Together
      </span>
    )}
    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">{data.name}</h3>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-5">
      {[
        { icon: <Sun className="w-3 h-3" />, label: data.planet },
        { icon: <Shield className="w-3 h-3" />, label: data.deity },
        { icon: <Calendar className="w-3 h-3" />, label: `Wear on ${data.day}` },
        { icon: <Moon className="w-3 h-3" />, label: `String in ${data.metal}` },
      ].map((t) => (
        <span key={t.label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {t.icon} {t.label}
        </span>
      ))}
    </div>

    {/* Benefits */}
    <ul className="space-y-1.5 mb-5">
      {data.benefits.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-foreground">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {b}
        </li>
      ))}
    </ul>

    {/* Beej Mantra */}
    <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 mb-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Beej Mantra</p>
      <p className="text-lg font-display italic text-foreground">{data.beejMantra}</p>
    </div>
    <p className="text-xs text-muted-foreground italic mb-4">Alternatively, chant <span className="font-medium">Om Namah Shivaya</span></p>

    {/* Buy Now Button */}
    {data.productId && (
      <Link
        to={`/product/${data.productId}`}
        className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground py-3 font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        Buy Now
      </Link>
    )}
  </div>
);

/* ─── Main Page ─── */
const RudrakshaCalculator: React.FC = () => {
  const resultRef = useRef<HTMLDivElement>(null);

  // Lead capture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tabs
  const [activeTab, setActiveTab] = useState<'birthchart' | 'purpose' | 'luck'>('birthchart');

  // Birth chart
  const [birthDate, setBirthDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [noTime, setNoTime] = useState(false);

  // Purpose
  const [purpose, setPurpose] = useState('');

  // Results
  const [results, setResults] = useState<RudrakshaInfo[]>([]);
  const [combinationCard, setCombinationCard] = useState<RudrakshaInfo | null>(null);
  const [specialNote, setSpecialNote] = useState('');
  const [rashiName, setRashiName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(phone)) errs.phone = 'Enter a valid 10-digit number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearResults = () => {
    setResults([]);
    setCombinationCard(null);
    setSpecialNote('');
    setRashiName('');
    setHasCalculated(false);
  };

  const handleTabSwitch = (tab: typeof activeTab) => {
    setActiveTab(tab);
    clearResults();
  };

  const scrollToResults = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const calculateBirthChart = () => {
    if (!birthDate) { setErrors(prev => ({ ...prev, birthDate: 'Please enter your date of birth' })); return; }
    const rashi = getZodiacFromDate(birthDate);
    const rec = rashiToRudraksha[rashi];
    if (!rec) return;

    const displayRashi = rashi.charAt(0).toUpperCase() + rashi.slice(1);
    setRashiName(displayRashi);

    const cards: RudrakshaInfo[] = [rudrakshaData[rec.primary]];
    if (rec.alternatives) rec.alternatives.forEach(a => { if (rudrakshaData[a]) cards.push(rudrakshaData[a]); });
    if (rec.special && rudrakshaData[rec.special]) cards.push(rudrakshaData[rec.special]);

    setResults(cards);
    setSpecialNote(rec.note || '');

    if (rec.combination) {
      // Build a synthetic combination card
      setCombinationCard({
        name: rec.combination,
        mukhi: 'Combination',
        planet: 'Multiple',
        deity: 'Multiple Deities',
        day: 'Any auspicious day',
        metal: 'Gold',
        beejMantra: 'Chant individual Beej Mantras',
        benefits: ['Combined planetary benefits', 'Maximum spiritual protection', 'Amplified energy of all beads', 'Best for serious seekers', 'Holistic life transformation'],
      });
    } else {
      setCombinationCard(null);
    }
  };

  const calculatePurpose = () => {
    if (!purpose) { setErrors(prev => ({ ...prev, purpose: 'Please select a purpose' })); return; }
    const keys = purposeToRudraksha[purpose];
    if (!keys) return;

    const cards: RudrakshaInfo[] = keys.map(k => rudrakshaData[k]).filter(Boolean);
    setResults(cards);
    setSpecialNote('');

    if (keys.length > 1) {
      setCombinationCard({
        name: keys.join(' + ') + ' Mala',
        mukhi: 'Combination',
        planet: 'Multiple',
        deity: 'Multiple Deities',
        day: 'Any auspicious day',
        metal: 'Gold',
        beejMantra: 'Chant individual Beej Mantras',
        benefits: ['Combined benefits for ' + purpose.replace(/^For /, '').toLowerCase(), 'Maximum spiritual protection', 'Amplified energy of all beads', 'Best for serious seekers', 'Holistic life transformation'],
      });
    } else {
      setCombinationCard(null);
    }
  };

  const calculateLuck = () => {
    setResults([rudrakshaData['5 Mukhi']]);
    setSpecialNote('5 Mukhi is sacred to all — it is the most universally beneficial Rudraksha blessed by Jupiter, suitable for everyone regardless of rashi or birth details.');
    setCombinationCard(null);
  };

  const handleCalculate = () => {
    if (!validate()) return;
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      if (activeTab === 'birthchart') calculateBirthChart();
      else if (activeTab === 'purpose') calculatePurpose();
      else calculateLuck();
      setLoading(false);
      setHasCalculated(true);
      scrollToResults();
    }, 1500);
  };

  const tabs = [
    { key: 'birthchart' as const, label: 'By Birth Chart', icon: <Calendar className="w-4 h-4" /> },
    { key: 'purpose' as const, label: 'By Purpose', icon: <Target className="w-4 h-4" /> },
    { key: 'luck' as const, label: 'By Luck', icon: <Clover className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="py-14 md:py-20 text-center relative overflow-hidden bg-muted/50">
          <div className="container-custom relative z-10">
            <p className="text-4xl mb-3">⎈</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              Lucky <span className="text-primary">Rudraksha</span> Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Discover the sacred bead aligned with your planetary energies — based on birth chart, purpose, or luck
            </p>
          </div>
        </section>

        {/* ─── Calculator ─── */}
        <section className="py-10 md:py-16">
          <div className="container-custom max-w-2xl">
            {/* Lead Capture */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft mb-8">
              <h2 className="text-lg font-display font-bold text-foreground mb-4">Your Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="lc-name" className="text-xs text-muted-foreground mb-1 block">Full Name</Label>
                  <Input id="lc-name" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="lc-email" className="text-xs text-muted-foreground mb-1 block">Email</Label>
                  <Input id="lc-email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="lc-phone" className="text-xs text-muted-foreground mb-1 block">Phone</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">+91</span>
                    <Input id="lc-phone" type="tel" placeholder="10-digit mobile" className="rounded-l-none" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 justify-center flex-wrap">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => handleTabSwitch(t.key)}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    activeTab === t.key
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft mb-6">
              {activeTab === 'birthchart' && (
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Date of Birth</Label>
                    <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                    {errors.birthDate && <p className="text-xs text-destructive mt-1">{errors.birthDate}</p>}
                  </div>

                  {!noTime && (
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1 block">Birth Time</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Select value={hour} onValueChange={setHour}>
                          <SelectTrigger><SelectValue placeholder="Hour" /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                              <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={minute} onValueChange={setMinute}>
                          <SelectTrigger><SelectValue placeholder="Min" /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={ampm} onValueChange={setAmpm}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
                    <input type="checkbox" checked={noTime} onChange={e => setNoTime(e.target.checked)} className="rounded border-input accent-primary" />
                    I don't know my birth time
                  </label>
                  {noTime && (
                    <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      Recommendation will be based on date of birth only.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'purpose' && (
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Select Your Purpose</Label>
                  <Select value={purpose} onValueChange={setPurpose}>
                    <SelectTrigger><SelectValue placeholder="Select your purpose" /></SelectTrigger>
                    <SelectContent>
                      {purposes.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.purpose && <p className="text-xs text-destructive mt-1">{errors.purpose}</p>}
                </div>
              )}

              {activeTab === 'luck' && (
                <div className="text-center py-4">
                  <p className="text-5xl mb-3">🍀</p>
                  <p className="text-muted-foreground text-sm">Click below to reveal your lucky Rudraksha — no inputs needed!</p>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full rounded-full py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Calculating...
                </span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-1" />
                  {hasCalculated ? 'Recalculate' : activeTab === 'luck' ? 'Reveal My Lucky Rudraksha' : 'Find My Rudraksha'}
                </>
              )}
            </Button>
          </div>
        </section>

        {/* ─── Results ─── */}
        {results.length > 0 && (
          <section ref={resultRef} className="pb-16">
            <div className="container-custom max-w-3xl animate-fade-in-up">
              {rashiName && (
                <p className="text-center text-sm text-muted-foreground mb-2">
                  Your Rashi: <span className="font-semibold text-foreground">{rashiName}</span>
                </p>
              )}
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
                Your Recommended Rudraksha{results.length > 1 ? 's' : ''}
              </h2>

              {specialNote && (
                <p className="text-center text-sm text-primary bg-primary/5 border border-primary/15 rounded-lg p-3 mb-8 max-w-xl mx-auto italic">
                  {specialNote}
                </p>
              )}

              <div className="space-y-6">
                {results.map((r, i) => (
                  <React.Fragment key={r.mukhi + i}>
                    <RudrakshaCard data={r} />
                    {i < results.length - 1 && (
                      <p className="text-center text-xs font-medium text-muted-foreground tracking-widest">— or —</p>
                    )}
                  </React.Fragment>
                ))}

                {combinationCard && (
                  <>
                    <p className="text-center text-xs font-medium text-muted-foreground tracking-widest">— or —</p>
                    <RudrakshaCard data={combinationCard} highlight />
                  </>
                )}
              </div>

              {/* Notes */}
              <div className="mt-10 rounded-xl bg-muted/60 border border-border p-5 space-y-3 text-sm text-muted-foreground">
                <p>📌 <strong>Note:</strong> If you are under the age of 12, mandatory expert consultation is required before wearing Rudraksha.</p>
                <p>📌 <strong>Note:</strong> Each Rudraksha has its own Beej Mantra. You may chant the specific Beej Mantra or alternatively chant <em>Om Namah Shivaya</em> as per your convenience.</p>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center rounded-xl bg-card border border-border p-8 shadow-soft">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">Want a more personalized reading?</h3>
                <p className="text-sm text-muted-foreground mb-5">Consult our Vedic astrologer for a detailed birth chart analysis</p>
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Book a Consultation →
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RudrakshaCalculator;
