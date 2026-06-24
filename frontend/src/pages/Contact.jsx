import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon. 💌');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <Title text1="Contact" text2="Us" />

        <div className="flex flex-col md:flex-row gap-12">
          {/* Info */}
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              alt="Contact Glam"
              className="w-full h-64 object-cover mb-8"
            />
            <h3 className="font-playfair text-xl text-gray-800 mb-4">Our Store</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>📍 123 Fashion Avenue, Suite 800<br />New York, NY 10001</p>
              <p>📞 +1 (800) 456-GLAM</p>
              <p>✉️ hello@glamstore.com</p>
              <p>🕐 Mon – Fri: 9AM – 6PM EST</p>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-5 font-semibold">Send a Message</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name" value={form.name} onChange={handleChange} required
                placeholder="Your name" className="input-field"
              />
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="Email address" className="input-field"
              />
              <textarea
                name="message" value={form.message} onChange={handleChange} required
                rows={6} placeholder="Your message…" className="input-field resize-none"
              />
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
};

export default Contact;
