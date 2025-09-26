import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just simulate submit — the backend endpoint can be wired later.
    setStatus('Sending...');
    setTimeout(() => setStatus('Thank you — we will get back to you soon.'), 800);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body">
          <div className="flex flex-col gap-2">
            <div>
              <h1>Contact Us</h1>
              <p className="text-sm opacity-90">If you have questions about billing, payments, or anything else, please get in touch.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} className="textarea textarea-bordered w-full" rows={6} />
            </div>

            <div className="flex items-center gap-3">
              <button className="btn btn-primary" type="submit">Send Message</button>
              <a href="mailto:support@devconnect.services" className="text-sm hover:underline">Or email us directly</a>
            </div>
          </form>

          {status && <p className="mt-4 text-sm text-muted">{status}</p>}

          <div className="mt-6">
            <Link to="/" className="btn btn-ghost btn-sm">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
