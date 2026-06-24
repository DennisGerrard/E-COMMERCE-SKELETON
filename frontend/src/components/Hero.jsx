import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    tag: 'New Collection 2025',
    headline: ['The Art of', 'Effortless Style'],
    sub: 'Discover curated fashion that speaks to who you are.',
    cta: 'Shop Now',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80',
    align: 'left',
  },
  {
    tag: 'Bestsellers',
    headline: ['Elegance', 'Redefined'],
    sub: 'Timeless pieces hand-picked for the modern woman and man.',
    cta: 'View Bestsellers',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80',
    align: 'right',
  },
  {
    tag: 'Exclusive Drops',
    headline: ['Bold. Chic.', 'Unmistakably You.'],
    sub: 'Limited pieces that push the boundaries of contemporary fashion.',
    cta: 'Explore Drops',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    align: 'left',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const s = slides[current];

  return (
    <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 transition-all duration-1000">
        <img src={s.img} alt="hero" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative max-w-7xl mx-auto px-6 h-full flex items-center ${s.align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-lg text-white">
          <span className="inline-block text-rose-300 text-xs uppercase tracking-[0.3em] mb-4 font-medium">
            {s.tag}
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl leading-tight mb-5">
            {s.headline[0]}<br />
            <span className="text-rose-300">{s.headline[1]}</span>
          </h1>
          <p className="text-white/80 text-lg mb-8">{s.sub}</p>
          <Link to="/collection" className="inline-block btn-primary">
            {s.cta}
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-rose-400 w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
