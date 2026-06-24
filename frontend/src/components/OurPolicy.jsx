import React from 'react';

const policies = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
      </svg>
    ),
    title: 'Free Shipping',
    desc: 'On all orders over $100',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
    title: 'Easy Returns',
    desc: '30-day hassle-free returns',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Secure Payment',
    desc: 'Stripe-secured transactions',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    title: '24/7 Support',
    desc: 'Here when you need us',
  },
];

const OurPolicy = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {policies.map(({ icon, title, desc }) => (
        <div key={title} className="flex flex-col items-center text-center group">
          <div className="text-rose-400 mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <p className="font-semibold text-gray-800 text-sm">{title}</p>
          <p className="text-gray-500 text-xs mt-1">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default OurPolicy;
