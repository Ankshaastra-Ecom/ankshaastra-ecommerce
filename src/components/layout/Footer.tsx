import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container-custom py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Join Our Spiritual Journey
            </h3>
            <p className="text-secondary-foreground/80 mb-6">
              Subscribe for exclusive offers, spiritual insights, and new arrivals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border-border flex-1"
              />
              <Button className="btn-gold whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">ॐ</span>
              </div>
              <span className="text-xl font-display font-bold">Ankshaastra</span>
            </Link>
            <p className="text-secondary-foreground/80 mb-4 text-sm">
              Your trusted source for authentic Rudraksha beads, healing crystals, gemstones, and spiritual products. Energized with Vedic mantras for maximum spiritual benefits.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Shop All</Link></li>
              <li><Link to="/shop/rudraksha" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Rudraksha</Link></li>
              <li><Link to="/shop/crystals" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Crystal Bracelets</Link></li>
              <li><Link to="/shop/gemstones" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Gemstones</Link></li>
              <li><Link to="/shop/yantra" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Yantras</Link></li>
              <li><Link to="/calculators/rudraksha" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Calculators</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/shipping" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-secondary-foreground/80 hover:text-gold transition-colors text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80 text-sm">Unit No. O-622, Block E, Eye of Noida, Sector-140A, Noida-201305</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-secondary-foreground/80 text-sm">+91 96673 05577</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-secondary-foreground/80 text-sm">social@ankshaastra.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-secondary-foreground/60 text-xs">Secure Payments</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="px-2 py-1 bg-secondary-foreground/10 rounded text-xs">Visa</div>
                <div className="px-2 py-1 bg-secondary-foreground/10 rounded text-xs">Mastercard</div>
                <div className="px-2 py-1 bg-secondary-foreground/10 rounded text-xs">UPI</div>
                <div className="px-2 py-1 bg-secondary-foreground/10 rounded text-xs">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-secondary-foreground/60">
            <p>© 2024 Ankshaastra. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-gold">♥</span> for spiritual seekers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
