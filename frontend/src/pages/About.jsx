import React from 'react';
import NewsletterBox from '../components/NewsletterBox';
import Title from '../components/Title';

const About = () => (
  <>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <Title text1="About" text2="Glam" />

      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700&q=80"
            alt="About Glam"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-600 leading-relaxed mb-5">
            Glam was born from a simple belief: style should be accessible, intentional, and effortlessly beautiful. Founded in 2020, we curate the finest fashion pieces from around the world for the modern wardrobe.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Every piece in our collection is thoughtfully selected for quality, craftsmanship, and timeless appeal. We work directly with artisans and ethical manufacturers to bring you fashion that feels as good as it looks.
          </p>
          <p className="text-gray-600 leading-relaxed">
            At Glam, we believe that confidence starts with what you wear. Our mission is to make that first impression unforgettable.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        {[
          { title: 'Quality First', desc: 'Every product passes a rigorous quality assurance process before reaching you.' },
          { title: 'Sustainability', desc: 'We partner with eco-conscious suppliers committed to responsible practices.' },
          { title: 'Community', desc: 'Glam customers are part of a global style community that inspires one another.' },
        ].map(({ title, desc }) => (
          <div key={title} className="border border-gray-200 p-6 hover:border-rose-300 transition-colors">
            <h3 className="font-playfair text-lg text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    <NewsletterBox />
  </>
);

export default About;
