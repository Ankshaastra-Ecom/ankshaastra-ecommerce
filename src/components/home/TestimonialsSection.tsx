import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    text: 'The 5 Mukhi Rudraksha I purchased has completely transformed my meditation practice. I can feel the authentic energy. Highly recommended!',
    product: '5 Mukhi Rudraksha',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    rating: 5,
    text: 'Excellent quality gemstones! The Yellow Sapphire was exactly as described - lab certified and beautifully cut. Customer service was outstanding.',
    product: 'Yellow Sapphire',
  },
  {
    name: 'Anita Patel',
    location: 'Bangalore, India',
    rating: 5,
    text: 'I love my 7 Chakra bracelet! The crystals are genuine and I can feel the balancing energy throughout the day. Will definitely order more.',
    product: '7 Chakra Bracelet',
  },
  {
    name: 'Suresh Menon',
    location: 'Chennai, India',
    rating: 5,
    text: 'The Shree Yantra is absolutely beautiful and radiates positive energy. The energization certificate was a nice touch. Very satisfied with my purchase.',
    product: 'Shree Yantra',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/30 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied spiritual seekers who have transformed their lives with our authentic products.
          </p>
          <div className="divider-spiritual max-w-xs mx-auto mt-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-spiritual p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Product Badge */}
              <p className="text-xs text-primary font-medium mb-4">
                Purchased: {testimonial.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
