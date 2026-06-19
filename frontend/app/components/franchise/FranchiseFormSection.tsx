'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';

export default function FranchiseFormSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputClass = "w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c8102e] transition-colors placeholder-gray-400 rounded-sm";

  return (
    <section ref={ref} id="contact-form" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Be your own king */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl font-black mb-4">BE YOUR OWN KING?</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain our sole mission.
            </p>
            {/* FAQ accordion */}
            {[
              { q: 'WHO CAN BECOME A FRANCHISE?', a: 'All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest.' },
              { q: 'WHY TO PAY FRANCHISE FEE?', a: null },
              { q: 'IS A FRANCHISE BUSINESS PROFITABLE?', a: null },
            ].map((faq, i) => (
              <div key={faq.q} className="border-b border-gray-100 py-4">
                <p className="font-bold text-xs uppercase tracking-wider text-gray-700 cursor-pointer hover:text-[#c8102e] transition-colors">{faq.q}</p>
                {faq.a && <p className="text-gray-500 text-xs mt-2 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </motion.div>
          <motion.div className="flex items-center justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="relative w-64 h-64">
              <span className="text-[160px] leading-none filter drop-shadow-2xl animate-float">🍕</span>
              <div className="absolute inset-0 bg-gray-100 -z-10 rounded-full opacity-30 blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div className="bg-[#f5f5f5] p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">HOW WE CAN HELP YOU?</span>
            <div className="w-px h-8 bg-gray-300" />
            <h2 className="text-3xl md:text-4xl font-black">SHARE YOUR DETAILS</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">YOUR NAME*</label>
                <input type="text" placeholder="What's your good name?" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">YOUR EMAIL ADDRESS*</label>
                <input type="email" placeholder="Enter your email address" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">YOUR PHONE NUMBER*</label>
                <input type="tel" placeholder="Enter your phone number" value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">YOUR SUBJECT</label>
                <input type="text" placeholder="How can we help you?" value={form.subject}
                  onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">YOUR MESSAGE</label>
              <textarea rows={4} placeholder="Describe about your message" value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className={`${inputClass} resize-none`} />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-gray-400 text-xs max-w-xs">
                We are committed to protecting your privacy. We will never collect information about you without your explicit consent.
              </p>
              <motion.button type="submit" disabled={loading || submitted}
                className="btn-dark flex items-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> :
                  submitted ? '✅ SENT!' : <><Send size={14} /> SEND MESSAGE</>}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
