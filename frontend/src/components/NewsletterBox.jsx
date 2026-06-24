import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) return;
    toast.success('You\'re on the list! Welcome to Glam. 🌹');
    setEmail('');
  };

  return (
    <section className="bg-rose-600 text-white py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-playfair text-3xl mb-2">Join the Glam Circle</h2>
        <p className="text-rose-100 mb-8 text-sm">
          Subscribe for exclusive drops, style tips, and members-only offers.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto shadow-lg">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-5 py-3 text-sm text-gray-800 outline-none placeholder-gray-400 rounded-l"
          />
          <button type="submit" className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors rounded-r">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
