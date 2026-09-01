import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, Check, Star, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import TrustBar from '@/components/home/TrustBar';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import logo from '@/assets/logo.jpg';
import rudrakshaBanner from '@/assets/banners/rudraksha-banner.jpg';
import crystalsBanner from '@/assets/banners/crystals-banner.jpg';

interface LandingConfig {
  category: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  sub: string;
  banner: string;
  ctaLabel: string;
  ctaHref: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

const CONFIGS: Record<string, LandingConfig> = {
  rudraksha: {
    category: 'rudraksha',
    eyebrow: 'Lab-certified • Energized with Vedic mantras',
    headline: 'The Right Rudraksha,',
    highlight: 'Chosen For You',
    sub: 'Original Nepali & Indonesian Rudraksha beads — 1 Mukhi to 14 Mukhi, Ganesh, Gauri Shankar. Each bead is verified for authenticity and pre-charged before it reaches you.',
    banner: rudrakshaBanner,
    ctaLabel: 'Find my Rudraksha',
    ctaHref: '/calculators/rudraksha',
    bullets: [
      'Authenticity certificate with every bead',
      'Pre-charged with Vedic mantras before dispatch',
      'Free worldwide shipping, COD available in India',
      'Guidance on wearing rituals over WhatsApp',
    ],
    faqs: [
      { q: 'How do I know which Mukhi suits me?', a: 'Use our free Rudraksha recommendation tool — it maps your birth details and intention to the right Mukhi, or message us on WhatsApp for a personal suggestion.' },
      { q: 'Are the beads original?', a: 'Yes. Every bead is sourced from verified Nepali and Indonesian suppliers and checked for natural mukhi lines before dispatch.' },
      { q: 'Do you ship outside India?', a: 'Yes, shipping is free worldwide. Indian orders include a GST invoice.' },
    ],
    seoTitle: 'Original Rudraksha Beads — Certified & Energized',
    seoDescription: 'Buy original 1 to 14 Mukhi Rudraksha beads, certified and energized with Vedic mantras. Free worldwide shipping, COD available. Find your Mukhi free.',
  },
  bracelets: {
    category: 'crystals',
    eyebrow: 'Natural stones • Energized before dispatch',
    headline: 'Crystal Bracelets That',
    highlight: 'Actually Feel Different',
    sub: 'Natural Amethyst, Tiger Eye, Pyrite, Rose Quartz, 7 Chakra and more. Hand-picked genuine stones — no glass, no dyed imitations — cleansed and charged before shipping.',
    banner: crystalsBanner,
    ctaLabel: 'Find my bracelet',
    ctaHref: '/calculators/bracelet',
    bullets: [
      '100% natural stones, never dyed glass',
      'Cleansed and energized before dispatch',
      'Free worldwide shipping, COD available in India',
      'Wear-and-care guidance included',
    ],
    faqs: [
      { q: 'Which crystal should I choose?', a: 'Use our free bracelet recommendation tool — it suggests stones based on your intention, whether that is wealth, calm, protection or focus.' },
      { q: 'Are the stones natural?', a: 'Yes. Every bracelet uses natural stone beads. We do not sell dyed glass or reconstituted stone.' },
      { q: 'What size do the bracelets come in?', a: 'Standard stretch fit that suits most wrists. Message us on WhatsApp for custom sizing.' },
    ],
    seoTitle: 'Natural Crystal Bracelets — Energized & Genuine Stones',
    seoDescription: 'Shop natural crystal bracelets — Amethyst, Pyrite, Tiger Eye, Rose Quartz, 7 Chakra. Genuine stones, energized before dispatch, free worldwide shipping.',
  },
};

const Landing: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? CONFIGS[slug] : undefined;

  if (!config) return <Navigate to="/shop" replace />;

  const featured = products.filter((p) => p.category === config.category).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title={config.seoTitle} description={config.seoDescription} canonical={`/lp/${slug}`} />

      {/* Minimal bar — no navigation to keep the page focused */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-custom h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ankshaastra" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-lg">Ankshaastra</span>
          </Link>
          <a
            href="https://wa.me/919667305577"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" /> Chat
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#1a0d18]">
          <img
            src={config.banner}
            alt={config.seoTitle}
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, hsl(300 45% 12% / 0.75) 0%, hsl(270 40% 10% / 0.9) 100%)',
            }}
          />
          <div className="container-custom relative py-14 md:py-20 max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs md:text-sm mb-5">
              <ShieldCheck className="w-4 h-4" /> {config.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-cream leading-tight mb-4">
              {config.headline} <span className="block text-gradient-gold">{config.highlight}</span>
            </h1>
            <p className="text-cream/80 text-base md:text-lg mb-7">{config.sub}</p>
            <Button asChild size="lg" className="btn-gold rounded-full px-8 py-6 text-base">
              <Link to={config.ctaHref}>
                {config.ctaLabel} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <div className="mt-9">
              <TrustBar />
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-12 md:py-16">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">
              Why customers trust Ankshaastra
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {config.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 card-spiritual p-4">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16 bg-muted/40">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">Most loved picks</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container-custom max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">Questions, answered</h2>
            <div className="space-y-4">
              {config.faqs.map((f) => (
                <div key={f.q} className="card-spiritual p-5">
                  <p className="font-display font-semibold mb-1.5">{f.q}</p>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-14 bg-secondary text-secondary-foreground text-center">
          <div className="container-custom max-w-2xl">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Start your journey today</h2>
            <p className="opacity-80 mb-7 flex items-center justify-center gap-2 text-sm">
              <Truck className="w-4 h-4" /> Free worldwide shipping • COD available in India
            </p>
            <Button asChild size="lg" className="btn-gold rounded-full px-8 py-6 text-base">
              <Link to={config.ctaHref}>{config.ctaLabel}</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="md:hidden sticky bottom-0 z-40 p-3 bg-card/95 backdrop-blur-sm border-t border-border/60">
        <Button asChild className="btn-gold w-full rounded-full py-6">
          <Link to={config.ctaHref}>{config.ctaLabel}</Link>
        </Button>
      </div>

      <footer className="py-8 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Ankshaastra ·{' '}
          <Link to="/refund-policy" className="hover:text-primary">Refund</Link> ·{' '}
          <Link to="/shipping-policy" className="hover:text-primary">Shipping</Link> ·{' '}
          <Link to="/privacy-policy" className="hover:text-primary">Privacy</Link>
        </p>
      </footer>
    </div>
  );
};

export default Landing;
